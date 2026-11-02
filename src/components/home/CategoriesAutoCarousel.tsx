"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CategoryItem {
  name: string;
  subtitle: string;
  image: string;
}

const CATEGORIES: CategoryItem[] = [
  { name: "Bangla Medium", subtitle: "Class 1 - 12, SSC, HSC", image: "/categories/Bangla.png" },
  { name: "English Version", subtitle: "National Curriculum in English", image: "/categories/English_Version.png" },
  { name: "English Medium", subtitle: "Cambridge, Edexcel, O/A Level", image: "/categories/English_Medium.png" },
  { name: "Religious Studies", subtitle: "Quran, Tajweed & Arabic", image: "/categories/Arabic.png" },
  { name: "Admission Test", subtitle: "BUET, Medical & DU Preparation", image: "/categories/Admmission.png" },
  { name: "Arts & Culture", subtitle: "Drawing, Painting & Music", image: "/categories/Arts.png" },
  { name: "Language Learning", subtitle: "IELTS, Spoken English, French", image: "/categories/Language.png" },
  { name: "Test Preparation", subtitle: "GRE, SAT, TOEFL, GMAT", image: "/categories/Test_Preparation.png" },
  { name: "Professional Skill", subtitle: "Graphic, Web Dev & Coding", image: "/categories/Professional_Skill.png" },
  { name: "Special Skill", subtitle: "Handwriting, Chess & Debate", image: "/categories/Special_Skill.png" },
  { name: "Uni Help", subtitle: "University Engineering & Finance", image: "/categories/Uni_help.png" },
  { name: "Madrasa Medium", subtitle: "Dakhil, Alim & Kamil", image: "/categories/Madrasa.png" },
  { name: "Special Child Education", subtitle: "Autism, ADHD & Special Care", image: "/categories/Special_Child.png" },
];

export function CategoriesAutoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = CATEGORIES.length;

  // Auto-scroll every 2.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 2500);
    return () => clearInterval(interval);
  }, [isPaused, total]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  return (
    <div
      className="relative w-full py-6 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Centered Large Featured Card View (Caretutors Style: Box ta lomba, tik majkane, auto vabe akta akta kore) */}
      <div className="mx-auto max-w-sm sm:max-w-md px-4">
        {(() => {
          const item = CATEGORIES[currentIndex];
          return (
            <div className="relative z-20 mx-auto rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xl shadow-slate-200/60 text-center transition-all duration-500 transform hover:-translate-y-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#0675c1] bg-[#0675c1]/10 px-3 py-1 rounded-full inline-block mb-4">
                Category {currentIndex + 1} of {total}
              </span>

              {/* Big 220x220 Category Illustration Image */}
              <div className="relative mx-auto h-52 w-52 sm:h-60 sm:w-60 mb-5 flex items-center justify-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={240}
                  height={240}
                  className="object-contain drop-shadow-md transition-transform duration-500 hover:scale-105"
                  priority
                />
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1.5">
                {item.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium mb-6">
                {item.subtitle}
              </p>

              {/* Action Button */}
              <Link href={`/job/list?category=${encodeURIComponent(item.name)}`}>
                <Button className="w-full bg-[#0675c1] hover:bg-[#125a9c] text-white font-bold h-11 text-xs gap-2 rounded-xl shadow-md shadow-[#0675c1]/20">
                  <span>Browse {item.name} Tuitions</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          );
        })()}
      </div>

      {/* Navigation Arrows */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          type="button"
          onClick={handlePrev}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-xs hover:border-[#0675c1] hover:bg-[#0675c1] hover:text-white transition-all"
          aria-label="Previous Category"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Carousel Dots */}
        <div className="flex items-center gap-1.5 max-w-xs overflow-x-auto py-1">
          {CATEGORIES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx ? "w-6 bg-[#0675c1]" : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Jump to category ${idx + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-xs hover:border-[#0675c1] hover:bg-[#0675c1] hover:text-white transition-all"
          aria-label="Next Category"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Mini Horizontal Thumbnail Bar Below for Quick Jumping */}
      <div className="mt-8 mx-auto max-w-5xl px-4 overflow-x-auto pb-2 scrollbar-thin">
        <div className="flex items-center justify-center gap-3 min-w-max">
          {CATEGORIES.map((cat, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition-all ${
                currentIndex === idx
                  ? "border-[#0675c1] bg-[#0675c1]/10 text-[#0675c1] font-bold shadow-xs"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              <Image
                src={cat.image}
                alt={cat.name}
                width={20}
                height={20}
                className="object-contain"
              />
              <span className="truncate max-w-[120px]">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
