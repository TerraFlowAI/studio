
"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Bot, Brain, PenSquare, ShieldCheck, type LucideIcon } from "lucide-react";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  name: string;
}

const services: Service[] = [
  {
    icon: Bot,
    title: "Intelligent Sales Automation",
    description: "Automate lead capture, scoring, and follow-ups with SmartFlow™ workflows.",
    name: "TerraLead™",
  },
  {
    icon: Brain,
    title: "Predictive Market Intelligence",
    description: "Access real-time market data, trend forecasting, and AI-powered CMA reports.",
    name: "MarketIntel™",
  },
  {
    icon: PenSquare,
    title: "Automated Content & Contracts",
    description: "Generate compelling property listings, emails, and compliant contract drafts in seconds.",
    name: "TerraScribe™",
  },
  {
    icon: ShieldCheck,
    title: "Compliance & Security",
    description: "Verify documents, monitor transactions for fraud, and ensure RERA compliance automatically.",
    name: "TerraSecure™",
  },
];

const ClaymorphicCard: React.FC<{ service: Service, index: number }> = ({ service, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="h-full"
  >
    <Card className="h-full p-6 bg-slate-50 rounded-2xl shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] hover:shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] transition-shadow duration-300">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-xl bg-white shadow-md">
          <service.icon className="w-7 h-7 bg-clip-text text-transparent bg-gradient-to-br from-teal-500 to-blue-500" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-slate-800">{service.name}</h4>
          <h3 className="text-sm font-semibold text-teal-600">{service.title}</h3>
        </div>
      </div>
      <p className="text-slate-600">{service.description}</p>
    </Card>
  </motion.div>
);

export function CoreServicesGrid() {
  return (
    <section className="py-16 md:py-24 bg-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            An Entirely New Class of Real Estate Tooling
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            Each component of TerraFlow is designed to give you a distinct advantage in the market.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ClaymorphicCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
