"""Job CRUD, pipeline, and public careers routes."""
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.middleware.auth import get_current_user
from app.models.application import Application
from app.models.job import DEFAULT_STAGES, Job
from app.models.tenant import Tenant
from app.models.user import User
from app.utils.uuid_utils import new_uuid

router = APIRouter(tags=["jobs"])


# ---- Schemas -------------------------------------------------------------


class JobCreate(BaseModel):
    title: str
    description: str | None = None
    requirements: str | None = None
    location: str | None = None
    employment_type: str = "full_time"
    department: str | None = None
    salary_min: int | None = None
    salary_max: int | None = None
    skills_required: list[str] | None = None
    status: str = "draft"


class JobUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    requirements: str | None = None
    location: str | None = None
    employment_type: str | None = None
    department: str | None = None
    salary_min: int | None = None
    salary_max: int | None = None
    skills_required: list[str] | None = None
    status: str | None = None


class JobOut(BaseModel):
    id: str
    tenant_id: str
    title: str
    slug: str
    description: str | None = None
    requirements: str | None = None
    location: str | None = None
    employment_type: str
    department: str | None = None
    salary_min: int | None = None
    salary_max: int | None = None
    skills_required: list | None = None
    pipeline_stages: list | None = None
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


def _slugify(title: str) -> str:
    base = "".join(c if c.isalnum() else "-" for c in title.lower()).strip("-")
    return f"{base}-{new_uuid()[:6]}"


# ---- CRUD ----------------------------------------------------------------


@router.post("/jobs", response_model=JobOut, status_code=201)
async def create_job(
    payload: JobCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Create a job within the current user's tenant."""
    if current_user.tenant_id is None:
        raise HTTPException(status_code=403, detail="No tenant context")
    job = Job(
        tenant_id=current_user.tenant_id,
        created_by=current_user.id,
        slug=_slugify(payload.title),
        pipeline_stages=DEFAULT_STAGES,
        **payload.model_dump(),
    )
    db.add(job)
    await db.flush()
    await db.refresh(job)
    return job


@router.get("/jobs", response_model=list[JobOut])
async def list_jobs(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
    status_filter: str | None = None,
):
    """List jobs for the current tenant."""
    stmt = select(Job).where(Job.tenant_id == current_user.tenant_id)
    if status_filter:
        stmt = stmt.where(Job.status == status_filter)
    result = await db.execute(stmt.order_by(Job.created_at.desc()))
    return result.scalars().all()


@router.get("/jobs/{job_id}", response_model=JobOut)
async def get_job(job_id: str, db: AsyncSession = Depends(get_db)):
    """Fetch a single job."""
    job = await db.get(Job, job_id)
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    return job


@router.put("/jobs/{job_id}", response_model=JobOut)
async def update_job(
    job_id: str,
    payload: JobUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Update a job."""
    job = await db.get(Job, job_id)
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    if str(job.tenant_id) != str(current_user.tenant_id):
        raise HTTPException(status_code=403, detail="Forbidden")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(job, field, value)
    await db.flush()
    await db.refresh(job)
    return job


@router.delete("/jobs/{job_id}", status_code=204)
async def delete_job(
    job_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Delete a job."""
    job = await db.get(Job, job_id)
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    if str(job.tenant_id) != str(current_user.tenant_id):
        raise HTTPException(status_code=403, detail="Forbidden")
    await db.delete(job)
    return None


# ---- Pipeline ------------------------------------------------------------


@router.get("/jobs/{job_id}/pipeline")
async def get_pipeline(job_id: str, db: AsyncSession = Depends(get_db)):
    """Return the hiring pipeline as a stage -> candidates mapping."""
    job = await db.get(Job, job_id)
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")

    stages = job.pipeline_stages or DEFAULT_STAGES
    result = await db.execute(
        select(Application).where(Application.job_id == job_id)
    )
    applications = result.scalars().all()

    pipeline: dict[str, list] = {stage: [] for stage in stages}
    for app in applications:
        bucket = app.current_stage if app.current_stage in pipeline else stages[0]
        pipeline[bucket].append(
            {
                "application_id": app.id,
                "candidate_id": app.candidate_id,
                "overall_score": app.overall_score,
                "status": app.status,
            }
        )
    return {"job_id": job_id, "stages": stages, "pipeline": pipeline}


# ---- Public careers ------------------------------------------------------


@router.get("/careers/{slug}/jobs", response_model=list[JobOut])
async def public_careers_jobs(slug: str, db: AsyncSession = Depends(get_db)):
    """Public endpoint: list open jobs for a tenant by its careers slug."""
    tenant_result = await db.execute(select(Tenant).where(Tenant.slug == slug))
    tenant = tenant_result.scalar_one_or_none()
    if tenant is None:
        raise HTTPException(status_code=404, detail="Company not found")
    result = await db.execute(
        select(Job).where(Job.tenant_id == tenant.id, Job.status == "open")
    )
    return result.scalars().all()
