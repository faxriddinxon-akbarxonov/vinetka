import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

const SHOTS = [
  {
    src: "/images/memory-corridor.jpg",
    title: "Uchinchi qavat",
    caption: "Qo‘ng‘iroq chalinardi-yu, hech kim ketishni xohlamasdi.",
    span: "lg:col-span-4",
    ratio: "aspect-[4/5]",
    offset: "lg:mt-0",
  },
  {
    src: "/images/memory-yard.jpg",
    title: "Hovli",
    caption: "Velosipedlar, gullar va cheksiz tanaffuslar.",
    span: "lg:col-span-5",
    ratio: "aspect-[4/3]",
    offset: "lg:mt-14",
  },
  {
    src: "/images/memory-flowers.jpg",
    title: "Gullar va daftar",
    caption: "Ustozlarga oxirgi marta gul olib kelgan kunimiz.",
    span: "lg:col-span-3",
    ratio: "aspect-[3/4]",
    offset: "lg:mt-28",
  },
];

export function MemoryWall() {
  return (
    <section id="namuna" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="eyebrow text-gold">Namuna</span>
              <span className="h-px w-12 bg-gold/40" />
            </div>
            <h2 className="mt-7 font-serif text-[clamp(2.3rem,5vw,4rem)] font-light leading-[1.02] text-ivory">
              Bu saytni chiroyli qiladigan
              <span className="block italic text-ivory/55">sizning xotiralaringiz.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="max-w-sm lg:text-right">
            <p className="text-[14px] leading-relaxed text-ivory-dim/70">
              Dizayn — faqat ramka. Ichidagi har bir rasm, har bir video va har bir
              tabrik — sizning hikoyangiz. Shuning uchun ularni ehtiyotkorlik bilan
              joylashtiramiz.
            </p>
            <Link
              href="/v/11-a-2026"
              className="group mt-5 inline-flex items-center gap-2 text-[12.5px] text-gold transition-colors hover:text-[#ecd39c]"
            >
              11-A sinf vinetkasini ko‘rish
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          {SHOTS.map((shot, i) => (
            <Reveal
              key={shot.src}
              delay={i * 0.1}
              className={`${shot.span} ${shot.offset}`}
            >
              <figure className="group">
                <div
                  className={`relative overflow-hidden rounded-sm border border-white/10 bg-ink-2 ${shot.ratio}`}
                >
                  <Image
                    src={shot.src}
                    alt={shot.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/25 px-2.5 py-1 text-[8px] uppercase tracking-[0.24em] text-white/75 backdrop-blur-sm">
                    11-A · xotira 0{i + 1}
                  </span>
                </div>
                <figcaption className="mt-3.5 flex items-baseline justify-between gap-3">
                  <span className="font-serif text-lg text-ivory/90">{shot.title}</span>
                  <span className="text-right text-[10.5px] leading-snug text-ivory-dim/45">
                    {shot.caption}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
