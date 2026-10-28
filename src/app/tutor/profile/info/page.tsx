import React, { Suspense } from "react";
import { TutorProfileClient } from "@/components/tutor/TutorProfileClient";

export const metadata = {
  title: "Tutor Profile Builder | Educational Credentials & Preferences | TutorBari",
  description: "Complete your tutor profile, add educational degrees, set tuition preferences, and upload KYC verification documents.",
};

export default function TutorProfileInfoPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      }
    >
      <TutorProfileClient />
    </Suspense>
  );
}
