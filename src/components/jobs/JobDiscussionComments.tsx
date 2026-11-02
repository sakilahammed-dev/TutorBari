"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Send,
  CornerDownRight,
  ThumbsUp,
  User,
  ShieldCheck,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { JobComment } from "@/lib/types";

interface JobDiscussionCommentsProps {
  jobId: number;
  currentUser: any;
}

export function JobDiscussionComments({ jobId, currentUser }: JobDiscussionCommentsProps) {
  const [comments, setComments] = useState<JobComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [replyingTo, setReplyingTo] = useState<JobComment | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fetchComments = () => {
    fetch(`/api/jobs/${jobId}/comments`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.success && data.comments) {
          setComments(data.comments);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchComments();
  }, [jobId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    if (!currentUser) {
      setError("Please sign in to ask a question or join the discussion.");
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await fetch(`/api/jobs/${jobId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: message.trim(),
          parentId: replyingTo ? replyingTo.id : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to post comment.");
        setSubmitting(false);
        return;
      }

      setMessage("");
      setReplyingTo(null);
      setSuccessMsg("Your question/comment has been posted!");
      setTimeout(() => setSuccessMsg(null), 3000);
      fetchComments();
    } catch {
      setError("An unexpected network error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  // Organize top-level comments and replies
  const rootComments = comments.filter((c) => !c.parentId);
  const getReplies = (parentId: string) => comments.filter((c) => c.parentId === parentId);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0675c1]/10 text-[#0675c1]">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Questions & Discussion (প্রশ্ন ও আলোচনা)
            </h2>
            <p className="text-xs text-slate-500">
              Ask questions regarding requirements, timings, or negotiate with the guardian.
            </p>
          </div>
        </div>
        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
          {comments.length} Comments
        </span>
      </div>

      {/* Input Box */}
      {currentUser ? (
        <form onSubmit={handleSubmit} className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
          {replyingTo && (
            <div className="flex items-center justify-between text-xs bg-blue-50 text-[#0675c1] p-2 rounded-lg border border-blue-200 font-medium">
              <span>
                Replying to <strong>{replyingTo.authorName}</strong>
              </span>
              <button
                type="button"
                onClick={() => setReplyingTo(null)}
                className="text-slate-500 hover:text-slate-700 font-bold ml-2"
              >
                ✕ Cancel
              </button>
            </div>
          )}

          <div className="relative">
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                replyingTo
                  ? `Write your reply to ${replyingTo.authorName}...`
                  : "Have any questions about this tuition? Ask here (e.g. days/week, timings, subject focus)..."
              }
              className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#0675c1] focus:ring-1 focus:ring-[#0675c1] focus:outline-none"
            />
          </div>

          {error && (
            <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg flex items-center gap-1.5 font-medium">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          {successMsg && (
            <div className="text-xs text-emerald-700 bg-emerald-50 p-2.5 rounded-lg flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              {successMsg}
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <div className="text-[11px] text-slate-400 flex items-center gap-1">
              <span>Posting as:</span>
              <strong className="text-slate-700">
                {currentUser.name} ({currentUser.role === "TUTOR" ? "Tutor" : currentUser.role === "GUARDIAN" ? "Guardian" : "Admin"})
              </strong>
            </div>

            <Button
              type="submit"
              disabled={submitting || !message.trim()}
              className="h-9 px-5 bg-[#0675c1] hover:bg-[#125a9c] text-white text-xs font-bold gap-1.5 rounded-xl shadow-xs"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" />
                  Post Comment
                </>
              )}
            </Button>
          </div>
        </form>
      ) : (
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-2">
          <p className="text-xs text-slate-600">
            Have a question about this tuition? Sign in to comment and chat with the guardian.
          </p>
          <Link href={`/signin?redirect=/job/view/${jobId}`}>
            <Button size="sm" variant="outline" className="text-xs font-bold text-[#0675c1] border-[#0675c1]/30">
              Sign In to Ask a Question
            </Button>
          </Link>
        </div>
      )}

      {/* Comments List */}
      {loading ? (
        <div className="py-6 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-[#0675c1]" />
        </div>
      ) : rootComments.length === 0 ? (
        <div className="py-6 text-center text-xs text-slate-400">
          No questions or comments yet. Be the first to ask!
        </div>
      ) : (
        <div className="space-y-4 pt-2">
          {rootComments.map((comment) => {
            const replies = getReplies(comment.id);

            return (
              <div key={comment.id} className="space-y-3">
                {/* Main Comment Bubble */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center">
                        {comment.authorName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 mr-2">{comment.authorName}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                            comment.authorRole === "GUARDIAN"
                              ? "bg-blue-100 text-blue-800"
                              : comment.authorRole === "ADMIN"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {comment.authorRole === "GUARDIAN" ? "Guardian" : comment.authorRole === "TUTOR" ? "Tutor" : "Admin"}
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {new Date(comment.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed pl-9 whitespace-pre-wrap">{comment.message}</p>

                  <div className="flex items-center justify-end gap-3 pl-9 pt-1">
                    {currentUser && (
                      <button
                        type="button"
                        onClick={() => {
                          setReplyingTo(comment);
                          window.scrollTo({ behavior: "smooth", top: 400 });
                        }}
                        className="text-[11px] font-semibold text-[#0675c1] hover:underline flex items-center gap-1"
                      >
                        <CornerDownRight className="h-3 w-3" /> Reply
                      </button>
                    )}
                  </div>
                </div>

                {/* Nested Replies */}
                {replies.length > 0 && (
                  <div className="pl-6 sm:pl-10 space-y-2.5">
                    {replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="p-3.5 rounded-xl border border-slate-200/90 bg-slate-50/70 space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px] flex items-center justify-center">
                              {reply.authorName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <span className="text-xs font-bold text-slate-900 mr-2">{reply.authorName}</span>
                              <span
                                className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                                  reply.authorRole === "GUARDIAN"
                                    ? "bg-blue-100 text-blue-800"
                                    : reply.authorRole === "ADMIN"
                                    ? "bg-purple-100 text-purple-800"
                                    : "bg-emerald-100 text-emerald-800"
                                }`}
                              >
                                {reply.authorRole === "GUARDIAN" ? "Guardian" : reply.authorRole === "TUTOR" ? "Tutor" : "Admin"}
                              </span>
                            </div>
                          </div>
                          <span className="text-[10px] text-slate-400">
                            {new Date(reply.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed pl-8 whitespace-pre-wrap">{reply.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
