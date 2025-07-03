
import { Hero } from "@/components/landing/Hero";
import { CoreServicesGrid } from "@/components/landing/CoreServicesGrid";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import RoiCalculator from "@/components/landing/RoiCalculator";
import { TrustAndSocialProof } from "@/components/landing/TrustAndSocialProof";
import { ThreeStepProcess } from "@/components/landing/ThreeStepProcess";
import { FeatureShowcase } from "@/components/landing/FeatureShowcase";

export default function LandingPage() {
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
