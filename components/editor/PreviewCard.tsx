import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Circle } from "lucide-react";
import { THEMES, themeStyle } from "@/lib/themes";
import type { Vignette } from "@/lib/types";

export function PreviewCard({ draft }: { draft: Vignette }) {
  const theme = THEMES[draft.theme] ?? THEMES.oltin;
  const checks = [
    { ok: Boolean(draft.school && draft.className), label: "Maktab va sinf" },
    { ok: draft.graduates.length >= 5, label: "5+ bitiruvchi" },
    { ok: draft.memories.length >= 3, label: "3+ xotira" },
    { ok: Boolean(draft.letter?.text), label: "Ustoz so‘zi" },
  ];
  const done = checks.filter((c) => c.ok).length;

  return (
    <div className="space-y-4">
      <div
        className="vignette overflow-hidden rounded-sm border shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]"
        style={themeStyle(draft.theme)}
      >
        <div className="relative aspect-[4/5]">
          <Image
            src={draft.coverImage || "/images/cover-graduation.jpg"}
            alt="Vinetka qopqog‘i"
            fill
            unoptimized
            sizes="400px"
            className="object-cover"
            style={{ objectPosition: draft.coverPosition }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/90" />

          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
            <span className="rounded-full border border-white/25 bg-black/20 px-2.5 py-1 text-[7.5px] uppercase tracking-[0.2em] text-white/70 backdrop-blur-sm">
              {draft.school || "Maktab"} · {draft.graduationYear}
            </span>
            <span className="text-[8px] uppercase tracking-[0.2em] text-white/40">
              {theme.name}
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-4">
            <span
              className="text-[8px] uppercase tracking-[0.24em]"
              style={{ color: "var(--v-accent)" }}
            >
              {draft.overline || "bitiruv"}
            </span>
            <h3 className="mt-1.5 font-serif text-3xl font-light leading-none text-white">
              {draft.className || "Sinfingiz"}
            </h3>
            {draft.motto && (
              <p className="mt-2 line-clamp-2 font-serif text-[12px] italic leading-snug text-white/65">
                “{draft.motto}”
              </p>
            )}
            <div className="mt-3 flex items-center justify-between border-t border-white/20 pt-2 text-[8px] uppercase tracking-[0.18em] text-white/45">
              <span>{draft.graduates.length} bitiruvchi</span>
              <span>{draft.memories.length} xotira</span>
            </div>
          </div>
        </div>

        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ backgroundColor: "var(--v-surface)" }}
        >
          <div className="flex gap-1.5">
            {theme.swatch.slice(1).map((c) => (
              <span key={c} className="size-1.5 rounded-full" style={{ backgroundColor: c }} />
            ))}
          </div>
          <span
            className="text-[8px] uppercase tracking-[0.2em]"
            style={{ color: "var(--v-muted)" }}
          >
            jonli ko‘rinish
          </span>
        </div>
      </div>

      <Link
        href="/v/preview"
        target="_blank"
        className="flex items-center justify-center gap-2 rounded-full border border-gold/40 py-3 text-[11.5px] text-gold transition-colors duration-300 hover:bg-gold/10"
      >
        To‘liq ko‘rish
        <ArrowUpRight className="size-3.5" />
      </Link>

      <div className="rounded-sm border border-white/10 bg-white/[0.012] p-4">
        <div className="flex items-center justify-between">
          <span className="text-[9px] uppercase tracking-[0.2em] text-ivory-dim/45">
            Tayyorlik
          </span>
          <span className="font-serif text-sm text-gold">{done}/4</span>
        </div>
        <div className="mt-3 h-px w-full bg-white/10">
          <div
            className="h-px bg-gold transition-all duration-700"
            style={{ width: `${(done / 4) * 100}%` }}
          />
        </div>
        <ul className="mt-3.5 space-y-2">
          {checks.map((c) => (
            <li key={c.label} className="flex items-center gap-2 text-[11px]">
              {c.ok ? (
                <Check className="size-3.5 text-gold" />
              ) : (
                <Circle className="size-3.5 text-ivory-dim/25" />
              )}
              <span className={c.ok ? "text-ivory-dim/70" : "text-ivory-dim/35"}>
                {c.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
