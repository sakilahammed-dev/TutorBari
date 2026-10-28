"use client";

import React from "react";
import { Filter, RotateCcw, MapPin, BookOpen, Layers, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Filters {
  jobId: string;
  city: string;
  location: string;
  category: string;
  tuitionType: string;
  gender: string;
}

interface JobFilterSidebarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  onReset: () => void;
}

export function JobFilterSidebar({ filters, onChange, onReset }: JobFilterSidebarProps) {
  const cities = ["All", "Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna", "Gazipur", "Narayanganj"];
  const locations = [
    "All",
    "Mohammadpur",
    "Dhanmondi",
    "Mirpur 2",
    "Uttara",
    "Gulshan",
    "Banasree",
    "Lalmatia",
    "Badda",
    "Online",
  ];
  const categories = [
    "All",
    "English Medium",
    "Bangla Medium",
    "English Version",
    "Religious Studies",
    "Admission Test",
  ];
  const tuitionTypes = [
    "All",
    "Home Tutoring",
    "Online Tutoring",
    "Group Tutoring",
    "Package Tutoring",
    "Shadow Tutoring",
  ];
  const genders = ["Any", "Male", "Female"];

  const handleChange = (key: keyof Filters, value: string) => {
    onChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
      {/* Title & Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
          <Filter className="h-4 w-4 text-[#0675c1]" />
          <span>Filter Jobs</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-semibold text-slate-500 hover:text-[#0675c1] flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="h-3 w-3" />
          Reset
        </button>
      </div>

      {/* Job ID Search (Caretutors Match) */}
      <div>
        <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
          <Search className="h-3.5 w-3.5 text-[#0675c1]" />
          Search by Job ID
        </label>
        <input
          type="number"
          placeholder="e.g. 243138"
          value={filters.jobId || ""}
          onChange={(e) => handleChange("jobId", e.target.value)}
          className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs text-slate-800 focus:border-[#0675c1] focus:outline-none"
        />
      </div>

      {/* City Filter */}
      <div>
        <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-[#0675c1]" />
          Select City
        </label>
        <select
          value={filters.city}
          onChange={(e) => handleChange("city", e.target.value)}
          className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs text-slate-800 focus:border-[#0675c1] focus:outline-none"
        >
          {cities.map((c) => (
            <option key={c} value={c}>{c === "All" ? "All Cities" : c}</option>
          ))}
        </select>
      </div>

      {/* Location / Thana Filter */}
      <div>
        <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-[#0675c1]" />
          Location / Area
        </label>
        <select
          value={filters.location}
          onChange={(e) => handleChange("location", e.target.value)}
          className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs text-slate-800 focus:border-[#0675c1] focus:outline-none"
        >
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc === "All" ? "All Locations" : loc}</option>
          ))}
        </select>
      </div>

      {/* Category Filter */}
      <div>
        <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
          <BookOpen className="h-3.5 w-3.5 text-[#0675c1]" />
          Medium / Category
        </label>
        <select
          value={filters.category}
          onChange={(e) => handleChange("category", e.target.value)}
          className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs text-slate-800 focus:border-[#0675c1] focus:outline-none"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat === "All" ? "All Categories" : cat}</option>
          ))}
        </select>
      </div>

      {/* Tuition Type Filter */}
      <div>
        <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
          <Layers className="h-3.5 w-3.5 text-[#0675c1]" />
          Tuition Type
        </label>
        <div className="space-y-1.5">
          {tuitionTypes.map((type) => (
            <label
              key={type}
              className={`flex items-center gap-2 p-2 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                filters.tuitionType === type
                  ? "bg-[#0675c114] text-[#0675c1] font-bold"
                  : "hover:bg-slate-50 text-slate-700"
              }`}
            >
              <input
                type="radio"
                name="tuitionType"
                value={type}
                checked={filters.tuitionType === type}
                onChange={() => handleChange("tuitionType", type)}
                className="h-3.5 w-3.5 text-[#0675c1] focus:ring-[#0675c1]"
              />
              <span>{type === "All" ? "All Types" : type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Gender Filter */}
      <div>
        <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5 text-[#0675c1]" />
          Preferred Tutor Gender
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {genders.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => handleChange("gender", g)}
              className={`h-9 rounded-lg text-xs font-semibold border transition-all ${
                filters.gender === g
                  ? "bg-[#0675c1] text-white border-[#0675c1]"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
