import { NextRequest, NextResponse } from "next/server";
import { DB } from "@/lib/store";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "TUTOR") {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Tutor login required." },
        { status: 401 }
      );
    }

    const tutor = DB.findTutorByUserId(session.userId);
    if (!tutor) {
      return NextResponse.json(
        { success: false, message: "Tutor profile not found." },
        { status: 404 }
      );
    }

    const applications = DB.getApplicationsByTutorId(tutor.id);

    // Enrich each application with full Job details and contact if demo scheduled
    const enriched = applications.map((app) => {
      const job = DB.getJobById(app.jobId);
      const isRevealed = app.status === "DEMO_SCHEDULED" || app.status === "APPOINTED";

      return {
        ...app,
        job: job
          ? {
              id: job.id,
              title: job.title,
              category: job.category,
              className: job.className,
              subjects: job.subjects,
              tuitionType: job.tuitionType,
              salary: job.salary,
              city: job.city,
              location: job.location,
              tutoringDaysPerWeek: job.tutoringDaysPerWeek,
              tutoringTime: job.tutoringTime,
              status: job.status,
              guardianName: isRevealed ? job.guardianName : undefined,
              guardianPhone: isRevealed ? job.guardianPhone : undefined,
              detailedAddress: isRevealed ? job.detailedAddress : undefined,
            }
          : null,
      };
    });

    return NextResponse.json({
      success: true,
      applications: enriched,
      total: enriched.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch tutor applications." },
      { status: 500 }
    );
  }
}
