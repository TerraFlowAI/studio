// src/app/page.tsx
import { LandingPageNavigation } from '@/components/layout/LandingPageNavigation';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { WaitlistSection } from '@/components/landing/WaitlistSection';
import { ContactSection } from '@/components/landing/ContactSection';
import { Footer } from '@/components/layout/Footer';

export default function LandingPage() {
  return (
    <div className="bg-background text-foreground">
      <LandingPageNavigation />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <WaitlistSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
