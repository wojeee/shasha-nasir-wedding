"use client";

import { wedding } from "@/lib/wedding";

const heroVideoUrl =
  process.env.NEXT_PUBLIC_HERO_VIDEO_URL ?? "/video/hero.mp4";

export function VideoHero() {
  return (
    <section className="relative flex h-dvh min-h-[100svh] w-full items-end justify-center overflow-hidden">
      {/* Fallback wash while video loads */}
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(180deg, #CAA67C 0%, #B58D62 45%, #54422C 100%)",
        }}
      />

      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/hero-poster.svg"
        aria-label="Wedding highlight video"
      >
        <source src={heroVideoUrl} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-[var(--deep-taupe)]/75 via-transparent to-[var(--deep-taupe)]/20" />

      <div className="relative z-10 mb-16 px-6 text-center text-[var(--champagne)] sm:mb-20">
        <p className="mb-3 font-sans text-[0.65rem] uppercase tracking-[0.35em] text-[var(--soft-gold)]">
          {wedding.tagline}
        </p>
        <h2 className="font-serif text-4xl tracking-wide sm:text-5xl md:text-6xl">
          {wedding.coupleNames}
        </h2>
        <p className="mt-4 font-serif text-base italic text-[var(--champagne)]/90 sm:text-lg">
          {wedding.dateDisplay}
        </p>
      </div>
    </section>
  );
}
