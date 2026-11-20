export function Footer() {
  return (
    <footer className="border-t border-[var(--soft-gold)]/30 px-6 py-10 text-center">
      <p className="font-serif text-sm italic text-[var(--deep-taupe)]/70">
        Website curated with love by{" "}
        <a
          href="https://www.rosierosdi.space/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-[var(--soft-gold)] underline-offset-4 transition hover:text-[var(--deep-taupe)]"
        >
          Rosie
        </a>
      </p>
    </footer>
  );
}
