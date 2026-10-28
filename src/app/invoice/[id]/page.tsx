import React, { Suspense } from "react";
import { InvoiceClient } from "@/components/invoices/InvoiceClient";

export const metadata = {
  title: "Official Payment Invoice & Receipt | TutorBari",
  description: "Official VAT tax invoice and proof of platform fee payment for confirmed tuitions.",
};

export function generateStaticParams() {
  return [
    { id: "243138" },
    { id: "cl_243138" },
    { id: "INV-2026-10001" },
  ];
}

async function InvoiceLoader({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <InvoiceClient id={id} />;
}

export default function InvoicePage({
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
      <InvoiceLoader params={params} />
    </Suspense>
  );
}
