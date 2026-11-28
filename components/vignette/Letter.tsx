import { Reveal } from "@/components/ui/Reveal";
import type { Vignette } from "@/lib/types";
import { ScrollWords } from "./ScrollWords";
import { initials } from "./shared";

export function Letter({ v }: { v: Vignette }) {
  if (!v.letter?.text) return null;
  const paragraphs = v.letter.text.split(/\n{2,}/).filter(Boolean);

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 opacity-[0.07] blur-3xl"
        style={{ background: "var(--v-accent)" }}
      />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="v-line h-px w-14 border-t" />
            <span
              className="text-[9px] uppercase tracking-[0.34em]"
              style={{ color: "var(--v-muted)" }}
            >
              Sinf rahbari so‘zi
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-10 grid gap-8 sm:grid-cols-[auto_1fr] sm:gap-10">
            <div className="flex flex-row items-center gap-4 sm:flex-col sm:items-start">
              <div
                className="grid size-16 shrink-0 place-items-center rounded-full border sm:size-20"
                style={{
                  borderColor: "var(--v-line)",
                  backgroundColor: "var(--v-surface)",
                }}
              >
                <span
                  className="font-serif text-2xl"
                  style={{ color: "var(--v-accent)" }}
                >
                  {initials(v.letter.signature || "Vinetka")}
                </span>
              </div>
              {v.letter.signature && (
                <div className="sm:mt-1">
                  <p className="font-serif text-lg" style={{ color: "var(--v-ink)" }}>
                    {v.letter.signature}
                  </p>
                  {v.letter.role && (
                    <p
                      className="mt-0.5 text-[10px] uppercase leading-relaxed tracking-[0.16em]"
                      style={{ color: "var(--v-muted)" }}
                    >
                      {v.letter.role}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div>
              {v.letter.title && (
                <h2 className="font-serif text-[clamp(1.9rem,4vw,2.8rem)] font-light leading-tight">
                  {v.letter.title}
                </h2>
              )}
              <div
                className="mt-5 space-y-5 font-serif text-[17px] font-normal leading-[1.8] sm:text-[19px]"
                style={{ color: "var(--v-ink)", opacity: 0.88 }}
              >
                {paragraphs.map((p, i) => (
                  <ScrollWords key={i} text={p} />
                ))}
              </div>
              {v.letter.signature && (
                <p
                  className="mt-8 -rotate-2 font-hand text-4xl"
                  style={{ color: "var(--v-accent)" }}
                >
                  {v.letter.signature}
                </p>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
