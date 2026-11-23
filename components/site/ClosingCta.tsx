import { ArrowRight, Phone, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/site";

export function ClosingCta() {
  return (
    <section className="relative overflow-hidden border-t border-white/10">
      <Image
        src="/images/memory-classroom.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink" />

      <div className="relative z-10 mx-auto max-w-5xl px-5 py-28 text-center sm:px-8 sm:py-36">
        <Reveal>
          <span className="eyebrow text-gold/80">Bitiruv bir marta bo‘ladi</span>
          <h2 className="mx-auto mt-7 max-w-3xl font-serif text-[clamp(2.4rem,5.6vw,4.6rem)] font-light leading-[1.02] text-ivory">
            Farzandingizning yillari
            <span className="block italic text-ivory/60">yo‘qolib ketmasin.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[14px] leading-relaxed text-ivory-dim/65">
            Bugun boshlang — ertaga sinfingizning hikoyasi onlayn bo‘ladi. Biz
            rasmlardan tortib dizayngacha hammasini o‘zimizga olamiz.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/yaratish"
              className="group inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 text-[13px] font-semibold text-ink transition-all duration-500 hover:bg-[#ecd39c] hover:shadow-[0_10px_40px_-8px_rgba(217,185,123,0.55)]"
            >
              Vinetka yaratish
              <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
            <a
              href={SITE.telegram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/20 px-6 py-4 text-[12.5px] text-ivory transition-colors duration-300 hover:border-gold/50 hover:bg-white/5"
            >
              <Send className="size-3.5" />
              Telegramda yozish
            </a>
            <a
              href={`tel:${SITE.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2.5 px-3 py-4 text-[12.5px] text-ivory-dim/60 transition-colors hover:text-ivory"
            >
              <Phone className="size-3.5" />
              {SITE.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
