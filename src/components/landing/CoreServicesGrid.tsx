"use client";

import { motion } from "framer-motion";
import {
  Target,
  TrendingUp,
  PenSquare,
  Zap,
  ShieldCheck,
  FileSignature,
  CheckCircle,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Service {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  color: string;
  washColor: string;
}

const services: Service[] = [
  {
    icon: Target,
    title: "TerraLead™",
    subtitle: "Intelligent Lead Conversion",
    description: "Our AI-powered lead management system automatically qualifies and nurtures prospects, turning cold inquiries into hot opportunities with predictive lead scoring and automated follow-up sequences.",
    bullets: ["AI Lead Scoring & Prioritization", "24/7 AI Chatbot Qualification", "Automated Nurturing Campaigns"],
    color: "text-blue-600",
    washColor: "bg-blue-100",
  },
  {
    icon: TrendingUp,
    title: "TerraValuate™",
    subtitle: "Precision Valuations & Market Analytics",
    description: "Leverage our industry-leading AI property valuation tools. Get accurate, data-driven pricing based on real-time market intelligence, predictive trends, and hyper-local data for the Indian market.",
    bullets: ["AI-Powered Automated Valuation Models (AVM)", "Predictive Market Trend Analysis", "Dynamic Pricing Optimization"],
    color: "text-green-600",
    washColor: "bg-green-100",
  },
  {
    icon: PenSquare,
    title: "TerraScribe™",
    subtitle: "Effortless Content Creation",
    description: "Generate compelling, SEO-optimized property descriptions, marketing emails, and social media content in seconds. Reclaim hours of your time with our advanced generative AI.",
    bullets: ["Smart AI Copywriting for Listings", "Automated Email & Social Campaigns", "Multi-channel Content Distribution"],
    color: "text-purple-600",
    washColor: "bg-purple-100",
  },
  {
    icon: Zap,
    title: "TerraSmartFlow™",
    subtitle: "Automated Workflows & Project Management",
    description: "Streamline your operations from start to finish. Build custom workflows that handle routine tasks, manage client communication, and track developer project milestones automatically.",
    bullets: ["Visual Workflow Builder", "Automated Task & Client Reminders", "Developer Project Tracking"],
    color: "text-orange-600",
    washColor: "bg-orange-100",
  },
  {
    icon: ShieldCheck,
    title: "TerraSecure™",
    subtitle: "Secure Transactions & Fraud Detection",
    description: "Transact with unparalleled confidence. Our TerraSecure™ suite uses AI to detect anomalies, verify property documents like E-Khata, and flag potential fraud before it becomes a problem.",
    bullets: ["AI-Powered Document Verification (E-Khata)", "Transactional Fraud Detection", "Digital Security Protocols"],
    color: "text-sky-600",
    washColor: "bg-sky-100",
  },
  {
    icon: FileSignature,
    title: "TerraScribe™ Pro",
    subtitle: "RERA-Compliant Documentation",
    description: "Navigate legal complexities with ease. Generate, analyze, and manage RERA-compliant documents, from sale agreements to booking forms, with AI-driven risk detection to ensure compliance.",
    bullets: ["Automated RERA Document Generation", "AI Contract Risk Analysis", "Compliance Workflow Integration"],
    color: "text-red-600",
    washColor: "bg-red-100",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export function CoreServicesGrid() {
  return (
    <section className="py-16 md:py-24 bg-slate-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            AI-Powered Real Estate,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
              Built for the Indian Market.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            From AI lead scoring to RERA-compliant documentation, our end-to-end platform automates your workflow, saving you time and helping you close more deals.
          </p>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className="h-full"
              >
                <Card className="relative h-full overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div
                    className={cn(
                      "absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-20 blur-3xl",
                      service.washColor
                    )}
                  />
                  <CardHeader className="relative z-10">
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "flex items-center justify-center h-12 w-12 rounded-full",
                          service.washColor
                        )}
                      >
                        <Icon className={cn("h-6 w-6", service.color)} />
                      </div>
                      <CardTitle className="text-xl font-bold text-slate-900">
                        {service.subtitle}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.bullets.map((bullet, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <CheckCircle className={cn("h-4 w-4 mr-2 flex-shrink-0", service.color)} />
                          <span className="text-slate-700">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
        <div className="text-center mt-16">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Link href="/pricing">Explore All Features</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
