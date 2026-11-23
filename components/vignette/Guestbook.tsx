"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import type { Vignette, Wish } from "@/lib/types";
import { uid } from "@/lib/utils";
import { initials, SectionLabel } from "./shared";

const MONTHS = [
  "yanvar",
  "fevral",
  "mart",
  "aprel",
  "may",
  "iyun",
  "iyul",
  "avgust",
  "sentabr",
  "oktabr",
  "noyabr",
  "dekabr",
];

/** Deterministic date (no locale/ICU differences between server and browser). */
function formatDate(iso?: string) {
  if (!iso) return "";
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return "";
  const month = MONTHS[Number(m[2]) - 1];
  if (!month) return "";
  return `${Number(m[3])} ${month}, ${m[1]}`;
}

export function Guestbook({ v }: { v: Vignette }) {
  const [wishes, setWishes] = useState<Wish[]>(v.wishes);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const key = `vinetka:wishes:${v.slug}`;

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) {
        const stored = JSON.parse(raw) as Wish[];
        if (Array.isArray(stored)) setWishes([...stored, ...v.wishes]);
      }
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError("Ismingizni yozing.");
      return;
    }
    if (text.trim().length < 4) {
      setError("Tabrikingizni bir oz uzunroq yozing.");
      return;
    }

    const wish: Wish = {
      id: uid("w"),
      name: name.trim(),
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };

    const next = [wish, ...wishes];
    setWishes(next);
    setError("");
    setName("");
    setText("");
    setSaved(true);
    window.setTimeout(() => setSaved(false), 4500);

    try {
      const stored = next.filter((w) => w.id.startsWith("w-"));
      window.localStorage.setItem(key, JSON.stringify(stored));
    } catch {
      /* storage may be full — the wish is still visible on this visit */
    }
  };

  return (
    <section className="v-line border-t py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <SectionLabel count={`${wishes.length} tabrik`}>Mehmonlar kitobi</SectionLabel>
            <h2 className="mt-6 max-w-sm font-serif text-[clamp(2rem,4.2vw,3rem)] font-light leading-[1.05]">
              Bir og‘iz so‘z
              <span className="italic" style={{ color: "var(--v-accent)" }}>
                {" "}
                qoldiring.
              </span>
            </h2>
            <p
              className="mt-4 max-w-sm text-[12.5px] leading-relaxed"
              style={{ color: "var(--v-muted)" }}
            >
              Yillar o‘tib bu satrlarni o‘qigan odam sizni eslaydi. Sinfga,
              ustozga yoki do‘stingizga iliq so‘z yozing.
            </p>

            <form onSubmit={submit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="wish-name"
                  className="text-[9px] uppercase tracking-[0.22em]"
                  style={{ color: "var(--v-muted)" }}
                >
                  Ismingiz
                </label>
                <input
                  id="wish-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masalan: Dilnoza"
                  className="mt-2 w-full border-b bg-transparent pb-2.5 text-[14px] outline-none transition-colors placeholder:opacity-40"
                  style={{ borderColor: "var(--v-line)", color: "var(--v-ink)" }}
                />
              </div>
              <div>
                <label
                  htmlFor="wish-text"
                  className="text-[9px] uppercase tracking-[0.22em]"
                  style={{ color: "var(--v-muted)" }}
                >
                  Tabrikingiz
                </label>
                <textarea
                  id="wish-text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={3}
                  placeholder="Yaxshi so‘zlaringizni yozing..."
                  className="mt-2 w-full resize-none border-b bg-transparent pb-2.5 text-[14px] leading-relaxed outline-none transition-colors placeholder:opacity-40"
                  style={{ borderColor: "var(--v-line)", color: "var(--v-ink)" }}
                />
              </div>

              {error && (
                <p className="text-[11px]" style={{ color: "var(--v-accent)" }}>
                  {error}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  className="v-btn group inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-[12px] font-semibold transition-all duration-300 hover:opacity-90"
                >
                  Tabrik qoldirish
                  <Send className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
                <AnimatePresence>
                  {saved && (
                    <motion.span
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="inline-flex items-center gap-1.5 text-[11px]"
                      style={{ color: "var(--v-muted)" }}
                    >
                      <Check className="size-3.5" /> Rahmat, qo‘shildi
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              <p
                className="text-[10px] leading-relaxed"
                style={{ color: "var(--v-muted)", opacity: 0.55 }}
              >
                Namuna rejimi: tabriklar shu brauzerda saqlanadi. To‘liq versiyada
                ular serverga yoziladi va hamma ko‘radi.
              </p>
            </form>
          </div>
        </Reveal>

        <div className="v-line border-t lg:border-t-0">
          <AnimatePresence initial={false}>
            {wishes.map((w, i) => (
              <motion.article
                key={w.id}
                layout
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: Math.min(i, 4) * 0.04 }}
                className="v-line border-b py-6"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className="grid size-9 shrink-0 place-items-center rounded-full border"
                    style={{ borderColor: "var(--v-line)" }}
                  >
                    <span
                      className="font-serif text-[13px]"
                      style={{ color: "var(--v-accent)" }}
                    >
                      {initials(w.name)}
                    </span>
                  </div>
                  <div className="flex flex-1 items-baseline justify-between gap-3">
                    <p className="text-[12.5px] font-medium" style={{ color: "var(--v-ink)" }}>
                      {w.name}
                    </p>
                    <span
                      className="text-[9px] uppercase tracking-[0.16em]"
                      style={{ color: "var(--v-muted)", opacity: 0.55 }}
                    >
                      {formatDate(w.createdAt)}
                    </span>
                  </div>
                </div>
                <p
                  className="mt-3 pl-[50px] font-serif text-[16px] font-normal italic leading-relaxed sm:text-[17px]"
                  style={{ color: "var(--v-ink)", opacity: 0.78 }}
                >
                  “{w.text}”
                </p>
              </motion.article>
            ))}
          </AnimatePresence>

          {!wishes.length && (
            <p
              className="py-10 text-center text-[12px]"
              style={{ color: "var(--v-muted)" }}
            >
              Hali tabrik yo‘q. Birinchi bo‘ling.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
