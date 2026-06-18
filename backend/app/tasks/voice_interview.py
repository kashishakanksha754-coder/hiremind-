"""Voice interview room creation Celery task."""
import logging
from datetime import datetime, timedelta, timezone

from celery import group

from celery_app import celery
from app.models.application import Application
from app.models.stage_result import InterviewRoom
from app.tasks._db import sync_session
from app.tasks.notifications import send_notification
from app.utils.uuid_utils import new_uuid

logger = logging.getLogger(__name__)

ROOM_TTL_HOURS = 48


@celery.task(name="app.tasks.voice_interview.create_voice_interview")
def create_voice_interview(application_id: str) -> dict:
    """Create a voice interview room for an application and notify the candidate.

    The room token is a fresh UUID, the room expires in 48 hours, and the
    candidate is notified across all channels simultaneously via celery.group.
    """
    room_token = new_uuid()
    expires_at = datetime.now(timezone.utc) + timedelta(hours=ROOM_TTL_HOURS)

    with sync_session() as session:
        application = session.get(Application, application_id)
        if application is None:
            return {"status": "error", "reason": "application_not_found"}

        room = InterviewRoom(
            application_id=application_id,
            room_token=room_token,
            status="scheduled",
            expires_at=expires_at,
        )
        session.add(room)
        application.current_stage = "voice_interview"
        candidate_id = application.candidate_id

    interview_link = f"https://app.hiremind.ai/interview/{room_token}"
    title = "Your Voice Interview is Ready"
    body = (
        f"Please complete your AI voice interview within 48 hours: {interview_link}"
    )

    # Fire all channels simultaneously.
    group(
        send_notification.s(candidate_id, "email", title, body),
        send_notification.s(candidate_id, "whatsapp", title, body),
        send_notification.s(candidate_id, "in_app", title, body),
    ).apply_async()

    return {
        "status": "ok",
        "room_token": room_token,
        "expires_at": expires_at.isoformat(),
        "link": interview_link,
    }
