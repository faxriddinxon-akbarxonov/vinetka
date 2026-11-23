import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  href = "/",
  label = true,
}: {
  className?: string;
  href?: string;
  label?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn("group flex items-center gap-3", className)}
      aria-label="Vinetka — bosh sahifa"
    >
      <span className="relative grid size-9 place-items-center rounded-full border border-gold/40 transition-colors duration-500 group-hover:border-gold">
        <span className="font-serif text-[19px] leading-none text-gold">V</span>
        <span className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-gold shadow-[0_0_10px_2px_rgba(217,185,123,0.5)]" />
      </span>
      {label && (
        <span className="flex flex-col leading-none">
          <span className="font-serif text-[20px] tracking-[0.16em] text-ivory">
            VINETKA
          </span>
          <span className="mt-1 text-[8px] font-medium uppercase tracking-[0.32em] text-ivory-dim/60">
            xotira sahifasi
          </span>
        </span>
      )}
    </Link>
  );
}
