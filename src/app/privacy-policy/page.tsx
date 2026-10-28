import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, Lock, Eye, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Privacy Policy | Data Protection & Verification Security",
  description:
    "Learn how TutorBari protects personal data, NID records, student credentials, and ensures safe communications for guardians and tutors.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-12">
        <Link href="/" className="inline-flex items-center text-sm font-semibold text-[#0675c1] hover:underline mb-6">
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#0675c1]">
            <Lock className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Privacy Policy</h1>
            <p className="text-sm text-slate-500">Effective Date: October 2026 | TutorBari.com</p>
          </div>
        </div>

        <div className="prose prose-slate max-w-none text-slate-600 space-y-6 text-sm leading-relaxed border-t border-slate-100 pt-6">
          <section>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              1. Information We Collect
            </h2>
            <p>
              TutorBari.com collects personal information necessary to facilitate safe, transparent, and verified tutoring matches between Guardians/Students and Tutors across Bangladesh. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li><strong>Contact Information:</strong> Full legal name, mobile phone number, email address, and physical residence/neighborhood.</li>
              <li><strong>Academic & Professional Credentials:</strong> Educational certificates (SSC, HSC, Bachelor’s, Master’s), university affiliation, passing year, and academic transcripts.</li>
              <li><strong>Identity Verification Records (KYC):</strong> Government-issued National ID (NID), Smart Card, Passport, or University Student ID card copy for physical/digital authenticity checks.</li>
              <li><strong>Tuition Requirements & Invoices:</strong> Subject needs, class levels, tutoring timings, payment records, and digital confirmation letters.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Eye className="h-5 w-5 text-[#0675c1]" />
              2. Strict Privacy Masking (Contact Protection)
            </h2>
            <p>
              To protect the privacy of both Guardians and Tutors, contact numbers are strictly masked:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li>Guardian mobile numbers and precise house addresses are never published on the public job board.</li>
              <li>When a tutor applies for a tuition, the guardian&apos;s phone number remains encrypted and hidden until the guardian officially approves and schedules a <strong>Free Trial Demo Class</strong>.</li>
              <li>Tutor personal contact information is only shared with guardians who have shortlisted or invited them for demo evaluation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              3. Data Security & Encryption
            </h2>
            <p>
              All user passwords are encrypted using one-way <code>bcryptjs</code> salted hashing. Authentication tokens are transmitted via HTTPS and stored in HTTP-only, secure browser cookies to prevent cross-site scripting (XSS) extraction. We never sell, rent, or trade your personal information to third-party telemarketers or external advertisers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#0675c1]" />
              4. Payment & Financial Data Protection
            </h2>
            <p>
              When tutors complete payment for their platform service charge (55% or 35%) via bKash, Nagad, Rocket, or Bank cards, all transaction verifications are processed through encrypted financial gateway protocols. TutorBari does not store your MFS PIN, Card CVV, or sensitive banking passwords on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">5. Contact Our Privacy Officer</h2>
            <p>
              If you have any questions regarding your personal data, document deletion, or privacy settings, please email us directly at:
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mt-2 font-mono text-xs text-slate-800">
              Email: privacy@tutorbari.com | Helpline: +880 1700-000000 (9 AM - 10 PM)
            </div>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
          <Link href="/terms-condition">
            <Button variant="outline" size="sm">View Terms of Service</Button>
          </Link>
          <Link href="/">
            <Button variant="default" size="sm">Return to Homepage</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
