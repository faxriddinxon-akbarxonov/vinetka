"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import type { TimelineItem, Vignette } from "@/lib/types";
import { isInlineImage } from "@/lib/utils";
import { SectionLabel } from "./shared";

/**
 * "Yillar lentasi": the section pins and the film strip slides sideways
 * as you scroll down, like winding an old camera film.
 */
export function Timeline({ v }: { v: Vignette }) {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const reduce = useReducedMotion();

  useLayoutEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () =>
      setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const bar = useTransform(smooth, [0, 1], [0, 1]);

  if (!v.timeline.length) return null;

  const heading = (
    <Reveal>
      <SectionLabel count={`${v.timeline.length} lahza`}>Yo‘l</SectionLabel>
      <h2 className="mt-6 max-w-xl font-serif text-[clamp(2rem,4.4vw,3.2rem)] font-light leading-[1.04]">
        Boshidan
        <span className="italic" style={{ color: "var(--v-accent)" }}>
          {" "}
          bugungacha.
        </span>
      </h2>
    </Reveal>
  );

  if (reduce) {
    return (
      <section className="v-line border-t py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">{heading}</div>
        <div className="mt-10 flex gap-5 overflow-x-auto px-5 pb-6 sm:px-8">
          {v.timeline.map((item, i) => (
            <Frame key={item.id} item={item} index={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="v-line relative border-t"
      // one viewport of scrolling per ~1.2 frames feels natural
      style={{ height: `calc(100svh + ${distance}px)` }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pb-10 pt-20">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{heading}</div>

        <div className="relative mt-10 sm:mt-12">
          <Sprockets />
          <motion.div
            ref={track}
            style={{ x }}
            className="relative flex w-max gap-4 bg-neutral-950 px-[max(1.25rem,calc((100vw-72rem)/2+2rem))] py-6 sm:gap-6"
          >
            {v.timeline.map((item, i) => (
              <Frame key={item.id} item={item} index={i} />
            ))}
            <div className="flex w-[40vw] shrink-0 items-center justify-center sm:w-[24rem]">
              <p className="font-hand text-3xl text-white/70 sm:text-4xl">davomi bor…</p>
            </div>
          </motion.div>
          <Sprockets bottom />
        </div>

        <div className="mx-auto mt-8 w-full max-w-6xl px-5 sm:px-8">
          <div className="h-px w-full" style={{ backgroundColor: "var(--v-line)" }}>
            <motion.div
              style={{ scaleX: bar, backgroundColor: "var(--v-accent)" }}
              className="h-px origin-left"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Frame({ item, index }: { item: TimelineItem; index: number }) {
  return (
    <article className="relative flex w-[78vw] shrink-0 flex-col overflow-hidden rounded-[3px] bg-neutral-900 sm:w-[26rem]">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {item.photo ? (
          <Image
            src={item.photo}
            alt={item.title}
            fill
            unoptimized={isInlineImage(item.photo)}
            sizes="(max-width: 640px) 78vw, 26rem"
            className="object-cover"
            style={{ filter: "var(--v-photo)" }}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in srgb, var(--v-accent) 40%, #111), #0b0b0b)",
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <span
          className="absolute left-4 top-3 font-serif text-[clamp(2.6rem,7vw,4.2rem)] font-light leading-none text-white/90 drop-shadow"
        >
          {item.year}
        </span>
        <span className="absolute right-3 top-3 font-mono text-[10px] tracking-widest text-[#ffb36b]/80">
          {String(index + 1).padStart(2, "0")}A ▸
        </span>
      </div>
      <div className="flex-1 p-4 sm:p-5">
        <h3 className="font-serif text-xl leading-snug text-white sm:text-2xl">
          {item.title}
        </h3>
        {item.text && (
          <p className="mt-2 text-[13px] leading-relaxed text-white/60">{item.text}</p>
        )}
      </div>
    </article>
  );
}

function Sprockets({ bottom = false }: { bottom?: boolean }) {
  return (
    <div
      aria-hidden
      className={`h-5 w-full bg-neutral-950 ${bottom ? "" : ""}`}
      style={{
        backgroundImage:
          "linear-gradient(90deg, transparent 0 10px, rgba(255,255,255,0.85) 10px 22px, transparent 22px 32px)",
        backgroundSize: "32px 9px",
        backgroundRepeat: "repeat-x",
        backgroundPosition: "0 center",
        maskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
      }}
    />
  );
}
