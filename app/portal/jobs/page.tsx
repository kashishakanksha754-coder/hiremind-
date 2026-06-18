"use client";

import { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Briefcase,
  IndianRupee,
  Building2,
  Clock,
} from "lucide-react";
import type { WorkMode } from "@/types";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/ui/GradientButton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  workMode: WorkMode;
  type: "full_time" | "contract" | "internship";
  salary: string;
  posted: string;
  skills: string[];
  description: string;
}

const JOBS: JobListing[] = [
  {
    id: "j1",
    title: "Senior Frontend Engineer",
    company: "Razorpay",
    location: "Bengaluru",
    workMode: "hybrid",
    type: "full_time",
    salary: "₹35–50 LPA",
    posted: "2 days ago",
    skills: ["React", "TypeScript", "Next.js"],
    description:
      "Build delightful payment experiences used by millions of Indian businesses. You'll own the dashboard frontend, mentor engineers, and partner closely with design.",
  },
  {
    id: "j2",
    title: "Backend Engineer (Go)",
    company: "CRED",
    location: "Bengaluru",
    workMode: "onsite",
    type: "full_time",
    salary: "₹30–45 LPA",
    posted: "5 days ago",
    skills: ["Go", "PostgreSQL", "Kafka"],
    description:
      "Design and scale low-latency services powering CRED's rewards platform. Strong fundamentals in distributed systems expected.",
  },
  {
    id: "j3",
    title: "Product Designer",
    company: "Zomato",
    location: "Gurugram",
    workMode: "hybrid",
    type: "full_time",
    salary: "₹22–32 LPA",
    posted: "1 week ago",
    skills: ["Figma", "Design Systems", "Prototyping"],
    description:
      "Craft intuitive ordering flows for India's largest food delivery platform. Work end-to-end from research to polished UI.",
  },
  {
    id: "j4",
    title: "Data Engineer",
    company: "Meesho",
    location: "Remote",
    workMode: "remote",
    type: "full_time",
    salary: "₹25–38 LPA",
    posted: "3 days ago",
    skills: ["Spark", "Airflow", "Python"],
    description:
      "Own data pipelines that fuel personalisation for 100M+ users. Build reliable, scalable ETL and partner with DS teams.",
  },
  {
    id: "j5",
    title: "Frontend Intern",
    company: "PhonePe",
    location: "Pune",
    workMode: "onsite",
    type: "internship",
    salary: "₹60,000 / month",
    posted: "Today",
    skills: ["JavaScript", "React"],
    description:
      "6-month internship working alongside senior engineers on consumer-facing surfaces. Great learning environment.",
  },
  {
    id: "j6",
    title: "DevOps Consultant",
    company: "Swiggy",
    location: "Remote",
    workMode: "remote",
    type: "contract",
    salary: "₹1.2L / month",
    posted: "4 days ago",
    skills: ["AWS", "Kubernetes", "Terraform"],
    description:
      "6-month contract to harden CI/CD and observability for the logistics platform. Remote-first with flexible hours.",
  },
];

const WORK_MODES: ("all" | WorkMode)[] = ["all", "onsite", "remote", "hybrid"];
const TYPES = ["all", "full_time", "contract", "internship"] as const;

export default function JobsPage() {
  const [query, setQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [workMode, setWorkMode] = useState<(typeof WORK_MODES)[number]>("all");
  const [type, setType] = useState<(typeof TYPES)[number]>("all");
  const [selected, setSelected] = useState<JobListing | null>(null);

  const filtered = useMemo(() => {
    return JOBS.filter((j) => {
      const matchQ =
        !query ||
        j.title.toLowerCase().includes(query.toLowerCase()) ||
        j.company.toLowerCase().includes(query.toLowerCase());
      const matchLoc =
        !locationQuery ||
        j.location.toLowerCase().includes(locationQuery.toLowerCase());
      const matchMode = workMode === "all" || j.workMode === workMode;
      const matchType = type === "all" || j.type === type;
      return matchQ && matchLoc && matchMode && matchType;
    });
  }, [query, locationQuery, workMode, type]);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Find Jobs</h1>
        <p className="mt-1 text-text-secondary">
          {filtered.length} role{filtered.length !== 1 && "s"} matching your search
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="space-y-4 p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
              <Input
                placeholder="Job title or company"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
              <Input
                placeholder="Location"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <FilterGroup label="Work mode">
              {WORK_MODES.map((m) => (
                <Chip key={m} active={workMode === m} onClick={() => setWorkMode(m)}>
                  {m === "all" ? "All" : m}
                </Chip>
              ))}
            </FilterGroup>
            <FilterGroup label="Type">
              {TYPES.map((t) => (
                <Chip key={t} active={type === t} onClick={() => setType(t)}>
                  {t === "all" ? "All" : t.replace("_", " ")}
                </Chip>
              ))}
            </FilterGroup>
          </div>
        </CardContent>
      </Card>

      {/* Job cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((job) => (
          <Card
            key={job.id}
            className="cursor-pointer transition-colors hover:border-accent-blue/40"
            onClick={() => setSelected(job)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bg-secondary">
                  <Building2 className="h-5 w-5 text-accent-blue" />
                </div>
                <div>
                  <CardTitle className="text-base">{job.title}</CardTitle>
                  <p className="text-sm text-text-secondary">{job.company}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-3 text-xs text-text-secondary">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> {job.location}
                </span>
                <span className="flex items-center gap-1 capitalize">
                  <Briefcase className="h-3.5 w-3.5" /> {job.workMode}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {job.posted}
                </span>
              </div>
              <p className="flex items-center gap-1 text-sm font-medium text-text-primary">
                <IndianRupee className="h-3.5 w-3.5" /> {job.salary.replace("₹", "")}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {job.skills.map((s) => (
                  <Badge key={s} variant="outline">
                    {s}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-12 text-center text-text-secondary">
            No jobs match your filters.
          </p>
        )}
      </div>

      {/* Detail dialog */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl">
          {selected && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-bg-secondary">
                    <Building2 className="h-6 w-6 text-accent-blue" />
                  </div>
                  <div>
                    <DialogTitle>{selected.title}</DialogTitle>
                    <p className="text-sm text-text-secondary">{selected.company}</p>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3 text-sm text-text-secondary">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {selected.location}
                  </span>
                  <span className="flex items-center gap-1 capitalize">
                    <Briefcase className="h-4 w-4" /> {selected.workMode}
                  </span>
                  <span className="flex items-center gap-1 capitalize">
                    {selected.type.replace("_", " ")}
                  </span>
                  <span className="font-medium text-text-primary">{selected.salary}</span>
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-semibold">About the role</h4>
                  <p className="text-sm text-text-secondary">{selected.description}</p>
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-semibold">Skills</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.skills.map((s) => (
                      <Badge key={s} variant="outline">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <DialogClose asChild>
                    <Button variant="outline">Close</Button>
                  </DialogClose>
                  <GradientButton
                    onClick={() => {
                      toast({
                        title: "Application submitted",
                        description: `${selected.title} at ${selected.company}`,
                      });
                      setSelected(null);
                    }}
                  >
                    Apply now
                  </GradientButton>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-medium text-text-secondary">{label}</p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1 text-xs font-medium capitalize transition-colors",
        active
          ? "border-accent-blue/40 bg-accent-blue/15 text-accent-blue"
          : "border-border-subtle text-text-secondary hover:text-text-primary"
      )}
    >
      {children}
    </button>
  );
}
