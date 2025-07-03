
import { Hero } from "@/components/landing/Hero";
import { TrustAndSocialProof } from "@/components/landing/TrustAndSocialProof";
import { FeatureShowcase } from "@/components/landing/FeatureShowcase";
import { ThreeStepProcess } from "@/components/landing/ThreeStepProcess";
import { CoreServicesGrid } from "@/components/landing/CoreServicesGrid";
import RoiCalculator from "@/components/landing/RoiCalculator";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { LandingPageNavigation } from "@/components/layout/LandingPageNavigation";
import { Footer } from "@/components/layout/Footer";
import { TerraChatBubble } from "@/components/chatbot/TerraChatBubble";

// This is the definitive homepage for the application.
// It explicitly uses the marketing layout components to avoid routing conflicts.
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
