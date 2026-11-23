const WORDS = [
  "11-A · 2026",
  "Navoiy maktabi",
  "14 bitiruvchi",
  "4 ustoz",
  "Birinchi qo‘ng‘iroq",
  "Oxirgi qo‘ng‘iroq",
  "Abadiy xotira",
];

export function Marquee() {
  const items = [...WORDS, ...WORDS];

  return (
    <div className="relative border-y border-white/10 bg-ink-2 py-5">
      <div className="marquee-mask overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap px-6">
          {[...items, ...items].map((word, i) => (
            <span key={`${word}-${i}`} className="flex items-center gap-10">
              <span className="font-serif text-lg tracking-wide text-ivory/70 sm:text-xl">
                {word}
              </span>
              <span className="size-1 rotate-45 bg-gold/60" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
