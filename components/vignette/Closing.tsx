import { ArrowUpRight, Music2 } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { ShareButton } from "@/components/ui/ShareButton";
import type { Vignette } from "@/lib/types";
import { Confetti } from "./Confetti";

export function Closing({ v }: { v: Vignette }) {
  return (
    <section className="v-line relative overflow-hidden border-t">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.07] blur-[100px]"
        style={{ background: "var(--v-accent)" }}
      />

      <Confetti />

      <div className="relative mx-auto max-w-3xl px-5 py-24 text-center sm:px-8 sm:py-32">
        <Reveal>
          <span
            className="font-serif text-4xl leading-none"
            style={{ color: "var(--v-accent)" }}
          >
            ❦
          </span>
          <h2 className="mt-5 font-serif text-[clamp(2.2rem,5.4vw,4rem)] font-light leading-[1.02]">
            {v.closing?.title || "Bu sahifa tugamaydi."}
          </h2>
          <p
            className="mx-auto mt-5 max-w-xl font-serif text-[17px] font-light leading-relaxed sm:text-lg"
            style={{ color: "var(--v-ink)", opacity: 0.7 }}
          >
            {v.closing?.text ||
              "Rasmlar qo‘shiladi, yangi xotiralar yoziladi. Sinfingizning hikoyasi shu yerda davom etadi."}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <ShareButton
              title={`${v.className} · ${v.graduationYear}`}
              text={v.motto}
              label="Vinetkani ulashish"
              className="v-btn border-transparent font-semibold hover:opacity-90"
            />
            <Link
              href="/yaratish"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] transition-colors duration-300 hover:opacity-80"
              style={{ borderColor: "var(--v-line)", color: "var(--v-ink)" }}
            >
              O‘z sinfingiz uchun yaratish
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>

          {v.audioUrl && (
            <p
              className="mt-8 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em]"
              style={{ color: "var(--v-muted)" }}
            >
              <Music2 className="size-3" /> fon musiqasi yoqilgan
            </p>
          )}
        </Reveal>

        <Reveal delay={0.1}>
          <div className="v-line mt-16 flex flex-col items-center gap-4 border-t pt-8 sm:flex-row sm:justify-between">
            <p className="text-[10px] uppercase tracking-[0.22em]" style={{ color: "var(--v-muted)" }}>
              {v.overline || v.school} · {v.graduationYear}
            </p>
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em]"
              style={{ color: "var(--v-muted)" }}
            >
              <span className="grid size-5 place-items-center rounded-full border border-current text-[9px]">
                V
              </span>
              Vinetka bilan yaratilgan
              <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
