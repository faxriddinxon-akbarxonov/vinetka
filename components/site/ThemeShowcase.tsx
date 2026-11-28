"use client";

import { ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { THEME_LIST, themeStyle } from "@/lib/themes";
import type { ThemeId } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ThemeShowcase() {
  const [theme, setTheme] = useState<ThemeId>("oltin");
  const active = THEME_LIST.find((t) => t.id === theme) ?? THEME_LIST[0];
  const index = THEME_LIST.findIndex((t) => t.id === theme) + 1;

  return (
    <section id="dizayn" className="relative border-t border-white/10 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:gap-20">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="eyebrow text-gold">Dizayn</span>
            <span className="h-px w-12 bg-gold/40" />
            <span className="text-[10px] uppercase tracking-[0.24em] text-ivory-dim/40">
              01 — {String(THEME_LIST.length).padStart(2, "0")}
            </span>
          </div>

          <h2 className="mt-7 max-w-lg font-serif text-[clamp(2.2rem,4.6vw,3.7rem)] font-light leading-[1.02] text-ivory">
            Har sinf uchun
            <span className="block italic text-ivory/60">o‘z kayfiyati.</span>
          </h2>

          <p className="mt-6 max-w-md text-[14.5px] leading-relaxed text-ivory-dim/75">
            Vinetkaning dizayni — sizning hikoyangizning ohangi. Besh tayyor
            uslubdan birini tanlang, ranglarni almashtiring va natijani shu
            yerning o‘zida ko‘ring. Maktab brendingizga moslab ham bera olamiz.
          </p>

          <div className="mt-9 grid gap-2 sm:grid-cols-2">
            {THEME_LIST.map((t) => {
              const isActive = t.id === theme;
              return (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "group flex items-center gap-3 rounded-sm border px-3.5 py-3 text-left transition-all duration-300",
                    isActive
                      ? "border-gold/50 bg-gold/[0.06]"
                      : "border-white/10 hover:border-white/25 hover:bg-white/[0.03]",
                  )}
                >
                  <span className="flex -space-x-1.5">
                    {t.swatch.map((c) => (
                      <span
                        key={c}
                        className="size-4 rounded-full border border-black/30"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </span>
                  <span className="flex-1">
                    <span className="block text-[13px] text-ivory">{t.name}</span>
                    <span className="block text-[10px] text-ivory-dim/45">
                      {t.light ? "yorug‘" : "tungi"}
                    </span>
                  </span>
                  {isActive && <Check className="size-3.5 text-gold" />}
                </button>
              );
            })}
          </div>

          <p className="mt-5 text-[12px] leading-relaxed text-ivory-dim/45">
            {active.note}
          </p>

          <Link
            href="/v/11-a-2026"
            className="group mt-7 inline-flex items-center gap-2 text-[12.5px] text-gold transition-colors hover:text-[#ecd39c]"
          >
            To‘liq namunani ochish
            <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="relative">
            <div className="pointer-events-none absolute -inset-8 rounded-full bg-gold/5 blur-3xl" />

            <div
              className="vignette relative overflow-hidden rounded-sm border shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] transition-colors duration-500"
              style={themeStyle(theme)}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/cover-graduation.jpg"
                  alt="Vinetka qopqog‘i namunasi"
                  fill
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="object-cover object-[center_45%] transition-transform duration-[1.6s] hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/90" />

                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
                  <span className="rounded-full border border-white/25 bg-black/20 px-3 py-1 text-[8.5px] uppercase tracking-[0.24em] text-white/85 backdrop-blur-sm">
                    1-maktab · Navoiy
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.28em] text-white/60">
                    {index} / 4
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span
                    className="text-[9px] uppercase tracking-[0.3em]"
                    style={{ color: active.vars["--v-accent"] }}
                  >
                    Bitiruv · 2026
                  </span>
                  <h3 className="mt-2 font-serif text-4xl font-light leading-none text-white">
                    11-A sinf
                  </h3>
                  <p className="mt-3 max-w-[16rem] font-serif text-[15px] italic leading-snug text-white/70">
                    “Biz birga yozgan yillar hech qachon tugamaydi.”
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-white/20 pt-3">
                    <span className="text-[9px] uppercase tracking-[0.22em] text-white/55">
                      14 bitiruvchi · 4 ustoz
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.22em] text-white/55">
                      6 xotira
                    </span>
                  </div>
                </div>
              </div>

              <div
                className="flex items-center justify-between px-6 py-4"
                style={{ backgroundColor: active.vars["--v-surface"] }}
              >
                <div className="flex items-center gap-2">
                  {active.swatch.slice(1).map((c) => (
                    <span
                      key={c}
                      className="size-2 rounded-full"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                  <span
                    className="ml-1 text-[10px] tracking-wide"
                    style={{ color: active.vars["--v-muted"] }}
                  >
                    {active.name}
                  </span>
                </div>
                <span
                  className="text-[10px] uppercase tracking-[0.2em]"
                  style={{ color: active.vars["--v-accent"] }}
                >
                  vinetka.uz
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.22em] text-ivory-dim/35">
              <span className="h-px w-8 bg-white/15" />
              shu yerda sinab ko‘ring
              <span className="h-px w-8 bg-white/15" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
