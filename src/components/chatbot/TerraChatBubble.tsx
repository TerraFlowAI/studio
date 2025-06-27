"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { TerraLeadChatbot } from "./TerraLeadChatbot";

export function TerraChatBubble() {
  const [isOpen, setIsOpen] = useState(false);

  const VoiceToneIcon = () => (
    <div className="relative h-8 w-8 flex items-center justify-center">
      <Bot className="h-7 w-7 z-10" />
      <div className="absolute h-full w-full rounded-full bg-primary-foreground/20 animate-pulse" style={{ animationDelay: '0s' }}></div>
      <div className="absolute h-full w-full rounded-full bg-primary-foreground/20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
    </div>
  );

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 h-16 w-16 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg z-50",
          "flex items-center justify-center"
        )}
        aria-label={isOpen ? "Close chat" : "Chat with Terra AI"}
      >
        <AnimatePresence mode="wait">
           <motion.div
                key={isOpen ? "close" : "open"}
                initial={{ rotate: -90, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: 90, scale: 0 }}
                transition={{ duration: 0.2 }}
            >
                {isOpen ? <X className="h-8 w-8" /> : <VoiceToneIcon />}
            </motion.div>
        </AnimatePresence>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-40 w-full max-w-sm" // z-40 so button is on top
          >
            <TerraLeadChatbot />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
