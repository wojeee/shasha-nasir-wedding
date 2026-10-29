import { wedding } from "@/lib/wedding";
import { Reveal } from "@/components/Reveal";

function PortraitPlaceholder({ label }: { label: string }) {
  return (
    <div
      className="mx-auto aspect-[3/4] w-full max-w-[220px] overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, var(--soft-gold) 0%, var(--warm-beige) 55%, var(--deep-taupe) 100%)",
      }}
      role="img"
      aria-label={`${label} portrait placeholder`}
    >
      <div className="flex h-full items-end justify-center pb-6">
        <span className="font-serif text-sm tracking-widest text-[var(--champagne)]/90">
          {label}
        </span>
      </div>
    </div>
  );
}

export function AboutSection() {
  return (
    <section className="relative px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <Reveal className="text-center">
          <p className="font-sans text-[0.65rem] uppercase tracking-[0.35em] text-[var(--warm-beige)]">
            The Couple
          </p>
          <h2 className="mt-4 font-serif text-4xl text-[var(--deep-taupe)] sm:text-5xl">
            {wedding.about.heading}
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-16 md:grid-cols-2 md:gap-12">
          <Reveal>
            <article className="text-center">
              <PortraitPlaceholder label={wedding.about.bride.name} />
              <p className="mt-6 font-sans text-[0.65rem] uppercase tracking-[0.3em] text-[var(--warm-beige)]">
                {wedding.about.bride.title}
              </p>
              <h3 className="mt-2 font-serif text-3xl text-[var(--deep-taupe)]">
                {wedding.about.bride.name}
              </h3>
              <p className="mx-auto mt-4 max-w-sm font-serif text-base leading-relaxed text-[var(--deep-taupe)]/75">
                {wedding.about.bride.bio}
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.12}>
            <article className="text-center">
              <PortraitPlaceholder label={wedding.about.groom.name} />
              <p className="mt-6 font-sans text-[0.65rem] uppercase tracking-[0.3em] text-[var(--warm-beige)]">
                {wedding.about.groom.title}
              </p>
              <h3 className="mt-2 font-serif text-3xl text-[var(--deep-taupe)]">
                {wedding.about.groom.name}
              </h3>
              <p className="mx-auto mt-4 max-w-sm font-serif text-base leading-relaxed text-[var(--deep-taupe)]/75">
                {wedding.about.groom.bio}
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
