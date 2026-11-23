import type { MetadataRoute } from "next";
import { listVignettes } from "@/lib/content";

const BASE = "https://vinetka.uz";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const vignettes = await listVignettes();

  return [
    { url: BASE, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/yaratish`, changeFrequency: "monthly", priority: 0.8 },
    ...vignettes.map((v) => ({
      url: `${BASE}/v/${v.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
