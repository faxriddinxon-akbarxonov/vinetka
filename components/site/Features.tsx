import { Images, Link2, Palette, UsersRound } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const FEATURES = [
  {
    icon: Link2,
    title: "Bitta havola — butun sinf",
    text: "Hech qanday ilova, ro‘yxatdan o‘tish va parol yo‘q. Havolani yuboring — ota-onalar, ustozlar va do‘stlar bir bosishda ochadi.",
  },
  {
    icon: Images,
    title: "Rasm va video — bir joyda",
    text: "Sinf albomi, bitiruv kechasi, birinchi qo‘ng‘iroq. Suratlar chiroyli galereyada, videolar to‘liq ekranda.",
  },
  {
    icon: UsersRound,
    title: "Ustozlar va bitiruvchilar",
    text: "Har bir bitiruvchining ismi, orzusi va iliq so‘zi. Ustozlar uchun alohida minnatdorchilik bo‘limi.",
  },
  {
    icon: Palette,
    title: "Har sinfga o‘z dizayni",
    text: "Besh tayyor uslub, maktab ranglari va logotipi. Bir xil shablon emas — sizning sinfingizning o‘z kayfiyati.",
  },
];

export function Features() {
  return (
    <section id="nega" className="border-y border-white/10 bg-ink-2 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="eyebrow text-gold">Nega Vinetka</span>
              <span className="h-px w-12 bg-gold/40" />
            </div>
            <h2 className="mt-6 max-w-2xl font-serif text-[clamp(2.1rem,4.4vw,3.5rem)] font-light leading-[1.05] text-ivory">
              Xotira — bu shunchaki fayl emas.
              <span className="block italic text-ivory/55">Bu qaytib boradigan joy.</span>
            </h2>
          </div>
          <p className="max-w-xs text-[13px] leading-relaxed text-ivory-dim/55">
            Telefoningizdagi minglab rasm vaqt o‘tib yo‘qoladi. Vinetka esa sinfingiz
            hikoyasini bir joyga yig‘adi.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.07} className="h-full">
              <div className="group flex h-full flex-col bg-ink-2 p-6 transition-colors duration-500 hover:bg-ink-3 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-full border border-gold/25 text-gold transition-colors duration-500 group-hover:border-gold/60 group-hover:bg-gold/[0.06]">
                    <f.icon className="size-4" strokeWidth={1.4} />
                  </span>
                  <span className="font-serif text-xs text-ivory-dim/30">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-6 font-serif text-xl leading-snug text-ivory">
                  {f.title}
                </h3>
                <p className="mt-3 text-[12.5px] leading-relaxed text-ivory-dim/60">
                  {f.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
