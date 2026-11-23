"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Share2 } from "lucide-react";
import type { CSSProperties } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function ShareButton({
  title,
  text,
  className,
  label = "Ulashish",
  style,
}: {
  title: string;
  text?: string;
  className?: string;
  label?: string;
  style?: CSSProperties;
}) {
  const [done, setDone] = useState(false);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setDone(true);
      window.setTimeout(() => setDone(false), 2200);
    } catch {
      /* user cancelled */
    }
  };

  return (
    <button
      onClick={share}
      style={style}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] transition-colors duration-300",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.span
            key="check"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="inline-flex items-center gap-2"
          >
            <Check className="size-3.5" /> Nusxalandi
          </motion.span>
        ) : (
          <motion.span
            key="share"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="inline-flex items-center gap-2"
          >
            <Share2 className="size-3.5" /> {label}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
