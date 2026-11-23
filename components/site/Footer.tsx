import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { SITE } from "@/lib/site";

const COLS = [
  {
    title: "Mahsulot",
    links: [
      { label: "Namuna · Oltin kun", href: "/v/11-a-2026" },
      { label: "Namuna · Yulduzlar", href: "/v/9-b-2025" },
      { label: "Dizaynlar", href: "/#dizayn" },
      { label: "Narxlar", href: "/#narxlar" },
      { label: "Savollar", href: "/#savollar" },
    ],
  },
  {
    title: "Vinetka",
    links: [
      { label: "Vinetka yaratish", href: "/yaratish" },
      { label: "Maktablar uchun", href: "/#narxlar" },
      { label: "Biz haqimizda", href: "/#nega" },
      { label: "Aloqa", href: "/#savollar" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-[12.5px] leading-relaxed text-ivory-dim/45">
              Maktab bitiruvchilari uchun onlayn xotira sahifalari. Har bir sinf —
              alohida hikoya, har bir hikoya — abadiy qoladi.
            </p>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h3 className="text-[9.5px] font-semibold uppercase tracking-[0.24em] text-ivory-dim/35">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[12.5px] text-ivory-dim/65 transition-colors hover:text-ivory"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-[9.5px] font-semibold uppercase tracking-[0.24em] text-ivory-dim/35">
              Aloqa
            </h3>
            <ul className="mt-4 space-y-2.5 text-[12.5px] text-ivory-dim/65">
              <li>
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="hover:text-ivory">
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={SITE.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-ivory"
                >
                  Telegram: @vinetka
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="hover:text-ivory">
                  {SITE.email}
                </a>
              </li>
              <li className="text-ivory-dim/40">{SITE.city}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-[10.5px] text-ivory-dim/30">
            © {new Date().getFullYear()} Vinetka. Barcha xotiralar o‘z egalarida qoladi.
          </p>
          <p className="text-[10.5px] text-ivory-dim/30">
            Dizayn va mantiq — <span className="text-gold/60">Vinetka shabloni</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
