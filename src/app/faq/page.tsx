"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, ChevronRight, User, Users, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface FAQItem {
  q: string;
  a: string;
  category: "general" | "guardian" | "tutor";
}

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState<"general" | "guardian" | "tutor">("guardian");
  const [openIndices, setOpenIndices] = useState<Record<number, boolean>>({ 0: true });

  const faqs: FAQItem[] = [
    // Guardian FAQs
    {
      category: "guardian",
      q: "How to post a tutor request on TutorBari?",
      a: "Posting a tutor requirement is simple and completely free. Click on the 'Hire a Tutor' button on our homepage, enter your phone number, specify student details (class, medium, subjects, days per week, and budget), and submit. Within 24 hours, you will receive matching verified tutor CVs.",
    },
    {
      category: "guardian",
      q: "Do I have to pay any platform charge to hire a tutor?",
      a: "No! There are absolutely zero platform charges for guardians or students to hire a tutor on TutorBari. You only pay the agreed tuition fee directly to the assigned tutor.",
    },
    {
      category: "guardian",
      q: "Do you verify the tutor's profile and credentials?",
      a: "Yes. All verified tutors must submit their National ID (NID), University Student ID card, and academic certificates. Our verification team thoroughly verifies data authenticity. Guardians can also inspect original photocopies during the initial meeting.",
    },
    {
      category: "guardian",
      q: "What is a 'Confirmation Letter'? Is it necessary?",
      a: "A Confirmation Letter serves as an official appointment letter and agreement between the guardian and the tutor. It specifies student details, subjects, contracted monthly salary, weekly days, and start date to eliminate any confusion or dispute.",
    },
    {
      category: "guardian",
      q: "What should I do if the tutor asks for an advance payment?",
      a: "As per our terms and conditions, tutors may not claim any advance payment before commencing home tutoring. You pay the contracted salary at the end of each month after contracted lessons are delivered.",
    },
    {
      category: "guardian",
      q: "Can I take trial/demo classes before finalizing a tutor?",
      a: "Yes! Guardians are entitled to 1-2 free demo classes to observe the tutor's teaching methodology and student rapport before confirming the appointment.",
    },

    // Tutor FAQs
    {
      category: "tutor",
      q: "What are the minimum requirements for creating a tutor account?",
      a: "Any university student or graduate who has knowledge and passion to teach can create a tutor account on TutorBari. You must be at least 18 years old and submit valid educational credentials.",
    },
    {
      category: "tutor",
      q: "Do I have to pay any charges for getting tuition jobs?",
      a: "Creating an account, completing your profile, and applying for jobs are 100% free. Once a tuition job is successfully confirmed with the guardian, a one-time platform charge of 55% (Home/Online/Group) or 35% (Package Tutoring) of the first month's salary is payable within 7 days.",
    },
    {
      category: "tutor",
      q: "What is the return policy if a confirmed tuition is discontinued?",
      a: "If a confirmed tuition job is discontinued by the guardian during the first month for reasons beyond the tutor's control, you will receive a pro-rata refund or platform credit calculated based on our official Return Policy once verified with the guardian.",
    },
    {
      category: "tutor",
      q: "Why do I need to upload credentials (NID and Student ID)?",
      a: "Uploading valid credentials earns you the 'Verified Tutor' badge. Verified profiles receive 5x higher guardian shortlists and are prioritized for high-paying premium tuition posts.",
    },
    {
      category: "tutor",
      q: "When will a tutor get banned?",
      a: "A tutor will be permanently banned if they submit fake credentials, breach professional conduct, fail to pay confirmed platform charges within 7 days, or abandon students without prior notice.",
    },

    // General FAQs
    {
      category: "general",
      q: "What makes TutorBari unique?",
      a: "TutorBari provides the fastest matching engine, 100% verified credentials, structured digital confirmation letters, dedicated support, and coverage across 13 distinct academic and skill categories in Bangladesh.",
    },
    {
      category: "general",
      q: "Which categories are supported?",
      a: "We support 13 categories: English Medium, Bangla Medium, English Version, Religious Studies (Quran/Tajweed), Admission Test, Arts & Music, Language Learning (IELTS), Test Preparation (GRE/SAT), Professional Skills, Special Skills, Madrasa Medium, University Help, and Special Child Education.",
    },
    {
      category: "general",
      q: "Is it safe to share my personal information?",
      a: "Yes. All personal data is encrypted and strictly protected. We never share sensitive identity documents publicly; they are only accessed by authorized verification officers.",
    },
  ];

  const currentFaqs = faqs.filter((f) => f.category === activeTab);

  const toggleAccordion = (index: number) => {
    setOpenIndices((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
          <Link href="/" className="hover:text-[#0675c1]">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-900">Frequently Asked Questions</span>
        </div>

        {/* Header */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm text-center mb-8">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-[#0675c114] text-[#0675c1] mb-4">
            <HelpCircle className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Frequently Asked Questions (FAQ)
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto">
            Find answers to commonly asked questions about hiring tutors, applying for tuitions, verification, and payment terms.
          </p>

          {/* Tab Switcher */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-xl bg-slate-100 max-w-md mx-auto">
            <button
              onClick={() => { setActiveTab("guardian"); setOpenIndices({ 0: true }); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "guardian"
                  ? "bg-white text-[#0675c1] shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Users className="h-4 w-4" />
              For Guardians
            </button>
            <button
              onClick={() => { setActiveTab("tutor"); setOpenIndices({ 0: true }); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "tutor"
                  ? "bg-white text-[#0675c1] shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <User className="h-4 w-4" />
              For Tutors
            </button>
            <button
              onClick={() => { setActiveTab("general"); setOpenIndices({ 0: true }); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "general"
                  ? "bg-white text-[#0675c1] shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              General &amp; Trust
            </button>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-3">
          {currentFaqs.map((faq, idx) => {
            const isOpen = !!openIndices[idx];
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 hover:text-[#0675c1] transition-colors gap-4"
                >
                  <span className="text-sm sm:text-base leading-snug">{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#0675c1]" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Help CTA */}
        <div className="mt-12 rounded-2xl bg-white p-8 border border-slate-200 text-center shadow-sm">
          <h3 className="text-base font-bold text-slate-900">Still have questions?</h3>
          <p className="text-xs text-slate-500 mt-1">Our customer support team is available every day from 9:00 AM to 10:00 PM.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link href="/hire-a-tutor">
              <Button size="sm" className="bg-[#0675c1] hover:bg-[#125a9c] text-white font-bold">
                Hire a Tutor
              </Button>
            </Link>
            <Link href="/signup/tutor">
              <Button size="sm" variant="outline">
                Become a Tutor
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
