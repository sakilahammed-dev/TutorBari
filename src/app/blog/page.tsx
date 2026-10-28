import React from "react";
import Link from "next/link";
import { BookOpen, Calendar, Clock, User, ArrowRight, Sparkles, Tag, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export const metadata = {
  title: "Educational Blog & Tutoring Insights | TutorBari.com",
  description:
    "Expert advice for guardians on selecting verified tutors, curriculum guides (Cambridge, Edexcel, Bangla Medium), and professional tips for tutors in Bangladesh.",
};

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "choose-right-home-tutor-dhaka",
    title: "How to Choose the Right Home Tutor in Dhaka: A Guardian's Definitive Guide",
    excerpt:
      "From academic background verification at BUET/DMC/DU to psychological compatibility with your child, explore the essential factors every parent must evaluate before hiring a home tutor.",
    category: "Guardian Guide",
    readTime: "5 min read",
    date: "Oct 24, 2026",
    author: "Dr. Farhana Yasmin",
    authorRole: "Education Consultant & Child Psychologist",
  },
  {
    id: "cambridge-vs-edexcel-curriculum-guide",
    title: "Cambridge vs. Edexcel IGCSE: Understanding Curriculum Nuances in Bangladesh",
    excerpt:
      "A comprehensive breakdown of grading scales, exam session timings, syllabus rigor, and subject-specific tutoring requirements for O-Level and A-Level students.",
    category: "Curriculum Insight",
    readTime: "7 min read",
    date: "Oct 20, 2026",
    author: "Tanvir Ahmed",
    authorRole: "Senior Cambridge Physics & Math Tutor",
  },
  {
    id: "5-tips-for-exceptional-demo-class",
    title: "5 Proven Strategies for Tutors to Ace the Free Trial Demo Class",
    excerpt:
      "The trial class is your single opportunity to build trust with guardians. Learn how to prepare personalized diagnostic assessments and establish immediate student rapport.",
    category: "Tutor Career",
    readTime: "4 min read",
    date: "Oct 16, 2026",
    author: "Nusrat Jahan",
    authorRole: "Top-Rated Language Tutor, DU",
  },
  {
    id: "stem-tutoring-ssc-hsc-critical-thinking",
    title: "Why Conceptual STEM Tutoring is Essential for SSC & HSC Board Excellence",
    excerpt:
      "Moving beyond rote memorization: How structured problem-solving in Higher Math and Physics equips students for competitive university admission tests.",
    category: "Academic Excellence",
    readTime: "6 min read",
    date: "Oct 12, 2026",
    author: "Engr. Rafiqul Islam",
    authorRole: "BUET Alumni & Science Mentor",
  },
  {
    id: "platform-fee-escrow-safety-policy",
    title: "Understanding Platform Fees & Escrow Protection: How Digital Contracts Protect You",
    excerpt:
      "Why Caretutors-style 55% platform commission and legal confirmation letters guarantee a 15-day student replacement warranty and prevent tutoring fraud.",
    category: "Platform & Policy",
    readTime: "4 min read",
    date: "Oct 08, 2026",
    author: "TutorBari Trust & Safety Team",
    authorRole: "Operations Division",
  },
  {
    id: "time-management-for-university-tutors",
    title: "Balancing University Academics and Part-Time Tutoring: 4 Essential Habits",
    excerpt:
      "Practical schedule-clustering advice to maintain a 3.8+ CGPA at public universities while earning an independent monthly income through local neighborhood tuitions.",
    category: "Tutor Career",
    readTime: "5 min read",
    date: "Oct 04, 2026",
    author: "Sadia Afrin",
    authorRole: "Medical Student & Academic Tutor",
  },
];

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Blog Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#0675c1] text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="h-4 w-4" />
            TutorBari Knowledge Center
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Educational Insights, Guides &amp; Success Stories
          </h1>
          <p className="mt-3 text-base text-slate-600">
            Expert articles designed to help guardians discover the best tutoring strategies and empower passionate tutors to grow their teaching careers.
          </p>
        </div>

        {/* Featured Top Story */}
        <div className="mb-12 rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="default" className="text-xs font-bold">Featured Story</Badge>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> 5 min read
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight hover:text-[#0675c1] transition-colors">
                  {blogPosts[0].title}
                </h2>
                <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                  {blogPosts[0].excerpt}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#0675c1] text-white flex items-center justify-center font-bold text-sm">
                    FY
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{blogPosts[0].author}</p>
                    <p className="text-[11px] text-slate-500">{blogPosts[0].authorRole}</p>
                  </div>
                </div>
                <Link href="/hire-a-tutor">
                  <Button variant="default" size="sm" className="font-bold gap-1.5">
                    Find Tutor
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#0675c1] via-[#0b5c96] to-slate-900 p-8 sm:p-12 text-white flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sky-200 text-xs font-semibold backdrop-blur-sm mb-4">
                  <Sparkles className="h-3.5 w-3.5" />
                  Guardian Checklist 2026
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white mb-4">
                  Top 4 Verification Benchmarks:
                </h3>
                <ul className="space-y-3 text-xs text-slate-200">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span><strong>NID &amp; University ID:</strong> Always confirm authentic identity credentials.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span><strong>Free Trial Demo Class:</strong> Test curriculum command and teaching methodology in real-time.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span><strong>Proximity &amp; Commute:</strong> Select tutors within 3 km to ensure punctuality and attendance.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span><strong>Transparent Legal Agreement:</strong> Official confirmation letter protecting your replacement rights.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 text-xs text-sky-200 flex items-center justify-between">
                <span>Published: {blogPosts[0].date}</span>
                <span>TutorBari Editorial</span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-bold text-[#0675c1] bg-blue-50 px-2.5 py-1 rounded-lg">
                    {post.category}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {post.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0675c1] transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="mt-2.5 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-900">{post.author}</p>
                  <p className="text-[11px] text-slate-400">{post.date}</p>
                </div>
                <Link
                  href="/job/list"
                  className="font-bold text-[#0675c1] hover:underline flex items-center gap-1"
                >
                  Explore
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-[#0675c1] to-[#00a65a] p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <h3 className="text-2xl font-black">Looking for an Experienced Tutor Near You?</h3>
            <p className="text-sm text-white/90 mt-1 max-w-xl">
              Post your tuition requirements in under 2 minutes. Receive applications from top university tutors in your area today.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/hire-a-tutor">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-bold shadow-md">
                Post Tuition Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
