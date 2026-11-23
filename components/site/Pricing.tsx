import { Check } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { PLANS } from "@/lib/site";
import { cn, formatSom } from "@/lib/utils";

export function Pricing() {
  return (
    <section id="narxlar" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gold/40" />
            <span className="eyebrow text-gold">Narxlar</span>
            <span className="h-px w-12 bg-gold/40" />
          </div>
          <h2 className="mt-6 font-serif text-[clamp(2.2rem,4.8vw,3.6rem)] font-light leading-[1.04] text-ivory">
            Bir kecha uchun emas,
            <span className="block italic text-ivory/55">o‘n yil uchun.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[13.5px] leading-relaxed text-ivory-dim/60">
            Har bir tarifda dizayn, joylashtirish va texnik yordam bor. To‘lov — Payme,
            Click yoki naqd pul orqali.
          </p>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-4 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.08} className="h-full">
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-sm border p-6 sm:p-7",
                  plan.featured
                    ? "border-gold/45 bg-gradient-to-b from-gold/[0.09] via-gold/[0.03] to-transparent shadow-[0_30px_90px_-50px_rgba(217,185,123,0.5)]"
                    : "border-white/10 bg-white/[0.015] hover:border-white/20",
                )}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-6 rounded-full bg-gold px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-ink">
                    Eng ko‘p tanlanadi
                  </span>
                )}

                <div className="flex items-baseline justify-between">
                  <h3 className="font-serif text-2xl text-ivory">{plan.name}</h3>
                  <span className="text-[9px] uppercase tracking-[0.22em] text-ivory-dim/35">
                    0{i + 1}
                  </span>
                </div>

                <p className="mt-2 min-h-[38px] text-[12px] leading-relaxed text-ivory-dim/55">
                  {plan.description}
                </p>

                <div className="mt-6 border-t border-white/10 pt-6">
                  <div className="flex items-end gap-2">
                    <span
                      className={cn(
                        "font-serif text-[2.6rem] leading-none",
                        plan.featured ? "text-gold" : "text-ivory",
                      )}
                    >
                      {formatSom(plan.price)}
                    </span>
                    <span className="pb-1 text-[12px] text-ivory-dim/50">so‘m</span>
                  </div>
                  <p className="mt-1.5 text-[10.5px] uppercase tracking-[0.18em] text-ivory-dim/35">
                    {plan.period}
                  </p>
                </div>

                <ul className="mt-6 flex-1 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check
                        className={cn(
                          "mt-0.5 size-3.5 shrink-0",
                          plan.featured ? "text-gold" : "text-gold/60",
                        )}
                        strokeWidth={2}
                      />
                      <span className="text-[12.5px] leading-snug text-ivory-dim/75">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/yaratish"
                  className={cn(
                    "mt-7 block rounded-full px-5 py-3.5 text-center text-[12px] font-semibold tracking-wide transition-all duration-300",
                    plan.featured
                      ? "bg-gold text-ink hover:bg-[#ecd39c] hover:shadow-[0_10px_30px_-10px_rgba(217,185,123,0.6)]"
                      : "border border-white/20 text-ivory hover:border-gold/50 hover:bg-gold/[0.06]",
                  )}
                >
                  {plan.cta}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-center text-[10.5px] text-ivory-dim/35">
          Narxlar sinf hajmi va qo‘shimcha xizmatlarga qarab o‘zgarishi mumkin.
          Maktablar uchun chegirma bor.
        </p>
      </div>
    </section>
  );
}
