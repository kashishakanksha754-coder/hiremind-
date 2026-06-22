import Link from "next/link";
import {
  FileSearch,
  Mic,
  ClipboardCheck,
  Video,
  CheckCircle2,
  FileSignature,
  Clock,
  Scale,
  Hourglass,
  UserX,
  ArrowRight,
  Brain,
  BarChart3,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { GradientButton } from "@/components/ui/GradientButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { CounterAnimation } from "@/components/animations/CounterAnimation";
import { cn } from "@/lib/utils";

const painPoints = [
  {
    icon: Clock,
    title: "Time wasted on unqualified CVs",
    desc: "Recruiters spend hours skimming hundreds of resumes, only to find a handful worth a call. The signal is buried in the noise.",
  },
  {
    icon: Scale,
    title: "Inconsistent interviewing",
    desc: "Every interviewer asks different questions and scores on gut feel. Two great candidates get judged on entirely different scales.",
  },
  {
    icon: Hourglass,
    title: "Slow feedback loops",
    desc: "Coordinating panels, chasing scorecards and aligning stakeholders stretches a hire from days into weeks. Top talent moves on.",
  },
  {
    icon: UserX,
    title: "High drop-off rates",
    desc: "Long, opaque processes exhaust candidates. The best ones accept a faster offer elsewhere before you even reach round two.",
  },
];

const stages = [
  {
    icon: FileSearch,
    name: "CV Screening",
    color: "text-accent-blue",
    ring: "border-accent-blue/40",
    glow: "bg-accent-blue/10",
    what: "AI parses, ranks and shortlists every CV against your role in seconds, surfacing the strongest matches with an explainable score.",
  },
  {
    icon: Mic,
    name: "Voice Interview",
    color: "text-accent-violet",
    ring: "border-accent-violet/40",
    glow: "bg-accent-violet/10",
    what: "A natural conversational AI screens for communication, motivation and role fit, available 24/7 so no candidate waits on a calendar.",
  },
  {
    icon: ClipboardCheck,
    name: "Skill Assessment",
    color: "text-cyan-400",
    ring: "border-cyan-400/40",
    glow: "bg-cyan-400/10",
    what: "Role-specific assessments auto-grade real ability and benchmark each candidate against your bar, not against a buzzword-stuffed resume.",
  },
  {
    icon: Video,
    name: "Deep Interview",
    color: "text-amber-400",
    ring: "border-amber-400/40",
    glow: "bg-amber-400/10",
    what: "A live 45-minute video interview with Aria, your AI interviewer — real conversation, real follow-up questions based on what the candidate actually says, scored across up to 6 competencies your team defines for this role.",
  },
  {
    icon: CheckCircle2,
    name: "Selection",
    color: "text-success",
    ring: "border-success/40",
    glow: "bg-success/10",
    what: "Evidence-backed recommendations roll up every signal into one clear decision, with zero gut-feel bias and a full audit trail.",
  },
  {
    icon: FileSignature,
    name: "Offer Letter",
    color: "text-pink-400",
    ring: "border-pink-400/40",
    glow: "bg-pink-400/10",
    what: "Generate, approve and send a personalised offer in a single click, then track acceptance without leaving Recruit AI.",
  },
];

const features = [
  {
    icon: Brain,
    eyebrow: "Intelligent screening",
    title: "Stop reading resumes. Start reading talent.",
    desc: "Your screening agent reads every CV in under 60 seconds — the way your best recruiter would — then explains why each candidate ranks where they do. Adjust the weighting for must-have skills, seniority or domain and the shortlist re-ranks instantly. An agent can screen 500+ resumes in the time it takes to review 10 manually.",
    points: ["Explainable match scores", "Custom scoring weights per role", "Duplicate and fraud detection"],
  },
  {
    icon: Mic,
    eyebrow: "AI voice screening",
    title: "Interview every applicant, not just the top 5%.",
    desc: "Your screening agent conducts an 8-12 minute first-round phone call with every shortlisted candidate, at any hour in any timezone. Your team gets structured transcripts, summaries and signal scores — and only sees candidates worth a second look.",
    points: ["24/7 availability, zero scheduling", "Consistent questions for fairness", "Searchable transcripts and summaries"],
  },
  {
    icon: BarChart3,
    eyebrow: "Decision intelligence",
    title: "One pipeline. Every signal in one place.",
    desc: "From first CV to signed offer, every stage feeds a single candidate view. Compare finalists side by side on real evidence and share a defensible recommendation with hiring managers in one link.",
    points: ["Side-by-side candidate comparison", "Stakeholder-ready summaries", "Full audit trail for compliance"],
  },
  {
    icon: ShieldCheck,
    eyebrow: "Fair by design",
    title: "Consistency that protects your brand.",
    desc: "Every candidate moves through the same structured, rubric-driven process. Bias-aware scoring and transparent reasoning mean better hires and a process you can stand behind.",
    points: ["Rubric-driven, structured rounds", "Bias-aware scoring", "Transparent, reviewable reasoning"],
  },
];

const stats = [
  { value: 12, suffix: "", label: "hours saved per recruiter every week", sub: "Reclaimed from screening and scheduling busywork." },
  { value: 3, suffix: "x", label: "faster time-to-hire", sub: "Move from application to offer in days, not weeks." },
  { value: 85, suffix: "%", label: "reduction in manual screening", sub: "AI handles the first pass so your team focuses on people." },
];

export default function ForRecruitersPage() {
  return (
    <main className="bg-bg-primary text-text-primary">
      {/* Hero */}
      <section className="relative overflow-hidden grid-bg">
        <div className="container py-24 md:py-32">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-secondary px-4 py-1.5 text-sm text-text-secondary">
              <Zap className="h-4 w-4 text-accent-blue" />
              For recruiters and talent teams
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-display mt-6 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
              Hire <span className="gradient-text">10x faster</span> with AI that
              screens, interviews, and <span className="gradient-text">decides</span>.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg text-text-secondary md:text-xl">
              Recruit AI's hiring agents handle the groundwork — reading resumes, running
              first-round screens, scoring assessments — while your team stays in control
              of every decision that actually matters. Agents do the legwork; your
              recruiters make the call.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <GradientButton size="lg" asChild>
                <Link href="/signup">Start Free Trial</Link>
              </GradientButton>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Book Demo</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Problem */}
      <section className="border-t border-border-subtle">
        <div className="container py-20 md:py-28">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              The problem with <span className="gradient-text">hiring today</span>
            </h2>
            <p className="mt-4 max-w-2xl text-text-secondary">
              Traditional hiring leaks time, talent and goodwill at every step. Here is
              where it breaks down.
            </p>
          </ScrollReveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {painPoints.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.1}>
                <Card className="h-full p-6 transition-all hover:border-accent-blue/50 hover:shadow-lg hover:shadow-blue-500/10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border-subtle bg-bg-secondary">
                    <p.icon className="h-6 w-6 text-danger" />
                  </div>
                  <h3 className="font-display mt-5 text-xl font-semibold">{p.title}</h3>
                  <p className="mt-3 text-text-secondary">{p.desc}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pipeline walkthrough */}
      <section className="border-t border-border-subtle bg-bg-secondary/40">
        <div className="container py-20 md:py-28">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              One pipeline, <span className="gradient-text">six intelligent stages</span>
            </h2>
            <p className="mt-4 max-w-2xl text-text-secondary">
              Every candidate flows through the same structured journey. Here is what
              your hiring agents handle at each step — and where your team makes the call.
            </p>
          </ScrollReveal>
          <div className="mt-12 space-y-5">
            {stages.map((s, i) => (
              <ScrollReveal key={s.name} delay={i * 0.08} y={24}>
                <Card className="flex flex-col gap-5 p-6 transition-all hover:border-accent-blue/50 hover:shadow-lg hover:shadow-blue-500/10 md:flex-row md:items-center">
                  <div className="flex items-center gap-4 md:w-64 md:shrink-0">
                    <div className={cn("flex h-14 w-14 items-center justify-center rounded-xl border", s.ring, s.glow)}>
                      <s.icon className={cn("h-7 w-7", s.color)} />
                    </div>
                    <div>
                      <span className="text-xs font-medium uppercase tracking-wide text-text-secondary">
                        Stage {i + 1}
                      </span>
                      <h3 className={cn("font-display text-lg font-semibold", s.color)}>{s.name}</h3>
                    </div>
                  </div>
                  <p className="text-text-secondary md:flex-1">{s.what}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Feature deep-dive */}
      <section className="border-t border-border-subtle">
        <div className="container py-20 md:py-28">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Built to make <span className="gradient-text">great hires</span> the default
            </h2>
          </ScrollReveal>
          <div className="mt-16 space-y-20">
            {features.map((f, i) => {
              const reversed = i % 2 === 1;
              return (
                <ScrollReveal key={f.title} y={32}>
                  <div className={cn("grid items-center gap-10 md:grid-cols-2", reversed && "md:[&>*:first-child]:order-2")}>
                    <div>
                      <span className="text-sm font-medium uppercase tracking-wide text-accent-blue">
                        {f.eyebrow}
                      </span>
                      <h3 className="font-display mt-3 text-2xl font-bold md:text-3xl">{f.title}</h3>
                      <p className="mt-4 text-text-secondary">{f.desc}</p>
                      <ul className="mt-6 space-y-3">
                        {f.points.map((pt) => (
                          <li key={pt} className="flex items-center gap-3 text-text-primary">
                            <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Card className="relative flex h-64 items-center justify-center overflow-hidden p-8 md:h-80">
                      <div className="absolute inset-0 grid-bg opacity-40" />
                      <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-accent-blue/40 bg-accent-blue/10 glow-blue">
                        <f.icon className="h-12 w-12 text-accent-blue" />
                      </div>
                    </Card>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ROI stats */}
      <section className="border-t border-border-subtle bg-bg-secondary/40">
        <div className="container py-20 md:py-28">
          <ScrollReveal>
            <h2 className="font-display text-center text-3xl font-bold md:text-4xl">
              The <span className="gradient-text">ROI</span> shows up in week one
            </h2>
          </ScrollReveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {stats.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.1}>
                <Card className="h-full p-8 text-center transition-all hover:border-accent-blue/50 hover:shadow-lg hover:shadow-blue-500/10">
                  <div className="font-display text-5xl font-bold gradient-text">
                    <CounterAnimation value={s.value} suffix={s.suffix} />
                  </div>
                  <p className="mt-4 text-lg font-medium">{s.label}</p>
                  <p className="mt-2 text-sm text-text-secondary">{s.sub}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border-subtle">
        <div className="container py-24 text-center md:py-32">
          <ScrollReveal>
            <h2 className="font-display mx-auto max-w-3xl text-3xl font-bold md:text-5xl">
              Give your recruiters their <span className="gradient-text">week back</span>.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-text-secondary">
              Start free in minutes, or book a demo and we will walk your team through a
              live pipeline.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <GradientButton size="lg" asChild>
                <Link href="/signup">
                  Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </GradientButton>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Book Demo</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
