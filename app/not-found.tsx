import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="grain relative grid min-h-screen place-items-center overflow-hidden px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,185,123,0.09),transparent_60%)]" />
      <div className="relative z-10 max-w-lg text-center">
        <p className="font-serif text-[clamp(4rem,14vw,9rem)] font-light leading-none text-gold/25">
          404
        </p>
        <h1 className="mt-2 font-serif text-4xl font-light text-ivory">
          Bu sahifa topilmadi.
        </h1>
        <p className="mt-4 text-[13px] leading-relaxed text-ivory-dim/55">
          Balki vinetka hali nashr qilinmagan, yoki havola o‘zgargan. Sinfingiz
          hikoyasini noldan boshlash hech qachon kech emas.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-[12px] font-semibold text-ink transition-colors hover:bg-[#ecd39c]"
          >
            <ArrowLeft className="size-3.5" /> Bosh sahifa
          </Link>
          <Link
            href="/yaratish"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[12px] text-ivory transition-colors hover:border-gold/50"
          >
            Vinetka yaratish
          </Link>
        </div>
      </div>
    </main>
  );
}
