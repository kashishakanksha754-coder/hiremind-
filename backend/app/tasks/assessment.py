"""Assessment generation and grading Celery tasks."""
import logging
from datetime import datetime, timezone

from celery import group

from celery_app import celery
from app.models.application import Application
from app.models.assessment import (
    Assessment,
    AssessmentAnswer,
    AssessmentQuestion,
)
from app.models.job import Job
from app.models.stage_result import StageResult
from app.services import ai_service
from app.tasks._db import sync_session
from app.tasks.notifications import send_notification

logger = logging.getLogger(__name__)

PASS_THRESHOLD = 60


@celery.task(name="app.tasks.assessment.generate_assessment")
def generate_assessment(job_id: str, application_id: str) -> dict:
    """Generate a 15-question assessment for an application and send invites."""
    with sync_session() as session:
        job = session.get(Job, job_id)
        if job is None:
            return {"status": "error", "reason": "job_not_found"}

        job_dict = {
            "title": job.title,
            "description": job.description,
            "requirements": job.requirements,
            "skills_required": job.skills_required,
        }
        questions = ai_service.generate_assessment_questions(job_dict)

        assessment = Assessment(
            job_id=job_id,
            application_id=application_id,
            title=f"{job.title} Assessment",
            status="sent",
        )
        session.add(assessment)
        session.flush()  # assign assessment.id

        for position, q in enumerate(questions):
            session.add(
                AssessmentQuestion(
                    assessment_id=assessment.id,
                    question_type=q.get("question_type", "short_answer"),
                    prompt=q.get("prompt", ""),
                    options=q.get("options"),
                    correct_answer=q.get("correct_answer"),
                    rubric=q.get("rubric"),
                    points=q.get("points", 1),
                    position=position,
                )
            )

        assessment_id = assessment.id

        application = session.get(Application, application_id)
        candidate_id = application.candidate_id if application else None

    if candidate_id:
        link = f"https://app.hiremind.ai/assessment/{assessment_id}"
        title = "Complete Your Skills Assessment"
        body = f"You've been invited to a skills assessment: {link}"
        group(
            send_notification.s(candidate_id, "email", title, body),
            send_notification.s(candidate_id, "in_app", title, body),
        ).apply_async()

    return {"status": "ok", "assessment_id": assessment_id, "questions": len(questions)}


@celery.task(name="app.tasks.assessment.grade_assessment")
def grade_assessment(assessment_id: str) -> dict:
    """Grade a submitted assessment and record a stage result.

    MCQ answers are graded by exact match; short answers are graded by GPT-4o
    against the question rubric. The overall score is the weighted percentage of
    points awarded.
    """
    with sync_session() as session:
        assessment = session.get(Assessment, assessment_id)
        if assessment is None:
            return {"status": "error", "reason": "assessment_not_found"}

        questions = {
            q.id: q for q in assessment.questions  # type: ignore[attr-defined]
        }
        answers = (
            session.query(AssessmentAnswer)
            .filter(AssessmentAnswer.assessment_id == assessment_id)
            .all()
        )

        total_points = 0
        awarded_points = 0

        for answer in answers:
            question = questions.get(answer.question_id)
            if question is None:
                continue
            total_points += question.points

            if question.question_type == "mcq":
                correct = (
                    (answer.response or "").strip().lower()
                    == (question.correct_answer or "").strip().lower()
                )
                answer.is_correct = correct
                answer.awarded_points = question.points if correct else 0
                answer.feedback = "Correct" if correct else "Incorrect"
            else:
                grade = ai_service.grade_short_answer(
                    answer.response or "", question.rubric or ""
                )
                fraction = max(0, min(100, grade.get("score", 0))) / 100.0
                answer.awarded_points = round(question.points * fraction)
                answer.is_correct = answer.awarded_points >= (question.points / 2)
                answer.feedback = grade.get("feedback")

            awarded_points += answer.awarded_points or 0

        overall = round((awarded_points / total_points) * 100) if total_points else 0
        outcome = "passed" if overall >= PASS_THRESHOLD else "failed"

        assessment.overall_score = overall
        assessment.status = "graded"
        assessment.submitted_at = datetime.now(timezone.utc)

        stage_result = StageResult(
            application_id=assessment.application_id,
            stage="assessment",
            score=overall,
            outcome=outcome,
            breakdown={
                "awarded_points": awarded_points,
                "total_points": total_points,
            },
        )
        session.add(stage_result)

        application = session.get(Application, assessment.application_id)
        candidate_id = application.candidate_id if application else None
        if application and outcome == "passed":
            application.current_stage = "voice_interview"

    if candidate_id:
        title = "Assessment Graded"
        body = f"Your assessment score is {overall}/100 ({outcome})."
        group(
            send_notification.s(candidate_id, "email", title, body),
            send_notification.s(candidate_id, "in_app", title, body),
        ).apply_async()

    return {"status": "ok", "overall_score": overall, "outcome": outcome}
