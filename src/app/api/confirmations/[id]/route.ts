import { NextRequest, NextResponse } from "next/server";
import { DB } from "@/lib/store";
import { getSession } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if ID is numeric (Job ID) or string (Confirmation ID)
    let confirmation = DB.getConfirmationById(id);
    if (!confirmation && !isNaN(Number(id))) {
      confirmation = DB.getConfirmationByJobId(Number(id));
    }

    if (!confirmation) {
      // If job exists and has appointed tutor, auto-generate confirmation letter
      const job = !isNaN(Number(id)) ? DB.getJobById(Number(id)) : null;
      if (job) {
        const apps = DB.getApplicationsByJobId(job.id);
        const appointedApp = apps.find((a) => a.status === "APPOINTED") || apps[0];
        if (appointedApp) {
          const tutor = DB.findTutorById(appointedApp.tutorId);
          const salaryNum = parseInt(job.salary.replace(/[^0-9]/g, ""), 10) || 7000;
          const isPackage = job.tuitionType === "Package Tutoring";
          const rate = isPackage ? 35 : 55;

          confirmation = DB.createConfirmation({
            jobId: job.id,
            jobTitle: job.title,
            guardianId: job.guardianId,
            guardianName: job.guardianName || "Guardian",
            guardianPhone: job.guardianPhone || "01711000001",
            tutorId: appointedApp.tutorId,
            tutorName: appointedApp.tutorName || tutor?.name || "Tutor",
            tutorInstitution: appointedApp.tutorInstitution || tutor?.institution || "Public University",
            monthlySalary: salaryNum,
            daysPerWeek: job.tutoringDaysPerWeek || 3,
            startDate: "Nov 01, 2026",
            platformChargeRate: rate,
          });
        }
      }
    }

    if (!confirmation) {
      return NextResponse.json(
        { success: false, message: "Confirmation letter not found." },
        { status: 404 }
      );
    }

    const invoice = DB.getInvoiceByConfirmationId(confirmation.id);

    return NextResponse.json({
      success: true,
      confirmation,
      invoice: invoice || null,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch confirmation letter." },
      { status: 500 }
    );
  }
}
