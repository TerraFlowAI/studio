// src/components/landing/FeatureShowcase.tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Bot, Mail, Users, Zap, BadgeCheck, FileText, BarChart3, GanttChartSquare, Map, LineChart as LineChartIcon, Globe, Phone, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from 'next/link';
import { ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';


// --- Visual Components for each Feature Block ---

const TerraLeadVisual = () => (
    <div className="relative w-full aspect-video bg-slate-900 rounded-2xl p-0 flex items-center justify-center overflow-hidden shadow-2xl border border-slate-800">
        <video
          key="/videos/terralead-showcase.mp4"
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

const TerraScribeVisual = () => (
    <div className="relative w-full aspect-[4/3] bg-slate-100 dark:bg-slate-800/50 rounded-2xl p-6 flex items-center justify-center overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-6">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1, transition: { delay: 0.2 } }} className="relative p-8 bg-white dark:bg-slate-700 rounded-lg shadow-lg">
                <FileText className="h-16 w-16 text-primary" />
                <motion.div initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0, transition: { delay: 0.8, type: 'spring' } }} className="absolute -bottom-4 -right-4">
                    <BadgeCheck className="h-12 w-12 text-green-500 fill-white dark:fill-slate-800" />
                </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0, transition: { delay: 1.2 } }} className="w-48 bg-white dark:bg-slate-700 p-3 rounded-lg shadow-lg space-y-2">
                <div className="w-3/4 h-2 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
                <div className="w-1/2 h-2 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
            </motion.div>
        </div>
    </div>
);

const TerraIntelVisual = () => (
    <div className="relative w-full aspect-[4/3] bg-slate-100 dark:bg-slate-800/50 rounded-2xl p-6 flex items-center justify-center overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700">
        <Map className="absolute inset-0 w-full h-full text-slate-200 dark:text-slate-700 opacity-50" strokeWidth={1}/>
        <motion.div
            className="absolute top-[30%] left-[25%] w-16 h-16 bg-teal-400/50 rounded-full blur-2xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
        />
        <motion.div
            className="absolute bottom-[25%] right-[20%] w-20 h-20 bg-blue-400/50 rounded-full blur-2xl"
             animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "mirror", delay: 1 }}
        />
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1, transition: { delay: 0.2 } }} className="w-full max-w-sm bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-lg shadow-2xl p-4 border border-slate-300 dark:border-slate-600 z-10">
            <h4 className="font-semibold text-sm mb-2 text-foreground">Market Price Trend</h4>
            <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                        { name: 'Jan', price: 100 }, { name: 'Feb', price: 110 }, { name: 'Mar', price: 105 },
                        { name: 'Apr', price: 120 }, { name: 'May', price: 125 }, { name: 'Jun', price: 130 },
                        { name: 'Jul', price: 140, predicted: 140 }, { name: 'Aug', predicted: 145 },
                        { name: 'Sep', predicted: 155 }, { name: 'Oct', predicted: 160 }
                    ]}
                    margin={{ top: 5, right: 20, bottom: 5, left: -20 }}
                    >
                        <Tooltip contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(5px)',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '0.5rem',
                        }}/>
                        <Line type="monotone" dataKey="price" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} name="Historical Prices" />
                        <Line type="monotone" dataKey="predicted" stroke="hsl(var(--primary))" strokeWidth={2} strokeDasharray="5 5" dot={false} name="AI Predicted Trend" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="flex justify-between text-xs mt-2 text-muted-foreground">
                <span>Historical Prices</span>
                <span>AI Predicted Trend</span>
            </div>
        </motion.div>
    </div>
);

const TerraConstructVisual = () => (
    <div className="relative w-full aspect-[4/3] bg-slate-100 dark:bg-slate-800/50 rounded-2xl p-6 flex items-center justify-center overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700">
        <div className="w-full max-w-md space-y-3">
            <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { delay: 0.2 } }}
                className="flex items-center gap-3 p-3 bg-white dark:bg-slate-700 rounded-lg shadow-md"
            >
                <div className="p-2 bg-green-100 dark:bg-green-800/50 rounded-full">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <p className="font-medium text-sm text-foreground">Foundation Complete</p>
            </motion.div>
            <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { delay: 0.4 } }}
                className="flex items-center justify-between gap-3 p-3 bg-white dark:bg-slate-700 rounded-lg shadow-md"
            >
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-800/50 rounded-full">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="font-medium text-sm text-foreground">Phase 1 Sold Out</p>
                </div>
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1, transition: { delay: 0.8 } }}
                    className="flex items-center gap-1 text-blue-500"
                >
                    <FileText className="h-5 w-5" />
                    <ArrowRight className="h-4 w-4" />
                    <Users className="h-5 w-5" />
                </motion.div>
            </motion.div>
            <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { delay: 0.6 } }}
                className="flex items-center gap-3 p-3 bg-white dark:bg-slate-700 rounded-lg shadow-md"
            >
                <div className="p-2 bg-slate-200 dark:bg-slate-600 rounded-full">
                    <GanttChartSquare className="h-5 w-5 text-slate-500" />
                </div>
                <p className="font-medium text-sm text-muted-foreground">Handover Phase</p>
            </motion.div>
        </div>
    </div>
);

const TerraCoreVisual = () => (
    <div className="relative w-full aspect-[4/3] flex items-center justify-center overflow-hidden">
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full flex items-center justify-center bg-slate-800/50">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-sky-900/30 to-slate-800 rounded-full animate-pulse-subtle"></div>
            <div className="absolute inset-2 rounded-full shadow-[inset_0_4px_15px_rgba(0,0,0,0.4)]"></div>
            <Bot className="h-24 w-24 text-teal-400 z-10" style={{ filter: 'drop-shadow(0 0 10px hsl(var(--primary)))' }}/>
            <div className="absolute w-20 h-20 bg-primary/20 rounded-full blur-2xl"></div>
            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1, transition: { delay: 1, type: 'spring' } }} className="absolute -right-4 top-12 p-3 bg-slate-700 rounded-full shadow-lg"><Phone className="h-6 w-6 text-green-400"/></motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1, transition: { delay: 1.2, type: 'spring' } }} className="absolute -left-4 bottom-12 p-3 bg-slate-700 rounded-full shadow-lg"><Calendar className="h-6 w-6 text-purple-400"/></motion.div>
        </div>
    </div>
);


// Data structure defining each feature block
const featureBlocks = [
  {
    suiteName: "TerraLead™ Suite",
    headline: "Supercharge Your Sales Pipeline with an AI Co-Pilot.",
    description: "Stop chasing cold inquiries. Our intelligent AI system works 24/7 to capture, qualify, score, and nurture prospects across multiple channels like WhatsApp and property portals. We turn your entire lead management process into a high-efficiency conversion engine.",
    checklist: [ "AI-powered Lead Scoring", "24/7 Chatbot Qualification", "Automated Follow-up Sequences", "Omni-channel Communication" ],
    metrics: ["10x More Qualified Leads", "95% Less Manual Work"],
    cta: "Explore Lead Automation",
    layout: "text-left",
    visual: <TerraLeadVisual />,
    href: "/solutions/agents",
  },
  {
    suiteName: "TerraScribe™ Suite",
    headline: "Generate Compliant Documents & Marketing Copy Instantly.",
    description: "Eliminate writer's block and legal uncertainty. Generate professional marketing content in seconds, and create error-free, RERA-compliant documents like sale agreements with our AI, ensuring speed and peace of mind.",
    checklist: [ "AI Marketing Copywriting", "Automated RERA Document Generation" ],
    metrics: [],
    cta: "Explore Content Tools",
    layout: "text-right",
    visual: <TerraScribeVisual />,
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
    visual: <TerraIntelVisual />,
    href: "/analytics",
  },
  {
    suiteName: "TerraConstruct™ Suite",
    headline: "Streamline Your Projects from Groundbreaking to Handover.",
    description: "Designed for developers. Manage your entire project lifecycle in one place. Track construction milestones, manage inventory, and automate post-sales processes like payment reminders and handovers.",
    checklist: [ "Real-time Inventory Management", "Automated Payment & Demand Notes" ],
    metrics: [],
    cta: "Explore Developer Tools",
    layout: "text-right",
    visual: <TerraConstructVisual />,
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
    isSpecial: true,
    visual: <TerraCoreVisual />,
    href: "/#",
  },
];


// A reusable component for each feature block
const FeatureBlock = ({ block }: { block: (typeof featureBlocks)[0] & { isSpecial?: boolean } }) => {
  const isTextLeft = block.layout === 'text-left';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={cn(
        "py-12",
        block.isSpecial && "bg-slate-900 text-white rounded-3xl my-12 py-16 px-4 sm:px-8"
      )}
    >
      <div className={cn(
        "grid grid-cols-1 md:grid-cols-2 items-center gap-12 lg:gap-24",
        block.isSpecial ? "container mx-auto" : ""
      )}>
        {/* Text Content */}
        <div className={cn("space-y-6", !isTextLeft && "md:col-start-2")}>
          <span className={cn("inline-block rounded-full px-3 py-1 text-sm font-semibold", block.isSpecial ? "bg-teal-400/10 text-teal-300" : "bg-primary/10 text-primary")}>
            {block.suiteName}
          </span>
          <h2 className={cn("text-3xl md:text-4xl font-bold font-headline", block.isSpecial ? "text-slate-100" : "text-slate-800 dark:text-slate-100")}>
            {block.headline}
          </h2>
          <p className={cn("text-lg", block.isSpecial ? "text-slate-300" : "text-slate-600 dark:text-slate-300")}>
            {block.description}
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            {block.checklist.map((item, index) => (
              <li key={index} className={cn("flex items-center gap-2", block.isSpecial ? "text-slate-200" : "text-slate-700 dark:text-slate-200")}>
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
          <Button variant="link" asChild className={cn("text-lg p-0 h-auto group", block.isSpecial ? "text-teal-400 hover:text-teal-300" : "text-primary")}>
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
