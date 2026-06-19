import Link from "next/link";
import {
  FileSearch,
  Mic,
  ClipboardCheck,
  Video,
  CheckCircle2,
  FileSignature,
  Brain,
  Eye,
  UserCircle2,
  Bot,
  Handshake,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GradientButton } from "@/components/ui/GradientButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

type Stage = {
  num: string;
  name: string;
  icon: typeof FileSearch;
  accent: string;
  dot: string;
  ring: string;
  bg: string;
  border: string;
  ai: string;
  recruiter: string;
  candidate: string;
};

const stages: Stage[] = [
  {
    num: "01",
    name: "CV Screening",
    icon: FileSearch,
    accent: "text-accent-blue",
    dot: "bg-accent-blue",
    ring: "ring-accent-blue/40",
    bg: "bg-accent-blue/10",
    border: "border-accent-blue/30",
    ai: "Your screening agent reads every resume in under a minute — mapping skills, experience and signals against your role criteria to produce an explainable fit score for each applicant.",
    recruiter: "You set the criteria and can adjust or override any ranking at any time. What you get back is a scored shortlist with clear reasoning, not 200 unsorted PDFs. The agent does the first pass; you decide who moves forward.",
    candidate: "An instant confirmation that their application was received and reviewed fairly — not lost in a pile. Every applicant gets a real score, not silence.",
  },
  {
    num: "02",
    name: "Voice Screening",
    icon: Mic,
    accent: "text-accent-violet",
    dot: "bg-accent-violet",
    ring: "ring-accent-violet/40",
    bg: "bg-accent-violet/10",
    border: "border-accent-violet/30",
    ai: "Conducts an 8-12 minute conversational phone screening with every shortlisted candidate — asking role-specific questions and following up naturally based on each answer.",
    recruiter: "Full transcripts, communication scores and concise summaries for every call. Your team only reviews candidates worth a second look, without anyone on your side picking up the phone.",
    candidate: "A relaxed, on-demand voice conversation they can take any time — no scheduling friction, no panel nerves for a first-round call.",
  },
  {
    num: "03",
    name: "Skill Assessment",
    icon: ClipboardCheck,
    accent: "text-cyan-400",
    dot: "bg-cyan-400",
    ring: "ring-cyan-400/40",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/30",
    ai: "Generates and grades role-relevant tasks — coding challenges, case studies, domain exercises — with anti-cheating and plagiarism detection built in.",
    recruiter: "Objective, comparable scores per competency that remove guesswork from technical evaluation. Your team sets the bar; the agent measures against it.",
    candidate: "A fair chance to demonstrate real ability through practical tasks, not buzzword-stuffed resumes or luck-of-the-draw interview questions.",
  },
  {
    num: "04",
    name: "Deep Interview",
    icon: Video,
    accent: "text-amber-400",
    dot: "bg-amber-400",
    ring: "ring-amber-400/40",
    bg: "bg-amber-400/10",
    border: "border-amber-400/30",
    ai: "This is a real video conversation — not a form, not a recorded one-way prompt. Your candidate joins a live 45-minute call with Aria, your AI interviewer, who asks role-specific questions and follows up naturally based on what the candidate actually says. The conversation is scored across up to 6 competencies your team defines for this role.",
    recruiter: "Structured competency scorecards backed by the actual conversation — evidence your hiring managers can read in minutes. Every shortlisted candidate gets the same structured interview, so comparisons are meaningful.",
    candidate: "A thorough, structured conversation where every answer is heard and scored against the same clear criteria — not filtered through interviewer mood or unconscious bias.",
  },
  {
    num: "05",
    name: "Selection",
    icon: CheckCircle2,
    accent: "text-success",
    dot: "bg-success",
    ring: "ring-success/40",
    bg: "bg-success/10",
    border: "border-success/30",
    ai: "Aggregates every signal across all four prior stages into a single, explainable recommendation — with confidence levels and the specific evidence behind each score.",
    recruiter: "This is where your team makes the call. Agents inform with data; your recruiter and hiring manager decide. You get a clear final ranking with a full audit trail, and everything you need to sign off with confidence.",
    candidate: "A faster, transparent decision with real reasoning — not weeks of silence followed by a generic rejection template.",
  },
  {
    num: "06",
    name: "Offer Letter",
    icon: FileSignature,
    accent: "text-pink-400",
    dot: "bg-pink-400",
    ring: "ring-pink-400/40",
    bg: "bg-pink-400/10",
    border: "border-pink-400/30",
    ai: "Drafts a personalized, compliant offer letter and routes it through your approval workflow, then tracks the candidate's response.",
    recruiter: "One-click offer generation with approval workflows and real-time tracking, so you close the candidate before a competitor does.",
    candidate: "A polished offer delivered fast, with a smooth digital signing experience to start their new role.",
  },
];

function SubBlock({
  icon: Icon,
  label,
  text,
  accent,
}: {
  icon: typeof Brain;
  label: string;
  text: string;
  accent: string;
}) {
  return (
    <Card className="h-full p-5 hover:border-accent-blue/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all">
      <div className="flex items-center gap-2">
        <Icon className={cn("h-4 w-4", accent)} />
        <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
          {label}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-text-secondary">{text}</p>
    </Card>
  );
}

export default function HowItWorksPage() {
  return (
    <main className="bg-bg-primary text-text-primary">
      {/* Hero */}
      <section className="grid-bg border-b border-border-subtle">
        <div className="container py-20 md:py-28">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-secondary px-4 py-1.5 text-xs font-medium text-text-secondary">
              <Brain className="h-3.5 w-3.5 text-accent-blue" />
              The HireMind hiring pipeline
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-display mt-6 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
              How HireMind <span className="gradient-text">works</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg text-text-secondary">
              Six stages take every candidate from application to offer. See exactly what
              your hiring agents handle at each step — and where your team stays in
              control of every decision that actually matters.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Human in the loop */}
      <section className="border-b border-border-subtle bg-bg-secondary/30">
        <div className="container py-16 md:py-20">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold md:text-3xl max-w-3xl">
              AI agents do the repetitive work.{" "}
              <span className="gradient-text">Humans make the decisions that matter.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-5 max-w-3xl text-text-secondary leading-relaxed">
              HireMind's agents handle the parts of hiring that don't need a human touch — reading
              resumes, running first-round questions, scoring assessments. A resume gets read and ranked
              in under a minute; a first-round screening call happens without anyone on your team picking
              up the phone. But every decision that actually matters — who advances, who gets an offer —
              stays with your team. Think of it as a hiring partner that never gets tired of round one,
              so your recruiters can focus on round two.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Bot,
                step: "Agent does the groundwork",
                caption: "Resumes screened in under 60 seconds",
                accent: "text-accent-blue",
                border: "border-accent-blue/30",
                bg: "bg-accent-blue/10",
              },
              {
                icon: Eye,
                step: "You review what matters",
                caption: "A ranked shortlist, not a pile of PDFs",
                accent: "text-accent-violet",
                border: "border-accent-violet/30",
                bg: "bg-accent-violet/10",
              },
              {
                icon: Handshake,
                step: "You make the call",
                caption: "100% of hiring decisions stay with your team",
                accent: "text-success",
                border: "border-success/30",
                bg: "bg-success/10",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 0.1}>
                <div className={cn("flex flex-col items-center rounded-2xl border p-7 text-center", item.border)}>
                  <div className={cn("flex h-14 w-14 items-center justify-center rounded-xl", item.bg)}>
                    <item.icon className={cn("h-7 w-7", item.accent)} />
                  </div>
                  <p className="mt-4 font-display text-base font-semibold text-text-primary">{item.step}</p>
                  <p className="mt-2 text-sm text-text-secondary">{item.caption}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="container py-16 md:py-24">
        <div className="relative">
          <div
            aria-hidden
            className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-accent-blue via-accent-violet to-pink-400 md:block"
          />

          <div className="space-y-16 md:space-y-24">
            {stages.map((stage) => {
              const Icon = stage.icon;
              return (
                <ScrollReveal key={stage.num} y={40}>
                  <div className="relative md:pl-20">
                    <div className="mb-6 flex items-center gap-4 md:absolute md:left-0 md:top-1 md:mb-0">
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-full ring-4 ring-offset-2 ring-offset-bg-primary",
                          stage.dot,
                          stage.ring
                        )}
                      >
                        <span className="text-xs font-bold text-bg-primary">
                          {stage.num}
                        </span>
                      </div>
                    </div>

                    <div
                      className={cn(
                        "rounded-2xl border bg-bg-secondary/50 p-6 md:p-8",
                        stage.border
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "flex h-12 w-12 items-center justify-center rounded-xl",
                            stage.bg
                          )}
                        >
                          <Icon className={cn("h-6 w-6", stage.accent)} />
                        </div>
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wider text-text-secondary">
                            Stage {stage.num}
                          </p>
                          <h2 className={cn("font-display text-2xl font-bold", stage.accent)}>
                            {stage.name}
                          </h2>
                        </div>
                      </div>

                      <div className="mt-6 grid gap-4 md:grid-cols-3">
                        <SubBlock
                          icon={Brain}
                          label="What the agent does"
                          text={stage.ai}
                          accent={stage.accent}
                        />
                        <SubBlock
                          icon={Eye}
                          label="What the recruiter sees"
                          text={stage.recruiter}
                          accent={stage.accent}
                        />
                        <SubBlock
                          icon={UserCircle2}
                          label="What the candidate sees"
                          text={stage.candidate}
                          accent={stage.accent}
                        />
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border-subtle">
        <div className="container py-20 md:py-28">
          <ScrollReveal>
            <div className="glow-blue mx-auto max-w-3xl rounded-2xl border border-border-subtle bg-bg-secondary p-10 text-center md:p-14">
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                Your agents screen and interview around the clock.{" "}
                <span className="gradient-text">You make the final call.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-text-secondary">
                Set up your first AI-assisted hiring pipeline today. No credit card
                required for your 30-day free trial.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <GradientButton size="lg" asChild>
                  <Link href="/signup">Start Free Trial</Link>
                </GradientButton>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/contact">Talk to us</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
