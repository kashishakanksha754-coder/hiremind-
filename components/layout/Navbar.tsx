"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Brain, Menu, X, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { GradientButton } from "@/components/ui/GradientButton";
import { Button } from "@/components/ui/button";
import { getMockUser, clearMockUser, MockUser } from "@/lib/mock-auth";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navLinks = [
  { href: "/for-recruiters", label: "For Recruiters" },
  { href: "/for-candidates", label: "For Candidates" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<MockUser | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    setUser(getMockUser());
  }, [pathname]);

  function handleLogout() {
    clearMockUser();
    setUser(null);
    router.push("/");
  }

  const initials = user ? user.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() : "";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all",
        scrolled
          ? "border-b border-border-subtle bg-bg-primary/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent-blue to-accent-violet">
            <Brain className="h-5 w-5 text-white" />
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight text-text-primary">
            HireMind
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "text-text-primary"
                  : "text-text-secondary hover:text-text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full p-0.5 transition-colors hover:bg-white/5">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-text-primary">{user.name.split(" ")[0]}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{user.name}</span>
                    <span className="text-xs font-normal text-text-secondary">{user.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={user.type === "recruiter" ? "/dashboard" : "/portal"}>
                    <User className="h-4 w-4" />
                    {user.type === "recruiter" ? "Dashboard" : "Portal"}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-danger cursor-pointer" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <GradientButton asChild>
                <Link href="/signup">Get Started Free</Link>
              </GradientButton>
            </>
          )}
        </div>

        <button
          className="md:hidden text-text-primary"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border-subtle bg-bg-primary px-6 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-text-secondary hover:bg-bg-secondary hover:text-text-primary"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              {user ? (
                <>
                  <Button variant="outline" asChild>
                    <Link href={user.type === "recruiter" ? "/dashboard" : "/portal"}>
                      Go to {user.type === "recruiter" ? "Dashboard" : "Portal"}
                    </Link>
                  </Button>
                  <Button variant="outline" onClick={handleLogout} className="text-danger">
                    <LogOut className="h-4 w-4" /> Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                  <GradientButton asChild>
                    <Link href="/signup">Get Started Free</Link>
                  </GradientButton>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
