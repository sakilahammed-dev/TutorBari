"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  GraduationCap,
  Sliders,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  PlusCircle,
  Trash2,
  UploadCloud,
  FileText,
  Save,
  Check,
  ChevronLeft,
  Calendar,
  MapPin,
  Clock,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export function TutorProfileClient() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"PERSONAL" | "EDUCATION" | "PREFERENCES" | "DOCUMENTS">("PERSONAL");
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form states
  // Tab 1: Personal
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"Male" | "Female" | "Any">("Male");
  const [bio, setBio] = useState("");
  const [tutoringExperience, setTutoringExperience] = useState("2 Years");
  const [institution, setInstitution] = useState("");
  const [department, setDepartment] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [religion, setReligion] = useState("Islam");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [presentAddress, setPresentAddress] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");

  // Tab 2: Education
  const [educationList, setEducationList] = useState<any[]>([]);
  const [showAddEduModal, setShowAddEduModal] = useState(false);
  const [eduLevel, setEduLevel] = useState<"SSC" | "HSC" | "GRADUATION" | "POST_GRADUATION">("GRADUATION");
  const [eduInstitution, setEduInstitution] = useState("");
  const [eduDepartment, setEduDepartment] = useState("");
  const [eduPassingYear, setEduPassingYear] = useState("2026");
  const [eduGpa, setEduGpa] = useState("3.85");
  const [eduIsCurrent, setEduIsCurrent] = useState(true);

  // Tab 3: Preferences
  const [expectedMinimumSalary, setExpectedMinimumSalary] = useState("7000");
  const [preferredCities, setPreferredCities] = useState<string[]>(["Dhaka"]);
  const [preferredLocations, setPreferredLocations] = useState<string[]>([
    "Dhanmondi",
    "Mohammadpur",
  ]);
  const [preferredCategories, setPreferredCategories] = useState<string[]>([
    "English Medium",
    "Bangla Medium",
  ]);
  const [preferredClasses, setPreferredClasses] = useState<string[]>([
    "Class 8",
    "Class 9",
    "Class 10 (SSC)",
    "O Level",
  ]);
  const [preferredSubjects, setPreferredSubjects] = useState<string[]>([
    "Mathematics",
    "Physics",
    "Chemistry",
    "English",
  ]);
  const [availableDays, setAvailableDays] = useState(4);
  const [availableTime, setAvailableTime] = useState("Evening (After 5:30 PM)");

  // Tab 4: Documents
  const [documents, setDocuments] = useState<any[]>([]);
  const [docType, setDocType] = useState<"NID" | "STUDENT_ID" | "CERTIFICATE">("STUDENT_ID");
  const [docFileName, setDocFileName] = useState("");
  const [uploadingDoc, setUploadingDoc] = useState(false);

  const popularLocations = [
    "Dhanmondi",
    "Mohammadpur",
    "Lalmatia",
    "Mirpur 1",
    "Mirpur 2",
    "Mirpur 10",
    "Uttara Sector 1-7",
    "Uttara Sector 8-14",
    "Gulshan 1",
    "Gulshan 2",
    "Banani",
    "Bashundhara R/A",
    "Banasree",
    "Badda",
    "Malibagh",
    "Panthapath",
    "Farmgate",
  ];

  const categories = [
    "Bangla Medium",
    "English Medium",
    "English Version",
    "Religious Studies",
    "Admission Test",
    "Arts",
    "Language Learning",
    "Test Prep",
  ];

  const availableClassesList = [
    "Class 1 - 5",
    "Class 6",
    "Class 7",
    "Class 8",
    "Class 9",
    "Class 10 (SSC)",
    "HSC 1st Year",
    "HSC 2nd Year",
    "O Level",
    "A Level",
    "Admission Test",
  ];

  const availableSubjectsList = [
    "Mathematics",
    "Higher Math",
    "Physics",
    "Chemistry",
    "Biology",
    "General Science",
    "English",
    "Bangla",
    "ICT",
    "Accounting",
    "Economics",
    "Business Studies",
  ];

  const toggleClass = (cls: string) => {
    if (preferredClasses.includes(cls)) {
      if (preferredClasses.length > 1) {
        setPreferredClasses(preferredClasses.filter((c) => c !== cls));
      }
    } else {
      setPreferredClasses([...preferredClasses, cls]);
    }
  };

  const toggleSubject = (sub: string) => {
    if (preferredSubjects.includes(sub)) {
      if (preferredSubjects.length > 1) {
        setPreferredSubjects(preferredSubjects.filter((s) => s !== sub));
      }
    } else {
      setPreferredSubjects([...preferredSubjects, sub]);
    }
  };

  const loadProfile = () => {
    fetch("/api/tutor/profile")
      .then((res) => {
        if (!res.ok) {
          router.push("/signin?redirect=/tutor/profile/info");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data?.success && data.profile) {
          const p = data.profile;
          setProfile(p);
          setName(p.name || "");
          setGender(p.gender || "Male");
          setBio(p.bio || "");
          setTutoringExperience(p.tutoringExperience || "2 Years");
          setInstitution(p.institution || "");
          setDepartment(p.department || "");
          setDateOfBirth(p.dateOfBirth || "2002-05-14");
          setBloodGroup(p.bloodGroup || "B+");
          setReligion(p.religion || "Islam");
          setEmergencyContact(p.emergencyContact || "01811000000");
          setPresentAddress(p.presentAddress || "Dhanmondi, Dhaka");
          setPermanentAddress(p.permanentAddress || "Dhaka, Bangladesh");

          setEducationList(p.education || []);
          setExpectedMinimumSalary(p.expectedMinimumSalary?.toString() || "7000");
          setPreferredCities(p.preferredCities || ["Dhaka"]);
          setPreferredLocations(p.preferredLocations || ["Dhanmondi", "Mohammadpur"]);
          setPreferredCategories(p.preferredCategories || ["English Medium"]);
          setPreferredClasses(p.preferredClasses || ["Class 8", "Class 9", "Class 10 (SSC)", "O Level"]);
          setPreferredSubjects(p.preferredSubjects || ["Mathematics", "Physics", "Chemistry", "English"]);
          setAvailableDays(p.availableDays || 4);
          setAvailableTime(p.availableTime || "Evening (After 5:30 PM)");
          setDocuments(p.documents || []);
        }
      })
      .catch(() => router.push("/signin"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSavePersonal = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/tutor/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          gender,
          bio,
          tutoringExperience,
          institution,
          department,
          dateOfBirth,
          bloodGroup,
          religion,
          emergencyContact,
          presentAddress,
          permanentAddress,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setFeedback({ type: "error", text: data.message || "Failed to update profile." });
      } else {
        setFeedback({ type: "success", text: "Personal details updated successfully!" });
        loadProfile();
      }
    } catch (err) {
      setFeedback({ type: "error", text: "Network connection error." });
    } finally {
      setSaving(false);
    }
  };

  const handleSavePreferences = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/tutor/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          expectedMinimumSalary: Number(expectedMinimumSalary),
          preferredCities,
          preferredLocations,
          preferredCategories,
          preferredClasses,
          preferredSubjects,
          availableDays: Number(availableDays),
          availableTime,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setFeedback({ type: "error", text: data.message || "Failed to update preferences." });
      } else {
        setFeedback({ type: "success", text: "Tuition preferences saved successfully!" });
        loadProfile();
      }
    } catch (err) {
      setFeedback({ type: "error", text: "Network connection error." });
    } finally {
      setSaving(false);
    }
  };

  const handleAddEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/tutor/education", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          level: eduLevel,
          institution: eduInstitution,
          department: eduDepartment,
          passingYear: Number(eduPassingYear),
          gpa: eduGpa ? Number(eduGpa) : undefined,
          isCurrent: eduIsCurrent,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setShowAddEduModal(false);
        setEduInstitution("");
        setEduDepartment("");
        loadProfile();
      } else {
        alert(data.message || "Failed to add education");
      }
    } catch (err) {
      alert("Network error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteEducation = async (id: string) => {
    if (!confirm("Are you sure you want to delete this educational record?")) return;

    try {
      const res = await fetch(`/api/tutor/education/${id}`, { method: "DELETE" });
      if (res.ok) {
        loadProfile();
      }
    } catch (err) {
      alert("Failed to delete record");
    }
  };

  const handleUploadDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docFileName) {
      alert("Please select a file or enter file name");
      return;
    }
    setUploadingDoc(true);

    try {
      const res = await fetch("/api/tutor/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentType: docType,
          fileName: docFileName,
          fileUrl: `/uploads/docs/${Date.now()}_${docFileName}`,
        }),
      });

      if (res.ok) {
        setDocFileName("");
        setFeedback({ type: "success", text: "Document submitted for admin verification!" });
        loadProfile();
      }
    } catch (err) {
      alert("Failed to upload document");
    } finally {
      setUploadingDoc(false);
    }
  };

  const toggleLocation = (loc: string) => {
    if (preferredLocations.includes(loc)) {
      if (preferredLocations.length > 1) {
        setPreferredLocations(preferredLocations.filter((l) => l !== loc));
      }
    } else {
      setPreferredLocations([...preferredLocations, loc]);
    }
  };

  const toggleCategory = (cat: string) => {
    if (preferredCategories.includes(cat)) {
      if (preferredCategories.length > 1) {
        setPreferredCategories(preferredCategories.filter((c) => c !== cat));
      }
    } else {
      setPreferredCategories([...preferredCategories, cat]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#0675c1] mb-2" />
        <span className="text-xs font-semibold text-slate-500">Loading your profile...</span>
      </div>
    );
  }

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/tutor/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#0675c1]"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Tutor Dashboard
          </Link>

          <span className="text-xs font-semibold text-slate-400">
            Profile Strength: <strong className="text-[#0675c1]">{profile?.completenessScore || 80}%</strong>
          </span>
        </div>

        {/* Profile Card Header */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0675c1] text-white font-black text-xl shadow-md shadow-[#0675c1]/20">
              {profile?.name?.charAt(0) || "T"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900">{profile?.name}</h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#00a65a] border border-emerald-200 uppercase">
                  {profile?.verificationLevel || "Verified"}
                </span>
              </div>
              <p className="text-xs text-slate-500">{profile?.institution} • {profile?.phone}</p>
            </div>
          </div>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`rounded-xl p-4 border flex items-center gap-2 text-xs font-bold ${
              feedback.type === "success"
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-red-50 text-red-800 border-red-200"
            }`}
          >
            {feedback.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 text-[#00a65a]" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600" />
            )}
            {feedback.text}
          </div>
        )}

        {/* 4-Tab Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-200/70 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveTab("PERSONAL")}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === "PERSONAL"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <User className="h-4 w-4 text-[#0675c1]" />
            Personal Info
          </button>

          <button
            onClick={() => setActiveTab("EDUCATION")}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === "EDUCATION"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <GraduationCap className="h-4 w-4 text-[#0675c1]" />
            Education ({educationList.length})
          </button>

          <button
            onClick={() => setActiveTab("PREFERENCES")}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === "PREFERENCES"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Sliders className="h-4 w-4 text-[#0675c1]" />
            Tuition Preferences
          </button>

          <button
            onClick={() => setActiveTab("DOCUMENTS")}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === "DOCUMENTS"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <ShieldCheck className="h-4 w-4 text-[#00a65a]" />
            KYC Verification ({documents.length})
          </button>
        </div>

        {/* Form Container */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
          {/* TAB 1: PERSONAL INFORMATION */}
          {activeTab === "PERSONAL" && (
            <form onSubmit={handleSavePersonal} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-11 rounded-xl border border-slate-200 px-3.5 text-xs text-slate-900 focus:border-[#0675c1] focus:ring-1 focus:ring-[#0675c1]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Gender</label>
                  <div className="flex gap-2">
                    {(["Male", "Female"] as const).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGender(g)}
                        className={`flex-1 h-11 rounded-xl text-xs font-bold border transition-all ${
                          gender === g
                            ? "bg-[#0675c1] text-white border-[#0675c1]"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Current University / Institution <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="e.g. BUET / University of Dhaka"
                    className="w-full h-11 rounded-xl border border-slate-200 px-3.5 text-xs text-slate-900 focus:border-[#0675c1] focus:ring-1 focus:ring-[#0675c1]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Department / Major <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. Computer Science & Engineering"
                    className="w-full h-11 rounded-xl border border-slate-200 px-3.5 text-xs text-slate-900 focus:border-[#0675c1] focus:ring-1 focus:ring-[#0675c1]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Date of Birth</label>
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full h-11 rounded-xl border border-slate-200 px-3.5 text-xs text-slate-900 focus:border-[#0675c1] focus:ring-1 focus:ring-[#0675c1]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Blood Group</label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-900 focus:border-[#0675c1] focus:ring-1 focus:ring-[#0675c1]"
                  >
                    {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Emergency Contact</label>
                  <input
                    type="tel"
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full h-11 rounded-xl border border-slate-200 px-3.5 text-xs text-slate-900 focus:border-[#0675c1] focus:ring-1 focus:ring-[#0675c1]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Tutoring Experience <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={tutoringExperience}
                    onChange={(e) => setTutoringExperience(e.target.value)}
                    className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-900 focus:border-[#0675c1] focus:ring-1 focus:ring-[#0675c1]"
                  >
                    <option value="Fresh / Less than 1 Year">Fresh / Less than 1 Year</option>
                    <option value="1 - 2 Years">1 - 2 Years</option>
                    <option value="2 - 3 Years">2 - 3 Years</option>
                    <option value="3 - 5 Years">3 - 5 Years</option>
                    <option value="5+ Years">5+ Years Experience</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Religion
                  </label>
                  <select
                    value={religion}
                    onChange={(e) => setReligion(e.target.value)}
                    className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-900 focus:border-[#0675c1] focus:ring-1 focus:ring-[#0675c1]"
                  >
                    <option value="Islam">Islam</option>
                    <option value="Hinduism">Hinduism</option>
                    <option value="Christianity">Christianity</option>
                    <option value="Buddhism">Buddhism</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Present Address</label>
                <input
                  type="text"
                  value={presentAddress}
                  onChange={(e) => setPresentAddress(e.target.value)}
                  placeholder="e.g. House 14, Road 5, Dhanmondi, Dhaka"
                  className="w-full h-11 rounded-xl border border-slate-200 px-3.5 text-xs text-slate-900 focus:border-[#0675c1] focus:ring-1 focus:ring-[#0675c1]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  About Yourself & Tutoring Experience (Bio)
                </label>
                <textarea
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Share your tutoring achievements, methodology, and subjects of expertise to impress parents..."
                  className="w-full rounded-xl border border-slate-200 p-3.5 text-xs text-slate-900 focus:border-[#0675c1] focus:ring-1 focus:ring-[#0675c1]"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <Button
                  type="submit"
                  disabled={saving}
                  className="h-11 px-6 bg-[#0675c1] hover:bg-[#125a9c] text-white font-bold text-xs gap-2"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Save Changes
                </Button>
              </div>
            </form>
          )}

          {/* TAB 2: EDUCATIONAL CREDENTIALS */}
          {activeTab === "EDUCATION" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Academic Background</h3>
                  <p className="text-xs text-slate-500">
                    Add your educational degrees (SSC, HSC, Graduation) to build parent trust.
                  </p>
                </div>

                <Button
                  onClick={() => setShowAddEduModal(true)}
                  size="sm"
                  className="bg-[#0675c1] hover:bg-[#125a9c] text-white font-bold text-xs gap-1.5"
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  Add Degree
                </Button>
              </div>

              {educationList.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500">
                  No educational credentials added yet. Click &quot;Add Degree&quot; to add your SSC/HSC/Graduation.
                </div>
              ) : (
                <div className="space-y-3">
                  {educationList.map((edu) => (
                    <div
                      key={edu.id}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-900">{edu.level}</span>
                          {edu.isCurrent && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-[#0675c1]">
                              Currently Studying
                            </span>
                          )}
                        </div>
                        <div className="text-xs font-semibold text-slate-700">
                          {edu.institution} {edu.department && `(${edu.department})`}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Passing Year: {edu.passingYear} {edu.gpa && `• GPA/CGPA: ${edu.gpa}`}
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteEducation(edu.id)}
                        className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-white"
                        title="Delete Degree"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: TUITION PREFERENCES */}
          {activeTab === "PREFERENCES" && (
            <form onSubmit={handleSavePreferences} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Expected Minimum Salary (BDT / Month) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={expectedMinimumSalary}
                  onChange={(e) => setExpectedMinimumSalary(e.target.value)}
                  className="w-full sm:w-64 h-11 rounded-xl border border-slate-200 px-3.5 text-xs font-bold text-slate-900 focus:border-[#0675c1] focus:ring-1 focus:ring-[#0675c1]"
                />
              </div>

              {/* Preferred Locations */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Preferred Areas in Dhaka <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {popularLocations.map((loc) => {
                    const isSelected = preferredLocations.includes(loc);
                    return (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => toggleLocation(loc)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                          isSelected
                            ? "bg-[#0675c1] text-white border-[#0675c1]"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {isSelected && "✓ "}
                        {loc}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Preferred Categories */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Preferred Medium / Curriculum <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => {
                    const isSelected = preferredCategories.includes(cat);
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => toggleCategory(cat)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                          isSelected
                            ? "bg-[#0675c1] text-white border-[#0675c1]"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {isSelected && "✓ "}
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Preferred Classes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Preferred Classes / Grades <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableClassesList.map((cls) => {
                    const isSelected = preferredClasses.includes(cls);
                    return (
                      <button
                        key={cls}
                        type="button"
                        onClick={() => toggleClass(cls)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                          isSelected
                            ? "bg-[#0675c1] text-white border-[#0675c1]"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {isSelected && "✓ "}
                        {cls}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Preferred Subjects */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Preferred Subjects <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableSubjectsList.map((sub) => {
                    const isSelected = preferredSubjects.includes(sub);
                    return (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => toggleSubject(sub)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                          isSelected
                            ? "bg-[#0675c1] text-white border-[#0675c1]"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {isSelected && "✓ "}
                        {sub}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Availability */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Available Days per Week
                  </label>
                  <select
                    value={availableDays}
                    onChange={(e) => setAvailableDays(Number(e.target.value))}
                    className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-900 focus:border-[#0675c1] focus:ring-1 focus:ring-[#0675c1]"
                  >
                    {[2, 3, 4, 5, 6].map((d) => (
                      <option key={d} value={d}>
                        {d} Days / Week
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Available Tutoring Shift
                  </label>
                  <select
                    value={availableTime}
                    onChange={(e) => setAvailableTime(e.target.value)}
                    className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-900 focus:border-[#0675c1] focus:ring-1 focus:ring-[#0675c1]"
                  >
                    <option value="Morning (8:00 AM - 12:00 PM)">Morning (8:00 AM - 12:00 PM)</option>
                    <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
                    <option value="Evening (After 5:30 PM)">Evening (After 5:30 PM)</option>
                    <option value="Night (After 7:30 PM)">Night (After 7:30 PM)</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <Button
                  type="submit"
                  disabled={saving}
                  className="h-11 px-6 bg-[#0675c1] hover:bg-[#125a9c] text-white font-bold text-xs gap-2"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Save Preferences
                </Button>
              </div>
            </form>
          )}

          {/* TAB 4: KYC VERIFICATION DOCUMENTS */}
          {activeTab === "DOCUMENTS" && (
            <div className="space-y-6">
              {/* Verification Tier Cards */}
              <div className="rounded-2xl bg-emerald-50/70 border border-emerald-200 p-5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                  <ShieldCheck className="h-4 w-4 text-[#00a65a]" />
                  Verified Badge Status: {profile?.verificationLevel || "Phone Verified"}
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Upload your University Student ID or National ID (NID). Verified tutors receive 4x more guardian shortlists and are featured at the top of guardian applicant lists.
                </p>
              </div>

              {/* Upload Document Form */}
              <form onSubmit={handleUploadDocument} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-4">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Upload New Document
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Document Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={docType}
                      onChange={(e: any) => setDocType(e.target.value)}
                      className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:border-[#0675c1] focus:ring-1 focus:ring-[#0675c1]"
                    >
                      <option value="STUDENT_ID">University Student ID Card</option>
                      <option value="NID">National ID (NID) / Smart Card</option>
                      <option value="CERTIFICATE">Academic Certificate / Transcript</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Document File Name / Reference <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={docFileName}
                      onChange={(e) => setDocFileName(e.target.value)}
                      placeholder="e.g. BUET_Student_ID_Front.jpg"
                      className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:border-[#0675c1] focus:ring-1 focus:ring-[#0675c1]"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    type="submit"
                    disabled={uploadingDoc}
                    className="h-10 px-6 bg-[#00a65a] hover:bg-[#008f4c] text-white font-bold text-xs gap-1.5"
                  >
                    {uploadingDoc ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <UploadCloud className="h-4 w-4" />
                    )}
                    Submit for Verification
                  </Button>
                </div>
              </form>

              {/* Uploaded Documents List */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                  Uploaded Verification Documents ({documents.length})
                </h4>

                {documents.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400 border border-dashed rounded-xl">
                    No documents uploaded yet. Upload your Student ID to earn the Verified Tutor Badge.
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-[#0675c1]" />
                          <div>
                            <span className="text-xs font-bold text-slate-900 block">{doc.fileName}</span>
                            <span className="text-[10px] text-slate-400">
                              {doc.documentType} • Uploaded on {new Date(doc.uploadedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
                          Pending Admin Verification
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Add Education Modal */}
        {showAddEduModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
              <h3 className="text-base font-bold text-slate-900">Add Educational Credential</h3>

              <form onSubmit={handleAddEducation} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Degree Level</label>
                  <select
                    value={eduLevel}
                    onChange={(e: any) => setEduLevel(e.target.value)}
                    className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-900"
                  >
                    <option value="GRADUATION">Graduation (Bachelor&apos;s / Honours)</option>
                    <option value="HSC">Higher Secondary (HSC / A-Level)</option>
                    <option value="SSC">Secondary (SSC / O-Level)</option>
                    <option value="POST_GRADUATION">Post-Graduation (Master&apos;s)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Institution / University Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={eduInstitution}
                    onChange={(e) => setEduInstitution(e.target.value)}
                    placeholder="e.g. BUET or Notre Dame College"
                    className="w-full h-11 rounded-xl border border-slate-200 px-3 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Department / Group / Major
                  </label>
                  <input
                    type="text"
                    value={eduDepartment}
                    onChange={(e) => setEduDepartment(e.target.value)}
                    placeholder="e.g. CSE or Science"
                    className="w-full h-11 rounded-xl border border-slate-200 px-3 text-xs text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Passing Year</label>
                    <input
                      type="number"
                      required
                      value={eduPassingYear}
                      onChange={(e) => setEduPassingYear(e.target.value)}
                      className="w-full h-11 rounded-xl border border-slate-200 px-3 text-xs text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Result (GPA/CGPA)</label>
                    <input
                      type="text"
                      value={eduGpa}
                      onChange={(e) => setEduGpa(e.target.value)}
                      placeholder="e.g. 3.88 or 5.0"
                      className="w-full h-11 rounded-xl border border-slate-200 px-3 text-xs text-slate-900"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAddEduModal(false)}
                    className="text-xs font-bold"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={saving}
                    size="sm"
                    className="bg-[#0675c1] hover:bg-[#125a9c] text-white font-bold text-xs"
                  >
                    {saving ? "Saving..." : "Add Credential"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
