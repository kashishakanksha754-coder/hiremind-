"""Tenant context extraction and validation."""
from fastapi import Depends, HTTPException, status

from app.middleware.auth import get_current_user
from app.models.user import User


async def get_tenant_id(current_user: User = Depends(get_current_user)) -> str:
    """Return the tenant id associated with the current user."""
    tenant_id = getattr(current_user, "tenant_id", None)
    if tenant_id is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User is not associated with a tenant",
        )
    return str(tenant_id)


def require_same_tenant(resource_tenant_id: str, user_tenant_id: str) -> None:
    """Raise 403 if a resource does not belong to the user's tenant."""
    if str(resource_tenant_id) != str(user_tenant_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Resource does not belong to your tenant",
        )
