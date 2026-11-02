import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Users,
  MapPin,
  Laptop,
  Home as HomeIcon,
  Layers,
  GraduationCap,
  Star,
  Smartphone,
  ChevronRight,
  ShieldCheck,
  FileCheck,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroCoverflowCarousel } from "@/components/home/HeroCoverflowCarousel";
import { CategoriesAutoCarousel } from "@/components/home/CategoriesAutoCarousel";
import TestimonialReel from "@/components/home/TestimonialReel";
import testimonialsData from "@/data/testimonials.json";

export default function HomePage() {
  const stats = [
    { label: "Active Tutors", value: "350,000+" },
    { label: "Live Tuition Jobs", value: "3,200+" },
    { label: "Happy Students", value: "95,000+" },
    { label: "Average Tutor Rating", value: "4.9 / 5" },
  ];

  const popularCities = [
    "Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna",
    "Gazipur", "Narayanganj", "Cumilla", "Barishal", "Mymensingh", "Rangpur"
  ];

  const tuitionTypes = [
    {
      title: "Home Tutoring",
      desc: "Home tutoring allows students to learn various subjects in their own home.",
      icon: "/landing_page/hometutor.svg",
    },
    {
      title: "Group Tutoring",
      desc: "Group tutoring allows students to learn together and solve problems at an affordable cost.",
      icon: "/landing_page/groupclass.svg",
    },
    {
      title: "Online Tutoring",
      desc: "Hire the best tutors from anywhere and take online classes by using tools such as Google Meet, Zoom and more.",
      icon: "/landing_page/onlinetutor.svg",
    },
    {
      title: "Package Tutoring",
      desc: "Package tutoring helps students to complete their studies within a specific time frame.",
      icon: "/landing_page/package.svg",
    },
  ];

  const newsLogos = [
    { name: "The Daily Star", src: "/news/news02.png" },
    { name: "Daily Ittefaq", src: "/news/news03.png" },
    { name: "Dhaka Tribune", src: "/news/news04.png" },
    { name: "Prothom Alo", src: "/news/news05.png" },
    { name: "Kaler Kantho", src: "/news/news08.png" },
    { name: "Samakal", src: "/news/news09.png" },
    { name: "Bangladesh Pratidin", src: "/news/news12.png" },
    { name: "Tech in Asia", src: "/news/news13.png" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Hero Section (Caretutors 1:1 Layout) */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-20 bg-gradient-to-b from-sky-50/40 via-white to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-sky-100/80 px-3.5 py-1 text-xs font-semibold text-[#0675c1] mb-5 border border-sky-200">
                <span className="flex h-2 w-2 rounded-full bg-[#0675c1] animate-pulse" />
                <span>#1 Platform for All Tutors in Bangladesh</span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-5xl xl:text-6xl leading-[1.15]">
                Hire the Right{" "}
                <span className="text-[#0675c1]">Tutor</span> Today
              </h1>

              <p className="mt-4 text-base text-slate-600 sm:text-lg max-w-xl leading-relaxed">
                Select from 350,000+ verified tutors for individual or group classes. Both online and offline tutoring available across Bangladesh.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <Link href="/hire-a-tutor">
                  <Button size="lg" className="w-full sm:w-auto bg-[#0675c1] hover:bg-[#05619e] text-white font-bold h-12 px-8 rounded-xl shadow-lg shadow-[#0675c1]/25 text-base">
                    Hire a Tutor
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <div className="flex items-center justify-center sm:justify-start px-2 py-1">
                  <p className="text-sm text-slate-600">
                    Want to become a Tutor?{" "}
                    <Link href="/signup/tutor" className="font-bold text-[#0675c1] hover:underline">
                      Sign Up now
                    </Link>
                  </p>
                </div>
              </div>

              {/* Feature Points */}
              <div className="mt-8 pt-6 border-t border-slate-200/80 w-full grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#0675c1] shrink-0" />
                  <span className="font-medium">100% Free Tutor Request</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#0675c1] shrink-0" />
                  <span className="font-medium">Verified Tutors (NID & ID)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#0675c1] shrink-0" />
                  <span className="font-medium">No Prepayment Required</span>
                </div>
              </div>
            </div>

            {/* Right Column: Caretutors 1:1 3D Hero Coverflow Carousel */}
            <div className="lg:col-span-6 w-full flex items-center justify-center">
              <HeroCoverflowCarousel />
            </div>

          </div>
        </div>
      </section>

      {/* 2. Tuition Types (Caretutors 1:1 - 5 Types with SVGs & Border Hover) */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Tuition Types
            </h2>
            <p className="mt-2.5 text-center text-slate-500 text-sm md:text-base">
              Find the Best Tuition Type that Suits You
            </p>
          </div>

          {/* 2x2 Grid for first 4 types */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-7">
            {tuitionTypes.map((t, idx) => (
              <div
                key={idx}
                className="flex h-fit gap-6 rounded-2xl border border-[#0675c1] p-5 transition-all duration-200 ease-in-out hover:border-2 hover:bg-sky-50/20 md:h-[9.5rem] lg:gap-8 items-center bg-white shadow-sm"
              >
                <div className="relative shrink-0 w-20 h-20 flex items-center justify-center">
                  <Image
                    src={t.icon}
                    alt={t.title}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0675c1] mb-1.5">
                    {t.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {t.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 5th Centered Card: Shadow Tutoring */}
          <div className="mx-auto mt-6 flex h-fit w-full md:w-3/5 lg:w-1/2 gap-6 rounded-2xl border border-[#0675c1] p-5 transition-all duration-200 ease-in-out hover:border-2 hover:bg-sky-50/20 md:h-[9.5rem] lg:gap-8 items-center bg-white shadow-sm">
            <div className="relative shrink-0 w-20 h-20 flex items-center justify-center">
              <Image
                src="/landing_page/shadow_tutoring.svg"
                alt="Shadow Tutoring"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0675c1] mb-1.5">
                Shadow Tutoring
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                The tutor will help the student manage school, routine, and simple daily needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How does it work for guardians/students? (Caretutors 1:1 Alternating 3 Steps with Curved Connectors) */}
      <section className="py-14 sm:py-20 bg-slate-50/60 border-y border-slate-200/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight sm:text-4xl">
              How does it work for guardians/students?
            </h2>
            <p className="mt-2.5 text-center text-slate-500 text-sm md:text-base">
              Hire the right tutor by following the simple steps.
            </p>
          </div>

          <div className="space-y-4">
            {/* Step 1: Left aligned */}
            <div className="relative flex items-center justify-between rounded-2xl bg-white p-6 shadow-sm border border-slate-200/70">
              <div className="flex items-center gap-6 md:gap-10 p-2 md:w-4/5">
                <Image
                  src="/categories/guardianSep1.png"
                  alt="Submit Requirement"
                  width={150}
                  height={150}
                  className="size-24 sm:size-32 md:size-40 shrink-0 object-contain"
                />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0675c1] bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100">
                    Step 01
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2 mb-1.5">
                    Submit Requirement
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Submit your needs in details so qualified tutors can apply directly to your tuition job.
                  </p>
                </div>
              </div>
              <div className="-mb-24 hidden md:inline-flex h-[130px] w-[180px] shrink-0">
                <svg viewBox="0 0 229 173" fill="none" className="w-full h-full">
                  <path
                    d="M0 3H152C192.869 3 226 36.1309 226 77V173"
                    stroke="#0675C1"
                    strokeWidth="3.5"
                    strokeDasharray="8 8"
                  />
                </svg>
              </div>
            </div>

            {/* Step 2: Right aligned */}
            <div className="relative flex items-center justify-between rounded-2xl bg-white p-6 shadow-sm border border-slate-200/70">
              <div className="-mb-24 hidden md:inline-flex h-[130px] w-[180px] shrink-0">
                <svg viewBox="0 0 229 173" fill="none" className="w-full h-full">
                  <path
                    d="M229 3H77C36.1309 3 3.00001 36.1309 3.00001 77V173"
                    stroke="#0675C1"
                    strokeWidth="3.5"
                    strokeDasharray="8 8"
                  />
                </svg>
              </div>
              <div className="flex items-center gap-6 md:gap-10 p-2 md:w-4/5 justify-end text-right">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0675c1] bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100">
                    Step 02
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2 mb-1.5">
                    Shortlist Tutors
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Select the best match from applied tutors, review their verified credentials, and schedule trial classes.
                  </p>
                </div>
                <Image
                  src="/categories/guardianSep2.png"
                  alt="Shortlist Tutors"
                  width={150}
                  height={150}
                  className="size-24 sm:size-32 md:size-40 shrink-0 object-contain"
                />
              </div>
            </div>

            {/* Step 3: Left aligned */}
            <div className="relative flex items-center justify-between rounded-2xl bg-white p-6 shadow-sm border border-slate-200/70">
              <div className="flex items-center gap-6 md:gap-10 p-2 md:w-4/5">
                <Image
                  src="/categories/guardianSep.png"
                  alt="Confirm Hiring"
                  width={150}
                  height={150}
                  className="size-24 sm:size-32 md:size-40 shrink-0 object-contain"
                />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0675c1] bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100">
                    Step 03
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2 mb-1.5">
                    Confirm Hiring
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Take trial classes to evaluate teaching quality, confirm your selected tutor, and start learning with complete safety.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Serving Categories (Caretutors 1:1 Auto-Slider with Tall Card & 220x220 Pictures) */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CategoriesAutoCarousel />
        </div>
      </section>

      {/* 5. Guardian Testimonials (Caretutors 1:1 Vertical Avatar Reel & Quotes) */}
      <section className="py-14 sm:py-20 bg-slate-50/70 border-y border-slate-200/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TestimonialReel
            title="What Some Awesome Guardian/Student Says about Us"
            subtitle="Hire a tutor today and start learning!"
            ctaText="Hire a Tutor"
            ctaLink="/hire-a-tutor"
            items={testimonialsData.parents}
          />
        </div>
      </section>

      {/* 6. How does it work for tutors? (Caretutors 1:1 Alternating 3 Steps with Curved Connectors) */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight sm:text-4xl">
              How does it work for tutors?
            </h2>
            <p className="mt-2.5 text-center text-slate-500 text-sm md:text-base">
              Start your tutoring journey in 3 simple steps.
            </p>
          </div>

          <div className="space-y-4">
            {/* Step 1: Left aligned */}
            <div className="relative flex items-center justify-between rounded-2xl bg-slate-50 p-6 shadow-sm border border-slate-200/70">
              <div className="flex items-center gap-6 md:gap-10 p-2 md:w-4/5">
                <Image
                  src="/categories/Tutor-01.png"
                  alt="Complete Profile"
                  width={150}
                  height={150}
                  className="size-24 sm:size-32 md:size-40 shrink-0 object-contain"
                />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0675c1] bg-sky-100/60 px-2.5 py-0.5 rounded-full border border-sky-200">
                    Step 01
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2 mb-1.5">
                    Complete Profile
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Create your tutor profile with education details, preferred classes and subjects, and verify your credentials.
                  </p>
                </div>
              </div>
              <div className="-mb-24 hidden md:inline-flex h-[130px] w-[180px] shrink-0">
                <svg viewBox="0 0 229 173" fill="none" className="w-full h-full">
                  <path
                    d="M0 3H152C192.869 3 226 36.1309 226 77V173"
                    stroke="#0675C1"
                    strokeWidth="3.5"
                    strokeDasharray="8 8"
                  />
                </svg>
              </div>
            </div>

            {/* Step 2: Right aligned */}
            <div className="relative flex items-center justify-between rounded-2xl bg-slate-50 p-6 shadow-sm border border-slate-200/70">
              <div className="-mb-24 hidden md:inline-flex h-[130px] w-[180px] shrink-0">
                <svg viewBox="0 0 229 173" fill="none" className="w-full h-full">
                  <path
                    d="M229 3H77C36.1309 3 3.00001 36.1309 3.00001 77V173"
                    stroke="#0675C1"
                    strokeWidth="3.5"
                    strokeDasharray="8 8"
                  />
                </svg>
              </div>
              <div className="flex items-center gap-6 md:gap-10 p-2 md:w-4/5 justify-end text-right">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0675c1] bg-sky-100/60 px-2.5 py-0.5 rounded-full border border-sky-200">
                    Step 02
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2 mb-1.5">
                    Apply Smartly
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Browse verified live tuition opportunities matching your area and salary expectations, and apply with ease.
                  </p>
                </div>
                <Image
                  src="/categories/001.png"
                  alt="Apply Smartly"
                  width={150}
                  height={150}
                  className="size-24 sm:size-32 md:size-40 shrink-0 object-contain"
                />
              </div>
            </div>

            {/* Step 3: Left aligned */}
            <div className="relative flex items-center justify-between rounded-2xl bg-slate-50 p-6 shadow-sm border border-slate-200/70">
              <div className="flex items-center gap-6 md:gap-10 p-2 md:w-4/5">
                <Image
                  src="/categories/002.png"
                  alt="Get Hired"
                  width={150}
                  height={150}
                  className="size-24 sm:size-32 md:size-40 shrink-0 object-contain"
                />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0675c1] bg-sky-100/60 px-2.5 py-0.5 rounded-full border border-sky-200">
                    Step 03
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2 mb-1.5">
                    Get Hired
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Deliver demo classes, get confirmed by the guardian, receive official confirmation, and start tutoring.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Tutor Testimonials (Caretutors 1:1 Vertical Avatar Reel & Quotes) */}
      <section className="py-14 sm:py-20 bg-slate-50/70 border-y border-slate-200/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TestimonialReel
            title="What Some Awesome Tutor Says about Us"
            subtitle="Become a tutor and start earning!"
            ctaText="Become a Tutor"
            ctaLink="/signup/tutor"
            items={testimonialsData.tutors}
          />
        </div>
      </section>

      {/* 8. #1 Platform for All Tutors (Caretutors 1:1 Mobile App Banner with QR Code & Store Badges) */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#0675c1] p-8 md:p-14 text-white shadow-2xl shadow-[#0675c1]/30 flex flex-col md:flex-row items-center justify-between gap-10">
            
            <div className="max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-sky-100 mb-4 backdrop-blur-sm">
                <Smartphone className="h-3.5 w-3.5" />
                <span>Mobile App Available</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                #1 Platform for All Tutors
              </h2>
              <p className="mt-4 text-sm sm:text-base text-sky-100 leading-relaxed">
                Download the official TutorBari app to receive instant push alerts for matching tuition jobs, apply on the go, track applications, and manage your tutoring journey easily.
              </p>

              {/* Store buttons */}
              <div className="mt-8 flex items-center justify-center md:justify-start gap-4">
                <a
                  href="https://play.google.com/store/apps/details?id=com.caretutors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-105 active:scale-95"
                >
                  <Image
                    src="/landing/playStore.svg"
                    alt="Google Play Store"
                    width={150}
                    height={44}
                    className="h-11 w-auto"
                  />
                </a>
                <a
                  href="https://apps.apple.com/us/app/caretutors/id1607736513"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-105 active:scale-95"
                >
                  <Image
                    src="/landing/appStore.svg"
                    alt="Apple App Store"
                    width={150}
                    height={44}
                    className="h-11 w-auto"
                  />
                </a>
              </div>
            </div>

            {/* QR Code container */}
            <div className="hidden sm:flex flex-col items-center justify-center bg-white rounded-2xl p-5 shadow-xl shrink-0">
              <Image
                src="/caretutors-app-qr-code.png"
                alt="Scan QR Code to Download App"
                width={180}
                height={180}
                className="w-40 h-40 object-contain"
              />
              <p className="mt-3 text-xs font-bold text-slate-800 tracking-tight">
                Scan to Download App
              </p>
              <p className="text-[11px] text-slate-500">Android &amp; iOS</p>
            </div>

          </div>
        </div>
      </section>

      {/* 9. We were featured on (Caretutors 1:1 Press Mentions Strip) */}
      <section className="py-12 sm:py-16 bg-slate-50/50 border-t border-slate-200/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              We were featured on
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              Leading national and international media publications that covered our journey
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 items-center justify-center">
            {newsLogos.map((news, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center p-3 rounded-xl bg-white border border-slate-200/60 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 grayscale hover:grayscale-0 opacity-80 hover:opacity-100 h-16"
              >
                <Image
                  src={news.src}
                  alt={news.name}
                  width={120}
                  height={40}
                  className="max-h-8 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Platform Stats & Popular Locations (Trust Bar before Footer) */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center pb-10 border-b border-slate-100">
            {stats.map((s, idx) => (
              <div key={idx} className="p-3">
                <p className="text-2xl sm:text-3xl font-black text-[#0675c1]">
                  {s.value}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Popular Cities list */}
          <div className="mt-8 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Popular Tutoring Locations
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {popularCities.map((city, idx) => (
                <Link
                  key={idx}
                  href={`/tuitions?district=${encodeURIComponent(city)}`}
                  className="rounded-full bg-slate-100 hover:bg-[#0675c1] hover:text-white px-3.5 py-1 text-xs font-medium text-slate-700 transition-colors"
                >
                  {city}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
