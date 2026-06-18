from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from pydantic import BaseModel
from typing import Optional, List

from app.middleware.auth import get_current_user
from app.database import get_db

router = APIRouter()


class ProfileUpdate(BaseModel):
    phone: Optional[str] = None
    location: Optional[str] = None
    current_title: Optional[str] = None
    current_company: Optional[str] = None
    experience_years: Optional[int] = None
    current_ctc: Optional[float] = None
    expected_ctc: Optional[float] = None
    notice_period: Optional[str] = None
    work_mode: Optional[str] = None
    skills: Optional[List[str]] = None
    linkedin_url: Optional[str] = None
    portfolio_url: Optional[str] = None
    job_seeking_status: Optional[str] = None
    is_fresher: Optional[bool] = None


@router.get("/{candidate_id}/profile")
async def get_profile(
    candidate_id: str,
    current_user: dict = Depends(get_current_user),
    db=Depends(get_db),
):
    return {"candidate_id": candidate_id, "profile": {}}


@router.put("/{candidate_id}/profile")
async def update_profile(
    candidate_id: str,
    payload: ProfileUpdate,
    current_user: dict = Depends(get_current_user),
    db=Depends(get_db),
):
    return {"candidate_id": candidate_id, "updated": True}


@router.post("/{candidate_id}/resume")
async def upload_resume(
    candidate_id: str,
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user),
    db=Depends(get_db),
):
    """Upload resume and trigger async parsing."""
    from app.tasks.cv_screening import parse_resume

    if file.content_type not in ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]:
        raise HTTPException(status_code=400, detail="Only PDF and DOCX files are allowed")

    content = await file.read()
    if len(content) > 5 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File size must be under 5MB")

    # In production: upload to Supabase Storage, then trigger parsing
    parse_resume.delay(candidate_id, f"resumes/{candidate_id}/{file.filename}")

    return {"candidate_id": candidate_id, "filename": file.filename, "parsing": "queued"}


@router.get("/{candidate_id}/applications")
async def get_applications(
    candidate_id: str,
    current_user: dict = Depends(get_current_user),
    db=Depends(get_db),
):
    return {"candidate_id": candidate_id, "applications": []}
