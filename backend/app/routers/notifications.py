from fastapi import APIRouter, Depends, Query
from typing import List, Optional

from app.middleware.auth import get_current_user
from app.database import get_db

router = APIRouter()


@router.get("/")
async def get_notifications(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    current_user: dict = Depends(get_current_user),
    db=Depends(get_db),
):
    return {
        "notifications": [],
        "total": 0,
        "page": page,
        "per_page": per_page,
        "unread_count": 0,
    }


@router.put("/{notification_id}/read")
async def mark_read(
    notification_id: str,
    current_user: dict = Depends(get_current_user),
    db=Depends(get_db),
):
    return {"notification_id": notification_id, "read": True}


@router.post("/read-all")
async def mark_all_read(
    current_user: dict = Depends(get_current_user),
    db=Depends(get_db),
):
    return {"updated": True}
