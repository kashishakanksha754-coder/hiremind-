"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getMockUser, clearMockUser } from "@/lib/mock-auth";
import {
  Home,
  Search,
  FileText,
  User,
  Bell,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const NAV = [
  { label: "Home", href: "/portal", icon: Home },
  { label: "Find Jobs", href: "/portal/jobs", icon: Search },
  { label: "My Applications", href: "/portal/applications", icon: FileText },
  { label: "Profile", href: "/portal/profile", icon: User },
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState<ReturnType<typeof getMockUser>>(null);

  useEffect(() => {
    const u = getMockUser();
    if (!u || u.type !== "candidate") {
      router.push("/login");
      return;
    }
    setUser(u);
  }, [router]);

  if (!user) return <div className="min-h-screen bg-bg-primary" />;

  const isActive = (href: string) =>
    href === "/portal" ? pathname === "/portal" : pathname.startsWith(href);

  const NavLinks = ({ onNavigate }: { onNavigate?: () => void }) => (
    <nav className="flex flex-col gap-1">
      {NAV.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-gradient-to-r from-accent-blue/20 to-accent-violet/20 text-text-primary ring-1 ring-accent-blue/30"
                : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary"
            )}
          >
            <Icon className={cn("h-4 w-4", active && "text-accent-blue")} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* Sidebar (desktop) */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border-subtle bg-bg-secondary/40 px-4 py-6 lg:flex">
        <Link href="/portal" className="mb-8 flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent-blue to-accent-violet font-display text-sm font-bold text-white">
            R
          </div>
          <span className="whitespace-nowrap font-display text-base font-semibold gradient-text">
            Recruit AI
          </span>
        </Link>
        <NavLinks />
        <div className="mt-auto">
          <Separator className="my-4" />
          <button
            onClick={() => { clearMockUser(); router.push("/"); }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-bg-secondary hover:text-danger"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-64 flex-col border-r border-border-subtle bg-bg-secondary px-4 py-6">
            <div className="mb-8 flex items-center justify-between px-2">
              <span className="whitespace-nowrap font-display text-base font-semibold gradient-text">
                Recruit AI
              </span>
              <button onClick={() => setDrawerOpen(false)}>
                <X className="h-5 w-5 text-text-secondary" />
              </button>
            </div>
            <NavLinks onNavigate={() => setDrawerOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border-subtle bg-bg-primary/80 px-4 backdrop-blur-md lg:px-8">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5 text-text-secondary" />
            </button>
            <span className="font-display text-sm font-medium text-text-secondary">
              Candidate Portal
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent-blue ring-2 ring-bg-primary" />
            </Button>
            <Avatar className="h-9 w-9">
              <AvatarFallback>{user.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="px-4 py-8 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
