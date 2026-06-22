"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  FileSearch,
  Mic,
  ClipboardCheck,
  Video,
  CheckCircle2,
  FileSignature,
  Send,
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
  { icon: Video, name: "Deep Interview", color: "text-amber-400", ring: "border-amber-400/40", glow: "bg-amber-400/10", desc: "A live 45-minute video call with Aria — real conversation, scored across 6 competencies." },
  { icon: CheckCircle2, name: "Selection", color: "text-success", ring: "border-success/40", glow: "bg-success/10", desc: "Evidence-backed recommendations, zero gut-feel bias." },
  { icon: FileSignature, name: "Offer Letter", color: "text-pink-400", ring: "border-pink-400/40", glow: "bg-pink-400/10", desc: "Generate, approve and send offers in a single click." },
];

const candidateStages = [
  { icon: Send, name: "Apply", color: "text-accent-blue", ring: "border-accent-blue/40", glow: "bg-accent-blue/10", desc: "Submit once. Your profile is auto-formatted and sent to the hiring team." },
  { icon: FileSearch, name: "CV Scored", color: "text-accent-violet", ring: "border-accent-violet/40", glow: "bg-accent-violet/10", desc: "AI reads your CV in seconds and gives you an honest fit score for the role." },
  { icon: Mic, name: "Voice Interview", color: "text-cyan-400", ring: "border-cyan-400/40", glow: "bg-cyan-400/10", desc: "A short AI voice call on your schedule — ask questions, share your story." },
  { icon: Video, name: "Deep Interview", color: "text-amber-400", ring: "border-amber-400/40", glow: "bg-amber-400/10", desc: "A live video conversation with Aria, your AI interviewer. Real follow-up questions based on what you actually say — not a script." },
  { icon: ClipboardCheck, name: "Assessment", color: "text-success", ring: "border-success/40", glow: "bg-success/10", desc: "A focused skills test built for the role. Complete it whenever suits you." },
  { icon: CheckCircle2, name: "Decision", color: "text-pink-400", ring: "border-pink-400/40", glow: "bg-pink-400/10", desc: "You get a clear outcome — no ghosting, no waiting in silence." },
];

const testimonials = [
  { quote: "Recruit AI cut our screening time from days to minutes. Our recruiters finally focus on people, not paperwork.", name: "Priya Nair", role: "Head of Talent, Razorpay" },
  { quote: "The AI voice interviews are shockingly natural. Candidates love the speed and we love the consistency.", name: "Arjun Mehta", role: "VP Engineering, Groww" },
  { quote: "We doubled our hiring throughput without adding a single recruiter. The ROI was obvious in week one.", name: "Sneha Reddy", role: "People Lead, Meesho" },
];

const candidateTestimonials = [
  { quote: "I finally knew where I stood after every single stage. No ghosting, no guessing — just a clear yes or no, fast.", name: "Priya Nair", role: "Hired via Recruit AI" },
  { quote: "The voice interview felt like a real conversation. I did it at midnight after my shift and got my score the same day.", name: "Rajan Pillai", role: "Hired via Recruit AI" },
  { quote: "Applied on a Monday, got my offer letter on Friday. I've never moved that fast through a hiring process in my life.", name: "Ananya Krishnan", role: "Hired via Recruit AI" },
];

export default function HomePage() {
  const [audience, setAudience] = useState<Audience>("recruiter");
  const [active, setActive] = useState(0);

  const isRecruiter = audience === "recruiter";
  const activeTestimonials = isRecruiter ? testimonials : candidateTestimonials;

  useEffect(() => {
    setActive(0);
  }, [audience]);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % activeTestimonials.length), 4500);
    return () => clearInterval(id);
  }, [activeTestimonials.length]);

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
                    ? "Recruit AI runs your entire pipeline — from CV to offer letter — so your team makes faster, fairer, evidence-based hiring decisions."
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
                    <Brain className="size-3.5 text-accent-blue" /> Recruit AI · Pipeline Overview
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
          {isRecruiter ? "Trusted by teams hiring at" : "Trusted by job seekers at"}
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
        <AnimatePresence mode="wait">
          <motion.div
            key={audience + "-stats"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid gap-8 text-center md:grid-cols-3"
          >
            {(isRecruiter
              ? [
                  { value: 10000, suffix: "+", label: "candidates screened" },
                  { value: 85, suffix: "%", label: "reduction in screening time" },
                  { value: 6, suffix: "-stage", label: "AI pipeline" },
                ]
              : [
                  { value: 10000, suffix: "+", label: "candidates placed" },
                  { value: 9, suffix: " days", label: "average time to offer" },
                  { value: 100, suffix: "%", label: "of applicants get a clear outcome" },
                ]
            ).map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.1}>
                <p className="font-display text-5xl font-extrabold gradient-text">
                  <CounterAnimation value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-text-secondary">{s.label}</p>
              </ScrollReveal>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* PIPELINE */}
      <section className="container py-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={audience + "-pipeline-heading"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <ScrollReveal className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                {isRecruiter
                  ? <>One pipeline. <span className="gradient-text">Agents do the legwork, you make the call.</span></>
                  : <>Your journey, <span className="gradient-text">step by step.</span></>}
              </h2>
              <p className="mt-4 text-text-secondary">
                {isRecruiter
                  ? "Every stage is handled by your hiring agents, scored and audit-ready — so your team focuses on the decisions that actually matter."
                  : "Six clear stages. You always know which one you're in."}
              </p>
            </ScrollReveal>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.div
            key={audience + "-pipeline-grid"}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="mt-12 grid gap-5 sm:grid-cols-3 lg:grid-cols-6"
          >
            {(isRecruiter ? stages : candidateStages).map((st, i) => (
              <ScrollReveal key={st.name} delay={i * 0.05}>
                <Card className={cn("h-full p-5 transition-all hover:shadow-lg hover:shadow-blue-500/10", "hover:border-accent-blue/50")}>
                  <div className={cn("mb-3 inline-flex size-10 items-center justify-center rounded-xl border", st.ring, st.glow)}>
                    <st.icon className={cn("size-5", st.color)} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-text-secondary">0{i + 1}</span>
                    <h3 className="font-display text-sm font-semibold">{st.name}</h3>
                  </div>
                  <p className="mt-2 text-xs text-text-secondary">{st.desc}</p>
                </Card>
              </ScrollReveal>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* FEATURES BENTO */}
      <section className="container py-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={audience + "-features"}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <ScrollReveal className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                {isRecruiter
                  ? <>Built to make every hire <span className="gradient-text">smarter</span></>
                  : <>Built to make every application <span className="gradient-text">count</span></>}
              </h2>
            </ScrollReveal>
            <div className="mt-12 grid gap-5 md:grid-cols-3 md:grid-rows-2">
              {isRecruiter ? (
                <>
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
                </>
              ) : (
                <>
                  <Card className="md:col-span-2 md:row-span-1 p-8 transition-all hover:border-accent-blue/50 hover:shadow-lg hover:shadow-blue-500/10">
                    <Brain className="size-8 text-accent-blue" />
                    <h3 className="mt-4 font-display text-2xl font-semibold">Your experience, actually understood</h3>
                    <p className="mt-2 max-w-lg text-text-secondary">
                      Our models read what you've actually done — the depth, the impact, the context — instead of scanning for buzzwords a keyword filter would reward.
                    </p>
                  </Card>
                  <Card className="md:row-span-2 p-8 transition-all hover:border-accent-violet/50 hover:shadow-lg hover:shadow-violet-500/10">
                    <Mic className="size-8 text-accent-violet" />
                    <h3 className="mt-4 font-display text-2xl font-semibold">A real conversation, not a quiz</h3>
                    <p className="mt-2 text-text-secondary">
                      Talk through your experience naturally, on your schedule, in your own time zone. No rigid script, no waiting on a recruiter's calendar.
                    </p>
                    <div className="mt-6 space-y-2">
                      {["Follows up on what you actually say", "Clear, conversational, no trick questions", "Instant transcript so you know exactly what was asked"].map((f) => (
                        <div key={f} className="flex items-center gap-2 text-sm text-text-secondary">
                          <Check className="size-4 text-success" /> {f}
                        </div>
                      ))}
                    </div>
                  </Card>
                  {[
                    { icon: ShieldCheck, title: "Your results, explained", desc: "See exactly why you got the score you did — not just a rejection with no reason." },
                    { icon: BarChart3, title: "Track everything in one place", desc: "Every application, every stage, one dashboard. No more guessing which company you're waiting on." },
                    { icon: Zap, title: "Offers you can act on fast", desc: "When you're selected, get your offer letter instantly — no weeks of silence after the final interview." },
                  ].map((f) => (
                    <Card key={f.title} className="p-6 transition-all hover:border-accent-blue/50 hover:shadow-lg hover:shadow-blue-500/10">
                      <f.icon className="size-6 text-accent-blue" />
                      <h3 className="mt-3 font-display text-lg font-semibold">{f.title}</h3>
                      <p className="mt-1 text-sm text-text-secondary">{f.desc}</p>
                    </Card>
                  ))}
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
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
          <AnimatePresence mode="wait">
            <motion.h2
              key={audience + "-testimonial-heading"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="font-display text-3xl font-bold md:text-4xl"
            >
              {isRecruiter ? "Loved by hiring teams across India" : "Loved by job seekers across India"}
            </motion.h2>
          </AnimatePresence>
        </ScrollReveal>
        <div className="relative mx-auto mt-10 max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={audience + "-testimonial-" + active}
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
                <p className="font-display text-xl font-medium leading-relaxed">&ldquo;{activeTestimonials[active]?.quote}&rdquo;</p>
                <p className="mt-5 font-semibold text-text-primary">{activeTestimonials[active]?.name}</p>
                <p className="text-sm text-text-secondary">{activeTestimonials[active]?.role}</p>
              </Card>
            </motion.div>
          </AnimatePresence>
          <div className="mt-6 flex justify-center gap-2">
            {activeTestimonials.map((_, i) => (
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

      {/* PRICING TEASER — recruiter only */}
      {isRecruiter && <section className="container py-20">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">One plan. <span className="gradient-text">Pay only for the AI time you use.</span></h2>
          <p className="mt-4 text-text-secondary">Job posts, screening, and assessments are included for unlimited roles. Voice and video interviews are billed by the minute — the only real variable cost.</p>
        </ScrollReveal>
        <div className="mx-auto mt-10 grid max-w-3xl gap-6 md:grid-cols-2 items-start">
          {/* Pilot */}
          <Card className="p-8">
            <h3 className="font-display text-xl font-semibold">Pilot</h3>
            <p className="mt-1 text-sm text-text-secondary">Run a real hiring loop with one team.</p>
            <p className="mt-4 font-display text-3xl font-bold">$199<span className="text-base font-normal text-text-secondary">/mo</span></p>
            <ul className="mt-4 space-y-2 text-sm text-text-secondary">
              <li className="flex items-center gap-2"><Check className="h-4 w-4 shrink-0 text-success" /> 400 voice minutes</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 shrink-0 text-success" /> 3 seats</li>
            </ul>
            <Link href="/signup" className="mt-6 block">
              <Button variant="outline" className="w-full">Start Pilot</Button>
            </Link>
          </Card>
          {/* Growth */}
          <Card className="relative border-accent-blue/50 p-8 shadow-lg shadow-blue-500/10 bg-gradient-to-b from-accent-blue/10 to-transparent">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent-blue to-accent-violet px-4 py-1 text-xs font-semibold text-white whitespace-nowrap">
              <Sparkles className="h-3 w-3" /> Most Popular
            </span>
            <h3 className="font-display text-xl font-semibold">Growth</h3>
            <p className="mt-1 text-sm text-text-secondary">Scale screening across multiple roles.</p>
            <p className="mt-4 font-display text-3xl font-bold">$599<span className="text-base font-normal text-text-secondary">/mo</span></p>
            <ul className="mt-4 space-y-2 text-sm text-text-secondary">
              <li className="flex items-center gap-2"><Check className="h-4 w-4 shrink-0 text-success" /> 1,500 voice minutes</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 shrink-0 text-success" /> 10 seats</li>
            </ul>
            <Link href="/signup" className="mt-6 block">
              <GradientButton className="w-full">Start Growth</GradientButton>
            </Link>
          </Card>
        </div>
        <p className="mt-6 text-center text-sm text-text-secondary">
          Need more?{" "}
          <Link href="/pricing" className="text-accent-blue hover:underline">See Scale plan & voice credit top-ups →</Link>
        </p>
        <div className="mt-6 text-center">
          <Link href="/pricing" className="text-sm font-medium text-accent-blue hover:underline">
            See full pricing & estimator →
          </Link>
        </div>
      </section>}

      {/* FINAL CTA */}
      <section className="container py-24">
        <ScrollReveal>
          <div className="glow-blue relative overflow-hidden rounded-3xl border border-border-subtle bg-gradient-to-br from-accent-blue/10 via-card to-accent-violet/10 p-12 text-center md:p-16">
            <div className="grid-bg absolute inset-0 opacity-30" />
            <AnimatePresence mode="wait">
              <motion.div
                key={audience + "-cta"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {isRecruiter ? (
                  <>
                    <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold md:text-5xl">
                      Ready to <span className="gradient-text">transform</span> how you hire?
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-text-secondary">
                      Join the teams making faster, fairer hiring decisions with Recruit AI.
                    </p>
                    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                      <Link href="/signup"><GradientButton size="lg">Start Free Trial <ArrowRight className="size-4" /></GradientButton></Link>
                      <Link href="/contact"><Button variant="outline" size="lg" className="border-border-subtle">Book a Demo</Button></Link>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold md:text-5xl">
                      Ready to find a role that actually <span className="gradient-text">wants</span> you back?
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-text-secondary">
                      Join candidates getting real feedback, real speed, and real offers with Recruit AI.
                    </p>
                    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                      <Link href="/portal/jobs"><GradientButton size="lg">Find Jobs <ArrowRight className="size-4" /></GradientButton></Link>
                      <Link href="/how-it-works"><Button variant="outline" size="lg" className="border-border-subtle">See How It Works</Button></Link>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
