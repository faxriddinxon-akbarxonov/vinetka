"use client";

import { motion, useScroll } from "framer-motion";
import { Pause, Play } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ShareButton } from "@/components/ui/ShareButton";
import type { Vignette } from "@/lib/types";
import { cn } from "@/lib/utils";

export function VignetteBar({ v }: { v: Vignette }) {
  const [scrolled, setScrolled] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleAudio = async () => {
    const el = audioRef.current;
    if (!el) return;
    try {
      if (el.paused) {
        await el.play();
        setPlaying(true);
      } else {
        el.pause();
        setPlaying(false);
      }
    } catch {
      setPlaying(false);
    }
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        scrolled ? "backdrop-blur-xl" : "bg-transparent",
      )}
      style={
        scrolled
          ? {
              backgroundColor: "color-mix(in srgb, var(--v-bg) 82%, transparent)",
              borderBottom: "1px solid var(--v-line)",
            }
          : undefined
      }
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            aria-label="Vinetka bosh sahifasi"
            className="grid size-8 place-items-center rounded-full border text-[13px] transition-opacity hover:opacity-70"
            style={{ borderColor: "var(--v-line)", color: "var(--v-accent)" }}
          >
            <span className="font-serif">V</span>
          </Link>
          <span
            className={cn(
              "font-serif text-[13px] tracking-wide transition-all duration-500",
              scrolled ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0",
            )}
            style={{ color: "var(--v-ink)" }}
          >
            {v.className} · {v.graduationYear}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {v.audioUrl && (
            <>
              <audio ref={audioRef} src={v.audioUrl} loop preload="none" />
              <button
                onClick={toggleAudio}
                aria-label={playing ? "Musiqani to‘xtatish" : "Musiqani yoqish"}
                className="grid size-8 place-items-center rounded-full border transition-colors"
                style={{ borderColor: "var(--v-line)", color: "var(--v-accent)" }}
              >
                {playing ? <Pause className="size-3" /> : <Play className="size-3" />}
              </button>
            </>
          )}

          <ShareButton
            title={`${v.className} · ${v.graduationYear}`}
            text={v.motto}
            className={cn(
              "px-3 py-2",
              scrolled
                ? "border-transparent"
                : "border-white/30 text-white/85 hover:border-white/60 hover:text-white",
            )}
            style={scrolled ? { color: "var(--v-ink)" } : undefined}
            label="Ulashish"
          />
        </div>
      </div>

      <motion.span
        style={{ scaleX: scrollYProgress, backgroundColor: "var(--v-accent)" }}
        className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left opacity-60"
      />
    </header>
  );
}
