import { wedding } from "@/lib/wedding";
import { Reveal } from "@/components/Reveal";

export function WordsSection() {
  return (
    <section className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <div className="hairline mx-auto mb-10 w-16" />
          <blockquote className="font-serif text-2xl leading-relaxed text-[var(--deep-taupe)] sm:text-3xl md:text-4xl">
            “{wedding.words.quote}”
          </blockquote>
          <p className="mt-8 font-sans text-xs uppercase tracking-[0.28em] text-[var(--warm-beige)]">
            {wedding.words.attribution}
          </p>
          <div className="hairline mx-auto mt-10 w-16" />
        </Reveal>
      </div>
    </section>
  );
}
