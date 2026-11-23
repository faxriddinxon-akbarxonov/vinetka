import type { Metadata } from "next";
import { PreviewClient } from "@/components/vignette/PreviewClient";

export const metadata: Metadata = {
  title: "Ko‘rish rejimi",
  robots: { index: false, follow: false },
};

export default function PreviewPage() {
  return <PreviewClient />;
}
