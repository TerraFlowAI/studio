
import { Hero } from "@/components/landing/Hero";
import { TrustAndSocialProof } from "@/components/landing/TrustAndSocialProof";
import { FeatureShowcase } from "@/components/landing/FeatureShowcase";
import { ThreeStepProcess } from "@/components/landing/ThreeStepProcess";
import { CoreServicesGrid } from "@/components/landing/CoreServicesGrid";
import RoiCalculator from "@/components/landing/RoiCalculator";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { FinalCTA } from "@/components/landing/FinalCTA";

// This is the definitive homepage for the application.
// It is automatically wrapped by the layout in src/app/(marketing)/layout.tsx
export default function MarketingHomePage() {
  return (
    <>
      <Hero />
      <TrustAndSocialProof />
      <FeatureShowcase />
      <ThreeStepProcess />
      <CoreServicesGrid />
      <RoiCalculator />
      <TestimonialsSection />
      <FinalCTA />
    </>
  );
}
