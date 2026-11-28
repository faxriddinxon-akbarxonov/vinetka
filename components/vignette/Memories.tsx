"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import type { Memory, Vignette } from "@/lib/types";
import { Lightbox } from "./Lightbox";
import { isInlineImage } from "@/lib/utils";
import { SectionLabel } from "./shared";

const RATIO: Record<NonNullable<Memory["ratio"]>, string> = {
  portrait: "aspect-[4/5]",
  square: "aspect-square",
  wide: "aspect-[16/10]",
};

export function Memories({ v }: { v: Vignette }) {
  const [index, setIndex] = useState<number | null>(null);
  const reduce = useReducedMotion();
  if (!v.memories.length) return null;

  return (
    <section id="xotiralar" className="v-line border-t py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel count={`${v.memories.length} xotira`}>Xotiralar</SectionLabel>
          <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h2 className="max-w-xl font-serif text-[clamp(2rem,4.4vw,3.2rem)] font-light leading-[1.04]">
              Yillar davomida
              <span className="italic" style={{ color: "var(--v-accent)" }}>
                {" "}
                saqlangan lahzalar.
              </span>
            </h2>
            <p
              className="max-w-xs text-[12px] leading-relaxed"
              style={{ color: "var(--v-muted)" }}
            >
              Rasm yoki videoni bosing — to‘liq ekranda ochiladi. Har bir kadr
              ostida o‘sha kunning hikoyasi.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 columns-2 gap-2.5 sm:gap-3 lg:columns-3">
          {v.memories.map((m, i) => {
            const poster = m.type === "video" ? m.poster || v.coverImage : m.src;
            return (
              <Reveal
                key={m.id}
                delay={Math.min(i, 6) * 0.05}
                y={18}
                className="break-inside-avoid"
              >
                <button
                  onClick={() => setIndex(i)}
                  className={`group relative mb-2.5 block w-full overflow-hidden rounded-sm border text-left sm:mb-3 ${RATIO[m.ratio ?? "square"]}`}
                  style={{ borderColor: "var(--v-line)" }}
                  aria-label={`${m.title || "Xotira"} — katta ochish`}
                >
                  {/* the print "develops": washed-out and soft, then full colour */}
                  <motion.div
                    className="absolute inset-0"
                    initial={
                      reduce
                        ? false
                        : { filter: "brightness(1.9) saturate(0) blur(6px)", scale: 1.08 }
                    }
                    whileInView={{
                      filter: "brightness(1) saturate(1) blur(0px)",
                      scale: 1,
                    }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.12 }}
                  >
                    <Image
                      src={poster}
                      alt={m.title || "Xotira"}
                      fill
                      unoptimized={isInlineImage(poster)}
                      sizes="(max-width: 640px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                      style={{ filter: "var(--v-photo)" }}
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

                  {m.type === "video" && (
                    <span className="absolute inset-0 grid place-items-center">
                      <span className="grid size-12 place-items-center rounded-full border border-white/40 bg-black/25 text-white backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
                        <Play className="ml-0.5 size-4 fill-current" />
                      </span>
                    </span>
                  )}

                  <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[8px] uppercase tracking-[0.24em]"
                        style={{ color: "var(--v-accent)" }}
                      >
                        {m.type === "video" ? "video" : "surat"}
                      </span>
                      {m.date && (
                        <span className="text-[8px] tracking-[0.16em] text-white/40">
                          · {m.date}
                        </span>
                      )}
                    </div>
                    {m.title && (
                      <p className="mt-1 font-serif text-[15px] leading-snug text-white sm:text-[17px]">
                        {m.title}
                      </p>
                    )}
                    {m.caption && (
                      <p className="mt-1 line-clamp-2 max-w-[22rem] text-[10px] leading-relaxed text-white/55 sm:text-[10.5px]">
                        {m.caption}
                      </p>
                    )}
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>

      <Lightbox
        memories={v.memories}
        index={index}
        onClose={() => setIndex(null)}
        onIndex={setIndex}
      />
    </section>
  );
}
