
import { Hero } from "@/components/landing/Hero";
import { CoreServicesGrid } from "@/components/landing/CoreServicesGrid";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/layout/Footer";
import { Inter } from 'next/font/google';
import { cn } from "@/lib/utils";
import RoiCalculator from "@/components/landing/RoiCalculator";
import { TrustAndSocialProof } from "@/components/landing/TrustAndSocialProof";
import { ThreeStepProcess } from "@/components/landing/ThreeStepProcess";
import dynamic from 'next/dynamic';
import { TerraChatBubble } from "@/components/chatbot/TerraChatBubble";
import { FeatureShowcase } from "@/components/landing/FeatureShowcase";

const LandingPageNavigation = dynamic(() =>
  import('@/components/layout/LandingPageNavigation').then(mod => mod.LandingPageNavigation)
);

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function LandingPage() {
  return (
    <div className={cn("bg-background text-foreground selection:bg-teal-500/30", inter.variable)}>
      <LandingPageNavigation />
      <main>
        <Hero />
        <TrustAndSocialProof />
        <FeatureShowcase />
        <ThreeStepProcess />
        <CoreServicesGrid />
        <RoiCalculator />
        <TestimonialsSection />
        <FinalCTA />
      </main>
      <TerraChatBubble />
      <Footer />
    </div>
  );
}
