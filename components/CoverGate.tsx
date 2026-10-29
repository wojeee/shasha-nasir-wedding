"use client";

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
      animate={
        open
          ? { y: "-100%", opacity: 0.6 }
          : { y: 0, opacity: 1 }
      }
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 1.05, ease: [0.76, 0, 0.24, 1] }
      }
      style={{ pointerEvents: open ? "none" : "auto" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(165deg, #54422C 0%, #6B5338 42%, #B58D62 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 30% 20%, rgba(246,228,204,0.25), transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(202,166,124,0.35), transparent 50%)",
        }}
      />

      <div className="relative z-10 flex max-w-md flex-col items-center gap-8 text-[var(--champagne)]">
        <p className="font-sans text-[0.7rem] uppercase tracking-[0.35em] text-[var(--soft-gold)]">
          {wedding.tagline}
        </p>
        <h1 className="font-serif text-5xl leading-none tracking-wide sm:text-6xl md:text-7xl">
          {wedding.coupleNames}
        </h1>
        <div className="hairline w-24" />
        <p className="font-serif text-lg italic text-[var(--champagne)]/85">
          {wedding.dateShort}
        </p>
        <button
          type="button"
          onClick={onOpen}
          className="mt-4 border border-[var(--soft-gold)]/70 px-8 py-3 font-sans text-xs uppercase tracking-[0.28em] text-[var(--champagne)] transition hover:bg-[var(--soft-gold)]/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--soft-gold)]"
        >
          Click Here
        </button>
      </div>
    </motion.section>
  );
}
