"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  MapPin,
  MoreHorizontal,
  Eye,
  Pencil,
  Pause,
  Trash2,
  Users,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { GradientButton } from "@/components/ui/GradientButton";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn, formatDate } from "@/lib/utils";
import type { JobStatus } from "@/types";
import { JOBS, STAGE_DISTRIBUTION, STAGE_LABELS, STAGE_ORDER, STAGE_COLORS } from "../mock-data";
import { StageBar } from "../StageBar";

const STATUS_VARIANT: Record<JobStatus, "success" | "warning" | "secondary" | "danger"> = {
  open: "success",
  paused: "warning",
  draft: "secondary",
  closed: "danger",
};

const FILTERS: { label: string; value: JobStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Open", value: "open" },
  { label: "Paused", value: "paused" },
  { label: "Draft", value: "draft" },
  { label: "Closed", value: "closed" },
];

export default function JobsPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<JobStatus | "all">("all");

  const filtered = useMemo(() => {
    return JOBS.filter((j) => {
      const matchesQuery =
        j.title.toLowerCase().includes(query.toLowerCase()) ||
        j.location.toLowerCase().includes(query.toLowerCase());
      const matchesFilter = filter === "all" || j.status === filter;
      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Jobs</h1>
          <p className="mt-1 text-sm text-text-secondary">
            {JOBS.length} roles · manage pipelines and openings
          </p>
        </div>
        <Link href="/dashboard/jobs/new">
          <GradientButton size="sm">
            <Plus className="h-4 w-4" /> New Job
          </GradientButton>
        </Link>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative max-w-md flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search jobs by title or location…"
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                filter === f.value
                  ? "border-accent-blue/40 bg-accent-blue/15 text-accent-blue"
                  : "border-border-subtle text-text-secondary hover:bg-white/5 hover:text-text-primary"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-text-secondary">
        {STAGE_ORDER.map((stage) => (
          <span key={stage} className="flex items-center gap-1.5">
            <span className={cn("h-2 w-2 rounded-full", STAGE_COLORS[stage])} />
            {STAGE_LABELS[stage]}
          </span>
        ))}
      </div>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="border-b border-border-subtle text-left text-xs uppercase tracking-wide text-text-secondary">
                <th className="px-4 py-3 font-medium">Job</th>
                <th className="px-4 py-3 font-medium">Applicants</th>
                <th className="px-4 py-3 font-medium">Pipeline</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((job) => (
                <tr
                  key={job.id}
                  className="border-b border-border-subtle/60 transition-colors last:border-0 hover:bg-white/5"
                >
                  <td className="px-4 py-3">
                    <Link href={`/dashboard/jobs/${job.id}`} className="block">
                      <p className="font-medium text-text-primary hover:text-accent-blue">
                        {job.title}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-text-secondary">
                        <MapPin className="h-3 w-3" /> {job.location} ·{" "}
                        <span className="capitalize">{job.work_mode}</span>
                      </p>
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 text-text-primary">
                      <Users className="h-4 w-4 text-text-secondary" />
                      {job.applicants_count}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <StageBar
                      distribution={STAGE_DISTRIBUTION[job.id]}
                      className="w-40"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={STATUS_VARIANT[job.status]}
                      className="capitalize"
                    >
                      {job.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    {formatDate(job.created_at)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          aria-label="Actions"
                          className="rounded-md p-1.5 text-text-secondary hover:bg-white/5 hover:text-text-primary"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/jobs/${job.id}`}>
                            <Eye className="h-4 w-4" /> View pipeline
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pause className="h-4 w-4" /> Pause
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-danger">
                          <Trash2 className="h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="p-10 text-center text-sm text-text-secondary">
            No jobs match your search.
          </div>
        )}
      </Card>
    </div>
  );
}
