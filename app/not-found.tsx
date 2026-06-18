import Link from "next/link";
import { Brain } from "lucide-react";
import { GradientButton } from "@/components/ui/GradientButton";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-blue to-accent-violet">
        <Brain className="h-7 w-7 text-white" />
      </span>
      <h1 className="mt-6 font-display text-6xl font-extrabold gradient-text">404</h1>
      <p className="mt-3 text-lg font-semibold text-text-primary">This page took a different path.</p>
      <p className="mt-2 max-w-md text-text-secondary">
        The page you are looking for moved, was archived, or never existed. Let&apos;s get you back to
        hiring.
      </p>
      <div className="mt-8 flex gap-3">
        <GradientButton asChild>
          <Link href="/">Back to Home</Link>
        </GradientButton>
        <Button variant="outline" asChild>
          <Link href="/contact">Contact Support</Link>
        </Button>
      </div>
    </div>
  );
}
