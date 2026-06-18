"""Celery application configured with Redis as broker and result backend."""
from celery import Celery

from app.config import get_settings

settings = get_settings()

celery = Celery(
    "hiremind",
    broker=settings.REDIS_URL,
    backend=settings.REDIS_URL,
)

celery.conf.update(
    task_serializer="json",
    result_serializer="json",
    accept_content=["json"],
    timezone="UTC",
    enable_utc=True,
    task_track_started=True,
    task_acks_late=True,
    worker_prefetch_multiplier=1,
)

# Discover @celery.task definitions in the app.tasks package.
celery.autodiscover_tasks(["app.tasks"])
