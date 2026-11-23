"use client";

import { useEffect } from "react";
import { themeStyle } from "@/lib/themes";
import type { Vignette } from "@/lib/types";
import { Closing } from "./Closing";
import { Cover } from "./Cover";
import { Graduates } from "./Graduates";
import { Guestbook } from "./Guestbook";
import { Letter } from "./Letter";
import { Memories } from "./Memories";
import { Teachers } from "./Teachers";
import { Timeline } from "./Timeline";
import { VignetteBar } from "./VignetteBar";

export function VignetteView({ v }: { v: Vignette }) {
  const style = themeStyle(v.theme);

  useEffect(() => {
    const bg = (style as Record<string, string>)["--v-bg"];
    const prev = document.body.style.backgroundColor;
    if (bg) document.body.style.backgroundColor = bg;
    return () => {
      document.body.style.backgroundColor = prev;
    };
  }, [style]);

  return (
    <div className="vignette min-h-screen" style={style}>
      <VignetteBar v={v} />
      <main>
        <Cover v={v} />
        <Letter v={v} />
        <Graduates v={v} />
        <Teachers v={v} />
        <Memories v={v} />
        <Timeline v={v} />
        <Guestbook v={v} />
        <Closing v={v} />
      </main>
    </div>
  );
}
