"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { wedding } from "@/lib/wedding";

type CoverGateProps = {
  open: boolean;
  onOpen: () => void;
};

export function CoverGate({ open, onOpen }: CoverGateProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      aria-hidden={open}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden px-6 text-center"
      initial={false}
      animate={open ? { y: "-100%", opacity: 0.6 } : { y: 0, opacity: 1 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 1.05, ease: [0.76, 0, 0.24, 1] }
      }
      style={{ pointerEvents: open ? "none" : "auto" }}
    >
      <Image
        src="/images/cover-gate-bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Stronger dark wash — photo is light; this makes type pop */}
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(180deg, rgba(84,66,44,0.72) 0%, rgba(84,66,44,0.55) 45%, rgba(84,66,44,0.78) 100%)",
        }}
      />

      <div className="relative z-10 flex max-w-md flex-col items-center gap-6 text-white">
        <p className="font-sans text-[0.7rem] uppercase tracking-[0.35em] text-[var(--soft-gold)] drop-shadow-sm">
          {wedding.tagline}
        </p>
        <h1 className="font-serif text-5xl leading-none tracking-wide drop-shadow-md sm:text-6xl md:text-7xl">
          {wedding.coupleNames}
        </h1>
        <div
          className="h-px w-24"
          style={{
            background:
              "linear-gradient(90deg, transparent, #F6E4CC, transparent)",
          }}
        />
        <p className="font-serif text-lg italic text-white/90 drop-shadow-sm">
          {wedding.dateShort}
        </p>
        <button
          type="button"
          onClick={onOpen}
          className="mt-2 bg-[var(--champagne)] px-8 py-3 font-sans text-xs uppercase tracking-[0.28em] text-[var(--deep-taupe)] shadow-lg transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--champagne)]"
        >
          Click Here
        </button>
      </div>
    </motion.section>
  );
}
