import { ClosingCta } from "@/components/site/ClosingCta";
import { Faq } from "@/components/site/Faq";
import { Features } from "@/components/site/Features";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Marquee } from "@/components/site/Marquee";
import { MemoryWall } from "@/components/site/MemoryWall";
import { Nav } from "@/components/site/Nav";
import { Pricing } from "@/components/site/Pricing";
import { QuoteBand } from "@/components/site/QuoteBand";
import { ThemeShowcase } from "@/components/site/ThemeShowcase";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <MemoryWall />
        <ThemeShowcase />
        <Features />
        <HowItWorks />
        <QuoteBand />
        <Pricing />
        <Faq />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
