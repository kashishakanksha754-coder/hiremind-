"""Synchronous database session helper for Celery tasks.

Celery workers run synchronously, so we build a separate sync engine from the
configured DATABASE_URL (stripping the +asyncpg driver if present).
"""
from contextlib import contextmanager

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.config import get_settings

settings = get_settings()

_sync_url = settings.DATABASE_URL.replace("+asyncpg", "").replace(
    "postgresql://", "postgresql+psycopg2://", 1
) if "+asyncpg" in settings.DATABASE_URL else settings.DATABASE_URL

sync_engine = create_engine(_sync_url, pool_pre_ping=True, future=True)
SyncSessionLocal = sessionmaker(bind=sync_engine, expire_on_commit=False)


@contextmanager
def sync_session():
    """Yield a synchronous session, committing on success."""
    session = SyncSessionLocal()
    try:
        yield session
        session.commit()
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()
