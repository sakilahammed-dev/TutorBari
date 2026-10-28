import { NextRequest, NextResponse } from "next/server";
import { DB } from "@/lib/store";
import { getSession } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const jobId = parseInt(id, 10);

    const session = await getSession();
    if (!session || (session.role !== "GUARDIAN" && session.role !== "ADMIN")) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Guardian login required." },
        { status: 401 }
      );
    }

    const job = DB.getJobById(jobId);
    if (!job) {
      return NextResponse.json(
        { success: false, message: "Job post not found." },
        { status: 404 }
      );
    }

    // Verify ownership if not admin
    if (session.role === "GUARDIAN") {
      const guardian = DB.findGuardianByUserId(session.userId);
      if (guardian && job.guardianId !== guardian.id) {
        return NextResponse.json(
          { success: false, message: "You do not have permission to view applicants for this job." },
          { status: 403 }
        );
      }
    }

    const applications = DB.getApplicationsByJobId(jobId);

    // Enrich applications with full tutor profile data
    const enrichedApplications = applications.map((app) => {
      const tutor = DB.findTutorById(app.tutorId);
      return {
        ...app,
        tutor: tutor
          ? {
              id: tutor.id,
              name: tutor.name,
              gender: tutor.gender,
              institution: tutor.institution,
              department: tutor.department,
              rating: tutor.rating,
              totalReviews: tutor.totalReviews,
              tuitionsCompleted: tutor.tuitionsCompleted,
              isVerified: tutor.isVerified,
              verificationLevel: tutor.verificationLevel,
              education: tutor.education,
              bio: tutor.bio,
              phone: app.status === "DEMO_SCHEDULED" || app.status === "APPOINTED" ? tutor.phone : undefined,
            }
          : null,
      };
    });

    return NextResponse.json({
      success: true,
      job,
      applications: enrichedApplications,
      total: enrichedApplications.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch applicants." },
      { status: 500 }
    );
  }
}
