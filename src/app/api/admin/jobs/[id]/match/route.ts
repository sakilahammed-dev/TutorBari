import { NextRequest, NextResponse } from "next/server";
import { DB } from "@/lib/store";
import { getSession } from "@/lib/auth";
import { matchTutorsForJob } from "@/lib/matchmaking";

export async function GET(
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

    const job = DB.getJobById(jobId);
    if (!job) {
      return NextResponse.json(
        { success: false, message: "Job post not found." },
        { status: 404 }
      );
    }

    const matches = matchTutorsForJob(jobId);

    return NextResponse.json({
      success: true,
      job,
      matches,
      totalMatched: matches.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to run matchmaking algorithm." },
      { status: 500 }
    );
  }
}
