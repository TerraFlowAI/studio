
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Bot, BarChart3, PenSquare, ShieldCheck, Target, Phone, CalendarCheck2, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from 'next/link';

// --- NEW VISUAL COMPONENT FOR TERRALEAD ---
const TerraLeadVisual = () => {
  // To use a video, first create a 'videos' folder inside your 'public' directory.
  // Then, place your video file (e.g., 'terralead-showcase.mp4') inside 'public/videos'.
  // The 'src' attribute below will then correctly point to your video.
  return (
    <div className="relative w-full aspect-video bg-slate-900 rounded-2xl p-0 flex items-center justify-center overflow-hidden shadow-2xl border border-slate-800">
      <video
        key="/videos/terralead-showcase.mp4" // Adding a key helps React replace the element if the src changes
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/terralead-showcase.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
    </div>
  );
};


// Data structure for feature blocks
const featureBlocks = [
  {
    suiteName: "TerraLead™ Suite",
    headline: "Deploy Your 24/7 AI Sales Agent.",
    description: "Stop chasing cold inquiries. Our autonomous voice agent, Terra, proactively calls every new lead within minutes, qualifies their interest, and books confirmed appointments directly into your calendar. This isn't just lead management; it's your sales pipeline on autopilot.",
    checklist: [
      { text: "Autonomous AI Cold Calling", bold: true },
      { text: "AI-Powered Lead Scoring", bold: false },
      { text: "Automated Appointment Setting", bold: false },
      { text: "24/7 Chatbot Qualification", bold: false },
    ],
    metrics: ["100% Lead Engagement Rate", "95% Less Manual Work"],
    cta: "Launch Your AI Sales Agent",
    layout: "text-left",
    visual: <TerraLeadVisual />,
    href: "/leads",
  },
  {
    suiteName: "TerraValuate™ & MarketIntel™",
    headline: "Make Data-Driven Decisions with Unbeatable Market Insights.",
    description: "Go beyond guesswork. Leverage our powerful analytics engine for precise, real-time property valuations and predictive market forecasts that give you a decisive competitive edge in any negotiation.",
    checklist: [
      { text: "AI-Powered Property Valuation (AVM)", bold: false },
      { text: "Predictive Market Analytics", bold: false },
      { text: "Dynamic Pricing Optimization", bold: false },
      { text: "Compelling CMA Reports", bold: false },
    ],
    metrics: ["99% Valuation Accuracy", "50k+ Properties Analyzed"],
    cta: "Discover Valuation Tools",
    layout: "text-right",
    image: {
      src: "https://placehold.co/600x450.png",
      alt: "Market intelligence dashboard showing charts and map data",
      hint: "data analytics map"
    },
    href: "/terravaluate",
  },
  {
    suiteName: "TerraScribe™ & TerraVision™",
    headline: "Generate Professional Content & Showcase Properties in VR.",
    description: "Reclaim hours of your time. Instantly create compelling marketing copy, social media posts, and even RERA-compliant legal documents. Then, captivate buyers with integrated, immersive 3D/VR tours.",
    checklist: [
      { text: "AI Marketing Copywriting", bold: false },
      { text: "Automated RERA Document Generation", bold: false },
      { text: "Virtual & Augmented Reality Tours", bold: false },
      { text: "Multi-channel Content Distribution", bold: false },
    ],
    metrics: ["10x Faster Content Creation", "100% RERA-Ready Docs"],
    cta: "Explore Content Automation",
    layout: "text-left",
    image: {
      src: "https://placehold.co/600x450.png",
      alt: "Split screen showing a compliant document and a user in a VR tour",
      hint: "document verification VR"
    },
    href: "/scribe",
  },
  {
    suiteName: "TerraSmartFlow™ & TerraSecure™",
    headline: "Automate Your Operations with Bulletproof Security.",
    description: "Build custom workflows to automate routine tasks and manage developer projects with ease. Our TerraSecure™ engine works in the background to verify documents like E-Khata, detect fraud, and ensure every transaction is compliant.",
    checklist: [
      { text: "Visual Workflow Builder", bold: false },
      { text: "Developer Project Management", bold: false },
      { text: "AI Fraud Detection", bold: false },
      { text: "E-Khata & Document Verification", bold: false },
    ],
    metrics: ["95% Task Automation", "100% Secure Transactions"],
    cta: "Configure Your Workflows",
    layout: "text-right",
    image: {
      src: "https://placehold.co/600x450.png",
      alt: "Workflow automation canvas with security checks",
      hint: "workflow security automation"
    },
    href: "/smartflow",
  },
];

const FeatureBlock = ({ block }: { block: typeof featureBlocks[0] }) => {
  const isTextLeft = block.layout === 'text-left';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="py-12"
    >
      <div className={cn(
        "grid grid-cols-1 md:grid-cols-2 items-center gap-12 lg:gap-24"
      )}>
        {/* Text Content */}
        <div className={cn(
            "space-y-6",
            !isTextLeft && "md:col-start-2"
        )}>
          <span className={cn("inline-block rounded-full px-3 py-1 text-sm font-semibold bg-primary/10 text-primary")}>
            {block.suiteName}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-slate-800 dark:text-slate-100">
            {block.headline}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            {block.description}
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            {block.checklist.map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                <CheckCircle className="h-5 w-5 text-teal-500 flex-shrink-0" />
                <span className={cn(item.bold && "font-bold text-slate-800 dark:text-slate-100")}>{item.text}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 pt-2">
            {block.metrics.map((metric, index) => (
              <div key={index} className="text-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2">
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">{metric.split(' ')[0]}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{metric.substring(metric.indexOf(' ') + 1)}</p>
              </div>
            ))}
          </div>
          <Button variant="link" asChild className="text-primary text-lg p-0 h-auto group">
            <Link href={block.href}>
              {block.cta}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Visual Content */}
        <div className={cn(
            "flex items-center justify-center p-2",
            !isTextLeft && "md:col-start-1 md:row-start-1"
        )}>
           {block.visual ? block.visual : (
            <Image
                src={block.image!.src}
                alt={block.image!.alt}
                width={600}
                height={450}
                className="rounded-lg shadow-2xl object-cover"
                data-ai-hint={block.image!.hint}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};


export function FeatureShowcase() {
  return (
    <section id="features" className="bg-white dark:bg-slate-900 py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-slate-800 dark:text-slate-100">
            A Complete Real Estate{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
              Operating System
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mt-4">
            Explore how each component of TerraFlowAI works together to automate your workflow, from initial lead to final closing.
          </p>
        </motion.div>
        
        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {featureBlocks.map((block, index) => (
            <FeatureBlock key={index} block={block} />
          ))}
        </div>
      </div>
    </section>
  );
}
