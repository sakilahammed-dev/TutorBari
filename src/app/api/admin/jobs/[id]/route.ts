import { NextRequest, NextResponse } from "next/server";
import { DB } from "@/lib/store";
import { getSession } from "@/lib/auth";
import { JobStatus } from "@/lib/types";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const jobId = parseInt(id, 10);

    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin privileges required." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { status } = body;

    const validStatuses: JobStatus[] = ["LIVE", "PENDING_APPROVAL", "APPOINTED", "CANCELLED"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid job status." },
        { status: 400 }
      );
    }

    const updatedJob = DB.updateJobStatus(jobId, status);
    if (!updatedJob) {
      return NextResponse.json(
        { success: false, message: "Job post not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Job #${jobId} status updated to ${status}.`,
      job: updatedJob,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update job status." },
      { status: 500 }
    );
  }
}
