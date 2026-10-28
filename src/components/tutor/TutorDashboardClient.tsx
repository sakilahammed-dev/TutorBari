"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  ShieldCheck,
  Star,
  Users,
  Search,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  AlertCircle,
  Loader2,
  Sparkles,
  FileText,
  User,
  Phone,
  Briefcase,
  ArrowRight,
  ExternalLink,
  Edit3,
  UploadCloud,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface AppliedJobItem {
  id: string;
  jobId: number;
  expectedSalary?: number;
  coverNote?: string;
  status: "APPLIED" | "SHORTLISTED" | "DEMO_SCHEDULED" | "APPOINTED" | "REJECTED";
  demoDate?: string;
  demoTime?: string;
  demoNotes?: string;
  appliedAt: string;
  job: {
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
    status: string;
    guardianName?: string;
    guardianPhone?: string;
    detailedAddress?: string;
  } | null;
}

export function TutorDashboardClient() {
  const router = useRouter();

  const [profile, setProfile] = useState<any>(null);
  const [applications, setApplications] = useState<AppliedJobItem[]>([]);
  const [recommendedJobs, setRecommendedJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"APPLICATIONS" | "RECOMMENDED">("APPLICATIONS");
  const [appFilter, setAppFilter] = useState<"ALL" | "SHORTLISTED" | "DEMO" | "APPOINTED">("ALL");

  useEffect(() => {
    // 1. Fetch tutor profile
    fetch("/api/tutor/profile")
      .then((res) => {
        if (!res.ok) {
          router.push("/signin?redirect=/tutor/dashboard");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data?.success) {
          setProfile(data.profile);
        }
      })
      .catch(() => router.push("/signin"));

    // 2. Fetch applied tuitions
    fetch("/api/tutor/applications")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.success) {
          setApplications(data.applications);
        }
      })
      .catch((err) => console.error("Failed to load applications:", err));

    // 3. Fetch recommended live jobs
    fetch("/api/jobs?limit=4")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.success) {
          setRecommendedJobs(data.jobs.slice(0, 4));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#0675c1] mb-2" />
        <span className="text-xs font-semibold text-slate-500">Loading your tutor dashboard...</span>
      </div>
    );
  }

  const filteredApps = applications.filter((app) => {
    if (appFilter === "SHORTLISTED") return app.status === "SHORTLISTED";
    if (appFilter === "DEMO") return app.status === "DEMO_SCHEDULED";
    if (appFilter === "APPOINTED") return app.status === "APPOINTED";
    return true;
  });

  const stats = profile?.stats || {
    totalApplications: applications.length,
    shortlisted: applications.filter((a) => a.status === "SHORTLISTED").length,
    demoScheduled: applications.filter((a) => a.status === "DEMO_SCHEDULED").length,
    appointed: applications.filter((a) => a.status === "APPOINTED").length,
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome & Profile Header Banner */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl bg-[#0675c1] text-white font-black text-2xl sm:text-3xl shadow-lg shadow-[#0675c1]/20">
              {profile?.name?.charAt(0) || "T"}
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {profile?.name || "Tutor"}
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-[#00a65a] border border-emerald-200">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {profile?.verificationLevel === "PREMIUM_VERIFIED"
                    ? "Premium Verified Tutor"
                    : profile?.verificationLevel === "BASIC_VERIFIED"
                    ? "Basic Verified"
                    : "Phone Verified"}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                <span className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="h-3.5 w-3.5 fill-amber-500" />
                  {profile?.rating || 5.0} ({profile?.totalReviews || 24} Reviews)
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1 font-semibold text-slate-800">
                  <GraduationCap className="h-4 w-4 text-[#0675c1]" />
                  {profile?.institution || "BUET"} — {profile?.department || "CSE"}
                </span>
                <span className="text-slate-300">•</span>
                <span>{profile?.phone}</span>
              </div>

              {/* Profile Completion Bar */}
              <div className="pt-2 max-w-md">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 mb-1">
                  <span>Profile Strength</span>
                  <span className="text-[#0675c1]">{profile?.completenessScore || 80}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-[#0675c1] rounded-full transition-all duration-500"
                    style={{ width: `${profile?.completenessScore || 80}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
            <Link href="/tutor/profile/info">
              <Button variant="outline" className="h-11 font-bold text-xs gap-1.5">
                <Edit3 className="h-4 w-4 text-slate-500" />
                Edit Profile
              </Button>
            </Link>

            <Link href="/job/list">
              <Button className="h-11 px-5 bg-[#0675c1] hover:bg-[#125a9c] text-white font-bold text-xs shadow-md shadow-[#0675c1]/20 gap-2">
                <Search className="h-4 w-4" />
                Browse Tuition Jobs
              </Button>
            </Link>
          </div>
        </div>

        {/* 4-Card Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Applied Tuitions
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1">{stats.totalApplications}</div>
            <div className="text-[10px] font-semibold text-slate-400 mt-1">Submitted applications</div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Shortlisted
            </div>
            <div className="text-2xl font-black text-amber-600 mt-1">{stats.shortlisted}</div>
            <div className="text-[10px] font-semibold text-slate-400 mt-1">Shortlisted by guardians</div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Trial Demos
            </div>
            <div className="text-2xl font-black text-purple-600 mt-1">{stats.demoScheduled}</div>
            <div className="text-[10px] font-semibold text-slate-400 mt-1">Trial classes scheduled</div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Appointed
            </div>
            <div className="text-2xl font-black text-[#00a65a] mt-1">{stats.appointed}</div>
            <div className="text-[10px] font-semibold text-slate-400 mt-1">Confirmed tuitions</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-3 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab("APPLICATIONS")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "APPLICATIONS"
                ? "bg-[#0675c1] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            My Applied Tuitions ({applications.length})
          </button>
          <button
            onClick={() => setActiveTab("RECOMMENDED")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "RECOMMENDED"
                ? "bg-[#0675c1] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Recommended For You ({recommendedJobs.length})
          </button>
        </div>

        {/* TAB 1: MY APPLIED TUITIONS */}
        {activeTab === "APPLICATIONS" && (
          <div className="space-y-4">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 mr-1">Filter by:</span>
              <button
                onClick={() => setAppFilter("ALL")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  appFilter === "ALL" ? "bg-slate-900 text-white" : "bg-white border text-slate-600 hover:bg-slate-50"
                }`}
              >
                All ({applications.length})
              </button>
              <button
                onClick={() => setAppFilter("SHORTLISTED")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  appFilter === "SHORTLISTED" ? "bg-amber-600 text-white" : "bg-white border text-slate-600 hover:bg-slate-50"
                }`}
              >
                Shortlisted ({applications.filter((a) => a.status === "SHORTLISTED").length})
              </button>
              <button
                onClick={() => setAppFilter("DEMO")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  appFilter === "DEMO" ? "bg-purple-600 text-white" : "bg-white border text-slate-600 hover:bg-slate-50"
                }`}
              >
                Demo Scheduled ({applications.filter((a) => a.status === "DEMO_SCHEDULED").length})
              </button>
              <button
                onClick={() => setAppFilter("APPOINTED")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  appFilter === "APPOINTED" ? "bg-[#00a65a] text-white" : "bg-white border text-slate-600 hover:bg-slate-50"
                }`}
              >
                Appointed ({applications.filter((a) => a.status === "APPOINTED").length})
              </button>
            </div>

            {filteredApps.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center space-y-4">
                <FileText className="h-12 w-12 text-slate-300 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">No applications under this filter</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Browse our live tuition board and apply to tuitions in your preferred locations to get shortlisted.
                </p>
                <Link href="/job/list">
                  <Button className="h-10 px-6 bg-[#0675c1] hover:bg-[#125a9c] text-white font-bold text-xs gap-2">
                    <Search className="h-4 w-4" />
                    Browse Live Tuitions
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredApps.map((app) => {
                  const job = app.job;
                  return (
                    <div
                      key={app.id}
                      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-slate-300 transition-all space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#0675c1] bg-blue-50 px-2.5 py-1 rounded">
                              #{app.jobId}
                            </span>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                              {job?.category || "Tuition"} • {job?.className}
                            </span>
                            <span className="text-xs text-slate-400">• Applied on {new Date(app.appliedAt).toLocaleDateString()}</span>
                          </div>

                          <h3 className="text-base font-bold text-slate-900 leading-snug">
                            {job?.title || `Tuition Job #${app.jobId}`}
                          </h3>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                            <span><strong>Location:</strong> {job?.location}, {job?.city}</span>
                            <span>•</span>
                            <span><strong>Subjects:</strong> {job?.subjects}</span>
                            <span>•</span>
                            <span><strong>Salary:</strong> <strong className="text-[#00a65a]">{job?.salary}</strong></span>
                            {app.expectedSalary && (
                              <>
                                <span>•</span>
                                <span>Your Ask: <strong>{app.expectedSalary} BDT</strong></span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="shrink-0">
                          <span
                            className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-center ${
                              app.status === "SHORTLISTED"
                                ? "bg-amber-50 text-amber-800 border border-amber-200"
                                : app.status === "DEMO_SCHEDULED"
                                ? "bg-purple-50 text-purple-800 border border-purple-200"
                                : app.status === "APPOINTED"
                                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                : "bg-blue-50 text-[#0675c1] border border-blue-200"
                            }`}
                          >
                            {app.status === "DEMO_SCHEDULED"
                              ? "Trial Demo Scheduled"
                              : app.status === "SHORTLISTED"
                              ? "Shortlisted by Guardian"
                              : app.status === "APPOINTED"
                              ? "Confirmed & Appointed"
                              : "Application Submitted"}
                          </span>
                        </div>
                      </div>

                      {/* Demo Details Banner (If Demo Scheduled) */}
                      {app.status === "DEMO_SCHEDULED" && (
                        <div className="rounded-xl bg-purple-50 p-4 border border-purple-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-purple-900">
                          <div className="space-y-1">
                            <div className="font-bold flex items-center gap-1.5">
                              <Calendar className="h-4 w-4 text-purple-700" />
                              Trial Demo Date: {app.demoDate || "Oct 30, 2026"} at {app.demoTime || "5:30 PM"}
                            </div>
                            {app.demoNotes && (
                              <div className="text-[11px] text-purple-700">Guardian Note: &ldquo;{app.demoNotes}&rdquo;</div>
                            )}
                            {job?.detailedAddress && (
                              <div className="text-[11px] text-purple-800">Address: {job.detailedAddress}</div>
                            )}
                          </div>

                          {job?.guardianPhone && (
                            <div className="flex items-center gap-1.5 font-bold text-purple-900 bg-white px-3.5 py-2 rounded-xl border border-purple-200 shadow-xs shrink-0">
                              <Phone className="h-4 w-4 text-purple-700" />
                              Guardian: {job.guardianName || "Parent"} ({job.guardianPhone})
                            </div>
                          )}
                        </div>
                      )}

                      {/* Appointed Confirmation Banner */}
                      {app.status === "APPOINTED" && (
                        <div className="rounded-xl bg-emerald-50 p-4 border border-emerald-200 flex items-center justify-between gap-3 text-xs text-emerald-900">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-[#00a65a] shrink-0" />
                            <div>
                              <strong className="block text-emerald-950 font-bold">Congratulations! You have been appointed for this tuition.</strong>
                              <span className="text-[11px] text-emerald-700">Please review and sign your digital confirmation letter.</span>
                            </div>
                          </div>

                          <Link href={`/job/confirmation-letter/${app.jobId}`}>
                            <Button size="sm" className="bg-[#00a65a] hover:bg-[#008f4c] text-white font-bold text-xs shrink-0">
                              View Confirmation Letter
                            </Button>
                          </Link>
                        </div>
                      )}

                      {/* Cover Note Snippet */}
                      {app.coverNote && (
                        <p className="text-xs text-slate-500 italic border-l-2 border-slate-200 pl-3">
                          &ldquo;{app.coverNote}&rdquo;
                        </p>
                      )}

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-400">Platform commission applies upon confirmed appointment.</span>
                        <Link href={`/job/view/${app.jobId}`} className="text-[#0675c1] font-bold hover:underline flex items-center gap-1">
                          View Job Details
                          <ChevronRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: RECOMMENDED TUITIONS */}
        {activeTab === "RECOMMENDED" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedJobs.map((job) => (
                <div
                  key={job.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-[#0675c1]/50 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#0675c1] bg-blue-50 px-2 py-0.5 rounded">
                        #{job.id}
                      </span>
                      <span className="text-xs font-bold text-[#00a65a]">{job.salary}</span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 line-clamp-2">
                      {job.title}
                    </h4>

                    <div className="text-xs text-slate-500 space-y-1">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        <span>{job.location}, {job.city}</span>
                      </div>
                      <div>{job.className} • {job.subjects}</div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">{job.applicantsCount} Tutors Applied</span>
                    <Link href={`/job/view/${job.id}`}>
                      <Button size="sm" className="bg-[#0675c1] hover:bg-[#125a9c] text-white font-bold text-xs gap-1">
                        Apply Now
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-4">
              <Link href="/job/list">
                <Button variant="outline" className="font-bold text-xs gap-2">
                  Browse All Live Jobs ({recommendedJobs.length}+)
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
