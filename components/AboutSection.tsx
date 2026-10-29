import Image from "next/image";
import { wedding } from "@/lib/wedding";
import { Reveal } from "@/components/Reveal";

function PhotoStrip({
  sources,
  altPrefix,
}: {
  sources: readonly string[];
  altPrefix: string;
}) {
  return (
    <div className="grid w-full grid-cols-3 gap-1 sm:gap-2">
      {sources.map((src, i) => (
        <div
          key={src}
          className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[3/2]"
        >
          <Image
            src={src}
            alt={`${altPrefix} ${i + 1}`}
            fill
            sizes="(max-width: 768px) 33vw, 33vw"
            className={`object-cover ${
              src.includes("photo-6") ? "object-bottom" : "object-center"
            }`}
          />
        </div>
      ))}
    </div>
  );
}

export function AboutSection() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <p className="font-sans text-[0.65rem] uppercase tracking-[0.35em] text-[var(--warm-beige)]">
            The Couple
          </p>
          <h2 className="mt-4 font-serif text-4xl text-[var(--deep-taupe)] sm:text-5xl">
            {wedding.about.heading}
          </h2>
        </Reveal>
      </div>

      <Reveal className="mt-12 sm:mt-16">
        <PhotoStrip
          sources={wedding.about.galleryTop}
          altPrefix="Shasha and Nasir"
        />
      </Reveal>

      <div className="mx-auto max-w-2xl px-6 py-14 text-center sm:py-16">
        <Reveal>
          <p className="font-sans text-[0.65rem] uppercase tracking-[0.35em] text-[var(--warm-beige)]">
            How We Met
          </p>
          <p className="mt-6 font-serif text-lg leading-relaxed text-[var(--deep-taupe)]/85 sm:text-xl">
            {wedding.about.howTheyMet}
          </p>
        </Reveal>
      </div>

      <Reveal>
        <PhotoStrip
          sources={wedding.about.galleryBottom}
          altPrefix="Shasha and Nasir"
        />
      </Reveal>
    </section>
  );
}
