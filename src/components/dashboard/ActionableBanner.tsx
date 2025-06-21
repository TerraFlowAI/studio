
"use client";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

export interface BannerItem {
  id: string;
  icon: LucideIcon;
  headline: string;
  subHeadline: string;
  buttonText: string;
  onClick: () => void;
}

interface ActionableBannerProps {
  items: BannerItem[];
}

export function ActionableBanner({ items }: ActionableBannerProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 6000); // Change notification every 6 seconds

    return () => clearInterval(interval);
  }, [items.length]);

  if (!items || items.length === 0) {
    return null;
  }

  const currentItem = items[index];

  return (
    <div className="p-6 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 overflow-hidden relative min-h-[100px] sm:min-h-[92px]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full"
        >
          <div className="flex items-center gap-4 w-full">
            <div className="bg-white/20 p-3 rounded-full shrink-0">
              <currentItem.icon className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{currentItem.headline}</h3>
              <p className="text-sm opacity-90">{currentItem.subHeadline}</p>
            </div>
          </div>
          <Button 
            onClick={currentItem.onClick} 
            variant="outline"
            className="bg-white text-teal-600 hover:bg-white/90 hover:text-teal-700 border-none mt-3 sm:mt-0 shrink-0"
          >
            {currentItem.buttonText}
          </Button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
