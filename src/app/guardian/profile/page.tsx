"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Shield,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Share2,
  HelpCircle,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function GuardianProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Profile state
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"Male" | "Female">("Male");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Dhaka");
  const [location, setLocation] = useState("Dhanmondi");
  const [detailedAddress, setDetailedAddress] = useState("");
  const [profession, setProfession] = useState("Private Service");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyContactNumber, setEmergencyContactNumber] = useState("");
  const [emergencyRelation, setEmergencyRelation] = useState("Spouse");
  const [emergencyAddress, setEmergencyAddress] = useState("");
  const [facebook, setFacebook] = useState("");
  const [hearAboutUs, setHearAboutUs] = useState("Facebook");
  const [profilePercentage, setProfilePercentage] = useState(80);

  const professions = [
    "Doctor",
    "Engineer",
    "Teacher / Professor",
    "Businessman / Entrepreneur",
    "Banker",
    "Government Official",
    "Defense Officer",
    "IT Specialist / Software Engineer",
    "Lawyer / Legal Practitioner",
    "Private Service",
    "Homemaker",
    "Other",
  ];

  const relations = [
    "Father",
    "Mother",
    "Spouse",
    "Brother",
    "Sister",
    "Uncle",
    "Aunt",
    "Relative",
    "Friend",
  ];

  const hearOptions = [
    "Facebook",
    "Google Search",
    "Friends & Family",
    "University Campus",
    "Newspaper / Advertisement",
    "YouTube",
    "LinkedIn",
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
    fetch("/api/guardian/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.profile) {
          const p = data.profile;
          setName(p.name || "");
          setGender(p.gender || "Male");
          setPhone(p.phone || "");
          setEmail(p.email || "");
          setCity(p.city || "Dhaka");
          setLocation(p.location || "Dhanmondi");
          setDetailedAddress(p.detailedAddress || "");
          setProfession(p.profession || "Private Service");
          setEmergencyName(p.emergencyName || "");
          setEmergencyContactNumber(p.emergencyContactNumber || "");
          setEmergencyRelation(p.emergencyRelation || "Spouse");
          setEmergencyAddress(p.emergencyAddress || "");
          setFacebook(p.facebook || "");
          setHearAboutUs(p.hearAboutUs || "Facebook");
          setProfilePercentage(p.profilePercentage || 80);
        }
      })
      .catch(() => setError("Failed to load profile data"))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/guardian/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          gender,
          city,
          location,
          detailedAddress,
          profession,
          emergencyName,
          emergencyContactNumber,
          emergencyRelation,
          emergencyAddress,
          facebook,
          hearAboutUs,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to update profile");
        setSaving(false);
        return;
      }

      setSuccess(true);
      if (data.profile?.profilePercentage) {
        setProfilePercentage(data.profile.profilePercentage);
      }
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError("Network error occurred.");
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
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/guardian/dashboard"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#0675c1] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
            Guardian Account
          </span>
        </div>

        {/* Completeness Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-[#0675c1]/10 border-2 border-[#0675c1] flex items-center justify-center text-[#0675c1] font-black text-xl">
                {name ? name.charAt(0).toUpperCase() : "G"}
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">{name || "Guardian Profile"}</h1>
                <p className="text-xs text-slate-500">{phone} • {email || "No email added"}</p>
              </div>
            </div>

            <div className="sm:text-right">
              <div className="flex items-center sm:justify-end gap-2 text-xs font-bold text-slate-700 mb-1">
                <span>Profile Completeness:</span>
                <span className="text-[#0675c1]">{profilePercentage}%</span>
              </div>
              <div className="w-full sm:w-48 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-[#0675c1] h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${profilePercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
          <div className="border-b border-slate-100 pb-4 mb-6">
            <h2 className="text-lg font-bold text-slate-900">Personal & Contact Information</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Keep your contact details up to date for smooth communication with tutors.
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
              <span>Guardian profile updated successfully!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Grid 1: Name & Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-[#0675c1] focus:ring-2 focus:ring-[#0675c1]/20 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-6 h-11">
                  {(["Male", "Female"] as const).map((g) => (
                    <label key={g} className="flex items-center gap-2 text-sm text-slate-800 font-medium cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={gender === g}
                        onChange={() => setGender(g)}
                        className="text-[#0675c1] focus:ring-[#0675c1]"
                      />
                      {g}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Grid 2: Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  disabled
                  value={phone}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-500 font-medium cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  disabled
                  value={email}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-500 font-medium cursor-not-allowed"
                />
              </div>
            </div>

            {/* Grid 3: City, Location & Profession */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
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
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-[#0675c1] focus:ring-2 focus:ring-[#0675c1]/20 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Profession
                </label>
                <select
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-[#0675c1] focus:ring-2 focus:ring-[#0675c1]/20 font-medium"
                >
                  {professions.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
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
                placeholder="e.g. House 14, Road 5, Sector 4, Uttara, Dhaka"
                className="w-full p-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-[#0675c1] focus:ring-2 focus:ring-[#0675c1]/20 font-medium"
              />
            </div>

            {/* Emergency Contact Section */}
            <div className="pt-6 border-t border-slate-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-1">
                Emergency Contact Details
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Secondary contact person in case of urgent tuition or payment matters.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Contact Name
                  </label>
                  <input
                    type="text"
                    value={emergencyName}
                    onChange={(e) => setEmergencyName(e.target.value)}
                    placeholder="e.g. Mohammad Hossain"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-[#0675c1] font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Emergency Phone Number
                  </label>
                  <input
                    type="tel"
                    value={emergencyContactNumber}
                    onChange={(e) => setEmergencyContactNumber(e.target.value)}
                    placeholder="e.g. 01811000000"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-[#0675c1] font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Relationship
                  </label>
                  <select
                    value={emergencyRelation}
                    onChange={(e) => setEmergencyRelation(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-[#0675c1] font-medium"
                  >
                    {relations.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Emergency Address
                </label>
                <input
                  type="text"
                  value={emergencyAddress}
                  onChange={(e) => setEmergencyAddress(e.target.value)}
                  placeholder="e.g. Dhaka, Bangladesh"
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-[#0675c1] font-medium"
                />
              </div>
            </div>

            {/* Social & Referral */}
            <div className="pt-6 border-t border-slate-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4">
                Social Profile & Referral
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Facebook Profile Link
                  </label>
                  <input
                    type="url"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                    placeholder="https://facebook.com/username"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-[#0675c1] font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    How did you hear about us?
                  </label>
                  <select
                    value={hearAboutUs}
                    onChange={(e) => setHearAboutUs(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-[#0675c1] font-medium"
                  >
                    {hearOptions.map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
              <Button
                type="submit"
                disabled={saving}
                className="h-11 px-8 bg-[#0675c1] hover:bg-[#125a9c] text-white font-bold text-sm shadow-md shadow-[#0675c1]/20"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Profile
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
