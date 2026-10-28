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
  ShieldCheck,
  Send,
  Loader2,
  Check,
  Phone,
  Sparkles,
  Award,
  Clock,
  HeartHandshake,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function HireATutorPage() {
  const router = useRouter();

  // Phase: 1 = Phone Number input ("Please give us your number"), 2 = Details form ("Please give us your details")
  const [phase, setPhase] = useState<1 | 2>(1);
  const [activeSlide, setActiveSlide] = useState(0);

  // Form State
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Dhaka");
  const [location, setLocation] = useState("Dhanmondi");
  const [category, setCategory] = useState("English Medium");
  const [className, setClassName] = useState("Class 8");
  const [subjects, setSubjects] = useState("Mathematics, English, Science");
  const [tutoringDaysPerWeek, setTutoringDaysPerWeek] = useState(3);
  const [preferredTutorGender, setPreferredTutorGender] = useState<"Any" | "Male" | "Female">("Any");
  const [salary, setSalary] = useState("8,000");
  const [description, setDescription] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(true);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Check existing session
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.authenticated && data.user) {
          setCurrentUser(data.user);
          if (data.user.phone) setPhoneNumber(data.user.phone);
          if (data.user.name) setName(data.user.name);
          setPhase(2);
        }
      })
      .catch(() => {});
  }, []);

  // Auto-cycle the benefit slides
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

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

  const popularLocations = [
    "Dhanmondi",
    "Gulshan 1",
    "Gulshan 2",
    "Banani",
    "Uttara Sector 1-7",
    "Uttara Sector 8-14",
    "Mirpur 1",
    "Mirpur 2",
    "Mirpur 10",
    "Bashundhara R/A",
    "Mohammadpur",
    "Banasree",
    "Badda",
    "Malibagh",
    "Panthapath",
    "Farmgate",
    "Lalmatia",
    "Khilgaon",
    "Shantinagar",
  ];

  const categories = [
    "English Medium",
    "Bangla Medium",
    "English Version",
    "Religious Studies",
    "Admission Test",
    "Arts",
    "Language Learning",
    "Test Preparation",
    "Professional Skill",
    "Special Skill",
    "Uni Help",
    "Madrasa Medium",
    "Special Child Education",
  ];

  // Handle Phase 1 Submit
  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 11) {
      setErrorMessage("Please enter a valid 11-digit mobile number (e.g. 01756441122)");
      return;
    }

    setLoading(true);

    try {
      // POST to /api/leads/new like Caretutors
      await fetch("/api/leads/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: cleanPhone,
          name: name || "Guardian",
          address: location,
          description: "Initiated hire-a-tutor request",
        }),
      }).catch(() => {});

      setPhoneNumber(cleanPhone);
      setPhase(2);
    } finally {
      setLoading(false);
    }
  };

  // Handle Final Submission
  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!termsAgreed) {
      setErrorMessage("Please accept the Terms of Use and Privacy Policy.");
      return;
    }

    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }

    if (!address.trim()) {
      setErrorMessage("Please enter your detailed address.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        title: `Need ${category} Tutor For ${className} (${city}, ${location})`,
        tuitionType: "Home Tutoring",
        category,
        className,
        subjects,
        studentGender: "Male",
        preferredTutorGender,
        tutoringDaysPerWeek,
        tutoringTime: "Evening (After 5:30 PM)",
        noOfStudents: 1,
        salary,
        city,
        location,
        detailedAddress: address,
        otherRequirements: description,
        guardianName: name,
        guardianPhone: phoneNumber,
      };

      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.message || "Failed to submit tuition request.");
        setLoading(false);
        return;
      }

      router.push(`/hire-a-tutor/success?jobId=${data.job.id}`);
    } catch (err) {
      setErrorMessage("Network error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="py-10 lg:py-16 bg-slate-50 min-h-[85vh] flex items-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* LEFT COLUMN: Visual Illustrations & Trust Badges (Caretutors Style) */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0675c1]/5 to-emerald-50/50 p-8 sm:p-10 border border-slate-200">
              {/* Slider Content */}
              <div className="min-h-[220px] flex flex-col justify-center">
                {activeSlide === 0 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-[#0675c1]/10 text-[#0675c1]">
                      <Sparkles className="h-4 w-4" />
                      Bangladesh&apos;s Most Trusted Tutor Platform
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                      Hire Verified Tutors from BUET, Medical &amp; DU in 30 Minutes
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Over 50,000+ parents trust TutorBari to find background-checked, top-tier academic mentors for their children.
                    </p>
                  </div>
                )}

                {activeSlide === 1 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-[#00a65a]/10 text-[#00a65a]">
                      <HeartHandshake className="h-4 w-4" />
                      100% Risk-Free Guarantee
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                      Free Demo Class &amp; 48-Hour Replacement Guarantee
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Take 1-2 trial classes at home with zero financial commitment. Only confirm if you are 100% satisfied.
                    </p>
                  </div>
                )}

                {activeSlide === 2 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-700">
                      <Award className="h-4 w-4" />
                      13 Specialized Mediums
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                      English Medium, Bangla, English Version &amp; Admission Test
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Tailored guidance for Cambridge, Edexcel, NCTB, Medical, BUET engineering and Quranic studies nationwide.
                    </p>
                  </div>
                )}
              </div>

              {/* Slider Dots Indicator */}
              <div className="flex items-center gap-2 mt-6">
                {[0, 1, 2].map((idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveSlide(idx)}
                    className={`h-2.5 rounded-full transition-all ${
                      activeSlide === idx ? "w-8 bg-[#0675c1]" : "w-2.5 bg-slate-300"
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* 3 Metric Pills */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="text-xl sm:text-2xl font-black text-[#0675c1]">50,000+</div>
                <div className="text-[11px] font-semibold text-slate-500 mt-1">Verified Tutors</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="text-xl sm:text-2xl font-black text-[#00a65a]">98.4%</div>
                <div className="text-[11px] font-semibold text-slate-500 mt-1">Parent Satisfaction</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="text-xl sm:text-2xl font-black text-slate-900">৳0</div>
                <div className="text-[11px] font-semibold text-slate-500 mt-1">Parent Fee</div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: The Exact Caretutors Form Card */}
          <div className="w-full lg:w-1/2">
            <div className="rounded-2xl border border-[rgba(6,53,85,0.16)] bg-white p-6 sm:p-10 shadow-sm text-left">
              {/* Caretutors Header */}
              <div className="mb-6">
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0675c1]">
                  Need Tutor?
                </h1>
                <p className="text-base sm:text-lg text-slate-600 mt-1 font-medium">
                  {phase === 1 ? "Please give us your number" : "Please give us your details"}
                </p>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="mb-6 rounded-xl bg-red-50 p-3.5 border border-red-200 flex items-start gap-2.5 text-xs text-red-700">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* PHASE 1: Caretutors Phone Input */}
              {phase === 1 && (
                <form onSubmit={handlePhoneSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        autoFocus
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="E.g: 01756441122"
                        className="w-full border-b border-black/40 py-2.5 text-base text-slate-900 focus:border-b-2 focus:border-[#0675c1] focus:outline-none transition-all placeholder:text-slate-400 font-medium"
                      />
                      <Phone className="absolute right-2 top-3 h-4 w-4 text-slate-400" />
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      Enter your 11-digit mobile number to connect with qualified tutors in your area.
                    </p>
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="group flex w-fit items-center justify-between gap-4 h-12 px-8 bg-[#0675c1] hover:bg-[#125a9c] text-white font-bold text-sm rounded-xl shadow-md shadow-[#0675c1]/20 transition-all"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Continue
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}

              {/* PHASE 2: Caretutors Details Form */}
              {phase === 2 && (
                <form onSubmit={handleFinalSubmit} className="space-y-6 animate-in fade-in duration-200">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-1.5">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="E.g: Rafsan Chowdhury"
                      className="w-full border-b border-black/40 py-2 text-sm text-slate-900 focus:border-b-2 focus:border-[#0675c1] focus:outline-none placeholder:text-slate-400 font-medium"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-1.5">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="E.g: House: 14, Road: 7/A, Sector: 4, Dhanmondi, Dhaka"
                      className="w-full border-b border-black/40 py-2 text-sm text-slate-900 focus:border-b-2 focus:border-[#0675c1] focus:outline-none placeholder:text-slate-400 font-medium"
                    />
                  </div>

                  {/* City & Location Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        City <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full h-10 rounded-lg border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:border-[#0675c1] focus:outline-none font-semibold"
                      >
                        {cities.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Area / Thana <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full h-10 rounded-lg border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:border-[#0675c1] focus:outline-none font-semibold"
                      >
                        {popularLocations.map((loc) => (
                          <option key={loc} value={loc}>
                            {loc}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Category & Class */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Medium / Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full h-10 rounded-lg border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:border-[#0675c1] focus:outline-none font-semibold"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Class / Level <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        placeholder="e.g. Class 8 / O Level / SSC"
                        className="w-full h-10 rounded-lg border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:border-[#0675c1] focus:outline-none font-semibold"
                      />
                    </div>
                  </div>

                  {/* Subjects & Salary */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Subjects Needed <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={subjects}
                        onChange={(e) => setSubjects(e.target.value)}
                        placeholder="e.g. Mathematics, English, Physics"
                        className="w-full h-10 rounded-lg border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:border-[#0675c1] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Monthly Salary (BDT) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        placeholder="e.g. 8,000"
                        className="w-full h-10 rounded-lg border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:border-[#0675c1] focus:outline-none font-bold"
                      />
                    </div>
                  </div>

                  {/* Description (Caretutors textarea) */}
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-1.5">
                      Description / Specific Needs
                    </label>
                    <textarea
                      rows={2}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="E.g: English medium tutor is needed for 8th grade student. Tutor must be from BUET or Dhaka University."
                      className="w-full border-b border-black/40 py-2 text-sm text-slate-900 focus:border-b-2 focus:border-[#0675c1] focus:outline-none placeholder:text-slate-400 font-medium"
                    />
                  </div>

                  {/* Terms & Conditions */}
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
                        Terms of Use and Privacy Policy
                      </Link>
                    </span>
                  </label>

                  {/* Action Buttons */}
                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setPhase(1)}
                      className="text-xs font-bold text-slate-500 hover:text-slate-800"
                    >
                      ← Change Phone
                    </button>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="group flex w-fit items-center justify-between gap-4 h-12 px-8 bg-[#0675c1] hover:bg-[#125a9c] text-white font-bold text-sm rounded-xl shadow-md shadow-[#0675c1]/20 transition-all"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Submitting Request...
                        </>
                      ) : (
                        <>
                          Continue
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
