"use client";

import { useState } from "react";
import { Mail, LifeBuoy, Briefcase, CheckCircle2 } from "lucide-react";
import { GradientButton } from "@/components/ui/GradientButton";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { toast } from "@/components/ui/use-toast";

const contactChannels = [
  {
    icon: Mail,
    title: "General",
    description: "Questions about HireMind or just want to say hello?",
    value: "hello@hiremind.ai",
  },
  {
    icon: LifeBuoy,
    title: "Support",
    description: "Already using HireMind and need a hand?",
    value: "support@hiremind.ai",
  },
  {
    icon: Briefcase,
    title: "Sales",
    description: "Looking for a plan for your team or enterprise?",
    value: "sales@hiremind.ai",
  },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [requestDemo, setRequestDemo] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate a request.
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. We'll get back to you within one business day.",
      });
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
      setRequestDemo(false);

      setTimeout(() => setSubmitted(false), 5000);
    }, 600);
  };

  return (
    <main className="bg-bg-primary text-text-primary">
      {/* Hero */}
      <section className="grid-bg border-b border-border-subtle">
        <div className="container py-24 md:py-32 text-center">
          <ScrollReveal>
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight">
              Let&apos;s <span className="gradient-text">talk</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-text-secondary">
              Whether you have a question, want a demo, or just want to share feedback,
              we&apos;d love to hear from you.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section>
        <div className="container py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: contact info */}
            <ScrollReveal>
              <div>
                <h2 className="font-display text-3xl font-bold">
                  Reach out <span className="gradient-text">directly</span>
                </h2>
                <p className="mt-4 text-text-secondary text-lg">
                  Prefer email? Pick the right channel below and we&apos;ll route your
                  message to the right people. We typically reply within one business day.
                </p>

                <div className="mt-10 space-y-6">
                  {contactChannels.map((channel) => {
                    const Icon = channel.icon;
                    return (
                      <div key={channel.title} className="flex gap-4">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-bg-secondary border border-border-subtle">
                          <Icon className="size-6 text-accent-blue" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-text-primary">{channel.title}</h3>
                          <p className="text-sm text-text-secondary">{channel.description}</p>
                          <a
                            href={`mailto:${channel.value}`}
                            className="text-sm text-accent-blue hover:underline"
                          >
                            {channel.value}
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>

            {/* Right: form */}
            <ScrollReveal delay={0.1}>
              <Card>
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                  <CardDescription>
                    Fill in the form and we&apos;ll be in touch shortly.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <div className="flex flex-col items-center justify-center text-center py-12">
                      <CheckCircle2 className="size-14 text-success" />
                      <h3 className="mt-4 font-display text-xl font-semibold">
                        Message sent!
                      </h3>
                      <p className="mt-2 text-text-secondary">
                        Thanks for reaching out. We&apos;ll get back to you within one
                        business day.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Priya Nair"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@company.com"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Acme Inc."
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <textarea
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Tell us how we can help..."
                          required
                          className="flex min-h-[120px] w-full rounded-md border border-input bg-bg-secondary px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          id="requestDemo"
                          type="checkbox"
                          checked={requestDemo}
                          onChange={(e) => setRequestDemo(e.target.checked)}
                          className="size-4 rounded border-border-subtle bg-bg-secondary text-accent-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                        <Label htmlFor="requestDemo" className="cursor-pointer">
                          Request a demo
                        </Label>
                      </div>

                      <GradientButton type="submit" className="w-full" disabled={submitting}>
                        {submitting ? "Sending..." : "Send message"}
                      </GradientButton>
                    </form>
                  )}
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
