import React, { Suspense } from "react";
import { ConfirmationLetterClient } from "@/components/confirmations/ConfirmationLetterClient";

export const metadata = {
  title: "Digital Confirmation Letter & Tutoring Agreement | TutorBari",
  description: "Official legal confirmation letter and mutual agreement for appointed home and online tuitions.",
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

async function LetterLoader({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ConfirmationLetterClient id={id} />;
}

export default function ConfirmationLetterPage({
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
      <LetterLoader params={params} />
    </Suspense>
  );
}
