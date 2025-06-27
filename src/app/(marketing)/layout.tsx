
import { LandingPageNavigation } from "@/components/layout/LandingPageNavigation";
import { Footer } from "@/components/layout/Footer";
import { TerraChatBubble } from "@/components/chatbot/TerraChatBubble";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <LandingPageNavigation />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <TerraChatBubble />
      <Footer />
    </div>
  );
}
