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

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="py-16 md:py-24 bg-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {badges.map((badge, index) => (
            <TrustBadge key={index} icon={badge.icon} text={badge.text} colorClass={badge.color} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
