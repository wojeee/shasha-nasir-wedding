"use client";

import Image from "next/image";
import { wedding } from "@/lib/wedding";
import { Reveal } from "@/components/Reveal";
import { useRsvp } from "@/components/RsvpProvider";

export function InviteSection() {
  const { openRsvp } = useRsvp();

  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-32 md:min-h-[90vh] md:py-36">
      <Image
        src="/images/invite-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-bottom"
        priority={false}
      />

      {/* Light wash at top so white type pops on the orange wall; fades so couple stays clear */}
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(180deg, rgba(84,66,44,0.55) 0%, rgba(84,66,44,0.35) 42%, rgba(84,66,44,0.15) 68%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center text-center">
        <Reveal>
          <p className="font-sans text-[0.65rem] uppercase tracking-[0.35em] text-[var(--soft-gold)]">
            Celebrate With Us
          </p>
          <h2 className="mt-4 font-serif text-4xl text-white drop-shadow-md sm:text-5xl">
            {wedding.invite.heading}
          </h2>
          <p className="mt-6 font-serif text-lg leading-relaxed text-white/90 drop-shadow-sm">
            {wedding.invite.body}
          </p>
        </Reveal>

        <Reveal delay={0.12} className="mt-12 w-full">
          <div className="border border-white/35 bg-[var(--deep-taupe)]/45 px-8 py-10 backdrop-blur-[2px]">
            <p className="font-serif text-2xl text-white sm:text-3xl">
              {wedding.dateDisplay}
            </p>
            <p className="mt-3 font-sans text-sm tracking-wide text-[var(--soft-gold)]">
              {wedding.timeDisplay}
            </p>
            <div
              className="mx-auto my-6 h-px w-12"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #F6E4CC, transparent)",
              }}
            />
            <p className="font-serif text-xl text-white">{wedding.venue.name}</p>
            <p className="mt-2 font-sans text-sm text-white/75">
              {wedding.venue.address}
            </p>
            <a
              href={wedding.venue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block font-sans text-xs uppercase tracking-[0.22em] text-[var(--champagne)] underline-offset-4 transition hover:text-white hover:underline"
            >
              View Map
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-10">
          <button
            type="button"
            onClick={openRsvp}
            className="bg-[var(--champagne)] px-10 py-3.5 font-sans text-xs uppercase tracking-[0.28em] text-[var(--deep-taupe)] shadow-lg transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--champagne)]"
          >
            RSVP
          </button>
        </Reveal>
      </div>
    </section>
  );
}
