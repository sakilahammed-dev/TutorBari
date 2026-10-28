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

    const invoices = DB.getAllInvoices();
    const totalRevenue = invoices.reduce((sum, inv) => sum + (inv.amount || 0), 0);

    return NextResponse.json({
      success: true,
      invoices,
      totalRevenue,
      totalInvoices: invoices.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch financial audit ledger." },
      { status: 500 }
    );
  }
}
