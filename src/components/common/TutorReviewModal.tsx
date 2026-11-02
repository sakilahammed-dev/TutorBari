"use client";

import React, { useState } from "react";
import {
  X,
  Star,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ThumbsUp,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface TutorReviewModalProps {
  tutorId: string;
  tutorName: string;
  jobTitle?: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export function TutorReviewModal({
  tutorId,
  tutorName,
  jobTitle,
  onClose,
  onSuccess,
}: TutorReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const tags = [
    "Punctual & Dedicated",
    "Strong Subject Concepts",
    "Friendly & Caring",
    "Great with Children",
    "Exam Focused",
    "Highly Recommended",
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError("Please write a few words about your experience with this tutor.");
      return;
    }

    setSubmitting(true);
    setError(null);

    const fullComment =
      selectedTags.length > 0
        ? `${comment.trim()}\n\n[Highlights: ${selectedTags.join(", ")}]`
        : comment.trim();

    try {
      const res = await fetch(`/api/tutor/${tutorId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          comment: fullComment,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to submit review.");
        setSubmitting(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 1500);
    } catch {
      setError("Network error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Rate & Review Tutor</h3>
            <p className="text-xs text-slate-500 mt-0.5">{tutorName}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
            <h4 className="text-base font-bold text-slate-900">Review Submitted!</h4>
            <p className="text-xs text-slate-500">
              Thank you for helping other parents find the best verified tutors.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Interactive Stars */}
            <div className="text-center space-y-1.5 py-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Overall Teaching Rating
              </label>
              <div className="flex items-center justify-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="p-1 focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-7 w-7 ${
                        star <= (hoverRating || rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-200"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-xs font-semibold text-amber-600 block">
                {rating === 5
                  ? "Outstanding (5/5)"
                  : rating === 4
                  ? "Very Good (4/5)"
                  : rating === 3
                  ? "Satisfactory (3/5)"
                  : rating === 2
                  ? "Needs Improvement (2/5)"
                  : "Poor (1/5)"}
              </span>
            </div>

            {/* Quick Highlight Tags */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
                Quick Highlights:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                      selectedTags.includes(tag)
                        ? "bg-[#0675c1] text-white border-[#0675c1] font-semibold"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Comment Area */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Your Review & Feedback <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience regarding punctuality, patience, and how well the tutor explained the topics..."
                className="w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-900 focus:border-[#0675c1] focus:ring-1 focus:ring-[#0675c1] focus:outline-none"
              />
            </div>

            {error && (
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
              <Button type="button" variant="outline" size="sm" onClick={onClose} className="text-xs font-bold">
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={submitting || !comment.trim()}
                className="bg-[#0675c1] hover:bg-[#125a9c] text-white font-bold text-xs gap-1.5"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <ThumbsUp className="h-3.5 w-3.5" />
                    Submit Review
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
