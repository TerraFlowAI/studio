// src/components/landing/FeatureShowcase.tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from 'next/link';

// Data structure defining each feature block for easy management
const featureBlocks = [
  {
    suiteName: "TerraLead™ Suite",
    headline: "Supercharge Your Sales Pipeline with an AI Co-Pilot.",
    description: "Stop chasing cold inquiries. Our intelligent AI system works 24/7 to capture, qualify, score, and nurture prospects across multiple channels. We turn your entire lead management process into a high-efficiency conversion engine.",
    checklist: [ "AI-powered Lead Scoring", "24/7 Chatbot Qualification", "Automated Follow-up Sequences", "Omni-channel Communication" ],
    metrics: ["10x More Qualified Leads", "95% Less Manual Work"],
    cta: "Explore Lead Automation",
    layout: "text-left",
    visual: (
      <div className="relative w-full aspect-video bg-slate-900 rounded-2xl p-0 flex items-center justify-center overflow-hidden shadow-2xl border border-slate-800">
        <video className="w-full h-full object-cover" autoPlay loop muted playsInline key="/videos/terralead-showcase.mp4">
          <source src="/videos/terralead-showcase.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      </div>
    ),
    href: "/solutions/agents",
  },
  {
    suiteName: "TerraScribe™ & TerraSecure™",
    headline: "Generate Compliant Documents & Marketing Copy Instantly.",
    description: "Eliminate writer's block and legal uncertainty. Generate professional marketing content in seconds, and create error-free, RERA-compliant documents like sale agreements with our AI, ensuring speed and peace of mind.",
    checklist: [ "AI Marketing Copywriting", "Automated RERA Document Generation" ],
    metrics: [],
    cta: "Explore Content Tools",
    layout: "text-right",
    visual: (
      <div className="relative w-full aspect-video bg-slate-900 rounded-2xl p-0 flex items-center justify-center overflow-hidden shadow-2xl border border-slate-800">
        <video className="w-full h-full object-cover" autoPlay loop muted playsInline key="/videos/terrascribe-showcase.mp4">
          <source src="/videos/terrascribe-showcase.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      </div>
    ),
    href: "/scribe",
  },
  {
    suiteName: "TerraIntel™ Suite",
    headline: "Make Data-Driven Decisions with Predictive Analytics.",
    description: "Go beyond simple reports. Leverage our powerful analytics engine for precise, real-time property valuations and predictive market forecasts that give you a decisive competitive edge.",
    checklist: [ "AI-Powered Property Valuation", "Predictive Market Forecasting" ],
    metrics: [],
    cta: "Discover Valuation Tools",
    layout: "text-left",
    visual: (
       <div className="relative w-full aspect-video bg-slate-900 rounded-2xl p-0 flex items-center justify-center overflow-hidden shadow-2xl border border-slate-800">
        <video className="w-full h-full object-cover" autoPlay loop muted playsInline key="/videos/terravaluate-showcase.mp4">
          <source src="/videos/terravaluate-showcase.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      </div>
    ),
    href: "/analytics",
  },
  {
    suiteName: "TerraConstruct™ & SmartFlow™",
    headline: "Streamline Projects from Groundbreaking to Handover.",
    description: "Designed for developers. Manage your project lifecycle, track construction milestones, automate post-sales processes, and build custom workflows for any task.",
    checklist: [ "Real-time Inventory Management", "Automated Payment & Demand Notes" ],
    metrics: [],
    cta: "Explore Developer Tools",
    layout: "text-right",
    visual: (
      <div className="relative w-full aspect-video bg-slate-900 rounded-2xl p-0 flex items-center justify-center overflow-hidden shadow-2xl border border-slate-800">
        <video className="w-full h-full object-cover" autoPlay loop muted playsInline key="/videos/smartflow-showcase.mp4">
          <source src="/videos/smartflow-showcase.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      </div>
    ),
    href: "/solutions/developers",
  },
  {
    suiteName: "Featuring Terra, your AI Agent",
    headline: "Your Autonomous Team Member is Here.",
    description: "This is what sets TerraFlow apart. Use voice or chat to command Terra, your AI agent. Tell it to call leads, generate reports, or schedule meetings, and it gets done. It's not just a tool; it's a new way to run your business.",
    checklist: [ "Autonomous Outbound Voice Calls", "Conversational UI (Voice & Chat)" ],
    metrics: [],
    cta: "Meet Your AI Agent",
    layout: "text-left",
    isSpecial: true, // Special flag for unique styling
    visual: (
       <div className="relative w-full aspect-video flex items-center justify-center overflow-hidden">
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full flex items-center justify-center bg-slate-800/50">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-sky-900/30 to-slate-800 rounded-full animate-pulse-subtle"></div>
          <div className="absolute inset-2 rounded-full shadow-[inset_0_4px_15px_rgba(0,0,0,0.4)]"></div>
          <Bot className="h-24 w-24 text-teal-400 z-10" style={{ filter: 'drop-shadow(0 0 10px hsl(var(--primary)))' }}/>
          <div className="absolute w-20 h-20 bg-primary/20 rounded-full blur-2xl"></div>
        </div>
      </div>
    ),
    href: "/#",
  },
];


// A reusable component for each feature block
const FeatureBlock = ({ block }: { block: (typeof featureBlocks)[0] }) => {
  const isTextLeft = block.layout === 'text-left';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={cn(
        "py-12",
        (block as any).isSpecial && "bg-slate-900 text-white rounded-3xl my-12 py-16 px-4 sm:px-8" // Special styling
      )}
    >
      <div className={cn(
        "grid grid-cols-1 md:grid-cols-2 items-center gap-12 lg:gap-24",
        (block as any).isSpecial ? "container mx-auto" : ""
      )}>
        {/* Text Content */}
        <div className={cn("space-y-6", !isTextLeft && "md:col-start-2")}>
          <span className={cn("inline-block rounded-full px-3 py-1 text-sm font-semibold", (block as any).isSpecial ? "bg-teal-400/10 text-teal-300" : "bg-primary/10 text-primary")}>
            {block.suiteName}
          </span>
          <h2 className={cn("text-3xl md:text-4xl font-bold font-headline", (block as any).isSpecial ? "text-slate-100" : "text-slate-800 dark:text-slate-100")}>
            {block.headline}
          </h2>
          <p className={cn("text-lg", (block as any).isSpecial ? "text-slate-300" : "text-slate-600 dark:text-slate-300")}>
            {block.description}
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            {block.checklist.map((item, index) => (
              <li key={index} className={cn("flex items-center gap-2", (block as any).isSpecial ? "text-slate-200" : "text-slate-700 dark:text-slate-200")}>
                <CheckCircle className="h-5 w-5 text-teal-500 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {block.metrics && block.metrics.length > 0 && (
             <div className="flex items-center gap-4 pt-2">
                {block.metrics.map((metric, index) => (
                  <div key={index} className="text-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2">
                    <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">{metric.split(' ')[0]}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{metric.substring(metric.indexOf(' ') + 1)}</p>
                  </div>
                ))}
              </div>
          )}
          <Button variant="link" asChild className={cn("text-lg p-0 h-auto group", (block as any).isSpecial ? "text-teal-400 hover:text-teal-300" : "text-primary")}>
            <Link href={block.href}>
              {block.cta}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Visual Content */}
        <div className={cn("flex items-center justify-center p-2", !isTextLeft && "md:col-start-1 md:row-start-1")}>
           {block.visual}
        </div>
      </div>
    </motion.div>
  );
};


// The main exportable component for your landing page
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
            Explore how each component of the TerraFlowAI ecosystem works together to automate your workflow, from initial lead to final closing.
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
