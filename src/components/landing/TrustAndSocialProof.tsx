"use client";

import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { ShieldCheck, CheckCircle, Star, Users } from "lucide-react";
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

// --- Animated Counter Component ---
const Counter = ({ from, to, prefix = "", suffix = "", colorClass }: { from: number; to: number; prefix?: string; suffix?: string; colorClass: string; }) => {
    const nodeRef = useRef<HTMLParagraphElement>(null);
    const inView = useInView(nodeRef, { once: true, margin: "-50px" });

    useEffect(() => {
        if (inView && nodeRef.current) {
            const node = nodeRef.current;
            const controls = animate(from, to, {
                duration: 2.5,
                ease: "easeOut",
                onUpdate(value) {
                    node.textContent = `${prefix}${parseFloat(value.toFixed(0)).toLocaleString('en-IN')}${suffix}`;
                },
            });
            return () => controls.stop();
        }
    }, [from, to, prefix, suffix, inView]);

    const initialText = `${prefix}${from.toLocaleString('en-IN')}${suffix}`;

    return <p ref={nodeRef} className={cn("text-4xl md:text-5xl font-bold tracking-tight", colorClass)}>{initialText}</p>;
};


// --- Main Section Component ---
export function TrustAndSocialProof() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const badges = [
    { icon: ShieldCheck, text: "RERA Certified", color: "text-green-600" },
    { icon: CheckCircle, text: "ISO 27001", color: "text-blue-600" },
    { icon: Star, text: "5 Star Rated", color: "text-yellow-500" },
    { icon: Users, text: "10,000+ Users", color: "text-purple-600" },
  ];

  const metrics = [
    { from: 0, to: 500, prefix: "₹", suffix: "Cr+", description: "Total Property Value Managed", color: "text-blue-600" },
    { from: 0, to: 15000, suffix: "+", description: "Successful Transactions", color: "text-green-600" },
    { from: 0, to: 98, suffix: "%", description: "Customer Satisfaction Rate", color: "text-teal-600" },
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          {badges.map((badge, index) => (
            <TrustBadge key={index} icon={badge.icon} text={badge.text} colorClass={badge.color} />
          ))}
        </div>

        {/* Key Metrics */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center max-w-5xl mx-auto">
          {metrics.map((metric, index) => (
            <div key={index} className="flex flex-col items-center">
              <Counter from={metric.from} to={metric.to} prefix={metric.prefix} suffix={metric.suffix} colorClass={metric.color} />
              <p className="mt-2 text-sm text-slate-500">{metric.description}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
