import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/v/preview"] }],
    sitemap: "https://vinetka.uz/sitemap.xml",
  };
}
