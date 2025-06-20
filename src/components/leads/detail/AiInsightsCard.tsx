
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"; // For radial progress or gauge, a custom component might be needed or a library
import { Lightbulb, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface AiInsightsCardProps {
  leadScore: number;
  scoreSummary: string; // e.g., "This is a **Hot Lead** based on high engagement..."
  nextBestAction: string; // e.g., "Recommendation: Call now to discuss..."
}

const getAIScoreColorClasses = (score: number): string => {
  if (score > 75) return "bg-green-500"; 
  if (score > 40) return "bg-yellow-500"; 
  return "bg-red-500"; 
};

// Basic Radial Progress Bar (can be enhanced)
const RadialProgress = ({ score }: { score: number }) => {
  const circumference = 2 * Math.PI * 28; // 2 * PI * radius (radius is 28 for a 60x60 viewBox with stroke-width 4)
  const offset = circumference - (score / 100) * circumference;
  let strokeColor = "hsl(var(--primary))"; // Default teal
  if (score > 75) strokeColor = "hsl(var(--chart-1))"; // Green
  else if (score > 40) strokeColor = "hsl(var(--chart-3))"; // Yellow
  else strokeColor = "hsl(var(--destructive))"; // Red

  return (
    <div className="relative w-24 h-24">
      <svg className="w-full h-full" viewBox="0 0 60 60">
        <circle
          className="text-muted/30"
          strokeWidth="4"
          stroke="currentColor"
          fill="transparent"
          r="28"
          cx="30"
          cy="30"
        />
        <circle
          style={{ stroke: strokeColor }}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="28"
          cx="30"
          cy="30"
          className="transform -rotate-90 origin-center"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold" style={{ color: strokeColor }}>{score}</span>
      </div>
    </div>
  );
};


export function AiInsightsCard({ leadScore, scoreSummary, nextBestAction }: AiInsightsCardProps) {
  // Simple markdown-like bold parser
  const renderSummary = (summary: string) => {
    const parts = summary.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => 
      part.startsWith('**') && part.endsWith('**') 
        ? <strong key={index} className="font-semibold text-foreground">{part.slice(2, -2)}</strong> 
        : part
    );
  };

  return (
    <Card className="shadow-lg bg-card">
      <CardHeader>
        <CardTitle className="font-headline text-lg text-primary">AI-Powered Intel</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-center">
        <div className="flex justify-center mb-2">
           <RadialProgress score={leadScore} />
        </div>
        <p className="text-sm text-muted-foreground px-2">
          {renderSummary(scoreSummary)}
        </p>
        
        <div className="p-4 bg-primary/10 rounded-lg mt-3">
          <div className="flex items-center text-primary mb-2">
            <Lightbulb className="h-5 w-5 mr-2" />
            <h4 className="font-semibold text-sm">Next Best Action</h4>
          </div>
          <p className="text-xs text-muted-foreground text-left mb-3">{nextBestAction}</p>
          <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            <Phone className="mr-2 h-4 w-4" /> Log Call
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
