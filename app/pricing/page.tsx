"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Check, X, Sparkles, ChevronDown, Briefcase, Zap, TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GradientButton } from "@/components/ui/GradientButton";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

// ─── Data ────────────────────────────────────────────────────────────────────

const USD_TO_INR = 83;

const PLANS = [
  {
    id: "pilot",
    name: "Pilot",
    subtitle: "Run a real hiring loop with one team.",
    priceUSD: 199,
    seats: 3,
    voiceMinutes: 400,
    voiceLabel: "≈ 26 pre-screens or 8 interviews",
    highlighted: false,
    badge: null,
    cta: "Start Pilot",
    ctaStyle: "outline" as const,
    href: "/signup",
    features: [
      { text: "Unlimited jobs & pipeline", included: true },
      { text: "Resume AI, JD & question gen", included: true },
      { text: "Assessments + auto-scoring", included: true },
      { text: "400 voice minutes included", included: true },
      { text: "3 team seats", included: true },
      { text: "Proctoring & integrations", included: false },
      { text: "Email support", included: true },
    ],
  },
  {
    id: "growth",
    name: "Growth",
    subtitle: "Scale screening across multiple roles.",
    priceUSD: 599,
    seats: 10,
    voiceMinutes: 1500,
    voiceLabel: "≈ 100 pre-screens or 33 interviews",
    highlighted: true,
    badge: "Most popular for pilots",
    cta: "Start Growth",
    ctaStyle: "gradient" as const,
    href: "/signup",
    features: [
      { text: "Everything in Pilot", included: true },
      { text: "1,500 voice minutes included", included: true },
      { text: "10 team seats", included: true },
      { text: "Proctoring & integrity monitoring", included: true },
      { text: "Calendar & job-board syndication", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Priority support", included: true },
    ],
  },
  {
    id: "scale",
    name: "Scale",
    subtitle: "High-volume hiring with the best rates.",
    priceUSD: 1499,
    pricePrefix: "from",
    seats: Infinity,
    voiceMinutes: 4000,
    voiceLabel: "≈ 266 pre-screens or 88 interviews",
    highlighted: false,
    badge: null,
    cta: "Talk to us",
    ctaStyle: "outline" as const,
    href: "/contact",
    features: [
      { text: "Everything in Growth", included: true },
      { text: "4,000 voice minutes included", included: true },
      { text: "Unlimited seats", included: true },
      { text: "Best top-up rate ($0.35/min)", included: true },
      { text: "Analytics export & API", included: true },
      { text: "Dedicated success manager", included: true },
      { text: "Custom contract & SSO", included: true },
    ],
  },
];

const TOP_UP_PACKS = [
  { name: "Small", minutes: 250, priceUSD: 150, rateUSD: 0.60, badge: null },
  { name: "Medium", minutes: 1000, priceUSD: 450, rateUSD: 0.45, badge: "Save 25% / min" },
  { name: "Large", minutes: 5000, priceUSD: 1750, rateUSD: 0.35, badge: "Save 42% / min" },
];

const COMPARISON_ROWS = [
  { feature: "Job posts & pipeline", pilot: "Unlimited", growth: "Unlimited", scale: "Unlimited" },
  { feature: "Resume parsing, scoring & search", pilot: true, growth: true, scale: true },
  { feature: "JD & question generation (text AI)", pilot: true, growth: true, scale: true },
  { feature: "Assessments + auto-scoring", pilot: true, growth: true, scale: true },
  { feature: "AI voice pre-screen & interview", pilot: "Credits", growth: "Credits", scale: "Credits" },
  { feature: "Team seats", pilot: "3", growth: "10", scale: "Unlimited" },
  { feature: "Proctoring & integrity monitoring", pilot: false, growth: true, scale: true },
  { feature: "Calendar & job-board syndication", pilot: false, growth: true, scale: true },
  { feature: "Analytics", pilot: "Basic", growth: "Advanced", scale: "Advanced + export" },
  { feature: "Support", pilot: "Email", growth: "Priority", scale: "Dedicated CSM" },
];

const FAQS = [
  { q: "Is there really no credit card for the trial?", a: "Correct — 30 days full access, no credit card needed." },
  { q: "What happens when voice credits run out?", a: "You'll get an 80% usage warning, then can top up instantly in one click. Your platform access never stops — only new voice calls pause until you top up." },
  { q: "How is voice usage calculated?", a: "1 credit = 1 minute of AI voice. A 15-minute pre-screen call uses about 15 credits; a 45-minute deep interview uses about 45 credits." },
  { q: "Do unused voice minutes roll over?", a: "Yes — unused monthly minutes roll over while your plan stays active." },
  { q: "Can candidates use HireMind for free?", a: "Yes, always free for candidates — this will never change." },
  { q: "Can I switch plans anytime?", a: "Yes, upgrade or downgrade anytime. No lock-in contracts on Pilot or Growth plans." },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(usd: number, currency: "USD" | "INR") {
  if (currency === "INR") {
    const inr = Math.round(usd * USD_TO_INR);
    return "₹" + inr.toLocaleString("en-IN");
  }
  return "$" + usd.toLocaleString("en-US");
}

function fmtRate(usd: number, currency: "USD" | "INR") {
  if (currency === "INR") return "₹" + Math.round(usd * USD_TO_INR) + "/min";
  return "$" + usd.toFixed(2) + "/min";
}

// Combinatorial search: minimum cost pack combination covering `overage` minutes
function cheapestTopUp(overage: number): { packs: Array<{ pack: typeof TOP_UP_PACKS[number]; qty: number }>; totalCost: number; totalMinutes: number } {
  if (overage <= 0) return { packs: [], totalCost: 0, totalMinutes: 0 };
  const large = TOP_UP_PACKS[2], medium = TOP_UP_PACKS[1], small = TOP_UP_PACKS[0];
  let best: { packs: Array<{ pack: typeof TOP_UP_PACKS[number]; qty: number }>; totalCost: number; totalMinutes: number } | null = null;

  for (let l = 0; l <= Math.ceil(overage / large.minutes); l++) {
    for (let m = 0; m <= Math.ceil(overage / medium.minutes); m++) {
      for (let s = 0; s <= Math.ceil(overage / small.minutes); s++) {
        const mins = l * large.minutes + m * medium.minutes + s * small.minutes;
        if (mins < overage) continue;
        const cost = l * large.priceUSD + m * medium.priceUSD + s * small.priceUSD;
        if (!best || cost < best.totalCost) {
          const packs = [];
          if (l > 0) packs.push({ pack: large, qty: l });
          if (m > 0) packs.push({ pack: medium, qty: m });
          if (s > 0) packs.push({ pack: small, qty: s });
          best = { packs, totalCost: cost, totalMinutes: mins };
        }
      }
    }
  }
  return best ?? { packs: [], totalCost: 0, totalMinutes: 0 };
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function CurrencyToggle({ value, onChange }: { value: "USD" | "INR"; onChange: (v: "USD" | "INR") => void }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border-subtle bg-bg-secondary p-1 text-sm">
      {(["USD", "INR"] as const).map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          className={cn(
            "rounded-full px-4 py-1.5 font-medium transition-all",
            value === c
              ? "bg-gradient-to-r from-accent-blue to-accent-violet text-white"
              : "text-text-secondary hover:text-text-primary"
          )}
        >
          {c === "USD" ? "$ USD" : "₹ INR"}
        </button>
      ))}
    </div>
  );
}

function PlanCards({ currency }: { currency: "USD" | "INR" }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3 items-start">
      {PLANS.map((plan) => (
        <div
          key={plan.id}
          className={cn(
            "relative flex flex-col rounded-2xl border bg-card p-8 transition-all",
            plan.highlighted
              ? "border-accent-blue/60 shadow-xl shadow-blue-500/20 bg-gradient-to-b from-accent-blue/10 to-transparent scale-[1.03]"
              : "border-border-subtle hover:border-accent-blue/40"
          )}
        >
          {plan.badge && (
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent-blue to-accent-violet px-4 py-1 text-xs font-semibold text-white whitespace-nowrap">
              <Sparkles className="h-3 w-3" />
              {plan.badge}
            </span>
          )}

          <h3 className="font-display text-xl font-bold text-text-primary">{plan.name}</h3>
          <p className="mt-2 text-sm text-text-secondary">{plan.subtitle}</p>

          <div className="mt-6">
            {"pricePrefix" in plan && (
              <p className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-0.5">{plan.pricePrefix}</p>
            )}
            <div className="flex items-end gap-1">
              <span className="font-display text-4xl font-bold">{fmt(plan.priceUSD, currency)}</span>
              <span className="mb-1.5 text-sm text-text-secondary">/mo</span>
            </div>
            <p className="mt-1 text-xs text-text-secondary">
              {plan.seats === Infinity ? "Unlimited seats" : `${plan.seats} seats`} · {plan.voiceMinutes.toLocaleString()} min included
            </p>
          </div>

          <ul className="mt-6 space-y-3 flex-1">
            {plan.features.map((f) => (
              <li key={f.text} className="flex items-start gap-3 text-sm">
                {f.included ? (
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                ) : (
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-text-secondary/40" />
                )}
                <span className={f.included ? "text-text-secondary" : "text-text-secondary/50"}>{f.text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            {plan.ctaStyle === "gradient" ? (
              <GradientButton className="w-full" asChild>
                <Link href={plan.href}>{plan.cta}</Link>
              </GradientButton>
            ) : (
              <Button variant="outline" className="w-full" asChild>
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function TopUpPacks({ currency }: { currency: "USD" | "INR" }) {
  return (
    <section className="bg-gradient-to-br from-[#060A12] via-[#0A0F1E] to-[#080C14] border-y border-border-subtle/60">
      <div className="container py-16 md:py-24">
        <ScrollReveal className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent-violet/30 bg-accent-violet/10 px-4 py-1.5 text-sm font-medium text-accent-violet mb-6">
            <Zap className="h-3.5 w-3.5" /> Voice top-ups
          </div>
          <h2 className="font-display text-3xl font-bold md:text-4xl">Voice credit top-ups</h2>
          <p className="mt-2 text-lg font-medium text-accent-blue">Buy more minutes, pay less per minute</p>
          <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
            Voice is the one variable cost, so it's the one thing you top up. Packs apply instantly to your
            organization's credit wallet and stack on top of your plan's monthly minutes.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TOP_UP_PACKS.map((pack, i) => (
            <ScrollReveal key={pack.name} delay={i * 0.1}>
              <div className="relative flex flex-col rounded-2xl border border-border-subtle bg-bg-secondary/60 p-7 hover:border-accent-violet/50 transition-all">
                {pack.badge && (
                  <span className="absolute -top-3 right-4 rounded-full bg-accent-violet/20 border border-accent-violet/40 px-3 py-0.5 text-xs font-semibold text-accent-violet">
                    {pack.badge}
                  </span>
                )}
                <p className="text-sm font-medium text-text-secondary">{pack.name} pack</p>
                <p className="mt-2 font-display text-3xl font-bold text-text-primary">{pack.minutes.toLocaleString()} <span className="text-lg font-normal text-text-secondary">min</span></p>
                <p className="mt-4 font-display text-2xl font-semibold">{fmt(pack.priceUSD, currency)}</p>
                <p className="mt-1 text-sm text-text-secondary">{fmtRate(pack.rateUSD, currency)}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-text-secondary">
          1 credit = 1 minute of AI voice (pre-screen or interview). Credits are shared across your whole team and never expire while subscribed.
        </p>
      </div>
    </section>
  );
}

function CostEstimator({ currency }: { currency: "USD" | "INR" }) {
  const [prescreens, setPrescreens] = useState(70);
  const [interviews, setInterviews] = useState(28);

  const totalMinutes = prescreens * 15 + interviews * 45;

  const recommendation = useMemo(() => {
    let best: { plan: typeof PLANS[number]; topUp: ReturnType<typeof cheapestTopUp>; total: number } | null = null;
    for (const plan of PLANS) {
      const overage = Math.max(0, totalMinutes - plan.voiceMinutes);
      const topUp = cheapestTopUp(overage);
      const total = plan.priceUSD + topUp.totalCost;
      if (!best || total < best.total) {
        best = { plan, topUp, total };
      }
    }
    return best!;
  }, [totalMinutes]);

  const { plan: recPlan, topUp, total } = recommendation;

  return (
    <section className="container py-16 md:py-24">
      <ScrollReveal className="text-center mb-12">
        <h2 className="font-display text-3xl font-bold md:text-4xl">Estimate your month</h2>
        <p className="mt-3 text-text-secondary">How much voice will you actually use?</p>
      </ScrollReveal>

      <div className="mx-auto max-w-5xl rounded-2xl border border-border-subtle bg-card overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Left — sliders */}
          <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-border-subtle space-y-10">
            {/* Prescreens slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-text-primary">AI phone pre-screens / month</label>
                <span className="font-display text-2xl font-bold text-accent-blue">{prescreens}</span>
              </div>
              <input
                type="range" min={0} max={400} step={5} value={prescreens}
                onChange={(e) => setPrescreens(Number(e.target.value))}
                className="w-full accent-accent-blue cursor-pointer"
              />
              <p className="mt-2 text-xs text-text-secondary">~15 minutes each · the wide top-of-funnel filter</p>
            </div>

            {/* Interviews slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-text-primary">AI interviews / month</label>
                <span className="font-display text-2xl font-bold text-accent-violet">{interviews}</span>
              </div>
              <input
                type="range" min={0} max={200} step={2} value={interviews}
                onChange={(e) => setInterviews(Number(e.target.value))}
                className="w-full accent-accent-violet cursor-pointer"
              />
              <p className="mt-2 text-xs text-text-secondary">~45 minutes each · deeper, for shortlisted candidates</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-border-subtle bg-bg-secondary p-4 text-center">
                <p className="font-display text-2xl font-bold text-text-primary">{totalMinutes.toLocaleString()}</p>
                <p className="mt-1 text-xs text-text-secondary">voice minutes / mo</p>
              </div>
              <div className="rounded-xl border border-border-subtle bg-bg-secondary p-4 text-center">
                <p className="font-display text-2xl font-bold text-text-primary">{totalMinutes.toLocaleString()}</p>
                <p className="mt-1 text-xs text-text-secondary">credits needed</p>
              </div>
            </div>
          </div>

          {/* Right — result */}
          <div className="p-8 md:p-10 bg-gradient-to-br from-accent-blue/10 via-accent-violet/10 to-transparent">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-violet mb-1">Recommended · {recPlan.name}</p>
            <p className="font-display text-4xl font-bold text-text-primary">{fmt(total, currency)}<span className="text-base font-normal text-text-secondary"> / mo</span></p>
            {currency === "USD" && (
              <p className="mt-1 text-sm text-text-secondary">≈ {fmt(total, "INR")}</p>
            )}

            <div className="mt-6 space-y-3 border-t border-dashed border-border-subtle pt-6">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">{recPlan.name} plan ({recPlan.voiceMinutes.toLocaleString()} min incl.)</span>
                <span className="font-medium">{fmt(recPlan.priceUSD, currency)}</span>
              </div>

              {topUp.packs.length > 0 ? (
                topUp.packs.map(({ pack, qty }) => (
                  <div key={pack.name} className="flex justify-between text-sm">
                    <span className="text-text-secondary">{qty} × {pack.name} top-up ({(pack.minutes * qty).toLocaleString()} min)</span>
                    <span className="font-medium">{fmt(pack.priceUSD * qty, currency)}</span>
                  </div>
                ))
              ) : (
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Top-ups needed</span>
                  <span className="font-medium text-success">None 🎉</span>
                </div>
              )}

              <div className="flex justify-between text-sm font-semibold border-t border-border-subtle pt-3 mt-3">
                <span>Total / month</span>
                <span>{fmt(total, currency)}</span>
              </div>
            </div>

            <div className="mt-6">
              <GradientButton className="w-full" asChild>
                <Link href={recPlan.href}>{recPlan.cta}</Link>
              </GradientButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparisonTable() {
  return (
    <section className="border-t border-border-subtle">
      <div className="container py-16 md:py-24">
        <ScrollReveal className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold md:text-4xl">What's included</h2>
          <p className="mt-3 text-text-secondary">Recruiter capabilities by plan</p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="overflow-x-auto rounded-2xl border border-border-subtle">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="bg-bg-secondary">
                  <th className="p-4 text-left font-semibold text-text-primary">Capability</th>
                  <th className="p-4 text-center font-semibold text-text-primary">Pilot</th>
                  <th className="p-4 text-center font-semibold text-accent-blue">Growth</th>
                  <th className="p-4 text-center font-semibold text-text-primary">Scale</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr key={row.feature} className={cn("border-t border-border-subtle", idx % 2 === 1 && "bg-bg-secondary/30")}>
                    <td className="p-4 font-medium text-text-primary">{row.feature}</td>
                    {(["pilot", "growth", "scale"] as const).map((col) => {
                      const v = row[col];
                      return (
                        <td key={col} className="p-4 text-center">
                          {typeof v === "string" ? (
                            <span className="text-text-secondary">{v}</span>
                          ) : v ? (
                            <Check className="mx-auto h-5 w-5 text-success" />
                          ) : (
                            <span className="text-text-secondary/40">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="border-t border-border-subtle">
      <div className="container py-16 md:py-24">
        <ScrollReveal className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Frequently asked <span className="gradient-text">questions</span>
          </h2>
        </ScrollReveal>
        <div className="mx-auto max-w-3xl space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = open === idx;
            return (
              <ScrollReveal key={faq.q} delay={idx * 0.05}>
                <div className="rounded-xl border border-border-subtle bg-card transition-all hover:border-accent-blue/50">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium text-text-primary">{faq.q}</span>
                    <ChevronDown className={cn("h-5 w-5 shrink-0 text-text-secondary transition-transform", isOpen && "rotate-180 text-accent-blue")} />
                  </button>
                  {isOpen && (
                    <p className="px-5 pb-5 text-sm leading-relaxed text-text-secondary">{faq.a}</p>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");

  return (
    <main className="bg-bg-primary text-text-primary">

      {/* Hero */}
      <section className="grid-bg border-b border-border-subtle">
        <div className="container py-20 text-center md:py-28">
          <ScrollReveal>
            <h1 className="font-display text-4xl font-bold leading-tight md:text-6xl">
              Pay for the platform.{" "}
              <span className="gradient-text">Top up for AI voice.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary">
              A simple plan covers your whole hiring workflow — unlimited jobs, resume AI, assessments and scoring.
              The only thing metered is AI voice minutes, because that's where the real cost lives.
            </p>
          </ScrollReveal>

          {/* Model chips */}
          <ScrollReveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {[
                "Base plan · platform + seats + all text AI",
                "Voice credits · 1 credit = 1 voice minute",
                "Top up anytime",
              ].map((chip) => (
                <span key={chip} className="rounded-full border border-border-subtle bg-bg-secondary px-4 py-1.5 text-sm text-text-secondary">
                  {chip}
                </span>
              ))}
            </div>
          </ScrollReveal>

          {/* Currency toggle */}
          <ScrollReveal delay={0.3}>
            <div className="mt-8">
              <CurrencyToggle value={currency} onChange={setCurrency} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* How it works */}
      <section className="container py-16 md:py-20">
        <ScrollReveal className="text-center mb-12">
          <h2 className="font-display text-2xl font-bold md:text-3xl">How it works</h2>
        </ScrollReveal>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Pick a base plan",
              body: "A flat monthly fee unlocks the platform — unlimited job posts, resume parsing & scoring, JD & question generation, assessments and auto-scoring. All the cent-level AI is included, uncounted.",
            },
            {
              step: "02",
              title: "Spend voice credits",
              body: "Every AI phone pre-screen and interview burns 1 credit per minute. A 15-min screen ≈ 15 credits; a 45-min interview ≈ 45 credits. Each plan ships with a monthly bundle of included minutes.",
            },
            {
              step: "03",
              title: "Top up when you need more",
              body: "Out of voice minutes? Buy a credit pack in one click — bigger packs cost less per minute. Credits never expire while your plan is active, and unused monthly minutes roll over.",
            },
          ].map((s, i) => (
            <ScrollReveal key={s.step} delay={i * 0.1}>
              <div className="rounded-2xl border border-border-subtle bg-card p-7">
                <span className="font-display text-4xl font-bold gradient-text">{s.step}</span>
                <h3 className="mt-3 font-display text-lg font-semibold text-text-primary">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{s.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Plan cards */}
      <section className="container pb-16 md:pb-24">
        <PlanCards currency={currency} />
        <p className="mt-8 text-center text-xs text-text-secondary max-w-2xl mx-auto">
          Indicative pricing for the pilot — final numbers tuned with you. Voice cost basis ≈ $0.20/min (your VAPI rate); retail includes margin, support & infrastructure.
        </p>
      </section>

      {/* Top-up packs */}
      <TopUpPacks currency={currency} />

      {/* Cost estimator */}
      <CostEstimator currency={currency} />

      {/* Comparison table */}
      <ComparisonTable />

      {/* Candidates free callout */}
      <section className="border-t border-border-subtle">
        <div className="container py-12 md:py-16">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl flex flex-col sm:flex-row items-start gap-6 rounded-2xl border border-success/30 bg-success/5 p-8">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-success/15 text-success">
                <Briefcase className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-text-primary">Job seekers stay 100% free, always</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  This is a B2B2C platform: recruiters & organizations pay, candidates don't. Keeping the candidate side free protects your applicant funnel. Optional candidate premium features (practice interviews, resume feedback, priority applications) are a future roadmap item — not part of the current plan.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection />

      {/* Final CTA */}
      <section className="border-t border-border-subtle">
        <div className="container py-20 md:py-28">
          <ScrollReveal>
            <div className="glow-blue mx-auto max-w-3xl rounded-2xl border border-border-subtle bg-bg-secondary p-10 text-center md:p-14">
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                Start hiring <span className="gradient-text">smarter today</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-text-secondary">
                Try HireMind free for 30 days. No credit card required.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <GradientButton size="lg" asChild>
                  <Link href="/signup">Start Free Trial</Link>
                </GradientButton>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
