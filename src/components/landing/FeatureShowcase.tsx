
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Bot, BarChart3, PenSquare, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

// Data structure for feature blocks
const featureBlocks = [
  {
    suiteName: "TerraLead™ Suite",
    headline: "Supercharge Your Sales Pipeline with an AI Co-Pilot.",
    description: "Stop chasing cold inquiries. Our intelligent AI system works 24/7 to capture, qualify, score, and nurture prospects. We turn your entire lead management process into a high-efficiency conversion engine.",
    checklist: [
      "AI-powered Lead Scoring",
      "24/7 Chatbot Qualification",
      "Automated Follow-up Sequences",
      "Personalized Recommendations",
    ],
    metrics: ["10x More Qualified Leads", "95% Less Manual Work"],
    cta: "Explore Lead Automation",
    layout: "text-left",
    image: {
      src: "https://placehold.co/600x450.png",
      alt: "AI lead scoring and automation dashboard",
      hint: "lead journey dashboard"
    },
  },
  {
    suiteName: "TerraValuate™ & MarketIntel™",
    headline: "Make Data-Driven Decisions with Unbeatable Market Insights.",
    description: "Go beyond guesswork. Leverage our powerful analytics engine for precise, real-time property valuations and predictive market forecasts that give you a decisive competitive edge in any negotiation.",
    checklist: [
      "AI-Powered Property Valuation (AVM)",
      "Predictive Market Analytics",
      "Dynamic Pricing Optimization",
      "Compelling CMA Reports",
    ],
    metrics: ["99% Valuation Accuracy", "50k+ Properties Analyzed"],
    cta: "Discover Valuation Tools",
    layout: "text-right",
    image: {
      src: "https://placehold.co/600x450.png",
      alt: "Market intelligence dashboard showing charts and map data",
      hint: "data analytics map"
    },
  },
  {
    suiteName: "TerraScribe™ & TerraVision™",
    headline: "Generate Professional Content & Showcase Properties in VR.",
    description: "Reclaim hours of your time. Instantly create compelling marketing copy, social media posts, and even RERA-compliant legal documents. Then, captivate buyers with integrated, immersive 3D/VR tours.",
    checklist: [
      "AI Marketing Copywriting",
      "Automated RERA Document Generation",
      "Virtual & Augmented Reality Tours",
      "Multi-channel Content Distribution",
    ],
    metrics: ["10x Faster Content Creation", "100% RERA-Ready Docs"],
    cta: "Explore Content Automation",
    layout: "text-left",
    image: {
      src: "https://placehold.co/600x450.png",
      alt: "Split screen showing a compliant document and a user in a VR tour",
      hint: "document verification VR"
    },
  },
  {
    suiteName: "TerraSmartFlow™ & TerraSecure™",
    headline: "Automate Your Operations with Bulletproof Security.",
    description: "Build custom workflows to automate routine tasks and manage developer projects with ease. Our TerraSecure™ engine works in the background to verify documents like E-Khata, detect fraud, and ensure every transaction is compliant.",
    checklist: [
      "Visual Workflow Builder",
      "Developer Project Management",
      "AI Fraud Detection",
      "E-Khata & Document Verification",
    ],
    metrics: ["95% Task Automation", "100% Secure Transactions"],
    cta: "Configure Your Workflows",
    layout: "text-right",
    image: {
      src: "https://placehold.co/600x450.png",
      alt: "Workflow automation canvas with security checks",
      hint: "workflow security automation"
    },
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
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-slate-800">
            {block.headline}
          </h2>
          <p className="text-lg text-slate-600">
            {block.description}
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            {block.checklist.map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-slate-700">
                <CheckCircle className="h-5 w-5 text-teal-500 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 pt-2">
            {block.metrics.map((metric, index) => (
              <div key={index} className="text-center bg-slate-50 border border-slate-200 rounded-lg p-2">
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">{metric.split(' ')[0]}</p>
                <p className="text-xs text-slate-500">{metric.substring(metric.indexOf(' ') + 1)}</p>
              </div>
            ))}
          </div>
          <Button variant="link" className="text-primary text-lg p-0 h-auto group">
            {block.cta}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Visual Content */}
        <div className={cn(
            "flex items-center justify-center p-8 bg-slate-100 rounded-2xl shadow-inner",
            !isTextLeft && "md:col-start-1 md:row-start-1"
        )}>
            <Image
                src={block.image.src}
                alt={block.image.alt}
                width={600}
                height={450}
                className="rounded-lg shadow-2xl object-cover"
                data-ai-hint={block.image.hint}
            />
        </div>
      </div>
    </motion.div>
  );
};


export function FeatureShowcase() {
  return (
    <section id="features" className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-slate-800">
            A Complete Real Estate{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
              Operating System
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mt-4">
            Explore how each component of TerraFlowAI works together to automate your workflow, from initial lead to final closing.
          </p>
        </motion.div>
        
        <div className="divide-y divide-slate-200">
          {featureBlocks.map((block, index) => (
            <FeatureBlock key={index} block={block} />
          ))}
        </div>
      </div>
    </section>
  );
}
