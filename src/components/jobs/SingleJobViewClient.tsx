"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  MapPin,
  Users,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  ChevronRight,
  Send,
  Loader2,
  Navigation,
} from "lucide-react";
import { JobPost } from "@/lib/types";
import { Button } from "@/components/ui/Button";

interface SingleJobViewClientProps {
  jobId: string;
  initialJob?: JobPost | null;
}

export function SingleJobViewClient({ jobId, initialJob }: SingleJobViewClientProps) {
  const [job, setJob] = useState<JobPost | null>(initialJob || null);
  const [loading, setLoading] = useState(!initialJob);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Application Modal state
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [expectedSalary, setExpectedSalary] = useState("");
  const [availableFrom, setAvailableFrom] = useState("Immediately");
  const [availableDays, setAvailableDays] = useState(3);
  const [convenientTime, setConvenientTime] = useState("Evening (After 5:00 PM)");
  const [agreementAccepted, setAgreementAccepted] = useState(true);
  const [coverNote, setCoverNote] = useState("");
  const [applying, setApplying] = useState(false);
  const [applyError, setApplyError] = useState<string | null>(null);
  const [applySuccess, setApplySuccess] = useState(false);
  const [undoing, setUndoing] = useState(false);
  const [showIncompleteModal, setShowIncompleteModal] = useState(false);
  const [incompleteMsg, setIncompleteMsg] = useState("");

  useEffect(() => {
    // 1. Fetch current user session
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.authenticated) setCurrentUser(data.user);
      })
      .catch(() => {});

    // 2. Fetch Job details if not provided
    if (!initialJob) {
      fetch(`/api/jobs/${jobId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setJob(data.job);
          }
        })
        .catch((err) => console.error("Error loading job:", err))
        .finally(() => setLoading(false));
    }
  }, [jobId, initialJob]);

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApplying(true);
    setApplyError(null);

    if (!agreementAccepted) {
      setApplyError("You must accept the platform commission policy to apply.");
      setApplying(false);
      return;
    }

    try {
      const res = await fetch(`/api/jobs/${jobId}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          expectedSalary: expectedSalary ? parseInt(expectedSalary, 10) : undefined,
          coverNote,
          availableFrom,
          availableDays: Number(availableDays),
          convenientTime,
          agreementAccepted,
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
        setApplyError(data.message || "Failed to submit application");
        setApplying(false);
        return;
      }

      setApplySuccess(true);
      if (job) {
        setJob({ ...job, applied: true, applicantsCount: job.applicantsCount + 1 });
      }
      setTimeout(() => {
        setShowApplyModal(false);
        setApplySuccess(false);
      }, 1500);
    } catch (err) {
      setApplyError("An unexpected error occurred. Please try again.");
    } finally {
      setApplying(false);
    }
  };

  const handleUndoApply = async () => {
    if (!confirm("Are you sure you want to withdraw your application for this tuition job?")) return;
    setUndoing(true);
    try {
      const res = await fetch(`/api/jobs/${jobId}/apply`, {
        method: "DELETE",
      });
      if (res.ok) {
        if (job) {
          setJob({ ...job, applied: false, applicantsCount: Math.max(0, job.applicantsCount - 1) });
        }
      } else {
        alert("Could not withdraw application.");
      }
    } catch {
      alert("Network error occurred.");
    } finally {
      setUndoing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#0675c1] mb-2" />
        <span className="text-xs font-semibold text-slate-500">Loading tuition details...</span>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 bg-slate-50 px-4 text-center">
        <AlertCircle className="h-12 w-12 text-slate-400 mb-3" />
        <h2 className="text-xl font-bold text-slate-900">Job Not Found</h2>
        <p className="text-xs text-slate-500 mt-1 max-w-sm">
          The tuition job you are looking for has either expired, been appointed, or removed.
        </p>
        <Link href="/job/list" className="mt-4">
          <Button variant="default" size="sm">Browse Live Jobs</Button>
        </Link>
      </div>
    );
  }

  // Schema.org Structured Data for Google Jobs SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    datePosted: job.postedDate,
    employmentType: "PART_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "TutorBari",
      sameAs: "https://tutorbari.com",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: job.location,
        addressLocality: job.city,
        addressCountry: "BD",
      },
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "BDT",
      value: {
        "@type": "QuantitativeValue",
        value: job.salary,
        unitText: "MONTH",
      },
    },
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      {/* Inject Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
          <Link href="/" className="hover:text-[#0675c1]">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/job/list" className="hover:text-[#0675c1]">Job Board</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-900">Job ID #{job.id}</span>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Full Job Details */}
          <div className="lg:col-span-8 space-y-6">
            {/* Header Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-md">
                    Job ID: #{job.id}
                  </span>
                  <span className="text-xs font-bold text-[#00a65a] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Live
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  Posted on {job.postedDate}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-4 leading-snug">
                {job.title}
              </h1>

              <div className="flex items-center gap-2 text-xs text-slate-500 mt-2 font-medium">
                <MapPin className="h-4 w-4 text-[#0675c1]" />
                <span>{job.location}, {job.city}</span>
              </div>
            </div>

            {/* Specification Grid (Caretutors Style) */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
                Tuition Requirements
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="flex justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 font-medium">Tuition Type:</span>
                  <span className="font-bold text-[#0675c1]">{job.tuitionType}</span>
                </div>

                <div className="flex justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 font-medium">Salary:</span>
                  <span className="font-extrabold text-[#0675c1] text-sm">{job.salary} / Month</span>
                </div>

                <div className="flex justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 font-medium">Medium / Category:</span>
                  <span className="font-bold text-slate-900">{job.category}</span>
                </div>

                <div className="flex justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 font-medium">Class / Level:</span>
                  <span className="font-bold text-slate-900">{job.className}</span>
                </div>

                <div className="flex justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 font-medium">Student Gender:</span>
                  <span className="font-semibold text-slate-800">{job.studentGender}</span>
                </div>

                <div className="flex justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 font-medium">Preferred Tutor:</span>
                  <span className="font-semibold text-slate-800">{job.preferredTutorGender} Tutor</span>
                </div>

                <div className="flex justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 font-medium">Tutoring Days:</span>
                  <span className="font-semibold text-slate-800">{job.tutoringDaysPerWeek} Days / Week</span>
                </div>

                <div className="flex justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 font-medium">Tutoring Time:</span>
                  <span className="font-semibold text-slate-800">{job.tutoringTime || "Flexible"}</span>
                </div>

                <div className="flex justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 sm:col-span-2">
                  <span className="text-slate-500 font-medium">Subjects:</span>
                  <span className="font-bold text-slate-900 text-right">{job.subjects}</span>
                </div>

                {job.instituteName && (
                  <div className="flex justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-500 font-medium">School / College:</span>
                    <span className="font-bold text-slate-900">{job.instituteName}</span>
                  </div>
                )}

                {job.curriculumDetails && (
                  <div className="flex justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-500 font-medium">Curriculum / Stream:</span>
                    <span className="font-semibold text-slate-800">{job.curriculumDetails}</span>
                  </div>
                )}

                {job.hireDate && (
                  <div className="flex justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-500 font-medium">Desired Starting Date:</span>
                    <span className="font-semibold text-emerald-700">{job.hireDate}</span>
                  </div>
                )}

                {job.preferredTutorUniversity && (
                  <div className="flex justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-500 font-medium">Preferred University:</span>
                    <span className="font-semibold text-indigo-700">{job.preferredTutorUniversity}</span>
                  </div>
                )}

                {job.studentName && (
                  <div className="flex justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-500 font-medium">Student Name:</span>
                    <span className="font-semibold text-slate-800">{job.studentName}</span>
                  </div>
                )}
              </div>

              {/* Other Requirements */}
              {job.otherRequirements && (
                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-xs font-bold text-slate-900 mb-2">Other Requirements / Notes from Guardian:</h3>
                  <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/60 text-xs text-amber-950 leading-relaxed">
                    {job.otherRequirements}
                  </div>
                </div>
              )}
            </div>

            {/* Geolocation & Radius Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-[#0675c1]" />
                  Job Location Map
                </h2>
                <span className="text-xs text-slate-500">{job.location}, {job.city}</span>
              </div>

              {/* Map Placeholder Graphic */}
              <div className="h-48 w-full rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#0675c1_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0675c1] text-white shadow-md mb-2">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-900">{job.location}, {job.city}</span>
                  <span className="text-[11px] text-slate-500 mt-0.5">Approximate area radius shown for safety and privacy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Action & Safety Card */}
          <div className="lg:col-span-4 space-y-6 sticky top-24">
            {/* Action Box */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Offered Salary</span>
                <span className="text-3xl font-black text-[#0675c1] mt-1 block">
                  {job.salary}
                </span>
                <span className="text-xs text-slate-500">Fixed Monthly Honorarium</span>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>Total Applications:</span>
                <span className="font-bold text-[#00a65a] bg-emerald-50 px-2 py-0.5 rounded">
                  {job.applicantsCount} Tutors Applied
                </span>
              </div>

              {/* Apply Button State */}
              <div>
                {job.applied ? (
                  <div className="rounded-xl bg-emerald-50 p-4 border border-emerald-200 text-center space-y-2">
                    <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-800">
                      <CheckCircle2 className="h-4 w-4 text-[#00a65a]" />
                      You Have Applied for this Job!
                    </div>
                    <p className="text-[11px] text-emerald-700 leading-tight">
                      Your CV has been delivered to the guardian. You will be notified via SMS/call if shortlisted.
                    </p>
                    <button
                      type="button"
                      disabled={undoing}
                      onClick={handleUndoApply}
                      className="mt-1 text-xs text-red-600 hover:text-red-700 underline font-semibold disabled:opacity-50"
                    >
                      {undoing ? "Withdrawing application..." : "Undo Application"}
                    </button>
                  </div>
                ) : currentUser?.role === "TUTOR" ? (
                  <Button
                    onClick={() => setShowApplyModal(true)}
                    className="w-full h-12 bg-[#0675c1] hover:bg-[#125a9c] text-white font-bold text-sm shadow-md shadow-[#0675c1]/20 gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Apply for this Tuition
                  </Button>
                ) : currentUser ? (
                  <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200 text-center text-xs text-slate-600">
                    You are signed in as a <strong>Guardian</strong>. Only registered tutors can apply to tuition posts.
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link href={`/signin?redirect=/job/view/${job.id}`}>
                      <Button className="w-full h-11 bg-[#0675c1] hover:bg-[#125a9c] text-white font-bold text-sm">
                        Sign In to Apply
                      </Button>
                    </Link>
                    <p className="text-[11px] text-slate-500 text-center">
                      Don&apos;t have a tutor account?{" "}
                      <Link href="/signup/tutor" className="text-[#0675c1] font-bold hover:underline">
                        Register as Tutor
                      </Link>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Safety & Trust Box (Caretutors Style) */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                <ShieldCheck className="h-4 w-4 text-[#00a65a]" />
                Safety Tips for Tutors
              </div>
              <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#0675c1] font-bold">•</span>
                  <span>Always request the digital <strong>Confirmation Letter</strong> before commencing classes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0675c1] font-bold">•</span>
                  <span>Conduct demo classes in presence of parents/guardians at their designated home.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0675c1] font-bold">•</span>
                  <span>Never pay cash to any unauthorized representative. Only pay platform fees via verified gateway.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Application Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#0675c1]" />
                Apply for Tuition Job #{job.id}
              </h3>
              <button
                onClick={() => setShowApplyModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            {/* Caretutors Confirmation Question */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-sm font-semibold text-slate-800 text-center">
                Are you sure to apply for this tuition job?
              </p>
              {job.preferredTutorGender && job.preferredTutorGender !== "Any" && currentUser?.gender && currentUser.gender !== job.preferredTutorGender && (
                <p className="mt-1.5 text-xs text-red-600 text-center font-bold">
                  Note: This tuition requires a &quot;{job.preferredTutorGender}&quot; tutor.
                </p>
              )}
            </div>

            {applyError && (
              <div className="rounded-lg bg-red-50 p-3 text-xs text-red-700 border border-red-200">
                {applyError}
              </div>
            )}

            {applySuccess && (
              <div className="rounded-xl bg-emerald-50 p-4 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="h-8 w-8 text-[#00a65a] mx-auto" />
                <h4 className="text-base font-bold text-[#0675c1]">Successfully Applied!</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Note:</strong> Guardian will review your profile &amp; shortlist you if your profile strongly matches with their requirements.
                </p>
              </div>
            )}

            <form onSubmit={handleApplySubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Offered Budget: <span className="font-bold text-[#0675c1]">{job.salary}</span>
                </label>
                <input
                  type="number"
                  placeholder="Your expected monthly salary (BDT)"
                  value={expectedSalary}
                  onChange={(e) => setExpectedSalary(e.target.value)}
                  className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3.5 text-sm text-slate-900 focus:border-[#0675c1] focus:outline-none"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">Leave blank to accept the guardian&apos;s offered salary.</span>
              </div>

              {/* Schedule Availability */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Available From
                  </label>
                  <select
                    value={availableFrom}
                    onChange={(e) => setAvailableFrom(e.target.value)}
                    className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:border-[#0675c1] focus:outline-none"
                  >
                    <option value="Immediately">Immediately (Within 24-48 Hours)</option>
                    <option value="Within 3 days">Within 3 Days</option>
                    <option value="From next week">From Next Week</option>
                    <option value="From 1st of next month">From 1st of Next Month</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Available Days / Week
                  </label>
                  <select
                    value={availableDays}
                    onChange={(e) => setAvailableDays(Number(e.target.value))}
                    className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:border-[#0675c1] focus:outline-none"
                  >
                    {[2, 3, 4, 5, 6].map((d) => (
                      <option key={d} value={d}>
                        {d} Days / Week
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Convenient Tutoring Shift / Time
                </label>
                <select
                  value={convenientTime}
                  onChange={(e) => setConvenientTime(e.target.value)}
                  className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:border-[#0675c1] focus:outline-none"
                >
                  <option value="Evening (After 5:00 PM)">Evening (After 5:00 PM)</option>
                  <option value="Afternoon (3:00 PM - 5:00 PM)">Afternoon (3:00 PM - 5:00 PM)</option>
                  <option value="Morning (8:00 AM - 12:00 PM)">Morning (8:00 AM - 12:00 PM)</option>
                  <option value="Night (After 7:30 PM)">Night (After 7:30 PM)</option>
                  <option value="Flexible / Mutual Agreement">Flexible / Mutual Agreement</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Cover Note / Proposal to Guardian <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  placeholder="Introduce yourself, mention your university and teaching experience in these subjects..."
                  className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 focus:border-[#0675c1] focus:outline-none"
                />
              </div>

              {/* Commission Agreement Checkbox (Caretutors Policy) */}
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <input
                  type="checkbox"
                  required
                  checked={agreementAccepted}
                  onChange={(e) => setAgreementAccepted(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#0675c1] focus:ring-[#0675c1]"
                />
                <span>
                  I agree that upon appointment, <strong>55% platform commission</strong> on the first month&apos;s salary is payable to TutorBari within 7 days of confirmation.
                </span>
              </label>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowApplyModal(false)}
                  disabled={applying}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6"
                >
                  No
                </Button>
                <Button
                  type="submit"
                  disabled={applying || applySuccess}
                  className="bg-[#0675c1] hover:bg-[#125a9c] text-white font-bold px-8"
                >
                  {applying ? "Applying..." : "Yes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Incomplete Profile Modal (Caretutors Exact Structure) */}
      {showIncompleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl text-center space-y-4">
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
