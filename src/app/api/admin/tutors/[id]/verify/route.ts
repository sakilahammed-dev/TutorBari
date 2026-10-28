import { NextRequest, NextResponse } from "next/server";
import { DB } from "@/lib/store";
import { getSession } from "@/lib/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // tutorId
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin privileges required." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { docId, docStatus, verificationLevel } = body;

    const tutor = DB.verifyTutorDocument(
      id,
      docId,
      docStatus || "VERIFIED",
      verificationLevel || "PREMIUM_VERIFIED"
    );

    if (!tutor) {
      return NextResponse.json(
        { success: false, message: "Tutor not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Tutor ${tutor.name} verified successfully as ${tutor.verificationLevel}!`,
      tutor,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to verify tutor." },
      { status: 500 }
    );
  }
}
