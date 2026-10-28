"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ChevronLeft,
  AlertCircle,
  Loader2,
  DollarSign,
  Smartphone,
  ArrowRight,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface PaymentCheckoutClientProps {
  id: string; // Confirmation ID or Job ID
}

export function PaymentCheckoutClient({ id }: PaymentCheckoutClientProps) {
  const router = useRouter();

  const [confirmation, setConfirmation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Payment form state
  const [method, setMethod] = useState<"bKash" | "Nagad" | "Rocket" | "Card">("bKash");
  const [mfsNumber, setMfsNumber] = useState("");
  const [pin, setPin] = useState("");
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // 1. Fetch user
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.authenticated) {
          setCurrentUser(data.user);
          if (data.user.phone) setMfsNumber(data.user.phone);
        } else {
          router.push(`/signin?redirect=/payment/${id}`);
        }
      })
      .catch(() => router.push("/signin"));

    // 2. Fetch Confirmation
    fetch(`/api/confirmations/${id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json?.success) {
          setConfirmation(json.confirmation);
          if (json.confirmation.paymentStatus === "PAID" && json.invoice) {
            router.push(`/invoice/${json.invoice.id}`);
          }
        }
      })
      .catch((err) => console.error("Error loading confirmation:", err))
      .finally(() => setLoading(false));
  }, [id, router]);

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!mfsNumber || mfsNumber.length < 11) {
      setErrorMessage("Please enter a valid 11-digit mobile wallet number.");
      return;
    }

    if (!pin || pin.length < 4) {
      setErrorMessage("Please enter a 4 or 5 digit wallet PIN.");
      return;
    }

    setProcessing(true);

    try {
      const res = await fetch("/api/payments/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          confirmationId: confirmation.id,
          paymentMethod: method,
          mfsNumber,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.message || "Payment authorization failed.");
        setProcessing(false);
        return;
      }

      router.push(`/invoice/${data.invoice.id}`);
    } catch (err) {
      setErrorMessage("Network error during payment gateway connection.");
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#0675c1] mb-2" />
        <span className="text-xs font-semibold text-slate-500">Connecting to Secure Payment Gateway...</span>
      </div>
    );
  }

  if (!confirmation) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 bg-slate-50 text-center px-4">
        <AlertCircle className="h-12 w-12 text-slate-400 mb-3" />
        <h2 className="text-xl font-bold text-slate-900">Payment Record Not Found</h2>
        <Link href="/tutor/dashboard" className="mt-4">
          <Button variant="default" size="sm">Go to Dashboard</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 space-y-6">
        {/* Navigation Breadcrumb */}
        <Link
          href={`/job/confirmation-letter/${confirmation.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#0675c1]"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Confirmation Letter
        </Link>

        {/* Security Trust Banner */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[#00a65a]">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">256-bit SSL Encrypted Payment</span>
              <span className="text-[11px] text-slate-500">Simulated Escrow Gateway • Bangladesh Bank Compliant</span>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-[#0675c1] border border-blue-200 uppercase">
            Official Checkout
          </span>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="rounded-xl bg-red-50 p-4 border border-red-200 flex items-center gap-2.5 text-xs font-bold text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Payment Method Selector & Form (Left 3 cols) */}
          <div className="md:col-span-3 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">Select Payment Method</h2>
              <p className="text-xs text-slate-500 mt-0.5">Choose your preferred mobile banking wallet or card:</p>
            </div>

            {/* Method Tabs */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "bKash", name: "bKash", color: "border-[#e2136e] bg-[#e2136e]/5 text-[#e2136e]" },
                { id: "Nagad", name: "Nagad", color: "border-[#f7941d] bg-[#f7941d]/5 text-[#f7941d]" },
                { id: "Rocket", name: "Rocket / Upay", color: "border-purple-600 bg-purple-50 text-purple-700" },
                { id: "Card", name: "Debit / Credit Card", color: "border-blue-600 bg-blue-50 text-blue-700" },
              ].map((item: any) => {
                const isSelected = method === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setMethod(item.id)}
                    className={`p-3 rounded-2xl border-2 text-left font-bold text-xs transition-all flex items-center justify-between ${
                      isSelected ? item.color + " ring-1" : "border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    <span>{item.name}</span>
                    {isSelected && <CheckCircle2 className="h-4 w-4" />}
                  </button>
                );
              })}
            </div>

            {/* MFS Form Simulation */}
            <form onSubmit={handlePaymentSubmit} className="space-y-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Smartphone className="h-4 w-4 text-[#0675c1]" />
                  Enter {method} Account Details
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    {method} Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={mfsNumber}
                    onChange={(e) => setMfsNumber(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3.5 text-xs font-mono font-bold text-slate-900 focus:border-[#0675c1] focus:ring-1 focus:ring-[#0675c1]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Enter {method} PIN (Simulation)
                  </label>
                  <input
                    type="password"
                    required
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="•••••"
                    className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3.5 text-xs font-mono text-slate-900 focus:border-[#0675c1] focus:ring-1 focus:ring-[#0675c1]"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    * This is a sandbox testing gateway. Enter any 4-5 digit PIN to simulate instant checkout.
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                disabled={processing}
                className="w-full h-12 bg-[#00a65a] hover:bg-[#008f4c] text-white font-bold text-sm shadow-md shadow-[#00a65a]/20 gap-2"
              >
                {processing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    Pay {confirmation.platformChargeAmount.toLocaleString()} BDT
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Order Summary Box (Right 2 cols) */}
          <div className="md:col-span-2 space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Order Summary
              </h3>

              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span>Confirmation ID:</span>
                  <span className="font-mono font-bold text-slate-900">#{confirmation.id}</span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span>Tuition Job Ref:</span>
                  <span className="font-mono font-bold text-[#0675c1]">Job #{confirmation.jobId}</span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span>Monthly Tuition Salary:</span>
                  <span className="font-bold text-slate-900">{confirmation.monthlySalary.toLocaleString()} BDT</span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span>Platform Placement Rate:</span>
                  <span className="font-bold text-[#0675c1]">{confirmation.platformChargeRate}% (One-time)</span>
                </div>

                <div className="flex items-center justify-between pt-1 text-sm font-black text-slate-900">
                  <span>Total Payable:</span>
                  <span className="text-[#00a65a] text-lg font-black">
                    {confirmation.platformChargeAmount.toLocaleString()} BDT
                  </span>
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 border border-slate-200 text-[11px] text-slate-500 leading-relaxed flex items-start gap-2">
                <Info className="h-4 w-4 text-[#0675c1] shrink-0 mt-0.5" />
                <span>
                  Protected by TutorBari 15-day student replacement guarantee. An official tax invoice will be generated upon completion.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
