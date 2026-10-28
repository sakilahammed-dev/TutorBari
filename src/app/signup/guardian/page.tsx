"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Sparkles,
  ShieldCheck,
  Award,
  HeartHandshake,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function GuardianSignUpPage() {
  const router = useRouter();

  // Caretutors Form States
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"Male" | "Female">("Male");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Dhaka");
  const [location, setLocation] = useState("Dhanmondi");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(true);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

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
  ];

  // Auto-cycle the benefit slides
  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!termsAgreed) {
      setErrorMessage("You must agree to the Terms of Use and Privacy Policy.");
      return;
    }

    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 11) {
      setErrorMessage("Please enter a valid 11-digit Bangladeshi mobile number.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone: cleanPhone,
          email: email || undefined,
          password,
          gender,
          city,
          location,
          role: "GUARDIAN",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.message || "Registration failed. Please try again.");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/hire-a-tutor");
      }, 1200);
    } catch (err) {
      setErrorMessage("Network connection error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="py-10 lg:py-16 bg-slate-50 min-h-[85vh] flex items-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* LEFT COLUMN: Visual Illustrations & Slider for Guardians (Caretutors Style) */}
          <div className="w-full lg:w-5/12 space-y-6">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0675c1]/5 to-emerald-50/50 p-8 sm:p-10 border border-slate-200">
              <div className="min-h-[220px] flex flex-col justify-center">
                {activeSlide === 0 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-[#0675c1]/10 text-[#0675c1]">
                      <Sparkles className="h-4 w-4" />
                      Zero Hassle Tutor Hiring
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                      Post Your Tuition Needs &amp; Receive Top CVs in 30 Minutes
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Say goodbye to unreliable references. TutorBari connects your child with background-checked tutors from BUET, Medical &amp; DU.
                    </p>
                  </div>
                )}

                {activeSlide === 1 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-[#00a65a]/10 text-[#00a65a]">
                      <HeartHandshake className="h-4 w-4" />
                      Free Trial Classes
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                      Take 1-2 Free Demo Classes at Your Home
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Evaluate teaching methodology and rapport before confirming any payment. 100% peace of mind guaranteed.
                    </p>
                  </div>
                )}

                {activeSlide === 2 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-700">
                      <ShieldCheck className="h-4 w-4" />
                      Safe &amp; Verified
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                      Instant Replacement If You Are Not Satisfied
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Our support team provides immediate tutor replacements anytime without any extra fee.
                    </p>
                  </div>
                )}
              </div>

              {/* Slider Dots */}
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
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="text-lg font-black text-[#0675c1]">50,000+</div>
                <div className="text-[10px] font-bold text-slate-500">Tutors Available</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="text-lg font-black text-[#00a65a]">48h</div>
                <div className="text-[10px] font-bold text-slate-500">Free Replacement</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="text-lg font-black text-slate-900">৳0</div>
                <div className="text-[10px] font-bold text-slate-500">Zero Parent Fee</div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Caretutors Exact Guardian Registration Form */}
          <div className="w-full lg:w-7/12">
            <div className="rounded-2xl border border-[rgba(6,53,85,0.16)] bg-white p-6 sm:p-10 shadow-sm text-left">
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-2xl sm:text-4xl font-semibold text-[#0675c1]">
                  Register as a <span className="capitalize text-[#0675c1]">Guardian/Student</span>
                </h1>
                <p className="text-lg text-slate-900 mt-1">Sign Up to Continue</p>
              </div>

              {/* Alerts */}
              {errorMessage && (
                <div className="mb-6 rounded-xl bg-red-50 p-3.5 border border-red-200 flex items-start gap-2.5 text-xs text-red-700">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}
              {success && (
                <div className="mb-6 rounded-xl bg-emerald-50 p-3.5 border border-emerald-200 flex items-center gap-2.5 text-xs text-emerald-800">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#00a65a]" />
                  <span>Guardian account created successfully! Redirecting...</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Row 1: Name & Gender */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                    <label className="block text-sm font-semibold text-slate-800 mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Rafsan Chowdhury"
                      className="w-full border-b border-black/50 py-2 text-sm text-slate-900 focus:border-b-2 focus:border-[#0675c1] focus:outline-none placeholder:text-slate-400 font-medium"
                    />
                  </div>

                  <div className="md:w-1/2">
                    <span className="block text-sm font-semibold text-slate-800 mb-2">
                      Gender <span className="text-red-500">*</span>
                    </span>
                    <div className="flex items-center gap-6 pt-1">
                      <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700">
                        <input
                          type="radio"
                          name="guardianGender"
                          value="Male"
                          checked={gender === "Male"}
                          onChange={() => setGender("Male")}
                          className="h-4 w-4 text-[#0675c1] focus:ring-[#0675c1]"
                        />
                        Male
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700">
                        <input
                          type="radio"
                          name="guardianGender"
                          value="Female"
                          checked={gender === "Female"}
                          onChange={() => setGender("Female")}
                          className="h-4 w-4 text-[#0675c1] focus:ring-[#0675c1]"
                        />
                        Female
                      </label>
                    </div>
                  </div>
                </div>

                {/* Row 2: Phone & Email */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                    <label className="block text-sm font-semibold text-slate-800 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="01756441122"
                      className="w-full border-b border-black/50 py-2 text-sm text-slate-900 focus:border-b-2 focus:border-[#0675c1] focus:outline-none placeholder:text-slate-400 font-medium"
                    />
                  </div>

                  <div className="md:w-1/2">
                    <label className="block text-sm font-semibold text-slate-800 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full border-b border-black/50 py-2 text-sm text-slate-900 focus:border-b-2 focus:border-[#0675c1] focus:outline-none placeholder:text-slate-400 font-medium"
                    />
                  </div>
                </div>

                {/* Row 3: City & Location */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                    <label className="block text-sm font-semibold text-slate-800 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full border-b border-black/50 bg-white py-2 text-sm text-slate-900 focus:border-b-2 focus:border-[#0675c1] focus:outline-none font-medium"
                    >
                      {cities.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:w-1/2">
                    <label className="block text-sm font-semibold text-slate-800 mb-1">
                      Location / Thana <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full border-b border-black/50 bg-white py-2 text-sm text-slate-900 focus:border-b-2 focus:border-[#0675c1] focus:outline-none font-medium"
                    >
                      {popularLocations.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 4: Password & Confirm Password */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2 relative">
                    <label className="block text-sm font-semibold text-slate-800 mb-1">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="********"
                      className="w-full border-b border-black/50 py-2 pr-8 text-sm text-slate-900 focus:border-b-2 focus:border-[#0675c1] focus:outline-none font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-7 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>

                  <div className="md:w-1/2 relative">
                    <label className="block text-sm font-semibold text-slate-800 mb-1">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="********"
                      className="w-full border-b border-black/50 py-2 pr-8 text-sm text-slate-900 focus:border-b-2 focus:border-[#0675c1] focus:outline-none font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-0 top-7 text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="pt-2">
                  <label className="flex items-center cursor-pointer text-xs text-slate-600">
                    <input
                      type="checkbox"
                      checked={termsAgreed}
                      onChange={(e) => setTermsAgreed(e.target.checked)}
                      className="mr-2.5 h-4 w-4 rounded border-slate-300 text-[#0675c1] focus:ring-[#0675c1]"
                    />
                    <span>
                      I agree to the{" "}
                      <Link href="/terms-condition" className="text-[#0675c1] underline font-semibold">
                        Terms of Use and Privacy Policy
                      </Link>
                    </span>
                  </label>
                </div>

                {/* Submit & Sign In */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="group flex w-fit items-center justify-between gap-5 h-12 px-8 bg-[#0675c1] hover:bg-[#125a9c] text-white font-bold text-sm rounded-xl shadow-md shadow-[#0675c1]/20 transition-all"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Signing Up...
                      </>
                    ) : (
                      <>
                        Sign Up
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-slate-600">
                    Already have an account?{" "}
                    <Link href="/signin" className="font-bold text-[#0675c1] hover:underline">
                      Sign In
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
