import { Reveal } from "@/components/ui/Reveal";
import type { Vignette } from "@/lib/types";
import { initials, SectionLabel } from "./shared";

export function Graduates({ v }: { v: Vignette }) {
  if (!v.graduates.length) return null;

  return (
    <section className="v-line border-t py-24 sm:py-28">
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
            <p
              className="max-w-xs text-[12px] leading-relaxed"
              style={{ color: "var(--v-muted)" }}
            >
              Har bir ism orqasida o‘n bir yil, minglab kulgi va bitta orzu bor.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
          {v.graduates.map((person, i) => (
            <Reveal key={person.id} delay={Math.min(i, 8) * 0.045} y={16}>
              <article
                className="group relative flex h-full flex-col overflow-hidden rounded-sm border p-4 transition-colors duration-500 sm:p-5"
                style={{
                  borderColor: "var(--v-line)",
                  backgroundColor: "var(--v-surface)",
                }}
              >
                <div className="flex items-start justify-between">
                  <span
                    className="font-serif text-[11px] tabular-nums"
                    style={{ color: "var(--v-muted)", opacity: 0.5 }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="size-1 rounded-full transition-transform duration-500 group-hover:scale-[1.8]"
                    style={{ backgroundColor: "var(--v-accent)", opacity: 0.6 }}
                  />
                </div>

                <div
                  className="mt-4 grid size-12 place-items-center rounded-full border sm:size-14"
                  style={{ borderColor: "var(--v-line)" }}
                >
                  <span
                    className="font-serif text-lg sm:text-xl"
                    style={{ color: "var(--v-accent)" }}
                  >
                    {initials(person.name)}
                  </span>
                </div>

                <h3 className="mt-3.5 font-serif text-[17px] leading-tight sm:text-lg">
                  {person.name}
                </h3>
                {person.role && (
                  <p
                    className="mt-1 text-[8.5px] uppercase leading-relaxed tracking-[0.16em] sm:text-[9px]"
                    style={{ color: "var(--v-accent)" }}
                  >
                    {person.role}
                  </p>
                )}
                {person.quote && (
                  <p
                    className="mt-3 flex-1 text-[11px] leading-relaxed sm:text-[11.5px]"
                    style={{ color: "var(--v-muted)" }}
                  >
                    “{person.quote}”
                  </p>
                )}

                <span
                  className="mt-4 block h-px w-0 transition-all duration-700 group-hover:w-full"
                  style={{ backgroundColor: "var(--v-accent)", opacity: 0.5 }}
                />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
