"use client";

import { useEffect, useRef, useState } from "react";
import {
  Mic,
  Video,
  Camera,
  CheckCircle2,
  PhoneOff,
  Loader2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/ui/GradientButton";
import { Card, CardContent } from "@/components/ui/card";

type Phase = "checklist" | "live" | "complete";

interface TranscriptLine {
  id: number;
  speaker: "aria" | "you";
  text: string;
}

const SCRIPT: Omit<TranscriptLine, "id">[] = [
  { speaker: "aria", text: "Hi Rohan! I'm Aria. Thanks for joining. Ready to begin?" },
  { speaker: "you", text: "Yes, I'm ready." },
  { speaker: "aria", text: "Great. Tell me about a challenging project you led recently." },
  { speaker: "you", text: "I led the migration of our payments dashboard to Next.js…" },
  { speaker: "aria", text: "Interesting. How did you handle the performance regressions?" },
  { speaker: "you", text: "We profiled render paths and introduced route-level code splitting." },
  { speaker: "aria", text: "Nice. And how did you measure the impact on users?" },
  { speaker: "you", text: "We tracked Core Web Vitals and saw LCP drop by 40%." },
];

function formatTime(s: number) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

export function InterviewRoom({ candidateName = "Rohan" }: { candidateName?: string }) {
  const [phase, setPhase] = useState<Phase>("checklist");
  const [micOk, setMicOk] = useState(false);
  const [camOk, setCamOk] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [transcript, setTranscript] = useState<TranscriptLine[]>([]);
  const [ariaSpeaking, setAriaSpeaking] = useState(true);
  const scriptIdx = useRef(0);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  // Timer
  useEffect(() => {
    if (phase !== "live") return;
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, [phase]);

  // Transcript + status cycling
  useEffect(() => {
    if (phase !== "live") return;
    const t = setInterval(() => {
      const next = SCRIPT[scriptIdx.current];
      if (next) {
        setTranscript((prev) => [...prev, { ...next, id: scriptIdx.current }]);
        setAriaSpeaking(next.speaker === "you"); // after candidate, Aria thinks/speaks
        scriptIdx.current += 1;
      } else {
        setAriaSpeaking((s) => !s);
      }
    }, 3500);
    return () => clearInterval(t);
  }, [phase]);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript]);

  // ---------------- Checklist ----------------
  if (phase === "checklist") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-primary p-4">
        <Card className="w-full max-w-lg">
          <CardContent className="space-y-6 p-8">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-blue to-accent-violet">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
              <h1 className="font-display text-2xl font-bold">AI Interview with Aria</h1>
              <p className="mt-1 text-text-secondary">
                A quick device check before we start, {candidateName}.
              </p>
            </div>

            <div className="space-y-3">
              <CheckItem
                icon={Mic}
                label="Microphone"
                desc="We need to hear your responses clearly."
                checked={micOk}
                onToggle={() => setMicOk((v) => !v)}
              />
              <CheckItem
                icon={Camera}
                label="Camera"
                desc="Enable your camera for the session."
                checked={camOk}
                onToggle={() => setCamOk((v) => !v)}
              />
            </div>

            <div className="rounded-lg border border-border-subtle bg-bg-secondary p-4 text-sm text-text-secondary">
              <p className="mb-2 font-medium text-text-primary">Before you begin</p>
              <ul className="list-inside list-disc space-y-1">
                <li>Find a quiet, well-lit space.</li>
                <li>The interview takes about 20 minutes.</li>
                <li>Speak naturally — Aria will adapt to your pace.</li>
              </ul>
            </div>

            <GradientButton
              className="w-full"
              disabled={!micOk || !camOk}
              onClick={() => setPhase("live")}
            >
              Start interview
            </GradientButton>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ---------------- Complete ----------------
  if (phase === "complete") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-primary p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="space-y-4 p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15">
              <CheckCircle2 className="h-9 w-9 text-success" />
            </div>
            <h1 className="font-display text-2xl font-bold">Thanks, {candidateName}!</h1>
            <p className="text-text-secondary">
              Your responses are being analysed. You'll hear from the team shortly with
              your results.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-text-secondary">
              <Loader2 className="h-4 w-4 animate-spin" /> Analysing transcript…
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ---------------- Live ----------------
  return (
    <div className="flex min-h-screen flex-col bg-bg-primary">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-border-subtle px-4 py-3 lg:px-8">
        <div className="flex items-center gap-2 font-display font-semibold">
          <Sparkles className="h-5 w-5 text-accent-violet" /> Interview with Aria
        </div>
        <div className="rounded-full bg-bg-secondary px-3 py-1 font-mono text-sm tabular-nums">
          {formatTime(elapsed)}
        </div>
      </div>

      <div className="grid flex-1 gap-6 p-4 lg:grid-cols-[1fr_380px] lg:p-8">
        {/* Stage */}
        <div className="relative flex flex-col items-center justify-center gap-8 rounded-2xl border border-border-subtle bg-bg-secondary/30 p-8">
          <div className="relative">
            <div
              className={cn(
                "flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-accent-blue to-accent-violet",
                ariaSpeaking && "animate-pulseGlow"
              )}
            >
              <Sparkles className="h-16 w-16 text-white/90" />
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-bg-secondary px-4 py-2 text-sm">
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                ariaSpeaking ? "bg-accent-violet" : "bg-success animate-pulse"
              )}
            />
            {ariaSpeaking ? "Aria is speaking..." : "Aria is listening..."}
          </div>

          {/* Self view */}
          <div className="absolute bottom-4 right-4 flex h-28 w-40 items-center justify-center overflow-hidden rounded-lg border border-border-subtle bg-black">
            <div className="flex flex-col items-center gap-1 text-text-secondary">
              <Video className="h-5 w-5" />
              <span className="text-[10px]">{candidateName} (You)</span>
            </div>
          </div>
        </div>

        {/* Transcript */}
        <div className="flex flex-col rounded-2xl border border-border-subtle bg-card">
          <div className="border-b border-border-subtle px-4 py-3 text-sm font-medium">
            Live transcript
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4 lg:max-h-[calc(100vh-16rem)]">
            {transcript.map((line) => (
              <div key={line.id} className="space-y-0.5">
                <span
                  className={cn(
                    "text-xs font-semibold",
                    line.speaker === "aria" ? "text-accent-violet" : "text-accent-blue"
                  )}
                >
                  {line.speaker === "aria" ? "Aria" : candidateName}
                </span>
                <p className="text-sm text-text-secondary">{line.text}</p>
              </div>
            ))}
            {transcript.length === 0 && (
              <p className="text-sm text-text-secondary">Transcript will appear here…</p>
            )}
            <div ref={transcriptEndRef} />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 border-t border-border-subtle px-4 py-4">
        <Button variant="outline" size="icon" className="rounded-full">
          <Mic className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full">
          <Video className="h-5 w-5" />
        </Button>
        <Button
          variant="destructive"
          className="gap-2 rounded-full px-6"
          onClick={() => setPhase("complete")}
        >
          <PhoneOff className="h-5 w-5" /> End interview
        </Button>
      </div>
    </div>
  );
}

function CheckItem({
  icon: Icon,
  label,
  desc,
  checked,
  onToggle,
}: {
  icon: typeof Mic;
  label: string;
  desc: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border-subtle bg-bg-secondary p-3">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg",
            checked ? "bg-success/15 text-success" : "bg-card text-text-secondary"
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-medium">{label}</p>
          <p className="text-xs text-text-secondary">{desc}</p>
        </div>
      </div>
      <button
        onClick={onToggle}
        className={cn(
          "relative h-6 w-11 rounded-full transition-colors",
          checked ? "bg-success" : "bg-border-subtle"
        )}
        aria-label={`Toggle ${label}`}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform",
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          )}
        />
      </button>
    </div>
  );
}
