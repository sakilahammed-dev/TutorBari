"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  Users,
  DollarSign,
  BookOpen,
  MapPin,
  Clock,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { JobPost } from "@/lib/types";

interface GuardianUpdateJobClientProps {
  jobId: string;
}

export function GuardianUpdateJobClient({ jobId }: GuardianUpdateJobClientProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form Fields
  const [tuitionType, setTuitionType] = useState("Home Tutoring");
  const [category, setCategory] = useState("English Medium");
  const [className, setClassName] = useState("Class 8");
  const [subjects, setSubjects] = useState("Mathematics, English, Science");
  const [studentGender, setStudentGender] = useState<"Male" | "Female">("Male");
  const [preferredTutorGender, setPreferredTutorGender] = useState<"Any" | "Male" | "Female">("Any");
  const [tutoringDaysPerWeek, setTutoringDaysPerWeek] = useState(3);
  const [tutoringTime, setTutoringTime] = useState("Evening (After 5:30 PM)");
  const [noOfStudents, setNoOfStudents] = useState(1);
  const [salary, setSalary] = useState("7,000");
  const [city, setCity] = useState("Dhaka");
  const [location, setLocation] = useState("Dhanmondi");
  const [detailedAddress, setDetailedAddress] = useState("");
  const [otherRequirements, setOtherRequirements] = useState("");

  const categories = [
    "Bangla Medium",
    "English Medium",
    "English Version",
    "Religious Studies",
    "Admission Test",
    "Arts",
    "Language Learning",
    "Test Preparation",
    "Special Skill Development",
    "Madrasa Medium",
    "Special Child Education",
    "University Courses",
    "Professional Courses",
  ];

  const tuitionTypes = [
    "Home Tutoring",
    "Online Tutoring",
    "Group Tutoring",
    "Package Tutoring",
    "Shadow Tutoring",
  ];

  const cities = [
    "Dhaka",
    "Chattogram",
    "Sylhet",
    "Rajshahi",
    "Khulna",
    "Barishal",
    "Rangpur",
    "Mymensingh",
    "Gazipur",
    "Narayanganj",
    "Cumilla",
  ];

  useEffect(() => {
    fetch(`/api/jobs/${jobId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.job) {
          const j: JobPost = data.job;
          setTuitionType(j.tuitionType || "Home Tutoring");
          setCategory(j.category || "English Medium");
          setClassName(j.className || "Class 8");
          setSubjects(j.subjects || "Mathematics");
          setStudentGender((j.studentGender as any) || "Male");
          setPreferredTutorGender((j.preferredTutorGender as any) || "Any");
          setTutoringDaysPerWeek(j.tutoringDaysPerWeek || 3);
          setTutoringTime(j.tutoringTime || "Evening (After 5:30 PM)");
          setNoOfStudents(j.noOfStudents || 1);
          setSalary(j.salary || "7,000");
          setCity(j.city || "Dhaka");
          setLocation(j.location || "Dhanmondi");
          setDetailedAddress(j.detailedAddress || "");
          setOtherRequirements(j.otherRequirements || "");
        } else {
          setError(data.message || "Failed to load job details");
        }
      })
      .catch(() => setError("Network error"))
      .finally(() => setLoading(false));
  }, [jobId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tuitionType,
          category,
          className,
          subjects,
          studentGender,
          preferredTutorGender,
          tutoringDaysPerWeek: Number(tutoringDaysPerWeek),
          tutoringTime,
          noOfStudents: Number(noOfStudents),
          salary,
          city,
          location,
          detailedAddress,
          otherRequirements,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to update job");
        setSaving(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push(`/guardian/job/view/${jobId}`);
      }, 1200);
    } catch {
      setError("An unexpected network error occurred.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#0675c1]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/60 py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <Link
            href={`/guardian/job/view/${jobId}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#0675c1] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Job Details
          </Link>
          <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
            Job ID: #{jobId}
          </span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden p-6 sm:p-8">
          <div className="border-b border-slate-100 pb-5 mb-6">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Update Tuition Job</h1>
            <p className="text-sm text-slate-500 mt-1">
              Modify your requirements to get the most accurate tutor matches.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 shrink-0" />
              <span>Job updated successfully! Redirecting...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Grid 1: Tuition Type & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Tuition Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={tuitionType}
                  onChange={(e) => setTuitionType(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-[#0675c1] focus:ring-2 focus:ring-[#0675c1]/20 font-medium"
                >
                  {tuitionTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Category / Medium <span className="text-red-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-[#0675c1] focus:ring-2 focus:ring-[#0675c1]/20 font-medium"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Grid 2: Class & Subjects */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Class / Grade <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  placeholder="e.g. Class 8, A Level, KG"
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-[#0675c1] focus:ring-2 focus:ring-[#0675c1]/20 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Subjects <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={subjects}
                  onChange={(e) => setSubjects(e.target.value)}
                  placeholder="e.g. Mathematics, Physics, Chemistry"
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-[#0675c1] focus:ring-2 focus:ring-[#0675c1]/20 font-medium"
                />
              </div>
            </div>

            {/* Grid 3: Genders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Student Gender <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-4 h-11">
                  {(["Male", "Female"] as const).map((g) => (
                    <label key={g} className="flex items-center gap-2 text-sm text-slate-800 font-medium cursor-pointer">
                      <input
                        type="radio"
                        name="studentGender"
                        value={g}
                        checked={studentGender === g}
                        onChange={() => setStudentGender(g)}
                        className="text-[#0675c1] focus:ring-[#0675c1]"
                      />
                      {g}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Preferred Tutor Gender <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-4 h-11">
                  {(["Any", "Male", "Female"] as const).map((g) => (
                    <label key={g} className="flex items-center gap-2 text-sm text-slate-800 font-medium cursor-pointer">
                      <input
                        type="radio"
                        name="preferredTutorGender"
                        value={g}
                        checked={preferredTutorGender === g}
                        onChange={() => setPreferredTutorGender(g)}
                        className="text-[#0675c1] focus:ring-[#0675c1]"
                      />
                      {g}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Grid 4: Days, Time & Salary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Days / Week <span className="text-red-500">*</span>
                </label>
                <select
                  value={tutoringDaysPerWeek}
                  onChange={(e) => setTutoringDaysPerWeek(Number(e.target.value))}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-[#0675c1] focus:ring-2 focus:ring-[#0675c1]/20 font-medium"
                >
                  {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                    <option key={d} value={d}>
                      {d} Days / Week
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Tutoring Time
                </label>
                <input
                  type="text"
                  value={tutoringTime}
                  onChange={(e) => setTutoringTime(e.target.value)}
                  placeholder="e.g. Evening (After 5:30 PM)"
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-[#0675c1] focus:ring-2 focus:ring-[#0675c1]/20 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Monthly Salary (৳) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="e.g. 7,000 or Negotiable"
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-[#0675c1] focus:ring-2 focus:ring-[#0675c1]/20 font-medium"
                />
              </div>
            </div>

            {/* Grid 5: City & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-[#0675c1] focus:ring-2 focus:ring-[#0675c1]/20 font-medium"
                >
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Location / Area <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Dhanmondi, Mirpur-1, Uttara"
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-[#0675c1] focus:ring-2 focus:ring-[#0675c1]/20 font-medium"
                />
              </div>
            </div>

            {/* Detailed Address */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Detailed Address
              </label>
              <textarea
                rows={2}
                value={detailedAddress}
                onChange={(e) => setDetailedAddress(e.target.value)}
                placeholder="e.g. House 14, Road 5, Block B"
                className="w-full p-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-[#0675c1] focus:ring-2 focus:ring-[#0675c1]/20 font-medium"
              />
            </div>

            {/* Other Requirements */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Other Requirements / Notes
              </label>
              <textarea
                rows={3}
                value={otherRequirements}
                onChange={(e) => setOtherRequirements(e.target.value)}
                placeholder="e.g. Prefer tutor from BUET/DU, student needs strong foundation in Calculus."
                className="w-full p-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-[#0675c1] focus:ring-2 focus:ring-[#0675c1]/20 font-medium"
              />
            </div>

            {/* Submit & Cancel */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <Link href={`/guardian/job/view/${jobId}`}>
                <Button type="button" variant="outline" className="h-11 px-6">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={saving}
                className="h-11 px-8 bg-[#0675c1] hover:bg-[#125a9c] text-white font-bold text-sm shadow-md shadow-[#0675c1]/20"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Update Job
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
