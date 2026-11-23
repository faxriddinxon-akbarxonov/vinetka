"use client";

import { Pencil } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { demoDraft, loadDraft } from "@/lib/draft";
import type { Vignette } from "@/lib/types";
import { VignetteView } from "./VignetteView";

export function PreviewClient() {
  const [vignette, setVignette] = useState<Vignette | null>(null);

  useEffect(() => {
    setVignette(loadDraft() ?? demoDraft());
  }, []);

  if (!vignette) {
    return (
      <div className="grid min-h-screen place-items-center bg-ink">
        <span className="text-[11px] uppercase tracking-[0.3em] text-ivory-dim/40">
          yuklanmoqda…
        </span>
      </div>
    );
  }

  return (
    <>
      <VignetteView v={vignette} />
      <Link
        href="/yaratish"
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-ink/85 px-4 py-2.5 text-[10.5px] uppercase tracking-[0.15em] text-gold shadow-lg backdrop-blur-md transition-colors hover:bg-gold hover:text-ink"
      >
        <Pencil className="size-3" />
        Tahrirlash
      </Link>
    </>
  );
}
