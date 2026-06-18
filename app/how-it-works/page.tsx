import Link from "next/link";
import {
  FileSearch,
  Mic,
  ClipboardCheck,
  MessageSquareText,
  CheckCircle2,
  FileSignature,
  Brain,
  Eye,
  UserCircle2,
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
    ai: "Parses every résumé, maps skills and experience against the role, and ranks applicants with an explainable fit score in seconds.",
    recruiter: "A ranked shortlist with score breakdowns, highlighted strengths and gaps, and one-click filters to focus on the best matches.",
    candidate: "An instant confirmation that their application was received and is being reviewed fairly, with no résumé lost in a black hole.",
  },
  {
    num: "02",
    name: "Voice Interview",
    icon: Mic,
    accent: "text-accent-violet",
    dot: "bg-accent-violet",
    ring: "ring-accent-violet/40",
    bg: "bg-accent-violet/10",
    border: "border-accent-violet/30",
    ai: "Conducts a natural, adaptive voice screening, asking role-specific questions and probing follow-ups based on each answer.",
    recruiter: "Full transcripts, sentiment and communication scores, and concise summaries so they can skip the repetitive first-round calls.",
    candidate: "A relaxed, on-demand conversation they can take any time of day, no scheduling friction or interview-panel nerves.",
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
    ai: "Generates and grades role-relevant tasks, from coding challenges to case studies, with anti-cheating and plagiarism checks.",
    recruiter: "Objective, comparable scores per competency that remove guesswork and bias from technical evaluation.",
    candidate: "A fair chance to prove real ability through practical tasks rather than buzzword-stuffed résumés.",
  },
  {
    num: "04",
    name: "Deep Interview",
    icon: MessageSquareText,
    accent: "text-amber-400",
    dot: "bg-amber-400",
    ring: "ring-amber-400/40",
    bg: "bg-amber-400/10",
    border: "border-amber-400/30",
    ai: "Runs an in-depth behavioral and situational interview, scoring competencies against your hiring rubric.",
    recruiter: "Structured competency scorecards and evidence-backed notes that make panel decisions faster and more consistent.",
    candidate: "A thorough, structured interview where every answer is heard and evaluated against the same clear criteria.",
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
    ai: "Aggregates every signal across the pipeline into a single, explainable recommendation with confidence levels.",
    recruiter: "A clear final ranking with full audit trails, so hiring managers can sign off with confidence and compliance.",
    candidate: "A faster, transparent decision, no more weeks of silence waiting to hear back.",
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
    ai: "Drafts a personalized, compliant offer letter and routes it for approval and e-signature automatically.",
    recruiter: "One-click offer generation with approval workflows and tracking, closing candidates before competitors do.",
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
              Six intelligent stages take every candidate from application to offer,
              automatically. See exactly what the AI does at each step, and what your
              recruiters and candidates experience along the way.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="container py-16 md:py-24">
        <div className="relative">
          {/* Vertical line */}
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
                    {/* Node */}
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

                    {/* Stage card */}
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
                          label="What the AI does"
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
                Ready to <span className="gradient-text">automate your pipeline?</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-text-secondary">
                Launch your first AI-driven hiring pipeline today. No credit card
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
