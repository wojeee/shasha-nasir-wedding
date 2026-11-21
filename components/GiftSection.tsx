"use client";

import { useState } from "react";
import { wedding } from "@/lib/wedding";
import { Reveal } from "@/components/Reveal";

export function GiftSection() {
  const { gift } = wedding;
  const [showQr, setShowQr] = useState(false);

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
          <h2 className="font-serif text-3xl leading-snug text-[var(--deep-taupe)] sm:text-4xl md:text-5xl">
            {gift.heading}
          </h2>

          <p className="mx-auto mt-6 max-w-lg font-serif text-lg leading-relaxed text-[var(--deep-taupe)]/75">
            {gift.body}
          </p>

          {!showQr ? (
            <button
              type="button"
              onClick={() => setShowQr(true)}
              className="mt-8 bg-[var(--deep-taupe)] px-8 py-3 font-sans text-xs uppercase tracking-[0.28em] text-[var(--champagne)] transition hover:bg-[var(--warm-beige)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--deep-taupe)]"
            >
              Click Here
            </button>
          ) : (
            <div className="mt-10">
              <img
                src={gift.qr.src}
                alt={`Wedding gift QR code for ${gift.qr.accountName}`}
                className="mx-auto w-40 bg-white p-2 sm:w-44"
              />
              <p className="mt-4 font-serif text-lg text-[var(--deep-taupe)]">
                {gift.qr.accountName}
              </p>
              <a
                href={gift.qr.src}
                download={gift.qr.downloadName}
                className="mt-6 inline-block border border-[var(--deep-taupe)]/40 px-4 py-2.5 font-sans text-[0.65rem] uppercase tracking-[0.18em] text-[var(--deep-taupe)] transition hover:bg-[var(--deep-taupe)] hover:text-[var(--champagne)]"
              >
                Download QR
              </a>
            </div>
          )}

          <p className="mt-10 text-center font-serif text-lg leading-relaxed text-[var(--deep-taupe)]/80">
            {gift.addressNote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
