"""Notification dispatch task."""
import logging

from celery_app import celery
from app.models.stage_result import Notification
from app.services.email_service import send_email
from app.services.whatsapp_service import send_whatsapp
from app.tasks._db import sync_session

logger = logging.getLogger(__name__)


@celery.task(name="app.tasks.notifications.send_notification")
def send_notification(user_id: str, channel: str, title: str, body: str) -> dict:
    """Dispatch a notification to a user over the requested channel.

    channel: one of "email", "whatsapp", "in_app". Always persists an in-app
    Notification row for the activity feed regardless of the outbound channel.
    """
    result: dict = {"user_id": user_id, "channel": channel}

    with sync_session() as session:
        from app.models.user import User

        user = session.get(User, user_id)
        if user is None:
            logger.warning("send_notification: user %s not found", user_id)
            return {"status": "error", "reason": "user_not_found", **result}

        # Persist an in-app record for every notification.
        notification = Notification(
            user_id=user_id, channel=channel, title=title, body=body
        )
        session.add(notification)

        if channel == "email" and user.email:
            result["delivery"] = send_email(user.email, title, f"<p>{body}</p>")
        elif channel == "whatsapp" and user.phone:
            result["delivery"] = send_whatsapp(user.phone, f"{title}\n\n{body}")
        else:
            result["delivery"] = {"status": "in_app_only"}

    result["status"] = "ok"
    return result
