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
    const jobId = parseInt(id, 10);

    if (isNaN(jobId)) {
      return NextResponse.json({ success: false, message: "Invalid Job ID" }, { status: 400 });
    }

    const comments = DB.getJobComments(jobId);
    return NextResponse.json({
      success: true,
      comments,
      total: comments.length,
    });
  } catch (error) {
    console.error("GET comments error:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch comments" }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const jobId = parseInt(id, 10);

    if (isNaN(jobId)) {
      return NextResponse.json({ success: false, message: "Invalid Job ID" }, { status: 400 });
    }

    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Please sign in to post a question or comment." },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));

    // Handle Upvote / Like
    if (body.action === "like" && body.commentId) {
      const likes = DB.likeJobComment(body.commentId);
      return NextResponse.json({
        success: true,
        message: "Comment liked successfully!",
        likes,
      });
    }

    const { message, parentId } = body;

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: "Message cannot be empty." },
        { status: 400 }
      );
    }

    const user = DB.findUserById(session.userId);
    const tutor = session.role === "TUTOR" ? DB.findTutorByUserId(session.userId) : null;
    const guardian = session.role === "GUARDIAN" ? DB.findGuardianByUserId(session.userId) : null;

    let authorName = user?.name || "Anonymous";
    if (session.role === "GUARDIAN") {
      authorName = `${guardian?.name || user?.name || "Guardian"} (Guardian)`;
    } else if (session.role === "TUTOR") {
      authorName = tutor ? `${tutor.name} (${tutor.institution || "Tutor"})` : user?.name || "Tutor";
    }

    const comment = DB.addJobComment({
      jobId,
      userId: session.userId,
      authorName,
      authorRole: session.role as any,
      authorInstitution: tutor?.institution,
      message: sanitizeInput(message),
      parentId: parentId || undefined,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Comment posted successfully!",
        comment,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to post comment" }, { status: 500 });
  }
}
