"use client";
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AiAssistantCardProps {
    userName: string;
}

// A new component for the animated waveform
const AudioWaveform = () => {
  const waveVariants = {
    animate: {
      d: [
        "M 0 50 Q 50 30, 100 50 T 200 50",
        "M 0 50 Q 50 70, 100 50 T 200 50",
        "M 0 50 Q 50 30, 100 50 T 200 50",
      ],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <svg viewBox="0 0 200 100" className="w-full h-auto absolute inset-0 opacity-50">
      <motion.path
        variants={waveVariants}
        animate="animate"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        style={{ transitionDelay: '0.2s' }}
      />
      <motion.path
        variants={waveVariants}
        animate="animate"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        style={{ transitionDelay: '0.4s', opacity: 0.7 }}
      />
      <motion.path
        variants={waveVariants}
        animate="animate"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        style={{ transitionDelay: '0.6s', opacity: 0.4 }}
      />
    </svg>
  );
};


export function AiAssistantCard({ userName }: AiAssistantCardProps) {
  return (
    <Card className="relative bg-slate-900 border-slate-700/50 rounded-2xl shadow-2xl h-full flex flex-col text-white overflow-hidden group">
      {/* Glowing Border Effect */}
      <div className="absolute -inset-px bg-gradient-to-r from-teal-500 via-sky-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-md"></div>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 via-sky-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-lg"></div>

      <CardContent className="relative p-6 flex-grow flex flex-col items-center justify-between">
        
        {/* The Orb */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full flex items-center justify-center">
          {/* Orb Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-sky-900/50 to-slate-900 rounded-full animate-pulse-subtle"></div>
          
          {/* Orb Inner Shadow */}
          <div className="absolute inset-2 rounded-full shadow-[inset_0_4px_15px_rgba(0,0,0,0.4)]"></div>
          
          {/* Waveform Visualization */}
          <div className="relative w-3/4 h-3/4">
             <AudioWaveform />
          </div>

          {/* Center Glow */}
           <div className="absolute w-20 h-20 bg-primary/20 rounded-full blur-2xl"></div>
        </div>

        {/* Conversation Area */}
        <div className="text-center my-6">
            <p 
              className="text-lg text-slate-200" 
              style={{ textShadow: '0 0 8px hsla(var(--primary), 0.5)' }}
            >
                Hi {userName}, how can I help you dominate your market today?
            </p>
        </div>

        {/* Input Bar */}
        <div className="w-full relative">
            <Input 
                placeholder='Ask Terra anything... (e.g., "Call my 3 hottest leads")'
                className="bg-slate-800/80 border-slate-700 text-white placeholder:text-slate-400 focus:ring-primary h-12 rounded-full pl-5 pr-12"
            />
            <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 hover:text-white hover:bg-primary/20 rounded-full">
                <Mic className="h-5 w-5"/>
                <span className="sr-only">Use Voice Command</span>
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
