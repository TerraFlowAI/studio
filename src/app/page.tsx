
import { LandingPageNavigation } from "@/components/layout/LandingPageNavigation";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { CoreServicesGrid } from "@/components/landing/CoreServicesGrid";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import RoiCalculator from "@/components/landing/RoiCalculator";
import { TrustAndSocialProof } from "@/components/landing/TrustAndSocialProof";
import { ThreeStepProcess } from "@/components/landing/ThreeStepProcess";
import { FeatureShowcase } from "@/components/landing/FeatureShowcase";
import { TerraChatBubble } from "@/components/chatbot/TerraChatBubble";

export default function RootPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <LandingPageNavigation />
      <main className="flex-grow pt-16">
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
