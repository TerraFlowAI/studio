
"use client";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ActionableBannerProps {
  icon: LucideIcon;
  headline: string;
  subHeadline: string;
  buttonText: string;
  onClick: () => void;
}

export function ActionableBanner({ icon: Icon, headline, subHeadline, buttonText, onClick }: ActionableBannerProps) {
  return (
    <div className="p-6 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="bg-white/20 p-3 rounded-full">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{headline}</h3>
          <p className="text-sm opacity-90">{subHeadline}</p>
        </div>
      </div>
      <Button 
        onClick={onClick} 
        variant="outline"
        className="bg-white text-teal-600 hover:bg-white/90 hover:text-teal-700 border-none mt-3 sm:mt-0 shrink-0"
      >
        {buttonText}
      </Button>
    </div>
  );
}
