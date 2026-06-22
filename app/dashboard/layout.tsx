"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getMockUser, clearMockUser } from "@/lib/mock-auth";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  UserCog,
  Settings,
  BarChart3,
  Bell,
  Search,
  Menu,
  X,
  Sparkles,
  LogOut,
  User as UserIcon,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { NOTIFICATIONS } from "./mock-data";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Jobs", href: "/dashboard/jobs", icon: Briefcase },
  { label: "Talent Pool", href: "/dashboard/talent-pool", icon: Users },
  { label: "Team", href: "/dashboard/team", icon: UserCog },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(href + "/");
}

function TrialBanner() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="flex items-center justify-between gap-3 bg-gradient-to-r from-accent-blue/15 via-accent-violet/15 to-accent-blue/15 px-4 py-2 text-sm">
      <div className="flex items-center gap-2 text-text-secondary">
        <Sparkles className="h-4 w-4 text-accent-violet" />
        <span>
          <span className="font-semibold text-text-primary">12 days left</span>{" "}
          in your free trial.
        </span>
        <Link
          href="/dashboard/settings"
          className="font-semibold text-accent-blue hover:underline"
        >
          Upgrade now
        </Link>
      </div>
      <button
        aria-label="Dismiss trial banner"
        onClick={() => setOpen(false)}
        className="rounded-md p-1 text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

function SidebarContent({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <Link
        href="/dashboard"
        onClick={onNavigate}
        className="flex items-center gap-2 px-6 py-5"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent-blue to-accent-violet">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <span className="font-display text-lg font-bold text-text-primary">
          Recruit AI
        </span>
      </Link>

      <nav className="flex-1 space-y-1 px-3 py-2">
        {NAV_ITEMS.map((item) => {
          const active = isActive(pathname, item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-gradient-to-r from-accent-blue/20 to-accent-violet/10 text-text-primary"
                  : "text-text-secondary hover:bg-white/5 hover:text-text-primary"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 shrink-0",
                  active ? "text-accent-blue" : "text-text-secondary group-hover:text-text-primary"
                )}
              />
              {item.label}
              {active && <ChevronRight className="ml-auto h-4 w-4 text-accent-blue" />}
            </Link>
          );
        })}
      </nav>

      <div className="m-3 rounded-xl border border-border-subtle bg-bg-secondary p-4">
        <p className="text-sm font-semibold text-text-primary">Pro plan</p>
        <p className="mt-1 text-xs text-text-secondary">
          Unlimited jobs, AI interviews and advanced analytics.
        </p>
        <Link href="/dashboard/settings">
          <Button size="sm" className="mt-3 w-full bg-gradient-to-r from-accent-blue to-accent-violet text-white hover:brightness-110">
            Upgrade
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<ReturnType<typeof getMockUser>>(null);
  const unread = NOTIFICATIONS.filter((n) => !n.read).length;

  useEffect(() => {
    const u = getMockUser();
    if (!u || u.type !== "recruiter") {
      router.push("/login");
      return;
    }
    setUser(u);
  }, [router]);

  if (!user) return <div className="min-h-screen bg-bg-primary" />;

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-border-subtle bg-bg-secondary/40 lg:block">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-64 border-r border-border-subtle bg-bg-secondary">
            <button
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-4 rounded-md p-1.5 text-text-secondary hover:bg-white/5 hover:text-text-primary"
            >
              <X className="h-5 w-5" />
            </button>
            <SidebarContent
              pathname={pathname}
              onNavigate={() => setMobileOpen(false)}
            />
          </aside>
        </div>
      )}

      {/* Main column */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 border-b border-border-subtle bg-bg-primary/80 backdrop-blur-xl">
          <TrialBanner />
          <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
            <button
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="rounded-md p-2 text-text-secondary hover:bg-white/5 hover:text-text-primary lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="relative hidden max-w-md flex-1 sm:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
              <Input
                placeholder="Search jobs, candidates…"
                className="pl-9"
                aria-label="Search"
              />
            </div>

            <div className="ml-auto flex items-center gap-1 sm:gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    aria-label="Notifications"
                    className="relative rounded-md p-2 text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
                  >
                    <Bell className="h-5 w-5" />
                    {unread > 0 && (
                      <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-bold text-white">
                        {unread}
                      </span>
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel className="flex items-center justify-between">
                    Notifications
                    <span className="text-xs font-normal text-text-secondary">
                      {unread} unread
                    </span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {NOTIFICATIONS.map((n) => (
                    <DropdownMenuItem
                      key={n.id}
                      className="flex flex-col items-start gap-0.5 py-2"
                    >
                      <div className="flex w-full items-center gap-2">
                        {!n.read && (
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-blue" />
                        )}
                        <span className="text-sm font-medium text-text-primary">
                          {n.title}
                        </span>
                      </div>
                      <span className="text-xs text-text-secondary">{n.body}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 rounded-full p-0.5 transition-colors hover:bg-white/5">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>{user.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-text-primary">
                        {user.name}
                      </span>
                      <span className="text-xs font-normal text-text-secondary">
                        {user.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <UserIcon className="h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-danger cursor-pointer"
                    onClick={() => { clearMockUser(); router.push("/"); }}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
