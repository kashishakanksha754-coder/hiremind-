import type { Metadata } from "next";
import "./globals.css";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { Toaster } from "@/components/ui/toaster";
import SessionProviderWrapper from "@/components/providers/SessionProviderWrapper";

export const metadata: Metadata = {
  title: {
    default: "HireMind — AI-Powered Applicant Tracking System",
    template: "%s — HireMind",
  },
  description:
    "HireMind is the AI hiring pipeline that screens CVs, runs voice interviews, scores assessments, and decides — so recruiters hire 10x faster and candidates always know where they stand.",
  keywords: ["ATS", "AI recruiting", "applicant tracking", "AI interviews", "hiring software"],
  openGraph: {
    title: "HireMind — AI-Powered Applicant Tracking System",
    description: "Hire 10x faster with AI that screens, interviews, and decides.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-bg-primary text-text-primary antialiased">
        <SessionProviderWrapper>
          <SiteChrome>{children}</SiteChrome>
        </SessionProviderWrapper>
        <Toaster />
      </body>
    </html>
  );
}
