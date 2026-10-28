import { NextRequest, NextResponse } from "next/server";
import { DB } from "@/lib/store";
import { getSession } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const jobId = parseInt(id, 10);

  if (isNaN(jobId)) {
    return NextResponse.json({ success: false, message: "Invalid Job ID" }, { status: 400 });
  }

  const job = DB.getJobById(jobId);
  if (!job) {
    return NextResponse.json({ success: false, message: "Job not found" }, { status: 404 });
  }

  // Increment views
  DB.incrementJobViews(jobId);

  const session = await getSession();
  let applied = false;
  let application = null;

  if (session && session.role === "TUTOR") {
    const tutor = DB.findTutorByUserId(session.userId);
    if (tutor) {
      const apps = DB.getApplicationsByJobId(job.id);
      const userApp = apps.find((a) => a.tutorId === tutor.id);
      if (userApp) {
        applied = true;
        application = userApp;
      }
    }
  }

  return NextResponse.json({
    success: true,
    job: {
      ...job,
      views: job.views || 1,
      totalApplied: job.applicantsCount,
      applied,
      application,
    },
  });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const jobId = parseInt(id, 10);

    if (isNaN(jobId)) {
      return NextResponse.json({ success: false, message: "Invalid Job ID" }, { status: 400 });
    }

    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const job = DB.getJobById(jobId);
    if (!job) {
      return NextResponse.json({ success: false, message: "Job not found" }, { status: 404 });
    }

    // Check authorization: Guardian owner or Admin
    if (session.role === "GUARDIAN") {
      const guardian = DB.findGuardianByUserId(session.userId);
      if (!guardian || job.guardianId !== guardian.id) {
        return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
      }
    } else if (session.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const updatedJob = DB.updateJob(jobId, body);

    return NextResponse.json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to update job" }, { status: 500 });
  }
}
