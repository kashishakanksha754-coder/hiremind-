"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X, Sparkles, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { GradientButton } from "@/components/ui/GradientButton";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

type Plan = {
  name: string;
  tagline: string;
  monthly: number | null;
  yearly: number | null;
  customLabel?: string;
  features: string[];
  cta: string;
  href: string;
  highlighted?: boolean;
};

const plans: Plan[] = [
  {
    name: "Starter",
    tagline: "Everything you need to run your first AI hire.",
    monthly: 0,
    yearly: 0,
    customLabel: "Free trial for 30 days",
    features: [
      "1 active job",
      "Up to 50 candidates",
      "Basic CV screening",
      "Email support",
    ],
    cta: "Start Free Trial",
    href: "/signup",
  },
  {
    name: "Pro",
    tagline: "The full pipeline for growing teams that hire often.",
    monthly: 9999,
    yearly: 7999,
    features: [
      "Unlimited jobs",
      "AI voice interviews",
      "Skill assessments",
      "Full analytics dashboard",
      "Priority support",
    ],
    cta: "Choose Pro",
    href: "/signup",
    highlighted: true,
  },
  {
    name: "Enterprise",
    tagline: "Scale, security and control for large organizations.",
    monthly: null,
    yearly: null,
    customLabel: "Custom pricing",
    features: [
      "White-label experience",
      "Dedicated support manager",
      "API access",
      "SSO & SAML",
      "Custom SLAs",
    ],
    cta: "Contact Sales",
    href: "/contact",
  },
];

type Row = {
  feature: string;
  starter: boolean | string;
  pro: boolean | string;
  enterprise: boolean | string;
};

const comparison: Row[] = [
  { feature: "Active jobs", starter: "1", pro: "Unlimited", enterprise: "Unlimited" },
  { feature: "Candidates / month", starter: "50", pro: "Unlimited", enterprise: "Unlimited" },
  { feature: "AI CV screening", starter: true, pro: true, enterprise: true },
  { feature: "AI voice interviews", starter: false, pro: true, enterprise: true },
  { feature: "Skill assessments", starter: false, pro: true, enterprise: true },
  { feature: "Advanced analytics", starter: false, pro: true, enterprise: true },
  { feature: "API access & SSO", starter: false, pro: false, enterprise: true },
  { feature: "Dedicated support & SLA", starter: false, pro: false, enterprise: true },
];

const faqs = [
  {
    q: "How accurate is the AI screening?",
    a: "HireMind's models are tuned per role and continuously evaluated against real hiring outcomes. Every score is explainable, with the exact skills, experience and signals behind it, so recruiters always make the final call with full transparency.",
  },
  {
    q: "How is my candidate data kept private and secure?",
    a: "All data is encrypted in transit and at rest, hosted in ISO-certified data centers, and access-controlled by role. We never sell data or use your candidate information to train shared models.",
  },
  {
    q: "Does HireMind integrate with my existing tools?",
    a: "Yes. Pro and Enterprise plans connect with popular ATS platforms, calendars and email, while Enterprise adds full API access and webhooks for custom workflows.",
  },
  {
    q: "What is the experience like for candidates?",
    a: "Candidates get on-demand voice interviews, practical skill tasks and faster decisions, no scheduling friction and no résumé black holes. The process is consistent and fair for everyone.",
  },
  {
    q: "Can I switch or upgrade plans later?",
    a: "Absolutely. You can upgrade, downgrade or switch between monthly and yearly billing at any time from your dashboard. Changes are prorated and take effect immediately.",
  },
  {
    q: "Are you GDPR and DPDP compliant?",
    a: "Yes. HireMind is built to support GDPR and India's DPDP Act, including data residency options, consent management, candidate data export and right-to-erasure requests on Enterprise plans.",
  },
];

function formatINR(value: number) {
  return "₹" + value.toLocaleString("en-IN");
}

export default function PricingPage() {
  const [yearly, setYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="bg-bg-primary text-text-primary">
      {/* Hero + toggle */}
      <section className="grid-bg border-b border-border-subtle">
        <div className="container py-20 text-center md:py-28">
          <ScrollReveal>
            <h1 className="font-display text-4xl font-bold leading-tight md:text-6xl">
              Simple, <span className="gradient-text">transparent pricing</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary">
              Start free, scale when you grow. Every plan runs on the same intelligent
              hiring pipeline, no hidden fees, cancel anytime.
            </p>
          </ScrollReveal>

          {/* Pill toggle */}
          <ScrollReveal delay={0.2}>
            <div className="mt-10 inline-flex items-center gap-1 rounded-full border border-border-subtle bg-bg-secondary p-1">
              <button
                type="button"
                onClick={() => setYearly(false)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-all",
                  !yearly
                    ? "bg-gradient-to-r from-accent-blue to-accent-violet text-white"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setYearly(true)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all",
                  yearly
                    ? "bg-gradient-to-r from-accent-blue to-accent-violet text-white"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                Yearly
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-semibold",
                    yearly ? "bg-white/20 text-white" : "bg-success/15 text-success"
                  )}
                >
                  Save 20%
                </span>
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Plan cards */}
      <section className="container py-16 md:py-24">
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => {
            const price = yearly ? plan.yearly : plan.monthly;
            const isPaid = price !== null && price > 0;
            return (
              <ScrollReveal key={plan.name} delay={i * 0.1} className="h-full">
                <div
                  className={cn(
                    "relative flex h-full flex-col rounded-2xl border bg-card p-8 transition-all",
                    plan.highlighted
                      ? "border-accent-blue/60 shadow-lg shadow-blue-500/20 glow-blue bg-gradient-to-b from-accent-blue/10 to-transparent"
                      : "border-border-subtle hover:border-accent-blue/50 hover:shadow-lg hover:shadow-blue-500/10"
                  )}
                >
                  {plan.highlighted && (
                    <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-gradient-to-r from-accent-blue to-accent-violet px-4 py-1 text-xs font-semibold text-white">
                      <Sparkles className="h-3.5 w-3.5" />
                      Most popular
                    </span>
                  )}

                  <h3 className="font-display text-xl font-bold">{plan.name}</h3>
                  <p className="mt-2 min-h-[40px] text-sm text-text-secondary">
                    {plan.tagline}
                  </p>

                  <div className="mt-6">
                    {price === null ? (
                      <span className="font-display text-3xl font-bold">
                        {plan.customLabel}
                      </span>
                    ) : isPaid ? (
                      <div className="flex items-end gap-1">
                        <span className="font-display text-4xl font-bold">
                          {formatINR(price)}
                        </span>
                        <span className="mb-1 text-sm text-text-secondary">/month</span>
                      </div>
                    ) : (
                      <span className="font-display text-3xl font-bold">
                        {plan.customLabel}
                      </span>
                    )}
                    {isPaid && yearly && (
                      <p className="mt-1 text-xs text-success">
                        Billed yearly &middot; save 20%
                      </p>
                    )}
                    {isPaid && !yearly && (
                      <p className="mt-1 text-xs text-text-secondary">Billed monthly</p>
                    )}
                  </div>

                  <ul className="mt-6 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span className="text-text-secondary">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-2">
                    {plan.highlighted ? (
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
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Comparison table */}
      <section className="border-t border-border-subtle">
        <div className="container py-16 md:py-24">
          <ScrollReveal>
            <h2 className="font-display text-center text-3xl font-bold md:text-4xl">
              Compare <span className="gradient-text">every plan</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mt-10 overflow-x-auto rounded-2xl border border-border-subtle">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr className="bg-bg-secondary">
                    <th className="p-4 text-left font-semibold">Feature</th>
                    <th className="p-4 text-center font-semibold">Starter</th>
                    <th className="p-4 text-center font-semibold text-accent-blue">Pro</th>
                    <th className="p-4 text-center font-semibold">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, idx) => (
                    <tr
                      key={row.feature}
                      className={cn(
                        "border-t border-border-subtle",
                        idx % 2 === 1 && "bg-bg-secondary/40"
                      )}
                    >
                      <td className="p-4 text-left font-medium">{row.feature}</td>
                      {(["starter", "pro", "enterprise"] as const).map((col) => {
                        const v = row[col];
                        return (
                          <td key={col} className="p-4 text-center">
                            {typeof v === "string" ? (
                              <span className="text-text-secondary">{v}</span>
                            ) : v ? (
                              <Check className="mx-auto h-5 w-5 text-success" />
                            ) : (
                              <X className="mx-auto h-5 w-5 text-text-secondary/40" />
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

      {/* FAQ */}
      <section className="border-t border-border-subtle">
        <div className="container py-16 md:py-24">
          <ScrollReveal>
            <h2 className="font-display text-center text-3xl font-bold md:text-4xl">
              Frequently asked <span className="gradient-text">questions</span>
            </h2>
          </ScrollReveal>

          <div className="mx-auto mt-10 max-w-3xl space-y-4">
            {faqs.map((faq, idx) => {
              const open = openFaq === idx;
              return (
                <ScrollReveal key={faq.q} delay={idx * 0.05}>
                  <div className="rounded-xl border border-border-subtle bg-card transition-all hover:border-accent-blue/50">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? null : idx)}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left"
                      aria-expanded={open}
                    >
                      <span className="font-medium">{faq.q}</span>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 shrink-0 text-text-secondary transition-transform",
                          open && "rotate-180 text-accent-blue"
                        )}
                      />
                    </button>
                    {open && (
                      <p className="px-5 pb-5 text-sm leading-relaxed text-text-secondary">
                        {faq.a}
                      </p>
                    )}
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
                Start hiring <span className="gradient-text">smarter today</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-text-secondary">
                Try HireMind free for 30 days. No credit card required, set up your
                first AI pipeline in minutes.
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
