import React, { Suspense } from "react";
import { PaymentCheckoutClient } from "@/components/payments/PaymentCheckoutClient";

export const metadata = {
  title: "Secure Payment Gateway | bKash / Nagad Checkout | TutorBari",
  description: "Complete your platform tuition placement fee securely via bKash, Nagad, Rocket, or Card.",
};

export function generateStaticParams() {
  return [
    { id: "243138" },
    { id: "243056" },
    { id: "242811" },
    { id: "242469" },
    { id: "242069" },
    { id: "241580" },
    { id: "cl_243138" },
  ];
}

async function CheckoutLoader({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PaymentCheckoutClient id={id} />;
}

export default function PaymentCheckoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      }
    >
      <CheckoutLoader params={params} />
    </Suspense>
  );
}
