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

export default function HomePage() {
  const stats = [
    { label: "Active Tutors", value: "150,000+" },
    { label: "Live Tuition Jobs", value: "2,800+" },
    { label: "Happy Students", value: "85,000+" },
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
      icon: HomeIcon,
      badge: "Popular",
    },
    {
      title: "Online Tutoring",
      desc: "Online tutoring allows students to learn from anywhere in the world with flexible scheduling.",
      icon: Laptop,
      badge: "Flexible",
    },
    {
      title: "Group Tutoring",
      desc: "Group tutoring allows students to learn together and solve problems at an affordable cost.",
      icon: Users,
      badge: "Affordable",
    },
    {
      title: "Package Tutoring",
      desc: "Package tutoring helps students to complete their studies within a specific time frame.",
      icon: Layers,
      badge: "Milestone",
    },
    {
      title: "Shadow Tutoring",
      desc: "The tutor will help the student manage school, routine, and simple daily needs.",
      icon: GraduationCap,
      badge: "Special Care",
    },
  ];

  const categories = [
    { title: "Bangla Medium", subtitle: "Class 1 - 12, SSC, HSC", icon: "/categories/Bangla.png" },
    { title: "English Medium", subtitle: "Cambridge & Edexcel", icon: "/categories/English_Medium.png" },
    { title: "English Version", subtitle: "National Curriculum in English", icon: "/categories/English_Version.png" },
    { title: "Religious Studies", subtitle: "Quran, Tajweed & Arabic", icon: "/categories/Arabic.png" },
    { title: "Admission Test", subtitle: "BUET, Medical & Public Uni", icon: "/categories/Admmission.png" },
    { title: "Arts & Culture", subtitle: "Drawing, Painting & Music", icon: "/categories/Arts.png" },
    { title: "Language Learning", subtitle: "IELTS, Spoken English, French", icon: "/categories/Language.png" },
    { title: "Test Preparation", subtitle: "GRE, SAT, TOEFL, GMAT", icon: "/categories/Test_Preparation.png" },
    { title: "Professional Skill", subtitle: "Graphic, Web Dev & Marketing", icon: "/categories/Professional_Skill.png" },
    { title: "Special Skill", subtitle: "Handwriting, Chess & Debate", icon: "/categories/Special_Skill.png" },
    { title: "Uni Help", subtitle: "University Courses & Engineering", icon: "/categories/Uni_help.png" },
    { title: "Madrasa Medium", subtitle: "Dakhil, Alim & Hafizia", icon: "/categories/Madrasa.png" },
    { title: "Special Child Education", subtitle: "Autism, ADHD & Special Care", icon: "/categories/Special_Child.png" },
  ];

  const guardianSteps = [
    {
      step: "01",
      title: "Submit Requirement",
      desc: "Submit your needs in details so qualified and verified tutors can apply for your post.",
      image: "/categories/guardianSep1.png",
      icon: FileCheck,
    },
    {
      step: "02",
      title: "Shortlist Tutors",
      desc: "Review the applied list and shortlist up to 5 verified tutors based on CV, rating, and university.",
      image: "/categories/guardianSep2.png",
      icon: Users,
    },
    {
      step: "03",
      title: "Confirm Hiring",
      desc: "Conduct 1-2 free trial classes, finalize your chosen tutor, and receive the digital confirmation letter.",
      image: "/categories/guardianSep.png",
      icon: Award,
    },
  ];

  const tutorSteps = [
    {
      step: "01",
      title: "Complete Profile",
      desc: "Sign up as a tutor, fill out your educational qualifications, and upload your NID & Student ID.",
      image: "/categories/Tutor-01.png",
      icon: GraduationCap,
    },
    {
      step: "02",
      title: "Apply Smartly",
      desc: "Browse our live job board and apply to tuition jobs matching your preferred class, location, and salary.",
      image: "/categories/001.png",
      icon: CheckCircle2,
    },
    {
      step: "03",
      title: "Get Hired",
      desc: "Connect directly with shortlisted guardians, conduct trial classes, and start tutoring.",
      image: "/categories/002.png",
      icon: ShieldCheck,
    },
  ];

  const guardianReviews = [
    {
      name: "Mrs. Nasrin Akter",
      location: "Dhanmondi, Dhaka",
      student: "Mother of Class 9 (English Medium) Student",
      rating: 5,
      comment: "Found an exceptional physics tutor from BUET within 24 hours. The verification process gave me complete peace of mind.",
    },
    {
      name: "Engr. Mahmudul Hasan",
      location: "Uttara, Dhaka",
      student: "Father of HSC Candidate",
      rating: 5,
      comment: "The trial class system is fantastic. My son is now very confident in Higher Mathematics. Highly recommended platform!",
    },
    {
      name: "Dr. Farzana Rahman",
      location: "Panchlaish, Chattogram",
      student: "Mother of Standard 4 Student",
      rating: 5,
      comment: "Prompt response and genuine verified profiles. Very professional and convenient service for busy working parents.",
    },
  ];

  const tutorReviews = [
    {
      name: "Tahmid Chowdhury",
      university: "Bangladesh University of Engineering and Technology (BUET)",
      tuitionsDone: "18 Tuitions Completed",
      rating: 5,
      comment: "TutorBari is by far the most transparent and reliable platform in Bangladesh. I get regular tuitions right in my neighboring areas.",
    },
    {
      name: "Afia Sultana",
      university: "University of Dhaka (Department of English)",
      tuitionsDone: "12 Tuitions Completed",
      rating: 5,
      comment: "The digital confirmation letter protects tutors completely. Prompt notifications and wonderful support team!",
    },
    {
      name: "Sadman Sakib",
      university: "Dhaka Medical College (DMC)",
      tuitionsDone: "15 Tuitions Completed",
      rating: 5,
      comment: "Applying is seamless and filtering jobs by location saves huge commute time. Best platform for university tutors.",
    },
  ];

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* 1. Hero Section (Caretutors Style) */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-[#f8fafc] border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-xs font-bold text-[#0675c1]">
                <span>#1 Tutor Matching Network in Bangladesh</span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.15]">
                Hire the Right <span className="text-[#0675c1]">Tutor</span>
              </h1>

              <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Book one-on-one lessons with verified tutors in your area. Qualified tutors from BUET, DU, Medical &amp; top universities ready for home &amp; online tutoring.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link href="/hire-a-tutor">
                  <Button size="lg" className="h-13 px-8 text-base bg-[#0675c1] hover:bg-[#125a9c] text-white font-bold shadow-md shadow-[#0675c1]/20">
                    Hire a Tutor
                  </Button>
                </Link>
                <Link href="/signup/tutor" className="text-sm font-semibold text-slate-700 hover:text-[#0675c1] flex items-center gap-1.5 py-3 px-2">
                  <span>Want to become a Tutor?</span>
                  <span className="text-[#0675c1] underline underline-offset-4">Sign Up</span>
                  <ArrowRight className="h-4 w-4 text-[#0675c1]" />
                </Link>
              </div>

              {/* Quick Trust points */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-semibold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#00a65a]" />
                  100% Free Tutor Request
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#00a65a]" />
                  Verified NID &amp; Student ID
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#00a65a]" />
                  1-2 Free Trial Classes
                </span>
              </div>
            </div>

            {/* Right Hero Card / Visual */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/50 relative">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-sm font-bold text-slate-900">Need a Tutor Quickly?</span>
                    <span className="text-xs font-semibold text-[#00a65a] bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      Free Request
                    </span>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">What medium is the student studying in?</label>
                    <select className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 focus:border-[#0675c1] focus:outline-none">
                      <option>English Medium (Cambridge / Edexcel)</option>
                      <option>Bangla Medium</option>
                      <option>English Version</option>
                      <option>Religious Studies / Quran</option>
                      <option>Admission Test Preparation</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">Select Class / Level</label>
                    <select className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 focus:border-[#0675c1] focus:outline-none">
                      <option>Class 9 - 10 / SSC</option>
                      <option>HSC (1st / 2nd Year)</option>
                      <option>O Level / IGCSE</option>
                      <option>A Level</option>
                      <option>Class 1 - 5 (Primary)</option>
                      <option>Class 6 - 8 (Junior)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">Your Location / City</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="e.g. Mirpur, Dhanmondi, Uttara..."
                        className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-800 focus:border-[#0675c1] focus:outline-none"
                      />
                    </div>
                  </div>

                  <Link href="/hire-a-tutor" className="block pt-2">
                    <Button className="w-full h-11 bg-[#0675c1] hover:bg-[#125a9c] text-white font-bold text-sm">
                      Get Verified Tutors Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Metrics Bar (Exact Caretutors Stats) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 rounded-2xl bg-white p-6 shadow-lg border border-slate-200/80">
          {stats.map((s, idx) => (
            <div key={idx} className="text-center p-3 border-r last:border-none border-slate-100">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#0675c1] block">
                {s.value}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-600 mt-1 block">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Popular Locations / Cities */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Popular Tutoring Locations</h2>
            <p className="text-xs text-slate-500">Find experienced home &amp; online tutors in your city</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularCities.map((city, idx) => (
              <Link
                key={idx}
                href={`/job/list?city=${encodeURIComponent(city)}`}
                className="px-3 py-1 rounded-md text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:border-[#0675c1] hover:text-[#0675c1] transition-colors"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Tuition Types (Exact 5 Caretutors Formats) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0675c1]">
            Tuition Types
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl mt-1">
            Choose Your Preferred Tutoring Format
          </h2>
          <p className="mt-3 text-slate-600 text-sm">
            Whether at home, online, in small groups, or specialized packages.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {tuitionTypes.map((type, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-[#0675c1] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#0675c114] text-[#0675c1]">
                    <type.icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {type.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{type.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{type.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. How does it work for guardians/students? (3 Steps) */}
      <section className="bg-white py-16 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0675c1]">
              For Guardians &amp; Students
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl mt-1">
              How does it work for guardians/students?
            </h2>
            <p className="mt-2 text-slate-600 text-sm">
              Hire the right tutor by following these simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {guardianSteps.map((step, idx) => (
              <div key={idx} className="relative rounded-2xl border border-slate-200 p-6 bg-slate-50/50 hover:bg-white hover:border-[#0675c1]/50 hover:shadow-lg transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl font-black text-[#0675c1]/20">{step.step}</span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0675c1] text-white font-bold shadow-sm">
                      <step.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="flex justify-center my-3 h-36">
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={140}
                      height={140}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/hire-a-tutor">
              <Button size="lg" className="bg-[#0675c1] hover:bg-[#125a9c] text-white font-bold px-8 shadow-sm">
                Hire a Tutor Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Serving Categories (13 Categories Grid with real extracted icons) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0675c1]">
            13 Serving Categories
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl mt-1">
            Serving Categories
          </h2>
          <p className="mt-2 text-slate-600 text-sm">
            Find qualified specialist tutors across all major academic and professional tracks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              href={`/job/list?category=${encodeURIComponent(cat.title)}`}
              className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-[#0675c1] transition-all flex items-center gap-3.5"
            >
              <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-lg bg-slate-50 p-1.5 border border-slate-100 group-hover:scale-105 transition-transform">
                <Image
                  src={cat.icon}
                  alt={cat.title}
                  width={42}
                  height={42}
                  className="object-contain"
                />
              </div>
              <div className="overflow-hidden">
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#0675c1] transition-colors truncate">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-500 truncate">{cat.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. Guardian Testimonials Banner */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00a65a]">
              Guardian Reviews
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl mt-1">
              What Some Awesome Guardian/Student Says about Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guardianReviews.map((rev, idx) => (
              <div key={idx} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed italic mb-4">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <h4 className="text-sm font-bold text-slate-900">{rev.name}</h4>
                  <p className="text-xs text-slate-500">{rev.student}</p>
                  <p className="text-[11px] text-[#0675c1] font-semibold">{rev.location}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Banner CTA */}
          <div className="mt-12 rounded-2xl bg-[#0675c1] p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg shadow-[#0675c1]/20">
            <div>
              <h3 className="text-2xl font-bold">Hire a tutor today and start learning!</h3>
              <p className="text-xs text-sky-100 mt-1">Free tutor request. Get qualified teacher profiles within hours.</p>
            </div>
            <Link href="/hire-a-tutor">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-bold shrink-0">
                Hire a Tutor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. How does it work for tutors? (3 Steps) */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0675c1]">
              For Tutors
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl mt-1">
              How does it work for tutors?
            </h2>
            <p className="mt-2 text-slate-600 text-sm">
              Find your desired tuitions by following the simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tutorSteps.map((step, idx) => (
              <div key={idx} className="relative rounded-2xl border border-slate-200 p-6 bg-slate-50/50 hover:bg-white hover:border-[#00a65a]/50 hover:shadow-lg transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl font-black text-[#00a65a]/20">{step.step}</span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00a65a] text-white font-bold shadow-sm">
                      <step.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="flex justify-center my-3 h-36">
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={140}
                      height={140}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/signup/tutor">
              <Button size="lg" className="bg-[#00a65a] hover:bg-[#008d4c] text-white font-bold px-8 shadow-sm">
                Become a Tutor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Tutor Testimonials Banner */}
      <section className="bg-white py-16 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0675c1]">
              Tutor Reviews
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl mt-1">
              What Some Awesome Tutor Says about Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tutorReviews.map((rev, idx) => (
              <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed italic mb-4">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <h4 className="text-sm font-bold text-slate-900">{rev.name}</h4>
                  <p className="text-xs text-slate-500 line-clamp-1">{rev.university}</p>
                  <p className="text-[11px] text-[#00a65a] font-semibold">{rev.tuitionsDone}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Banner CTA */}
          <div className="mt-12 rounded-2xl bg-[#111827] p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <h3 className="text-2xl font-bold">Become a tutor and start earning!</h3>
              <p className="text-xs text-slate-400 mt-1">Create your verified profile today and start applying to hundreds of live tuitions.</p>
            </div>
            <Link href="/signup/tutor">
              <Button size="lg" className="bg-[#00a65a] hover:bg-[#008d4c] text-white font-bold shrink-0">
                Sign Up as Tutor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 10. Mobile App Download Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-900 to-[#07243c] p-8 sm:p-12 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-sky-300">
                <Smartphone className="h-4 w-4" />
                <span>TutorBari Official Mobile App</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Manage Your Tuitions On the Go
              </h2>
              <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
                Download the official TutorBari app to receive instant push alerts for matching tuition jobs, track applications, and communicate with guardians in real time.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href="https://play.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 bg-white text-slate-900 font-bold px-5 py-2.5 rounded-xl hover:bg-slate-100 transition-colors text-xs"
                >
                  <Smartphone className="h-5 w-5 text-[#0675c1]" />
                  <div className="text-left">
                    <span className="block text-[10px] text-slate-500 uppercase font-medium">Get it on</span>
                    <span>Google Play</span>
                  </div>
                </a>
                <a
                  href="https://apple.com/app-store"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 bg-white/10 text-white border border-white/20 font-bold px-5 py-2.5 rounded-xl hover:bg-white/20 transition-colors text-xs"
                >
                  <Smartphone className="h-5 w-5 text-sky-400" />
                  <div className="text-left">
                    <span className="block text-[10px] text-slate-300 uppercase font-medium">Download on the</span>
                    <span>App Store</span>
                  </div>
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="bg-white p-4 rounded-2xl shadow-xl flex flex-col items-center">
                <Image
                  src="/categories/caretutors-app-qr-code.png"
                  alt="App QR Code"
                  width={140}
                  height={140}
                  className="rounded-lg"
                />
                <span className="text-[11px] font-bold text-slate-800 mt-2">Scan to Download App</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
