import React from "react";
import Link from "next/link";
import { BookOpen, ChevronRight, CheckCircle2, Award, FileText, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function TutorialPage() {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
          <Link href="/" className="hover:text-[#0675c1]">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-900">Tutorial &amp; Guidelines</span>
        </div>

        {/* Header */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm text-center mb-10">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-[#0675c114] text-[#0675c1] mb-4">
            <BookOpen className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            How to Use TutorBari
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto">
            Comprehensive step-by-step user guide for guardians seeking qualified home/online tutors, and for tutors applying for live tuitions.
          </p>
        </div>

        {/* Guardian Guide */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm mb-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0675c114] text-[#0675c1]">
              For Guardians
            </span>
            <h2 className="text-xl font-bold text-slate-900">
              Guide to Hiring the Perfect Tutor
            </h2>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0675c1] text-white font-bold text-sm">
                1
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Post Your Requirements for Free</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Go to <Link href="/hire-a-tutor" className="text-[#0675c1] underline font-semibold">Hire a Tutor</Link>, input your phone number, specify the student&apos;s medium, class, subjects, days per week, and your offered monthly budget.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0675c1] text-white font-bold text-sm">
                2
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Review Verified Tutor CVs</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Our matching engine notifies suitable tutors. You will receive 3 to 5 verified CVs with university details, CGPA, and ratings.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0675c1] text-white font-bold text-sm">
                3
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Take Free Demo Classes &amp; Confirm</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Arrange 1 or 2 trial classes to observe rapport. Once satisfied, confirm hiring to generate your digital Confirmation Letter.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tutor Guide */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm mb-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#00a65a]">
              For Tutors
            </span>
            <h2 className="text-xl font-bold text-slate-900">
              Guide to Finding &amp; Securing Tuitions
            </h2>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#00a65a] text-white font-bold text-sm">
                1
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Create &amp; Verify Your Profile</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Register at <Link href="/signup/tutor" className="text-[#00a65a] underline font-semibold">Become a Tutor</Link>. Add your SSC, HSC, and university credentials. Upload your NID and Student ID to earn the Verified Tutor badge.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#00a65a] text-white font-bold text-sm">
                2
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Apply on the Job Board</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Search through hundreds of live jobs on the <Link href="/job/list" className="text-[#0675c1] underline font-semibold">Job Board</Link> filtered by your preferred location, class, and salary. Click Apply with your custom proposal.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#00a65a] text-white font-bold text-sm">
                3
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Conduct Demo &amp; Confirm Contract</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Upon guardian shortlist, contact them to schedule your trial class. When confirmed, pay the platform charge within 7 days to keep your verified standing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
