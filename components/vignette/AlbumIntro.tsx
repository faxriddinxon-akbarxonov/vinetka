"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import type { Vignette } from "@/lib/types";
import { isInlineImage } from "@/lib/utils";

/**
 * Pinned scroll scene: a leather album lies closed, then opens page-by-page
 * as the visitor scrolls. The inside shows the class photo and a dedication.
 */
export function AlbumIntro({ v }: { v: Vignette }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });

  // cover swings open around its left edge
  const coverRotate = useTransform(p, [0.05, 0.5], [0, -178]);
  // book slides right so the open spread stays centred
  const bookX = useTransform(p, [0.05, 0.5], ["0%", "50%"]);
  const bookScale = useTransform(p, [0, 0.12, 0.5, 0.92], [0.86, 0.92, 1, 1.04]);
  const tilt = useTransform(p, [0, 0.5], [16, 0]);
  const coverShadow = useTransform(
    p,
    [0.05, 0.5],
    ["0 40px 80px -20px rgba(0,0,0,0.55)", "0 40px 80px -20px rgba(0,0,0,0.25)"],
  );
  const pageReveal = useTransform(p, [0.35, 0.6], [0, 1]);
  const photoY = useTransform(p, [0.4, 0.7], [30, 0]);
  const hintOpacity = useTransform(p, [0, 0.1], [1, 0]);
  const captionOpacity = useTransform(p, [0.55, 0.75], [0, 1]);
  const sceneOpacity = useTransform(p, [0.9, 1], [1, 0.4]);

  const graduates = v.graduates.length;

  if (reduce) {
    return (
      <section className="mx-auto max-w-3xl px-5 py-20">
        <InsidePage v={v} />
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[320svh]" aria-label="Albom">
      <motion.div
        style={{ opacity: sceneOpacity }}
        className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden"
      >
        {/* warm desk light */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 size-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.12] blur-[90px]"
          style={{ background: "var(--v-accent)" }}
        />

        <motion.p
          style={{ opacity: hintOpacity }}
          className="absolute top-[14svh] font-hand text-2xl sm:text-3xl"
        >
          <span style={{ color: "var(--v-accent)" }}>Albomni oching…</span>
        </motion.p>

        <div className="[perspective:2200px]">
          <motion.div
            style={{ x: bookX, scale: bookScale, rotateX: tilt }}
            className="relative aspect-[3/4] w-[min(40vw,380px,48svh)] [transform-style:preserve-3d] max-sm:w-[min(44vw,48svh)]"
          >
            {/* right page (revealed) */}
            <div
              className="absolute inset-0 overflow-hidden rounded-r-md shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]"
              style={{ background: "var(--v-paper)" }}
            >
              <PaperLines />
              <motion.div
                style={{ opacity: pageReveal, y: photoY }}
                className="absolute inset-0 flex flex-col items-center justify-center p-[7%]"
              >
                <div className="relative w-full -rotate-2 bg-white p-[5%] pb-[14%] shadow-[0_10px_25px_-8px_rgba(0,0,0,0.45)]">
                  <Tape className="-top-3 left-1/2 -translate-x-1/2 rotate-3" />
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-200">
                    <Image
                      src={v.coverImage}
                      alt={`${v.className} sinf rasmi`}
                      fill
                      unoptimized={isInlineImage(v.coverImage)}
                      sizes="(max-width: 640px) 40vw, 380px"
                      className="object-cover"
                      style={{ objectPosition: v.coverPosition, filter: "var(--v-photo)" }}
                    />
                  </div>
                  <p className="absolute inset-x-0 bottom-[3%] text-center font-hand text-[clamp(0.9rem,2.4vw,1.6rem)] leading-none text-neutral-700">
                    Bizning sinf · {v.graduationYear}
                  </p>
                </div>
                <motion.p
                  style={{ opacity: captionOpacity }}
                  className="mt-[8%] text-center font-hand text-[clamp(0.85rem,2vw,1.35rem)] leading-tight text-neutral-600"
                >
                  {graduates ? `${graduates} ta yurak, bitta sinf` : v.motto}
                </motion.p>
              </motion.div>
            </div>

            {/* cover: front + inner side */}
            <motion.div
              style={{ rotateY: coverRotate, boxShadow: coverShadow }}
              className="absolute inset-0 origin-left rounded-r-md [transform-style:preserve-3d]"
            >
              <div
                className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-r-md p-[9%] text-center [backface-visibility:hidden]"
                style={{
                  background:
                    "radial-gradient(120% 90% at 30% 20%, color-mix(in srgb, var(--v-accent-deep) 70%, #2a1a10) 0%, color-mix(in srgb, var(--v-accent-deep) 40%, #120a06) 100%)",
                }}
              >
                <LeatherTexture />
                <div className="absolute inset-[5%] rounded-sm border border-[#f3dfae]/40" />
                <div className="absolute inset-[6.5%] rounded-sm border border-[#f3dfae]/20" />
                <div className="absolute inset-y-0 left-[4%] w-px bg-black/30" />
                <span className="relative font-serif text-[clamp(0.55rem,1.2vw,0.8rem)] uppercase tracking-[0.4em] text-[#f3dfae]/70">
                  {v.overline || v.school}
                </span>
                <span className="relative my-[8%] font-serif text-[clamp(1.2rem,2.5vw,1.9rem)] text-[#f3dfae]/80">
                  ❦
                </span>
                <h2 className="emboss relative font-serif text-[clamp(1.6rem,5vw,3.6rem)] font-light leading-[0.95]">
                  {v.className}
                </h2>
                <p className="emboss relative mt-[6%] font-serif text-[clamp(1.1rem,3vw,2.2rem)] italic">
                  {v.graduationYear}
                </p>
                <span className="relative mt-[10%] text-[clamp(0.5rem,1vw,0.7rem)] uppercase tracking-[0.36em] text-[#f3dfae]/55">
                  Bitiruvchilar albomi
                </span>
              </div>

              <div
                className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-l-md p-[10%] text-center [backface-visibility:hidden] [transform:rotateY(180deg)]"
                style={{ background: "var(--v-paper)" }}
              >
                <PaperLines />
                <p className="relative font-hand text-[clamp(1rem,2.6vw,1.9rem)] leading-snug text-neutral-700">
                  Ushbu albom
                  <br />
                  {v.className} bitiruvchilariga
                  <br />
                  bag‘ishlanadi
                </p>
                {v.motto && (
                  <p className="relative mt-[10%] max-w-[90%] font-serif text-[clamp(0.7rem,1.5vw,1rem)] italic leading-relaxed text-neutral-500">
                    “{v.motto}”
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function InsidePage({ v }: { v: Vignette }) {
  return (
    <div className="relative bg-white p-4 pb-14 shadow-xl">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={v.coverImage}
          alt={`${v.className} sinf rasmi`}
          fill
          unoptimized={isInlineImage(v.coverImage)}
          sizes="(max-width: 768px) 100vw, 720px"
          className="object-cover"
          style={{ objectPosition: v.coverPosition, filter: "var(--v-photo)" }}
        />
      </div>
      <p className="absolute inset-x-0 bottom-3 text-center font-hand text-2xl text-neutral-700">
        Bizning sinf · {v.graduationYear}
      </p>
    </div>
  );
}

export function Tape({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`absolute z-10 h-[18px] w-[72px] bg-[#f5ecd0]/75 shadow-sm backdrop-blur-[1px] ${className}`}
      style={{
        clipPath:
          "polygon(2% 0, 98% 4%, 100% 50%, 97% 100%, 3% 96%, 0 50%)",
      }}
    />
  );
}

function PaperLines() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-60"
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 15%, rgba(160,120,60,0.12), transparent 40%), radial-gradient(circle at 85% 90%, rgba(120,80,40,0.14), transparent 45%)",
      }}
    />
  );
}

function LeatherTexture() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-50 mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='l'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.4' numOctaves='3'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23l)' opacity='0.6'/%3E%3C/svg%3E\")",
      }}
    />
  );
}
