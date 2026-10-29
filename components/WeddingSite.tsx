"use client";

import { useCallback, useState } from "react";
import { CoverGate } from "@/components/CoverGate";
import { VideoHero } from "@/components/VideoHero";
import { WordsSection } from "@/components/WordsSection";
import { InviteSection } from "@/components/InviteSection";
import { WishesCarousel } from "@/components/WishesCarousel";
import { AboutSection } from "@/components/AboutSection";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";
import { RsvpProvider } from "@/components/RsvpProvider";
import { RsvpModal } from "@/components/RsvpModal";

export function WeddingSite() {
  const [opened, setOpened] = useState(false);

  const handleOpen = useCallback(() => {
    setOpened(true);
    window.scrollTo(0, 0);
  }, []);

  return (
    <RsvpProvider>
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
        <CtaSection />
        <Footer />
      </main>
      <RsvpModal />
    </RsvpProvider>
  );
}
