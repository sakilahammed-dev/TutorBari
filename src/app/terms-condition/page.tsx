import React from "react";
import Link from "next/link";
import { ShieldCheck, FileText, ChevronRight, Scale, Lock, AlertTriangle } from "lucide-react";

export default function TermsConditionPage() {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
          <Link href="/" className="hover:text-[#0675c1]">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-900">Terms of Use &amp; Privacy Policy</span>
        </div>

        {/* Header */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm mb-8">
          <div className="flex items-center gap-3 text-[#0675c1] mb-3">
            <Scale className="h-7 w-7" />
            <span className="text-xs font-bold uppercase tracking-wider">Legal &amp; Policy</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Terms of Use &amp; Privacy Policy
          </h1>
          <p className="mt-2 text-xs text-slate-500">
            Last updated: October 2026 • Please read carefully before using TutorBari services.
          </p>
        </div>

        {/* Content Body */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm space-y-10 text-slate-700 text-sm leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0675c114] text-[#0675c1] text-xs font-bold">1</span>
              Introduction &amp; Acceptance of Terms
            </h2>
            <p>
              Welcome to <strong>TutorBari.com</strong>. By accessing or using our website, mobile application, or services, you agree to be bound by these legally binding Terms of Use. If you do not agree to all provisions, you may not use the platform.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0675c114] text-[#0675c1] text-xs font-bold">2</span>
              Platform Role &amp; Nature of Service
            </h2>
            <p>
              TutorBari operates strictly as an <strong>online tutor-matching marketplace</strong> connecting service seekers (Guardians/Students) with independent service providers (Tutors). TutorBari is not an employer, coaching center, or legal agent of any tutor or guardian.
            </p>
            <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200">
              Note: All tuition posts and tutor profiles are verified for authenticity to the best of our knowledge. However, guardians are strongly advised to verify original academic certificates and national identification before commencing services.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0675c114] text-[#0675c1] text-xs font-bold">3</span>
              Eligibility &amp; Registration
            </h2>
            <p>
              Users must be at least <strong>18 years of age</strong> to register as a Tutor or Guardian. Minors can only receive tutoring services under the direct supervision and authorization of their parents or legal guardians.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0675c114] text-[#0675c1] text-xs font-bold">4</span>
              Tutor Obligations &amp; Professional Code of Conduct
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
              <li>Tutors must provide genuine educational certificates, student ID, and national ID (NID).</li>
              <li>Tutors are obligated to conduct themselves in a respectful, professional teacher-like manner at all times.</li>
              <li>Tutors may not demand advance payment from guardians for home tutoring before commencement of contracted periods.</li>
              <li>Tutors must show original proof of credentials to the guardian upon request.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0675c114] text-[#0675c1] text-xs font-bold">5</span>
              Platform Charges &amp; Commission Policy
            </h2>
            <p>
              Registration and posting a tuition requirement are <strong>100% free</strong> for guardians.
            </p>
            <p>
              For tutors, upon successful confirmation of a tuition job, a one-time platform charge is payable for the first month&apos;s service:
            </p>
            <div className="rounded-xl border border-slate-200 overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 font-bold text-slate-900">
                  <tr>
                    <th className="p-3">Tuition Type</th>
                    <th className="p-3">Platform Charge (% of 1st Month)</th>
                    <th className="p-3">Payment Window</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-3 font-semibold">Home Tutoring</td>
                    <td className="p-3 text-[#0675c1] font-bold">55%</td>
                    <td className="p-3">Within 7 days of confirmation</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Online Tutoring</td>
                    <td className="p-3 text-[#0675c1] font-bold">55%</td>
                    <td className="p-3">Within 7 days of confirmation</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Group Tutoring</td>
                    <td className="p-3 text-[#0675c1] font-bold">55%</td>
                    <td className="p-3">Within 7 days of confirmation</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Package Tutoring</td>
                    <td className="p-3 text-[#0675c1] font-bold">35%</td>
                    <td className="p-3">Within 7 days of confirmation</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0675c114] text-[#0675c1] text-xs font-bold">6</span>
              Discontinuation &amp; Return Policy
            </h2>
            <p>
              If a confirmed tuition job is discontinued by the guardian during the first month for reasons outside the tutor&apos;s control, the tutor will receive a calculated pro-rata refund or platform credit in accordance with our Return Policy. Valid proof and guardian confirmation are required.
            </p>
          </section>

          {/* Section 7 */}
          <section id="privacy" className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Lock className="h-5 w-5 text-[#00a65a]" />
              Privacy Policy &amp; Data Protection
            </h2>
            <p>
              TutorBari respects your privacy. All uploaded documents (NID cards, student IDs, certificates) are stored in secure, encrypted cloud storage and are used strictly for internal authenticity verification. We never sell or distribute your private contact details to unauthorized third parties.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
