
"use client";

import { motion } from "framer-motion";
import { FileText, BrainCircuit, BarChart3 } from "lucide-react";
import type { LucideProps } from "lucide-react";
import React from 'react'; // Ensure React is imported for JSX

interface AIDemoVisualProps {
  // Props can be added later if variations per feature are needed
}

const Node = ({
  icon: Icon,
  label,
  delay,
  iconColorClass = "text-white",
  backgroundImageStyle,
}: {
  icon: React.ComponentType<LucideProps>;
  label: string;
  delay: number;
  iconColorClass?: string;
  backgroundImageStyle: React.CSSProperties['backgroundImage'];
}) => (
  <motion.div
    className="relative flex flex-col items-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <div
      className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-lg animate-pulse-custom"
      style={{
        backgroundImage: backgroundImageStyle,
        animationDelay: `${delay + 0.5}s`
      }}
    >
      <Icon className={`w-8 h-8 md:w-10 md:h-10 ${iconColorClass}`} />
      {/* Ripple Effect */}
      <div className="absolute inset-0 rounded-full animate-ripple-custom" style={{ animationDelay: `${delay + 0.7}s` }}></div>
    </div>
    <span className="mt-2 text-xs md:text-sm text-foreground/80 font-medium">
      {label}
    </span>
  </motion.div>
);

const ConnectingLine = ({ delay }: { delay: number }) => (
  <motion.div
    className="h-1 md:h-1.5 w-12 md:w-20 rounded-full animate-data-flow-custom mx-1 md:mx-2"
    initial={{ scaleX: 0, opacity: 0 }}
    animate={{ scaleX: 1, opacity: 1 }}
    transition={{ duration: 0.5, delay }}
    style={{ transformOrigin: "left" }}
  ></motion.div>
);

export const AIDemoVisual: React.FC<AIDemoVisualProps> = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative p-4 md:p-0 my-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-shimmer">
          TerraFlow AI: Data to Decisions
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0 mb-8 md:mb-12">
        <Node
          icon={FileText}
          label="Input Data"
          delay={0.2}
          backgroundImageStyle="linear-gradient(to bottom right, var(--gradient-teal-start), var(--gradient-teal-end))"
          iconColorClass="text-white"
        />
        <ConnectingLine delay={0.5} />
        <Node
          icon={BrainCircuit}
          label="AI Processing"
          delay={0.8}
          backgroundImageStyle="linear-gradient(to bottom right, var(--gradient-purple-blue-start), var(--gradient-purple-blue-end))"
          iconColorClass="text-white"
        />
        <ConnectingLine delay={1.1} />
        <Node
          icon={BarChart3}
          label="Valuable Insights"
          delay={1.4}
          backgroundImageStyle="linear-gradient(to bottom right, var(--gradient-teal-start), var(--gradient-teal-end))"
          iconColorClass="text-white"
        />
      </div>
    </div>
  );
};
