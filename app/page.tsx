"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  FileSearch,
  Mic,
  ClipboardCheck,
  MessageSquareText,
  CheckCircle2,
  FileSignature,
  Sparkles,
  ArrowRight,
  Zap,
  ShieldCheck,
  BarChart3,
  Users,
  Eye,
  Clock,
  Star,
  Check,
} from "lucide-react";
import { GradientButton } from "@/components/ui/GradientButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { CounterAnimation } from "@/components/animations/CounterAnimation";
import { cn } from "@/lib/utils";

type Audience = "recruiter" | "candidate";

const logos = ["Razorpay", "Swiggy", "Zepto", "PhonePe", "Groww", "CRED", "Meesho", "Nykaa"];

const stages = [
  { icon: FileSearch, name: "CV Screening", color: "text-accent-blue", ring: "border-accent-blue/40", glow: "bg-accent-blue/10", desc: "AI parses, ranks and shortlists every CV in seconds." },
  { icon: Mic, name: "Voice Interview", color: "text-accent-violet", ring: "border-accent-violet/40", glow: "bg-accent-violet/10", desc: "Conversational AI screens for communication and intent." },
  { icon: ClipboardCheck, name: "Skill Assessment", color: "text-cyan-400", ring: "border-cyan-400/40", glow: "bg-cyan-400/10", desc: "Role-specific tests that auto-grade and benchmark talent." },
  { icon: MessageSquareText, name: "Deep Interview", color: "text-amber-400", ring: "border-amber-400/40", glow: "bg-amber-400/10", desc: "Structured technical rounds with consistent rubrics." },
  { icon: CheckCircle2, name: "Selection", color: "text-success", ring: "border-success/40", glow: "bg-success/10", desc: "Evidence-backed recommendations, zero gut-feel bias." },
  { icon: FileSignature, name: "Offer Letter", color: "text-pink-400", ring: "border-pink-400/40", glow: "bg-pink-400/10", desc: "Generate, approve and send offers in a single click." },
];

const testimonials = [
  { quote: "HireMind cut our screening time from days to minutes. Our recruiters finally focus on people, not paperwork.", name: "Priya Nair", role: "Head of Talent, Razorpay" },
  { quote: "The AI voice interviews are shockingly natural. Candidates love the speed and we love the consistency.", name: "Arjun Mehta", role: "VP Engineering, Groww" },
  { quote: "We doubled our hiring throughput without adding a single recruiter. The ROI was obvious in week one.", name: "Sneha Reddy", role: "People Lead, Meesho" },
];

export default function HomePage() {
  const [audience, setAudience] = useState<Audience>("recruiter");
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % testimonials.length), 4500);
    return () => clearInterval(id);
  }, []);

  const isRecruiter = audience === "recruiter";

  return (
    <main className="overflow-hidden">
      {/* HERO */}
      <section className="relative grid-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-blue/5 via-transparent to-bg-primary" />
        <div className="container relative py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal>
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-secondary/70 px-4 py-1.5 text-xs font-medium text-text-secondary backdrop-blur transition-all hover:border-accent-blue/50"
              >
                <Sparkles className="size-3.5 text-accent-violet" />
                Introducing the 6-stage AI hiring pipeline
                <ArrowRight className="size-3.5" />
              </Link>
            </ScrollReveal>

            <div className="mt-6 inline-flex rounded-full border border-border-subtle bg-bg-secondary/70 p-1 backdrop-blur">
              {(["recruiter", "candidate"] as Audience[]).map((a) => (
                <button
                  key={a}
                  onClick={() => setAudience(a)}
                  className={cn(
                    "rounded-full px-5 py-1.5 text-sm font-medium capitalize transition-all",
                    audience === a ? "bg-gradient-to-r from-accent-blue to-accent-violet text-white shadow-lg shadow-blue-500/20" : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {a === "recruiter" ? "For Recruiters" : "For Candidates"}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={audience}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <h1 className="mt-8 font-display text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
                  {isRecruiter ? (
                    <>
                      Hire <span className="gradient-text">10x faster</span> with AI that screens, interviews, and decides
                    </>
                  ) : (
                    <>
                      Apply once. <span className="gradient-text">Know exactly</span> where you stand.
                    </>
                  )}
                </h1>
                <p className="mx-auto mt-6 max-w-xl text-lg text-text-secondary">
                  {isRecruiter
                    ? "HireMind runs your entire pipeline — from CV to offer letter — so your team makes faster, fairer, evidence-based hiring decisions."
                    : "No more black-box applications. Get screened, interviewed and scored by AI with real-time transparency at every single stage."}
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link href="/signup">
                    <GradientButton size="lg">
                      {isRecruiter ? "Start Free Trial" : "Sign up free"}
                      <ArrowRight className="size-4" />
                    </GradientButton>
                  </Link>
                  <Link href={isRecruiter ? "/for-recruiters" : "/for-candidates"}>
                    <Button variant="outline" size="lg" className="border-border-subtle">
                      {isRecruiter ? "See it for recruiters" : "See it for candidates"}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Floating dashboard mockup */}
          <ScrollReveal delay={0.15} className="mx-auto mt-16 max-w-5xl">
            <div className="glow-blue rounded-2xl border border-border-subtle bg-card/80 p-3 backdrop-blur md:p-5">
              <div className="rounded-xl border border-border-subtle bg-bg-secondary/60 p-4 md:p-6">
                <div className="flex items-center gap-2 pb-4">
                  <span className="size-3 rounded-full bg-danger/70" />
                  <span className="size-3 rounded-full bg-warning/70" />
                  <span className="size-3 rounded-full bg-success/70" />
                  <span className="ml-3 flex items-center gap-2 text-xs text-text-secondary">
                    <Brain className="size-3.5 text-accent-blue" /> HireMind · Pipeline Overview
                  </span>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    { label: "Active candidates", value: "1,284", tint: "text-accent-blue" },
                    { label: "Avg. screen time", value: "47s", tint: "text-success" },
                    { label: "Offers sent", value: "92", tint: "text-accent-violet" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-lg border border-border-subtle bg-card p-4">
                      <p className="text-xs text-text-secondary">{s.label}</p>
                      <p className={cn("mt-1 font-display text-2xl font-bold", s.tint)}>{s.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-[1.4fr_1fr]">
                  <div className="rounded-lg border border-border-subtle bg-card p-4">
                    <p className="mb-3 text-xs font-medium text-text-secondary">Candidate queue</p>
                    <div className="space-y-2">
                      {[
                        { n: "Aditya Sharma", r: "Frontend Engineer", s: 92, c: "bg-success" },
                        { n: "Kavya Iyer", r: "Product Designer", s: 81, c: "bg-accent-blue" },
                        { n: "Rohit Verma", r: "Data Scientist", s: 74, c: "bg-warning" },
                      ].map((row) => (
                        <div key={row.n} className="flex items-center justify-between rounded-md bg-bg-secondary/60 px-3 py-2">
                          <div className="flex items-center gap-2">
                            <div className="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-accent-blue to-accent-violet text-[10px] font-semibold text-white">
                              {row.n.split(" ").map((x) => x[0]).join("")}
                            </div>
                            <div>
                              <p className="text-xs font-medium text-text-primary">{row.n}</p>
                              <p className="text-[10px] text-text-secondary">{row.r}</p>
                            </div>
                          </div>
                          <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold text-white", row.c)}>{row.s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg border border-border-subtle bg-card p-4">
                    <p className="mb-3 text-xs font-medium text-text-secondary">Pipeline stages</p>
                    <div className="space-y-2.5">
                      {stages.slice(0, 5).map((st, i) => (
                        <div key={st.name} className="flex items-center gap-2">
                          <st.icon className={cn("size-4", st.color)} />
                          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-bg-secondary">
                            <div className="h-full rounded-full bg-gradient-to-r from-accent-blue to-accent-violet" style={{ width: `${90 - i * 14}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SOCIAL PROOF MARQUEE */}
      <section className="border-y border-border-subtle bg-bg-secondary/40 py-8">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-text-secondary">
          Trusted by teams hiring at
        </p>
        <div className="relative overflow-hidden">
          <div className="flex w-max animate-marquee gap-12 pr-12">
            {[...logos, ...logos].map((logo, i) => (
              <span key={i} className="whitespace-nowrap font-display text-xl font-bold text-text-secondary/70">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="container py-20">
        <div className="grid gap-8 text-center md:grid-cols-3">
          {[
            { value: 10000, suffix: "+", label: "candidates screened" },
            { value: 85, suffix: "%", label: "reduction in screening time" },
            { value: 6, suffix: "-stage", label: "AI pipeline" },
          ].map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 0.1}>
              <p className="font-display text-5xl font-extrabold gradient-text">
                <CounterAnimation value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-text-secondary">{s.label}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* PIPELINE */}
      <section className="container py-20">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            One pipeline. <span className="gradient-text">Zero manual work.</span>
          </h2>
          <p className="mt-4 text-text-secondary">
            Every stage is automated, scored and audit-ready — so nothing falls through the cracks.
          </p>
        </ScrollReveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stages.map((st, i) => (
            <ScrollReveal key={st.name} delay={i * 0.07}>
              <Card className={cn("h-full p-6 transition-all hover:shadow-lg hover:shadow-blue-500/10", "hover:border-accent-blue/50")}>
                <div className={cn("mb-4 inline-flex size-12 items-center justify-center rounded-xl border", st.ring, st.glow)}>
                  <st.icon className={cn("size-6", st.color)} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-text-secondary">0{i + 1}</span>
                  <h3 className="font-display text-lg font-semibold">{st.name}</h3>
                </div>
                <p className="mt-2 text-sm text-text-secondary">{st.desc}</p>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* FEATURES BENTO */}
      <section className="container py-20">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Built to make every hire <span className="gradient-text">smarter</span>
          </h2>
        </ScrollReveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3 md:grid-rows-2">
          <Card className="md:col-span-2 md:row-span-1 p-8 transition-all hover:border-accent-blue/50 hover:shadow-lg hover:shadow-blue-500/10">
            <Brain className="size-8 text-accent-blue" />
            <h3 className="mt-4 font-display text-2xl font-semibold">AI that understands context, not keywords</h3>
            <p className="mt-2 max-w-lg text-text-secondary">
              Our models read intent, project depth and real impact — surfacing the candidates a keyword filter would miss entirely.
            </p>
          </Card>
          <Card className="md:row-span-2 p-8 transition-all hover:border-accent-violet/50 hover:shadow-lg hover:shadow-violet-500/10">
            <Mic className="size-8 text-accent-violet" />
            <h3 className="mt-4 font-display text-2xl font-semibold">Lifelike AI voice interviews</h3>
            <p className="mt-2 text-text-secondary">
              Natural, adaptive conversations that screen thousands of candidates in parallel — available 24/7, in their own time zone.
            </p>
            <div className="mt-6 space-y-2">
              {["Adaptive follow-up questions", "Tone & clarity analysis", "Instant transcript & scoring"].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-text-secondary">
                  <Check className="size-4 text-success" /> {f}
                </div>
              ))}
            </div>
          </Card>
          {[
            { icon: ShieldCheck, title: "Bias-aware scoring", desc: "Structured rubrics keep every decision fair and defensible." },
            { icon: BarChart3, title: "Hiring analytics", desc: "Funnel, source and time-to-hire insights in real time." },
            { icon: Zap, title: "One-click offers", desc: "Generate and send compliant offer letters instantly." },
          ].map((f) => (
            <Card key={f.title} className="p-6 transition-all hover:border-accent-blue/50 hover:shadow-lg hover:shadow-blue-500/10">
              <f.icon className="size-6 text-accent-blue" />
              <h3 className="mt-3 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-text-secondary">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* DUAL AUDIENCE */}
      <section className="container py-20">
        <div className="grid gap-6 md:grid-cols-2">
          <ScrollReveal>
            <Card className="h-full p-8 transition-all hover:border-accent-blue/50">
              <Users className="size-8 text-accent-blue" />
              <h3 className="mt-4 font-display text-2xl font-semibold">For Recruiters</h3>
              <p className="mt-2 text-text-secondary">Screen, interview and decide at scale without burning out your team.</p>
              <ul className="mt-5 space-y-2 text-sm text-text-secondary">
                {["Auto-rank every applicant in seconds", "Consistent, structured interviews", "Evidence-backed decisions"].map((x) => (
                  <li key={x} className="flex items-center gap-2"><Check className="size-4 text-success" /> {x}</li>
                ))}
              </ul>
              <Link href="/for-recruiters" className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent-blue">
                Explore recruiter tools <ArrowRight className="size-4" />
              </Link>
            </Card>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Card className="h-full p-8 transition-all hover:border-accent-violet/50">
              <Eye className="size-8 text-accent-violet" />
              <h3 className="mt-4 font-display text-2xl font-semibold">For Candidates</h3>
              <p className="mt-2 text-text-secondary">Full transparency from application to offer — no more being ghosted.</p>
              <ul className="mt-5 space-y-2 text-sm text-text-secondary">
                {["Know your CV score instantly", "Interview on your schedule", "Real-time status at every stage"].map((x) => (
                  <li key={x} className="flex items-center gap-2"><Check className="size-4 text-success" /> {x}</li>
                ))}
              </ul>
              <Link href="/for-candidates" className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent-violet">
                See the candidate experience <ArrowRight className="size-4" />
              </Link>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container py-20">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Loved by hiring teams across India</h2>
        </ScrollReveal>
        <div className="relative mx-auto mt-10 max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="p-8 text-center">
                <div className="mb-4 flex justify-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="font-display text-xl font-medium leading-relaxed">&ldquo;{testimonials[active].quote}&rdquo;</p>
                <p className="mt-5 font-semibold text-text-primary">{testimonials[active].name}</p>
                <p className="text-sm text-text-secondary">{testimonials[active].role}</p>
              </Card>
            </motion.div>
          </AnimatePresence>
          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={cn("h-2 rounded-full transition-all", i === active ? "w-6 bg-accent-blue" : "w-2 bg-border-subtle")}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="container py-20">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Simple pricing that scales with you</h2>
        </ScrollReveal>
        <div className="mx-auto mt-10 grid max-w-3xl gap-6 md:grid-cols-2">
          <Card className="p-8">
            <h3 className="font-display text-lg font-semibold">Starter</h3>
            <p className="mt-2 text-text-secondary">Everything you need to run your first AI-powered hire.</p>
            <p className="mt-4 font-display text-3xl font-bold">Free <span className="text-base font-normal text-text-secondary">for 30 days</span></p>
            <Link href="/pricing" className="mt-6 block">
              <Button variant="outline" className="w-full border-border-subtle">View plans</Button>
            </Link>
          </Card>
          <Card className="relative border-accent-blue/50 p-8 shadow-lg shadow-blue-500/10">
            <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-accent-blue to-accent-violet px-3 py-1 text-xs font-semibold text-white">Most popular</span>
            <h3 className="font-display text-lg font-semibold">Pro</h3>
            <p className="mt-2 text-text-secondary">Unlimited jobs, AI voice interviews and full analytics.</p>
            <p className="mt-4 font-display text-3xl font-bold">₹9,999<span className="text-base font-normal text-text-secondary">/month</span></p>
            <Link href="/pricing" className="mt-6 block">
              <GradientButton className="w-full">Choose Pro</GradientButton>
            </Link>
          </Card>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="container py-24">
        <ScrollReveal>
          <div className="glow-blue relative overflow-hidden rounded-3xl border border-border-subtle bg-gradient-to-br from-accent-blue/10 via-card to-accent-violet/10 p-12 text-center md:p-16">
            <div className="grid-bg absolute inset-0 opacity-30" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold md:text-5xl">
                Ready to <span className="gradient-text">transform</span> how you hire?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-text-secondary">
                Join the teams making faster, fairer hiring decisions with HireMind.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/signup"><GradientButton size="lg">Start Free Trial <ArrowRight className="size-4" /></GradientButton></Link>
                <Link href="/contact"><Button variant="outline" size="lg" className="border-border-subtle">Book a Demo</Button></Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
