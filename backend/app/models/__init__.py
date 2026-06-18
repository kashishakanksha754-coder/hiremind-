"""Import all ORM models so they register with the declarative Base."""
from app.models.application import Application, RecruiterNote
from app.models.assessment import (
    Assessment,
    AssessmentAnswer,
    AssessmentQuestion,
)
from app.models.job import Job
from app.models.stage_result import (
    ActivityLog,
    InterviewRoom,
    Notification,
    StageResult,
    TalentPool,
)
from app.models.tenant import Tenant
from app.models.user import CandidateProfile, User

__all__ = [
    "Tenant",
    "User",
    "CandidateProfile",
    "Job",
    "Application",
    "RecruiterNote",
    "StageResult",
    "InterviewRoom",
    "ActivityLog",
    "Notification",
    "TalentPool",
    "Assessment",
    "AssessmentQuestion",
    "AssessmentAnswer",
]
