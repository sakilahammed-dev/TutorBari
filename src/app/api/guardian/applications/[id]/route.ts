import { NextRequest, NextResponse } from "next/server";
import { DB } from "@/lib/store";
import { getSession } from "@/lib/auth";
import { ApplicationStatus } from "@/lib/types";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getSession();
    if (!session || (session.role !== "GUARDIAN" && session.role !== "ADMIN")) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Guardian login required." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { status, demoDate, demoTime, demoNotes } = body;

    const validStatuses: ApplicationStatus[] = [
      "APPLIED",
      "SHORTLISTED",
      "DEMO_SCHEDULED",
      "APPOINTED",
      "REJECTED",
    ];

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: `Invalid status: ${status}` },
        { status: 400 }
      );
    }

    const updatedApp = DB.updateApplicationStatus(id, status, {
      demoDate,
      demoTime,
      demoNotes,
    });

    if (!updatedApp) {
      return NextResponse.json(
        { success: false, message: "Application not found." },
        { status: 404 }
      );
    }

    // If appointed, update job status to APPOINTED
    if (status === "APPOINTED") {
      DB.updateJobStatus(updatedApp.jobId, "APPOINTED");
    }

    return NextResponse.json({
      success: true,
      message: `Tutor application updated to ${status}.`,
      application: updatedApp,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update application status." },
      { status: 500 }
    );
  }
}
