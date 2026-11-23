import { Reveal } from "@/components/ui/Reveal";
import type { Vignette } from "@/lib/types";
import { SectionLabel } from "./shared";

export function Timeline({ v }: { v: Vignette }) {
  if (!v.timeline.length) return null;

  return (
    <section className="v-line border-t py-24 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel count={`${v.timeline.length} lahza`}>Yo‘l</SectionLabel>
          <h2 className="mt-6 max-w-xl font-serif text-[clamp(2rem,4.4vw,3.2rem)] font-light leading-[1.04]">
            Boshidan
            <span className="italic" style={{ color: "var(--v-accent)" }}>
              {" "}
              bugungacha.
            </span>
          </h2>
        </Reveal>

        <div className="mt-10">
          {v.timeline.map((item, i) => (
            <Reveal key={item.id} delay={Math.min(i, 6) * 0.05} y={14}>
              <div className="grid grid-cols-[52px_18px_1fr] gap-3 sm:grid-cols-[96px_22px_1fr] sm:gap-4">
                <div className="py-6 text-right">
                  <span
                    className="font-serif text-xl leading-none sm:text-2xl"
                    style={{ color: "var(--v-accent)" }}
                  >
                    {item.year}
                  </span>
                </div>

                <div className="relative flex justify-center">
                  <span
                    className="absolute inset-y-0 w-px"
                    style={{ backgroundColor: "var(--v-line)" }}
                  />
                  <span
                    className="absolute top-8 size-1.5 -translate-x-px rounded-full ring-4"
                    style={{
                      backgroundColor: "var(--v-accent)",
                      boxShadow: "0 0 0 4px var(--v-bg)",
                    }}
                  />
                </div>

                <div className="py-6">
                  <h3 className="font-serif text-xl leading-snug sm:text-[22px]">
                    {item.title}
                  </h3>
                  {item.text && (
                    <p
                      className="mt-1.5 max-w-md text-[12px] leading-relaxed sm:text-[12.5px]"
                      style={{ color: "var(--v-muted)" }}
                    >
                      {item.text}
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
