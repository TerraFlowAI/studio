
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Brain, BarChart3, Users, Search, Filter, FileText, Briefcase, Home, Settings, PieChart, MapPin, Camera, Calendar, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { cn } from "@/lib/utils"; // Added missing import

const features = [
  {
    name: "Intelligent Lead Dominance",
    description: "AI-powered lead scoring, automated follow-ups, and 24/7 chatbot engagement.",
    icon: Zap,
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
    demoComponent: "LeadEngagementDemo",
  },
  {
    name: "Precision Market Mastery",
    description: "Predictive analytics, dynamic pricing, and AI-generated CMA reports.",
    icon: Brain,
    color: "text-sky-400",
    bgColor: "bg-sky-400/10",
    demoComponent: "MarketAnalyticsDemo",
  },
  {
    name: "Effortless Operational Excellence",
    description: "Automated workflows, project management, and AI contract analysis.",
    icon: BarChart3,
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
    demoComponent: "WorkflowAutomationDemo",
  },
];

const LeadEngagementDemo = () => (
  <Card className="w-full h-full bg-slate-800 border-slate-700 shadow-xl flex flex-col">
    <CardHeader className="pb-3">
      <CardTitle className="text-lg font-semibold text-orange-300 flex items-center">
        <Users className="w-5 h-5 mr-2" /> Live Lead Feed
      </CardTitle>
    </CardHeader>
    <CardContent className="flex-grow overflow-y-auto space-y-3 pr-2">
      {[
        { name: "Priya Sharma", score: 92, action: "Hot Lead 🔥", time: "2m ago", avatar: "PS" },
        { name: "Rajesh Kumar", score: 78, action: "Sent Follow-up", time: "5m ago", avatar: "RK" },
        { name: "Ananya Singh", score: 65, action: "Viewed 3 Properties", time: "10m ago", avatar: "AS" },
      ].map((lead, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2 }}
          className="flex items-center p-2.5 bg-slate-700/50 rounded-lg shadow-md"
        >
          <div className={`w-8 h-8 rounded-full bg-orange-500/30 text-orange-200 flex items-center justify-center text-xs font-bold mr-3`}>{lead.avatar}</div>
          <div className="flex-grow">
            <p className="text-sm font-medium text-slate-100">{lead.name}</p>
            <p className="text-xs text-orange-300">AI Score: {lead.score}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium text-slate-200">{lead.action}</p>
            <p className="text-xs text-slate-400">{lead.time}</p>
          </div>
        </motion.div>
      ))}
    </CardContent>
  </Card>
);

const MarketAnalyticsDemo = () => (
  <Card className="w-full h-full bg-slate-800 border-slate-700 shadow-xl flex flex-col">
    <CardHeader className="pb-3">
      <CardTitle className="text-lg font-semibold text-sky-300 flex items-center">
        <BarChart3 className="w-5 h-5 mr-2" /> Market Trends
      </CardTitle>
    </CardHeader>
    <CardContent className="flex-grow flex flex-col justify-center items-center">
      <p className="text-sm text-slate-300 mb-2">Avg. Property Value (Mumbai)</p>
      <p className="text-4xl font-bold text-sky-200 mb-1">₹2.75 Cr</p>
      <p className="text-xs text-green-400 font-semibold mb-4">+3.5% MoM</p>
      <div className="w-full h-20 relative"> {/* Placeholder for a mini chart */}
        <svg width="100%" height="100%" viewBox="0 0 100 50" preserveAspectRatio="none">
          <path d="M0 40 Q 20 10, 40 30 T 80 20 L 100 35" stroke="hsl(var(--primary))" fill="transparent" strokeWidth="2"/>
        </svg>
      </div>
      <Button variant="outline" size="sm" className="mt-4 border-sky-500 text-sky-300 hover:bg-sky-500/10 hover:text-sky-200">View Full Report</Button>
    </CardContent>
  </Card>
);

const WorkflowAutomationDemo = () => (
  <Card className="w-full h-full bg-slate-800 border-slate-700 shadow-xl flex flex-col">
    <CardHeader className="pb-3">
      <CardTitle className="text-lg font-semibold text-emerald-300 flex items-center">
        <Zap className="w-5 h-5 mr-2" /> Automated Workflow
      </CardTitle>
    </CardHeader>
    <CardContent className="flex-grow space-y-3 text-sm text-slate-200">
      <p className="font-medium">"New Lead Integration"</p>
      <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-300 pl-2">
        <li>IF <span className="text-emerald-400">New Lead</span> from Website Chatbot</li>
        <li>THEN <span className="text-emerald-400">Add to CRM</span> (HubSpot)</li>
        <li>THEN Send <span className="text-emerald-400">Welcome Email</span> (Template: "Intro Offer")</li>
        <li>THEN Create <span className="text-emerald-400">Task</span> for Agent "Riya" to call in 24hrs</li>
      </ol>
      <p className="text-xs text-slate-400 pt-2 border-t border-slate-700">Status: <span className="text-green-400">Active</span> | Runs: 27/day</p>
    </CardContent>
  </Card>
);

const demoComponents: { [key: string]: React.FC } = {
  LeadEngagementDemo,
  MarketAnalyticsDemo,
  WorkflowAutomationDemo,
};

export const AIDemoVisual = () => {
  const [selectedFeature, setSelectedFeature] = useState(features[0]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setSelectedFeature(prev => {
        const currentIndex = features.findIndex(f => f.name === prev.name);
        return features[(currentIndex + 1) % features.length];
      });
    }, 5000); // Rotate features every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const DemoComponent = demoComponents[selectedFeature.demoComponent];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100" data-section-view="ai-demo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-headline">
            TerraFlow AI: <span className="text-shimmer">Your Intelligent Co-Pilot</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
            Experience how our AI modules work in tandem to supercharge every aspect of your real estate business.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Feature Selection Column */}
          <div className="lg:col-span-1 space-y-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.button
                  key={feature.name}
                  onClick={() => setSelectedFeature(feature)}
                  className={cn(
                    "w-full text-left p-5 rounded-xl border-2 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800",
                    selectedFeature.name === feature.name
                      ? 'bg-slate-700 border-primary shadow-2xl scale-105'
                      : 'bg-slate-800 border-slate-700 hover:border-slate-600 hover:bg-slate-700/50'
                  )}
                  whileHover={{ y: -3 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: features.indexOf(feature) * 0.1 + 0.2 }}
                >
                  <div className="flex items-center mb-2">
                    <div className={cn("p-2 rounded-lg mr-3", feature.bgColor, selectedFeature.name === feature.name ? feature.bgColor : 'bg-slate-700')}>
                      <Icon className={cn("w-6 h-6", feature.color)} />
                    </div>
                    <h3 className={`text-xl font-semibold ${selectedFeature.name === feature.name ? 'text-primary' : 'text-slate-100'}`}>{feature.name}</h3>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{feature.description}</p>
                </motion.button>
              );
            })}
          </div>

          {/* Demo Visualisation Column */}
          <motion.div 
            className="lg:col-span-2 bg-slate-800/50 backdrop-blur-md p-1 rounded-2xl shadow-2xl border border-slate-700 min-h-[450px] md:min-h-[500px] lg:min-h-[520px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedFeature.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                {DemoComponent && <DemoComponent />}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

    

    