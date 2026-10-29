import { wedding } from "@/lib/wedding";

export function Footer() {
  return (
    <footer className="border-t border-[var(--soft-gold)]/30 px-6 py-10 text-center">
      <p className="font-serif text-lg text-[var(--deep-taupe)]">
        {wedding.coupleNames}
      </p>
      <p className="mt-2 font-sans text-[0.65rem] uppercase tracking-[0.3em] text-[var(--warm-beige)]">
        {wedding.dateShort}
      </p>
    </footer>
  );
}
