"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Plus,
  X,
  Check,
  Rocket,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/ui/GradientButton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import type { Competency, WorkMode } from "@/types";

const STEPS = [
  "Basic info",
  "Description",
  "Pipeline",
  "Competencies",
  "Review",
];

function Toggle({
  checked,
  onChange,
  label,
  hint,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  hint?: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border-subtle p-3">
      <div>
        <p className="text-sm font-medium text-text-primary">{label}</p>
        {hint && <p className="text-xs text-text-secondary">{hint}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors",
          checked ? "bg-accent-blue" : "bg-bg-secondary"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform",
            checked ? "translate-x-5" : "translate-x-0.5"
          )}
        />
      </button>
    </div>
  );
}

export default function NewJobPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  // Step 1
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [workMode, setWorkMode] = useState<WorkMode>("hybrid");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [showSalary, setShowSalary] = useState(true);

  // Step 2
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  // Step 3
  const [enableAssessment, setEnableAssessment] = useState(true);
  const [enableVoice, setEnableVoice] = useState(true);
  const [autoReject, setAutoReject] = useState(45);
  const [anonymised, setAnonymised] = useState(false);

  // Step 4
  const [competencies, setCompetencies] = useState<Competency[]>([
    { name: "Coding Proficiency", weight: 40 },
    { name: "Communication", weight: 30 },
  ]);

  const stepValid = (): boolean => {
    if (step === 0) return title.trim().length > 0 && location.trim().length > 0;
    if (step === 1) return description.trim().length > 20;
    if (step === 3) return competencies.length > 0 && competencies.every((c) => c.name.trim());
    return true;
  };

  function autoExtract() {
    setSkills([
      "TypeScript",
      "React",
      "Node.js",
      "PostgreSQL",
      "AWS",
      "System Design",
    ]);
    toast({
      variant: "success",
      title: "Skills extracted",
      description: "AI parsed 6 key skills from the description.",
    });
  }

  function addCompetency() {
    if (competencies.length >= 6) return;
    setCompetencies([...competencies, { name: "", weight: 20 }]);
  }

  function updateCompetency(i: number, patch: Partial<Competency>) {
    setCompetencies((prev) =>
      prev.map((c, idx) => (idx === i ? { ...c, ...patch } : c))
    );
  }

  function removeCompetency(i: number) {
    setCompetencies((prev) => prev.filter((_, idx) => idx !== i));
  }

  function publish() {
    toast({
      variant: "success",
      title: "Job published",
      description: `${title || "Your new role"} is now live and accepting applicants.`,
    });
    setTimeout(() => router.push("/dashboard/jobs"), 600);
  }

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">
            Create a new job
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Step {step + 1} of {STEPS.length} · {STEPS[step]}
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/jobs")}>
          Cancel
        </Button>
      </div>

      {/* Progress bar */}
      <div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-bg-secondary">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent-blue to-accent-violet transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between">
          {STEPS.map((s, i) => (
            <span
              key={s}
              className={cn(
                "text-xs",
                i <= step ? "font-medium text-text-primary" : "text-text-secondary"
              )}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="space-y-5 p-6">
          {/* STEP 1 */}
          {step === 0 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Job title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Senior Backend Engineer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Bengaluru, Karnataka"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workmode">Work mode</Label>
                <select
                  id="workmode"
                  value={workMode}
                  onChange={(e) => setWorkMode(e.target.value as WorkMode)}
                  className="flex h-10 w-full rounded-md border border-input bg-bg-secondary px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="onsite">On-site</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smin">Salary min (₹/yr)</Label>
                  <Input
                    id="smin"
                    type="number"
                    value={salaryMin}
                    onChange={(e) => setSalaryMin(e.target.value)}
                    placeholder="1500000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smax">Salary max (₹/yr)</Label>
                  <Input
                    id="smax"
                    type="number"
                    value={salaryMax}
                    onChange={(e) => setSalaryMax(e.target.value)}
                    placeholder="2500000"
                  />
                </div>
              </div>
              <Toggle
                checked={showSalary}
                onChange={setShowSalary}
                label="Show salary on listing"
                hint="Candidates see the range publicly."
              />
            </div>
          )}

          {/* STEP 2 */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="desc">Job description</Label>
                  <Button variant="outline" size="sm" onClick={autoExtract}>
                    <Sparkles className="h-4 w-4 text-accent-violet" />
                    Auto-extract with AI
                  </Button>
                </div>
                <textarea
                  id="desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={8}
                  placeholder="Describe the role, responsibilities, and requirements…"
                  className="flex w-full rounded-md border border-input bg-bg-secondary px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <p className="text-xs text-text-secondary">
                  At least 20 characters. AI extraction works best with full
                  responsibilities and requirements.
                </p>
              </div>
              {skills.length > 0 && (
                <div>
                  <Label>Extracted skills</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {skills.map((s) => (
                      <Badge key={s} variant="default" className="gap-1">
                        {s}
                        <button
                          onClick={() =>
                            setSkills(skills.filter((x) => x !== s))
                          }
                          aria-label={`Remove ${s}`}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3 */}
          {step === 2 && (
            <div className="space-y-4">
              <Toggle
                checked={enableAssessment}
                onChange={setEnableAssessment}
                label="Enable skill assessment"
                hint="Add an AI-graded assessment stage."
              />
              <Toggle
                checked={enableVoice}
                onChange={setEnableVoice}
                label="Enable voice interview"
                hint="AI voice interview before deep interview."
              />
              <Toggle
                checked={anonymised}
                onChange={setAnonymised}
                label="Anonymised screening"
                hint="Hide candidate names until later stages to reduce bias."
              />
              <div className="rounded-lg border border-border-subtle p-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="threshold">Auto-reject threshold</Label>
                  <span className="font-display text-sm font-semibold text-accent-blue">
                    {autoReject}
                  </span>
                </div>
                <p className="mb-3 text-xs text-text-secondary">
                  Applicants scoring below this on CV screening are auto-rejected.
                </p>
                <input
                  id="threshold"
                  type="range"
                  min={0}
                  max={100}
                  value={autoReject}
                  onChange={(e) => setAutoReject(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-bg-secondary accent-accent-blue"
                />
                <div className="mt-1 flex justify-between text-xs text-text-secondary">
                  <span>0</span>
                  <span>100</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Competencies</Label>
                  <p className="text-xs text-text-secondary">
                    Add up to 6. Used to weight candidate scoring.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addCompetency}
                  disabled={competencies.length >= 6}
                >
                  <Plus className="h-4 w-4" /> Add
                </Button>
              </div>
              <div className="space-y-3">
                {competencies.map((c, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Input
                      value={c.name}
                      onChange={(e) => updateCompetency(i, { name: e.target.value })}
                      placeholder="Competency name"
                      className="flex-1"
                    />
                    <div className="flex w-28 items-center gap-1">
                      <Input
                        type="number"
                        min={0}
                        max={100}
                        value={c.weight}
                        onChange={(e) =>
                          updateCompetency(i, { weight: Number(e.target.value) })
                        }
                      />
                      <span className="text-sm text-text-secondary">%</span>
                    </div>
                    <button
                      onClick={() => removeCompetency(i)}
                      aria-label="Remove competency"
                      className="rounded-md p-2 text-text-secondary hover:bg-white/5 hover:text-danger"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-xs text-text-secondary">
                Total weight:{" "}
                <span className="font-medium text-text-primary">
                  {competencies.reduce((s, c) => s + (c.weight || 0), 0)}%
                </span>
              </p>
            </div>
          )}

          {/* STEP 5 */}
          {step === 4 && (
            <div className="space-y-5">
              <div>
                <h3 className="font-display text-lg font-semibold">
                  {title || "Untitled role"}
                </h3>
                <p className="text-sm text-text-secondary">
                  {location || "—"} · <span className="capitalize">{workMode}</span>
                </p>
              </div>
              <Separator />
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-text-secondary">Salary</dt>
                  <dd className="text-text-primary">
                    {salaryMin && salaryMax
                      ? `₹${Number(salaryMin).toLocaleString("en-IN")} – ₹${Number(
                          salaryMax
                        ).toLocaleString("en-IN")}`
                      : "Not specified"}{" "}
                    {showSalary ? "(shown)" : "(hidden)"}
                  </dd>
                </div>
                <div>
                  <dt className="text-text-secondary">Pipeline stages</dt>
                  <dd className="text-text-primary">
                    {[
                      "CV",
                      enableVoice && "Voice",
                      enableAssessment && "Assessment",
                      "Deep Interview",
                      "Selection",
                      "Offer",
                    ]
                      .filter(Boolean)
                      .join(" → ")}
                  </dd>
                </div>
                <div>
                  <dt className="text-text-secondary">Auto-reject below</dt>
                  <dd className="text-text-primary">{autoReject}</dd>
                </div>
                <div>
                  <dt className="text-text-secondary">Anonymised</dt>
                  <dd className="text-text-primary">{anonymised ? "Yes" : "No"}</dd>
                </div>
              </dl>
              <div>
                <dt className="mb-2 text-sm text-text-secondary">Skills</dt>
                <div className="flex flex-wrap gap-2">
                  {skills.length ? (
                    skills.map((s) => (
                      <Badge key={s} variant="outline">
                        {s}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-text-secondary">None added</span>
                  )}
                </div>
              </div>
              <div>
                <dt className="mb-2 text-sm text-text-secondary">Competencies</dt>
                <div className="flex flex-wrap gap-2">
                  {competencies.map((c, i) => (
                    <Badge key={i} variant="secondary">
                      {c.name || "Unnamed"} · {c.weight}%
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Nav */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        {step < STEPS.length - 1 ? (
          <GradientButton
            onClick={() => stepValid() && setStep((s) => s + 1)}
            disabled={!stepValid()}
          >
            Next <ArrowRight className="h-4 w-4" />
          </GradientButton>
        ) : (
          <GradientButton onClick={publish}>
            <Rocket className="h-4 w-4" /> Publish job
          </GradientButton>
        )}
      </div>
    </div>
  );
}
