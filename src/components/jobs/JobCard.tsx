import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Calendar, Users, Clock, DollarSign, BookOpen, ArrowRight, CheckCircle2 } from "lucide-react";
import { JobPost } from "@/lib/types";
import { Button } from "@/components/ui/Button";

interface JobCardProps {
  job: JobPost;
}

export function JobCard({ job }: JobCardProps) {
  // Category icon mapping
  const getCategoryIcon = (cat: string) => {
    if (cat.includes("Bangla")) return "/categories/Bangla.png";
    if (cat.includes("English Medium")) return "/categories/English_Medium.png";
    if (cat.includes("English Version")) return "/categories/English_Version.png";
    if (cat.includes("Religious") || cat.includes("Quran")) return "/categories/Arabic.png";
    if (cat.includes("Admission")) return "/categories/Admmission.png";
    if (cat.includes("Language") || cat.includes("IELTS")) return "/categories/Language.png";
    return "/categories/Bangla.png";
  };

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm hover:shadow-md hover:border-[#0675c1]/60 transition-all flex flex-col justify-between group">
      <div>
        {/* Top Header: ID & Tuition Type Pill */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
              Job ID: #{job.id}
            </span>
            <span className="text-[11px] font-semibold text-[#0675c1] bg-[#0675c114] px-2.5 py-0.5 rounded-full">
              {job.tuitionType}
            </span>
          </div>

          <span className="text-xs text-slate-400 font-medium">
            {job.postedDate}
          </span>
        </div>

        {/* Title & Category Graphic */}
        <div className="flex items-start gap-3.5 mb-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 p-1.5 group-hover:scale-105 transition-transform">
            <Image
              src={getCategoryIcon(job.category)}
              alt={job.category}
              width={38}
              height={38}
              className="object-contain"
            />
          </div>
          <div>
            <Link href={`/job/view/${job.id}`}>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0675c1] transition-colors leading-snug">
                {job.title}
              </h3>
            </Link>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 font-medium">
              <MapPin className="h-3.5 w-3.5 text-[#0675c1]" />
              <span>{job.location}, {job.city}</span>
            </div>
          </div>
        </div>

        {/* 2x2 Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 rounded-xl bg-slate-50/80 p-3.5 border border-slate-100 text-xs text-slate-700 mb-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Salary</span>
            <span className="font-extrabold text-[#0675c1] text-sm">{job.salary}</span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Class / Level</span>
            <span className="font-bold text-slate-900 truncate block">{job.className}</span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Days / Week</span>
            <span className="font-semibold text-slate-800">{job.tutoringDaysPerWeek} Days/Week</span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Preferred Tutor</span>
            <span className="font-semibold text-slate-800">{job.preferredTutorGender} Tutor</span>
          </div>

          <div className="sm:col-span-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Subjects</span>
            <span className="font-semibold text-slate-800 line-clamp-1">{job.subjects}</span>
          </div>
        </div>
      </div>

      {/* Bottom Action Row */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
          <Users className="h-3.5 w-3.5 text-[#00a65a]" />
          <span>{job.applicantsCount} Tutors Applied</span>
        </div>

        <div className="flex items-center gap-2">
          {job.applied ? (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#00a65a] bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Applied
            </span>
          ) : null}

          <Link href={`/job/view/${job.id}`}>
            <Button size="sm" variant="outline" className="h-9 px-4 text-xs font-bold gap-1 border-slate-300 hover:border-[#0675c1] hover:text-[#0675c1]">
              View Details
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
