"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Briefcase,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  BookOpen,
  Filter,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Check,
  ChevronRight,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { JobPost } from "@/lib/types";

export default function TutorJobBoardPage() {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState("");
  const [cityFilter, setCityFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [genderFilter, setGenderFilter] = useState("Any");
  const [tuitionTypeFilter, setTuitionTypeFilter] = useState("All");

  // Apply modal
  const [selectedJob, setSelectedJob] = useState<JobPost | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applying, setApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);
  const [applyError, setApplyError] = useState<string | null>(null);
  const [showIncompleteModal, setShowIncompleteModal] = useState(false);
  const [incompleteMsg, setIncompleteMsg] = useState("");

  const categories = [
    "All",
    "Bangla Medium",
    "English Medium",
    "English Version",
    "Religious Studies",
    "Admission Test",
    "Arts",
    "Language Learning",
    "Test Preparation",
  ];

  const cities = ["All", "Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna", "Gazipur", "Narayanganj"];

  const fetchJobs = () => {
    setLoading(true);
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        if (data.jobs) {
          setJobs(data.jobs);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleApplyClick = (job: JobPost) => {
    setSelectedJob(job);
    setApplyError(null);
    setApplySuccess(false);
    setShowApplyModal(true);
  };

  const confirmApply = async () => {
    if (!selectedJob) return;
    setApplying(true);
    setApplyError(null);

    try {
      const res = await fetch(`/api/jobs/${selectedJob.id}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agreementAccepted: true,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.code === "CARE94") {
          setShowApplyModal(false);
          setIncompleteMsg(data.message || "Please complete your profile to apply for this tuition.");
          setShowIncompleteModal(true);
          return;
        }
        setApplyError(data.message || "Failed to apply");
        return;
      }

      setApplySuccess(true);
      setJobs((prev) =>
        prev.map((j) => (j.id === selectedJob.id ? { ...j, applied: true, applicantsCount: j.applicantsCount + 1 } : j))
      );
      setTimeout(() => {
        setShowApplyModal(false);
        setApplySuccess(false);
        setSelectedJob(null);
      }, 1500);
    } catch {
      setApplyError("Network error occurred. Please try again.");
    } finally {
      setApplying(false);
    }
  };

  const filteredJobs = jobs.filter((j) => {
    if (searchId && !String(j.id).includes(searchId)) return false;
    if (cityFilter !== "All" && !j.city.toLowerCase().includes(cityFilter.toLowerCase())) return false;
    if (categoryFilter !== "All" && !j.category.toLowerCase().includes(categoryFilter.toLowerCase())) return false;
    if (genderFilter !== "Any" && j.preferredTutorGender !== genderFilter && j.preferredTutorGender !== "Any")
      return false;
    if (tuitionTypeFilter !== "All" && j.tuitionType !== tuitionTypeFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50/60 py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Tutor Job Board</h1>
            <p className="text-xs text-slate-500 mt-1">
              Live tuition opportunities matched to your preferences. Apply with 1-click.
            </p>
          </div>
          <Link href="/tutor/status">
            <Button variant="outline" className="text-xs font-bold border-[#0675c1] text-[#0675c1]">
              My Application Status <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Job ID</label>
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="e.g. 243138"
                className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#0675c1]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">City</label>
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#0675c1]"
              >
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#0675c1]"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Gender</label>
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#0675c1]"
              >
                <option value="Any">Any Gender</option>
                <option value="Male">Male Tutor</option>
                <option value="Female">Female Tutor</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Tuition Type</label>
              <select
                value={tuitionTypeFilter}
                onChange={(e) => setTuitionTypeFilter(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#0675c1]"
              >
                <option value="All">All Types</option>
                <option value="Home Tutoring">Home Tutoring</option>
                <option value="Online Tutoring">Online Tutoring</option>
              </select>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        {loading ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#0675c1]" />
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
            <AlertCircle className="h-10 w-10 text-slate-400 mx-auto mb-2" />
            <h3 className="text-base font-bold text-slate-800">No Jobs Match Your Filters</h3>
            <p className="text-xs text-slate-500 mt-1">Try clearing or adjusting your search filters.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-[#0675c1]/50 transition-all flex flex-col md:flex-row justify-between gap-6"
              >
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                      Job ID: #{job.id}
                    </span>
                    <span className="text-[11px] font-bold text-[#0675c1] bg-[#0675c1]/10 px-2.5 py-0.5 rounded-md">
                      {job.tuitionType}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Posted: {new Date(job.postedDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      <span>{job.location}, {job.city}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <DollarSign className="h-3.5 w-3.5 text-[#0675c1]" />
                      <span className="font-bold text-slate-900">৳ {job.salary} / Month</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="h-3.5 w-3.5 text-slate-400" />
                      <span>{job.className} • {job.category}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      <span>{job.tutoringDaysPerWeek} Days / Week</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-slate-400" />
                      <span>Prefers: {job.preferredTutorGender} Tutor</span>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col justify-end items-end gap-2.5 border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0 sm:pl-6">
                  <Link href={`/job/view/${job.id}`}>
                    <Button variant="outline" className="text-xs h-9 px-4 font-bold">
                      Details
                    </Button>
                  </Link>

                  {job.applied ? (
                    <Button disabled className="text-xs h-9 px-5 bg-emerald-600 text-white font-bold cursor-default">
                      <Check className="h-3.5 w-3.5 mr-1" /> Applied
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleApplyClick(job)}
                      className="text-xs h-9 px-5 bg-[#0675c1] hover:bg-[#125a9c] text-white font-bold"
                    >
                      Apply
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showApplyModal && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl text-center space-y-4 animate-in fade-in zoom-in-95">
            {applySuccess ? (
              <div className="space-y-3 py-4">
                <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">Successfully Applied!</h3>
                <p className="text-xs text-slate-500">
                  Guardian will review your profile & shortlist you if your credentials match.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-bold text-slate-900">Apply for Tuition</h3>
                <p className="text-xs text-slate-600">
                  Are you sure to apply for tuition job <strong>#{selectedJob.id}</strong>?
                </p>

                {selectedJob.preferredTutorGender !== "Any" && (
                  <p className="text-xs text-red-500 font-medium bg-red-50 p-2.5 rounded-lg border border-red-200">
                    <strong>Note:</strong> This job requires a &quot;{selectedJob.preferredTutorGender}&quot; tutor.
                  </p>
                )}

                {applyError && (
                  <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg font-medium">{applyError}</p>
                )}

                <div className="flex items-center justify-center gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowApplyModal(false)}
                    className="h-9 px-5 text-xs font-semibold"
                  >
                    No
                  </Button>
                  <Button
                    type="button"
                    disabled={applying}
                    onClick={confirmApply}
                    className="h-9 px-6 text-xs font-bold bg-[#0675c1] hover:bg-[#125a9c] text-white"
                  >
                    {applying ? <Loader2 className="h-4 w-4 animate-spin" /> : "Yes"}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Incomplete Profile Modal (Caretutors Exact Modal) */}
      {showIncompleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl text-center space-y-4">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
            <h3 className="text-lg font-bold text-red-500">Incomplete Profile</h3>
            <p className="text-xs text-slate-600">{incompleteMsg.split("Note:")[0]?.trim()}</p>
            {incompleteMsg.includes("Note:") && (
              <p className="text-xs text-red-500 font-medium">Note: {incompleteMsg.split("Note:")[1]?.trim()}</p>
            )}
            <div className="flex justify-end pt-2">
              <Link href="/tutor/profile/info">
                <Button className="border border-[#0675c1] bg-transparent text-[#0675c1] hover:bg-[#0675c1]/10 text-xs font-bold h-9 px-5">
                  Update Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
