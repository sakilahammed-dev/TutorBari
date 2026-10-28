import React, { Suspense } from "react";
import { SingleJobViewClient } from "@/components/jobs/SingleJobViewClient";
import { DB } from "@/lib/store";

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

async function JobViewLoader({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const initialJob = DB.getJobById(Number(id)) || null;
  return <SingleJobViewClient jobId={id} initialJob={initialJob} />;
}

export default function SingleJobViewPage({
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
      <JobViewLoader params={params} />
    </Suspense>
  );
}
