"""Resend email wrapper."""
import logging

from app.config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()

try:  # pragma: no cover - optional dependency
    import resend as _resend

    if settings.RESEND_API_KEY:
        _resend.api_key = settings.RESEND_API_KEY
        _resend_enabled = True
    else:
        _resend_enabled = False
except Exception:  # noqa: BLE001
    _resend = None
    _resend_enabled = False


def send_email(to: str, subject: str, html: str) -> dict:
    """Send a transactional email via Resend. Degrades gracefully."""
    if not _resend_enabled or _resend is None:
        logger.info("[email:noop] to=%s subject=%s", to, subject)
        return {"status": "skipped", "reason": "resend_not_configured", "to": to}
    try:
        response = _resend.Emails.send(
            {
                "from": settings.RESEND_FROM_EMAIL,
                "to": [to],
                "subject": subject,
                "html": html,
            }
        )
        return {"status": "sent", "id": response.get("id"), "to": to}
    except Exception as exc:  # noqa: BLE001
        logger.exception("Resend send failed: %s", exc)
        return {"status": "error", "error": str(exc), "to": to}
