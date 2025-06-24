"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Database, Plug, TrendingUp, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const steps = [
    {
        stepNumber: "1",
        icon: Plug,
        title: "Connect & Consolidate",
        description: "Securely connect your lead sources, import property listings, and consolidate all your business data into a single, intelligent hub. Our guided onboarding makes setup a breeze.",
        alignment: "left"
    },
    {
        stepNumber: "2",
        icon: Zap,
        title: "Automate & Analyze",
        description: "Activate our pre-built SmartFlows or create your own. Automate everything from lead nurturing and market analysis to RERA-compliant document checks and AI property valuations.",
        alignment: "right"
    },
    {
        stepNumber: "3",
        icon: TrendingUp,
        title: "Grow & Dominate",
        description: "Focus on what you do best: building relationships and closing deals. Leverage AI-driven insights, engage clients with professional content, and watch your conversion rates and revenue soar.",
        alignment: "left"
    }
];


const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.4,
            ease: "easeOut"
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    },
};


export function ThreeStepProcess() {
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
                    Get Started in 3 Simple Steps
                </h2>
                <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mt-4">
                    Launch your journey to higher conversions and streamlined operations. TerraFlow is designed for a seamless onboarding experience, delivering value from day one.
                </p>
            </motion.div>

            <motion.div 
                className="relative max-w-3xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
            >
                {/* Connecting Line */}
                <div className="absolute left-10 top-10 bottom-10 w-0.5 bg-slate-200/80 -z-10 md:left-1/2 md:-translate-x-1/2"></div>
                
                {steps.map((step, index) => {
                    const isTextLeft = step.alignment === 'left';
                    const Icon = step.icon;

                    return (
                        <motion.div 
                            key={index} 
                            className="flex items-center w-full mb-12 md:mb-20 last:mb-0"
                            variants={itemVariants}
                        >
                            <div className={cn(
                                "flex items-center w-full gap-8 md:gap-16",
                                !isTextLeft && "md:flex-row-reverse"
                            )}>
                                {/* Text Content */}
                                <div className="md:w-1/2">
                                    <div className={cn(
                                        "p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg",
                                        !isTextLeft && "md:text-right"
                                    )}>
                                        <h3 className="text-2xl font-bold font-headline text-primary mb-2">{step.title}</h3>
                                        <p className="text-slate-600">{step.description}</p>
                                    </div>
                                </div>
                                
                                {/* Number and Icon */}
                                <div className="hidden md:flex relative justify-center items-center w-20 h-20">
                                     <span className="text-7xl font-bold text-slate-200/90">{step.stepNumber}</span>
                                     <div className="absolute p-3 bg-primary rounded-full shadow-lg text-white">
                                        <Icon className="h-6 w-6"/>
                                     </div>
                                </div>

                                {/* Placeholder for Mobile Number/Icon */}
                                <div className="md:hidden flex-shrink-0 relative flex justify-center items-center w-20 h-20 -ml-20">
                                    <div className="absolute p-3 bg-primary rounded-full shadow-lg text-white">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                </div>

                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-center mt-16"
            >
                <Button asChild size="lg" className="group bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95">
                    <Link href="/pricing">
                        Start Your Transformation Today <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
            </motion.div>
        </div>
    </section>
  );
}
