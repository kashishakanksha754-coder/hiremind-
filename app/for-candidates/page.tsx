import Link from "next/link";
import {
  FileSearch,
  Mic,
  ClipboardCheck,
  CheckCircle2,
  Send,
  Eye,
  Clock,
  Scale,
  Gauge,
  CalendarClock,
  Activity,
  ArrowRight,
  HeartCrack,
} from "lucide-react";
import { GradientButton } from "@/components/ui/GradientButton";
import { Card } from "@/components/ui/card";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { cn } from "@/lib/utils";

const journey = [
  { icon: Send, name: "Apply", color: "text-accent-blue", ring: "border-accent-blue/40", glow: "bg-accent-blue/10", desc: "Submit once. No 40-field forms, no re-typing your resume into yet another portal." },
  { icon: FileSearch, name: "CV Scored", color: "text-accent-blue", ring: "border-accent-blue/40", glow: "bg-accent-blue/10", desc: "Get an instant, explainable match score so you know exactly where you stand." },
  { icon: Mic, name: "Voice Interview", color: "text-accent-violet", ring: "border-accent-violet/40", glow: "bg-accent-violet/10", desc: "A natural conversation on your schedule, day or night, no awkward calendar tetris." },
  { icon: ClipboardCheck, name: "Assessment", color: "text-cyan-400", ring: "border-cyan-400/40", glow: "bg-cyan-400/10", desc: "Show real skills with a fair, role-relevant test, not trick questions." },
  { icon: CheckCircle2, name: "Decision", color: "text-success", ring: "border-success/40", glow: "bg-success/10", desc: "A clear yes or no with reasoning, delivered fast. No more silence." },
];

const transparency = [
  { icon: FileSearch, name: "CV Screening", color: "text-accent-blue", ring: "border-accent-blue/40", glow: "bg-accent-blue/10", see: "Your match score and a plain-language breakdown of which skills lined up and which gaps mattered." },
  { icon: Mic, name: "Voice Interview", color: "text-accent-violet", ring: "border-accent-violet/40", glow: "bg-accent-violet/10", see: "Confirmation the moment your interview is reviewed, plus a summary of what the conversation covered." },
  { icon: ClipboardCheck, name: "Skill Assessment", color: "text-cyan-400", ring: "border-cyan-400/40", glow: "bg-cyan-400/10", see: "How you performed against the role bar, with topic-level results so you learn from every attempt." },
  { icon: CheckCircle2, name: "Decision", color: "text-success", ring: "border-success/40", glow: "bg-success/10", see: "A real decision with the reasoning behind it, never a black box and never radio silence." },
];

const highlights = [
  { icon: Gauge, title: "Instant CV score", desc: "Apply and see your match score right away. No wondering whether your resume even got opened." },
  { icon: CalendarClock, title: "Interview on your schedule", desc: "Take your voice interview whenever it suits you. Early morning, late night, between shifts, it is up to you." },
  { icon: Activity, title: "Real-time status", desc: "Track exactly where you are in the process at every moment. Live updates, not vague auto-replies." },
  { icon: Scale, title: "Fair AI scoring", desc: "Every candidate is measured on the same structured, bias-aware rubric. You are judged on your ability, full stop." },
];

export default function ForCandidatesPage() {
  return (
    <main className="bg-bg-primary text-text-primary">
      {/* Hero */}
      <section className="relative overflow-hidden grid-bg">
        <div className="container py-24 md:py-32">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-secondary px-4 py-1.5 text-sm text-text-secondary">
              <Eye className="h-4 w-4 text-accent-violet" />
              For candidates
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-display mt-6 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
              Your <span className="gradient-text">dream job</span>, with{" "}
              <span className="gradient-text">full transparency</span>.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg text-text-secondary md:text-xl">
              No more black boxes. No more ghosting. HireMind shows you exactly where you
              stand at every stage, scores you fairly, and lets you interview on your own
              schedule.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="mt-10">
              <GradientButton size="lg" asChild>
                <Link href="/signup">
                  Sign up free <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </GradientButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stop being ghosted */}
      <section className="border-t border-border-subtle">
        <div className="container py-20 md:py-28">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <ScrollReveal>
              <div>
                <span className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-danger">
                  <HeartCrack className="h-4 w-4" /> Sound familiar?
                </span>
                <h2 className="font-display mt-4 text-3xl font-bold md:text-4xl">
                  Stop being <span className="gradient-text">ghosted</span>.
                </h2>
                <p className="mt-5 text-text-secondary">
                  You polish your resume. You nail the interview. And then nothing.
                  Days turn into weeks of silence, generic rejection templates, and that
                  sinking feeling that your application vanished into a void.
                </p>
                <p className="mt-4 text-text-secondary">
                  HireMind exists to end that. Every application gets read. Every stage
                  gives you a clear status. Every decision comes with reasoning, so you
                  always know where you stand and what happens next.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15} y={28}>
              <div className="space-y-4">
                <Card className="flex items-start gap-4 p-5">
                  <Clock className="mt-0.5 h-6 w-6 shrink-0 text-success" />
                  <div>
                    <h3 className="font-semibold">Fast, honest answers</h3>
                    <p className="mt-1 text-sm text-text-secondary">A clear yes or no in days, never weeks of silence.</p>
                  </div>
                </Card>
                <Card className="flex items-start gap-4 p-5">
                  <Eye className="mt-0.5 h-6 w-6 shrink-0 text-accent-blue" />
                  <div>
                    <h3 className="font-semibold">Always know your status</h3>
                    <p className="mt-1 text-sm text-text-secondary">Live progress at every stage of the process.</p>
                  </div>
                </Card>
                <Card className="flex items-start gap-4 p-5">
                  <Scale className="mt-0.5 h-6 w-6 shrink-0 text-accent-violet" />
                  <div>
                    <h3 className="font-semibold">Judged on your ability</h3>
                    <p className="mt-1 text-sm text-text-secondary">A fair, consistent rubric for every candidate.</p>
                  </div>
                </Card>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Candidate journey */}
      <section className="border-t border-border-subtle bg-bg-secondary/40">
        <div className="container py-20 md:py-28">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Your journey, <span className="gradient-text">step by step</span>
            </h2>
            <p className="mt-4 max-w-2xl text-text-secondary">
              Five clear stages. You always know which one you are in.
            </p>
          </ScrollReveal>
          <div className="mt-14 grid gap-6 md:grid-cols-5">
            {journey.map((s, i) => (
              <ScrollReveal key={s.name} delay={i * 0.1}>
                <Card className="relative flex h-full flex-col items-center p-6 text-center transition-all hover:border-accent-blue/50 hover:shadow-lg hover:shadow-blue-500/10">
                  <span className="absolute right-3 top-3 text-xs font-semibold text-text-secondary">
                    0{i + 1}
                  </span>
                  <div className={cn("flex h-14 w-14 items-center justify-center rounded-xl border", s.ring, s.glow)}>
                    <s.icon className={cn("h-7 w-7", s.color)} />
                  </div>
                  <h3 className="font-display mt-4 text-lg font-semibold">{s.name}</h3>
                  <p className="mt-2 text-sm text-text-secondary">{s.desc}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What you see at each stage */}
      <section className="border-t border-border-subtle">
        <div className="container py-20 md:py-28">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              What <span className="gradient-text">you</span> see at each stage
            </h2>
            <p className="mt-4 max-w-2xl text-text-secondary">
              Transparency is not a buzzword here. It is the product.
            </p>
          </ScrollReveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {transparency.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.1}>
                <Card className="flex h-full gap-4 p-6 transition-all hover:border-accent-blue/50 hover:shadow-lg hover:shadow-blue-500/10">
                  <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border", t.ring, t.glow)}>
                    <t.icon className={cn("h-6 w-6", t.color)} />
                  </div>
                  <div>
                    <h3 className={cn("font-display text-lg font-semibold", t.color)}>{t.name}</h3>
                    <p className="mt-2 text-text-secondary">{t.see}</p>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Feature highlights */}
      <section className="border-t border-border-subtle bg-bg-secondary/40">
        <div className="container py-20 md:py-28">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Built <span className="gradient-text">around you</span>
            </h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((h, i) => (
              <ScrollReveal key={h.title} delay={i * 0.1}>
                <Card className="h-full p-6 transition-all hover:border-accent-blue/50 hover:shadow-lg hover:shadow-blue-500/10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-accent-blue/40 bg-accent-blue/10">
                    <h.icon className="h-6 w-6 text-accent-blue" />
                  </div>
                  <h3 className="font-display mt-5 text-lg font-semibold">{h.title}</h3>
                  <p className="mt-3 text-sm text-text-secondary">{h.desc}</p>
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
              Apply with <span className="gradient-text">confidence</span>, not crossed fingers.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-text-secondary">
              Create your free profile and experience hiring that actually keeps you in
              the loop.
            </p>
            <div className="mt-10">
              <GradientButton size="lg" asChild>
                <Link href="/signup">
                  Sign up free <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </GradientButton>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
