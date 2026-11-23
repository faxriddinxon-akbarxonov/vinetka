import demoRaw from "@/content/vignettes/11-a-2026.json";
import { normalizeVignette } from "./normalize";
import type { Vignette } from "./types";

export const DRAFT_KEY = "vinetka:draft:v1";

export function demoDraft(): Vignette {
  return normalizeVignette(demoRaw as unknown as Partial<Vignette>);
}

export function emptyDraft(): Vignette {
  return normalizeVignette({
    slug: "yangi-vinetka",
    theme: "oltin",
    school: "",
    className: "",
    graduationYear: new Date().getFullYear() + 1,
    motto: "",
    coverImage: "/images/cover-graduation.jpg",
    coverPosition: "center 45%",
    graduates: [],
    teachers: [],
    memories: [],
    timeline: [],
    wishes: [],
  });
}

export function loadDraft(): Vignette | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    return normalizeVignette(JSON.parse(raw) as Partial<Vignette>);
  } catch {
    return null;
  }
}

export type SaveResult = { ok: true } | { ok: false; error: string };

export function saveDraft(draft: Vignette): SaveResult {
  try {
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    return { ok: true };
  } catch {
    return {
      ok: false,
      error:
        "Xotira to‘ldi. Yuklangan rasmlar juda katta — ularni havola (URL) bilan qo‘shib ko‘ring.",
    };
  }
}

export function clearDraft() {
  try {
    window.localStorage.removeItem(DRAFT_KEY);
  } catch {
    /* ignore */
  }
}

/**
 * Resize + re-encode a photo in the browser before it is stored.
 * A 4 MB phone photo usually becomes ~250 KB, which keeps localStorage usable.
 */
export async function compressImage(
  file: File,
  maxWidth = 1600,
  quality = 0.82,
): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Faqat rasm fayllarini yuklash mumkin.");
  }
  if (file.size > 12 * 1024 * 1024) {
    throw new Error("Rasm 12 MB dan katta. Iltimos, kichikroq rasm tanlang.");
  }

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxWidth / bitmap.width);
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Brauzer rasmni qayta ishlay olmadi.");
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close?.();

  let dataUrl = canvas.toDataURL("image/jpeg", quality);
  // Still heavy? step the quality down once.
  if (dataUrl.length > 1_100_000) {
    dataUrl = canvas.toDataURL("image/jpeg", 0.65);
  }
  return dataUrl;
}
