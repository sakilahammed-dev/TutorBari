import React, { Suspense } from "react";
import { GuardianDashboardClient } from "@/components/guardian/GuardianDashboardClient";

export const metadata = {
  title: "Guardian Dashboard | Manage Tuition Posts & Tutors | TutorBari",
  description: "Manage your posted tuition requirements, review tutor applications, and schedule free trial classes.",
};

export default function GuardianDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      }
    >
      <GuardianDashboardClient />
    </Suspense>
  );
}
