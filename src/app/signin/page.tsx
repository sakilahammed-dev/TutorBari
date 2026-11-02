"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  ArrowRight,
  Lock,
  Phone,
  AlertCircle,
  CheckCircle2,
  Users,
  Eye,
  EyeOff,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function SignInPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<"GUARDIAN" | "TUTOR">("GUARDIAN");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
        setError(data.message || "Invalid credentials. Please check your phone/email and password.");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        if (data.user?.role === "ADMIN") {
          router.push("/admin/dashboard");
        } else if (data.user?.role === "TUTOR") {
          router.push("/tutor/dashboard");
        } else {
          router.push("/guardian/dashboard");
        }
      }, 800);
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50/70">
      <div className="w-full max-w-lg space-y-7 rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xl shadow-slate-200/50">
        {/* Header (Caretutors Style) */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0675c1] text-white">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="text-2xl font-black text-slate-900">
              Tutor<span className="text-[#0675c1]">Bari</span>
            </span>
          </Link>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Welcome Back
          </h2>
          <p className="mt-1 text-xs text-slate-500 font-medium">
            Select your account type and enter your credentials to continue.
          </p>
        </div>

        {/* Caretutors Role Selector Cards */}
        <div className="grid grid-cols-2 gap-3.5">
          <button
            type="button"
            onClick={() => {
              setSelectedRole("GUARDIAN");
              setError(null);
            }}
            className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
              selectedRole === "GUARDIAN"
                ? "border-[#0675c1] bg-[#0675c1]/5 ring-2 ring-[#0675c1]/30 shadow-xs"
                : "border-slate-200 hover:border-slate-300 bg-white"
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <Users
                className={`h-5 w-5 ${
                  selectedRole === "GUARDIAN" ? "text-[#0675c1]" : "text-slate-400"
                }`}
              />
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  selectedRole === "GUARDIAN" ? "bg-[#0675c1]" : "bg-slate-200"
                }`}
              />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Guardian / Student</p>
              <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
                Looking for a qualified tutor
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedRole("TUTOR");
              setError(null);
            }}
            className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
              selectedRole === "TUTOR"
                ? "border-[#0675c1] bg-[#0675c1]/5 ring-2 ring-[#0675c1]/30 shadow-xs"
                : "border-slate-200 hover:border-slate-300 bg-white"
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <GraduationCap
                className={`h-5 w-5 ${
                  selectedRole === "TUTOR" ? "text-[#0675c1]" : "text-slate-400"
                }`}
              />
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  selectedRole === "TUTOR" ? "bg-[#0675c1]" : "bg-slate-200"
                }`}
              />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Tutor</p>
              <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
                Looking for tuition jobs
              </p>
            </div>
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <div className="rounded-xl bg-red-50 p-3.5 border border-red-200 flex items-start gap-2.5 text-xs text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="rounded-xl bg-emerald-50 p-3.5 border border-emerald-200 flex items-center gap-2.5 text-xs text-emerald-800">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-[#00a65a]" />
            <span>Successfully signed in! Opening your dashboard...</span>
          </div>
        )}

        {/* Demo Credentials Helper */}
        <div className="rounded-xl bg-sky-50/70 p-3 border border-sky-100 text-xs text-slate-600">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-[#0675c1] text-[11px]">Caretutors Seed Accounts:</span>
            <span className="text-[10px] text-slate-400">Password for all: 123456</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
            <div
              onClick={() => {
                setSelectedRole("GUARDIAN");
                setIdentifier("01711000001");
                setPassword("123456");
              }}
              className="cursor-pointer hover:bg-white p-1.5 rounded border border-transparent hover:border-sky-200 transition-colors"
            >
              <span className="font-bold text-slate-800 block">Guardian:</span>
              <code className="text-[#0675c1]">01711000001</code>
            </div>
            <div
              onClick={() => {
                setSelectedRole("TUTOR");
                setIdentifier("01722000002");
                setPassword("123456");
              }}
              className="cursor-pointer hover:bg-white p-1.5 rounded border border-transparent hover:border-sky-200 transition-colors"
            >
              <span className="font-bold text-slate-800 block">Tutor (BUET):</span>
              <code className="text-[#0675c1]">01722000002</code>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Phone Number or Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="E.g: 017XXXXXXXX or email"
                className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-3.5 text-sm text-slate-900 focus:border-[#0675c1] focus:outline-none focus:ring-1 focus:ring-[#0675c1]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700">
                Password <span className="text-red-500">*</span>
              </label>
              <Link
                href={
                  selectedRole === "GUARDIAN"
                    ? "/forget-password/guardian"
                    : "/forget-password/tutor"
                }
                className="text-[11px] text-[#0675c1] hover:underline font-semibold"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-10 text-sm text-slate-900 focus:border-[#0675c1] focus:outline-none focus:ring-1 focus:ring-[#0675c1]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading || success}
            className="w-full h-11 bg-[#0675c1] hover:bg-[#125a9c] text-white font-bold text-sm shadow-sm rounded-xl"
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        {/* Signup Routing */}
        <div className="pt-4 border-t border-slate-100 text-center space-y-2">
          <p className="text-xs text-slate-500 font-medium">Don&apos;t have an account yet?</p>
          <div className="flex items-center justify-center gap-4 text-xs font-bold text-[#0675c1]">
            {selectedRole === "TUTOR" ? (
              <Link href="/signup/tutor" className="hover:underline flex items-center gap-1">
                Register as a Tutor <ArrowRight className="h-3 w-3" />
              </Link>
            ) : (
              <Link href="/signup/guardian" className="hover:underline flex items-center gap-1">
                Register as Guardian / Student <ArrowRight className="h-3 w-3" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
