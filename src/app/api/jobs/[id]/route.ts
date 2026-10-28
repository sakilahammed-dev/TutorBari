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
      applied,
      application,
    },
  });
}
