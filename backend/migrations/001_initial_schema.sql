-- HireMind Initial Database Schema
-- Run against a PostgreSQL database (Supabase-compatible)

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─────────────────────────────────────────────────────────────────────────────
-- TENANTS (companies using HireMind)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE tenants (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name            TEXT NOT NULL,
    slug            TEXT NOT NULL UNIQUE,
    logo_url        TEXT,
    industry        TEXT,
    size            TEXT,
    website         TEXT,
    about           TEXT,
    verified        BOOLEAN DEFAULT FALSE,
    trial_ends_at   TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days'),
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- USERS
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE users (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id   UUID REFERENCES tenants(id) ON DELETE SET NULL,
    email       TEXT NOT NULL UNIQUE,
    name        TEXT NOT NULL,
    role        TEXT NOT NULL CHECK (role IN ('admin', 'recruiter', 'candidate')),
    avatar_url  TEXT,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- CANDIDATE PROFILES
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE candidate_profiles (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id             UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    phone               TEXT,
    location            TEXT,
    current_title       TEXT,
    current_company     TEXT,
    experience_years    INT,
    current_ctc         DECIMAL(12,2),
    expected_ctc        DECIMAL(12,2),
    notice_period       TEXT,
    work_mode           TEXT CHECK (work_mode IN ('remote', 'hybrid', 'onsite')),
    skills              TEXT[] DEFAULT '{}',
    linkedin_url        TEXT,
    portfolio_url       TEXT,
    resume_url          TEXT,
    resume_parsed_at    TIMESTAMPTZ,
    completeness_score  INT DEFAULT 0,
    job_seeking_status  TEXT DEFAULT 'hidden' CHECK (job_seeking_status IN ('active', 'open', 'hidden')),
    is_fresher          BOOLEAN DEFAULT FALSE,
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE work_experiences (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    candidate_id    UUID NOT NULL REFERENCES candidate_profiles(id) ON DELETE CASCADE,
    company         TEXT NOT NULL,
    title           TEXT NOT NULL,
    start_date      DATE,
    end_date        DATE,
    is_current      BOOLEAN DEFAULT FALSE,
    description     TEXT
);

CREATE TABLE educations (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    candidate_id    UUID NOT NULL REFERENCES candidate_profiles(id) ON DELETE CASCADE,
    degree          TEXT NOT NULL,
    institution     TEXT NOT NULL,
    year            INT,
    grade           TEXT
);

-- ─────────────────────────────────────────────────────────────────────────────
-- JOBS
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE jobs (
    id                      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id               UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    title                   TEXT NOT NULL,
    department              TEXT,
    location                TEXT,
    work_mode               TEXT CHECK (work_mode IN ('remote', 'hybrid', 'onsite')),
    employment_type         TEXT DEFAULT 'full_time',
    experience_min          INT,
    experience_max          INT,
    salary_min              DECIMAL(12,2),
    salary_max              DECIMAL(12,2),
    salary_hidden           BOOLEAN DEFAULT FALSE,
    skills_required         TEXT[] DEFAULT '{}',
    description             TEXT,
    status                  TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'closed')),
    include_assessment      BOOLEAN DEFAULT TRUE,
    openings                INT DEFAULT 1,
    filled_count            INT DEFAULT 0,
    auto_reject_threshold   INT DEFAULT 50,
    anonymised_screening    BOOLEAN DEFAULT FALSE,
    competencies            TEXT[] DEFAULT '{}',
    created_by              UUID REFERENCES users(id),
    created_at              TIMESTAMPTZ DEFAULT NOW(),
    updated_at              TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- APPLICATIONS
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE applications (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id          UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    candidate_id    UUID NOT NULL REFERENCES users(id),
    tenant_id       UUID NOT NULL REFERENCES tenants(id),
    status          TEXT NOT NULL DEFAULT 'applied' CHECK (status IN (
                        'applied','cv_screening','voice_interview','assessment',
                        'deep_interview','selection','selected','rejected','withdrawn'
                    )),
    cv_url          TEXT,
    cv_snapshot_url TEXT,
    source          TEXT DEFAULT 'direct',
    referrer_id     UUID REFERENCES users(id),
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (job_id, candidate_id)
);

-- ─────────────────────────────────────────────────────────────────────────────
-- STAGE RESULTS
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE stage_results (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id  UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    stage           TEXT NOT NULL CHECK (stage IN ('cv_screening','voice_interview','assessment','deep_interview')),
    status          TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','in_progress','completed','failed')),
    score_overall   INT,
    score_breakdown JSONB DEFAULT '{}',
    ai_summary      TEXT,
    transcript_url  TEXT,
    audio_url       TEXT,
    completed_at    TIMESTAMPTZ
);

-- ─────────────────────────────────────────────────────────────────────────────
-- INTERVIEW ROOMS (Vapi / AI interviews)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE interview_rooms (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id  UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    stage           TEXT NOT NULL,
    uuid            UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    expires_at      TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '48 hours'),
    completed_at    TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- ASSESSMENTS
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE assessments (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id              UUID NOT NULL REFERENCES jobs(id),
    application_id      UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    uuid                UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    questions           JSONB DEFAULT '[]',
    answers             JSONB DEFAULT '{}',
    time_limit_minutes  INT DEFAULT 30,
    score               INT,
    tab_switches        INT DEFAULT 0,
    status              TEXT DEFAULT 'pending' CHECK (status IN ('pending','in_progress','completed')),
    expires_at          TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '72 hours'),
    started_at          TIMESTAMPTZ,
    completed_at        TIMESTAMPTZ
);

-- ─────────────────────────────────────────────────────────────────────────────
-- RECRUITER NOTES & ACTIVITY
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE recruiter_notes (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id  UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    user_id         UUID NOT NULL REFERENCES users(id),
    content         TEXT NOT NULL,
    tags            TEXT[] DEFAULT '{}',
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE activity_logs (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id  UUID REFERENCES applications(id) ON DELETE SET NULL,
    tenant_id       UUID REFERENCES tenants(id),
    user_id         UUID REFERENCES users(id),
    action          TEXT NOT NULL,
    metadata        JSONB DEFAULT '{}',
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- NOTIFICATIONS
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE notifications (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type        TEXT NOT NULL,
    title       TEXT NOT NULL,
    body        TEXT,
    read        BOOLEAN DEFAULT FALSE,
    metadata    JSONB DEFAULT '{}',
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- TEAM & TALENT POOL
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE team_invites (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id   UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    email       TEXT NOT NULL,
    role        TEXT NOT NULL,
    token       TEXT NOT NULL UNIQUE,
    expires_at  TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '7 days'),
    accepted_at TIMESTAMPTZ
);

CREATE TABLE talent_pool (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id       UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    candidate_id    UUID NOT NULL REFERENCES users(id),
    tags            TEXT[] DEFAULT '{}',
    notes           TEXT,
    added_at        TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (tenant_id, candidate_id)
);

-- ─────────────────────────────────────────────────────────────────────────────
-- EMAIL TEMPLATES
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE email_templates (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id   UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    trigger     TEXT NOT NULL,
    subject     TEXT NOT NULL,
    body        TEXT NOT NULL,
    variables   TEXT[] DEFAULT '{}',
    updated_at  TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (tenant_id, trigger)
);

-- ─────────────────────────────────────────────────────────────────────────────
-- INDEXES
-- ─────────────────────────────────────────────────────────────────────────────
CREATE INDEX idx_jobs_tenant ON jobs(tenant_id);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_applications_job ON applications(job_id);
CREATE INDEX idx_applications_candidate ON applications(candidate_id);
CREATE INDEX idx_applications_tenant ON applications(tenant_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_stage_results_application ON stage_results(application_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(user_id, read);
CREATE INDEX idx_activity_logs_application ON activity_logs(application_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY (Supabase)
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE stage_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Tenants: members can only see their own tenant
CREATE POLICY tenant_isolation ON tenants
    USING (id = (SELECT tenant_id FROM users WHERE id = auth.uid()));

-- Jobs: recruiters see only their tenant's jobs; candidates see active jobs
CREATE POLICY job_recruiter_access ON jobs
    USING (tenant_id = (SELECT tenant_id FROM users WHERE id = auth.uid() AND role IN ('admin','recruiter')));

-- Applications: candidates see own; recruiters see their tenant's
CREATE POLICY application_candidate_access ON applications
    USING (
        candidate_id = auth.uid()
        OR tenant_id = (SELECT tenant_id FROM users WHERE id = auth.uid() AND role IN ('admin','recruiter'))
    );

-- Notifications: users see only their own
CREATE POLICY notification_owner ON notifications
    USING (user_id = auth.uid());
