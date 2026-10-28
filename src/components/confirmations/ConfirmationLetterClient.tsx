"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  Printer,
  CreditCard,
  AlertCircle,
  Loader2,
  MapPin,
  Phone,
  User,
  DollarSign,
  FileText,
  ChevronLeft,
  Lock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ConfirmationLetterClientProps {
  id: string; // Job ID or Confirmation ID
}

export function ConfirmationLetterClient({ id }: ConfirmationLetterClientProps) {
  const router = useRouter();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // 1. Fetch current user
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((authData) => {
        if (authData?.authenticated) setCurrentUser(authData.user);
      })
      .catch(() => {});

    // 2. Fetch confirmation letter
    fetch(`/api/confirmations/${id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json?.success) {
          setData(json);
        }
      })
      .catch((err) => console.error("Failed to load confirmation:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#0675c1] mb-2" />
        <span className="text-xs font-semibold text-slate-500">Loading Confirmation Letter...</span>
      </div>
    );
  }

  const conf = data?.confirmation;
  const invoice = data?.invoice;

  if (!conf) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 bg-slate-50 text-center px-4">
        <AlertCircle className="h-12 w-12 text-slate-400 mb-3" />
        <h2 className="text-xl font-bold text-slate-900">Confirmation Letter Not Found</h2>
        <p className="text-xs text-slate-500 mt-1 max-w-sm">
          No official confirmation letter has been issued for this tuition ID yet.
        </p>
        <Link href="/job/list" className="mt-4">
          <Button variant="default" size="sm">Browse Jobs</Button>
        </Link>
      </div>
    );
  }

  const isPaid = conf.paymentStatus === "PAID";

  return (
    <div className="py-10 bg-slate-100/60 min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-6">
        {/* Top Control Bar (Hidden during print) */}
        <div className="flex items-center justify-between print:hidden">
          <Link
            href="/tutor/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#0675c1]"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
              className="font-bold text-xs gap-1.5 bg-white shadow-xs"
            >
              <Printer className="h-3.5 w-3.5" />
              Print / Save PDF
            </Button>

            {!isPaid && (
              <Link href={`/payment/${conf.id}`}>
                <Button
                  size="sm"
                  className="bg-[#00a65a] hover:bg-[#008f4c] text-white font-bold text-xs gap-1.5 shadow-xs"
                >
                  <CreditCard className="h-3.5 w-3.5" />
                  Pay Platform Fee Online
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Printable Official Contract Document */}
        <div className="rounded-3xl border border-slate-300 bg-white p-8 sm:p-12 shadow-md relative overflow-hidden print:border-none print:shadow-none print:p-0">
          {/* Watermark Stamp */}
          <div className="absolute right-10 top-20 pointer-events-none select-none opacity-[0.04] rotate-[-25deg] text-slate-900 font-black text-8xl leading-none">
            TUTORBARI
          </div>

          {/* Official Letterhead */}
          <div className="border-b-2 border-slate-900 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0675c1] text-white shadow-md">
                <GraduationCap className="h-7 w-7" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-slate-900">
                  Tutor<span className="text-[#0675c1]">Bari</span>.com
                </span>
                <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider">
                  #1 Verified Tutor Matching Platform in Bangladesh
                </span>
              </div>
            </div>

            <div className="text-left sm:text-right space-y-0.5">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-50 text-[#0675c1] border border-blue-200">
                REF: #{conf.id.toUpperCase()}
              </span>
              <p className="text-[11px] font-semibold text-slate-500">
                Issued Date: {new Date(conf.issuedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </p>
              <p className="text-[11px] font-bold text-red-600">
                Due Date: {conf.dueDate}
              </p>
            </div>
          </div>

          {/* Document Title Banner */}
          <div className="text-center mb-8 space-y-1">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-wide">
              Official Tuition Confirmation Letter
            </h1>
            <p className="text-xs text-slate-500">
              Legally Binding Mutual Tutoring Agreement between Guardian, Tutor, and TutorBari Platform
            </p>
          </div>

          {/* Contract Parties Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {/* Party A: Guardian */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 space-y-2.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Party A (Guardian / Parent)
              </span>
              <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <User className="h-4 w-4 text-[#0675c1]" />
                {conf.guardianName}
              </div>
              <div className="text-xs text-slate-600 flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-slate-400" />
                Phone: {conf.guardianPhone}
              </div>
              <div className="text-xs text-slate-600 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                Location: Dhaka, Bangladesh
              </div>
            </div>

            {/* Party B: Tutor */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 space-y-2.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Party B (Appointed Tutor)
              </span>
              <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <GraduationCap className="h-4 w-4 text-[#00a65a]" />
                {conf.tutorName}
              </div>
              <div className="text-xs text-slate-600 flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[#00a65a]" />
                Institution: {conf.tutorInstitution}
              </div>
              <div className="text-xs text-slate-600 flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-slate-400" />
                Verified Tutor ID: {conf.tutorId}
              </div>
            </div>
          </div>

          {/* Agreed Terms Table */}
          <div className="mb-8 space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              1. Agreed Tuition Terms & Specifications
            </h3>
            <div className="rounded-2xl border border-slate-200 overflow-hidden">
              <table className="w-full text-left text-xs">
                <tbody>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="py-3 px-4 font-bold text-slate-700 w-1/3">Tuition Job Title</th>
                    <td className="py-3 px-4 font-semibold text-slate-900">{conf.jobTitle}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <th className="py-3 px-4 font-bold text-slate-700">Tuition Job Reference</th>
                    <td className="py-3 px-4 font-mono font-bold text-[#0675c1]">Job #{conf.jobId}</td>
                  </tr>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="py-3 px-4 font-bold text-slate-700">Agreed Monthly Salary</th>
                    <td className="py-3 px-4 font-bold text-[#00a65a] text-sm">{conf.monthlySalary.toLocaleString()} BDT / Month</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <th className="py-3 px-4 font-bold text-slate-700">Tutoring Schedule</th>
                    <td className="py-3 px-4 font-semibold text-slate-900">{conf.daysPerWeek} Days Per Week</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <th className="py-3 px-4 font-bold text-slate-700">Commencement Date</th>
                    <td className="py-3 px-4 font-semibold text-slate-900">{conf.startDate}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Platform Service Charge & Payment Status */}
          <div className="mb-8 space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              2. Platform Service Charge & Escrow Status
            </h3>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700">
                    Platform Placement Fee ({conf.platformChargeRate}% of 1st month salary):
                  </span>
                  <span className="text-base font-black text-slate-900">
                    {conf.platformChargeAmount.toLocaleString()} BDT
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Payable once by the appointed tutor within 7 days of confirmation issuance.
                </p>
              </div>

              {/* Status Badge */}
              <div className="shrink-0">
                {isPaid ? (
                  <div className="flex items-center gap-2 rounded-xl bg-emerald-100/80 px-4 py-2 border border-emerald-300 text-emerald-900">
                    <CheckCircle2 className="h-5 w-5 text-[#00a65a]" />
                    <div>
                      <span className="text-xs font-black uppercase tracking-wider block">PAID IN FULL</span>
                      {invoice && (
                        <Link href={`/invoice/${invoice.id}`} className="text-[10px] font-bold text-emerald-700 hover:underline">
                          View Invoice #{invoice.invoiceNumber}
                        </Link>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:items-end gap-2">
                    <span className="rounded-xl bg-red-100 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-red-700 border border-red-200">
                      Payment Pending (Due: {conf.dueDate})
                    </span>
                    <Link href={`/payment/${conf.id}`} className="print:hidden">
                      <Button size="sm" className="bg-[#00a65a] hover:bg-[#008f4c] text-white font-bold text-xs gap-1.5 shadow-xs">
                        <CreditCard className="h-3.5 w-3.5" />
                        Pay Online (bKash/Nagad)
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Platform Guarantees & Terms */}
          <div className="mb-10 space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              3. Platform Guarantees & Terms of Service
            </h3>
            <ul className="text-xs text-slate-600 space-y-2 leading-relaxed bg-slate-50/50 p-4 rounded-xl border border-slate-200">
              <li className="flex items-start gap-2">
                <span className="text-[#0675c1] font-bold">✓</span>
                <span><strong>15-Day Replacement Guarantee:</strong> If the student or guardian discontinues classes within 15 days due to reasonable grounds, TutorBari provides a free replacement or adjusts platform fees accordingly.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0675c1] font-bold">✓</span>
                <span><strong>Security & Trust:</strong> Both parties must maintain professional decorum and adhere to scheduled timings. Payment must only be remitted through official gateway channels.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0675c1] font-bold">✓</span>
                <span><strong>Official Verification:</strong> This document carries electronic authentication by TutorBari Operations Management.</span>
              </li>
            </ul>
          </div>

          {/* Signature & Seal Row */}
          <div className="pt-8 border-t border-slate-200 grid grid-cols-3 gap-6 text-center text-xs">
            <div>
              <div className="h-12 flex items-center justify-center font-serif italic text-slate-500 font-bold">
                {conf.guardianName}
              </div>
              <div className="border-t border-slate-300 pt-1 font-bold text-slate-800">
                Guardian Signature
              </div>
            </div>

            <div>
              <div className="h-12 flex items-center justify-center font-serif italic text-[#0675c1] font-bold">
                {conf.tutorName}
              </div>
              <div className="border-t border-slate-300 pt-1 font-bold text-slate-800">
                Tutor Signature
              </div>
            </div>

            <div>
              <div className="h-12 flex items-center justify-center">
                <div className="h-12 w-12 rounded-full border-2 border-[#00a65a] flex items-center justify-center text-[8px] font-black uppercase text-[#00a65a] rotate-[-12deg] tracking-tighter">
                  VERIFIED<br />SEAL
                </div>
              </div>
              <div className="border-t border-slate-300 pt-1 font-bold text-slate-800">
                Authorized Platform Seal
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
