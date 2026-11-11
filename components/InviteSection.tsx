"use client";

import Image from "next/image";
import { wedding } from "@/lib/wedding";
import { Reveal } from "@/components/Reveal";
import { useRsvp } from "@/components/RsvpProvider";

export function InviteSection() {
  const { openRsvp } = useRsvp();
  const { invite, venue } = wedding;

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

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <Reveal className="max-w-xl">
          <p className="font-serif text-2xl text-white drop-shadow-md sm:text-3xl">
            Assalammualaikum wbt.
          </p>

          <div className="mt-8 space-y-3 font-serif text-base leading-relaxed text-white/90 drop-shadow-sm sm:text-lg">
            <p>{invite.hosts.sideOne}</p>
            <p className="text-sm italic text-[var(--soft-gold)] sm:text-base">
              {invite.hosts.togetherWith}
            </p>
            <p>{invite.hosts.sideTwo}</p>
            <p className="pt-2">{invite.gratitude}</p>
            <p className="font-sans text-xs uppercase tracking-[0.18em] text-[var(--champagne)] sm:text-sm">
              {invite.honorifics}
            </p>
            <p>{invite.ceremonyLine}</p>
            <div className="pt-4">
              <p className="font-serif text-3xl text-white sm:text-4xl">
                {invite.brideName}
              </p>
              <p className="my-2 font-serif text-lg italic text-[var(--soft-gold)]">
                and
              </p>
              <p className="font-serif text-3xl text-white sm:text-4xl">
                {invite.groomName}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="mt-12 w-full">
          <div className="border border-[var(--soft-gold)]/50 bg-[var(--deep-taupe)]/55 px-6 py-10 shadow-xl backdrop-blur-[2px] sm:px-12 md:px-16">
            <dl className="space-y-5 text-center">
              <div>
                <dt className="font-sans text-[0.65rem] uppercase tracking-[0.28em] text-[var(--soft-gold)]">
                  Date
                </dt>
                <dd className="mt-1.5 font-serif text-xl text-white sm:text-2xl">
                  {wedding.dateDisplay}
                </dd>
              </div>
              <div>
                <dt className="font-sans text-[0.65rem] uppercase tracking-[0.28em] text-[var(--soft-gold)]">
                  Time
                </dt>
                <dd className="mt-1.5 font-serif text-xl text-white sm:text-2xl">
                  {wedding.timeDisplay}
                </dd>
              </div>
              <div>
                <dt className="font-sans text-[0.65rem] uppercase tracking-[0.28em] text-[var(--soft-gold)]">
                  Venue
                </dt>
                <dd className="mt-1.5 font-serif text-xl text-white sm:text-2xl">
                  {venue.name}
                </dd>
                {venue.address ? (
                  <dd className="mt-1 font-sans text-sm text-white/80">
                    {venue.address}
                  </dd>
                ) : null}
              </div>
              <div>
                <dt className="font-sans text-[0.65rem] uppercase tracking-[0.28em] text-[var(--soft-gold)]">
                  Dress Code
                </dt>
                <dd className="mt-1.5 font-serif text-xl text-white sm:text-2xl">
                  {wedding.dressCode}
                </dd>
              </div>
            </dl>
            <a
              href={venue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block font-sans text-xs uppercase tracking-[0.22em] text-[var(--champagne)] underline-offset-4 transition hover:text-white hover:underline"
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
