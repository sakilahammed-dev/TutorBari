"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroImage {
  src: string;
  alt: string;
}

const HERO_IMAGES: HeroImage[] = [
  { src: "/hero/Hero-Section-Image-01.webp", alt: "Verified Tutors for Home & Online Tutoring" },
  { src: "/hero/Hero-Section-Image-02.webp", alt: "Personalized 1-on-1 Guidance with Expert Tutors" },
  { src: "/hero/Hero-Section-Image-03.webp", alt: "High School, Cambridge & Edexcel Tutors" },
  { src: "/hero/Hero-Section-Image-04.webp", alt: "University Admission Preparation Mentors" },
  { src: "/hero/Hero-Section-Image-05.webp", alt: "STEM & Science Subject Specialists" },
  { src: "/hero/Hero-Section-Image-06.webp", alt: "Trusted Learning Experience for Every Child" },
];

export function HeroCoverflowCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-slide every 2.8 seconds
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [isHovered]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
  };

  return (
    <div
      className="relative m-auto flex h-80 w-full touch-pan-y select-none items-center justify-center md:h-[24rem] lg:h-[26rem] cursor-grab"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative flex size-full items-center justify-center [perspective:1000px]">
        {HERO_IMAGES.map((img, idx) => {
          // Calculate circular distance / offset from currentIndex
          let offset = idx - currentIndex;
          if (offset < -Math.floor(HERO_IMAGES.length / 2)) {
            offset += HERO_IMAGES.length;
          } else if (offset > Math.floor(HERO_IMAGES.length / 2)) {
            offset -= HERO_IMAGES.length;
          }

          let transform = "translateX(0%) scale(1) rotateY(0deg)";
          let zIndex = 10;
          let opacity = 1;
          let blur = "blur(0px)";
          let visibility: "visible" | "hidden" = "visible";

          if (offset === 0) {
            transform = "translateX(0%) scale(1) rotateY(0deg)";
            zIndex = 10;
            opacity = 1;
            blur = "blur(0px)";
          } else if (offset === 1) {
            transform = "translateX(48%) scale(0.82) rotateY(-14deg)";
            zIndex = 5;
            opacity = 0.88;
            blur = "blur(1.5px)";
          } else if (offset === -1) {
            transform = "translateX(-48%) scale(0.82) rotateY(14deg)";
            zIndex = 5;
            opacity = 0.88;
            blur = "blur(1.5px)";
          } else if (offset === 2) {
            transform = "translateX(82%) scale(0.64) rotateY(-24deg)";
            zIndex = 2;
            opacity = 0.6;
            blur = "blur(3.5px)";
          } else if (offset === -2) {
            transform = "translateX(-82%) scale(0.64) rotateY(24deg)";
            zIndex = 2;
            opacity = 0.6;
            blur = "blur(3.5px)";
          } else {
            transform = "translateX(0%) scale(0.4) rotateY(0deg)";
            zIndex = 0;
            opacity = 0;
            visibility = "hidden";
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className="absolute h-64 w-[14rem] sm:h-76 sm:w-[17rem] md:h-[22rem] md:w-[19rem] transition-all duration-700 ease-out cursor-pointer focus:outline-none"
              style={{
                transform,
                zIndex,
                opacity,
                filter: blur,
                visibility,
              }}
              aria-label={`Slide ${idx + 1}`}
            >
              <div className="relative size-full rounded-3xl border-2 border-white/60 bg-white shadow-2xl shadow-slate-900/20 overflow-hidden ring-1 ring-black/10">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 240px, 320px"
                  className="object-cover pointer-events-none select-none"
                  priority={idx === 0}
                />
                {/* Subtle gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-3 left-4 right-4 text-[11px] font-bold text-white text-left truncate drop-shadow-md">
                  {img.alt}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <button
        type="button"
        onClick={handlePrev}
        className="absolute left-2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-md backdrop-blur-xs hover:bg-white hover:text-[#0675c1] transition-all"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={handleNext}
        className="absolute right-2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-md backdrop-blur-xs hover:bg-white hover:text-[#0675c1] transition-all"
        aria-label="Next image"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute -bottom-6 flex items-center gap-1.5 z-20">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrentIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === i ? "w-7 bg-[#0675c1]" : "w-2 bg-slate-300 hover:bg-slate-400"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
