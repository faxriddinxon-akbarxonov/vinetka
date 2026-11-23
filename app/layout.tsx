import type { Metadata } from "next";
import "@fontsource/cormorant-garamond/300.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/300-italic.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/manrope/300.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Vinetka — maktab xotiralarini abadiy saqlaydigan onlayn vinetka",
    template: "%s · Vinetka",
  },
  description:
    "Bitiruvchilar uchun onlayn vinetka: sinf rasmlari, ustozlar, video va yillar davomida yig‘ilgan xotiralar bitta chiroyli havolada.",
  keywords: [
    "vinetka",
    "onlayn vinetka",
    "maktab bitiruvchilari",
    "bitiruv 2026",
    "sinf albomi",
    "xotira sayti",
  ],
  openGraph: {
    title: "Vinetka — sinfingiz bir umrga bitta havolada",
    description:
      "Maktab bitiruvchilari uchun onlayn xotira sahifasi. Rasm, video, ustozlar va yillar — bitta chiroyli vinetkada.",
    images: ["/images/cover-graduation.jpg"],
    type: "website",
    locale: "uz_UZ",
  },
  metadataBase: new URL("https://vinetka.uz"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  );
}
