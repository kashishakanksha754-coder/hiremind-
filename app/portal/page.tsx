"use client";

import Link from "next/link";
import {
  ArrowRight,
  Mic,
  ClipboardCheck,
  Sparkles,
  MapPin,
  Briefcase,
  Check,
} from "lucide-react";
import type { StageKey, WorkMode } from "@/types";
import { cn, formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GradientButton } from "@/components/ui/GradientButton";
import { Button } from "@/components/ui/button";

const STAGES: { key: StageKey; label: string }[] = [
  { key: "cv_screening", label: "CV Screening" },
  { key: "voice_interview", label: "Voice Interview" },
  { key: "skill_assessment", label: "Assessment" },
  { key: "deep_interview", label: "Deep Interview" },
  { key: "selection", label: "Selection" },
  { key: "offer", label: "Offer" },
];

interface ActiveApp {
  id: string;
  jobTitle: string;
  company: string;
  appliedAt: string;
  currentStage: StageKey;
}

const ACTIVE_APPS: ActiveApp[] = [
  {
    id: "app-1",
    jobTitle: "Senior Frontend Engineer",
    company: "Razorpay",
    appliedAt: "2026-06-02",
    currentStage: "voice_interview",
  },
  {
    id: "app-2",
    jobTitle: "Product Designer",
    company: "Zomato",
    appliedAt: "2026-05-28",
    currentStage: "skill_assessment",
  },
  {
    id: "app-3",
    jobTitle: "Backend Engineer (Go)",
    company: "CRED",
    appliedAt: "2026-06-10",
    currentStage: "cv_screening",
  },
];

interface JobSuggestion {
  id: string;
  title: string;
  company: string;
  location: string;
  workMode: WorkMode;
  salary: string;
  match: number;
}

const SUGGESTIONS: JobSuggestion[] = [
  {
    id: "job-10",
    title: "Full Stack Engineer",
    company: "Swiggy",
    location: "Bengaluru",
    workMode: "hybrid",
    salary: "₹28–40 LPA",
    match: 92,
  },
  {
    id: "job-11",
    title: "UI Engineer",
    company: "Meesho",
    location: "Remote",
    workMode: "remote",
    salary: "₹22–32 LPA",
    match: 87,
  },
  {
    id: "job-12",
    title: "Frontend Lead",
    company: "PhonePe",
    location: "Pune",
    workMode: "onsite",
    salary: "₹35–50 LPA",
    match: 81,
  },
];

function StageProgress({ current }: { current: StageKey }) {
  const currentIdx = STAGES.findIndex((s) => s.key === current);
  return (
    <div className="flex items-center">
      {STAGES.map((stage, i) => {
        const completed = i < currentIdx;
        const isCurrent = i === currentIdx;
        return (
          <div key={stage.key} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full border text-[11px] font-semibold transition-colors",
                  completed &&
                    "border-success/40 bg-success/15 text-success",
                  isCurrent &&
                    "border-accent-blue bg-gradient-to-br from-accent-blue to-accent-violet text-white shadow-lg shadow-blue-500/30",
                  !completed && !isCurrent &&
                    "border-border-subtle bg-bg-secondary text-text-secondary"
                )}
              >
                {completed ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <span
                className={cn(
                  "hidden whitespace-nowrap text-[10px] sm:block",
                  isCurrent ? "text-text-primary" : "text-text-secondary"
                )}
              >
                {stage.label}
              </span>
            </div>
            {i < STAGES.length - 1 && (
              <div
                className={cn(
                  "mx-1 h-0.5 flex-1 rounded-full",
                  i < currentIdx ? "bg-success/40" : "bg-border-subtle"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function PortalHome() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">
          Welcome back, Rohan
        </h1>
        <p className="mt-1 text-text-secondary">
          Here is what is happening with your applications.
        </p>
      </div>

      {/* Next action */}
      <Card className="overflow-hidden border-accent-blue/30 bg-gradient-to-br from-accent-blue/10 via-card to-accent-violet/10">
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue to-accent-violet text-white">
              <Mic className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-accent-blue">
                Your next action
              </span>
              <h3 className="font-display text-lg font-semibold">
                Voice interview for Senior Frontend Engineer @ Razorpay
              </h3>
              <p className="text-sm text-text-secondary">
                Your AI interview with Aria is ready. It takes about 20 minutes.
              </p>
            </div>
          </div>
          <Link href="/portal/interview/app-1">
            <GradientButton className="w-full sm:w-auto">
              Start interview <ArrowRight className="h-4 w-4" />
            </GradientButton>
          </Link>
        </CardContent>
      </Card>

      {/* Active applications */}
      <section className="space-y-4">
        <h2 className="font-display text-lg font-semibold">Active applications</h2>
        <div className="space-y-4">
          {ACTIVE_APPS.map((app) => (
            <Card key={app.id}>
              <CardContent className="space-y-5 p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display font-semibold">{app.jobTitle}</h3>
                    <p className="text-sm text-text-secondary">
                      {app.company} · Applied {formatDate(app.appliedAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {app.currentStage === "voice_interview" && (
                      <Link href="/portal/interview/app-1">
                        <Button variant="outline" size="sm" className="gap-1.5">
                          <Mic className="h-3.5 w-3.5" /> Interview
                        </Button>
                      </Link>
                    )}
                    {app.currentStage === "skill_assessment" && (
                      <Link href="/portal/assessment/asmt-1">
                        <Button variant="outline" size="sm" className="gap-1.5">
                          <ClipboardCheck className="h-3.5 w-3.5" /> Assessment
                        </Button>
                      </Link>
                    )}
                    <Link href="/portal/applications">
                      <Button variant="ghost" size="sm">
                        Details
                      </Button>
                    </Link>
                  </div>
                </div>
                <StageProgress current={app.currentStage} />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Suggestions */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-accent-violet" />
          <h2 className="font-display text-lg font-semibold">Matching jobs for you</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SUGGESTIONS.map((job) => (
            <Card key={job.id} className="transition-colors hover:border-accent-blue/40">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base">{job.title}</CardTitle>
                  <Badge variant="success">{job.match}% match</Badge>
                </div>
                <p className="text-sm text-text-secondary">{job.company}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-3 text-xs text-text-secondary">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" /> {job.location}
                  </span>
                  <span className="flex items-center gap-1 capitalize">
                    <Briefcase className="h-3.5 w-3.5" /> {job.workMode}
                  </span>
                </div>
                <p className="text-sm font-medium text-text-primary">{job.salary}</p>
                <Link href="/portal/jobs" className="block">
                  <Button variant="outline" size="sm" className="w-full">
                    View role
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
