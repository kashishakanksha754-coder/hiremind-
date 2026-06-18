import Link from "next/link";
import { Zap, Scale, Eye, ShieldCheck } from "lucide-react";
import { GradientButton } from "@/components/ui/GradientButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const team = [
  {
    initials: "AS",
    name: "Aarav Sharma",
    role: "Founder & CEO",
    bio: "Ex-recruiter who spent a decade watching great people slip through broken pipelines.",
  },
  {
    initials: "PN",
    name: "Priya Nair",
    role: "CTO",
    bio: "Builds the systems that read thousands of CVs without ever getting tired or biased.",
  },
  {
    initials: "RV",
    name: "Rohan Verma",
    role: "Head of AI",
    bio: "Leads the models that score skills, not keywords, and explain every decision.",
  },
  {
    initials: "MI",
    name: "Meera Iyer",
    role: "Head of Product",
    bio: "Obsessed with making hiring feel human for candidates and recruiters alike.",
  },
];

const values = [
  {
    icon: Zap,
    title: "Speed",
    description:
      "Shortlists in minutes, not weeks. We compress the busywork so teams can spend time on real conversations.",
  },
  {
    icon: Scale,
    title: "Fairness",
    description:
      "Every candidate is measured on skills and evidence. We actively design against bias at every step.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description:
      "No black boxes. Every score comes with the reasoning behind it, so decisions can be trusted and defended.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy",
    description:
      "Candidate data is treated with care, encrypted in transit and at rest, and never sold. Ever.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-bg-primary text-text-primary">
      {/* Hero */}
      <section className="grid-bg border-b border-border-subtle">
        <div className="container py-24 md:py-32 text-center">
          <ScrollReveal>
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight">
              Making hiring <span className="gradient-text">fair, fast, and human</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-text-secondary">
              HireMind is the AI hiring co-pilot built for teams who believe the right
              person should never be lost in a pile of resumes.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Story */}
      <section className="border-b border-border-subtle">
        <div className="container py-20 md:py-28 max-w-3xl">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Why we built <span className="gradient-text">HireMind</span>
            </h2>
          </ScrollReveal>
          <div className="mt-8 space-y-6 text-text-secondary text-lg leading-relaxed">
            <ScrollReveal delay={0.05}>
              <p>
                Hiring is broken on both ends. Recruiters drown in hundreds of CVs for a
                single role, skimming each one for a few seconds before moving on.
                Brilliant candidates get filtered out by a missing keyword, while others
                slip through simply because they applied first.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p>
                Candidates feel it too. They pour hours into applications, hit submit, and
                hear nothing back. Ghosting has become the norm, not the exception, and it
                erodes trust in the entire process.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p>
                We started HireMind because we knew AI could fix this, not by replacing
                human judgment, but by clearing away the noise. Our models read every
                application carefully, score people on real skills and evidence, and
                surface the strongest matches with transparent reasoning. Recruiters get
                their time back. Candidates get a fair shot and a real answer.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p>
                That is the future we are building: hiring that is fast enough to keep up,
                fair enough to trust, and human enough to feel right.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="border-b border-border-subtle">
        <div className="container py-20 md:py-28">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                Meet the <span className="gradient-text">team</span>
              </h2>
              <p className="mt-4 text-text-secondary text-lg">
                A small, focused team obsessed with making hiring work better for everyone.
              </p>
            </div>
          </ScrollReveal>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.1}>
                <Card className="h-full text-center hover:border-accent-blue/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all">
                  <CardHeader className="items-center">
                    <Avatar className="size-16 mx-auto">
                      <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="mt-4">{member.name}</CardTitle>
                    <CardDescription className="text-accent-blue">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-text-secondary">{member.bio}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-b border-border-subtle">
        <div className="container py-20 md:py-28">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                What we <span className="gradient-text">value</span>
              </h2>
              <p className="mt-4 text-text-secondary text-lg">
                The principles behind every decision we make and every line of code we ship.
              </p>
            </div>
          </ScrollReveal>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <ScrollReveal key={value.title} delay={i * 0.1}>
                  <Card className="h-full hover:border-accent-blue/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all">
                    <CardHeader>
                      <div className="flex size-12 items-center justify-center rounded-lg bg-bg-secondary border border-border-subtle">
                        <Icon className="size-6 text-accent-blue" />
                      </div>
                      <CardTitle className="mt-4">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-text-secondary">{value.description}</p>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section>
        <div className="container py-24 md:py-32 text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-5xl font-bold">
              Ready to hire <span className="gradient-text">smarter</span>?
            </h2>
            <p className="mt-6 max-w-xl mx-auto text-lg text-text-secondary">
              Join the teams using HireMind to find the right people faster, and treat
              every candidate the way they deserve.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <GradientButton size="lg">Get started free</GradientButton>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Talk to us
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
