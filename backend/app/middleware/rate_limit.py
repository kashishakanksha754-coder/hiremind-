"""Simple token-bucket rate limiting middleware.

Uses Redis when available, otherwise falls back to an in-memory store. The
implementation is intentionally lightweight and per-client-IP.
"""
import time
from collections import defaultdict

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import JSONResponse

from app.config import get_settings

settings = get_settings()

# In-memory fallback store: {client_key: (tokens, last_refill_ts)}
_buckets: dict[str, tuple[float, float]] = defaultdict(lambda: (0.0, 0.0))

try:  # pragma: no cover - optional dependency
    import redis as _redis_lib

    _redis_client = _redis_lib.Redis.from_url(settings.REDIS_URL)
except Exception:  # noqa: BLE001
    _redis_client = None


class RateLimitMiddleware(BaseHTTPMiddleware):
    """Token-bucket rate limiter keyed by client IP."""

    def __init__(self, app, rate: int = 100, per_seconds: int = 60) -> None:
        super().__init__(app)
        self.rate = rate
        self.per_seconds = per_seconds
        self.refill_per_sec = rate / per_seconds

    def _allow_in_memory(self, key: str) -> bool:
        now = time.monotonic()
        tokens, last = _buckets[key]
        if last == 0.0:
            tokens, last = float(self.rate), now
        # Refill
        tokens = min(self.rate, tokens + (now - last) * self.refill_per_sec)
        if tokens < 1.0:
            _buckets[key] = (tokens, now)
            return False
        _buckets[key] = (tokens - 1.0, now)
        return True

    def _allow_redis(self, key: str) -> bool:
        try:
            redis_key = f"ratelimit:{key}"
            current = _redis_client.incr(redis_key)
            if current == 1:
                _redis_client.expire(redis_key, self.per_seconds)
            return int(current) <= self.rate
        except Exception:  # noqa: BLE001 - degrade gracefully
            return self._allow_in_memory(key)

    async def dispatch(self, request: Request, call_next):
        client_ip = request.client.host if request.client else "anonymous"
        key = f"{client_ip}:{request.url.path}"

        allowed = (
            self._allow_redis(key)
            if _redis_client is not None
            else self._allow_in_memory(key)
        )

        if not allowed:
            return JSONResponse(
                status_code=429,
                content={"detail": "Rate limit exceeded. Try again later."},
            )
        return await call_next(request)
