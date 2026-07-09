"use client";

import { useEffect, useRef } from "react";
import { HOME } from "@/lib/content";

const { hero } = HOME;
const FEATURES = hero.features;

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // autoplay blocked by browser — video stays paused, poster shows
      });
    }
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col bg-navy overflow-hidden">
      {/* Video background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-90"
        src="/video/hero-banner.mp4"
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/30 to-navy/80" />

      {/* Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center text-center px-4 pt-24 pb-16">
        {/* Eyebrow */}
        <p className="font-mono text-teal text-xs tracking-[0.4em] uppercase mb-6">
          {hero.eyebrow}
        </p>

        {/* Headline */}
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight max-w-4xl mb-6">
          <span className="whitespace-nowrap">{hero.headlineTop}</span>
          <br />
          <span className="text-teal">{hero.headlineBottom}</span>
        </h1>

        {/* Sub-headline */}
        <p className="text-slate-border text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed">
          {hero.subhead}
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 max-w-2xl mt-4">
          {FEATURES.map(({ icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-slate-border"
            >
              <span>{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative flex justify-center pb-8 animate-bounce">
        <svg
          className="w-5 h-5 text-slate-border"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </section>
  );
}
