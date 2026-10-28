import { NextRequest, NextResponse } from "next/server";
import { DB } from "@/lib/store";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin privileges required." },
        { status: 403 }
      );
    }

    const jobs = DB.getAllJobsAdmin();
    const tutors = DB.getAllTutorsAdmin();
    const invoices = DB.getAllInvoices();

    const totalRevenue = invoices.reduce((acc, curr) => acc + (curr.amount || 0), 0);
    const pendingJobsCount = jobs.filter((j) => j.status === "PENDING_APPROVAL").length;
    const liveJobsCount = jobs.filter((j) => j.status === "LIVE").length;
    const appointedJobsCount = jobs.filter((j) => j.status === "APPOINTED").length;

    const pendingKycCount = tutors.filter((t) =>
      t.documents?.some((d) => d.status === "PENDING_VERIFICATION")
    ).length;
    const verifiedTutorsCount = tutors.filter((t) => t.isVerified).length;

    return NextResponse.json({
      success: true,
      stats: {
        totalRevenue,
        totalJobs: jobs.length,
        pendingJobsCount,
        liveJobsCount,
        appointedJobsCount,
        totalTutors: tutors.length,
        pendingKycCount,
        verifiedTutorsCount,
        totalInvoices: invoices.length,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch admin stats." },
      { status: 500 }
    );
  }
}
