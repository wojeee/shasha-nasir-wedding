"use client";

import { useCallback, useRef, useState } from "react";
import { CoverGate } from "@/components/CoverGate";
import { VideoHero } from "@/components/VideoHero";
import { WordsSection } from "@/components/WordsSection";
import { InviteSection } from "@/components/InviteSection";
import { WishesCarousel } from "@/components/WishesCarousel";
import { AboutSection } from "@/components/AboutSection";
import { GiftSection } from "@/components/GiftSection";
import { Footer } from "@/components/Footer";
import { RsvpProvider } from "@/components/RsvpProvider";
import { RsvpModal } from "@/components/RsvpModal";

export function WeddingSite() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [opened, setOpened] = useState(false);
  const [musicOn, setMusicOn] = useState(false);

  const handleOpen = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.55;
      void audio.play().then(
        () => setMusicOn(true),
        () => setMusicOn(false),
      );
    }
    setOpened(true);
    window.scrollTo(0, 0);
  }, []);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      void audio.play().then(
        () => setMusicOn(true),
        () => setMusicOn(false),
      );
      return;
    }
    audio.pause();
    setMusicOn(false);
  }, []);

  return (
    <RsvpProvider>
      <audio
        ref={audioRef}
        src="/audio/bg-audio.mp3"
        loop
        preload="auto"
        className="hidden"
      />
      <CoverGate open={opened} onOpen={handleOpen} />
      <main
        className={`bg-[var(--champagne)] transition-opacity duration-700 ${
          opened ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden={!opened}
      >
        <VideoHero />
        <WordsSection />
        <InviteSection />
        <WishesCarousel />
        <AboutSection />
        <GiftSection />
        <Footer />
      </main>
      {opened ? (
        <button
          type="button"
          onClick={toggleMusic}
          aria-pressed={musicOn}
          className="fixed bottom-5 right-5 z-40 border border-[var(--soft-gold)]/70 bg-[var(--deep-taupe)]/80 px-4 py-2.5 font-sans text-[0.65rem] uppercase tracking-[0.22em] text-[var(--champagne)] shadow-lg backdrop-blur-sm transition hover:bg-[var(--deep-taupe)]"
        >
          {musicOn ? "Sound on" : "Sound off"}
        </button>
      ) : null}
      <RsvpModal />
    </RsvpProvider>
  );
}
