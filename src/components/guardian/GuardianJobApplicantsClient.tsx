"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Users,
  Star,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  Phone,
  GraduationCap,
  Sparkles,
  AlertCircle,
  Loader2,
  X,
  FileCheck,
  ThumbsUp,
  ThumbsDown,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface TutorApplicant {
  id: string;
  jobId: number;
  tutorId: string;
  tutorName: string;
  tutorInstitution: string;
  tutorDepartment?: string;
  tutorRating: number;
  tutorVerified?: boolean;
  expectedSalary?: number;
  coverNote?: string;
  status: "APPLIED" | "SHORTLISTED" | "DEMO_SCHEDULED" | "APPOINTED" | "REJECTED" | "WITHDRAWN";
  demoDate?: string;
  demoTime?: string;
  demoNotes?: string;
  appliedAt: string;
  tutor?: {
    id: string;
    name: string;
    gender: string;
    institution: string;
    department: string;
    rating: number;
    totalReviews: number;
    tuitionsCompleted: number;
    isVerified: boolean;
    verificationLevel: string;
    education?: any[];
    bio?: string;
    phone?: string;
  };
}

interface GuardianJobApplicantsClientProps {
  jobId: string;
}

export function GuardianJobApplicantsClient({ jobId }: GuardianJobApplicantsClientProps) {
  const router = useRouter();

  const [job, setJob] = useState<any>(null);
  const [applications, setApplications] = useState<TutorApplicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"ALL" | "SHORTLISTED" | "DEMO_SCHEDULED" | "APPOINTED">("ALL");

  // Demo Schedule Modal State
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState<TutorApplicant | null>(null);
  const [demoDate, setDemoDate] = useState("2026-10-31");
  const [demoTime, setDemoTime] = useState("5:30 PM");
  const [demoNotes, setDemoNotes] = useState("");
  const [updating, setUpdating] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const fetchApplicants = () => {
    fetch(`/api/guardian/jobs/${jobId}/applicants`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.success) {
          setJob(data.job);
          setApplications(data.applications);
        }
      })
      .catch((err) => console.error("Error loading applicants:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchApplicants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId]);

  const handleUpdateStatus = async (
    appId: string,
    newStatus: "APPLIED" | "SHORTLISTED" | "DEMO_SCHEDULED" | "APPOINTED" | "REJECTED",
    demoData?: { demoDate?: string; demoTime?: string; demoNotes?: string }
  ) => {
    setUpdating(true);
    setActionSuccess(null);

    try {
      const res = await fetch(`/api/guardian/applications/${appId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          ...demoData,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to update status");
        setUpdating(false);
        return;
      }

      setActionSuccess(`Tutor marked as ${newStatus}!`);
      setTimeout(() => setActionSuccess(null), 3000);
      fetchApplicants();
      setShowDemoModal(false);
    } catch (err) {
      alert("Failed to connect to server");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#0675c1] mb-2" />
        <span className="text-xs font-semibold text-slate-500">Loading applicants for Job #{jobId}...</span>
      </div>
    );
  }

  const filteredApps = applications.filter((app) => {
    if (activeTab === "SHORTLISTED") return app.status === "SHORTLISTED";
    if (activeTab === "DEMO_SCHEDULED") return app.status === "DEMO_SCHEDULED";
    if (activeTab === "APPOINTED") return app.status === "APPOINTED";
    return true;
  });

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/guardian/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#0675c1] transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Guardian Dashboard
          </Link>

          <Link href={`/job/view/${jobId}`}>
            <Button variant="outline" size="sm" className="text-xs font-bold">
              View Public Post
            </Button>
          </Link>
        </div>

        {/* Job Summary Banner */}
        {job && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#0675c1] bg-blue-50 px-2.5 py-1 rounded">
                  #{job.id}
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {job.category} • {job.className}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {job.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                <span><strong>Subjects:</strong> {job.subjects}</span>
                <span>•</span>
                <span><strong>Location:</strong> {job.location}, {job.city}</span>
                <span>•</span>
                <span><strong>Budget:</strong> <span className="text-[#00a65a] font-bold">{job.salary}</span></span>
                <span>•</span>
                <span><strong>Schedule:</strong> {job.tutoringDaysPerWeek} Days/Week</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center shrink-0">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Total Applicants
              </span>
              <span className="text-3xl font-black text-[#0675c1] mt-0.5 block">
                {applications.length}
              </span>
            </div>
          </div>
        )}

        {/* Success Alert */}
        {actionSuccess && (
          <div className="rounded-xl bg-emerald-50 p-4 border border-emerald-200 flex items-center gap-2 text-emerald-800 text-xs font-bold">
            <CheckCircle2 className="h-4 w-4 text-[#00a65a]" />
            {actionSuccess}
          </div>
        )}

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab("ALL")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "ALL"
                ? "bg-[#0675c1] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            All Applicants ({applications.length})
          </button>
          <button
            onClick={() => setActiveTab("SHORTLISTED")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "SHORTLISTED"
                ? "bg-[#0675c1] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Shortlisted ({applications.filter((a) => a.status === "SHORTLISTED").length})
          </button>
          <button
            onClick={() => setActiveTab("DEMO_SCHEDULED")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "DEMO_SCHEDULED"
                ? "bg-[#0675c1] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Demo Scheduled ({applications.filter((a) => a.status === "DEMO_SCHEDULED").length})
          </button>
          <button
            onClick={() => setActiveTab("APPOINTED")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "APPOINTED"
                ? "bg-[#0675c1] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Appointed ({applications.filter((a) => a.status === "APPOINTED").length})
          </button>
        </div>

        {/* Applicants List */}
        {filteredApps.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center space-y-3">
            <Users className="h-10 w-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">No applicants in this tab</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Switch to &quot;All Applicants&quot; to review all tutors who applied for this tuition.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApps.map((app) => {
              const tutor = app.tutor;
              return (
                <div
                  key={app.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-slate-300 transition-all space-y-4"
                >
                  {/* Tutor Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0675c1] text-white font-black text-xl shadow-md shadow-[#0675c1]/20">
                        {app.tutorName?.charAt(0) || "T"}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-slate-900">{app.tutorName}</h3>
                          {tutor?.isVerified && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-[#00a65a] border border-emerald-200">
                              <ShieldCheck className="h-3 w-3" />
                              {tutor.verificationLevel === "PREMIUM_VERIFIED"
                                ? "Premium Verified"
                                : "Verified Tutor"}
                            </span>
                          )}
                        </div>

                        {/* Rating & Reviews */}
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <span className="flex items-center text-amber-500 font-bold">
                            <Star className="h-3.5 w-3.5 fill-amber-500 mr-1" />
                            {tutor?.rating || 5.0}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span>{tutor?.totalReviews || 20}+ Parent Reviews</span>
                          <span className="text-slate-300">•</span>
                          <span>{tutor?.tuitionsCompleted || 15} Tuitions Completed</span>
                        </div>

                        {/* University & Degree */}
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                          <GraduationCap className="h-4 w-4 text-[#0675c1]" />
                          <span>
                            {app.tutorInstitution || tutor?.institution} —{" "}
                            {app.tutorDepartment || tutor?.department || "Major"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge & Expected Salary */}
                    <div className="flex flex-col sm:items-end gap-1.5">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-center ${
                          app.status === "SHORTLISTED"
                            ? "bg-amber-50 text-amber-800 border border-amber-200"
                            : app.status === "DEMO_SCHEDULED"
                            ? "bg-purple-50 text-purple-800 border border-purple-200"
                            : app.status === "APPOINTED"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {app.status === "DEMO_SCHEDULED"
                          ? "Trial Demo Scheduled"
                          : app.status === "SHORTLISTED"
                          ? "Shortlisted Candidate"
                          : app.status === "APPOINTED"
                          ? "Confirmed & Appointed"
                          : "Application Submitted"}
                      </span>

                      {app.expectedSalary && (
                        <span className="text-xs font-semibold text-slate-600">
                          Expected: <strong className="text-slate-900 font-bold">{app.expectedSalary} BDT</strong>/mo
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Tutor's Cover Note / Personal Pitch */}
                  {app.coverNote && (
                    <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                      <span className="font-bold text-slate-900 block mb-1">Tutor&apos;s Application Note:</span>
                      &ldquo;{app.coverNote}&rdquo;
                    </div>
                  )}

                  {/* Education Timeline Badges */}
                  {tutor?.education && tutor.education.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                      <span className="text-slate-400 font-semibold text-[11px]">Academic Background:</span>
                      {tutor.education.map((edu: any) => (
                        <span
                          key={edu.id}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium text-[11px]"
                        >
                          {edu.level}: {edu.institution} (GPA: {edu.gpa})
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Demo Details Banner (If Demo Scheduled) */}
                  {app.status === "DEMO_SCHEDULED" && (
                    <div className="rounded-xl bg-purple-50 p-4 border border-purple-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-purple-900">
                      <div className="space-y-1">
                        <div className="font-bold flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 text-purple-700" />
                          Demo Class Scheduled for: {app.demoDate || "Oct 30, 2026"} at {app.demoTime || "5:30 PM"}
                        </div>
                        {app.demoNotes && (
                          <div className="text-[11px] text-purple-700">Note: {app.demoNotes}</div>
                        )}
                      </div>

                      {tutor?.phone && (
                        <div className="flex items-center gap-1.5 font-bold text-purple-900 bg-white/80 px-3 py-1.5 rounded-lg border border-purple-200 shrink-0">
                          <Phone className="h-3.5 w-3.5 text-purple-700" />
                          Tutor Phone: {tutor.phone}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action Controls for Guardian */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Shortlist Toggle */}
                      {app.status !== "APPOINTED" && (
                        <Button
                          variant={app.status === "SHORTLISTED" ? "default" : "outline"}
                          size="sm"
                          disabled={updating}
                          onClick={() =>
                            handleUpdateStatus(
                              app.id,
                              app.status === "SHORTLISTED" ? "APPLIED" : "SHORTLISTED"
                            )
                          }
                          className={`text-xs font-bold gap-1.5 ${
                            app.status === "SHORTLISTED" ? "bg-amber-600 hover:bg-amber-700 text-white" : ""
                          }`}
                        >
                          <ThumbsUp className="h-3.5 w-3.5" />
                          {app.status === "SHORTLISTED" ? "Shortlisted" : "Shortlist"}
                        </Button>
                      )}

                      {/* Schedule Demo Class */}
                      {app.status !== "APPOINTED" && (
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={updating}
                          onClick={() => {
                            setSelectedApp(app);
                            setShowDemoModal(true);
                          }}
                          className="text-xs font-bold gap-1.5 text-purple-700 hover:bg-purple-50 border-purple-200"
                        >
                          <Calendar className="h-3.5 w-3.5" />
                          {app.status === "DEMO_SCHEDULED" ? "Reschedule Demo" : "Schedule Free Demo"}
                        </Button>
                      )}

                      {/* Reject / Decline */}
                      {app.status !== "APPOINTED" && app.status !== "REJECTED" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={updating}
                          onClick={() => handleUpdateStatus(app.id, "REJECTED")}
                          className="text-xs font-semibold text-slate-400 hover:text-red-600 gap-1"
                        >
                          <ThumbsDown className="h-3.5 w-3.5" />
                          Decline
                        </Button>
                      )}
                    </div>

                    {/* Appoint / Confirm Button */}
                    <div>
                      {app.status === "APPOINTED" ? (
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1 text-xs font-bold text-[#00a65a]">
                            <CheckCircle2 className="h-4 w-4" />
                            Confirmed Tutor
                          </span>
                          <Link href={`/job/confirmation-letter/${app.jobId}`}>
                            <Button size="sm" variant="outline" className="text-xs font-bold">
                              View Confirmation Letter
                            </Button>
                          </Link>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          disabled={updating}
                          onClick={() => handleUpdateStatus(app.id, "APPOINTED")}
                          className="bg-[#00a65a] hover:bg-[#008f4c] text-white font-bold text-xs gap-1.5 shadow-xs"
                        >
                          <FileCheck className="h-4 w-4" />
                          Appoint & Issue Confirmation
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Demo Class Scheduling Modal */}
        {showDemoModal && selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Schedule Free Trial / Demo</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Tutor: {selectedApp.tutorName}</p>
                </div>
                <button
                  onClick={() => setShowDemoModal(false)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Demo Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={demoDate}
                    onChange={(e) => setDemoDate(e.target.value)}
                    className="w-full h-11 rounded-xl border border-slate-200 px-3.5 text-xs text-slate-900 focus:border-[#0675c1] focus:ring-1 focus:ring-[#0675c1]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Demo Time / Shift <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={demoTime}
                    onChange={(e) => setDemoTime(e.target.value)}
                    placeholder="e.g. 5:30 PM or 6:00 PM"
                    className="w-full h-11 rounded-xl border border-slate-200 px-3.5 text-xs text-slate-900 focus:border-[#0675c1] focus:ring-1 focus:ring-[#0675c1]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Special Instructions / Specific Chapters
                  </label>
                  <textarea
                    rows={3}
                    value={demoNotes}
                    onChange={(e) => setDemoNotes(e.target.value)}
                    placeholder="e.g. Please bring Cambridge Math Book 3. Student needs help with Fractions and Word Problems..."
                    className="w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-900 focus:border-[#0675c1] focus:ring-1 focus:ring-[#0675c1]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDemoModal(false)}
                  className="font-bold text-xs"
                >
                  Cancel
                </Button>

                <Button
                  size="sm"
                  disabled={updating}
                  onClick={() =>
                    handleUpdateStatus(selectedApp.id, "DEMO_SCHEDULED", {
                      demoDate,
                      demoTime,
                      demoNotes,
                    })
                  }
                  className="bg-[#0675c1] hover:bg-[#125a9c] text-white font-bold text-xs gap-1.5"
                >
                  {updating ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Calendar className="h-3.5 w-3.5" />
                      Confirm Demo Schedule
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
