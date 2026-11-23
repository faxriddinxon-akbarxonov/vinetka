import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Tiny id generator that works in browser and during SSR. */
export function uid(prefix = "id") {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

/** 1200 -> "1 200" (Uzbek style thin grouping). */
export function formatSom(value: number) {
  return new Intl.NumberFormat("uz-UZ").format(value);
}

/** Extract a YouTube / Vimeo id so we can build an embed url. */
export function toEmbedUrl(url: string): string | null {
  if (!url) return null;

  const yt =
    url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{6,})/) ??
    url.match(/^([\w-]{11})$/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}?rel=0&modestbranding=1`;

  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;

  return null;
}

export function isVideoUrl(url: string) {
  return Boolean(toEmbedUrl(url)) || /\.(mp4|webm|mov|m4v)(\?|$)/i.test(url);
}

/** data:/blob: images must skip the Next.js optimizer. */
export function isInlineImage(src?: string) {
  return Boolean(src && (src.startsWith("data:") || src.startsWith("blob:")));
}
