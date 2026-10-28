"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  Users,
  DollarSign,
  BookOpen,
  MapPin,
  Clock,
  Eye,
  UserCheck,
  Edit,
  Loader2,
  AlertCircle,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { JobPost } from "@/lib/types";

interface GuardianJobViewClientProps {
  jobId: string;
}

export function GuardianJobViewClient({ jobId }: GuardianJobViewClientProps) {
  const [job, setJob] = useState<JobPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/jobs/${jobId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.job) {
          setJob(data.job);
        } else {
          setError(data.message || "Job not found");
        }
      })
      .catch(() => setError("Failed to load job details"))
      .finally(() => setLoading(false));
  }, [jobId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#0675c1]" />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
        <AlertCircle className="h-12 w-12 text-slate-400 mb-3" />
        <h2 className="text-xl font-bold text-slate-900">{error || "Job Not Found"}</h2>
        <Link href="/guardian/dashboard" className="mt-4">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  const isPending = job.status === "PENDING_APPROVAL" || job.status === "LIVE";

  return (
    <div className="min-h-screen bg-slate-50/60 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/guardian/dashboard"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#0675c1] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
              Job ID: #{job.id}
            </span>
            <span
              className={`text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider ${
                job.status === "APPOINTED"
                  ? "bg-emerald-100 text-emerald-800"
                  : job.status === "LIVE"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {job.status}
            </span>
          </div>
        </div>

        {/* Header Action Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{job.title}</h1>
            <p className="text-xs text-slate-500 mt-1">
              Posted on {new Date(job.postedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Views counter */}
            <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs font-bold text-slate-700">
              <Eye className="h-4 w-4 text-slate-500" />
              <span>Views : {job.views || 1}</span>
            </div>

            {/* Applied count & direct link */}
            <Link href={`/guardian/job/tutors-applied/${job.id}`}>
              <Button
                variant="outline"
                className="h-9 px-4 border-[#0675c1] text-[#0675c1] hover:bg-[#0675c1]/10 text-xs font-bold"
              >
                <Users className="h-4 w-4 mr-1.5" />
                Applied : {job.applicantsCount || 0}
              </Button>
            </Link>

            {/* Update Button */}
            {isPending && (
              <Link href={`/guardian/update-job/${job.id}`}>
                <Button className="h-9 px-4 bg-[#0675c1] hover:bg-[#125a9c] text-white text-xs font-bold">
                  <Edit className="h-3.5 w-3.5 mr-1.5" />
                  Update
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Specifications Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
              Tuition Requirements Specification
            </h2>
          </div>

          <div className="divide-y divide-slate-100 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50/50 transition-colors">
              <span className="font-semibold text-slate-500">Tuition Type</span>
              <span className="sm:col-span-2 font-bold text-slate-900">{job.tuitionType}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50/50 transition-colors">
              <span className="font-semibold text-slate-500">Salary</span>
              <span className="sm:col-span-2 font-black text-[#0675c1] text-base">৳ {job.salary} / Month</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50/50 transition-colors">
              <span className="font-semibold text-slate-500">Medium / Category</span>
              <span className="sm:col-span-2 font-bold text-slate-900">{job.category}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50/50 transition-colors">
              <span className="font-semibold text-slate-500">Class / Grade</span>
              <span className="sm:col-span-2 font-bold text-slate-900">{job.className}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50/50 transition-colors">
              <span className="font-semibold text-slate-500">Subjects</span>
              <span className="sm:col-span-2 font-bold text-slate-900">{job.subjects}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50/50 transition-colors">
              <span className="font-semibold text-slate-500">Student Gender</span>
              <span className="sm:col-span-2 font-bold text-slate-900">{job.studentGender}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50/50 transition-colors">
              <span className="font-semibold text-slate-500">Preferred Tutor</span>
              <span className="sm:col-span-2 font-bold text-slate-900">{job.preferredTutorGender} Tutor</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50/50 transition-colors">
              <span className="font-semibold text-slate-500">Tutoring Days</span>
              <span className="sm:col-span-2 font-bold text-slate-900">{job.tutoringDaysPerWeek} Days / Week</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50/50 transition-colors">
              <span className="font-semibold text-slate-500">Tutoring Time</span>
              <span className="sm:col-span-2 font-bold text-slate-900">{job.tutoringTime || "Negotiable"}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50/50 transition-colors">
              <span className="font-semibold text-slate-500">No. of Students</span>
              <span className="sm:col-span-2 font-bold text-slate-900">{job.noOfStudents || 1} Student</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50/50 transition-colors">
              <span className="font-semibold text-slate-500">Location</span>
              <span className="sm:col-span-2 font-bold text-slate-900">{job.location}, {job.city}</span>
            </div>

            {job.detailedAddress && (
              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50/50 transition-colors">
                <span className="font-semibold text-slate-500">Detailed Address</span>
                <span className="sm:col-span-2 text-slate-800">{job.detailedAddress}</span>
              </div>
            )}

            {job.otherRequirements && (
              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50/50 transition-colors">
                <span className="font-semibold text-slate-500">Other Requirements</span>
                <span className="sm:col-span-2 text-slate-800 italic">{job.otherRequirements}</span>
              </div>
            )}
          </div>
        </div>

        {/* Call to action for reviewing applicants */}
        <div className="bg-gradient-to-r from-[#0675c1]/10 via-white to-[#0675c1]/5 rounded-2xl border border-[#0675c1]/20 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Want to review matching tutor profiles?</h3>
            <p className="text-xs text-slate-500 mt-1">
              Explore qualified tutors from top universities who applied for this tuition.
            </p>
          </div>
          <Link href={`/guardian/job/tutors-applied/${job.id}`}>
            <Button className="bg-[#0675c1] hover:bg-[#125a9c] text-white font-bold text-xs h-10 px-6">
              View Applied Tutors ({job.applicantsCount || 0}) <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
