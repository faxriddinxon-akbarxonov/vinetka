import type { Vignette } from "./types";
import { THEMES } from "./themes";

/** Normalise JSON so the UI never crashes on a half-filled client file. */
export function normalizeVignette(input: Partial<Vignette>): Vignette {
  const theme = input.theme && input.theme in THEMES ? input.theme : "oltin";
  return {
    slug: input.slug ?? "namuna",
    theme,
    school: input.school?.trim() || "Maktab",
    overline: input.overline,
    className: input.className?.trim() || "Sinf",
    graduationYear: input.graduationYear ?? new Date().getFullYear(),
    motto: input.motto,
    coverImage: input.coverImage || "/images/cover-graduation.jpg",
    coverPosition: input.coverPosition || "center 50%",
    audioUrl: input.audioUrl,
    letter: input.letter?.text ? input.letter : undefined,
    graduates: (input.graduates ?? []).filter((p) => p?.name?.trim()),
    teachers: (input.teachers ?? []).filter((p) => p?.name?.trim()),
    memories: (input.memories ?? []).filter((m) => m?.src?.trim()),
    timeline: (input.timeline ?? []).filter((t) => t?.title?.trim()),
    wishes: (input.wishes ?? []).filter((w) => w?.text?.trim()),
    closing: input.closing,
    contact: input.contact,
  };
}
