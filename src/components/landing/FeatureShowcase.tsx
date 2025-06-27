
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Bot, BarChart3, PenSquare, ShieldCheck, Target, Phone, CalendarCheck2, Users } from "lucide-react";
import { cn } from "@/lib/utils";

// --- NEW VISUAL COMPONENT FOR TERRALEAD ---
const TerraLeadVisual = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } },
  };
  
  const soundWaveVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { 
      opacity: [0.5, 1, 0], 
      scale: [0.5, 1.2],
      transition: { duration: 1, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut", delay: 1 } 
    }
  };

  const phoneRingVariants = {
      hidden: { rotate: 0 },
      visible: { 
        rotate: [0, -10, 10, -10, 10, 0], 
        transition: { duration: 0.5, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut", delay: 2 } 
      }
  };
  
  const calendarEventVariants = {
      hidden: { opacity: 0, y: -20 },
      visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, delay: 3.5 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      className="relative w-full aspect-square sm:aspect-[4/3] bg-slate-100/80 dark:bg-slate-900/80 rounded-2xl p-6 flex items-center justify-center overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(to_bottom,white,transparent)] dark:bg-grid-slate-700/30"></div>
      
      {/* Icons and flow */}
      <div className="relative flex items-center justify-between w-full max-w-sm">
        {/* 1. Lead Icon */}
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-1 z-10">
          <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-lg border">
            <Target className="w-8 h-8 text-blue-500" />
          </div>
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">New Lead</p>
        </motion.div>

        {/* 2. Phone Icon */}
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-1 z-10">
           <motion.div 
             variants={phoneRingVariants}
             className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-lg border"
           >
            <Phone className="w-8 h-8 text-green-500" />
           </motion.div>
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">AI Call</p>
        </motion.div>

        {/* 3. Calendar Icon & Event */}
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-1 z-10">
           <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-lg border relative">
            <CalendarCheck2 className="w-8 h-8 text-purple-500" />
            <motion.div 
              variants={calendarEventVariants}
              className="absolute -right-5 -bottom-2 w-20 bg-primary text-primary-foreground p-1.5 rounded-md shadow-xl text-left"
            >
                <p className="text-[10px] font-bold">Demo</p>
                <p className="text-[9px] opacity-80">with Aarav Sharma</p>
            </motion.div>
           </div>
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">Booked</p>
        </motion.div>
      </div>
      
      {/* Soundwave animation */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
            variants={soundWaveVariants}
            className="w-24 h-24 rounded-full border-2 border-green-500"
        />
         <motion.div
            variants={soundWaveVariants}
            style={{animationDelay: "0.2s"}}
            className="absolute top-0 left-0 w-24 h-24 rounded-full border-2 border-green-500"
        />
      </div>

    </motion.div>
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
          <Button variant="link" className="text-primary text-lg p-0 h-auto group">
            {block.cta}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
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
