"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Brain, Eye, EyeOff, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GradientButton } from "@/components/ui/GradientButton";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Demo accounts — any email/password works; these show in the hint
const DEMO_ACCOUNTS = [
  { email: "recruiter@demo.com", password: "demo1234", role: "recruiter", name: "Riya Kapoor" },
  { email: "candidate@demo.com", password: "demo1234", role: "candidate", name: "Priya Sharma" },
];

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

function mockLogin(email: string, password: string): { role: string; name: string } | null {
  if (!email || !password) return null;
  // Check demo accounts first
  const demo = DEMO_ACCOUNTS.find(a => a.email === email && a.password === password);
  if (demo) return { role: demo.role, name: demo.name };
  // Check accounts created via signup (stored in localStorage)
  try {
    const accounts = JSON.parse(localStorage.getItem("hiremind_accounts") || "[]");
    const match = accounts.find((a: any) => a.email === email && a.password === password);
    if (match) return { role: match.role, name: match.name };
  } catch {}
  return null;
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    if (!password) {
      toast({ title: "Password required", description: "Please enter your password.", variant: "destructive" });
      return;
    }

    setLoading(true);
    await new Promise(r => setTimeout(r, 800)); // simulate network

    const user = mockLogin(email, password);
    if (!user) {
      setLoading(false);
      toast({ title: "Invalid credentials", description: "Email or password is incorrect. Use the demo accounts below or sign up first.", variant: "destructive" });
      return;
    }

    // Store session
    localStorage.setItem("hiremind_user", JSON.stringify({ email, name: user.name, role: user.role }));

    const destination = callbackUrl || (user.role === "recruiter" ? "/dashboard" : "/portal");
    router.push(destination);
  }

  function handleDemo(role: "recruiter" | "candidate") {
    const acc = DEMO_ACCOUNTS.find(a => a.role === role)!;
    setEmail(acc.email);
    setPassword(acc.password);
  }

  return (
    <div className="grid-bg relative flex min-h-screen items-center justify-center bg-bg-primary px-4 py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(56,120,255,0.12),transparent)]" />

      <div className="relative w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <Brain className="h-7 w-7 text-accent-blue" />
          <span className="font-display text-2xl font-bold gradient-text">HireMind</span>
        </Link>

        <div className="rounded-xl border border-border-subtle bg-card p-8 shadow-xl">
          <div className="mb-6 text-center">
            <h1 className="font-display text-2xl font-semibold text-text-primary">Welcome back</h1>
            <p className="mt-1 text-sm text-text-secondary">Sign in to continue screening smarter.</p>
          </div>

          {/* Demo account quick-fill */}
          <div className="mb-5 rounded-lg border border-accent-blue/20 bg-accent-blue/5 p-3">
            <p className="mb-2 text-xs font-semibold text-accent-blue uppercase tracking-wide">Demo accounts</p>
            <div className="flex gap-2">
              <button onClick={() => handleDemo("recruiter")} className="flex-1 rounded-md bg-accent-blue/10 border border-accent-blue/30 px-3 py-1.5 text-xs font-medium text-accent-blue hover:bg-accent-blue/20 transition-colors">
                Recruiter demo
              </button>
              <button onClick={() => handleDemo("candidate")} className="flex-1 rounded-md bg-accent-violet/10 border border-accent-violet/30 px-3 py-1.5 text-xs font-medium text-accent-violet hover:bg-accent-violet/20 transition-colors">
                Candidate demo
              </button>
            </div>
          </div>

          <Button type="button" variant="outline" className="w-full" onClick={() => {
            // Mock Google login as recruiter
            localStorage.setItem("hiremind_user", JSON.stringify({ email: "google@demo.com", name: "Demo User", role: "recruiter" }));
            router.push("/dashboard");
          }}>
            <GoogleIcon /> Continue with Google
          </Button>

          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-border-subtle" />
            <span className="text-xs uppercase tracking-wider text-text-secondary">or</span>
            <span className="h-px flex-1 bg-border-subtle" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" autoComplete="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-xs text-accent-blue hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="pr-10" required />
                <button type="button" onClick={() => setShowPassword(s => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-text-secondary hover:text-text-primary">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <GradientButton type="submit" className="w-full" disabled={loading}>
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Signing in…</> : "Sign in"}
            </GradientButton>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-text-secondary">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-accent-blue hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080C14]" />}>
      <LoginForm />
    </Suspense>
  );
}
