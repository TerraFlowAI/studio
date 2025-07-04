
import { LandingPageNavigation } from "@/components/layout/LandingPageNavigation";
import { Footer } from "@/components/layout/Footer";
import { TerraChatBubble } from "@/components/chatbot/TerraChatBubble";
import { Hero } from "@/components/landing/Hero";
import { TrustAndSocialProof } from "@/components/landing/TrustAndSocialProof";
import { FeatureShowcase } from "@/components/landing/FeatureShowcase";
import { ThreeStepProcess } from "@/components/landing/ThreeStepProcess";
import { CoreServicesGrid } from "@/components/landing/CoreServicesGrid";
import { RoiCalculator } from "@/components/landing/RoiCalculator";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { FinalCTA } from "@/components/landing/FinalCTA";

// This is the definitive homepage for the application.
// It includes the marketing layout directly to avoid routing conflicts.
export default function HomePage() {
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
