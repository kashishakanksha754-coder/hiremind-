"""Twilio WhatsApp wrapper."""
import logging

from app.config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()

try:  # pragma: no cover - optional dependency
    from twilio.rest import Client

    _twilio_client: "Client | None" = (
        Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
        if settings.TWILIO_ACCOUNT_SID and settings.TWILIO_AUTH_TOKEN
        else None
    )
except Exception:  # noqa: BLE001
    _twilio_client = None


def send_whatsapp(to: str, body: str) -> dict:
    """Send a WhatsApp message via Twilio. Degrades gracefully."""
    if _twilio_client is None:
        logger.info("[whatsapp:noop] to=%s body=%s", to, body[:60])
        return {"status": "skipped", "reason": "twilio_not_configured", "to": to}

    # Twilio expects the "whatsapp:" prefix on both numbers.
    to_addr = to if to.startswith("whatsapp:") else f"whatsapp:{to}"
    try:
        message = _twilio_client.messages.create(
            from_=settings.TWILIO_WHATSAPP_NUMBER,
            to=to_addr,
            body=body,
        )
        return {"status": "sent", "sid": message.sid, "to": to_addr}
    except Exception as exc:  # noqa: BLE001
        logger.exception("Twilio WhatsApp send failed: %s", exc)
        return {"status": "error", "error": str(exc), "to": to_addr}
