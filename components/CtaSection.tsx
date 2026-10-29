"use client";

import { wedding } from "@/lib/wedding";
import { Reveal } from "@/components/Reveal";
import { useRsvp } from "@/components/RsvpProvider";

export function CtaSection() {
  const { openRsvp } = useRsvp();

  return (
    <section className="relative px-6 py-24 sm:py-28">
      <div
        className="absolute inset-x-0 top-0 -z-10 h-full"
        style={{
          background:
            "linear-gradient(180deg, transparent, color-mix(in srgb, var(--warm-beige) 22%, transparent))",
        }}
      />
      <div className="mx-auto max-w-xl text-center">
        <Reveal>
          <div className="hairline mx-auto mb-10 w-16" />
          <h2 className="font-serif text-3xl leading-snug text-[var(--deep-taupe)] sm:text-4xl md:text-5xl">
            {wedding.cta.heading}
          </h2>
          <p className="mt-6 font-serif text-lg text-[var(--deep-taupe)]/75">
            {wedding.cta.body}
          </p>
          <button
            type="button"
            onClick={openRsvp}
            className="mt-10 bg-[var(--deep-taupe)] px-10 py-3.5 font-sans text-xs uppercase tracking-[0.28em] text-[var(--champagne)] transition hover:bg-[var(--warm-beige)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--deep-taupe)]"
          >
            RSVP
          </button>
          <div className="hairline mx-auto mt-12 w-16" />
        </Reveal>
      </div>
    </section>
  );
}
