import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export function QuoteBand() {
  return (
    <section className="relative overflow-hidden border-y border-white/10">
      <Image
        src="/images/memory-corridor.jpg"
        alt="Quyosh nuri tushayotgan maktab koridori"
        fill
        sizes="100vw"
        className="object-cover object-[center_60%]"
      />
      <div className="absolute inset-0 bg-ink/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(9,11,14,0.85)_100%)]" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-28 text-center sm:py-36">
        <Reveal>
          <span className="font-serif text-5xl leading-none text-gold/60">“</span>
          <p className="mt-2 font-serif text-[clamp(1.6rem,3.6vw,2.8rem)] font-light italic leading-[1.3] text-ivory">
            Xotira — o‘tgan kunlarning eng uzun qo‘shig‘i. Uni bir marta yozib
            qo‘ysangiz, hech qachon tugamaydi.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gold/50" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-ivory-dim/50">
              Vinetka falsafasi
            </span>
            <span className="h-px w-8 bg-gold/50" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
