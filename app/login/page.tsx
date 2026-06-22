"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Brain } from "lucide-react";
import { GradientButton } from "@/components/ui/GradientButton";
import { Button } from "@/components/ui/button";
import { setMockUser, mockRecruiterUser, mockCandidateUser } from "@/lib/mock-auth";

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

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "";

  function loginAsRecruiter() {
    setMockUser(mockRecruiterUser);
    router.push(callbackUrl || "/dashboard");
  }

  function loginAsCandidate() {
    setMockUser(mockCandidateUser);
    router.push(callbackUrl || "/portal");
  }

  return (
    <div className="grid-bg relative flex min-h-screen items-center justify-center bg-bg-primary px-4 py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(56,120,255,0.12),transparent)]" />

      <div className="relative w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <Brain className="h-7 w-7 text-accent-blue" />
          <span className="font-display text-2xl font-bold gradient-text">Recruit AI</span>
        </Link>

        <div className="rounded-xl border border-border-subtle bg-card p-8 shadow-xl">
          <div className="mb-6 text-center">
            <h1 className="font-display text-2xl font-semibold text-text-primary">Welcome back</h1>
            <p className="mt-1 text-sm text-text-secondary">Choose a demo account to explore Recruit AI.</p>
          </div>

          <div className="space-y-3">
            <GradientButton className="w-full" onClick={loginAsRecruiter}>
              Try Recruiter Demo
            </GradientButton>

            <Button variant="outline" className="w-full" onClick={loginAsCandidate}>
              Try Candidate Demo
            </Button>

            <div className="my-4 flex items-center gap-3">
              <span className="h-px flex-1 bg-border-subtle" />
              <span className="text-xs uppercase tracking-wider text-text-secondary">or</span>
              <span className="h-px flex-1 bg-border-subtle" />
            </div>

            <Button type="button" variant="outline" className="w-full" onClick={loginAsRecruiter}>
              <GoogleIcon /> Continue with Google
            </Button>
          </div>

          <div className="mt-6 rounded-lg border border-border-subtle bg-bg-secondary/50 p-4 text-sm text-text-secondary">
            <p className="font-medium text-text-primary">Prototype mode</p>
            <p className="mt-1 text-xs">This is a frontend prototype. All data is mocked — no real accounts or backend required.</p>
          </div>
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
