"""Supabase Storage wrapper for resume upload/download/signed URLs."""
import logging

from app.config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()

try:  # pragma: no cover - optional dependency
    from supabase import Client, create_client

    _supabase: "Client | None" = (
        create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_ROLE_KEY)
        if settings.SUPABASE_URL and settings.SUPABASE_SERVICE_ROLE_KEY
        else None
    )
except Exception:  # noqa: BLE001
    _supabase = None


def upload_file(path: str, data: bytes, content_type: str = "application/pdf") -> dict:
    """Upload bytes to Supabase Storage. Degrades gracefully."""
    if _supabase is None:
        logger.info("[storage:noop] upload path=%s bytes=%d", path, len(data))
        return {"status": "skipped", "path": path, "reason": "supabase_not_configured"}
    try:
        _supabase.storage.from_(settings.SUPABASE_STORAGE_BUCKET).upload(
            path, data, {"content-type": content_type, "upsert": "true"}
        )
        return {"status": "uploaded", "path": path}
    except Exception as exc:  # noqa: BLE001
        logger.exception("Supabase upload failed: %s", exc)
        return {"status": "error", "error": str(exc), "path": path}


def download_file(path: str) -> bytes:
    """Download bytes from Supabase Storage. Returns b'' on failure."""
    if _supabase is None:
        logger.info("[storage:noop] download path=%s", path)
        return b""
    try:
        return _supabase.storage.from_(settings.SUPABASE_STORAGE_BUCKET).download(path)
    except Exception as exc:  # noqa: BLE001
        logger.exception("Supabase download failed: %s", exc)
        return b""


def create_signed_url(path: str, expires_in: int = 3600) -> str | None:
    """Create a temporary signed URL for a stored object."""
    if _supabase is None:
        logger.info("[storage:noop] signed_url path=%s", path)
        return None
    try:
        result = _supabase.storage.from_(
            settings.SUPABASE_STORAGE_BUCKET
        ).create_signed_url(path, expires_in)
        return result.get("signedURL") or result.get("signed_url")
    except Exception as exc:  # noqa: BLE001
        logger.exception("Supabase signed URL failed: %s", exc)
        return None
