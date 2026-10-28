import { NextRequest, NextResponse } from "next/server";
import { DB } from "@/lib/store";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
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

    const body = await req.json();
    const { level, institution, curriculum, department, gpa, passingYear, isCurrent } = body;

    if (!level || !institution || !passingYear) {
      return NextResponse.json(
        { success: false, message: "Degree level, institution, and passing year are required." },
        { status: 400 }
      );
    }

    const newEdu = DB.addTutorEducation(tutor.id, {
      level,
      institution,
      curriculum: curriculum || undefined,
      department: department || undefined,
      gpa: gpa ? Number(gpa) : undefined,
      passingYear: Number(passingYear),
      isCurrent: !!isCurrent,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Education credential added successfully!",
        education: newEdu,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to add education record." },
      { status: 500 }
    );
  }
}
