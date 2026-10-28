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

    const { searchParams } = new URL(req.url);
    const statusFilter = searchParams.get("status");

    let jobs = DB.getAllJobsAdmin();
    if (statusFilter && statusFilter !== "ALL") {
      jobs = jobs.filter((j) => j.status === statusFilter);
    }

    return NextResponse.json({
      success: true,
      jobs,
      total: jobs.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch admin jobs." },
      { status: 500 }
    );
  }
}
