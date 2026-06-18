from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

from app.middleware.auth import get_current_user
from app.database import get_db

router = APIRouter()


class ApplicationCreate(BaseModel):
    job_id: str
    cv_url: str
    source: Optional[str] = "direct"


class StageUpdate(BaseModel):
    action: str  # "advance" | "reject" | "hold"
    reason: Optional[str] = None


class WithdrawRequest(BaseModel):
    reason: str


@router.post("/")
async def create_application(
    payload: ApplicationCreate,
    current_user: dict = Depends(get_current_user),
    db=Depends(get_db),
):
    """Candidate applies to a job. Triggers CV screening Celery task."""
    from app.tasks.cv_screening import screen_cv

    application = {
        "id": "app_new",
        "job_id": payload.job_id,
        "candidate_id": current_user["id"],
        "status": "applied",
        "cv_url": payload.cv_url,
        "source": payload.source,
        "created_at": datetime.utcnow().isoformat(),
    }

    # Trigger async CV screening
    screen_cv.delay(application["id"])

    return application


@router.get("/{application_id}")
async def get_application(
    application_id: str,
    current_user: dict = Depends(get_current_user),
    db=Depends(get_db),
):
    return {"id": application_id, "status": "cv_screening", "job_id": "job_1"}


@router.put("/{application_id}/stage")
async def update_stage(
    application_id: str,
    payload: StageUpdate,
    current_user: dict = Depends(get_current_user),
    db=Depends(get_db),
):
    """Recruiter advances, rejects, or holds an application."""
    from app.tasks.voice_interview import create_voice_interview
    from app.tasks.assessment import generate_assessment
    from app.tasks.voice_interview import create_deep_interview

    STAGE_TRANSITIONS = {
        "cv_screening": "voice_interview",
        "voice_interview": "assessment",
        "assessment": "deep_interview",
        "deep_interview": "selection",
        "selection": "selected",
    }

    if payload.action == "advance":
        # Trigger next stage task
        create_voice_interview.delay(application_id)

    return {"application_id": application_id, "action": payload.action, "updated": True}


@router.post("/{application_id}/withdraw")
async def withdraw_application(
    application_id: str,
    payload: WithdrawRequest,
    current_user: dict = Depends(get_current_user),
    db=Depends(get_db),
):
    return {"application_id": application_id, "status": "withdrawn", "reason": payload.reason}


@router.get("/candidate/{candidate_id}")
async def get_candidate_applications(
    candidate_id: str,
    current_user: dict = Depends(get_current_user),
    db=Depends(get_db),
):
    return {"candidate_id": candidate_id, "applications": []}
