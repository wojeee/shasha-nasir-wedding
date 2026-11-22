"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { wedding } from "@/lib/wedding";

export const HERO_PLAY_EVENT = "wedding-hero-play";

type HeroPlayer = {
  mute: () => void;
  playVideo: () => void;
  getPlayerState: () => number;
  destroy: () => void;
};

type PlayerStateEvent = {
  data: number;
  target: HeroPlayer;
};

declare global {
  interface Window {
    YT?: {
      Player: new (
        element: HTMLElement,
        options: {
          videoId: string;
          width?: string;
          height?: string;
          playerVars?: Record<string, string | number>;
          events?: {
            onReady?: (event: { target: HeroPlayer }) => void;
            onStateChange?: (event: PlayerStateEvent) => void;
            onError?: () => void;
          };
        },
      ) => HeroPlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

const ENDED = 0;
const PLAYING = 1;

export function VideoHero() {
  const frameRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HeroPlayer | null>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    let cancelled = false;
    let revealTimer = 0;
    let coverTimer = 0;
    let lastTime = 0;
    const mount = document.createElement("div");

    const coverButtons = (ms: number) => {
      setPlaying(false);
      if (coverTimer) return;
      coverTimer = window.setTimeout(() => {
        coverTimer = 0;
        if (!cancelled) setPlaying(true);
      }, ms);
    };
    mount.className = "h-full w-full";
    frame.appendChild(mount);

    const createPlayer = () => {
      if (cancelled || !window.YT?.Player) return;
      playerRef.current = new window.YT.Player(mount, {
        videoId: wedding.heroVideoId,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          loop: 1,
          playlist: wedding.heroVideoId,
          playsinline: 1,
          rel: 0,
          modestbranding: 1,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          cc_load_policy: 0,
          enablejsapi: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            event.target.mute();
          },
          onError: () => setFailed(true),
          onStateChange: (event) => {
            // playVideo() makes YouTube flash its own controls, so the
            // film stays hidden until that overlay has dismissed itself.
            if (event.data === PLAYING && revealTimer === 0) {
              revealTimer = window.setTimeout(() => {
                if (!cancelled && !coverTimer) setPlaying(true);
              }, 6000);
            }
            if (event.data === ENDED) {
              coverButtons(5000);
              event.target.playVideo();
            }
          },
        },
      });
    };

    const play = () => {
      const player = playerRef.current;
      if (!player || player.getPlayerState() === PLAYING) return;
      player.mute();
      player.playVideo();
    };
    window.addEventListener(HERO_PLAY_EVENT, play);

    const onPlayerMessage = (event: MessageEvent) => {
      const iframe = frame.querySelector("iframe");
      if (!iframe || event.source !== iframe.contentWindow) return;
      if (typeof event.data !== "string") return;

      let payload: {
        event?: string;
        info?: {
          currentTime?: number;
          duration?: number;
          progressState?: { current?: number; duration?: number };
        };
      };
      try {
        payload = JSON.parse(event.data);
      } catch {
        return;
      }
      if (payload.event !== "infoDelivery" || !payload.info) return;
      const time = payload.info.currentTime ?? payload.info.progressState?.current;
      const duration = payload.info.duration || payload.info.progressState?.duration;
      if (typeof time !== "number") return;

      const restarted = lastTime > 1 && time < lastTime - 0.8;
      const aboutToLoop =
        typeof duration === "number" && duration > 3 && time > duration - 1.2;
      if (restarted || aboutToLoop) coverButtons(5000);
      lastTime = time;
    };
    window.addEventListener("message", onPlayerMessage);

    if (window.YT?.Player) {
      createPlayer();
    } else {
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previous?.();
        createPlayer();
      };
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
      window.clearTimeout(revealTimer);
      window.clearTimeout(coverTimer);
      window.removeEventListener("message", onPlayerMessage);
      window.removeEventListener(HERO_PLAY_EVENT, play);
      playerRef.current?.destroy();
      playerRef.current = null;
      mount.remove();
    };
  }, []);

  return (
    <section className="relative flex h-dvh min-h-[100svh] w-full items-end justify-center overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden [&_iframe]:pointer-events-none [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:h-full [&_iframe]:w-full"
        aria-hidden
      >
        <div
          ref={frameRef}
          className="absolute top-1/2 left-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 scale-150"
        />
      </div>

      <div
        className={`pointer-events-none absolute inset-0 z-[1] transition-opacity duration-700 ${
          playing && !failed ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden
      >
        <Image
          src="/images/photo-1.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Sits over the player so guests cannot pause, click, or focus it */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[var(--deep-taupe)]/75 via-transparent to-[var(--deep-taupe)]/20" />

      <div className="relative z-10 mb-16 px-6 text-center text-[var(--champagne)] sm:mb-20">
        <p className="mb-3 font-sans text-[0.65rem] uppercase tracking-[0.35em] text-[var(--soft-gold)]">
          {wedding.tagline}
        </p>
        <h2 className="font-serif text-4xl tracking-wide sm:text-5xl md:text-6xl">
          {wedding.coupleNames}
        </h2>
        <p className="mt-4 font-serif text-base italic text-[var(--champagne)]/90 sm:text-lg">
          {wedding.dateDisplay}
        </p>
      </div>
    </section>
  );
}
