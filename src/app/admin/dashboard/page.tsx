import React, { Suspense } from "react";
import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";

export const metadata = {
  title: "Admin Command Center | TutorBari Platform Operations",
  description:
    "Central administration console for job approvals, tutor KYC verification, revenue tracking, and AI matchmaking.",
};

export default function AdminDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      }
    >
      <AdminDashboardClient />
    </Suspense>
  );
}
