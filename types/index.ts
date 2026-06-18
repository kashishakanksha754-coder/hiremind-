// ============================================================================
// HireMind shared TypeScript types — mirror the backend DB schema.
// ============================================================================

export type UUID = string;
export type ISODate = string;

export type UserRole = "recruiter" | "candidate" | "admin";

export type PlanTier = "starter" | "pro" | "enterprise";

export type TenantStatus = "trial" | "active" | "suspended" | "cancelled";

export type StageKey =
  | "cv_screening"
  | "voice_interview"
  | "skill_assessment"
  | "deep_interview"
  | "selection"
  | "offer";

export type ApplicationStatus =
  | "applied"
  | "in_progress"
  | "advanced"
  | "rejected"
  | "on_hold"
  | "withdrawn"
  | "hired";

export type WorkMode = "onsite" | "remote" | "hybrid";

export type JobStatus = "draft" | "open" | "paused" | "closed";

export type NotificationChannel = "in_app" | "email" | "whatsapp";

// ---------------------------------------------------------------------------

export interface Tenant {
  id: UUID;
  name: string;
  slug: string;
  industry?: string;
  size?: string;
  website?: string;
  logo_url?: string;
  about?: string;
  plan: PlanTier;
  status: TenantStatus;
  trial_ends_at?: ISODate;
  created_at: ISODate;
}

export interface User {
  id: UUID;
  tenant_id?: UUID;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  created_at: ISODate;
}

export interface WorkExperience {
  id: UUID;
  company: string;
  title: string;
  start_date: ISODate;
  end_date?: ISODate;
  current: boolean;
  description?: string;
}

export interface Education {
  id: UUID;
  institution: string;
  degree: string;
  field?: string;
  start_year?: number;
  end_year?: number;
}

export interface CandidateProfile {
  id: UUID;
  user_id: UUID;
  headline?: string;
  phone?: string;
  location?: string;
  summary?: string;
  skills: string[];
  experience: WorkExperience[];
  education: Education[];
  resume_url?: string;
  completeness: number;
  preferences?: {
    work_mode?: WorkMode;
    expected_salary?: string;
    locations?: string[];
  };
}

export interface Competency {
  name: string;
  weight: number;
}

export interface Job {
  id: UUID;
  tenant_id: UUID;
  title: string;
  slug: string;
  location: string;
  work_mode: WorkMode;
  description: string;
  skills: string[];
  competencies: Competency[];
  salary_min?: number;
  salary_max?: number;
  show_salary: boolean;
  status: JobStatus;
  pipeline_config: {
    enable_assessment: boolean;
    enable_voice: boolean;
    auto_reject_threshold: number;
    anonymised_screening: boolean;
  };
  applicants_count: number;
  created_at: ISODate;
}

export interface StageResult {
  id: UUID;
  application_id: UUID;
  stage: StageKey;
  score: number;
  breakdown: { label: string; value: number; weight: number }[];
  ai_summary: string;
  passed: boolean;
  created_at: ISODate;
}

export interface Application {
  id: UUID;
  job_id: UUID;
  candidate_id: UUID;
  candidate_name: string;
  current_stage: StageKey;
  status: ApplicationStatus;
  overall_score?: number;
  days_in_stage: number;
  stage_results: StageResult[];
  applied_at: ISODate;
}

export interface InterviewRoom {
  id: UUID;
  uuid: UUID;
  application_id: UUID;
  status: "pending" | "in_progress" | "completed" | "expired";
  transcript?: string;
  expires_at: ISODate;
  created_at: ISODate;
}

export interface AssessmentQuestion {
  id: UUID;
  type: "mcq" | "short_answer";
  prompt: string;
  options?: string[];
  correct_option?: number;
  rubric?: string;
}

export interface Assessment {
  id: UUID;
  uuid: UUID;
  application_id: UUID;
  job_id: UUID;
  questions: AssessmentQuestion[];
  duration_minutes: number;
  status: "pending" | "in_progress" | "submitted" | "graded";
  score?: number;
  expires_at: ISODate;
}

export interface RecruiterNote {
  id: UUID;
  application_id: UUID;
  author_name: string;
  body: string;
  created_at: ISODate;
}

export interface ActivityLog {
  id: UUID;
  application_id: UUID;
  actor: string;
  action: string;
  created_at: ISODate;
}

export interface Notification {
  id: UUID;
  user_id: UUID;
  title: string;
  body: string;
  channel: NotificationChannel;
  read: boolean;
  link?: string;
  created_at: ISODate;
}

export interface TalentPoolEntry {
  id: UUID;
  tenant_id: UUID;
  candidate_id: UUID;
  candidate_name: string;
  tags: string[];
  added_at: ISODate;
}

// ---------------------------------------------------------------------------
// API + form types

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface SignupForm {
  email: string;
  password: string;
  full_name: string;
  role: UserRole;
  company_name?: string;
  source?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  company?: string;
  message: string;
  request_demo: boolean;
}
