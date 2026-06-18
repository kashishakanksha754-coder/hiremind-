"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Send,
  XCircle,
} from "lucide-react";
import type { ApplicationStatus, StageKey } from "@/types";
import { cn, formatDate, scoreColor } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface StageScore {
  stage: StageKey;
  label: string;
  score: number;
  breakdown: { label: string; value: number }[];
}

interface AppRow {
  id: string;
  job: string;
  company: string;
  appliedAt: string;
  currentStage: string;
  status: ApplicationStatus;
  overall: number;
  stages: StageScore[];
}

const APPS: AppRow[] = [
  {
    id: "a1",
    job: "Senior Frontend Engineer",
    company: "Razorpay",
    appliedAt: "2026-06-02",
    currentStage: "Voice Interview",
    status: "in_progress",
    overall: 82,
    stages: [
      {
        stage: "cv_screening",
        label: "CV Screening",
        score: 88,
        breakdown: [
          { label: "Skills match", value: 90 },
          { label: "Experience", value: 86 },
        ],
      },
      {
        stage: "voice_interview",
        label: "Voice Interview",
        score: 76,
        breakdown: [
          { label: "Communication", value: 80 },
          { label: "Problem solving", value: 72 },
        ],
      },
    ],
  },
  {
    id: "a2",
    job: "Product Designer",
    company: "Zomato",
    appliedAt: "2026-05-28",
    currentStage: "Assessment",
    status: "advanced",
    overall: 74,
    stages: [
      {
        stage: "cv_screening",
        label: "CV Screening",
        score: 79,
        breakdown: [
          { label: "Portfolio", value: 84 },
          { label: "Experience", value: 74 },
        ],
      },
    ],
  },
  {
    id: "a3",
    job: "Backend Engineer (Go)",
    company: "CRED",
    appliedAt: "2026-04-15",
    currentStage: "Rejected",
    status: "rejected",
    overall: 41,
    stages: [
      {
        stage: "cv_screening",
        label: "CV Screening",
        score: 41,
        breakdown: [
          { label: "Skills match", value: 38 },
          { label: "Experience", value: 44 },
        ],
      },
    ],
  },
  {
    id: "a4",
    job: "Data Engineer",
    company: "Meesho",
    appliedAt: "2026-03-20",
    currentStage: "Offer",
    status: "hired",
    overall: 91,
    stages: [
      {
        stage: "cv_screening",
        label: "CV Screening",
        score: 92,
        breakdown: [{ label: "Skills match", value: 92 }],
      },
      {
        stage: "deep_interview",
        label: "Deep Interview",
        score: 90,
        breakdown: [
          { label: "System design", value: 88 },
          { label: "Coding", value: 92 },
        ],
      },
    ],
  },
];

const STATUS_VARIANT: Record<ApplicationStatus, BadgeProps["variant"]> = {
  applied: "secondary",
  in_progress: "default",
  advanced: "default",
  rejected: "danger",
  on_hold: "warning",
  withdrawn: "outline",
  hired: "success",
};

const STATUS_LABEL: Record<ApplicationStatus, string> = {
  applied: "Applied",
  in_progress: "In progress",
  advanced: "Advanced",
  rejected: "Rejected",
  on_hold: "On hold",
  withdrawn: "Withdrawn",
  hired: "Hired",
};

export default function ApplicationsPage() {
  const [rows, setRows] = useState(APPS);
  const [expanded, setExpanded] = useState<string | null>(null);

  const withdraw = (id: string) => {
    setRows((r) =>
      r.map((row) => (row.id === id ? { ...row, status: "withdrawn" as const } : row))
    );
    toast({ title: "Application withdrawn" });
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">My Applications</h1>
        <p className="mt-1 text-text-secondary">
          Track progress and scores across all your applications.
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          {/* Header */}
          <div className="hidden grid-cols-[1fr_auto_auto_auto] gap-4 border-b border-border-subtle px-4 py-3 text-xs font-medium text-text-secondary sm:grid">
            <span>Role</span>
            <span className="w-28">Stage</span>
            <span className="w-24">Status</span>
            <span className="w-16 text-right">Score</span>
          </div>

          <ul className="divide-y divide-border-subtle">
            {rows.map((row) => {
              const open = expanded === row.id;
              const closed =
                row.status === "rejected" ||
                row.status === "withdrawn" ||
                row.status === "hired";
              return (
                <li key={row.id}>
                  <button
                    onClick={() => setExpanded(open ? null : row.id)}
                    className="flex w-full items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-bg-secondary/50"
                  >
                    {open ? (
                      <ChevronDown className="h-4 w-4 shrink-0 text-text-secondary" />
                    ) : (
                      <ChevronRight className="h-4 w-4 shrink-0 text-text-secondary" />
                    )}
                    <div className="grid flex-1 grid-cols-1 items-center gap-2 sm:grid-cols-[1fr_auto_auto_auto] sm:gap-4">
                      <div>
                        <p className="font-medium">{row.job}</p>
                        <p className="text-xs text-text-secondary">
                          {row.company} · {formatDate(row.appliedAt)}
                        </p>
                      </div>
                      <span className="hidden w-28 text-sm text-text-secondary sm:block">
                        {row.currentStage}
                      </span>
                      <span className="w-24">
                        <Badge variant={STATUS_VARIANT[row.status]}>
                          {STATUS_LABEL[row.status]}
                        </Badge>
                      </span>
                      <span
                        className={cn(
                          "w-16 text-right font-display text-sm font-semibold",
                          scoreColor(row.overall)
                        )}
                      >
                        {row.overall}
                      </span>
                    </div>
                  </button>

                  {open && (
                    <div className="space-y-4 border-t border-border-subtle bg-bg-secondary/30 px-4 py-4 sm:px-11">
                      <div className="space-y-3">
                        {row.stages.map((st) => (
                          <div key={st.stage}>
                            <div className="mb-1 flex items-center justify-between text-sm">
                              <span className="font-medium">{st.label}</span>
                              <span className={cn("font-semibold", scoreColor(st.score))}>
                                {st.score}
                              </span>
                            </div>
                            <div className="space-y-1.5">
                              {st.breakdown.map((b) => (
                                <div key={b.label} className="flex items-center gap-3">
                                  <span className="w-32 shrink-0 text-xs text-text-secondary">
                                    {b.label}
                                  </span>
                                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-bg-secondary">
                                    <div
                                      className="h-full rounded-full bg-gradient-to-r from-accent-blue to-accent-violet"
                                      style={{ width: `${b.value}%` }}
                                    />
                                  </div>
                                  <span className="w-8 text-right text-xs text-text-secondary">
                                    {b.value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            toast({ title: "Link resent", description: "Check your email & WhatsApp." })
                          }
                        >
                          <Send className="h-3.5 w-3.5" /> Resend link
                        </Button>
                        {!closed && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-danger hover:text-danger"
                            onClick={() => withdraw(row.id)}
                          >
                            <XCircle className="h-3.5 w-3.5" /> Withdraw
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
