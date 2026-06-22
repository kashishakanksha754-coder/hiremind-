"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/ui/GradientButton";

const STORAGE_KEY = "recruitai_cookie_consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  const decide = (choice: "accept" | "reject") => {
    localStorage.setItem(STORAGE_KEY, choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4">
      <div className="container flex flex-col items-start gap-4 rounded-xl border border-border-subtle bg-card/95 p-4 shadow-2xl backdrop-blur-xl md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-accent-violet" />
          <p className="text-sm text-text-secondary">
            We use cookies to keep Recruit AI secure, remember your preferences, and understand how the
            product is used. Read our{" "}
            <Link href="/legal/cookies" className="underline hover:text-text-primary">
              Cookie Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" size="sm" onClick={() => decide("reject")}>
            Reject
          </Button>
          <GradientButton size="sm" onClick={() => decide("accept")}>
            Accept
          </GradientButton>
        </div>
      </div>
    </div>
  );
}
