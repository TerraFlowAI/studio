
import { Hero } from "@/components/landing/Hero";
import { TrustAndSocialProof } from "@/components/landing/TrustAndSocialProof";
import { FeatureShowcase } from "@/components/landing/FeatureShowcase";
import { ThreeStepProcess } from "@/components/landing/ThreeStepProcess";
import { CoreServicesGrid } from "@/components/landing/CoreServicesGrid";
import { RoiCalculator } from "@/components/landing/RoiCalculator";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { FaqSection } from "@/components/shared/FaqSection";

const landingPageFaqs = [
  {
    question: "What is TerraFlow in simple terms?",
    answer: "TerraFlow is an all-in-one AI Operating System for real estate professionals in India. It automates your most time-consuming tasks like lead follow-up, content creation, and market analysis, allowing you to close more deals faster."
  },
  {
    question: "Who is TerraFlow designed for?",
    answer: "Our platform is specifically built for individual real estate agents, growing brokerages, and property developers who want to leverage AI to gain a competitive edge, improve efficiency, and increase profitability."
  },
  {
    question: "Is my data secure with TerraFlow?",
    answer: "Absolutely. Data security is our highest priority. We use industry-leading encryption and security protocols, built on the robust Supabase platform. Our TerraSecure™ suite is dedicated to ensuring your transactions and documents are safe."
  },
  {
    question: "How is Terra, the AI Voice Agent, different from a normal chatbot?",
    answer: "Terra is a true autonomous agent. It doesn't just answer questions; it performs actions. Terra can make outbound phone calls to qualify leads, book appointments directly into your calendar, and execute complex workflows on your command, acting as a virtual team member."
  }
];


// This is the definitive homepage for the marketing site.
// It is wrapped by the layout in src/app/(marketing)/layout.tsx
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
      <FaqSection title="Frequently Asked Questions" faqs={landingPageFaqs} />
      <FinalCTA />
    </>
  );
}
