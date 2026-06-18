"""Celery task modules. Importing them registers the tasks."""
from app.tasks import (  # noqa: F401
    assessment,
    cv_screening,
    notifications,
    voice_interview,
)
