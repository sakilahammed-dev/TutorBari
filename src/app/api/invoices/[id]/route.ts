import { NextRequest, NextResponse } from "next/server";
import { DB } from "@/lib/store";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    let invoice = DB.getInvoiceById(id);
    if (!invoice) {
      invoice = DB.getInvoiceByConfirmationId(id);
    }

    if (!invoice) {
      return NextResponse.json(
        { success: false, message: "Invoice not found." },
        { status: 404 }
      );
    }

    const confirmation = DB.getConfirmationById(invoice.confirmationId);
    const job = DB.getJobById(invoice.jobId);

    return NextResponse.json({
      success: true,
      invoice,
      confirmation: confirmation || null,
      job: job || null,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch invoice." },
      { status: 500 }
    );
  }
}
