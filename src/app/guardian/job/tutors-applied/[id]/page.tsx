import React, { Suspense } from "react";
import { GuardianJobApplicantsClient } from "@/components/guardian/GuardianJobApplicantsClient";

export function generateStaticParams() {
  return [
    { id: "243138" },
    { id: "243056" },
    { id: "242811" },
    { id: "242469" },
    { id: "242069" },
    { id: "241580" },
  ];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

async function TutorsAppliedLoader({ params }: PageProps) {
  const { id } = await params;
  return <GuardianJobApplicantsClient jobId={id} />;
}

export default function GuardianTutorsAppliedPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      }
    >
      <TutorsAppliedLoader params={params} />
    </Suspense>
  );
}
