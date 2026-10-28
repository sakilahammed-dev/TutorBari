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
    const { documentType, fileName, fileUrl } = body;

    if (!documentType || !fileName) {
      return NextResponse.json(
        { success: false, message: "Document type and file name are required." },
        { status: 400 }
      );
    }

    const newDoc = DB.addTutorDocument(tutor.id, {
      documentType,
      fileName,
      fileUrl: fileUrl || `/uploads/docs/${Date.now()}_${fileName}`,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Document uploaded successfully! It is now pending admin verification.",
        document: newDoc,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to upload document." },
      { status: 500 }
    );
  }
}
