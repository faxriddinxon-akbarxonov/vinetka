import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VignetteView } from "@/components/vignette/VignetteView";
import { getVignette, listVignettes } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const items = await listVignettes();
  return items.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const v = await getVignette(slug);
  if (!v) return { title: "Vinetka topilmadi" };

  const title = `${v.className} · ${v.graduationYear}`;
  const description =
    v.motto ||
    `${v.school} ${v.className} bitiruvchilarining onlayn xotira sahifasi.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: v.coverImage }],
      type: "article",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function VignettePage({ params }: Params) {
  const { slug } = await params;
  const v = await getVignette(slug);
  if (!v) notFound();

  return <VignetteView v={v} />;
}
