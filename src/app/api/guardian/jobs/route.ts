import { NextRequest, NextResponse } from "next/server";
import { DB } from "@/lib/store";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "GUARDIAN") {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Guardian login required." },
        { status: 401 }
      );
    }

    const guardian = DB.findGuardianByUserId(session.userId);
    const guardianId = guardian ? guardian.id : `grd_${session.userId}`;

    const jobs = DB.getJobsByGuardianId(guardianId);

    // Enrich jobs with total applications and status counts
    const enrichedJobs = jobs.map((job) => {
      const apps = DB.getApplicationsByJobId(job.id);
      return {
        ...job,
        applicationsCount: apps.length,
        shortlistedCount: apps.filter((a) => a.status === "SHORTLISTED").length,
        demoCount: apps.filter((a) => a.status === "DEMO_SCHEDULED").length,
        appointedCount: apps.filter((a) => a.status === "APPOINTED").length,
      };
    });

    return NextResponse.json({
      success: true,
      jobs: enrichedJobs,
      total: enrichedJobs.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch guardian jobs." },
      { status: 500 }
    );
  }
}
