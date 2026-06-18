"""OpenAI GPT-4o wrapper for CV parsing, scoring and assessment grading.

All external calls are guarded so that a missing API key degrades gracefully
to deterministic fallbacks (useful in local/dev/CI environments).
"""
import json
import logging
from typing import Any

from app.config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()

try:  # pragma: no cover - optional dependency
    from openai import OpenAI

    _client: "OpenAI | None" = (
        OpenAI(api_key=settings.OPENAI_API_KEY) if settings.OPENAI_API_KEY else None
    )
except Exception:  # noqa: BLE001
    _client = None


def _chat_json(system: str, user: str, fallback: dict[str, Any]) -> dict[str, Any]:
    """Call GPT-4o expecting a JSON response, with graceful fallback."""
    if _client is None:
        logger.warning("OpenAI client unavailable; returning fallback response.")
        return fallback
    try:
        resp = _client.chat.completions.create(
            model=settings.OPENAI_MODEL,
            response_format={"type": "json_object"},
            messages=[
                {"role": "system", "content": system},
                {"role": "user", "content": user},
            ],
            temperature=0.2,
        )
        content = resp.choices[0].message.content or "{}"
        return json.loads(content)
    except Exception as exc:  # noqa: BLE001
        logger.exception("OpenAI call failed: %s", exc)
        return fallback


def parse_cv(text: str) -> dict[str, Any]:
    """Extract structured data from raw CV text."""
    fallback = {
        "name": None,
        "email": None,
        "phone": None,
        "skills": [],
        "years_experience": 0,
        "education": [],
        "work_experience": [],
        "summary": text[:280] if text else "",
    }
    return _chat_json(
        system=(
            "You are an expert resume parser. Return JSON with keys: name, email, "
            "phone, skills (array), years_experience (number), education (array), "
            "work_experience (array of {company, title, duration}), summary."
        ),
        user=f"Parse this resume:\n\n{text[:12000]}",
        fallback=fallback,
    )


def score_cv(cv: dict[str, Any], job: dict[str, Any]) -> dict[str, Any]:
    """Score a parsed CV against a job. Returns scores 0-100 per dimension."""
    fallback = {
        "skills_score": 50,
        "experience_score": 50,
        "education_score": 50,
        "reasoning": "Fallback score: AI scoring unavailable.",
    }
    result = _chat_json(
        system=(
            "You are a technical recruiter. Score the candidate against the job on "
            "three dimensions (0-100): skills_score, experience_score, "
            "education_score. Also return a short 'reasoning'. Return JSON."
        ),
        user=json.dumps({"cv": cv, "job": job})[:12000],
        fallback=fallback,
    )
    # Weighted overall: skills 40%, experience 35%, education 25%.
    overall = round(
        result.get("skills_score", 0) * 0.40
        + result.get("experience_score", 0) * 0.35
        + result.get("education_score", 0) * 0.25
    )
    result["overall_score"] = overall
    return result


def generate_assessment_questions(job: dict[str, Any]) -> list[dict[str, Any]]:
    """Generate 15 assessment questions (MCQ + short answer) for a job."""
    fallback = [
        {
            "question_type": "mcq",
            "prompt": f"Sample MCQ #{i + 1} for {job.get('title', 'role')}?",
            "options": ["A", "B", "C", "D"],
            "correct_answer": "A",
            "rubric": None,
            "points": 1,
        }
        if i % 2 == 0
        else {
            "question_type": "short_answer",
            "prompt": f"Sample short-answer #{i + 1} for {job.get('title', 'role')}?",
            "options": None,
            "correct_answer": None,
            "rubric": "Award full marks for a clear, correct, relevant answer.",
            "points": 2,
        }
        for i in range(15)
    ]
    result = _chat_json(
        system=(
            "You generate technical assessments. Produce exactly 15 questions mixing "
            "'mcq' and 'short_answer'. Return JSON {\"questions\": [ {question_type, "
            "prompt, options (mcq only), correct_answer (mcq only), rubric "
            "(short_answer only), points} ]}."
        ),
        user=json.dumps(job)[:12000],
        fallback={"questions": fallback},
    )
    questions = result.get("questions", fallback)
    return questions[:15]


def grade_short_answer(answer: str, rubric: str) -> dict[str, Any]:
    """Grade a short answer against a rubric. Returns score 0-100 + feedback."""
    fallback = {
        "score": 50 if answer else 0,
        "feedback": "Fallback grading: AI grading unavailable.",
    }
    return _chat_json(
        system=(
            "You are a strict grader. Given a candidate answer and a rubric, return "
            "JSON {score (0-100), feedback}."
        ),
        user=json.dumps({"answer": answer, "rubric": rubric})[:8000],
        fallback=fallback,
    )
