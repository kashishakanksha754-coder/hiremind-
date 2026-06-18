from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timedelta

from app.middleware.auth import get_current_user
from app.database import get_db

router = APIRouter()


def require_admin(current_user: dict = Depends(get_current_user)):
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return current_user


@router.get("/tenants")
async def list_tenants(
    current_user: dict = Depends(require_admin),
    db=Depends(get_db),
):
    return {"tenants": [], "total": 0}


@router.post("/tenants/{tenant_id}/activate")
async def activate_tenant(
    tenant_id: str,
    current_user: dict = Depends(require_admin),
    db=Depends(get_db),
):
    return {"tenant_id": tenant_id, "activated": True}


class ExtendTrialRequest(BaseModel):
    days: int


@router.post("/tenants/{tenant_id}/extend-trial")
async def extend_trial(
    tenant_id: str,
    payload: ExtendTrialRequest,
    current_user: dict = Depends(require_admin),
    db=Depends(get_db),
):
    new_end = (datetime.utcnow() + timedelta(days=payload.days)).isoformat()
    return {"tenant_id": tenant_id, "trial_ends_at": new_end}


@router.get("/metrics")
async def platform_metrics(
    current_user: dict = Depends(require_admin),
    db=Depends(get_db),
):
    return {
        "total_tenants": 0,
        "active_tenants": 0,
        "total_candidates": 0,
        "total_applications_today": 0,
        "cv_screenings_today": 0,
        "voice_interviews_today": 0,
        "assessments_today": 0,
    }
