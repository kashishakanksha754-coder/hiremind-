"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Brain, Eye, EyeOff, Loader2, Users, UserCircle2, ArrowLeft, Check,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GradientButton } from "@/components/ui/GradientButton";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { setMockUser } from "@/lib/mock-auth";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
type Role = "recruiter" | "candidate";

const ROLES = [
  { value: "recruiter" as Role, title: "I'm a Recruiter", description: "Screen candidates, run AI interviews, and hire faster.", icon: Users },
  { value: "candidate" as Role, title: "I'm a Candidate", description: "Practice interviews and showcase your skills to top teams.", icon: UserCircle2 },
];

const HEARD_OPTIONS = ["LinkedIn", "Twitter/X", "Google Search", "Referral", "Other"];

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z" />
    </svg>
  );
}

function passwordStrength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const labels = ["Too weak", "Weak", "Fair", "Good", "Strong"];
  const colors = ["bg-danger", "bg-danger", "bg-warning", "bg-accent-blue", "bg-success"];
  return { score, label: labels[score], color: colors[score] };
}

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [role, setRole] = useState<Role | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [company, setCompany] = useState("");
  const [heardFrom, setHeardFrom] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const strength = useMemo(() => passwordStrength(password), [password]);

  function handleContinue() {
    if (!role) {
      toast({ title: "Select a role", description: "Tell us how you'll be using Recruit AI.", variant: "destructive" });
      return;
    }
    setStep(2);
  }

  function handleGoogleSignup() {
    setMockUser({ type: "recruiter", name: "Demo User", email: "google@demo.com", company: "Demo Corp" });
    router.push("/dashboard");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName.trim()) {
      toast({ title: "Name required", description: "Please enter your full name.", variant: "destructive" });
      return;
    }
    if (!EMAIL_RE.test(email)) {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    if (password.length < 8) {
      toast({ title: "Weak password", description: "Use at least 8 characters.", variant: "destructive" });
      return;
    }
    if (role === "recruiter" && !company.trim()) {
      toast({ title: "Company required", description: "Please enter your company name.", variant: "destructive" });
      return;
    }
    if (!agreed) {
      toast({ title: "Accept the terms", description: "Please agree to the Terms and Privacy Policy to continue.", variant: "destructive" });
      return;
    }

    setLoading(true);
    await new Promise(r => setTimeout(r, 900)); // simulate network

    setMockUser({
      type: role!,
      name: fullName.trim(),
      email,
      ...(role === "recruiter" ? { company: company.trim() } : {}),
    });
    setLoading(false);

    toast({ title: "Account created!", description: `Welcome to Recruit AI, ${fullName.split(" ")[0]}!` });
    router.push(role === "recruiter" ? "/dashboard" : "/portal");
  }

  return (
    <div className="grid-bg relative flex min-h-screen items-center justify-center bg-bg-primary px-4 py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(56,120,255,0.12),transparent)]" />

      <div className="relative w-full max-w-lg">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <Brain className="h-7 w-7 text-accent-blue" />
          <span className="font-display text-2xl font-bold gradient-text">Recruit AI</span>
        </Link>

        <div className="rounded-xl border border-border-subtle bg-card p-8 shadow-xl">
          {step === 1 ? (
            <>
              <div className="mb-6 text-center">
                <h1 className="font-display text-2xl font-semibold text-text-primary">Create your account</h1>
                <p className="mt-1 text-sm text-text-secondary">First, tell us how you'll use Recruit AI.</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {ROLES.map(r => {
                  const Icon = r.icon;
                  const selected = role === r.value;
                  return (
                    <button key={r.value} type="button" onClick={() => setRole(r.value)}
                      className={cn(
                        "group relative flex flex-col items-start gap-3 rounded-xl border bg-bg-secondary/40 p-5 text-left transition-all hover:border-accent-blue/60 hover:bg-bg-secondary",
                        selected ? "border-accent-blue ring-2 ring-accent-blue/40" : "border-border-subtle"
                      )}>
                      {selected && (
                        <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-accent-blue text-white">
                          <Check className="h-3 w-3" />
                        </span>
                      )}
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-blue/15 text-accent-blue">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-display font-semibold text-text-primary">{r.title}</span>
                      <span className="text-sm text-text-secondary">{r.description}</span>
                    </button>
                  );
                })}
              </div>

              <GradientButton type="button" className="mt-6 w-full" onClick={handleContinue}>
                Continue
              </GradientButton>

              <div className="my-5 flex items-center gap-3">
                <span className="h-px flex-1 bg-border-subtle" />
                <span className="text-xs uppercase tracking-wider text-text-secondary">or</span>
                <span className="h-px flex-1 bg-border-subtle" />
              </div>

              <Button type="button" variant="outline" className="w-full" onClick={handleGoogleSignup}>
                <GoogleIcon /> Continue with Google
              </Button>
            </>
          ) : (
            <>
              <button type="button" onClick={() => setStep(1)}
                className="mb-4 inline-flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-colors">
                <ArrowLeft className="h-4 w-4" /> Back
              </button>

              <div className="mb-6">
                <h1 className="font-display text-2xl font-semibold text-text-primary">
                  {role === "recruiter" ? "Set up your recruiter account" : "Set up your candidate account"}
                </h1>
                <p className="mt-1 text-sm text-text-secondary">Just a few details to get you started.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full name</Label>
                  <Input id="fullName" type="text" autoComplete="name" placeholder="Jane Doe" value={fullName} onChange={e => setFullName(e.target.value)} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" autoComplete="email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input id="password" type={showPassword ? "text" : "password"} autoComplete="new-password" placeholder="At least 8 characters" value={password} onChange={e => setPassword(e.target.value)} className="pr-10" required />
                    <button type="button" onClick={() => setShowPassword(s => !s)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-text-secondary hover:text-text-primary">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {password.length > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="flex h-1.5 flex-1 gap-1">
                        {[0, 1, 2, 3].map(i => (
                          <span key={i} className={cn("h-full flex-1 rounded-full transition-colors", i < strength.score ? strength.color : "bg-border-subtle")} />
                        ))}
                      </div>
                      <span className="text-xs text-text-secondary">{strength.label}</span>
                    </div>
                  )}
                </div>

                {role === "recruiter" && (
                  <div className="space-y-2">
                    <Label htmlFor="company">Company name</Label>
                    <Input id="company" type="text" autoComplete="organization" placeholder="Acme Inc." value={company} onChange={e => setCompany(e.target.value)} required />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="heardFrom">
                    How did you hear about us? <span className="font-normal text-text-secondary">(optional)</span>
                  </Label>
                  <select id="heardFrom" value={heardFrom} onChange={e => setHeardFrom(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-bg-secondary px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option value="">Select an option</option>
                    {HEARD_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                <label className="flex cursor-pointer items-start gap-2 text-sm text-text-secondary">
                  <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-border-subtle bg-bg-secondary accent-accent-blue" />
                  <span>
                    I agree to the{" "}
                    <Link href="/legal/terms" className="text-accent-blue hover:underline">Terms of Service</Link>{" "}
                    and{" "}
                    <Link href="/legal/privacy" className="text-accent-blue hover:underline">Privacy Policy</Link>.
                  </span>
                </label>

                <GradientButton type="submit" className="w-full" disabled={loading}>
                  {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating account…</> : "Create account"}
                </GradientButton>

                <div className="flex items-center gap-3">
                  <span className="h-px flex-1 bg-border-subtle" />
                  <span className="text-xs uppercase tracking-wider text-text-secondary">or</span>
                  <span className="h-px flex-1 bg-border-subtle" />
                </div>

                <Button type="button" variant="outline" className="w-full" onClick={handleGoogleSignup} disabled={loading}>
                  <GoogleIcon /> Sign up with Google
                </Button>
              </form>
            </>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-text-secondary">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-accent-blue hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
