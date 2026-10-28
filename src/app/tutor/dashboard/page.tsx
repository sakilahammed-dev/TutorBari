import React, { Suspense } from "react";
import { TutorDashboardClient } from "@/components/tutor/TutorDashboardClient";

export const metadata = {
  title: "Tutor Dashboard | Track Applications & Matched Tuitions | TutorBari",
  description: "Manage your tuition applications, track demo class schedules, view matched jobs, and update your profile.",
};

export default function TutorDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      }
    >
      <TutorDashboardClient />
    </Suspense>
  );
}
