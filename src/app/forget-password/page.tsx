"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GraduationCap, Phone, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-xl shadow-slate-200/50">
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
            Reset Password
          </h2>
          <p className="mt-1.5 text-xs text-slate-500">
            Enter your registered mobile number to receive a verification OTP code.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-xl bg-emerald-50 p-5 border border-emerald-200 text-center space-y-3">
            <div className="flex justify-center text-[#00a65a]">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="text-sm font-bold text-emerald-900">OTP Sent Successfully!</h3>
            <p className="text-xs text-emerald-700 leading-relaxed">
              We have dispatched a 6-digit verification code to <strong>{phone}</strong>. Please check your SMS.
            </p>
            <div className="pt-2">
              <Link href="/signin">
                <Button size="sm" variant="default" className="bg-[#00a65a] hover:bg-[#008d4c] text-white font-bold">
                  Return to Sign In
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Registered Mobile Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="017XXXXXXXX"
                  className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3.5 text-sm text-slate-900 focus:border-[#0675c1] focus:outline-none focus:ring-1 focus:ring-[#0675c1]"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#0675c1] hover:bg-[#125a9c] text-white font-bold text-sm shadow-sm"
            >
              {loading ? "Sending OTP..." : "Send Verification OTP"}
            </Button>
          </form>
        )}

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
          Remembered your password?{" "}
          <Link href="/signin" className="text-[#0675c1] font-bold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
