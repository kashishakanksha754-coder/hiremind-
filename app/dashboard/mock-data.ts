// ============================================================================
// Mock data for the Recruit AI recruiter dashboard (Indian-context sample data).
// All objects are typed against types/index.ts so pages stay schema-accurate.
// ============================================================================

import type {
  ActivityLog,
  Application,
  Job,
  Notification,
  RecruiterNote,
  StageKey,
  StageResult,
} from "@/types";

export const TENANT_ID = "tnt_loopmethods";

export const STAGE_ORDER: StageKey[] = [
  "cv_screening",
  "voice_interview",
  "skill_assessment",
  "deep_interview",
  "selection",
  "offer",
];

export const STAGE_LABELS: Record<StageKey, string> = {
  cv_screening: "CV Screening",
  voice_interview: "Voice Interview",
  skill_assessment: "Skill Assessment",
  deep_interview: "Deep Interview",
  selection: "Selection",
  offer: "Offer",
};

// Tailwind color tokens per stage — used for the segmented mini-bars / kanban.
export const STAGE_COLORS: Record<StageKey, string> = {
  cv_screening: "bg-accent-blue",
  voice_interview: "bg-accent-violet",
  skill_assessment: "bg-warning",
  deep_interview: "bg-success",
  selection: "bg-pink-500",
  offer: "bg-emerald-400",
};

export const STAGE_DOT: Record<StageKey, string> = {
  cv_screening: "text-accent-blue",
  voice_interview: "text-accent-violet",
  skill_assessment: "text-warning",
  deep_interview: "text-success",
  selection: "text-pink-500",
  offer: "text-emerald-400",
};

// ---------------------------------------------------------------------------
// Jobs
// ---------------------------------------------------------------------------

export const JOBS: Job[] = [
  {
    id: "job_001",
    tenant_id: TENANT_ID,
    title: "Senior Backend Engineer",
    slug: "senior-backend-engineer",
    location: "Bengaluru, Karnataka",
    work_mode: "hybrid",
    description:
      "We're hiring a Senior Backend Engineer to own our payments and matching services. You'll design scalable APIs, mentor juniors, and partner with product to ship fast.",
    skills: ["Go", "PostgreSQL", "Kafka", "Kubernetes", "gRPC", "Redis"],
    competencies: [
      { name: "System Design", weight: 30 },
      { name: "Coding Proficiency", weight: 30 },
      { name: "Communication", weight: 20 },
      { name: "Ownership", weight: 20 },
    ],
    salary_min: 3500000,
    salary_max: 5500000,
    show_salary: true,
    status: "open",
    pipeline_config: {
      enable_assessment: true,
      enable_voice: true,
      auto_reject_threshold: 45,
      anonymised_screening: true,
    },
    applicants_count: 184,
    created_at: "2026-05-21T09:00:00Z",
  },
  {
    id: "job_002",
    tenant_id: TENANT_ID,
    title: "Product Designer (UX)",
    slug: "product-designer-ux",
    location: "Remote (India)",
    work_mode: "remote",
    description:
      "Lead end-to-end design for our candidate experience. Strong portfolio in B2B SaaS and a systems mindset required.",
    skills: ["Figma", "Design Systems", "Prototyping", "User Research"],
    competencies: [
      { name: "Visual Craft", weight: 35 },
      { name: "UX Thinking", weight: 35 },
      { name: "Collaboration", weight: 30 },
    ],
    salary_min: 2200000,
    salary_max: 3200000,
    show_salary: true,
    status: "open",
    pipeline_config: {
      enable_assessment: true,
      enable_voice: false,
      auto_reject_threshold: 40,
      anonymised_screening: false,
    },
    applicants_count: 97,
    created_at: "2026-05-30T09:00:00Z",
  },
  {
    id: "job_003",
    tenant_id: TENANT_ID,
    title: "Data Analyst",
    slug: "data-analyst",
    location: "Pune, Maharashtra",
    work_mode: "onsite",
    description:
      "Turn raw product and hiring data into decisions. SQL fluency and a storytelling instinct are a must.",
    skills: ["SQL", "Python", "Tableau", "Statistics", "dbt"],
    competencies: [
      { name: "Analytical Rigor", weight: 40 },
      { name: "SQL", weight: 30 },
      { name: "Communication", weight: 30 },
    ],
    salary_min: 1200000,
    salary_max: 1800000,
    show_salary: false,
    status: "paused",
    pipeline_config: {
      enable_assessment: true,
      enable_voice: true,
      auto_reject_threshold: 50,
      anonymised_screening: true,
    },
    applicants_count: 142,
    created_at: "2026-04-18T09:00:00Z",
  },
  {
    id: "job_004",
    tenant_id: TENANT_ID,
    title: "Customer Success Manager",
    slug: "customer-success-manager",
    location: "Gurugram, Haryana",
    work_mode: "hybrid",
    description:
      "Own a portfolio of enterprise accounts, drive adoption, and be the voice of the customer internally.",
    skills: ["Account Management", "SaaS", "Onboarding", "Negotiation"],
    competencies: [
      { name: "Relationship Building", weight: 40 },
      { name: "Product Knowledge", weight: 30 },
      { name: "Problem Solving", weight: 30 },
    ],
    salary_min: 1500000,
    salary_max: 2400000,
    show_salary: true,
    status: "draft",
    pipeline_config: {
      enable_assessment: false,
      enable_voice: true,
      auto_reject_threshold: 35,
      anonymised_screening: false,
    },
    applicants_count: 0,
    created_at: "2026-06-12T09:00:00Z",
  },
  {
    id: "job_005",
    tenant_id: TENANT_ID,
    title: "DevOps Engineer",
    slug: "devops-engineer",
    location: "Hyderabad, Telangana",
    work_mode: "hybrid",
    description:
      "Build and operate our cloud platform. You live in Terraform, CI/CD, and observability.",
    skills: ["AWS", "Terraform", "Docker", "Kubernetes", "Prometheus"],
    competencies: [
      { name: "Infrastructure", weight: 40 },
      { name: "Automation", weight: 35 },
      { name: "Reliability", weight: 25 },
    ],
    salary_min: 2800000,
    salary_max: 4200000,
    show_salary: true,
    status: "closed",
    pipeline_config: {
      enable_assessment: true,
      enable_voice: false,
      auto_reject_threshold: 45,
      anonymised_screening: true,
    },
    applicants_count: 121,
    created_at: "2026-03-10T09:00:00Z",
  },
];

// Per-job distribution of applicants across the 6 stages (for mini-bars / funnel).
export const STAGE_DISTRIBUTION: Record<
  string,
  Record<StageKey, number>
> = {
  job_001: {
    cv_screening: 84,
    voice_interview: 41,
    skill_assessment: 28,
    deep_interview: 16,
    selection: 9,
    offer: 6,
  },
  job_002: {
    cv_screening: 38,
    voice_interview: 22,
    skill_assessment: 18,
    deep_interview: 11,
    selection: 5,
    offer: 3,
  },
  job_003: {
    cv_screening: 61,
    voice_interview: 33,
    skill_assessment: 24,
    deep_interview: 14,
    selection: 7,
    offer: 3,
  },
  job_004: {
    cv_screening: 0,
    voice_interview: 0,
    skill_assessment: 0,
    deep_interview: 0,
    selection: 0,
    offer: 0,
  },
  job_005: {
    cv_screening: 52,
    voice_interview: 31,
    skill_assessment: 19,
    deep_interview: 11,
    selection: 5,
    offer: 3,
  },
};

export function getJob(id: string): Job | undefined {
  return JOBS.find((j) => j.id === id);
}

// ---------------------------------------------------------------------------
// Stage results helper
// ---------------------------------------------------------------------------

function makeStageResult(
  appId: string,
  stage: StageKey,
  score: number,
  breakdown: { label: string; value: number; weight: number }[],
  summary: string
): StageResult {
  return {
    id: `sr_${appId}_${stage}`,
    application_id: appId,
    stage,
    score,
    breakdown,
    ai_summary: summary,
    passed: score >= 60,
    created_at: "2026-06-10T10:00:00Z",
  };
}

// ---------------------------------------------------------------------------
// Applications (candidates) — keyed by job
// ---------------------------------------------------------------------------

export const APPLICATIONS: Application[] = [
  {
    id: "app_1001",
    job_id: "job_001",
    candidate_id: "cand_1001",
    candidate_name: "Aarav Mehta",
    current_stage: "deep_interview",
    status: "in_progress",
    overall_score: 87,
    days_in_stage: 2,
    applied_at: "2026-06-01T08:30:00Z",
    stage_results: [
      makeStageResult(
        "app_1001",
        "cv_screening",
        91,
        [
          { label: "Relevant Experience", value: 92, weight: 40 },
          { label: "Skill Match", value: 90, weight: 35 },
          { label: "Education", value: 88, weight: 25 },
        ],
        "8 years of backend experience with strong Go and distributed systems background. Resume closely matches the role."
      ),
      makeStageResult(
        "app_1001",
        "voice_interview",
        85,
        [
          { label: "Communication", value: 88, weight: 50 },
          { label: "Clarity of Thought", value: 82, weight: 50 },
        ],
        "Articulate and structured. Explained past architecture decisions confidently with measurable impact."
      ),
      makeStageResult(
        "app_1001",
        "skill_assessment",
        84,
        [
          { label: "Coding", value: 86, weight: 60 },
          { label: "System Design", value: 81, weight: 40 },
        ],
        "Clean, idiomatic code and solid design tradeoff reasoning. Missed one edge case under time pressure."
      ),
    ],
  },
  {
    id: "app_1002",
    job_id: "job_001",
    candidate_id: "cand_1002",
    candidate_name: "Priya Sharma",
    current_stage: "voice_interview",
    status: "in_progress",
    overall_score: 78,
    days_in_stage: 5,
    applied_at: "2026-06-02T08:30:00Z",
    stage_results: [
      makeStageResult(
        "app_1002",
        "cv_screening",
        79,
        [
          { label: "Relevant Experience", value: 80, weight: 40 },
          { label: "Skill Match", value: 78, weight: 35 },
          { label: "Education", value: 79, weight: 25 },
        ],
        "Solid 5-year backend profile. Some gaps in Kafka/streaming experience but strong fundamentals."
      ),
    ],
  },
  {
    id: "app_1003",
    job_id: "job_001",
    candidate_id: "cand_1003",
    candidate_name: "Rohan Iyer",
    current_stage: "cv_screening",
    status: "applied",
    overall_score: 64,
    days_in_stage: 9,
    applied_at: "2026-06-04T08:30:00Z",
    stage_results: [
      makeStageResult(
        "app_1003",
        "cv_screening",
        64,
        [
          { label: "Relevant Experience", value: 62, weight: 40 },
          { label: "Skill Match", value: 66, weight: 35 },
          { label: "Education", value: 65, weight: 25 },
        ],
        "Mid-level profile with adjacent stack experience. Worth a screening call to verify depth."
      ),
    ],
  },
  {
    id: "app_1004",
    job_id: "job_001",
    candidate_id: "cand_1004",
    candidate_name: "Sneha Reddy",
    current_stage: "skill_assessment",
    status: "in_progress",
    overall_score: 81,
    days_in_stage: 1,
    applied_at: "2026-06-03T08:30:00Z",
    stage_results: [
      makeStageResult(
        "app_1004",
        "cv_screening",
        83,
        [
          { label: "Relevant Experience", value: 84, weight: 40 },
          { label: "Skill Match", value: 82, weight: 35 },
          { label: "Education", value: 83, weight: 25 },
        ],
        "Strong infra-adjacent backend candidate. Good open-source footprint."
      ),
      makeStageResult(
        "app_1004",
        "voice_interview",
        80,
        [
          { label: "Communication", value: 81, weight: 50 },
          { label: "Clarity of Thought", value: 79, weight: 50 },
        ],
        "Confident communicator, gave concrete examples of scaling work."
      ),
    ],
  },
  {
    id: "app_1005",
    job_id: "job_001",
    candidate_id: "cand_1005",
    candidate_name: "Vikram Nair",
    current_stage: "selection",
    status: "advanced",
    overall_score: 89,
    days_in_stage: 3,
    applied_at: "2026-05-28T08:30:00Z",
    stage_results: [
      makeStageResult(
        "app_1005",
        "cv_screening",
        90,
        [
          { label: "Relevant Experience", value: 91, weight: 40 },
          { label: "Skill Match", value: 89, weight: 35 },
          { label: "Education", value: 90, weight: 25 },
        ],
        "Excellent senior profile, ex-FAANG with payments domain depth."
      ),
      makeStageResult(
        "app_1005",
        "deep_interview",
        88,
        [
          { label: "System Design", value: 90, weight: 50 },
          { label: "Leadership", value: 86, weight: 50 },
        ],
        "Outstanding architectural depth and a clear mentoring philosophy."
      ),
    ],
  },
  {
    id: "app_1006",
    job_id: "job_001",
    candidate_id: "cand_1006",
    candidate_name: "Ananya Gupta",
    current_stage: "offer",
    status: "hired",
    overall_score: 92,
    days_in_stage: 1,
    applied_at: "2026-05-25T08:30:00Z",
    stage_results: [
      makeStageResult(
        "app_1006",
        "selection",
        92,
        [
          { label: "Panel Score", value: 93, weight: 60 },
          { label: "Culture Fit", value: 90, weight: 40 },
        ],
        "Unanimous panel approval. Top-of-funnel candidate."
      ),
    ],
  },
  {
    id: "app_1007",
    job_id: "job_001",
    candidate_id: "cand_1007",
    candidate_name: "Karthik Subramanian",
    current_stage: "voice_interview",
    status: "in_progress",
    overall_score: 71,
    days_in_stage: 6,
    applied_at: "2026-06-05T08:30:00Z",
    stage_results: [
      makeStageResult(
        "app_1007",
        "cv_screening",
        72,
        [
          { label: "Relevant Experience", value: 70, weight: 40 },
          { label: "Skill Match", value: 74, weight: 35 },
          { label: "Education", value: 72, weight: 25 },
        ],
        "Capable candidate with a slightly different stack. Transferable skills look promising."
      ),
    ],
  },
  {
    id: "app_1008",
    job_id: "job_001",
    candidate_id: "cand_1008",
    candidate_name: "Meera Joshi",
    current_stage: "cv_screening",
    status: "applied",
    overall_score: 58,
    days_in_stage: 4,
    applied_at: "2026-06-08T08:30:00Z",
    stage_results: [
      makeStageResult(
        "app_1008",
        "cv_screening",
        58,
        [
          { label: "Relevant Experience", value: 56, weight: 40 },
          { label: "Skill Match", value: 60, weight: 35 },
          { label: "Education", value: 58, weight: 25 },
        ],
        "Borderline against the auto-reject threshold. Junior for a senior role."
      ),
    ],
  },
];

export function getApplicationsForJob(jobId: string): Application[] {
  return APPLICATIONS.filter((a) => a.job_id === jobId);
}

export function getApplication(appId: string): Application | undefined {
  return APPLICATIONS.find((a) => a.id === appId);
}

// Candidate extra detail (contact + skills) keyed by candidate_id.
export const CANDIDATE_DETAILS: Record<
  string,
  { headline: string; email: string; phone: string; location: string; skills: string[] }
> = {
  cand_1001: {
    headline: "Senior Backend Engineer · 8 yrs · ex-Razorpay",
    email: "aarav.mehta@example.com",
    phone: "+91 98765 43210",
    location: "Bengaluru, Karnataka",
    skills: ["Go", "PostgreSQL", "Kafka", "Kubernetes", "gRPC", "Redis", "AWS"],
  },
  cand_1002: {
    headline: "Backend Engineer · 5 yrs · ex-Swiggy",
    email: "priya.sharma@example.com",
    phone: "+91 99887 76655",
    location: "Bengaluru, Karnataka",
    skills: ["Java", "Spring", "PostgreSQL", "Redis", "Docker"],
  },
};

export function getCandidateDetail(candidateId: string) {
  return (
    CANDIDATE_DETAILS[candidateId] ?? {
      headline: "Backend Engineer",
      email: "candidate@example.com",
      phone: "+91 90000 00000",
      location: "India",
      skills: ["Go", "PostgreSQL", "Docker", "Redis"],
    }
  );
}

// ---------------------------------------------------------------------------
// Activity / notifications / notes
// ---------------------------------------------------------------------------

export const ACTIVITY_FEED: ActivityLog[] = [
  {
    id: "act_1",
    application_id: "app_1006",
    actor: "System",
    action: "Ananya Gupta accepted the offer for Senior Backend Engineer",
    created_at: "2026-06-17T07:10:00Z",
  },
  {
    id: "act_2",
    application_id: "app_1001",
    actor: "AI Interviewer",
    action: "Completed deep interview for Aarav Mehta — scored 88",
    created_at: "2026-06-17T06:40:00Z",
  },
  {
    id: "act_3",
    application_id: "app_1004",
    actor: "AI Assessor",
    action: "Sneha Reddy submitted skill assessment for review",
    created_at: "2026-06-16T18:25:00Z",
  },
  {
    id: "act_4",
    application_id: "app_1002",
    actor: "Kashish",
    action: "Invited Priya Sharma to a voice interview",
    created_at: "2026-06-16T15:02:00Z",
  },
  {
    id: "act_5",
    application_id: "app_1008",
    actor: "System",
    action: "23 new applicants for Product Designer (UX)",
    created_at: "2026-06-16T11:48:00Z",
  },
  {
    id: "act_6",
    application_id: "app_1003",
    actor: "AI Screener",
    action: "Auto-rejected 4 applicants below threshold for Data Analyst",
    created_at: "2026-06-15T09:30:00Z",
  },
];

export const NOTIFICATIONS: Notification[] = [
  {
    id: "ntf_1",
    user_id: "usr_kashish",
    title: "Offer accepted",
    body: "Ananya Gupta accepted the Senior Backend Engineer offer.",
    channel: "in_app",
    read: false,
    link: "/dashboard/jobs/job_001",
    created_at: "2026-06-17T07:10:00Z",
  },
  {
    id: "ntf_2",
    user_id: "usr_kashish",
    title: "Interview completed",
    body: "Aarav Mehta finished the deep interview (88/100).",
    channel: "in_app",
    read: false,
    link: "/dashboard/jobs/job_001",
    created_at: "2026-06-17T06:40:00Z",
  },
  {
    id: "ntf_3",
    user_id: "usr_kashish",
    title: "Assessment to review",
    body: "Sneha Reddy submitted a skill assessment.",
    channel: "in_app",
    read: false,
    link: "/dashboard/jobs/job_001",
    created_at: "2026-06-16T18:25:00Z",
  },
  {
    id: "ntf_4",
    user_id: "usr_kashish",
    title: "Trial reminder",
    body: "12 days left in your free trial.",
    channel: "in_app",
    read: true,
    created_at: "2026-06-15T09:00:00Z",
  },
];

export const SAMPLE_ACTIVITY_LOG: ActivityLog[] = [
  {
    id: "log_1",
    application_id: "app_1001",
    actor: "Aarav Mehta",
    action: "Applied to Senior Backend Engineer",
    created_at: "2026-06-01T08:30:00Z",
  },
  {
    id: "log_2",
    application_id: "app_1001",
    actor: "AI Screener",
    action: "Passed CV screening with score 91",
    created_at: "2026-06-02T10:15:00Z",
  },
  {
    id: "log_3",
    application_id: "app_1001",
    actor: "AI Interviewer",
    action: "Completed voice interview — scored 85",
    created_at: "2026-06-05T14:00:00Z",
  },
  {
    id: "log_4",
    application_id: "app_1001",
    actor: "AI Assessor",
    action: "Completed skill assessment — scored 84",
    created_at: "2026-06-09T16:30:00Z",
  },
  {
    id: "log_5",
    application_id: "app_1001",
    actor: "Kashish",
    action: "Advanced candidate to Deep Interview",
    created_at: "2026-06-15T11:00:00Z",
  },
];

export const SAMPLE_NOTES: RecruiterNote[] = [
  {
    id: "note_1",
    application_id: "app_1001",
    author_name: "Kashish",
    body: "Strong systems thinker. Confirm notice period and comp expectations on the next call.",
    created_at: "2026-06-15T11:05:00Z",
  },
  {
    id: "note_2",
    application_id: "app_1001",
    author_name: "Rahul (Hiring Manager)",
    body: "Loved the payments depth. Flagging as a priority candidate for the team.",
    created_at: "2026-06-16T09:20:00Z",
  },
];

// ---------------------------------------------------------------------------
// Team & misc for settings
// ---------------------------------------------------------------------------

export const TEAM_MEMBERS = [
  {
    id: "usr_kashish",
    name: "Kashish Arora",
    email: "kashish@loopmethods.com",
    role: "Admin",
    status: "active" as const,
  },
  {
    id: "usr_rahul",
    name: "Rahul Verma",
    email: "rahul@loopmethods.com",
    role: "Hiring Manager",
    status: "active" as const,
  },
  {
    id: "usr_divya",
    name: "Divya Krishnan",
    email: "divya@loopmethods.com",
    role: "Recruiter",
    status: "active" as const,
  },
  {
    id: "usr_amit",
    name: "Amit Patel",
    email: "amit@loopmethods.com",
    role: "Recruiter",
    status: "invited" as const,
  },
];

export const EMAIL_TEMPLATES = [
  {
    key: "application_received",
    label: "Application received",
    description: "Sent immediately after a candidate applies.",
    body:
      "Hi {{candidate_name}},\n\nThanks for applying to the {{job_title}} role at {{company}}. We've received your application and our AI screener will review it shortly.\n\n— Team {{company}}",
  },
  {
    key: "cv_passed",
    label: "CV passed",
    description: "Sent when a candidate clears CV screening.",
    body:
      "Hi {{candidate_name}},\n\nGreat news — you've cleared the first round for {{job_title}}. We'll be in touch with next steps soon.\n\n— Team {{company}}",
  },
  {
    key: "interview_invite",
    label: "Interview invite",
    description: "Invitation to the AI voice/deep interview.",
    body:
      "Hi {{candidate_name}},\n\nYou're invited to an interview for {{job_title}}. Use this link to begin at your convenience: {{interview_link}}\n\n— Team {{company}}",
  },
  {
    key: "assessment_invite",
    label: "Assessment invite",
    description: "Invitation to the skill assessment.",
    body:
      "Hi {{candidate_name}},\n\nPlease complete the skill assessment for {{job_title}} within 72 hours: {{assessment_link}}\n\n— Team {{company}}",
  },
  {
    key: "rejection",
    label: "Rejection",
    description: "Sent when a candidate is not moving forward.",
    body:
      "Hi {{candidate_name}},\n\nThank you for your interest in {{job_title}}. After careful review we won't be moving forward at this time, but we'd love to keep you in our talent pool.\n\n— Team {{company}}",
  },
  {
    key: "offer",
    label: "Offer",
    description: "Sent with an offer letter.",
    body:
      "Hi {{candidate_name}},\n\nWe're thrilled to offer you the {{job_title}} role at {{company}}! Your offer letter is attached. Welcome aboard.\n\n— Team {{company}}",
  },
];
