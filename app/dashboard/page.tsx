import Link from "next/link";
import {
  Briefcase,
  Users,
  CalendarClock,
  FileSignature,
  Plus,
  ClipboardCheck,
  ArrowUpRight,
  AlertTriangle,
  Bot,
  UserPlus,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/ui/GradientButton";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { CounterAnimation } from "@/components/animations/CounterAnimation";
import { cn } from "@/lib/utils";
import {
  ACTIVITY_FEED,
  APPLICATIONS,
  JOBS,
  STAGE_LABELS,
} from "./mock-data";

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.round(hrs / 24)}d ago`;
}

const STATS = [
  {
    label: "Active Jobs",
    value: JOBS.filter((j) => j.status === "open").length,
    icon: Briefcase,
    tone: "text-accent-blue",
    bg: "bg-accent-blue/15",
  },
  {
    label: "Total Candidates",
    value: JOBS.reduce((s, j) => s + j.applicants_count, 0),
    icon: Users,
    tone: "text-accent-violet",
    bg: "bg-accent-violet/15",
  },
  {
    label: "Interviews Today",
    value: 7,
    icon: CalendarClock,
    tone: "text-warning",
    bg: "bg-warning/15",
  },
  {
    label: "Offers Pending",
    value: 3,
    icon: FileSignature,
    tone: "text-success",
    bg: "bg-success/15",
  },
];

function actorIcon(actor: string) {
  if (actor.toLowerCase().includes("ai")) return Bot;
  if (actor === "System") return CheckCircle2;
  return UserPlus;
}

// Candidates "stuck" in a stage for a while → needing attention.
const STUCK = APPLICATIONS.filter((a) => a.days_in_stage >= 5).sort(
  (a, b) => b.days_in_stage - a.days_in_stage
);

export default function DashboardPage() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Greeting */}
      <ScrollReveal>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight">
              {greeting()}, <span className="gradient-text">Kashish</span>
            </h1>
            <p className="mt-1 text-sm text-text-secondary">{today}</p>
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard/jobs/new">
              <GradientButton size="sm">
                <Plus className="h-4 w-4" /> New Job
              </GradientButton>
            </Link>
            <Link href="/dashboard/jobs">
              <Button variant="outline" size="sm">
                <ClipboardCheck className="h-4 w-4" /> Review Candidates
              </Button>
            </Link>
          </div>
        </div>
      </ScrollReveal>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <ScrollReveal key={stat.label} delay={i * 0.05}>
              <Card className="transition-colors hover:border-accent-blue/40">
                <CardContent className="flex items-center gap-4 p-5">
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl",
                      stat.bg
                    )}
                  >
                    <Icon className={cn("h-6 w-6", stat.tone)} />
                  </div>
                  <div>
                    <CounterAnimation
                      value={stat.value}
                      className="font-display text-2xl font-bold text-text-primary"
                    />
                    <p className="text-sm text-text-secondary">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Activity feed */}
        <ScrollReveal className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {ACTIVITY_FEED.map((item) => {
                const Icon = actorIcon(item.actor);
                return (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-white/5"
                  >
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-bg-secondary">
                      <Icon className="h-4 w-4 text-accent-blue" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-text-primary">{item.action}</p>
                      <p className="text-xs text-text-secondary">
                        {item.actor} · {timeAgo(item.created_at)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Jobs needing attention */}
        <ScrollReveal delay={0.1}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                Needs attention
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {STUCK.map((app) => {
                const job = JOBS.find((j) => j.id === app.job_id);
                return (
                  <Link
                    key={app.id}
                    href={`/dashboard/jobs/${app.job_id}/candidates/${app.id}`}
                    className="block rounded-lg border border-border-subtle p-3 transition-colors hover:border-warning/40 hover:bg-white/5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-medium text-text-primary">
                        {app.candidate_name}
                      </span>
                      <Badge variant="warning" className="shrink-0">
                        {app.days_in_stage}d stuck
                      </Badge>
                    </div>
                    <p className="mt-1 truncate text-xs text-text-secondary">
                      {job?.title} · {STAGE_LABELS[app.current_stage]}
                    </p>
                  </Link>
                );
              })}
              {STUCK.length === 0 && (
                <p className="text-sm text-text-secondary">
                  Nothing stuck — your pipeline is healthy.
                </p>
              )}
              <Link
                href="/dashboard/jobs"
                className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-accent-blue hover:underline"
              >
                View all jobs <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </div>
  );
}
