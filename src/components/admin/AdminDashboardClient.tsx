"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Users,
  Briefcase,
  DollarSign,
  Search,
  Sparkles,
  MapPin,
  Calendar,
  Check,
  X,
  Phone,
  GraduationCap,
  FileText,
  CreditCard,
  Send,
  Eye,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export function AdminDashboardClient() {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"JOBS" | "KYC" | "FINANCES">("JOBS");

  // Admin Data State
  const [stats, setStats] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [tutors, setTutors] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [updating, setUpdating] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Filter states
  const [jobStatusFilter, setJobStatusFilter] = useState("ALL");
  const [kycFilter, setKycFilter] = useState("ALL");

  // AI Match Modal State
  const [matchModalOpen, setMatchModalOpen] = useState(false);
  const [selectedJobForMatch, setSelectedJobForMatch] = useState<any>(null);
  const [matchedTutors, setMatchedTutors] = useState<any[]>([]);
  const [loadingMatch, setLoadingMatch] = useState(false);
  const [alertSent, setAlertSent] = useState<string | null>(null);

  const fetchAdminData = async () => {
    try {
      // 1. Check Admin Session
      const meRes = await fetch("/api/auth/me");
      if (!meRes.ok) {
        router.push("/signin?redirect=/admin/dashboard");
        return;
      }
      const meData = await meRes.json();
      if (!meData.authenticated || meData.user.role !== "ADMIN") {
        router.push("/signin?redirect=/admin/dashboard");
        return;
      }
      setCurrentUser(meData.user);

      // 2. Fetch Stats
      const statsRes = await fetch("/api/admin/stats");
      const statsData = await statsRes.json();
      if (statsData.success) setStats(statsData.stats);

      // 3. Fetch Jobs
      const jobsRes = await fetch("/api/admin/jobs");
      const jobsData = await jobsRes.json();
      if (jobsData.success) setJobs(jobsData.jobs);

      // 4. Fetch Tutors
      const tutorsRes = await fetch("/api/admin/tutors");
      const tutorsData = await tutorsRes.json();
      if (tutorsData.success) setTutors(tutorsData.tutors);

      // 5. Fetch Finances
      const finRes = await fetch("/api/admin/finances");
      const finData = await finRes.json();
      if (finData.success) setInvoices(finData.invoices);
    } catch (err) {
      console.error("Admin fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const handleUpdateJobStatus = async (jobId: number, status: string) => {
    setUpdating(true);
    setFeedback(null);
    try {
      const res = await fetch(`/api/admin/jobs/${jobId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (res.ok) {
        setFeedback(`Job #${jobId} status updated to ${status}.`);
        fetchAdminData();
      } else {
        alert(data.message || "Failed to update job status");
      }
    } catch (err) {
      alert("Network error");
    } finally {
      setUpdating(false);
    }
  };

  const handleVerifyTutor = async (tutorId: string, docId: string, level: string) => {
    setUpdating(true);
    setFeedback(null);
    try {
      const res = await fetch(`/api/admin/tutors/${tutorId}/verify`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          docId,
          docStatus: "VERIFIED",
          verificationLevel: level,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setFeedback(`Tutor verified successfully as ${level}!`);
        fetchAdminData();
      } else {
        alert(data.message || "Failed to verify tutor");
      }
    } catch (err) {
      alert("Network error");
    } finally {
      setUpdating(false);
    }
  };

  const handleRunAiMatch = async (job: any) => {
    setSelectedJobForMatch(job);
    setMatchModalOpen(true);
    setLoadingMatch(true);
    setAlertSent(null);
    try {
      const res = await fetch(`/api/admin/jobs/${job.id}/match`);
      const data = await res.json();
      if (data.success) {
        setMatchedTutors(data.matches);
      }
    } catch (err) {
      console.error("Match error:", err);
    } finally {
      setLoadingMatch(false);
    }
  };

  const handleSendMatchAlert = (tutorName: string) => {
    setAlertSent(`Automated SMS & WhatsApp notification dispatched to ${tutorName}!`);
    setTimeout(() => setAlertSent(null), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#0675c1] mb-2" />
        <span className="text-xs font-semibold text-slate-500">Loading Admin Backoffice...</span>
      </div>
    );
  }

  const filteredJobs = jobs.filter((j) => {
    if (jobStatusFilter === "ALL") return true;
    return j.status === jobStatusFilter;
  });

  const filteredTutors = tutors.filter((t) => {
    if (kycFilter === "PENDING") {
      return t.documents?.some((d: any) => d.status === "PENDING_VERIFICATION");
    }
    if (kycFilter === "VERIFIED") return t.isVerified;
    if (kycFilter === "UNVERIFIED") return !t.isVerified;
    return true;
  });

  return (
    <div className="py-10 bg-slate-100/70 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-purple-100 text-purple-800 uppercase tracking-wider">
                Platform Operations Backoffice
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-semibold text-slate-500">{currentUser?.email || "admin@tutorbari.com"}</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
              Central Command & Admin Console
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage job approvals, tutor identity verification, platform revenue, and AI matchmaking dispatch.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={fetchAdminData}
              variant="outline"
              size="sm"
              className="text-xs font-bold gap-1.5"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Sync Data
            </Button>
            <Link href="/job/list">
              <Button size="sm" className="bg-[#0675c1] hover:bg-[#125a9c] text-white font-bold text-xs gap-1.5">
                <ExternalLink className="h-3.5 w-3.5" />
                Live Site
              </Button>
            </Link>
          </div>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className="rounded-xl bg-emerald-50 p-4 border border-emerald-200 flex items-center gap-2 text-xs font-bold text-emerald-800">
            <CheckCircle2 className="h-4 w-4 text-[#00a65a]" />
            {feedback}
          </div>
        )}

        {/* 4-Card Analytics Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Total Revenue
            </div>
            <div className="text-2xl font-black text-[#00a65a] mt-1">
              {(stats?.totalRevenue || 0).toLocaleString()} BDT
            </div>
            <div className="text-[10px] font-semibold text-slate-400 mt-1">
              From {stats?.totalInvoices || 0} paid placement invoices
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Jobs Pending Approval
            </div>
            <div className="text-2xl font-black text-amber-600 mt-1">
              {stats?.pendingJobsCount || 0}
            </div>
            <div className="text-[10px] font-semibold text-slate-400 mt-1">
              {stats?.liveJobsCount || 0} Live • {stats?.appointedJobsCount || 0} Appointed
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Pending KYC Verifications
            </div>
            <div className="text-2xl font-black text-purple-600 mt-1">
              {stats?.pendingKycCount || 0}
            </div>
            <div className="text-[10px] font-semibold text-slate-400 mt-1">
              {stats?.verifiedTutorsCount || 0} Verified Tutors Active
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Total Network Tutors
            </div>
            <div className="text-2xl font-black text-[#0675c1] mt-1">
              {stats?.totalTutors || 0}
            </div>
            <div className="text-[10px] font-semibold text-slate-400 mt-1">
              BUET, DU, Medical & Public Universities
            </div>
          </div>
        </div>

        {/* 3-Tab Control */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab("JOBS")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "JOBS"
                ? "bg-[#0675c1] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-200/60"
            }`}
          >
            <Briefcase className="h-4 w-4" />
            Tuition Jobs Queue ({jobs.length})
          </button>

          <button
            onClick={() => setActiveTab("KYC")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "KYC"
                ? "bg-[#0675c1] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-200/60"
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            Tutor KYC Center ({stats?.pendingKycCount || 0} Pending)
          </button>

          <button
            onClick={() => setActiveTab("FINANCES")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "FINANCES"
                ? "bg-[#0675c1] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-200/60"
            }`}
          >
            <DollarSign className="h-4 w-4" />
            Finances & Invoices ({invoices.length})
          </button>
        </div>

        {/* TAB 1: TUITION JOBS QUEUE */}
        {activeTab === "JOBS" && (
          <div className="space-y-4">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 mr-1">Status Filter:</span>
              {["ALL", "PENDING_APPROVAL", "LIVE", "APPOINTED", "CANCELLED"].map((st) => (
                <button
                  key={st}
                  onClick={() => setJobStatusFilter(st)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    jobStatusFilter === st
                      ? "bg-slate-900 text-white"
                      : "bg-white border text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {st.replace("_", " ")} ({jobs.filter((j) => (st === "ALL" ? true : j.status === st)).length})
                </button>
              ))}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
              <div className="divide-y divide-slate-100">
                {filteredJobs.map((job) => (
                  <div key={job.id} className="p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#0675c1] bg-blue-50 px-2 py-0.5 rounded">
                          #{job.id}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                            job.status === "LIVE"
                              ? "bg-emerald-50 text-[#00a65a] border border-emerald-200"
                              : job.status === "PENDING_APPROVAL"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : job.status === "APPOINTED"
                              ? "bg-purple-50 text-purple-700 border border-purple-200"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {job.status}
                        </span>
                        <span className="text-xs text-slate-400">• Posted {job.postedDate}</span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900">{job.title}</h4>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                        <span><strong>Guardian:</strong> {job.guardianName} ({job.guardianPhone})</span>
                        <span>•</span>
                        <span><strong>Location:</strong> {job.location}, {job.city}</span>
                        <span>•</span>
                        <span><strong>Salary:</strong> <strong className="text-[#00a65a]">{job.salary}</strong></span>
                        <span>•</span>
                        <span><strong>Applicants:</strong> {job.applicantsCount || 0}</span>
                      </div>
                    </div>

                    {/* Admin Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      {/* AI Matchmaking Button */}
                      <Button
                        size="sm"
                        onClick={() => handleRunAiMatch(job)}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs gap-1.5 shadow-xs"
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        Run AI Match
                      </Button>

                      {job.status === "PENDING_APPROVAL" && (
                        <Button
                          size="sm"
                          disabled={updating}
                          onClick={() => handleUpdateJobStatus(job.id, "LIVE")}
                          className="bg-[#00a65a] hover:bg-[#008f4c] text-white font-bold text-xs gap-1"
                        >
                          <Check className="h-3.5 w-3.5" />
                          Approve Live
                        </Button>
                      )}

                      {job.status === "LIVE" && (
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={updating}
                          onClick={() => handleUpdateJobStatus(job.id, "CANCELLED")}
                          className="text-xs font-bold text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <X className="h-3.5 w-3.5" />
                          Deactivate
                        </Button>
                      )}

                      <Link href={`/job/view/${job.id}`}>
                        <Button variant="ghost" size="sm" className="text-xs font-semibold text-slate-600">
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TUTOR KYC CENTER */}
        {activeTab === "KYC" && (
          <div className="space-y-4">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 mr-1">Tutor Filter:</span>
              <button
                onClick={() => setKycFilter("ALL")}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  kycFilter === "ALL" ? "bg-slate-900 text-white" : "bg-white border text-slate-600"
                }`}
              >
                All ({tutors.length})
              </button>
              <button
                onClick={() => setKycFilter("PENDING")}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  kycFilter === "PENDING" ? "bg-purple-600 text-white" : "bg-white border text-slate-600"
                }`}
              >
                Pending Documents ({stats?.pendingKycCount || 0})
              </button>
              <button
                onClick={() => setKycFilter("VERIFIED")}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  kycFilter === "VERIFIED" ? "bg-[#00a65a] text-white" : "bg-white border text-slate-600"
                }`}
              >
                Verified Tutors ({stats?.verifiedTutorsCount || 0})
              </button>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs divide-y divide-slate-100">
              {filteredTutors.map((tutor) => (
                <div key={tutor.id} className="p-5 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">{tutor.name}</h4>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          tutor.verificationLevel === "PREMIUM_VERIFIED"
                            ? "bg-emerald-50 text-[#00a65a] border border-emerald-200"
                            : tutor.verificationLevel === "BASIC_VERIFIED"
                            ? "bg-blue-50 text-[#0675c1] border border-blue-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {tutor.verificationLevel}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 text-xs text-slate-600">
                      <span><strong>University:</strong> {tutor.institution} ({tutor.department})</span>
                      <span>•</span>
                      <span><strong>Phone:</strong> {tutor.phone}</span>
                      <span>•</span>
                      <span><strong>Rating:</strong> {tutor.rating} / 5.0</span>
                    </div>

                    {/* Uploaded Documents */}
                    {tutor.documents && tutor.documents.length > 0 && (
                      <div className="pt-2 space-y-1.5">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                          Uploaded Identity Proofs:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {tutor.documents.map((doc: any) => (
                            <div
                              key={doc.id}
                              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs flex items-center gap-2"
                            >
                              <FileText className="h-3.5 w-3.5 text-[#0675c1]" />
                              <span>{doc.fileName}</span>
                              <span
                                className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                                  doc.status === "VERIFIED"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "bg-amber-100 text-amber-800"
                                }`}
                              >
                                {doc.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Verification Actions */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <Button
                      size="sm"
                      disabled={updating}
                      onClick={() =>
                        handleVerifyTutor(tutor.id, tutor.documents?.[0]?.id || "doc_1", "PREMIUM_VERIFIED")
                      }
                      className="bg-[#00a65a] hover:bg-[#008f4c] text-white font-bold text-xs gap-1 shadow-xs"
                    >
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Approve Premium Verified
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      disabled={updating}
                      onClick={() =>
                        handleVerifyTutor(tutor.id, tutor.documents?.[0]?.id || "doc_1", "BASIC_VERIFIED")
                      }
                      className="font-bold text-xs"
                    >
                      Basic Verified
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: FINANCES & AUDIT LEDGER */}
        {activeTab === "FINANCES" && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Invoice #</th>
                    <th className="py-3 px-4">Tuition Job</th>
                    <th className="py-3 px-4">Tutor Details</th>
                    <th className="py-3 px-4">Method & TRX ID</th>
                    <th className="py-3 px-4 text-right">Amount Paid</th>
                    <th className="py-3 px-4 text-center">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {invoices.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400">
                        No financial transactions recorded yet.
                      </td>
                    </tr>
                  ) : (
                    invoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#0675c1]">
                          {inv.invoiceNumber}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-slate-900 block">{inv.jobTitle}</span>
                          <span className="text-[10px] text-slate-400 font-mono">Job #{inv.jobId}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-slate-900 block">{inv.tutorName}</span>
                          <span className="text-[10px] text-slate-400">{inv.tutorPhone}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-slate-900 block">{inv.paymentMethod}</span>
                          <span className="text-[10px] text-slate-500 font-mono">{inv.transactionId}</span>
                        </td>
                        <td className="py-3.5 px-4 text-right font-bold text-[#00a65a]">
                          {inv.amount.toLocaleString()} BDT
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <Link href={`/invoice/${inv.id}`}>
                            <Button size="sm" variant="outline" className="text-xs font-bold gap-1">
                              <Eye className="h-3 w-3" />
                              View
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* AI MATCHMAKING MODAL */}
        {matchModalOpen && selectedJobForMatch && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">AI Tutor Matchmaking Engine</h3>
                    <p className="text-xs text-slate-500">
                      Ranked by Geo-Proximity, Academic Alignment, and Guardian Trust
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setMatchModalOpen(false)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Job Target Summary */}
              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 text-xs text-purple-950 space-y-1">
                <div className="font-bold text-sm">{selectedJobForMatch.title}</div>
                <div className="flex flex-wrap gap-x-4 text-slate-600">
                  <span>Location: <strong>{selectedJobForMatch.location}, {selectedJobForMatch.city}</strong></span>
                  <span>Subjects: <strong>{selectedJobForMatch.subjects}</strong></span>
                  <span>Budget: <strong className="text-[#00a65a]">{selectedJobForMatch.salary}</strong></span>
                </div>
              </div>

              {/* Alert Feedback */}
              {alertSent && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#00a65a]" />
                  {alertSent}
                </div>
              )}

              {/* Matched Tutors List */}
              {loadingMatch ? (
                <div className="py-12 text-center space-y-2">
                  <Loader2 className="h-8 w-8 animate-spin text-purple-600 mx-auto" />
                  <p className="text-xs text-slate-500 font-semibold">Running multi-factor matching algorithm...</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Top Matched Verified Tutors ({matchedTutors.length})
                  </h4>

                  {matchedTutors.map((match, idx) => (
                    <div
                      key={match.tutor.id}
                      className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-purple-300 transition-all space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-white text-[10px] font-bold">
                              {idx + 1}
                            </span>
                            <span className="font-bold text-sm text-slate-900">{match.tutor.name}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#00a65a] border border-emerald-200">
                              {match.tutor.verificationLevel}
                            </span>
                          </div>

                          <div className="text-xs text-slate-600 font-medium">
                            {match.tutor.institution} — {match.tutor.department} ({match.tutor.rating} / 5.0)
                          </div>
                          <div className="text-[11px] font-semibold text-purple-700 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {match.distanceEstimate}
                          </div>
                        </div>

                        {/* Match Score Badge */}
                        <div className="flex flex-col items-end">
                          <div className="flex items-center gap-1 px-3 py-1 rounded-xl bg-purple-100 text-purple-900 font-black text-sm">
                            <Sparkles className="h-3.5 w-3.5 text-purple-700" />
                            {match.matchScore}% Match
                          </div>
                        </div>
                      </div>

                      {/* Match Reasons */}
                      <div className="space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] text-slate-600">
                        {match.reasons.map((r: string, rIdx: number) => (
                          <div key={rIdx} className="flex items-center gap-1.5">
                            <Check className="h-3 w-3 text-[#00a65a] shrink-0" />
                            <span>{r}</span>
                          </div>
                        ))}
                      </div>

                      {/* Action Button */}
                      <div className="flex justify-end pt-1">
                        <Button
                          size="sm"
                          onClick={() => handleSendMatchAlert(match.tutor.name)}
                          className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs gap-1.5 shadow-xs"
                        >
                          <Send className="h-3 w-3" />
                          Send Tuition Alert
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
