import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  {
    n: "01",
    title: "Ma’lumot yuboring",
    text: "Maktab nomi, sinf, bitiruv yili, rasm va videolar. Telegram orqali ham yuborsangiz bo‘ladi — qolganini biz qilamiz.",
    meta: "5 daqiqa",
  },
  {
    n: "02",
    title: "Dizaynni tanlang",
    text: "Besh uslubdan birini tanlaysiz, ranglar va shiorni tasdiqlaysiz. Bir kunda tayyor namuna ko‘rasiz.",
    meta: "1 kun",
  },
  {
    n: "03",
    title: "Havolani ulashing",
    text: "Tayyor vinetka havolasini sinf guruhiga tashlaysiz. Har bir ochilgan sahifa — yana bir bor birga bo‘lish.",
    meta: "umr bo‘yi",
  },
];

export function HowItWorks() {
  return (
    <section id="qanday" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-3">
                <span className="eyebrow text-gold">Qanday ishlaydi</span>
                <span className="h-px w-12 bg-gold/40" />
              </div>
              <h2 className="mt-6 font-serif text-[clamp(2.1rem,4.4vw,3.5rem)] font-light leading-[1.04] text-ivory">
                Uch qadam.
                <span className="block italic text-ivory/55">Bir umrlik xotira.</span>
              </h2>
              <p className="mt-5 max-w-sm text-[13.5px] leading-relaxed text-ivory-dim/60">
                Texnik bilim kerak emas. Siz faqat xotiralaringizni bering — qolgan
                hamma narsani biz tayyorlaymiz.
              </p>
              <Link
                href="/yaratish"
                className="group mt-8 inline-flex items-center gap-2.5 rounded-full border border-gold/40 px-6 py-3.5 text-[12.5px] text-gold transition-colors duration-300 hover:bg-gold/10"
              >
                Hoziroq boshlash
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>

          <div className="relative">
            <div className="absolute bottom-6 left-[27px] top-6 w-px bg-gradient-to-b from-gold/40 via-white/10 to-transparent sm:left-[35px]" />
            <div className="flex flex-col gap-4">
              {STEPS.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.1}>
                  <div className="group relative flex gap-5 rounded-sm border border-white/10 bg-white/[0.015] p-5 transition-colors duration-500 hover:border-gold/25 hover:bg-white/[0.03] sm:gap-7 sm:p-7">
                    <div className="relative z-10 grid size-14 shrink-0 place-items-center rounded-full border border-white/15 bg-ink sm:size-[70px]">
                      <span className="font-serif text-xl text-gold sm:text-2xl">
                        {s.n}
                      </span>
                    </div>
                    <div className="pt-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h3 className="font-serif text-2xl text-ivory">{s.title}</h3>
                        <span className="rounded-full border border-white/12 px-2 py-0.5 text-[9px] uppercase tracking-[0.18em] text-ivory-dim/40">
                          {s.meta}
                        </span>
                      </div>
                      <p className="mt-2.5 max-w-md text-[13px] leading-relaxed text-ivory-dim/60">
                        {s.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
