import { promises as fs } from "fs";
import path from "path";
import type { Vignette } from "./types";
import { normalizeVignette } from "./normalize";

export { normalizeVignette };

const DIR = path.join(process.cwd(), "content", "vignettes");

const SLUG_RE = /^[a-z0-9-]+$/;

export async function getVignette(slug: string): Promise<Vignette | null> {
  if (!SLUG_RE.test(slug)) return null;
  try {
    const raw = await fs.readFile(path.join(DIR, `${slug}.json`), "utf8");
    return normalizeVignette(JSON.parse(raw) as Partial<Vignette>);
  } catch {
    return null;
  }
}

export async function listVignettes(): Promise<Vignette[]> {
  try {
    const files = await fs.readdir(DIR);
    const items = await Promise.all(
      files
        .filter((f) => f.endsWith(".json"))
        .map((f) => getVignette(f.replace(/\.json$/, ""))),
    );
    return items.filter((v): v is Vignette => Boolean(v));
  } catch {
    return [];
  }
}
