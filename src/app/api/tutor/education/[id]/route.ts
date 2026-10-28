import { NextRequest, NextResponse } from "next/server";
import { DB } from "@/lib/store";
import { getSession } from "@/lib/auth";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const removed = DB.removeTutorEducation(tutor.id, id);
    if (!removed) {
      return NextResponse.json(
        { success: false, message: "Education record not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Education record removed successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete education record." },
      { status: 500 }
    );
  }
}
