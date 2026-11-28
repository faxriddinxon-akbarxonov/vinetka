"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import type { Person, Vignette } from "@/lib/types";
import { isInlineImage } from "@/lib/utils";
import { Tape } from "./AlbumIntro";
import { initials, SectionLabel } from "./shared";

/** Deterministic "hand-placed" tilt so SSR and client agree. */
const TILTS = [-3.5, 2.5, -1.5, 4, -2.5, 1.5, 3, -4, 2, -1];
const tiltOf = (i: number) => TILTS[i % TILTS.length];

export function Graduates({ v }: { v: Vignette }) {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();
  if (!v.graduates.length) return null;

  return (
    <section id="bitiruvchilar" className="v-line relative border-t py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel count={`${v.graduates.length} bitiruvchi`}>
            Bitiruvchilar
          </SectionLabel>
          <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h2 className="max-w-xl font-serif text-[clamp(2rem,4.4vw,3.2rem)] font-light leading-[1.04]">
              Sinfning
              <span className="italic" style={{ color: "var(--v-accent)" }}>
                {" "}
                yuzlari.
              </span>
            </h2>
            <p className="max-w-xs text-[13px] leading-relaxed" style={{ color: "var(--v-muted)" }}>
              Har bir ism orqasida o‘n bir yil, minglab kulgi va bitta orzu bor.
              Suratni bosing — uning so‘zini o‘qing.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-7 sm:gap-y-12 lg:grid-cols-4">
          {v.graduates.map((person, i) => {
            const tilt = tiltOf(i);
            return (
              <motion.button
                key={person.id}
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`${person.name} — batafsil`}
                initial={
                  reduce
                    ? false
                    : { opacity: 0, y: 90, rotate: tilt * 4, scale: 0.85 }
                }
                whileInView={{ opacity: 1, y: 0, rotate: tilt, scale: 1 }}
                whileHover={reduce ? undefined : { rotate: 0, scale: 1.05, y: -8, zIndex: 5 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  type: "spring",
                  stiffness: 90,
                  damping: 14,
                  delay: (i % 4) * 0.08,
                }}
                className="group relative block cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4"
                style={{ outlineColor: "var(--v-accent)" }}
              >
                <Polaroid person={person} index={i} />
              </motion.button>
            );
          })}
        </div>
      </div>

      <PersonModal
        people={v.graduates}
        index={open}
        onClose={() => setOpen(null)}
        onIndex={setOpen}
      />
    </section>
  );
}

function Polaroid({ person, index }: { person: Person; index: number }) {
  return (
    <div
      className="relative p-2.5 pb-3 shadow-[0_14px_30px_-12px_rgba(0,0,0,0.55)] transition-shadow duration-500 group-hover:shadow-[0_26px_50px_-14px_rgba(0,0,0,0.6)] sm:p-3 sm:pb-4"
      style={{ background: "var(--v-paper)" }}
    >
      {index % 3 !== 1 && (
        <Tape className={index % 2 ? "-top-2 right-3 rotate-[14deg]" : "-top-2 left-3 -rotate-[12deg]"} />
      )}
      <PersonPhoto person={person} sizes="(max-width: 640px) 45vw, 260px" />
      <p className="mt-2.5 truncate font-hand text-[1.35rem] leading-none text-neutral-800 sm:text-[1.6rem]">
        {person.name}
      </p>
      {person.role && (
        <p className="mt-1 truncate text-[10.5px] uppercase tracking-[0.14em] text-neutral-500">
          {person.role}
        </p>
      )}
    </div>
  );
}

export function PersonPhoto({
  person,
  sizes,
  className = "aspect-[4/5]",
}: {
  person: Person;
  sizes: string;
  className?: string;
}) {
  return (
    <div className={`relative w-full overflow-hidden bg-neutral-200 ${className}`}>
      {person.photo ? (
        <Image
          src={person.photo}
          alt={person.name}
          fill
          unoptimized={isInlineImage(person.photo)}
          sizes={sizes}
          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          style={{ filter: "var(--v-photo)" }}
        />
      ) : (
        <div
          className="absolute inset-0 grid place-items-center"
          style={{
            background:
              "radial-gradient(circle at 50% 35%, color-mix(in srgb, var(--v-accent) 35%, #f3ead8), color-mix(in srgb, var(--v-accent-deep) 55%, #3a2a1c))",
          }}
        >
          <span className="font-serif text-[clamp(2rem,6vw,3.4rem)] font-light text-white/85">
            {initials(person.name)}
          </span>
        </div>
      )}
      {/* soft inner vignette like an old print */}
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_40px_rgba(60,40,20,0.35)]" />
    </div>
  );
}

function PersonModal({
  people,
  index,
  onClose,
  onIndex,
}: {
  people: Person[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const person = index === null ? null : people[index];

  const go = useCallback(
    (dir: number) => {
      if (index === null) return;
      onIndex((index + dir + people.length) % people.length);
    },
    [index, onIndex, people.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.classList.add("no-scroll");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("no-scroll");
    };
  }, [index, onClose, go]);

  return (
    <AnimatePresence>
      {person && index !== null && (
        <motion.div
          key="backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={person.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-5 backdrop-blur-md"
        >
          <motion.div
            key={person.id}
            initial={{ opacity: 0, y: 40, rotate: -6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, rotate: -1.5, scale: 1 }}
            exit={{ opacity: 0, y: 20, rotate: 4, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 140, damping: 18 }}
            onClick={(e) => e.stopPropagation()}
            className="relative grid w-full max-w-[min(92vw,760px)] gap-5 p-4 pb-6 shadow-2xl sm:grid-cols-[1fr_1.1fr] sm:gap-7 sm:p-5"
            style={{ background: "var(--v-paper)" }}
          >
            <Tape className="-top-2.5 left-1/2 -translate-x-1/2 rotate-2" />
            <PersonPhoto person={person} sizes="(max-width: 640px) 90vw, 360px" className="aspect-[4/5] max-sm:aspect-square" />
            <div className="flex flex-col justify-center text-neutral-800">
              <span className="text-[11px] uppercase tracking-[0.24em] text-neutral-500">
                {String(index + 1).padStart(2, "0")} / {String(people.length).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-hand text-[2.6rem] leading-none sm:text-5xl">
                {person.name}
              </h3>
              {person.role && (
                <p className="mt-2 text-[12px] uppercase tracking-[0.16em]" style={{ color: "var(--v-accent-deep)" }}>
                  {person.role}
                </p>
              )}
              {person.quote && (
                <p className="mt-5 border-l-2 pl-4 font-serif text-xl italic leading-relaxed text-neutral-700" style={{ borderColor: "var(--v-accent)" }}>
                  “{person.quote}”
                </p>
              )}
              <div className="mt-7 flex items-center gap-2">
                <ModalBtn label="Oldingi" onClick={() => go(-1)}>
                  <ChevronLeft className="size-4" />
                </ModalBtn>
                <ModalBtn label="Keyingi" onClick={() => go(1)}>
                  <ChevronRight className="size-4" />
                </ModalBtn>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Yopish"
              className="absolute -right-3 -top-3 grid size-9 place-items-center rounded-full bg-neutral-900 text-white shadow-lg transition-transform hover:scale-110"
            >
              <X className="size-4" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ModalBtn({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="grid size-10 place-items-center rounded-full border border-neutral-400/60 text-neutral-700 transition-colors hover:bg-neutral-900 hover:text-white"
    >
      {children}
    </button>
  );
}
