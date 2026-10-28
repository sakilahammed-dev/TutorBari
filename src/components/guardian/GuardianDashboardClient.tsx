"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  PlusCircle,
  Users,
  Search,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  Loader2,
  Sparkles,
  FileText,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface GuardianJob {
  id: number;
  title: string;
  category: string;
  className: string;
  subjects: string;
  tuitionType: string;
  salary: string;
  city: string;
  location: string;
  tutoringDaysPerWeek: number;
  tutoringTime?: string;
  status: "LIVE" | "APPOINTED" | "PENDING_APPROVAL" | "CANCELLED";
  postedDate: string;
  applicationsCount: number;
  shortlistedCount: number;
  demoCount: number;
  appointedCount: number;
}

export function GuardianDashboardClient() {
  const router = useRouter();
  const [jobs, setJobs] = useState<GuardianJob[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [filterTab, setFilterTab] = useState<"ALL" | "LIVE" | "APPOINTED">("ALL");

  useEffect(() => {
    // 1. Fetch current user
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data?.authenticated) {
          router.push("/signin?redirect=/guardian/dashboard");
          return;
        }
        if (data.user.role !== "GUARDIAN") {
          router.push("/job/list");
          return;
        }
        setCurrentUser(data.user);
      })
      .catch(() => router.push("/signin"));

    // 2. Fetch Guardian Jobs
    fetch("/api/guardian/jobs")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.success) {
          setJobs(data.jobs);
        }
      })
      .catch((err) => console.error("Failed to load guardian jobs:", err))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#0675c1] mb-2" />
        <span className="text-xs font-semibold text-slate-500">Loading your guardian dashboard...</span>
      </div>
    );
  }

  const filteredJobs = jobs.filter((j) => {
    if (filterTab === "LIVE") return j.status === "LIVE";
    if (filterTab === "APPOINTED") return j.status === "APPOINTED";
    return true;
  });

  const totalApplications = jobs.reduce((acc, curr) => acc + (curr.applicationsCount || 0), 0);
  const totalShortlisted = jobs.reduce((acc, curr) => acc + (curr.shortlistedCount || 0), 0);
  const totalDemos = jobs.reduce((acc, curr) => acc + (curr.demoCount || 0), 0);
  const totalAppointed = jobs.reduce((acc, curr) => acc + (curr.appointedCount || 0), 0);

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome & Action Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                Guardian Account
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-semibold text-slate-500">{currentUser?.phone}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Welcome back, {currentUser?.name || "Guardian"}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Manage your posted tuition requirements, review verified tutor applications, and schedule free trial classes.
            </p>
          </div>

          <Link href="/hire-a-tutor">
            <Button className="h-12 px-6 bg-[#0675c1] hover:bg-[#125a9c] text-white font-bold text-xs shadow-md shadow-[#0675c1]/20 gap-2 shrink-0">
              <PlusCircle className="h-4 w-4" />
              Post New Tuition
            </Button>
          </Link>
        </div>

        {/* 5-Card Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Total Posts
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1">{jobs.length}</div>
            <div className="text-[10px] font-semibold text-slate-400 mt-1">Tuition requirements</div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Tutors Applied
            </div>
            <div className="text-2xl font-black text-[#0675c1] mt-1">{totalApplications}</div>
            <div className="text-[10px] font-semibold text-slate-400 mt-1">Total applications</div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Shortlisted
            </div>
            <div className="text-2xl font-black text-amber-600 mt-1">{totalShortlisted}</div>
            <div className="text-[10px] font-semibold text-slate-400 mt-1">Candidate tutors</div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Trial Demos
            </div>
            <div className="text-2xl font-black text-purple-600 mt-1">{totalDemos}</div>
            <div className="text-[10px] font-semibold text-slate-400 mt-1">Scheduled classes</div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs col-span-2 sm:col-span-1">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Appointed
            </div>
            <div className="text-2xl font-black text-[#00a65a] mt-1">{totalAppointed}</div>
            <div className="text-[10px] font-semibold text-slate-400 mt-1">Confirmed tutors</div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setFilterTab("ALL")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterTab === "ALL"
                ? "bg-[#0675c1] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            All Tuitions ({jobs.length})
          </button>
          <button
            onClick={() => setFilterTab("LIVE")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterTab === "LIVE"
                ? "bg-[#0675c1] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Active / Live ({jobs.filter((j) => j.status === "LIVE").length})
          </button>
          <button
            onClick={() => setFilterTab("APPOINTED")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterTab === "APPOINTED"
                ? "bg-[#0675c1] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Appointed ({jobs.filter((j) => j.status === "APPOINTED").length})
          </button>
        </div>

        {/* Jobs List */}
        {filteredJobs.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center space-y-4">
            <FileText className="h-12 w-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">No Tuition Requirements Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You haven&apos;t posted any tuition jobs under this filter. Post your tuition requirement to start receiving tutor applications.
            </p>
            <Link href="/hire-a-tutor">
              <Button className="h-10 px-6 bg-[#0675c1] hover:bg-[#125a9c] text-white font-bold text-xs gap-2">
                <PlusCircle className="h-4 w-4" />
                Post a Tuition Now
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-slate-300 transition-all flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
              >
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#0675c1] bg-blue-50 px-2.5 py-1 rounded-md">
                      #{job.id}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        job.status === "LIVE"
                          ? "bg-emerald-50 text-[#00a65a] border border-emerald-200"
                          : job.status === "APPOINTED"
                          ? "bg-purple-50 text-purple-700 border border-purple-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {job.status === "LIVE"
                        ? "Live • Accepting Applications"
                        : job.status === "APPOINTED"
                        ? "Tutor Appointed"
                        : "Pending Approval"}
                    </span>
                    <span className="text-xs text-slate-400">• Posted {job.postedDate}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {job.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-600">
                    <span className="flex items-center gap-1 font-semibold text-slate-800">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      {job.location}, {job.city}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span>{job.className} ({job.category})</span>
                    <span className="text-slate-300">•</span>
                    <span>{job.tutoringDaysPerWeek} Days/Week</span>
                    <span className="text-slate-300">•</span>
                    <span className="font-bold text-[#00a65a]">{job.salary}</span>
                  </div>

                  {/* Applicants Counter Badges */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-xs font-bold text-[#0675c1] bg-blue-50/80 px-2.5 py-1 rounded-lg flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {job.applicationsCount} Applied
                    </span>
                    {job.shortlistedCount > 0 && (
                      <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg">
                        {job.shortlistedCount} Shortlisted
                      </span>
                    )}
                    {job.demoCount > 0 && (
                      <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg">
                        {job.demoCount} Demo Scheduled
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  <Link href={`/job/view/${job.id}`}>
                    <Button variant="outline" size="sm" className="font-bold text-xs">
                      Public View
                    </Button>
                  </Link>

                  <Link href={`/guardian/job/${job.id}/applicants`}>
                    <Button className="h-11 px-5 bg-[#0675c1] hover:bg-[#125a9c] text-white font-bold text-xs shadow-sm shadow-[#0675c1]/20 gap-2">
                      <Users className="h-4 w-4" />
                      Review Applicants ({job.applicationsCount})
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
