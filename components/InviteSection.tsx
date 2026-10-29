"use client";

import { wedding } from "@/lib/wedding";
import { Reveal } from "@/components/Reveal";
import { useRsvp } from "@/components/RsvpProvider";

export function InviteSection() {
  const { openRsvp } = useRsvp();

  return (
    <section className="relative px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-xl text-center">
        <Reveal>
          <p className="font-sans text-[0.65rem] uppercase tracking-[0.35em] text-[var(--warm-beige)]">
            Celebrate With Us
          </p>
          <h2 className="mt-4 font-serif text-4xl text-[var(--deep-taupe)] sm:text-5xl">
            {wedding.invite.heading}
          </h2>
          <p className="mt-6 font-serif text-lg leading-relaxed text-[var(--deep-taupe)]/80">
            {wedding.invite.body}
          </p>
        </Reveal>

        <Reveal delay={0.12} className="mt-12">
          <div className="border border-[var(--soft-gold)]/50 bg-[var(--white)]/55 px-8 py-10 backdrop-blur-sm">
            <p className="font-serif text-2xl text-[var(--deep-taupe)] sm:text-3xl">
              {wedding.dateDisplay}
            </p>
            <p className="mt-3 font-sans text-sm tracking-wide text-[var(--warm-beige)]">
              {wedding.timeDisplay}
            </p>
            <div className="hairline mx-auto my-6 w-12" />
            <p className="font-serif text-xl text-[var(--deep-taupe)]">
              {wedding.venue.name}
            </p>
            <p className="mt-2 font-sans text-sm text-[var(--deep-taupe)]/70">
              {wedding.venue.address}
            </p>
            <a
              href={wedding.venue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block font-sans text-xs uppercase tracking-[0.22em] text-[var(--warm-beige)] underline-offset-4 transition hover:text-[var(--deep-taupe)] hover:underline"
            >
              View Map
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-10">
          <button
            type="button"
            onClick={openRsvp}
            className="bg-[var(--deep-taupe)] px-10 py-3.5 font-sans text-xs uppercase tracking-[0.28em] text-[var(--champagne)] transition hover:bg-[var(--warm-beige)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--deep-taupe)]"
          >
            RSVP
          </button>
        </Reveal>
      </div>
    </section>
  );
}
