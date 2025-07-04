
"use client";

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import { LandingPageNavigation } from "@/components/layout/LandingPageNavigation";
import { Footer } from "@/components/layout/Footer";
import { TerraChatBubble } from "@/components/chatbot/TerraChatBubble";

// Lazy-loaded components to improve initial load time
const Hero = dynamic(
  () => import('@/components/landing/Hero').then(mod => mod.Hero),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-screen w-full bg-slate-50">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    ),
  }
);

const TrustAndSocialProof = dynamic(
  () => import('@/components/landing/TrustAndSocialProof').then(mod => mod.TrustAndSocialProof), 
  { ssr: false }
);

const FeatureShowcase = dynamic(
  () => import('@/components/landing/FeatureShowcase').then(mod => mod.FeatureShowcase), 
  { ssr: false }
);

const ThreeStepProcess = dynamic(
  () => import('@/components/landing/ThreeStepProcess').then(mod => mod.ThreeStepProcess), 
  { ssr: false }
);

const CoreServicesGrid = dynamic(
  () => import('@/components/landing/CoreServicesGrid').then(mod => mod.CoreServicesGrid), 
  { ssr: false }
);

const RoiCalculator = dynamic(
  () => import('@/components/landing/RoiCalculator').then(mod => mod.RoiCalculator),
  { ssr: false }
);

const TestimonialsSection = dynamic(
  () => import('@/components/landing/TestimonialsSection').then(mod => mod.TestimonialsSection), 
  { ssr: false }
);

const FaqSection = dynamic(
  () => import('@/components/shared/FaqSection').then(mod => mod.FaqSection), 
  { ssr: false }
);

const FinalCTA = dynamic(
  () => import('@/components/landing/FinalCTA').then(mod => mod.FinalCTA), 
  { ssr: false }
);

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


export default function MarketingHomePage() {
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
        <FaqSection title="Frequently Asked Questions" faqs={landingPageFaqs} />
        <FinalCTA />
      </main>
      <TerraChatBubble />
      <Footer />
    </div>
  );
}
