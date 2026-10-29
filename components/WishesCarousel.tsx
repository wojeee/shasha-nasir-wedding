"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { wedding } from "@/lib/wedding";
import { Reveal } from "@/components/Reveal";

type Wish = {
  name: string;
  message: string;
};

export function WishesCarousel() {
  const [wishes, setWishes] = useState<Wish[]>([...wedding.seedWishes]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/wishes", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { wishes?: Wish[] };
        const fromSheet = (data.wishes ?? []).filter(
          (w) =>
            typeof w?.name === "string" &&
            typeof w?.message === "string" &&
            w.message.trim().length > 0,
        );
        if (!cancelled && fromSheet.length > 0) {
          setWishes(fromSheet);
          setIndex(0);
        }
      } catch {
        // Keep seed wishes on failure
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % Math.max(wishes.length, 1));
  }, [wishes.length]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + wishes.length) % Math.max(wishes.length, 1));
  }, [wishes.length]);

  useEffect(() => {
    if (wishes.length <= 1) return;
    const id = window.setInterval(next, 5500);
    return () => window.clearInterval(id);
  }, [next, wishes.length]);

  const current = wishes[index] ?? wishes[0];

  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-28">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, transparent, color-mix(in srgb, var(--soft-gold) 18%, transparent), transparent)",
        }}
      />
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <p className="font-sans text-[0.65rem] uppercase tracking-[0.35em] text-[var(--warm-beige)]">
            From Our Guests
          </p>
          <h2 className="mt-4 font-serif text-4xl text-[var(--deep-taupe)] sm:text-5xl">
            Wishes
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div
            className={`relative min-h-[180px] px-4 sm:px-10 transition-opacity duration-300 ${
              loading ? "opacity-60" : "opacity-100"
            }`}
          >
            {current ? (
              <AnimatePresence mode="wait">
                <motion.figure
                  key={`${current.name}-${index}-${current.message.slice(0, 24)}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center"
                >
                  <blockquote className="font-serif text-xl leading-relaxed text-[var(--deep-taupe)] sm:text-2xl">
                    “{current.message}”
                  </blockquote>
                  <figcaption className="mt-6 font-sans text-xs uppercase tracking-[0.28em] text-[var(--warm-beige)]">
                    — {current.name}
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            ) : null}
          </div>

          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous wish"
              className="font-sans text-xs uppercase tracking-[0.2em] text-[var(--deep-taupe)]/60 transition hover:text-[var(--deep-taupe)]"
            >
              Prev
            </button>
            <div className="flex gap-2" aria-hidden>
              {wishes.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full transition ${
                    i === index
                      ? "bg-[var(--deep-taupe)]"
                      : "bg-[var(--soft-gold)]/50"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              aria-label="Next wish"
              className="font-sans text-xs uppercase tracking-[0.2em] text-[var(--deep-taupe)]/60 transition hover:text-[var(--deep-taupe)]"
            >
              Next
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
