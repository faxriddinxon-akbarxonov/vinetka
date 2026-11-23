"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect } from "react";
import type { Memory } from "@/lib/types";
import { isInlineImage, toEmbedUrl } from "@/lib/utils";

export function Lightbox({
  memories,
  index,
  onClose,
  onIndex,
}: {
  memories: Memory[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const open = index !== null;
  const memory = open ? memories[index] : null;

  const step = useCallback(
    (dir: number) => {
      if (index === null) return;
      const next = (index + dir + memories.length) % memories.length;
      onIndex(next);
    },
    [index, memories.length, onIndex],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.classList.add("no-scroll");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("no-scroll");
    };
  }, [open, onClose, step]);

  const embed = memory?.type === "video" ? toEmbedUrl(memory.src) : null;

  return (
    <AnimatePresence>
      {open && memory && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={memory.title || "Xotira"}
        >
          <div className="flex items-center justify-between px-4 py-4 sm:px-6">
            <span className="text-[10px] uppercase tracking-[0.24em] text-white/45">
              {(index ?? 0) + 1} / {memories.length}
            </span>
            <button
              onClick={onClose}
              className="grid size-10 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
              aria-label="Yopish"
            >
              <X className="size-4" />
            </button>
          </div>

          <div
            className="flex flex-1 items-center justify-center px-4 pb-4"
            onClick={(e) => e.stopPropagation()}
          >
            {memories.length > 1 && (
              <button
                onClick={() => step(-1)}
                className="mr-2 hidden size-11 shrink-0 place-items-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/40 hover:text-white sm:grid"
                aria-label="Oldingi"
              >
                <ChevronLeft className="size-5" />
              </button>
            )}

            <div className="relative w-full max-w-5xl">
              {memory.type === "photo" ? (
                <div className="relative mx-auto aspect-[3/2] w-full max-h-[70vh] overflow-hidden rounded-sm">
                  <Image
                    src={memory.src}
                    alt={memory.title || "Xotira"}
                    fill
                    unoptimized={isInlineImage(memory.src)}
                    sizes="90vw"
                    className="object-contain"
                  />
                </div>
              ) : embed ? (
                <div className="relative mx-auto aspect-video w-full overflow-hidden rounded-sm bg-black">
                  <iframe
                    src={embed}
                    title={memory.title || "Video"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 size-full"
                  />
                </div>
              ) : (
                <video
                  src={memory.src}
                  poster={memory.poster}
                  controls
                  autoPlay
                  playsInline
                  className="mx-auto max-h-[70vh] w-full rounded-sm"
                />
              )}

              <div className="mx-auto mt-4 max-w-2xl text-center">
                {memory.title && (
                  <p className="font-serif text-xl text-white/95">{memory.title}</p>
                )}
                {memory.caption && (
                  <p className="mt-1 text-[12.5px] leading-relaxed text-white/50">
                    {memory.caption}
                  </p>
                )}
              </div>
            </div>

            {memories.length > 1 && (
              <button
                onClick={() => step(1)}
                className="ml-2 hidden size-11 shrink-0 place-items-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/40 hover:text-white sm:grid"
                aria-label="Keyingi"
              >
                <ChevronRight className="size-5" />
              </button>
            )}
          </div>

          {memories.length > 1 && (
            <div className="flex items-center justify-center gap-2 px-4 pb-5 sm:hidden">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                className="rounded-full border border-white/15 px-4 py-2 text-[11px] text-white/70"
              >
                Oldingi
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                className="rounded-full border border-white/15 px-4 py-2 text-[11px] text-white/70"
              >
                Keyingi
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
