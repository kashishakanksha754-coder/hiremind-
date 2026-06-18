from fastapi import APIRouter, Request, HTTPException
from pydantic import BaseModel
from typing import Optional

router = APIRouter()


class VapiWebhookPayload(BaseModel):
    call_id: str
    transcript: Optional[str] = None
    recording_url: Optional[str] = None
    summary: Optional[str] = None
    metadata: Optional[dict] = None


class TwilioWebhookPayload(BaseModel):
    message_sid: str
    status: str
    to: Optional[str] = None


@router.post("/vapi")
async def vapi_webhook(payload: VapiWebhookPayload):
    """Process Vapi call completion — parse transcript, score interview, notify recruiter."""
    from app.tasks.voice_interview import process_vapi_result

    application_id = (payload.metadata or {}).get("application_id")
    if application_id:
        process_vapi_result.delay(application_id, payload.dict())

    return {"status": "queued"}


@router.post("/twilio")
async def twilio_webhook(payload: TwilioWebhookPayload):
    """Log WhatsApp delivery status."""
    # In production: update message_logs table with delivery status
    return {"status": "logged"}
