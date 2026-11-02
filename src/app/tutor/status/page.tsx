"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  DollarSign,
  BookOpen,
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  Loader2,
  Trash2,
  ChevronRight,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ApplicationChatModal } from "@/components/common/ApplicationChatModal";

type TabType = "ALL" | "PENDING" | "SHORTLISTED" | "DEMO_SCHEDULED" | "APPOINTED" | "CANCELLED";

export default function TutorStatusPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("ALL");
  const [withdrawingId, setWithdrawingId] = useState<number | null>(null);
  const [chatApp, setChatApp] = useState<any | null>(null);

  const fetchApplications = () => {
    setLoading(true);
    fetch("/api/tutor/applications")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.applications) {
          setApplications(data.applications);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleUndoApply = async (jobId: number) => {
    if (!confirm("Are you sure you want to withdraw your application for this tuition job?")) return;
    setWithdrawingId(jobId);
    try {
      const res = await fetch(`/api/jobs/${jobId}/apply`, {
        method: "DELETE",
      });
      if (res.ok) {
        setApplications((prev) => prev.filter((a) => a.jobId !== jobId));
      }
    } catch {
      alert("Failed to withdraw application.");
    } finally {
      setWithdrawingId(null);
    }
  };

  const filteredApps = applications.filter((app) => {
    if (activeTab === "ALL") return true;
    if (activeTab === "PENDING") return app.status === "APPLIED" || app.status === "PENDING";
    return app.status === activeTab;
  });

  return (
    <div className="min-h-screen bg-slate-50/60 py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/tutor/dashboard"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#0675c1] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <Link href="/tutor/job-board">
            <Button variant="outline" className="text-xs font-bold border-[#0675c1] text-[#0675c1]">
              Browse More Jobs <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Tuition Application Status</h1>
            <p className="text-xs text-slate-500 mt-1">
              Track the progress of your submitted tuition applications from review to appointment.
            </p>
          </div>
          <div className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
            Total Applications: {applications.length}
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
          {(
            [
              { id: "ALL", label: "All" },
              { id: "PENDING", label: "Pending Review" },
              { id: "SHORTLISTED", label: "Shortlisted" },
              { id: "DEMO_SCHEDULED", label: "Trial Demo" },
              { id: "APPOINTED", label: "Appointed" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-[#0675c1] text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Applications List */}
        {loading ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#0675c1]" />
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
            <AlertCircle className="h-10 w-10 text-slate-400 mx-auto mb-2" />
            <h3 className="text-base font-bold text-slate-800">No Applications in this Category</h3>
            <p className="text-xs text-slate-500 mt-1">
              Check out the live Job Board to find tuitions matching your expertise.
            </p>
            <Link href="/tutor/job-board" className="mt-4 inline-block">
              <Button className="bg-[#0675c1] text-white text-xs font-bold">Explore Jobs</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApps.map((app) => (
              <div
                key={app.id}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-[#0675c1]/40 transition-all flex flex-col md:flex-row justify-between gap-6"
              >
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                      Job ID: #{app.jobId}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider ${
                        app.status === "APPOINTED"
                          ? "bg-emerald-100 text-emerald-800"
                          : app.status === "DEMO_SCHEDULED"
                          ? "bg-purple-100 text-purple-800"
                          : app.status === "SHORTLISTED"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {app.status === "APPLIED" ? "PENDING REVIEW" : app.status}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Applied: {new Date(app.appliedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    {app.job?.title || `Tuition Job #${app.jobId}`}
                  </h3>

                  {app.job && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        <span>{app.job.location}, {app.job.city}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="h-3.5 w-3.5 text-[#0675c1]" />
                        <span className="font-bold text-slate-900">৳ {app.job.salary} / Month</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="h-3.5 w-3.5 text-slate-400" />
                        <span>{app.job.className} • {app.job.category}</span>
                      </div>
                    </div>
                  )}

                  {/* Guardian contact if trial / appointed */}
                  {app.job?.guardianName && (
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
                      <p className="font-bold">Guardian Contact Revealed for Demo:</p>
                      <p>Guardian: {app.job.guardianName} ({app.job.guardianPhone})</p>
                      {app.job.detailedAddress && <p>Address: {app.job.detailedAddress}</p>}
                    </div>
                  )}
                </div>

                <div className="flex sm:flex-col justify-end items-end gap-2.5 border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0 sm:pl-6">
                  <Button
                    variant="outline"
                    onClick={() => setChatApp(app)}
                    className="text-xs h-9 px-3.5 text-[#0675c1] border-[#0675c1]/30 hover:bg-blue-50 font-bold gap-1.5"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    Chat & Feedback
                  </Button>

                  <Link href={`/job/view/${app.jobId}`}>
                    <Button variant="outline" className="text-xs h-9 px-4 font-bold">
                      View Job <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </Link>

                  {(app.status === "APPLIED" || app.status === "PENDING") && (
                    <Button
                      variant="outline"
                      disabled={withdrawingId === app.jobId}
                      onClick={() => handleUndoApply(app.jobId)}
                      className="text-xs h-9 px-3 text-red-600 hover:bg-red-50 hover:border-red-300 font-semibold"
                    >
                      {withdrawingId === app.jobId ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <>
                          <Trash2 className="h-3.5 w-3.5 mr-1" /> Undo Application
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tutor-Guardian Direct Chat Modal */}
        {chatApp && (
          <ApplicationChatModal
            applicationId={chatApp.id}
            jobId={chatApp.jobId}
            jobTitle={chatApp.job?.title || `Tuition Job #${chatApp.jobId}`}
            otherPartyName={chatApp.job?.guardianName || "Guardian"}
            otherPartyRole="GUARDIAN"
            currentUserRole="TUTOR"
            onClose={() => setChatApp(null)}
          />
        )}
      </div>
    </div>
  );
}
