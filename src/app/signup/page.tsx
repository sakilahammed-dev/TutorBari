import React from "react";
import Link from "next/link";
import { GraduationCap, UserCheck, PlusCircle, ArrowRight } from "lucide-react";

export default function SignUpHubPage() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="w-full max-w-2xl text-center space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0675c1] text-white">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="text-2xl font-black text-slate-900">
              Tutor<span className="text-[#0675c1]">Bari</span>
            </span>
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Choose Your Account Type
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Select how you would like to use TutorBari today
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
          {/* Tutor Option */}
          <Link
            href="/signup/tutor"
            className="group rounded-2xl border-2 border-slate-200 bg-white p-8 shadow-sm hover:border-[#00a65a] hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-[#00a65a] mb-5 group-hover:scale-105 transition-transform">
                <UserCheck className="h-7 w-7" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 group-hover:text-[#00a65a] transition-colors">
                I am a Tutor
              </h2>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Looking for home or online tuition jobs. Create a verified profile and apply to hundreds of live tutoring jobs.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-[#00a65a]">
              <span>Register as Tutor</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Guardian Option */}
          <Link
            href="/signup/guardian"
            className="group rounded-2xl border-2 border-slate-200 bg-white p-8 shadow-sm hover:border-[#0675c1] hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-[#0675c1] mb-5 group-hover:scale-105 transition-transform">
                <PlusCircle className="h-7 w-7" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 group-hover:text-[#0675c1] transition-colors">
                I am a Guardian / Student
              </h2>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Looking for verified, qualified tutors for my child. Post requirements and review teacher CVs for free.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-[#0675c1]">
              <span>Register as Guardian</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        <p className="text-xs text-slate-500 pt-2">
          Already have an account?{" "}
          <Link href="/signin" className="text-[#0675c1] font-bold hover:underline">
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
}
