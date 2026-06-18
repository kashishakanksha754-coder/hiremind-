"use client";

import { useMemo, useRef, useState } from "react";
import {
  Plus,
  X,
  Pencil,
  Upload,
  FileText,
  Briefcase,
  GraduationCap,
  MapPin,
  Save,
} from "lucide-react";
import type { WorkExperience, Education, WorkMode } from "@/types";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/ui/GradientButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

const uid = () => Math.random().toString(36).slice(2, 10);

export default function ProfilePage() {
  const [personal, setPersonal] = useState({
    fullName: "Rohan Sharma",
    email: "rohan.sharma@gmail.com",
    phone: "+91 98765 43210",
    location: "Bengaluru, Karnataka",
  });
  const [professional, setProfessional] = useState({
    headline: "Senior Frontend Engineer",
    summary:
      "Frontend engineer with 6+ years building performant React applications for fintech and consumer products.",
  });
  const [skills, setSkills] = useState<string[]>([
    "React",
    "TypeScript",
    "Next.js",
    "Tailwind CSS",
    "Node.js",
  ]);
  const [skillInput, setSkillInput] = useState("");
  const [experience, setExperience] = useState<WorkExperience[]>([
    {
      id: uid(),
      company: "Razorpay",
      title: "Frontend Engineer",
      start_date: "2021-04-01",
      current: true,
      description: "Led the payments dashboard rewrite.",
    },
  ]);
  const [education, setEducation] = useState<Education[]>([
    {
      id: uid(),
      institution: "IIT Bombay",
      degree: "B.Tech",
      field: "Computer Science",
      start_year: 2014,
      end_year: 2018,
    },
  ]);
  const [resumeName, setResumeName] = useState<string | null>("rohan_sharma_cv.pdf");
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [preferences, setPreferences] = useState<{
    work_mode: WorkMode;
    expected_salary: string;
    locations: string[];
  }>({
    work_mode: "hybrid",
    expected_salary: "₹30–40 LPA",
    locations: ["Bengaluru", "Remote"],
  });

  // Dialog state
  const [editPersonal, setEditPersonal] = useState(false);
  const [editProfessional, setEditProfessional] = useState(false);
  const [editPrefs, setEditPrefs] = useState(false);
  const [expDialog, setExpDialog] = useState(false);
  const [eduDialog, setEduDialog] = useState(false);

  const completeness = useMemo(() => {
    let pts = 0;
    if (personal.fullName && personal.phone && personal.location) pts += 20;
    if (professional.headline && professional.summary) pts += 20;
    if (skills.length >= 3) pts += 20;
    if (experience.length) pts += 15;
    if (education.length) pts += 10;
    if (resumeName) pts += 15;
    return Math.min(100, pts);
  }, [personal, professional, skills, experience, education, resumeName]);

  const addSkill = () => {
    const v = skillInput.trim();
    if (v && !skills.includes(v)) {
      setSkills([...skills, v]);
      setSkillInput("");
    }
  };

  const handleFile = (file?: File | null) => {
    if (file) {
      setResumeName(file.name);
      toast({ title: "Resume uploaded", description: file.name });
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">My Profile</h1>
        <p className="mt-1 text-text-secondary">
          Keep your profile up to date for better matches.
        </p>
      </div>

      {/* Completeness */}
      <Card>
        <CardContent className="space-y-3 p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Profile completeness</span>
            <span className="font-display text-sm font-semibold text-accent-blue">
              {completeness}%
            </span>
          </div>
          <Progress value={completeness} />
          {completeness < 100 && (
            <p className="text-xs text-text-secondary">
              Complete all sections to maximise your visibility to recruiters.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Personal info */}
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Personal Info</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setEditPersonal(true)}>
            <Pencil className="h-3.5 w-3.5" /> Edit
          </Button>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <Field label="Full name" value={personal.fullName} />
          <Field label="Email" value={personal.email} />
          <Field label="Phone" value={personal.phone} />
          <Field label="Location" value={personal.location} />
        </CardContent>
      </Card>

      {/* Professional info */}
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Professional Info</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setEditProfessional(true)}>
            <Pencil className="h-3.5 w-3.5" /> Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <Field label="Headline" value={professional.headline} />
          <Field label="Summary" value={professional.summary} />
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <Badge key={s} variant="outline" className="gap-1.5 py-1 pr-1">
                {s}
                <button
                  onClick={() => setSkills(skills.filter((x) => x !== s))}
                  className="rounded-full p-0.5 hover:bg-danger/20 hover:text-danger"
                  aria-label={`Remove ${s}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {skills.length === 0 && (
              <span className="text-sm text-text-secondary">No skills added yet.</span>
            )}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add a skill..."
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
            />
            <Button variant="outline" onClick={addSkill}>
              <Plus className="h-4 w-4" /> Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Experience */}
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Work Experience</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setExpDialog(true)}>
            <Plus className="h-3.5 w-3.5" /> Add
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {experience.map((exp) => (
            <div key={exp.id} className="flex gap-3">
              <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-bg-secondary">
                <Briefcase className="h-4 w-4 text-accent-blue" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{exp.title}</p>
                    <p className="text-sm text-text-secondary">{exp.company}</p>
                  </div>
                  <button
                    onClick={() => setExperience(experience.filter((x) => x.id !== exp.id))}
                    className="text-text-secondary hover:text-danger"
                    aria-label="Remove experience"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-text-secondary">
                  {exp.start_date.slice(0, 4)} –{" "}
                  {exp.current ? "Present" : exp.end_date?.slice(0, 4)}
                </p>
                {exp.description && (
                  <p className="mt-1 text-sm text-text-secondary">{exp.description}</p>
                )}
              </div>
            </div>
          ))}
          {experience.length === 0 && (
            <p className="text-sm text-text-secondary">No experience added.</p>
          )}
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Education</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setEduDialog(true)}>
            <Plus className="h-3.5 w-3.5" /> Add
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {education.map((edu) => (
            <div key={edu.id} className="flex gap-3">
              <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-bg-secondary">
                <GraduationCap className="h-4 w-4 text-accent-violet" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">
                      {edu.degree}
                      {edu.field ? `, ${edu.field}` : ""}
                    </p>
                    <p className="text-sm text-text-secondary">{edu.institution}</p>
                  </div>
                  <button
                    onClick={() => setEducation(education.filter((x) => x.id !== edu.id))}
                    className="text-text-secondary hover:text-danger"
                    aria-label="Remove education"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-text-secondary">
                  {edu.start_year} – {edu.end_year}
                </p>
              </div>
            </div>
          ))}
          {education.length === 0 && (
            <p className="text-sm text-text-secondary">No education added.</p>
          )}
        </CardContent>
      </Card>

      {/* Resume */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Resume</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              handleFile(e.dataTransfer.files?.[0]);
            }}
            onClick={() => fileRef.current?.click()}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors",
              dragging
                ? "border-accent-blue bg-accent-blue/10"
                : "border-border-subtle hover:border-accent-blue/50"
            )}
          >
            <Upload className="h-6 w-6 text-text-secondary" />
            <p className="text-sm font-medium">Drag & drop your resume here</p>
            <p className="text-xs text-text-secondary">or click to browse · PDF, DOCX</p>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </div>
          {resumeName && (
            <div className="flex items-center justify-between rounded-lg border border-border-subtle bg-bg-secondary px-3 py-2.5">
              <span className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-accent-blue" />
                {resumeName}
              </span>
              <button
                onClick={() => setResumeName(null)}
                className="text-text-secondary hover:text-danger"
                aria-label="Remove resume"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Preferences</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setEditPrefs(true)}>
            <Pencil className="h-3.5 w-3.5" /> Edit
          </Button>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <Field label="Work mode" value={preferences.work_mode} className="capitalize" />
          <Field label="Expected salary" value={preferences.expected_salary} />
          <div className="sm:col-span-2">
            <p className="text-xs text-text-secondary">Preferred locations</p>
            <div className="mt-1 flex flex-wrap gap-2">
              {preferences.locations.map((l) => (
                <Badge key={l} variant="outline" className="gap-1">
                  <MapPin className="h-3 w-3" /> {l}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ===== Dialogs ===== */}
      <EditDialog
        open={editPersonal}
        onOpenChange={setEditPersonal}
        title="Edit Personal Info"
        onSave={() => {
          setEditPersonal(false);
          toast({ title: "Personal info saved" });
        }}
      >
        <LabeledInput
          label="Full name"
          value={personal.fullName}
          onChange={(v) => setPersonal({ ...personal, fullName: v })}
        />
        <LabeledInput
          label="Email"
          value={personal.email}
          onChange={(v) => setPersonal({ ...personal, email: v })}
        />
        <LabeledInput
          label="Phone"
          value={personal.phone}
          onChange={(v) => setPersonal({ ...personal, phone: v })}
        />
        <LabeledInput
          label="Location"
          value={personal.location}
          onChange={(v) => setPersonal({ ...personal, location: v })}
        />
      </EditDialog>

      <EditDialog
        open={editProfessional}
        onOpenChange={setEditProfessional}
        title="Edit Professional Info"
        onSave={() => {
          setEditProfessional(false);
          toast({ title: "Professional info saved" });
        }}
      >
        <LabeledInput
          label="Headline"
          value={professional.headline}
          onChange={(v) => setProfessional({ ...professional, headline: v })}
        />
        <div className="space-y-1.5">
          <Label>Summary</Label>
          <textarea
            value={professional.summary}
            onChange={(e) =>
              setProfessional({ ...professional, summary: e.target.value })
            }
            rows={4}
            className="flex w-full rounded-md border border-input bg-bg-secondary px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </EditDialog>

      <EditDialog
        open={editPrefs}
        onOpenChange={setEditPrefs}
        title="Edit Preferences"
        onSave={() => {
          setEditPrefs(false);
          toast({ title: "Preferences saved" });
        }}
      >
        <div className="space-y-1.5">
          <Label>Work mode</Label>
          <select
            value={preferences.work_mode}
            onChange={(e) =>
              setPreferences({ ...preferences, work_mode: e.target.value as WorkMode })
            }
            className="flex h-10 w-full rounded-md border border-input bg-bg-secondary px-3 text-sm text-text-primary"
          >
            <option value="onsite">Onsite</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
        <LabeledInput
          label="Expected salary"
          value={preferences.expected_salary}
          onChange={(v) => setPreferences({ ...preferences, expected_salary: v })}
        />
        <LabeledInput
          label="Preferred locations (comma separated)"
          value={preferences.locations.join(", ")}
          onChange={(v) =>
            setPreferences({
              ...preferences,
              locations: v.split(",").map((s) => s.trim()).filter(Boolean),
            })
          }
        />
      </EditDialog>

      <AddExperienceDialog
        open={expDialog}
        onOpenChange={setExpDialog}
        onAdd={(exp) => {
          setExperience([...experience, exp]);
          toast({ title: "Experience added" });
        }}
      />
      <AddEducationDialog
        open={eduDialog}
        onOpenChange={setEduDialog}
        onAdd={(edu) => {
          setEducation([...education, edu]);
          toast({ title: "Education added" });
        }}
      />
    </div>
  );
}

function Field({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div>
      <p className="text-xs text-text-secondary">{label}</p>
      <p className={cn("text-sm text-text-primary", className)}>{value}</p>
    </div>
  );
}

function LabeledInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function EditDialog({
  open,
  onOpenChange,
  title,
  onSave,
  children,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  title: string;
  onSave: () => void;
  children: React.ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">{children}</div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <GradientButton onClick={onSave}>
            <Save className="h-4 w-4" /> Save
          </GradientButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AddExperienceDialog({
  open,
  onOpenChange,
  onAdd,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onAdd: (exp: WorkExperience) => void;
}) {
  const [form, setForm] = useState({
    company: "",
    title: "",
    start: "",
    end: "",
    current: false,
    description: "",
  });
  const reset = () =>
    setForm({ company: "", title: "", start: "", end: "", current: false, description: "" });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Work Experience</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <LabeledInput
            label="Job title"
            value={form.title}
            onChange={(v) => setForm({ ...form, title: v })}
          />
          <LabeledInput
            label="Company"
            value={form.company}
            onChange={(v) => setForm({ ...form, company: v })}
          />
          <div className="grid grid-cols-2 gap-3">
            <LabeledInput
              label="Start year"
              value={form.start}
              onChange={(v) => setForm({ ...form, start: v })}
            />
            <LabeledInput
              label="End year"
              value={form.end}
              onChange={(v) => setForm({ ...form, end: v })}
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-text-secondary">
            <input
              type="checkbox"
              checked={form.current}
              onChange={(e) => setForm({ ...form, current: e.target.checked })}
            />
            I currently work here
          </label>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <GradientButton
            onClick={() => {
              if (!form.title || !form.company) return;
              onAdd({
                id: uid(),
                title: form.title,
                company: form.company,
                start_date: `${form.start || "2020"}-01-01`,
                end_date: form.end ? `${form.end}-01-01` : undefined,
                current: form.current,
                description: form.description || undefined,
              });
              reset();
              onOpenChange(false);
            }}
          >
            Add
          </GradientButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AddEducationDialog({
  open,
  onOpenChange,
  onAdd,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onAdd: (edu: Education) => void;
}) {
  const [form, setForm] = useState({
    institution: "",
    degree: "",
    field: "",
    start: "",
    end: "",
  });
  const reset = () =>
    setForm({ institution: "", degree: "", field: "", start: "", end: "" });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Education</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <LabeledInput
            label="Institution"
            value={form.institution}
            onChange={(v) => setForm({ ...form, institution: v })}
          />
          <LabeledInput
            label="Degree"
            value={form.degree}
            onChange={(v) => setForm({ ...form, degree: v })}
          />
          <LabeledInput
            label="Field of study"
            value={form.field}
            onChange={(v) => setForm({ ...form, field: v })}
          />
          <div className="grid grid-cols-2 gap-3">
            <LabeledInput
              label="Start year"
              value={form.start}
              onChange={(v) => setForm({ ...form, start: v })}
            />
            <LabeledInput
              label="End year"
              value={form.end}
              onChange={(v) => setForm({ ...form, end: v })}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <GradientButton
            onClick={() => {
              if (!form.institution || !form.degree) return;
              onAdd({
                id: uid(),
                institution: form.institution,
                degree: form.degree,
                field: form.field || undefined,
                start_year: form.start ? Number(form.start) : undefined,
                end_year: form.end ? Number(form.end) : undefined,
              });
              reset();
              onOpenChange(false);
            }}
          >
            Add
          </GradientButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
