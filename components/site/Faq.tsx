"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { FAQ } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="savollar" className="border-t border-white/10 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-3">
              <span className="eyebrow text-gold">Savollar</span>
              <span className="h-px w-12 bg-gold/40" />
            </div>
            <h2 className="mt-6 font-serif text-[clamp(2rem,4vw,3rem)] font-light leading-[1.06] text-ivory">
              Savolingiz bormi?
              <span className="block italic text-ivory/55">Javob shu yerda.</span>
            </h2>
            <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-ivory-dim/55">
              Boshqa savol bo‘lsa, Telegramda yozing — odatda 15 daqiqada javob
              beramiz.
            </p>
          </div>
        </Reveal>

        <div className="border-t border-white/10">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 0.04} y={12}>
                <div className="border-b border-white/10">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-6 py-5 text-left"
                  >
                    <span
                      className={cn(
                        "font-serif text-lg leading-snug transition-colors duration-300 sm:text-xl",
                        isOpen ? "text-gold" : "text-ivory/85",
                      )}
                    >
                      {item.q}
                    </span>
                    <span
                      className={cn(
                        "mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border transition-all duration-500",
                        isOpen
                          ? "rotate-45 border-gold/50 text-gold"
                          : "border-white/15 text-ivory-dim/60",
                      )}
                    >
                      <Plus className="size-3.5" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-xl pb-6 pr-10 text-[13px] leading-relaxed text-ivory-dim/60">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
