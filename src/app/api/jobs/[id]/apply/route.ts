import { NextRequest, NextResponse } from "next/server";
import { DB } from "@/lib/store";
import { getSession } from "@/lib/auth";
import { sanitizeInput } from "@/lib/rateLimit";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const jobId = parseInt(id, 10);

    const session = await getSession();
    if (!session || session.role !== "TUTOR") {
      return NextResponse.json(
        { success: false, message: "Only registered Tutors can apply for this tuition." },
        { status: 401 }
      );
    }

    const tutor = DB.findTutorByUserId(session.userId);
    if (!tutor) {
      return NextResponse.json(
        { success: false, message: "Tutor profile not found. Please complete your profile first." },
        { status: 404 }
      );
    }

    const job = DB.getJobById(jobId);
    if (!job) {
      return NextResponse.json(
        { success: false, message: "Job post does not exist or has been removed." },
        { status: 404 }
      );
    }

    // Check if tutor already applied
    const existingApps = DB.getApplicationsByJobId(jobId);
    const alreadyApplied = existingApps.some((a) => a.tutorId === tutor.id);
    if (alreadyApplied) {
      return NextResponse.json(
        { success: false, message: "You have already applied for this tuition." },
        { status: 400 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const {
      expectedSalary,
      coverNote,
      availableFrom,
      availableDays,
      convenientTime,
      agreementAccepted,
    } = body;
    const sanitizedCoverNote = sanitizeInput(coverNote);
    const sanitizedAvailFrom = sanitizeInput(availableFrom);
    const sanitizedTime = sanitizeInput(convenientTime);

    const application = DB.applyToJob({
      jobId,
      tutorId: tutor.id,
      tutorName: tutor.name,
      tutorPhone: tutor.phone,
      tutorInstitution: tutor.institution,
      tutorDepartment: tutor.department,
      tutorRating: tutor.rating,
      tutorVerified: tutor.isVerified,
      expectedSalary: expectedSalary ? Number(expectedSalary) : undefined,
      availableFrom: sanitizedAvailFrom || "Immediately",
      availableDays: availableDays ? Number(availableDays) : undefined,
      convenientTime: sanitizedTime || undefined,
      coverNote: sanitizedCoverNote || "I am interested in tutoring this student and confident in delivering excellent results.",
      agreementAccepted: Boolean(agreementAccepted),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully! Guardian will be notified.",
        application,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to submit application." },
      { status: 500 }
    );
  }
}
