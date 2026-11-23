import { Reveal } from "@/components/ui/Reveal";
import type { Vignette } from "@/lib/types";
import { initials, SectionLabel } from "./shared";

export function Teachers({ v }: { v: Vignette }) {
  if (!v.teachers.length) return null;

  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <div
        className="pointer-events-none absolute right-0 top-1/3 size-[420px] rounded-full opacity-[0.06] blur-3xl"
        style={{ background: "var(--v-accent)" }}
      />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel count="minnatdorchilik">Ustozlar</SectionLabel>
          <h2 className="mt-6 max-w-xl font-serif text-[clamp(2rem,4.4vw,3.2rem)] font-light leading-[1.04]">
            Bizni biz qilgan
            <span className="italic" style={{ color: "var(--v-accent)" }}>
              {" "}
              insonlar.
            </span>
          </h2>
          <p
            className="mt-4 max-w-md text-[12.5px] leading-relaxed"
            style={{ color: "var(--v-muted)" }}
          >
            Ular dars o‘tishdan tashqari, hayotga tayyorladi. Bu sahifa — kichik
            “rahmat”.
          </p>
        </Reveal>

        <div className="v-line mt-10 border-t">
          {v.teachers.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.06} y={14}>
              <div className="v-line group grid gap-5 border-b py-7 sm:grid-cols-[auto_1fr] sm:gap-8 sm:py-8">
                <div className="flex items-center gap-4 sm:flex-col sm:items-start">
                  <div
                    className="grid size-14 shrink-0 place-items-center rounded-full border sm:size-16"
                    style={{ borderColor: "var(--v-line)" }}
                  >
                    <span
                      className="font-serif text-xl"
                      style={{ color: "var(--v-accent)" }}
                    >
                      {initials(t.name)}
                    </span>
                  </div>
                  <div className="sm:hidden">
                    <p className="font-serif text-lg leading-tight">{t.name}</p>
                    <p
                      className="mt-0.5 text-[9px] uppercase tracking-[0.16em]"
                      style={{ color: "var(--v-muted)" }}
                    >
                      {t.role}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="hidden sm:block">
                    <p className="font-serif text-xl leading-tight">{t.name}</p>
                    <p
                      className="mt-1 text-[9px] uppercase tracking-[0.18em]"
                      style={{ color: "var(--v-accent)" }}
                    >
                      {t.role}
                    </p>
                  </div>
                  {t.quote && (
                    <p
                      className="mt-3 max-w-2xl font-serif text-[16px] font-normal italic leading-relaxed sm:mt-4 sm:text-[18px]"
                      style={{ color: "var(--v-ink)", opacity: 0.75 }}
                    >
                      “{t.quote}”
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
