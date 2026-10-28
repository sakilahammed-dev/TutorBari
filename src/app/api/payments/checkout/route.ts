import { NextRequest, NextResponse } from "next/server";
import { DB } from "@/lib/store";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please sign in to complete payment." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { confirmationId, paymentMethod, mfsNumber, transactionId } = body;

    if (!confirmationId || !paymentMethod) {
      return NextResponse.json(
        { success: false, message: "Confirmation ID and Payment Method are required." },
        { status: 400 }
      );
    }

    const confirmation = DB.getConfirmationById(confirmationId);
    if (!confirmation) {
      return NextResponse.json(
        { success: false, message: "Confirmation letter not found." },
        { status: 404 }
      );
    }

    if (confirmation.paymentStatus === "PAID") {
      const existingInv = DB.getInvoiceByConfirmationId(confirmation.id);
      return NextResponse.json({
        success: true,
        message: "This confirmation fee is already paid in full.",
        invoice: existingInv,
      });
    }

    const resolvedTrxId =
      transactionId ||
      `TBX${Date.now().toString().slice(-6)}${Math.floor(1000 + Math.random() * 9000)}`;

    const newInvoice = DB.createInvoice({
      confirmationId: confirmation.id,
      jobId: confirmation.jobId,
      jobTitle: confirmation.jobTitle,
      tutorId: confirmation.tutorId,
      tutorName: confirmation.tutorName,
      tutorPhone: session.phone || "01722000002",
      amount: confirmation.platformChargeAmount,
      paymentMethod: paymentMethod || "bKash",
      transactionId: resolvedTrxId,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Payment processed successfully! Your official invoice has been generated.",
        invoice: newInvoice,
        redirectUrl: `/invoice/${newInvoice.id}`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Payment checkout error:", error);
    return NextResponse.json(
      { success: false, message: "Payment processing failed." },
      { status: 500 }
    );
  }
}
