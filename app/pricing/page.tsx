"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Check, X, Sparkles, Zap } from "lucide-react";
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
      { text: "AI voice & video interviews", included: true },
      { text: "400 voice & video minutes included", included: true },
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
      { text: "AI voice & video interviews", included: true },
      { text: "1,500 voice & video minutes included", included: true },
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
      { text: "AI voice & video interviews", included: true },
      { text: "4,000 voice & video minutes included", included: true },
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
            <Zap className="h-3.5 w-3.5" /> Voice & video top-ups
          </div>
          <h2 className="font-display text-3xl font-bold md:text-4xl">Voice & video credit top-ups</h2>
          <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
            Need more AI conversation time? Top up instantly — packs of 250, 1,000, or 5,000 minutes, with bigger packs costing less per minute.
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
          1 credit = 1 minute of AI voice or video. Credits are shared across your whole team and never expire while subscribed.
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
        <p className="mt-3 text-text-secondary">How much AI conversation time will you actually use?</p>
      </ScrollReveal>

      <div className="mx-auto max-w-5xl rounded-2xl border border-border-subtle bg-card overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Left — sliders */}
          <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-border-subtle space-y-10">
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

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-text-primary">AI video interviews / month</label>
                <span className="font-display text-2xl font-bold text-accent-violet">{interviews}</span>
              </div>
              <input
                type="range" min={0} max={200} step={2} value={interviews}
                onChange={(e) => setInterviews(Number(e.target.value))}
                className="w-full accent-accent-violet cursor-pointer"
              />
              <p className="mt-2 text-xs text-text-secondary">~45 minutes each · live video with Aria, for shortlisted candidates</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-border-subtle bg-bg-secondary p-4 text-center">
                <p className="font-display text-2xl font-bold text-text-primary">{totalMinutes.toLocaleString()}</p>
                <p className="mt-1 text-xs text-text-secondary">voice & video minutes / mo</p>
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
              One plan for the platform.{" "}
              <span className="gradient-text">Pay only for the AI conversations you actually have.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary">
              Everything you need to run hiring — job posts, resume screening, assessments — is included
              in your plan, covering an unlimited number of open roles. The only thing metered is AI voice
              and video time, billed by the minute, because that's the one cost that actually grows with
              how much you hire.
            </p>
          </ScrollReveal>

          {/* Model chips */}
          <ScrollReveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {[
                "Your plan · the full platform, unlimited jobs",
                "Voice & video credits · 1 credit = 1 minute of AI conversation",
                "Top up anytime · no waiting, no contracts to change",
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

      {/* Plan cards */}
      <section className="container py-16 md:py-24">
        <PlanCards currency={currency} />
        <p className="mt-8 text-center text-xs text-text-secondary max-w-2xl mx-auto">
          Indicative pricing for the pilot — final numbers tuned with you. Voice & video cost basis ≈ $0.20/min (your VAPI rate); retail includes margin, support & infrastructure.
        </p>
      </section>

      {/* Top-up packs */}
      <TopUpPacks currency={currency} />

      {/* Cost estimator */}
      <CostEstimator currency={currency} />

      {/* Closing CTA */}
      <section className="border-t border-border-subtle">
        <div className="container py-16 text-center">
          <ScrollReveal>
            <p className="text-text-secondary">
              Have questions about which plan fits?{" "}
              <Link href="/contact" className="font-medium text-accent-blue hover:underline">
                Talk to us →
              </Link>
            </p>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
