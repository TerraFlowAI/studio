"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plug, Zap, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRef } from "react";

const steps = [
    {
        stepNumber: "01",
        icon: Plug,
        title: "Connect & Consolidate",
        description: "Securely connect your lead sources, import property listings, and consolidate all your business data into a single, intelligent hub. Our guided onboarding makes setup a breeze.",
        alignment: "left"
    },
    {
        stepNumber: "02",
        icon: Zap,
        title: "Automate & Analyze",
        description: "Activate our pre-built SmartFlows or create your own. Automate everything from lead nurturing and market analysis to RERA-compliant document checks and AI property valuations.",
        alignment: "right"
    },
    {
        stepNumber: "03",
        icon: TrendingUp,
        title: "Grow & Dominate",
        description: "Focus on what you do best: building relationships and closing deals. Leverage AI-driven insights, engage clients with professional content, and watch your conversion rates and revenue soar.",
        alignment: "left"
    }
];

export function ThreeStepProcess() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  return (
    <section className="py-16 md:py-24 bg-slate-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-slate-800">
            Get Started in <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">3 Simple Steps</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mt-4">
            Launch your journey to higher conversions and streamlined operations. TerraFlow is designed for a seamless onboarding experience, delivering value from day one.
          </p>
        </motion.div>

        <div ref={targetRef} className="relative max-w-3xl mx-auto">
          {/* Vertical Line: A static background track and an animated gradient fill */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-0.5 bg-slate-200" />
          <motion.div
            className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-teal-400 to-blue-500 origin-top"
            style={{ scaleY: lineScaleY }}
          />

          {steps.map((step, index) => {
            const isRight = step.alignment === 'right';
            const progressSegmentStart = 0.1 + (index * 0.25);
            const progressSegmentEnd = progressSegmentStart + 0.2;

            const opacity = useTransform(
              scrollYProgress,
              [progressSegmentStart, progressSegmentEnd],
              [0, 1]
            );
            const x = useTransform(
              scrollYProgress,
              [progressSegmentStart, progressSegmentEnd],
              [isRight ? 50 : -50, 0]
            );
            // Enhanced "pop" and "glow" animation for the nodes
            const nodeScale = useTransform(
              scrollYProgress,
              [progressSegmentStart, progressSegmentStart + 0.1, progressSegmentEnd, progressSegmentEnd + 0.1],
              [1, 1.1, 1.1, 1]
            );
            const nodeBoxShadow = useTransform(
              scrollYProgress,
              [progressSegmentStart, progressSegmentStart + 0.1, progressSegmentEnd, progressSegmentEnd + 0.1],
              ["0px 0px 0px hsla(var(--primary), 0)", "0px 0px 25px hsla(var(--primary), 0.3)", "0px 0px 25px hsla(var(--primary), 0.3)", "0px 0px 0px hsla(var(--primary), 0)"]
            );

            const Icon = step.icon;

            return (
              <div
                key={index}
                className={cn(
                  "relative flex justify-center items-start min-h-[280px]"
                )}
              >
                {/* Node on the line with new animations */}
                <motion.div 
                    className="sticky top-1/2 -translate-y-1/2 z-10"
                    style={{ scale: nodeScale, boxShadow: nodeBoxShadow, borderRadius: '9999px' }}
                >
                  <div className="w-14 h-14 bg-white border-4 border-slate-300 rounded-full flex items-center justify-center">
                    <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </motion.div>

                {/* Content Card */}
                <motion.div
                  className={cn(
                    "w-[calc(50%-4rem)] absolute top-1/2 -translate-y-1/2",
                    isRight ? "left-1/2 ml-16" : "right-1/2 mr-16"
                  )}
                  style={{ opacity, x }}
                >
                   <div className="relative">
                     <p className="absolute -top-12 -left-12 text-[10rem] font-bold text-slate-200/80 -z-10" style={{ right: isRight ? 'auto' : '-4.5rem', left: isRight ? '-4.5rem' : 'auto', textAlign: isRight ? 'left' : 'right' }}>
                        {step.stepNumber}
                     </p>
                     <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg">
                        <h3 className="text-2xl font-bold font-headline text-primary mb-2">{step.title}</h3>
                        <p className="text-slate-600">{step.description}</p>
                     </div>
                   </div>
                </motion.div>
              </div>
            );
          })}
          
          {/* Spacer div to push the button down */}
          <div className="h-40" />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Button asChild size="lg" className="group bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95">
              <Link href="/pricing">
                Start Your Transformation Today <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
