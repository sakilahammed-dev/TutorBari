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
    const tutorId = id;

    const reviews = DB.getTutorReviews(tutorId);
    return NextResponse.json({
      success: true,
      reviews,
      total: reviews.length,
    });
  } catch (error) {
    console.error("GET reviews error:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const tutorId = id;

    const session = await getSession();
    if (!session || session.role !== "GUARDIAN") {
      return NextResponse.json(
        { success: false, message: "Only Guardians can leave reviews for tutors." },
        { status: 403 }
      );
    }

    const tutor = DB.findTutorById(tutorId);
    if (!tutor) {
      return NextResponse.json({ success: false, message: "Tutor not found" }, { status: 404 });
    }

    const body = await req.json().catch(() => ({}));
    const { rating, comment, subjects, className } = body;

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ success: false, message: "Please provide a valid rating (1-5 stars)." }, { status: 400 });
    }

    if (!comment || comment.trim().length === 0) {
      return NextResponse.json({ success: false, message: "Please write a review comment." }, { status: 400 });
    }

    const guardian = DB.findGuardianByUserId(session.userId);
    const user = DB.findUserById(session.userId);

    const newReview = DB.addTutorReview({
      tutorId,
      guardianId: guardian?.id || session.userId,
      guardianName: guardian?.name || user?.name || "Guardian",
      rating: Number(rating),
      comment: sanitizeInput(comment),
      subjects: subjects ? sanitizeInput(subjects) : undefined,
      className: className ? sanitizeInput(className) : undefined,
    });

    return NextResponse.json({
      success: true,
      message: "Review submitted successfully! Thank you for your feedback.",
      review: newReview,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to submit review" }, { status: 500 });
  }
}
