import { NextRequest, NextResponse } from "next/server";
import { DB } from "@/lib/store";
import { getSession } from "@/lib/auth";
import { sanitizeInput } from "@/lib/rateLimit";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const applicationId = id;

    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const application = DB.getApplicationById(applicationId);
    if (!application) {
      return NextResponse.json({ success: false, message: "Application not found" }, { status: 404 });
    }

    const messages = DB.getApplicationMessages(applicationId);
    return NextResponse.json({
      success: true,
      messages,
      total: messages.length,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const applicationId = id;

    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const application = DB.getApplicationById(applicationId);
    if (!application) {
      return NextResponse.json({ success: false, message: "Application not found" }, { status: 404 });
    }

    const body = await req.json().catch(() => ({}));
    const { message } = body;

    if (!message || message.trim().length === 0) {
      return NextResponse.json({ success: false, message: "Message cannot be empty." }, { status: 400 });
    }

    const user = DB.findUserById(session.userId);
    const tutor = session.role === "TUTOR" ? DB.findTutorByUserId(session.userId) : null;
    const guardian = session.role === "GUARDIAN" ? DB.findGuardianByUserId(session.userId) : null;

    const senderName =
      session.role === "GUARDIAN"
        ? guardian?.name || user?.name || "Guardian"
        : tutor?.name || user?.name || "Tutor";

    const newMsg = DB.addApplicationMessage({
      applicationId,
      jobId: application.jobId,
      senderId: session.userId,
      senderName,
      senderRole: session.role as any,
      message: sanitizeInput(message),
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
      data: newMsg,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to send message" }, { status: 500 });
  }
}
