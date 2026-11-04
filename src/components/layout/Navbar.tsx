"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  Menu,
  X,
  PlusCircle,
  Search,
  BookOpen,
  HelpCircle,
  User,
  LogOut,
  LayoutDashboard,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface AuthUser {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: "GUARDIAN" | "TUTOR" | "ADMIN";
}

export function Navbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (res.ok) return res.json();
        return null;
      })
      .then((data) => {
        if (data?.authenticated && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null))
      .finally(() => setLoadingUser(false));
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const navLinks = [
    { label: "Job Board", href: "/job/list", icon: Search },
    { label: "Tutorial", href: "/tutorial", icon: BookOpen },
    { label: "FAQ", href: "/faq", icon: HelpCircle },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/90 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95 transition-all">
      {/* Caretutors Top Hotline & Helpline Bar */}
      <div className="bg-[#0675c1] text-white py-1.5 px-4 text-xs font-semibold">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="tel:09613441122" className="flex items-center gap-1.5 hover:underline text-white font-medium">
              <span>Helpline: 09613 441122 / 01700-000001</span>
            </a>
            <span className="hidden sm:inline text-white/50">•</span>
            <span className="hidden sm:inline text-white/90">#1 Trusted Platform for Verified Tutors & Tuitions</span>
          </div>
          <div className="flex items-center gap-4 text-white/90">
            <Link href="/job/list" className="hover:underline hidden md:inline">Live Tuitions</Link>
            <span className="hidden md:inline text-white/50">|</span>
            <Link href="/hire-a-tutor" className="hover:underline hidden md:inline">Hire a Tutor</Link>
            <span className="hidden md:inline text-white/50">|</span>
            <Link href="/signup/tutor" className="hover:underline hidden md:inline font-bold text-white">Become a Tutor</Link>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0675c1] text-white shadow-md shadow-[#0675c1]/20 group-hover:bg-[#125a9c] transition-colors">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Tutor<span className="text-[#0675c1]">Bari</span>
            </span>
            <span className="text-[10px] font-semibold text-slate-500 -mt-1 tracking-wider uppercase">
              #1 Platform for Tutors
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-[#0675c1] dark:text-slate-200 dark:hover:text-[#38a3f8] rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {!loadingUser && user ? (
            /* Logged-In User Profile & Actions */
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0675c1] text-white font-bold text-xs">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-900 max-w-[120px] truncate">
                    {user.name}
                  </span>
                  <span className="text-[10px] font-semibold text-[#00a65a] uppercase">
                    {user.role}
                  </span>
                </div>
              </div>

              {user.role === "ADMIN" ? (
                <>
                  <Link href="/admin/dashboard">
                    <Button variant="default" size="sm" className="font-semibold gap-1.5 bg-slate-900 text-white hover:bg-slate-800 shadow-sm">
                      <ShieldCheck className="h-4 w-4 text-emerald-400" />
                      Admin Console
                    </Button>
                  </Link>
                  <Link href="/job/list">
                    <Button variant="outline" size="sm" className="font-semibold gap-1.5 border-slate-300">
                      <Search className="h-4 w-4" />
                      Browse Jobs
                    </Button>
                  </Link>
                </>
              ) : user.role === "TUTOR" ? (
                <>
                  <Link href="/tutor/dashboard">
                    <Button variant="outline" size="sm" className="font-semibold gap-1.5 border-slate-300">
                      <LayoutDashboard className="h-4 w-4 text-[#0675c1]" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/job/list">
                    <Button variant="default" size="sm" className="font-semibold gap-1.5">
                      <Search className="h-4 w-4" />
                      Browse Jobs
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/guardian/dashboard">
                    <Button variant="outline" size="sm" className="font-semibold gap-1.5 border-slate-300">
                      <LayoutDashboard className="h-4 w-4 text-[#0675c1]" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/hire-a-tutor">
                    <Button variant="default" size="sm" className="font-semibold gap-1.5">
                      <PlusCircle className="h-4 w-4" />
                      Hire a Tutor
                    </Button>
                  </Link>
                </>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-slate-500 hover:text-red-600 gap-1"
                title="Sign Out"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-xs">Logout</span>
              </Button>
            </div>
          ) : (
            /* Guest Actions */
            <>
              <Link href="/signin">
                <Button variant="ghost" size="sm" className="font-semibold text-slate-700 hover:text-[#0675c1]">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup/tutor">
                <Button variant="outline" size="sm" className="font-semibold text-slate-800 border-slate-300 hover:border-[#0675c1] hover:text-[#0675c1]">
                  Become a Tutor
                </Button>
              </Link>
              <Link href="/hire-a-tutor">
                <Button variant="default" size="sm" className="font-bold gap-1.5 shadow-sm">
                  <PlusCircle className="h-4 w-4" />
                  Hire a Tutor
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Hamburger */}
        <div className="flex lg:hidden items-center gap-2">
          <Link href="/hire-a-tutor">
            <Button size="sm" variant="default" className="text-xs h-9 px-3">
              Hire a Tutor
            </Button>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl dark:border-slate-800 dark:bg-slate-950 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-1.5">
            {user && (
              <div className="flex items-center gap-3 p-3 mb-2 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0675c1] text-white font-bold text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{user.name}</p>
                  <p className="text-xs font-semibold text-[#00a65a]">{user.role}</p>
                </div>
              </div>
            )}

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-base font-semibold text-slate-800 hover:bg-slate-50 hover:text-[#0675c1]"
              >
                {link.icon && <link.icon className="h-4 w-4 text-[#0675c1]" />}
                {link.label}
              </Link>
            ))}

            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
              {user ? (
                <>
                  {user.role === "ADMIN" ? (
                    <Link href="/admin/dashboard" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="default" className="w-full justify-center gap-2 bg-slate-900 text-white hover:bg-slate-800">
                        <ShieldCheck className="h-4 w-4 text-emerald-400" />
                        Admin Console
                      </Button>
                    </Link>
                  ) : user.role === "GUARDIAN" ? (
                    <Link href="/guardian/dashboard" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="default" className="w-full justify-center gap-2">
                        <LayoutDashboard className="h-4 w-4" />
                        Guardian Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/tutor/dashboard" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="default" className="w-full justify-center gap-2">
                        <LayoutDashboard className="h-4 w-4" />
                        Tutor Dashboard
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full justify-center text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/signin" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-center">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup/tutor" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="secondary" className="w-full justify-center">
                      Become a Tutor
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
