import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/shared/Logo";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-background flex flex-col items-center justify-center p-4">
      <header className="absolute top-0 left-0 p-6">
        <Logo size="lg" />
      </header>
      
      <main className="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-16 max-w-6xl w-full">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
            Revolutionize Your Real Estate Business with TerraFlowAI
          </h1>
          <p className="text-lg text-foreground/80 mb-8">
            Leverage the power of AI to streamline operations, enhance client engagement, and maximize profitability. TerraFlowAI is your all-in-one platform for intelligent real estate solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/login">Login to Your Account</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5 hover:text-primary">
              <Link href="/register">Create an Account</Link>
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <Card className="shadow-2xl overflow-hidden rounded-xl">
            <Image 
              src="https://placehold.co/600x400.png" 
              alt="TerraFlowAI Platform Showcase" 
              width={600} 
              height={400}
              className="w-full h-auto object-cover"
              data-ai-hint="real estate technology"
            />
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Experience the Future of Real Estate</CardTitle>
              <CardDescription>Intelligent tools. Seamless workflows. Unparalleled results.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-foreground/70 list-disc list-inside">
                <li>AI-Powered Property Valuation &amp; Market Analytics</li>
                <li>Automated Lead Management &amp; Engagement</li>
                <li>Dynamic Pricing &amp; Personalized Recommendations</li>
                <li>Streamlined Compliance &amp; Document Automation</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="mt-16 text-center text-foreground/60 text-sm">
        <p>&copy; {new Date().getFullYear()} TerraFlowAI. All rights reserved.</p>
        <p className="mt-1">Innovating the future of real estate, powered by AI.</p>
      </footer>
    </div>
  );
}
