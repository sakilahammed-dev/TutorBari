"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Search, Briefcase, PlusCircle, AlertCircle, Loader2 } from "lucide-react";
import { JobPost } from "@/lib/types";
import { JobCard } from "@/components/jobs/JobCard";
import { JobFilterSidebar } from "@/components/jobs/JobFilterSidebar";
import { Button } from "@/components/ui/Button";

export default function JobListPage() {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: "All",
    location: "All",
    category: "All",
    tuitionType: "All",
    gender: "Any",
  });

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.city !== "All") params.set("city", filters.city);
      if (filters.location !== "All") params.set("location", filters.location);
      if (filters.category !== "All") params.set("category", filters.category);
      if (filters.tuitionType !== "All") params.set("tuitionType", filters.tuitionType);
      if (filters.gender !== "Any") params.set("gender", filters.gender);

      const res = await fetch(`/api/jobs?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setJobs(data.jobs);
      }
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleReset = () => {
    setFilters({
      city: "All",
      location: "All",
      category: "All",
      tuitionType: "All",
      gender: "Any",
    });
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
          <Link href="/" className="hover:text-[#0675c1]">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-900">Job Board</span>
        </div>

        {/* Page Header Banner */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0675c114] text-[#0675c1]">
                <Briefcase className="h-4 w-4" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Tuition Jobs in Bangladesh
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              Browse verified tuition posts and apply directly to matching students.
            </p>
          </div>

          <Link href="/hire-a-tutor">
            <Button className="bg-[#0675c1] hover:bg-[#125a9c] text-white font-bold gap-2 text-xs h-10 shadow-sm shrink-0">
              <PlusCircle className="h-4 w-4" />
              Post a Tuition Request
            </Button>
          </Link>
        </div>

        {/* Main Content Layout: Sidebar + Job Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar Filter */}
          <div className="lg:col-span-4 sticky top-24">
            <JobFilterSidebar
              filters={filters}
              onChange={setFilters}
              onReset={handleReset}
            />
          </div>

          {/* Right Job Cards Feed */}
          <div className="lg:col-span-8 space-y-4">
            {/* Feed Status Bar */}
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <span>
                {loading ? "Searching jobs..." : `Showing ${jobs.length} Available Tuition Jobs`}
              </span>
              <span className="text-[11px] font-semibold text-[#00a65a] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                Live &amp; Verified
              </span>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-slate-200">
                <Loader2 className="h-8 w-8 animate-spin text-[#0675c1] mb-2" />
                <span className="text-xs font-semibold text-slate-500">Loading tuition jobs...</span>
              </div>
            ) : jobs.length > 0 ? (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center space-y-4">
                <div className="flex justify-center text-slate-400">
                  <AlertCircle className="h-12 w-12" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No Matching Tuition Jobs Found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  We could not find any active jobs matching your filter criteria. Try expanding your search location or resetting filters.
                </p>
                <Button onClick={handleReset} variant="outline" size="sm" className="font-bold">
                  Reset All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
