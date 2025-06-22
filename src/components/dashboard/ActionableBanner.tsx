
"use client";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

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

// Simplified banner to show only the first item, matching the static design
export function ActionableBanner({ items }: ActionableBannerProps) {
  if (!items || items.length === 0) {
    return null;
  }

  const currentItem = items[0]; // Always display the first item

  return (
    <div className="p-4 rounded-lg bg-gradient-to-r from-primary/90 to-primary text-primary-foreground shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full">
            <div className="bg-white/20 p-3 rounded-lg shrink-0">
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
            className="bg-white text-primary hover:bg-white/90 hover:text-primary/90 border-none mt-2 sm:mt-0 shrink-0"
        >
            {currentItem.buttonText}
        </Button>
    </div>
  );
}
