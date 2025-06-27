// src/components/landing/HeroSection.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";
import Image from "next/image";
import { StarBorder } from "@/components/ui/star-border";

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-12 md:pt-32 md:pb-20 text-center bg-gradient-to-b from-background via-teal-50/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl font-bold font-headline text-foreground mb-6">
            The AI Operating System for<br/>Modern Real Estate
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-10">
            From lead scoring and content creation to predictive market analytics, TerraFlowAI provides an end-to-end solution to streamline operations, accelerate sales, and make smarter, data-driven decisions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <StarBorder as="a" href="#contact">
                <span className="animate-text-shimmer text-base font-medium">Request a Demo</span>
             </StarBorder>
             <Button asChild variant="ghost" size="lg" className="text-foreground hover:bg-accent">
                <Link href="#features">
                    Explore Platform <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
             </Button>
          </div>
        </motion.div>
        
        <motion.div
          className="relative mt-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-xl shadow-2xl border border-border">
              <Image
                src="https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxkYXNoYm9hcmQlMjB1aXxlbnwwfHx8fDE3NTEwNzY3MTB8MA&ixlib=rb-4.1.0&q=80&w=1920"
                alt="TerraFlowAI Dashboard Preview"
                data-ai-hint="dashboard ui"
                width={1920}
                height={1080}
                className="w-full h-auto"
                priority
              />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
