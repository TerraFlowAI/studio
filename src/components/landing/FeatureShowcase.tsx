
"use client";

import { motion } from "framer-motion";
import React from "react";
import { Bot, Mail, Phone, BarChart3, FileSignature, Zap, CheckCircle } from "lucide-react";
import { Card } from "../ui/card";

const steps = [
  {
    step: 1,
    title: "Capture & Consolidate",
    description: "Automate lead intake from any source—your website, ad campaigns, or social media—and let our AI enrich and score them instantly.",
    visual: () => (
      <div className="flex items-center justify-center space-x-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}>
          <Phone className="w-12 h-12 text-blue-500" />
        </motion.div>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4, type: "spring" }}>
          <Mail className="w-12 h-12 text-purple-500" />
        </motion.div>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6, type: "spring" }}>
          <Bot className="w-12 h-12 text-teal-500" />
        </motion.div>
      </div>
    )
  },
  {
    step: 2,
    title: "Analyze & Automate",
    description: "TerraFlow's AI engine analyzes market data, predicts trends, and runs your workflows on autopilot, from sending follow-up emails to flagging non-compliant documents.",
    visual: () => (
      <div className="flex items-center justify-center space-x-4">
         <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}>
          <BarChart3 className="w-12 h-12 text-orange-500" />
        </motion.div>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4, type: "spring" }}>
          <Zap className="w-12 h-12 text-yellow-500" />
        </motion.div>
         <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6, type: "spring" }}>
          <FileSignature className="w-12 h-12 text-red-500" />
        </motion.div>
      </div>
    )
  },
  {
    step: 3,
    title: "Engage & Close",
    description: "Engage clients with AI-generated content, immersive VR tours, and data-driven insights. Close deals faster with automated contract generation and secure e-signatures.",
    visual: () => (
      <div className="flex items-center justify-center space-x-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}>
          <FileSignature className="w-12 h-12 text-green-500" />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <CheckCircle className="w-8 h-8 text-green-600"/>
        </motion.div>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8, type: "spring" }} className="p-4 bg-green-100 rounded-lg">
          <p className="font-bold text-green-800">SOLD</p>
        </motion.div>
      </div>
    )
  }
];

export function FeatureShowcase() {
  return (
    <section className="py-16 md:py-24 bg-slate-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Go from Manual Chaos to AI-Powered Clarity
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            Our platform simplifies your entire workflow into three easy steps.
          </p>
        </div>
        <div className="max-w-4xl mx-auto space-y-12">
          {steps.map((step) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row items-center gap-8"
            >
              <Card className="w-full md:w-1/2 bg-white/70 backdrop-blur-sm shadow-lg rounded-2xl p-8">
                <span className="text-teal-600 font-bold">Step {step.step}</span>
                <h3 className="text-2xl font-bold text-slate-800 mt-2 mb-4">{step.title}</h3>
                <p className="text-slate-600">{step.description}</p>
              </Card>
              <div className="w-full md:w-1/2 h-48 flex items-center justify-center bg-slate-100 rounded-2xl shadow-inner">
                <step.visual />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
