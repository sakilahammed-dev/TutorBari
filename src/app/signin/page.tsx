"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, ArrowRight, Lock, Phone, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function SignInPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to sign in");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        if (data.user?.role === "TUTOR") {
          router.push("/job/list");
        } else {
          router.push("/hire-a-tutor");
        }
      }, 1000);
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-xl shadow-slate-200/50">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0675c1] text-white">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="text-2xl font-black text-slate-900">
              Tutor<span className="text-[#0675c1]">Bari</span>
            </span>
          </Link>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Sign In to Your Account
          </h2>
          <p className="mt-1.5 text-xs text-slate-500">
            Welcome back! Enter your credentials to access your dashboard.
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="rounded-lg bg-red-50 p-3.5 border border-red-200 flex items-start gap-2.5 text-xs text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="rounded-lg bg-emerald-50 p-3.5 border border-emerald-200 flex items-center gap-2.5 text-xs text-emerald-800">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-[#00a65a]" />
            <span>Successfully signed in! Redirecting...</span>
          </div>
        )}

        {/* Demo Credentials Helper */}
        <div className="rounded-xl bg-sky-50/70 p-3.5 border border-sky-100 text-xs text-slate-600">
          <span className="font-bold text-[#0675c1] block mb-1">Demo Credentials:</span>
          <div className="flex justify-between text-[11px]">
            <span>Tutor: <code className="bg-white px-1 py-0.5 rounded border border-sky-200">01722000002</code></span>
            <span>Password: <code className="bg-white px-1 py-0.5 rounded border border-sky-200">123456</code></span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Phone Number or Email
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="017XXXXXXXX or email"
                className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3.5 text-sm text-slate-900 focus:border-[#0675c1] focus:outline-none focus:ring-1 focus:ring-[#0675c1]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700">Password</label>
              <Link href="/faq" className="text-[11px] text-[#0675c1] hover:underline font-semibold">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3.5 text-sm text-slate-900 focus:border-[#0675c1] focus:outline-none focus:ring-1 focus:ring-[#0675c1]"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading || success}
            className="w-full h-11 bg-[#0675c1] hover:bg-[#125a9c] text-white font-bold text-sm shadow-sm"
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        {/* Signup Routing */}
        <div className="pt-4 border-t border-slate-100 text-center space-y-2">
          <p className="text-xs text-slate-500 font-medium">Don&apos;t have an account yet?</p>
          <div className="flex items-center justify-center gap-4 text-xs font-bold text-[#0675c1]">
            <Link href="/signup/tutor" className="hover:underline flex items-center gap-1">
              Become a Tutor <ArrowRight className="h-3 w-3" />
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/signup/guardian" className="hover:underline flex items-center gap-1">
              Guardian Sign Up <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
