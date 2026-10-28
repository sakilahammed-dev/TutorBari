import React from "react";
import Link from "next/link";
import { GraduationCap, Mail, Phone, MapPin, ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  const categories = [
    "English Medium (Cambridge / Edexcel)",
    "Bangla Medium (Primary, SSC, HSC)",
    "English Version (National Curriculum)",
    "Admission Test (BUET, Medical, DU)",
    "Religious Studies (Quran & Tajweed)",
    "Language Learning (IELTS, Spoken English)",
    "Madrasa Medium (Dakhil & Alim)",
    "Special Child Education (Autism/ADHD)",
  ];

  const quickLinks = [
    { label: "Job Board", href: "/job/list" },
    { label: "Hire a Tutor", href: "/hire-a-tutor" },
    { label: "Become a Tutor", href: "/signup/tutor" },
    { label: "Guardian Sign Up", href: "/signup/guardian" },
    { label: "Frequently Asked Questions (FAQ)", href: "/faq" },
    { label: "Tutorial & Guidelines", href: "/tutorial" },
    { label: "Blog", href: "/blog" },
  ];

  const legalLinks = [
    { label: "Terms of Use", href: "/terms-condition" },
    { label: "Privacy Policy", href: "/terms-condition#privacy" },
    { label: "Confirmation Letter Policy", href: "/faq#confirmation" },
    { label: "Return & Refund Policy", href: "/faq#refund" },
  ];

  return (
    <footer className="w-full border-t border-slate-200 bg-[#111827] text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0675c1] text-white shadow-md">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-white">
                  Tutor<span className="text-[#38a3f8]">Bari</span>.com
                </span>
                <span className="text-xs text-sky-300 font-semibold tracking-wide">
                  #1 Platform for Verified Tutors
                </span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              Bangladesh&apos;s leading online platform for guardians, students, and tutors to hire verified home &amp; online tutors safely and quickly across 13 serving categories.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="h-4 w-4" />
              <span>100% Verified Credentials (NID &amp; University Student ID)</span>
            </div>

            <div className="space-y-2 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-[#0675c1] shrink-0" />
                <span>Dhaka, Chattogram, Sylhet, Rajshahi, Khulna &amp; Nationwide</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-[#0675c1] shrink-0" />
                <span>Helpline: +880 1700-000000 (9:00 AM - 10:00 PM)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#0675c1] shrink-0" />
                <span>Support: support@tutorbari.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Useful Links
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-[#38a3f8] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Serving Categories
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {categories.map((cat, idx) => (
                <li key={idx}>
                  <Link
                    href={`/job/list?category=${encodeURIComponent(cat)}`}
                    className="hover:text-[#38a3f8] transition-colors line-clamp-1"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Trust */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Legal &amp; Policy
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {legalLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="hover:text-[#38a3f8] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl bg-slate-800/90 p-3.5 border border-slate-700/60">
              <span className="text-xs font-semibold text-white block mb-1">
                Safe &amp; Protected Transactions
              </span>
              <p className="text-[11px] text-slate-400 leading-tight">
                Digital confirmation letter and authorized receipts for both guardians and tutors.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 TutorBari.com. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with deep care and <Heart className="h-3 w-3 text-red-500 fill-red-500" /> passion
          </p>
        </div>
      </div>
    </footer>
  );
}
