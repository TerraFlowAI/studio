// src/components/landing/FeaturesSection.tsx
"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, PenSquare, Calculator, Zap, FileSignature, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "TerraLead™ AI",
    description: "Capture, score, and automatically nurture leads. Our AI predicts which leads are most likely to convert, so you can focus your efforts.",
  },
  {
    icon: PenSquare,
    title: "TerraScribe™",
    description: "Generate compelling property descriptions, marketing emails, and social media posts in seconds, tailored to your target audience.",
  },
  {
    icon: Calculator,
    title: "TerraValuate™ Pro",
    description: "Create AI-powered Comparative Market Analysis (CMA) reports for accurate, data-backed property valuations.",
  },
  {
    icon: Zap,
    title: "SmartFlow™ Automation",
    description: "Build custom workflows to automate repetitive tasks, from lead follow-ups and document reminders to scheduling property viewings.",
  },
  {
    icon: FileSignature,
    title: "TerraSecure™ Documents",
    description: "AI-powered document analysis to verify legal documents, check for compliance, and flag potential risks in contracts.",
  },
  {
    icon: BarChart3,
    title: "MarketIntel™ Analytics",
    description: "Access predictive market analytics, demand heatmaps, and investment risk assessments to guide smarter business decisions.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-foreground mb-4">
            An End-to-End Platform
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            TerraFlowAI integrates every aspect of your real estate business into one intelligent system.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <feature.icon className="h-7 w-7 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-xl text-primary">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
