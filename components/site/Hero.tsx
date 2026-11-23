"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <section
      ref={ref}
      className="grain relative flex min-h-[100svh] items-end overflow-hidden"
    >
      <motion.div
        style={reduce ? undefined : { y }}
        className="absolute inset-0 -bottom-32 -top-16"
      >
        <Image
          src="/images/cover-graduation.jpg"
          alt="Bitiruvchilar quyosh botishida qopqoqlarni havoga otmoqda"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_45%]"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/25 to-ink" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_55%_45%,transparent_10%,rgba(9,11,14,0.65)_100%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-14 pt-32 sm:px-8 sm:pb-16 lg:pb-20">
        <motion.div style={reduce ? undefined : { opacity: fade }} initial={false}>
          <div
            className="fade-up mb-8 flex items-center gap-3 sm:mb-10"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="size-1.5 rounded-full bg-gold shadow-[0_0_10px_2px_rgba(217,185,123,0.5)]" />
            <span className="eyebrow text-ivory/70">
              Maktab bitiruvchilari uchun · 2026
            </span>
            <span className="h-px w-10 bg-gold/40 sm:w-20" />
          </div>

          <h1 className="max-w-4xl font-serif text-[clamp(3rem,8.4vw,7.2rem)] font-light leading-[0.9] tracking-[-0.02em] text-ivory">
            <span className="fade-up block" style={{ animationDelay: "0.2s" }}>
              Sinfingiz.
            </span>
            <span className="fade-up block" style={{ animationDelay: "0.32s" }}>
              Yillaringiz.
            </span>
            <span
              className="gold-text fade-up block italic"
              style={{ animationDelay: "0.44s" }}
            >
              Bir umrga.
            </span>
          </h1>

          <p
            className="fade-up mt-8 max-w-xl text-[15px] leading-relaxed text-ivory-dim/85 sm:text-base"
            style={{ animationDelay: "0.6s" }}
          >
            Onlayn vinetka — sinf rasmlari, ustozlar, videolar va yillar davomida
            yig‘ilgan xotiralar bitta chiroyli sahifada. Bir havola. Butun sinf.
            Abadiy.
          </p>

          <div
            className="fade-up mt-10 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "0.72s" }}
          >
            <Link
              href="/yaratish"
              className="group inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 text-[13px] font-semibold tracking-wide text-ink transition-all duration-500 hover:bg-[#ecd39c] hover:shadow-[0_10px_40px_-8px_rgba(217,185,123,0.55)]"
            >
              Vinetka yaratish
              <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/v/11-a-2026"
              className="group inline-flex items-center gap-3 rounded-full border border-white/25 px-7 py-4 text-[13px] font-medium tracking-wide text-ivory backdrop-blur-sm transition-all duration-500 hover:border-gold/60 hover:bg-white/5"
            >
              <span className="grid size-6 place-items-center rounded-full border border-gold/50 text-gold">
                <Play className="size-2.5 fill-current" />
              </span>
              Namunani ochish
            </Link>
          </div>

          <div
            className="fade-up mt-14 flex flex-wrap items-end gap-x-10 gap-y-5 border-t border-white/10 pt-6 sm:mt-20"
            style={{ animationDelay: "0.85s" }}
          >
            {[
              ["2026", "bitiruv yili"],
              ["14 · 4", "bitiruvchi va ustoz"],
              ["1", "havola — abadiy"],
            ].map(([value, label]) => (
              <div key={label} className="flex items-baseline gap-2.5">
                <span className="font-serif text-2xl text-gold">{value}</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-ivory-dim/55">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 pb-6 lg:flex">
        <span className="text-[9px] uppercase tracking-[0.3em] text-ivory-dim/40">
          pastga
        </span>
        <span className="relative h-12 w-px overflow-hidden bg-white/15">
          <motion.span
            animate={reduce ? undefined : { y: ["-100%", "220%"] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-0 top-0 h-1/2 bg-gold"
          />
        </span>
      </div>
    </section>
  );
}
