"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Home,
  Monitor,
  Users2,
  Package,
  Clock,
  Sparkles,
  ShieldCheck,
  Send,
  Loader2,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function HireATutorPage() {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form State
  // Step 1: Tuition Details
  const [tuitionType, setTuitionType] = useState("Home Tutoring");
  const [category, setCategory] = useState("English Medium");
  const [className, setClassName] = useState("Class 5");

  // Step 2: Student & Schedule Info
  const [noOfStudents, setNoOfStudents] = useState(1);
  const [studentGender, setStudentGender] = useState<"Male" | "Female">("Male");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([
    "Mathematics",
    "English",
    "Science",
  ]);
  const [customSubject, setCustomSubject] = useState("");
  const [tutoringDaysPerWeek, setTutoringDaysPerWeek] = useState(3);
  const [tutoringTime, setTutoringTime] = useState("Evening (After 5:30 PM)");

  // Step 3: Location, Budget, Preferences & Contact
  const [city, setCity] = useState("Dhaka");
  const [location, setLocation] = useState("Dhanmondi");
  const [detailedAddress, setDetailedAddress] = useState("");
  const [preferredTutorGender, setPreferredTutorGender] = useState<"Any" | "Male" | "Female">("Any");
  const [otherRequirements, setOtherRequirements] = useState("");
  const [salary, setSalary] = useState("8,000");
  const [guardianName, setGuardianName] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(true);

  // Fetch current user session
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.authenticated && data.user) {
          setCurrentUser(data.user);
          if (data.user.name) setGuardianName(data.user.name);
          if (data.user.phone) setGuardianPhone(data.user.phone);
        }
      })
      .catch(() => {});
  }, []);

  const categories = [
    "Bangla Medium",
    "English Medium",
    "English Version",
    "Religious Studies",
    "Admission Test",
    "Arts",
    "Language Learning",
    "Test Prep",
    "Professional Skills",
    "Special Skills",
    "Uni Help",
    "Madrasah",
    "Special Child",
  ];

  const getClassOptions = (cat: string) => {
    switch (cat) {
      case "English Medium":
        return ["Play", "Nursery", "KG", "Standard 1", "Standard 2", "Standard 3", "Standard 4", "Standard 5", "Standard 6", "Standard 7", "Standard 8", "O Level", "A Level"];
      case "Bangla Medium":
        return ["Play", "KG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10 (SSC)", "HSC 1st Year", "HSC 2nd Year"];
      case "English Version":
        return ["Play", "KG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10 (SSC)", "HSC 1st Year", "HSC 2nd Year"];
      case "Religious Studies":
        return ["Noorani Qaida", "Nazira", "Hifzul Quran", "Tajweed & Qirat", "Basic Islamic Studies", "Arabic Grammar"];
      case "Admission Test":
        return ["Engineering (BUET/CKRUET)", "Medical (MBBS/BDS)", "Dhaka University (KA/KHA/GA)", "IBA (DU/JU)", "Private University (NSU/BRAC)"];
      case "Language Learning":
        return ["Spoken English", "IELTS Preparation", "Arabic Language", "French", "German", "Japanese"];
      default:
        return ["Beginner", "Intermediate", "Advanced", "Professional", "Custom Grade"];
    }
  };

  const commonSubjects = [
    "Mathematics",
    "English",
    "Science",
    "Physics",
    "Chemistry",
    "Biology",
    "Higher Mathematics",
    "Bangla",
    "ICT / Computer",
    "Accounting",
    "Economics",
    "Holy Quran & Tajweed",
    "All General Subjects",
  ];

  const cities = ["Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna", "Gazipur", "Narayanganj"];
  const popularLocations = [
    "Dhanmondi",
    "Mohammadpur",
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
    "Lalmatia",
    "Badda",
    "Malibagh",
    "Shantinagar",
    "Panthapath",
    "Farmgate",
    "Old Dhaka",
    "Online / Remote",
  ];

  const toggleSubject = (sub: string) => {
    if (selectedSubjects.includes(sub)) {
      if (selectedSubjects.length > 1) {
        setSelectedSubjects(selectedSubjects.filter((s) => s !== sub));
      }
    } else {
      setSelectedSubjects([...selectedSubjects, sub]);
    }
  };

  const handleAddCustomSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (customSubject.trim() && !selectedSubjects.includes(customSubject.trim())) {
      setSelectedSubjects([...selectedSubjects, customSubject.trim()]);
      setCustomSubject("");
    }
  };

  const handleNextStep1 = () => {
    setErrorMessage(null);
    setStep(2);
  };

  const handleNextStep2 = () => {
    setErrorMessage(null);
    if (selectedSubjects.length === 0) {
      setErrorMessage("Please select at least one subject.");
      return;
    }
    setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!termsAgreed) {
      setErrorMessage("Please accept the Terms & Conditions to proceed.");
      return;
    }

    if (!currentUser && (!guardianPhone || guardianPhone.length < 11)) {
      setErrorMessage("Please enter a valid 11-digit phone number.");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        title: `Need ${category} Tutor For ${className} (${tuitionType})`,
        tuitionType,
        category,
        className,
        subjects: selectedSubjects.join(", "),
        studentGender,
        preferredTutorGender,
        tutoringDaysPerWeek,
        tutoringTime,
        noOfStudents,
        salary,
        city,
        location,
        detailedAddress: detailedAddress || location,
        otherRequirements,
        guardianName: guardianName || currentUser?.name || "Guardian",
        guardianPhone: guardianPhone || currentUser?.phone,
      };

      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.message || "Failed to post tuition request.");
        setSubmitting(false);
        return;
      }

      router.push(`/hire-a-tutor/success?jobId=${data.job.id}`);
    } catch (err) {
      setErrorMessage("An unexpected network error occurred. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Wizard Header */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#0675c1]/10 text-[#0675c1] mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            Post Your Tuition in 3 Simple Steps
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">
            Hire the Best Tutor in Bangladesh
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto">
            Tell us your requirements and receive applications from verified, expert tutors from BUET, Medical, and DU within 30 minutes.
          </p>
        </div>

        {/* 3-Step Visual Progress Bar */}
        <div className="mb-8">
          <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
            {/* Step 1 Indicator */}
            <div
              onClick={() => step > 1 && setStep(1)}
              className={`cursor-pointer pb-3 border-b-4 transition-all ${
                step >= 1 ? "border-[#0675c1] text-[#0675c1]" : "border-slate-200 text-slate-400"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    step >= 1 ? "bg-[#0675c1] text-white" : "bg-slate-200 text-slate-500"
                  }`}
                >
                  1
                </span>
                <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">
                  Tuition Type & Class
                </span>
              </div>
            </div>

            {/* Step 2 Indicator */}
            <div
              onClick={() => step > 2 && setStep(2)}
              className={`cursor-pointer pb-3 border-b-4 transition-all ${
                step >= 2 ? "border-[#0675c1] text-[#0675c1]" : "border-slate-200 text-slate-400"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    step >= 2 ? "bg-[#0675c1] text-white" : "bg-slate-200 text-slate-500"
                  }`}
                >
                  2
                </span>
                <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">
                  Student & Schedule
                </span>
              </div>
            </div>

            {/* Step 3 Indicator */}
            <div
              className={`pb-3 border-b-4 transition-all ${
                step === 3 ? "border-[#0675c1] text-[#0675c1]" : "border-slate-200 text-slate-400"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    step === 3 ? "bg-[#0675c1] text-white" : "bg-slate-200 text-slate-500"
                  }`}
                >
                  3
                </span>
                <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">
                  Location & Contact
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 rounded-xl bg-red-50 p-4 border border-red-200 flex items-center gap-3 text-red-700 text-sm">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
          {/* STEP 1: TUITION TYPE & CATEGORY */}
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Select Tuition Type */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-3">
                  Select Tuition Type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {[
                    {
                      id: "Home Tutoring",
                      icon: Home,
                      desc: "Tutor visits your home for personalized 1-on-1 offline tutoring.",
                    },
                    {
                      id: "Online Tutoring",
                      icon: Monitor,
                      desc: "Live interactive 1-on-1 sessions anywhere via Zoom or Google Meet.",
                    },
                    {
                      id: "Group Tutoring",
                      icon: Users2,
                      desc: "Small focused batch of students sharing the tuition.",
                    },
                    {
                      id: "Package Tutoring",
                      icon: Package,
                      desc: "Crash course or fixed term preparation for upcoming board exams.",
                    },
                  ].map((item) => {
                    const isSelected = tuitionType === item.id;
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setTuitionType(item.id)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3.5 ${
                          isSelected
                            ? "border-[#0675c1] bg-[#0675c1]/5 ring-1 ring-[#0675c1]"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                            isSelected ? "bg-[#0675c1] text-white" : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-slate-900">{item.id}</span>
                            {isSelected && <Check className="h-4 w-4 text-[#0675c1]" />}
                          </div>
                          <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Select Category */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-3">
                  Select Medium / Curriculum <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                  {categories.map((cat) => {
                    const isSelected = category === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          setCategory(cat);
                          setClassName(getClassOptions(cat)[0]);
                        }}
                        className={`px-3 py-2.5 rounded-xl text-xs font-bold text-left border transition-all ${
                          isSelected
                            ? "bg-[#0675c1] text-white border-[#0675c1] shadow-sm shadow-[#0675c1]/20"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100"
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Select Class / Grade */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  Select Student Class / Level <span className="text-red-500">*</span>
                </label>
                <select
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="w-full h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 focus:border-[#0675c1] focus:ring-1 focus:ring-[#0675c1]"
                >
                  {getClassOptions(category).map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>

              {/* Next Step Button */}
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <Button
                  onClick={handleNextStep1}
                  className="h-12 px-8 bg-[#0675c1] hover:bg-[#125a9c] text-white font-bold text-sm shadow-md shadow-[#0675c1]/20 gap-2"
                >
                  Continue to Step 2
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: STUDENT & SCHEDULE */}
          {step === 2 && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Number of Students & Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">
                    Number of Students <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setNoOfStudents(num)}
                        className={`flex-1 h-11 rounded-xl text-sm font-bold border transition-all ${
                          noOfStudents === num
                            ? "bg-[#0675c1] text-white border-[#0675c1]"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {num} {num === 1 ? "Student" : "Students"}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">
                    Student Gender <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    {(["Male", "Female"] as const).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setStudentGender(g)}
                        className={`flex-1 h-11 rounded-xl text-sm font-bold border transition-all ${
                          studentGender === g
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

              {/* Select Subjects */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  Select Required Subjects <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-slate-500 mb-3">
                  Click to select all subjects the tutor needs to teach:
                </p>
                <div className="flex flex-wrap gap-2">
                  {commonSubjects.map((sub) => {
                    const isSelected = selectedSubjects.includes(sub);
                    return (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => toggleSubject(sub)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? "bg-[#0675c1] text-white border-[#0675c1] shadow-xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100"
                        }`}
                      >
                        {isSelected && <Check className="h-3.5 w-3.5" />}
                        {sub}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Subject Input */}
                <div className="mt-3 flex gap-2">
                  <input
                    type="text"
                    value={customSubject}
                    onChange={(e) => setCustomSubject(e.target.value)}
                    placeholder="Add other subject (e.g. Statistics, Social Studies)..."
                    className="flex-1 h-10 rounded-xl border border-slate-200 px-3.5 text-xs text-slate-900 focus:border-[#0675c1] focus:ring-1 focus:ring-[#0675c1]"
                  />
                  <Button
                    type="button"
                    onClick={handleAddCustomSubject}
                    variant="outline"
                    size="sm"
                    className="text-xs font-bold"
                  >
                    Add Subject
                  </Button>
                </div>
              </div>

              {/* Tutoring Days per week & Shift */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">
                    Days Per Week <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    {[2, 3, 4, 5, 6].map((days) => (
                      <button
                        key={days}
                        type="button"
                        onClick={() => setTutoringDaysPerWeek(days)}
                        className={`flex-1 h-11 rounded-xl text-sm font-bold border transition-all ${
                          tutoringDaysPerWeek === days
                            ? "bg-[#0675c1] text-white border-[#0675c1]"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {days} Days
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">
                    Preferred Tutoring Time <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={tutoringTime}
                    onChange={(e) => setTutoringTime(e.target.value)}
                    className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-semibold text-slate-900 focus:border-[#0675c1] focus:ring-1 focus:ring-[#0675c1]"
                  >
                    <option value="Morning (8:00 AM - 12:00 PM)">Morning (8:00 AM - 12:00 PM)</option>
                    <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
                    <option value="Evening (After 5:30 PM)">Evening (After 5:30 PM)</option>
                    <option value="Night (After 7:30 PM)">Night (After 7:30 PM)</option>
                    <option value="Flexible / Negotiable">Flexible / Negotiable</option>
                  </select>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="h-12 px-6 font-bold text-sm gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={handleNextStep2}
                  className="h-12 px-8 bg-[#0675c1] hover:bg-[#125a9c] text-white font-bold text-sm shadow-md shadow-[#0675c1]/20 gap-2"
                >
                  Continue to Step 3
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: LOCATION, BUDGET, TUTOR PREFERENCE & CONTACT */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-200">
              {/* Location & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-semibold text-slate-900 focus:border-[#0675c1] focus:ring-1 focus:ring-[#0675c1]"
                  >
                    {cities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">
                    Area / Location <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-semibold text-slate-900 focus:border-[#0675c1] focus:ring-1 focus:ring-[#0675c1]"
                  >
                    {popularLocations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Detailed Address */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  Detailed Address / Nearby Landmark
                </label>
                <input
                  type="text"
                  value={detailedAddress}
                  onChange={(e) => setDetailedAddress(e.target.value)}
                  placeholder="e.g. House 42, Road 7/A, Near Abahani Field, Dhanmondi..."
                  className="w-full h-11 rounded-xl border border-slate-200 px-3.5 text-xs text-slate-900 focus:border-[#0675c1] focus:ring-1 focus:ring-[#0675c1]"
                />
              </div>

              {/* Preferred Tutor Gender & Salary Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">
                    Preferred Tutor Gender <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    {(["Any", "Male", "Female"] as const).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setPreferredTutorGender(g)}
                        className={`flex-1 h-11 rounded-xl text-xs font-bold border transition-all ${
                          preferredTutorGender === g
                            ? "bg-[#0675c1] text-white border-[#0675c1]"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {g === "Any" ? "Any Gender" : `${g} Tutor`}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">
                    Expected Salary (BDT / Month) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      placeholder="e.g. 7,000 or Negotiable"
                      className="w-full h-11 rounded-xl border border-slate-200 px-3.5 text-xs font-bold text-slate-900 focus:border-[#0675c1] focus:ring-1 focus:ring-[#0675c1]"
                    />
                    <span className="absolute right-3.5 top-3 text-[11px] font-bold text-slate-400">
                      BDT/mo
                    </span>
                  </div>
                </div>
              </div>

              {/* Special Requirements */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  Special Requirements / Preferred University
                </label>
                <textarea
                  rows={2}
                  value={otherRequirements}
                  onChange={(e) => setOtherRequirements(e.target.value)}
                  placeholder="e.g. Tutor must be from BUET / Dhaka University / English Medium background with proven teaching experience..."
                  className="w-full rounded-xl border border-slate-200 p-3.5 text-xs text-slate-900 focus:border-[#0675c1] focus:ring-1 focus:ring-[#0675c1]"
                />
              </div>

              {/* Contact Information (If guest or not logged in) */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                  <ShieldCheck className="h-4 w-4 text-[#00a65a]" />
                  Guardian Contact & Verification
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={guardianName}
                      onChange={(e) => setGuardianName(e.target.value)}
                      placeholder="e.g. Nasreen Sultana"
                      className="w-full h-10 rounded-lg border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:border-[#0675c1] focus:ring-1 focus:ring-[#0675c1]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      11-Digit Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={guardianPhone}
                      onChange={(e) => setGuardianPhone(e.target.value)}
                      placeholder="e.g. 01711XXXXXX"
                      disabled={!!currentUser}
                      className="w-full h-10 rounded-lg border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:border-[#0675c1] focus:ring-1 focus:ring-[#0675c1] disabled:bg-slate-100 disabled:text-slate-500"
                    />
                  </div>
                </div>
                {!currentUser && (
                  <p className="text-[11px] text-slate-500">
                    A free Guardian account will be created automatically for this number so you can track tutor applications and schedule free demo classes.
                  </p>
                )}
              </div>

              {/* Terms Agreement Checkbox */}
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600">
                <input
                  type="checkbox"
                  checked={termsAgreed}
                  onChange={(e) => setTermsAgreed(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#0675c1] focus:ring-[#0675c1]"
                />
                <span>
                  I agree to the{" "}
                  <Link href="/terms-condition" className="text-[#0675c1] font-bold hover:underline">
                    Terms & Conditions
                  </Link>{" "}
                  and acknowledge that TutorBari provides 100% verified tutors with a free replacement guarantee.
                </span>
              </label>

              {/* Navigation Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  variant="outline"
                  className="h-12 px-6 font-bold text-sm gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="h-12 px-8 bg-[#00a65a] hover:bg-[#008f4c] text-white font-bold text-sm shadow-md shadow-[#00a65a]/20 gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Posting Tuition...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit & Find Tutors
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
