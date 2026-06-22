import Link from "next/link";
import { Brain, Linkedin, Twitter, Github } from "lucide-react";

const columns = [
  {
    title: "Product",
    links: [
      { href: "/for-recruiters", label: "For Recruiters" },
      { href: "/for-candidates", label: "For Candidates" },
      { href: "/how-it-works", label: "How It Works" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/careers/recruitai", label: "Careers" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/how-it-works", label: "Documentation" },
      { href: "/contact", label: "Support" },
      { href: "/contact", label: "Book a Demo" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/privacy", label: "Privacy Policy" },
      { href: "/legal/terms", label: "Terms of Service" },
      { href: "/legal/cookies", label: "Cookie Policy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-secondary">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent-blue to-accent-violet">
                <Brain className="h-5 w-5 text-white" />
              </span>
              <span className="font-display text-lg font-extrabold text-text-primary">Recruit AI</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-text-secondary">
              The AI hiring pipeline that screens, interviews, and decides — so recruiters move
              faster and candidates always know where they stand.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: Linkedin, href: "https://linkedin.com" },
                { icon: Twitter, href: "https://twitter.com" },
                { icon: Github, href: "https://github.com" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-subtle text-text-secondary transition-colors hover:border-accent-blue/50 hover:text-text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-semibold text-text-primary">{col.title}</h4>
              <ul className="mt-4 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border-subtle pt-6 text-sm text-text-secondary md:flex-row">
          <p>© {new Date().getFullYear()} Recruit AI Technologies. All rights reserved.</p>
          <p>
            We use cookies to improve your experience. See our{" "}
            <Link href="/legal/cookies" className="underline hover:text-text-primary">
              Cookie Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
