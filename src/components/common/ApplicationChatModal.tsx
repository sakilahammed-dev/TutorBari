"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Send,
  MessageCircle,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Clock,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ApplicationMessage } from "@/lib/types";

interface ApplicationChatModalProps {
  applicationId: string;
  jobId: number;
  jobTitle?: string;
  otherPartyName: string;
  otherPartyRole: "TUTOR" | "GUARDIAN";
  currentUserRole: "TUTOR" | "GUARDIAN" | "ADMIN";
  onClose: () => void;
}

export function ApplicationChatModal({
  applicationId,
  jobId,
  jobTitle,
  otherPartyName,
  otherPartyRole,
  currentUserRole,
  onClose,
}: ApplicationChatModalProps) {
  const [messages, setMessages] = useState<ApplicationMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [inputMessage, setInputMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = () => {
    fetch(`/api/applications/${applicationId}/messages`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.success && data.messages) {
          setMessages(data.messages);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [applicationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setSending(true);
    setError(null);

    const messageText = inputMessage.trim();
    setInputMessage("");

    try {
      const res = await fetch(`/api/applications/${applicationId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to send message.");
        setInputMessage(messageText);
        setSending(false);
        return;
      }

      fetchMessages();
    } catch {
      setError("Network error occurred.");
      setInputMessage(messageText);
    } finally {
      setSending(false);
    }
  };

  const quickPrompts =
    currentUserRole === "GUARDIAN"
      ? [
          "আপনি কি আগামী শুক্রবার ডেমো ক্লাসে আসতে পারবেন?",
          "ছাত্রের অংক ও বিজ্ঞানের বেসিক কেমন তা যাচাই করা দরকার।",
          "আপনার সাথে বিস্তারিত আলোচনা করতে চাচ্ছি।",
        ]
      : [
          "জি ইনশাআল্লাহ, আমি সময়মতো নির্ধারিত স্থানে উপস্থিত থাকব।",
          "ডেমো ক্লাসের জন্য নির্দিষ্ট কোনো অধ্যায় পড়াতে হবে কি?",
          "আমি সিলেবাসের প্রয়োজনীয় নোটস ও প্রশ্ন সাথে নিয়ে আসব।",
        ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl border border-slate-200 flex flex-col h-[600px] max-h-[92vh] overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0675c1] text-white font-bold shadow-md shadow-[#0675c1]/20">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">{otherPartyName}</h3>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                    otherPartyRole === "GUARDIAN" ? "bg-blue-100 text-blue-800" : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {otherPartyRole === "GUARDIAN" ? "Guardian" : "Tutor"}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 truncate max-w-xs sm:max-w-md">
                Job #{jobId} {jobTitle ? `• ${jobTitle}` : ""}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/30">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-[#0675c1]" />
            </div>
          ) : messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2">
              <div className="h-12 w-12 rounded-full bg-[#0675c1]/10 flex items-center justify-center text-[#0675c1]">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm">No messages yet</h4>
              <p className="text-xs text-slate-500 max-w-xs">
                Start the conversation regarding tuition timings, demo class schedule, or requirements.
              </p>
            </div>
          ) : (
            messages.map((msg) => {
              const isMe = msg.senderRole === currentUserRole;

              return (
                <div key={msg.id} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                  <div className="flex items-center gap-1.5 mb-1 text-[11px] text-slate-400">
                    <span className="font-bold text-slate-700">{isMe ? "You" : msg.senderName}</span>
                    <span>•</span>
                    <span>
                      {new Date(msg.createdAt).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-xs whitespace-pre-wrap ${
                      isMe
                        ? "bg-[#0675c1] text-white rounded-br-xs"
                        : "bg-white border border-slate-200 text-slate-800 rounded-bl-xs"
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-amber-500" /> Suggestions:
          </span>
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setInputMessage(prompt)}
              className="text-[11px] whitespace-nowrap bg-white border border-slate-200 hover:border-[#0675c1] text-slate-600 hover:text-[#0675c1] px-2.5 py-1 rounded-full transition-all shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mx-4 my-2 p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-4 border-t border-slate-200 bg-white flex items-center gap-2.5">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message or tuition update here..."
            className="flex-1 h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-xs text-slate-900 focus:bg-white focus:border-[#0675c1] focus:ring-1 focus:ring-[#0675c1] focus:outline-none transition-all"
          />

          <Button
            type="submit"
            disabled={sending || !inputMessage.trim()}
            className="h-11 px-5 bg-[#0675c1] hover:bg-[#125a9c] text-white text-xs font-bold gap-1.5 rounded-xl shrink-0 shadow-sm"
          >
            {sending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
