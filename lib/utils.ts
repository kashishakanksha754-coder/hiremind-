import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scoreColor(score: number): string {
  if (score >= 80) return "text-success";
  if (score >= 60) return "text-accent-blue";
  if (score >= 40) return "text-warning";
  return "text-danger";
}

export function scoreBadge(score: number): string {
  if (score >= 80) return "bg-success/15 text-success border-success/30";
  if (score >= 60) return "bg-accent-blue/15 text-accent-blue border-accent-blue/30";
  if (score >= 40) return "bg-warning/15 text-warning border-warning/30";
  return "bg-danger/15 text-danger border-danger/30";
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
