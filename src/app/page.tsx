
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/Logo";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Zap, Brain, BarChart3, CheckCircle, GitFork, TrendingUp, Bot, Settings2, CircleDollarSign, Briefcase, ShieldCheck, Camera, Sparkles, Users, LayoutDashboard, FileSignature, Calculator, SunMoon } from "lucide-react";

const featureTags = [
  { name: "AI-Powered Lead Generation", icon: Brain },
  { name: "Smart Market Analytics", icon: TrendingUp },
  { name: "Automated Workflows", icon: Settings2 },
];

const trustedByLogos = [
  "Avitech Homes",
  "Massive Dynamics",
  "Umbrella Estates",
  "ACME Realty",
  "Globox Properties",
  "Infinitel",
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-sky-100 dark:from-slate-900 dark:to-sky-950 text-slate-800 dark:text-slate-200">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo size="md" showIcon={false} />
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="#" className="flex items-center text-slate-700 hover:text-primary dark:text-slate-300 dark:hover:text-primary">Solutions <ChevronDown className="ml-1 h-4 w-4" /></Link>
            <Link href="#" className="flex items-center text-slate-700 hover:text-primary dark:text-slate-300 dark:hover:text-primary">Platform <ChevronDown className="ml-1 h-4 w-4" /></Link>
            <Link href="#" className="text-slate-700 hover:text-primary dark:text-slate-300 dark:hover:text-primary">Pricing</Link>
            <Link href="#" className="flex items-center text-slate-700 hover:text-primary dark:text-slate-300 dark:hover:text-primary">Resources <ChevronDown className="ml-1 h-4 w-4" /></Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" className="hidden sm:inline-flex text-primary hover:text-primary/90 hover:bg-primary/10" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white hidden sm:inline-flex">
              Request Free Demo
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary">
              <SunMoon className="h-5 w-5" />
              <span className="sr-only">Toggle Theme</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="py-16 md:py-24 lg:py-32 text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center bg-sky-100 dark:bg-sky-900/50 text-primary dark:text-sky-300 px-3 py-1 rounded-full text-sm font-medium mb-6">
              <Zap className="mr-2 h-4 w-4 text-green-500" />
              Powered by TerraFlow AI-Suit
              <span className="ml-2 h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              AI-Powered Real Estate is Here.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 dark:from-blue-500 dark:to-sky-300">
                Business on Auto-pilot
              </span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
              Elevate your real estate business with TerraFlow's AI automation. Engage
              leads 24/7, streamline marketing, and close more deals.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2">
              {featureTags.map((tag) => (
                <span key={tag.name} className="inline-flex items-center px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm">
                  <tag.icon className="mr-1.5 h-4 w-4 text-primary" />
                  {tag.name}
                </span>
              ))}
            </div>
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold text-base w-full sm:w-auto px-8 py-3">
                See TerraFlow in Action <ChevronDown className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-primary border-primary hover:bg-primary/5 hover:text-primary font-semibold text-base w-full sm:w-auto px-8 py-3">
                Book Free Strategic Call
              </Button>
            </div>
          </div>
        </section>

        {/* Product Showcase */}
        <section className="pb-16 md:pb-24 lg:pb-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
              <Image
                src="https://placehold.co/1200x750/E2E8F0/475569.png"
                alt="TerraFlowAI Dashboard Showcase"
                width={1200}
                height={750}
                className="w-full h-auto object-cover"
                data-ai-hint="dashboard product screenshot"
                priority
              />
              <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 p-2 bg-black/10 dark:bg-black/30 rounded-md backdrop-blur-sm">
                <span>AI Processing: Active &bull; Last Updated: Just now &bull; 103 Active Leads</span>
                <span>Real-time sync &bull; TerraFlow v2.3</span>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="py-16 bg-slate-100 dark:bg-slate-800/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center text-slate-600 dark:text-slate-400 mb-8">
              <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
              <h3 className="text-sm font-medium uppercase tracking-wider">Trusted by AI-forward real estate leaders</h3>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 md:gap-x-12 lg:gap-x-16">
              {trustedByLogos.map((name) => (
                <span key={name} className="text-slate-500 dark:text-slate-400 font-medium text-lg">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-200 dark:border-slate-700/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>&copy; {new Date().getFullYear()} TerraFlowAI. All rights reserved.</p>
          <p className="mt-1">Innovating the future of real estate, powered by AI.</p>
        </div>
      </footer>
    </div>
  );
}
