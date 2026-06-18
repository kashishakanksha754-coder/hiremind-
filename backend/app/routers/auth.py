"""Authentication routes: signup, login, Google OAuth."""
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.tenant import Tenant
from app.models.user import User
from app.utils.security import (
    create_access_token,
    hash_password,
    verify_password,
)
from app.utils.uuid_utils import new_uuid

router = APIRouter(prefix="/auth", tags=["auth"])


# ---- Schemas -------------------------------------------------------------


class SignupRequest(BaseModel):
    email: EmailStr
    password: str
    full_name: str | None = None
    role: str = "candidate"
    company_name: str | None = None


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class GoogleAuthRequest(BaseModel):
    email: EmailStr
    google_id: str
    full_name: str | None = None
    avatar_url: str | None = None


class UserOut(BaseModel):
    id: str
    email: EmailStr
    full_name: str | None = None
    role: str
    tenant_id: str | None = None

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut


# ---- Helpers -------------------------------------------------------------


def _issue_token(user: User) -> TokenResponse:
    token = create_access_token({"sub": str(user.id), "role": user.role})
    return TokenResponse(access_token=token, user=UserOut.model_validate(user))


# ---- Routes --------------------------------------------------------------


@router.post("/signup", response_model=TokenResponse, status_code=201)
async def signup(payload: SignupRequest, db: AsyncSession = Depends(get_db)):
    """Register a new user, optionally creating a tenant for staff signups."""
    existing = await db.execute(select(User).where(User.email == payload.email))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=409, detail="Email already registered")

    tenant_id = None
    if payload.company_name and payload.role != "candidate":
        slug = payload.company_name.lower().replace(" ", "-") + "-" + new_uuid()[:8]
        tenant = Tenant(
            name=payload.company_name,
            slug=slug,
            status="trial",
            plan="trial",
            trial_ends_at=datetime.now(timezone.utc) + timedelta(days=14),
        )
        db.add(tenant)
        await db.flush()
        tenant_id = tenant.id

    user = User(
        email=payload.email,
        hashed_password=hash_password(payload.password),
        full_name=payload.full_name,
        role=payload.role,
        tenant_id=tenant_id,
    )
    db.add(user)
    await db.flush()
    await db.refresh(user)
    return _issue_token(user)


@router.post("/login", response_model=TokenResponse)
async def login(payload: LoginRequest, db: AsyncSession = Depends(get_db)):
    """Authenticate with email + password and return an access token."""
    result = await db.execute(select(User).where(User.email == payload.email))
    user = result.scalar_one_or_none()
    if (
        user is None
        or not user.hashed_password
        or not verify_password(payload.password, user.hashed_password)
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
        )
    if not user.is_active:
        raise HTTPException(status_code=403, detail="Account disabled")
    return _issue_token(user)


@router.post("/google", response_model=TokenResponse)
async def google_auth(payload: GoogleAuthRequest, db: AsyncSession = Depends(get_db)):
    """Sign in or register via a verified Google identity."""
    result = await db.execute(select(User).where(User.email == payload.email))
    user = result.scalar_one_or_none()
    if user is None:
        user = User(
            email=payload.email,
            google_id=payload.google_id,
            full_name=payload.full_name,
            avatar_url=payload.avatar_url,
            role="candidate",
        )
        db.add(user)
        await db.flush()
        await db.refresh(user)
    elif not user.google_id:
        user.google_id = payload.google_id
    return _issue_token(user)
