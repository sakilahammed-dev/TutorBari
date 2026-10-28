"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  Printer,
  CheckCircle2,
  Calendar,
  CreditCard,
  AlertCircle,
  Loader2,
  MapPin,
  Phone,
  User,
  ArrowRight,
  ChevronLeft,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface InvoiceClientProps {
  id: string; // Invoice ID or Number
}

export function InvoiceClient({ id }: InvoiceClientProps) {
  const router = useRouter();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/invoices/${id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json?.success) {
          setData(json);
        }
      })
      .catch((err) => console.error("Error loading invoice:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#0675c1] mb-2" />
        <span className="text-xs font-semibold text-slate-500">Generating Official Invoice...</span>
      </div>
    );
  }

  const invoice = data?.invoice;
  const confirmation = data?.confirmation;
  const job = data?.job;

  if (!invoice) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 bg-slate-50 text-center px-4">
        <AlertCircle className="h-12 w-12 text-slate-400 mb-3" />
        <h2 className="text-xl font-bold text-slate-900">Invoice Not Found</h2>
        <p className="text-xs text-slate-500 mt-1 max-w-sm">
          No official receipt exists for this invoice reference number.
        </p>
        <Link href="/tutor/dashboard" className="mt-4">
          <Button variant="default" size="sm">Go to Dashboard</Button>
        </Link>
      </div>
    );
  }

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
            Back to Tutor Dashboard
          </Link>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
              className="font-bold text-xs gap-1.5 bg-white shadow-xs"
            >
              <Printer className="h-3.5 w-3.5" />
              Print / Save PDF Receipt
            </Button>

            {confirmation && (
              <Link href={`/job/confirmation-letter/${confirmation.id}`}>
                <Button size="sm" variant="default" className="font-bold text-xs gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  View Agreement Letter
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Printable Official Tax Invoice Document */}
        <div className="rounded-3xl border border-slate-300 bg-white p-8 sm:p-12 shadow-md relative overflow-hidden print:border-none print:shadow-none print:p-0">
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
                  Official Service Tax Invoice & Payment Receipt
                </span>
              </div>
            </div>

            <div className="text-left sm:text-right space-y-0.5">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-50 text-[#00a65a] border border-emerald-300">
                {invoice.invoiceNumber}
              </span>
              <p className="text-[11px] font-semibold text-slate-500">
                Payment Date: {new Date(invoice.paidAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </p>
              <p className="text-[11px] font-mono text-slate-500">
                TRX ID: {invoice.transactionId}
              </p>
            </div>
          </div>

          {/* Invoice Summary Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Billed To (Appointed Tutor)
              </span>
              <div className="text-sm font-bold text-slate-900">{invoice.tutorName}</div>
              <div className="text-xs text-slate-600">Phone: {invoice.tutorPhone}</div>
              <div className="text-xs text-slate-600 font-mono">Tutor ID: {invoice.tutorId}</div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Payment Details
              </span>
              <div className="text-xs text-slate-700 flex items-center justify-between">
                <span>Method:</span>
                <strong className="font-bold text-slate-900">{invoice.paymentMethod} Online Checkout</strong>
              </div>
              <div className="text-xs text-slate-700 flex items-center justify-between">
                <span>Status:</span>
                <strong className="font-bold text-[#00a65a]">PAID IN FULL</strong>
              </div>
              <div className="text-xs text-slate-700 flex items-center justify-between">
                <span>Confirmation Ref:</span>
                <strong className="font-mono font-bold text-[#0675c1]">#{invoice.confirmationId}</strong>
              </div>
            </div>
          </div>

          {/* Itemized Invoice Table */}
          <div className="mb-8 space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Itemized Service Description
            </h3>

            <div className="rounded-2xl border border-slate-200 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Description</th>
                    <th className="py-3 px-4 text-center">Qty</th>
                    <th className="py-3 px-4 text-right">Unit Price</th>
                    <th className="py-3 px-4 text-right">Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-4 px-4 space-y-1">
                      <strong className="text-slate-900 block">
                        TutorBari Platform Matching & Placement Fee (55% First Month Fee)
                      </strong>
                      <span className="text-[11px] text-slate-500 block">
                        Reference: Job #{invoice.jobId} — {invoice.jobTitle}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center font-bold">1</td>
                    <td className="py-4 px-4 text-right font-mono font-semibold">
                      {invoice.amount.toLocaleString()} BDT
                    </td>
                    <td className="py-4 px-4 text-right font-mono font-bold text-slate-900">
                      {invoice.amount.toLocaleString()} BDT
                    </td>
                  </tr>

                  {/* Subtotal & Total rows */}
                  <tr className="bg-slate-50/50">
                    <td colSpan={3} className="py-2.5 px-4 text-right font-bold text-slate-600">Subtotal:</td>
                    <td className="py-2.5 px-4 text-right font-mono font-bold text-slate-900">
                      {invoice.amount.toLocaleString()} BDT
                    </td>
                  </tr>
                  <tr className="bg-slate-50/50 border-b border-slate-200">
                    <td colSpan={3} className="py-2.5 px-4 text-right font-bold text-slate-600">Educational VAT (0%):</td>
                    <td className="py-2.5 px-4 text-right font-mono font-semibold text-slate-500">0 BDT</td>
                  </tr>
                  <tr className="bg-emerald-50/60 text-emerald-950">
                    <td colSpan={3} className="py-3.5 px-4 text-right font-black text-sm">Total Paid in Full:</td>
                    <td className="py-3.5 px-4 text-right font-mono font-black text-base text-[#00a65a]">
                      {invoice.amount.toLocaleString()} BDT
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Paid Stamp & Authorization */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500">
            <div className="space-y-1 text-center sm:text-left">
              <p className="font-bold text-slate-800">TutorBari Operations Bangladesh Ltd.</p>
              <p className="text-[11px]">House 42, Road 7/A, Dhanmondi, Dhaka 1209</p>
              <p className="text-[11px]">Support Hotline: 09613-828888 • contact@tutorbari.com</p>
            </div>

            {/* Circular Stamp */}
            <div className="flex items-center justify-center">
              <div className="h-20 w-20 rounded-full border-4 border-dashed border-[#00a65a] flex flex-col items-center justify-center text-center rotate-[-12deg] p-1 shadow-sm">
                <span className="text-[9px] font-black uppercase text-[#00a65a] tracking-wider leading-none">TUTORBARI</span>
                <span className="text-xs font-black text-[#00a65a] leading-tight">PAID</span>
                <span className="text-[8px] font-bold text-[#00a65a] leading-none">VERIFIED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
