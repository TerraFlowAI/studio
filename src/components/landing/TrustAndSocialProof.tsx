
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, CheckCircle, Star, Lock, Trophy, LifeBuoy } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Trust Badge Component ---
const TrustBadge = ({
  icon: Icon,
  text,
  colorClass,
}: {
  icon: React.ElementType;
  text: string;
  colorClass: string;
}) => (
  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/50 p-4 shadow-sm transition-shadow hover:shadow-md">
    <div className={cn("flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0", colorClass.replace('text-', 'bg-') + '/10')}>
        <Icon className={cn("h-5 w-5", colorClass)} />
    </div>
    <span className="text-sm font-medium text-slate-700">{text}</span>
  </div>
);


// --- Main Section Component ---
export function TrustAndSocialProof() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const badges = [
    { icon: ShieldCheck, text: "RERA Certified", color: "text-green-600" },
    { icon: CheckCircle, text: "ISO 27001", color: "text-blue-600" },
    { icon: Star, text: "5 Star Rated", color: "text-yellow-500" },
    { icon: Lock, text: "Data Privacy Compliant", color: "text-purple-600" },
    { icon: Trophy, text: "Award-Winning AI", color: "text-orange-600" },
    { icon: LifeBuoy, text: "24/7 Dedicated Support", color: "text-sky-600" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section ref={ref} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title and Description */}
        <div
          className="text-center mb-12"
        >
          <motion.h2
             initial={{ opacity: 0, y: 20 }}
             animate={isInView ? { opacity: 1, y: 0 } : {}}
             transition={{ duration: 0.6, ease: "easeOut" }}
             className="text-3xl md:text-4xl font-bold font-headline text-slate-800"
          >
            Built on a Foundation of <span className="animate-text-shimmer bg-gradient-to-r from-teal-500 to-blue-600">Trust & Security</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
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
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto"
        >
          {badges.map((badge, index) => (
            <motion.div key={index} variants={itemVariants}>
              <TrustBadge icon={badge.icon} text={badge.text} colorClass={badge.color} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
