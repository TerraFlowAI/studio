"use client";

import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export function TerraChatBubble() {
  const handleClick = () => {
    // In a real implementation, the third-party chat widget (e.g., from Voiceflow)
    // would likely have its own API to open the chat window, or the script would handle this automatically.
    // For this placeholder, we'll just show an alert.
    alert("This would open the 'Terra' AI chat window, powered by your conversational AI service.");
  };

  return (
    <Button
      onClick={handleClick}
      className={cn(
        "fixed bottom-6 right-6 h-16 w-16 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg z-50",
        "flex items-center justify-center",
        "animate-pulse-subtle" // Use existing subtle pulse animation
      )}
      aria-label="Chat with Terra AI"
    >
      <MessageSquare className="h-8 w-8" />
    </Button>
  );
}
