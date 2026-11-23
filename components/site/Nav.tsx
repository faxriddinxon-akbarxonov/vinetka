"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/#namuna", label: "Namuna" },
  { href: "/#dizayn", label: "Dizaynlar" },
  { href: "/#qanday", label: "Qanday ishlaydi" },
  { href: "/#narxlar", label: "Narxlar" },
  { href: "/#savollar", label: "Savollar" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", open);
    return () => document.body.classList.remove("no-scroll");
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-white/10 bg-ink/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <Logo />

          <nav className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[12.5px] tracking-wide text-ivory-dim/80 transition-colors hover:text-ivory"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/v/11-a-2026"
              className="hidden items-center gap-1.5 text-[12.5px] text-ivory-dim/80 transition-colors hover:text-ivory sm:flex"
            >
              Namunani ko‘rish
              <ArrowUpRight className="size-3.5" />
            </Link>
            <Link
              href="/yaratish"
              className="hidden rounded-full bg-gold px-5 py-2.5 text-[12px] font-semibold tracking-wide text-ink transition-all duration-300 hover:bg-[#e8cd94] hover:shadow-[0_0_28px_rgba(217,185,123,0.35)] sm:block"
            >
              Vinetka yaratish
            </Link>
            <button
              onClick={() => setOpen(true)}
              className="grid size-10 place-items-center rounded-full border border-white/15 text-ivory lg:hidden"
              aria-label="Menyuni ochish"
            >
              <Menu className="size-4" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-ink/97 backdrop-blur-xl lg:hidden"
          >
            <div className="flex h-[74px] items-center justify-between px-5">
              <Logo />
              <button
                onClick={() => setOpen(false)}
                className="grid size-10 place-items-center rounded-full border border-white/15"
                aria-label="Menyuni yopish"
              >
                <X className="size-4" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 px-6 pt-10">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.5 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/10 py-4 font-serif text-3xl text-ivory"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/yaratish"
                onClick={() => setOpen(false)}
                className="mt-8 rounded-full bg-gold px-6 py-4 text-center text-sm font-semibold text-ink"
              >
                Vinetka yaratish
              </Link>
              <Link
                href="/v/11-a-2026"
                onClick={() => setOpen(false)}
                className="mt-3 rounded-full border border-white/20 px-6 py-4 text-center text-sm text-ivory"
              >
                Namunani ko‘rish
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
