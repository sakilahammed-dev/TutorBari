"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Calendar,
  Users,
  ShieldCheck,
  ArrowRight,
  Search,
  LayoutDashboard,
  Clock,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

function SuccessContent() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId") || "243140";

  return (
    <div className="py-16 bg-slate-50 min-h-screen flex items-center justify-center">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 w-full">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-xl text-center space-y-6">
          {/* Animated Success Badge */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50 text-[#00a65a] shadow-inner">
            <CheckCircle2 className="h-12 w-12" />
          </div>

          <div>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-blue-50 text-[#0675c1] mb-2 tracking-wider uppercase">
              Job ID #{jobId}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Tuition Request Posted Successfully!
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
              Your tuition requirement is now live. Qualified and verified tutors matching your preferences are being notified right now.
            </p>
          </div>

          {/* 3-Step What Happens Next Timeline */}
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6 text-left space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-[#0675c1]" />
              What Happens Next?
            </h3>

            <div className="space-y-3.5">
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0675c1] text-white text-xs font-bold">
                  1
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Tutors Apply Within 30 Minutes</h4>
                  <p className="text-[11px] text-slate-500">
                    Verified tutors from BUET, Medical, and DU in your area will submit their applications.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0675c1] text-white text-xs font-bold">
                  2
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Review & Shortlist in Guardian Dashboard</h4>
                  <p className="text-[11px] text-slate-500">
                    Compare tutor qualifications, education credentials, reviews, and expected salaries.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00a65a] text-white text-xs font-bold">
                  3
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Take a Free Trial / Demo Class</h4>
                  <p className="text-[11px] text-slate-500">
                    Schedule a free 1-day demo class to evaluate teaching style before confirming the tutor.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/guardian/dashboard" className="w-full sm:w-auto">
              <Button className="w-full h-11 px-6 bg-[#0675c1] hover:bg-[#125a9c] text-white font-bold text-xs gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Go to Guardian Dashboard
              </Button>
            </Link>

            <Link href={`/job/view/${jobId}`} className="w-full sm:w-auto">
              <Button variant="outline" className="w-full h-11 px-6 font-bold text-xs gap-2">
                <Search className="h-4 w-4" />
                View Public Post
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HireTutorSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
