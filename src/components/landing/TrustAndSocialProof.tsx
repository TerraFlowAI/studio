"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, CheckCircle, Star, Lock, Trophy, LifeBuoy, LucideIcon } from "lucide-react";

// Utility function to combine class names with proper typing
const cn = (...classes: (string | undefined | null | false)[]): string => 
  classes.filter(Boolean).join(' ');

// Trust badge interface
interface TrustBadgeProps {
  icon: LucideIcon;
  text: string;
  bgColor: string;
  textColor: string;
}

// Badge configuration interface
interface BadgeConfig {
  icon: LucideIcon;
  text: string;
  bgColor: string;
  textColor: string;
}

// --- Trust Badge Component ---
const TrustBadge = ({ icon: Icon, text, bgColor, textColor }: TrustBadgeProps) => (
  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/50 p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-300">
    <div className={cn("flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0", bgColor)}>
      <Icon className={cn("h-5 w-5", textColor)} />
    </div>
    <span className="text-sm font-medium text-slate-700">{text}</span>
  </div>
);

// --- Main Section Component ---
export function TrustAndSocialProof() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const badges: BadgeConfig[] = [
    { icon: ShieldCheck, text: "RERA Certified", bgColor: "bg-green-100", textColor: "text-green-600" },
    { icon: CheckCircle, text: "ISO 27001", bgColor: "bg-blue-100", textColor: "text-blue-600" },
    { icon: Star, text: "5 Star Rated", bgColor: "bg-yellow-100", textColor: "text-yellow-600" },
    { icon: Lock, text: "Data Privacy Compliant", bgColor: "bg-purple-100", textColor: "text-purple-600" },
    { icon: Trophy, text: "Award-Winning AI", bgColor: "bg-orange-100", textColor: "text-orange-600" },
    { icon: LifeBuoy, text: "24/7 Dedicated Support", bgColor: "bg-sky-100", textColor: "text-sky-600" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section ref={ref} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title and Description */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-bold text-slate-800"
          >
            Built on a Foundation of{" "}
            <span className="bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">
              Trust & Security
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Our commitment to excellence is reflected in our certifications, ensuring your business operates on a secure and compliant platform.
          </motion.p>
        </div>
        
        {/* Trust Badges */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto"
        >
          {badges.map((badge, index) => (
            <motion.div key={`trust-badge-${index}`} variants={itemVariants}>
              <TrustBadge 
                icon={badge.icon} 
                text={badge.text} 
                bgColor={badge.bgColor}
                textColor={badge.textColor}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}