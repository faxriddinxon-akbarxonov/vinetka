"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import type { Vignette } from "@/lib/types";
import { isInlineImage } from "@/lib/utils";

export function Cover({ v }: { v: Vignette }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <section
      ref={ref}
      className="grain relative flex min-h-[100svh] items-end overflow-hidden"
    >
      <motion.div
        style={reduce ? undefined : { y }}
        className="absolute inset-0 -bottom-24 -top-12"
      >
        <Image
          src={v.coverImage}
          alt={`${v.className} qopqoq rasmi`}
          fill
          priority
          unoptimized={isInlineImage(v.coverImage)}
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: v.coverPosition }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/85" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, transparent 15%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      <motion.div
        style={reduce ? undefined : { opacity }}
        className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-32 sm:px-8 sm:pb-20"
      >
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[var(--v-accent)]/70" />
          <span className="text-[9px] uppercase tracking-[0.34em] text-white/60">
            Xotira sahifasi
          </span>
        </div>

        <p className="mt-8 max-w-xl text-[11px] uppercase tracking-[0.26em] text-white/65 sm:text-[12px]">
          {v.overline || v.school}
        </p>

        <h1 className="mt-3 font-serif text-[clamp(3.4rem,11vw,8rem)] font-light leading-[0.86] tracking-[-0.025em] text-white">
          {v.className}
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
          <span
            className="font-serif text-3xl italic sm:text-4xl"
            style={{ color: "var(--v-accent)" }}
          >
            {v.graduationYear}
          </span>
          <span className="h-px w-10 bg-white/25" />
          <span className="text-[10px] uppercase tracking-[0.24em] text-white/55">
            {v.graduates.length} bitiruvchi
          </span>
          <span className="size-1 rounded-full bg-white/30" />
          <span className="text-[10px] uppercase tracking-[0.24em] text-white/55">
            {v.memories.length} xotira
          </span>
        </div>

        {v.motto && (
          <p className="mt-9 max-w-lg border-l border-white/25 pl-5 font-serif text-lg font-light italic leading-relaxed text-white/75 sm:text-xl">
            “{v.motto}”
          </p>
        )}
      </motion.div>

      <div className="absolute bottom-0 right-5 z-10 hidden flex-col items-center gap-3 pb-8 sm:right-10 sm:flex">
        <span className="text-[8.5px] uppercase tracking-[0.3em] text-white/40 [writing-mode:vertical-rl]">
          aylantirish
        </span>
        <motion.span
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="grid size-8 place-items-center rounded-full border border-white/25 text-white/60"
        >
          <ArrowDown className="size-3.5" />
        </motion.span>
      </div>
    </section>
  );
}
