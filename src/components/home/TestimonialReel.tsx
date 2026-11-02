"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Quote } from "lucide-react";

export interface TestimonialItem {
  id: string;
  name: string;
  comment: string;
  designation: string;
  type?: string;
  localPhoto?: string;
  photo?: string;
}

interface TestimonialReelProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  items: TestimonialItem[];
}

export default function TestimonialReel({
  title,
  subtitle,
  ctaText,
  ctaLink,
  items,
}: TestimonialReelProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = items.length;

  // Auto-advance every 4.5 seconds
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, total]);

  if (!items || items.length === 0) return null;

  const current = items[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  // Avatar dimension: 104px height + 10px gap = 114px step
  // Container height: 488px
  // Center position offset = 488 / 2 - 104 / 2 = 192px
  const translateY = 192 - activeIndex * 114;

  return (
    <div
      className="w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header section */}
      <div className="px-4 text-center">
        <h2 className="text-3xl font-bold md:text-4xl text-slate-900 tracking-tight">
          {title}
        </h2>
        <p className="mt-2 text-center text-slate-500 text-sm md:text-base">
          {subtitle}
        </p>
        <Link
          href={ctaLink}
          className="group mx-auto my-5 flex w-fit items-center justify-center gap-3 rounded-xl border border-[#0675c1] bg-[#0675c1] px-8 py-3 text-white transition-all duration-300 ease-in-out hover:bg-white hover:text-[#0675c1] font-semibold text-sm shadow-md shadow-[#0675c1]/20 hover:shadow-lg"
        >
          {ctaText}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Testimonial Box */}
      <div className="mt-10 px-4">
        <div className="mx-auto max-w-4xl bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="grid items-center gap-6 sm:gap-8 md:grid-cols-[auto_minmax(0,1fr)] md:gap-10 lg:gap-12">
            
            {/* Left: Vertical Avatar Reel (Caretutors 1:1) */}
            <div
              className="order-1 mx-auto flex max-w-full items-center justify-center select-none"
              style={{
                height: "488px",
                maskImage:
                  "linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent)",
              }}
            >
              <div className="flex items-center" style={{ gap: "10px" }}>
                <div
                  className="relative shrink-0 self-center overflow-hidden"
                  style={{ height: "488px", width: "104px" }}
                >
                  <div
                    className="flex flex-col"
                    style={{
                      gap: "10px",
                      transform: `translateY(${translateY}px)`,
                      transition: "transform 700ms cubic-bezier(0.65, 0, 0.35, 1)",
                    }}
                  >
                    {items.map((item, idx) => {
                      const isActive = idx === activeIndex;
                      const photoSrc =
                        item.localPhoto || item.photo || "/placeholder-avatar.png";

                      return (
                        <button
                          key={item.id || idx}
                          type="button"
                          onClick={() => setActiveIndex(idx)}
                          aria-label={`Show testimonial from ${item.name}`}
                          className={`relative block shrink-0 overflow-hidden rounded-2xl bg-neutral-100 p-0 transition-all duration-500 cursor-pointer ${
                            isActive
                              ? "opacity-100 scale-100 ring-4 ring-[#0675c1]/40 border-2 border-[#0675c1] shadow-lg"
                              : "opacity-40 grayscale hover:opacity-80 hover:grayscale-0 scale-95"
                          }`}
                          style={{
                            height: "104px",
                            width: "104px",
                            zIndex: isActive ? 10 : 1,
                          }}
                        >
                          <Image
                            src={photoSrc}
                            alt={item.name}
                            width={104}
                            height={104}
                            className="size-full object-cover"
                            draggable={false}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Testimonial Text & Controls (Caretutors 1:1) */}
            <div className="order-2 flex min-h-[350px] min-w-0 flex-col text-left md:h-[380px] justify-between">
              <div
                aria-live="polite"
                className="flex flex-1 flex-col justify-center"
              >
                <Quote className="h-8 w-8 text-[#0675c1]/25 mb-2" />
                <p className="m-0 min-h-[90px] text-base font-medium leading-[1.4] tracking-[-0.01em] text-slate-900 sm:min-h-[110px] sm:text-lg md:text-[21px] md:leading-[1.35] italic">
                  &ldquo;{current.comment.replace(/Caretutors/gi, "TutorBari")}&rdquo;
                </p>
                <div className="mt-4 sm:mt-6 border-t border-slate-100 pt-3">
                  <h4 className="text-base sm:text-lg font-bold text-slate-900">
                    {current.name}
                  </h4>
                  <p className="m-0 text-xs font-medium leading-[1.3] text-slate-500 sm:text-sm">
                    {current.designation}
                  </p>
                </div>
              </div>

              {/* Navigation Arrows & Dot Indicators */}
              <div className="mt-6 flex shrink-0 flex-wrap items-center gap-3 sm:mt-8 md:mb-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                  className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#0675c1] text-[#0675c1] transition-all hover:bg-[#0675c1] hover:text-white sm:size-10 active:scale-95 shadow-sm"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next testimonial"
                  className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#0675c1] text-[#0675c1] transition-all hover:bg-[#0675c1] hover:text-white sm:size-10 active:scale-95 shadow-sm"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                {/* Dot indicators (scrollable window if many) */}
                <div className="flex min-w-0 flex-wrap items-center gap-2 sm:ml-2">
                  {items.slice(0, 15).map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      aria-label={`Show testimonial ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === activeIndex
                          ? "w-6 bg-[#0675c1]"
                          : "w-1.5 bg-slate-300 hover:bg-slate-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
