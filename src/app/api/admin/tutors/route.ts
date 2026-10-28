import { NextRequest, NextResponse } from "next/server";
import { DB } from "@/lib/store";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin privileges required." },
        { status: 403 }
      );
    }

    const tutors = DB.getAllTutorsAdmin();

    return NextResponse.json({
      success: true,
      tutors,
      total: tutors.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch admin tutors." },
      { status: 500 }
    );
  }
}
