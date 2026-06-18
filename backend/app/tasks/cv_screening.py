"""CV screening Celery task."""
import logging

from celery import group

from celery_app import celery
from app.models.application import Application
from app.models.job import Job
from app.models.stage_result import StageResult
from app.services import ai_service
from app.services.storage_service import download_file
from app.tasks._db import sync_session
from app.tasks.notifications import send_notification

logger = logging.getLogger(__name__)

# Score weighting for the CV screen stage.
WEIGHTS = {"skills": 0.40, "experience": 0.35, "education": 0.25}
PASS_THRESHOLD = 60


@celery.task(name="app.tasks.cv_screening.screen_cv")
def screen_cv(application_id: str) -> dict:
    """Screen a candidate's CV against the job and record a stage result.

    Steps:
      1. Fetch the application and its job.
      2. Download the CV from Supabase storage and parse it via GPT-4o.
      3. Score skills (40%), experience (35%), education (25%).
      4. Persist a StageResult.
      5. Fan out notifications (email + whatsapp + in-app) via a celery group.
    """
    with sync_session() as session:
        application = session.get(Application, application_id)
        if application is None:
            return {"status": "error", "reason": "application_not_found"}

        job = session.get(Job, application.job_id)
        job_dict = {
            "title": getattr(job, "title", None),
            "requirements": getattr(job, "requirements", None),
            "skills_required": getattr(job, "skills_required", None),
        }

        # 2. Download + parse the CV. Falls back to empty text if unavailable.
        cv_bytes = download_file(application.resume_url) if application.resume_url else b""
        cv_text = cv_bytes.decode("utf-8", errors="ignore") if cv_bytes else ""
        parsed = ai_service.parse_cv(cv_text)

        # 3. Score with weighted dimensions.
        scores = ai_service.score_cv(parsed, job_dict)
        overall = round(
            scores.get("skills_score", 0) * WEIGHTS["skills"]
            + scores.get("experience_score", 0) * WEIGHTS["experience"]
            + scores.get("education_score", 0) * WEIGHTS["education"]
        )
        outcome = "passed" if overall >= PASS_THRESHOLD else "failed"

        # 4. Persist the stage result.
        stage_result = StageResult(
            application_id=application_id,
            stage="cv_screen",
            score=overall,
            outcome=outcome,
            breakdown={
                "skills_score": scores.get("skills_score"),
                "experience_score": scores.get("experience_score"),
                "education_score": scores.get("education_score"),
                "weights": WEIGHTS,
            },
            feedback=scores.get("reasoning"),
            raw_data={"parsed_cv": parsed},
        )
        session.add(stage_result)
        application.overall_score = overall
        if outcome == "passed":
            application.current_stage = "assessment"

        candidate_id = application.candidate_id

    # 5. Fire notifications concurrently (group runs the subtasks in parallel).
    title = "CV Screening Complete"
    body = (
        f"Your application has been screened (score {overall}/100, {outcome}). "
        "We'll be in touch with next steps."
    )
    group(
        send_notification.s(candidate_id, "email", title, body),
        send_notification.s(candidate_id, "whatsapp", title, body),
        send_notification.s(candidate_id, "in_app", title, body),
    ).apply_async()

    return {"status": "ok", "overall_score": overall, "outcome": outcome}
