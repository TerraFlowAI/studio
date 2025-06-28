
"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Brain, Mic } from "lucide-react";

interface AiAssistantCardProps {
    userName: string;
}

const WavyLine = () => (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 300 100" className="w-full h-auto opacity-20" preserveAspectRatio="none">
            <path 
                d="M 0 50 C 50 20, 100 80, 150 50 C 200 20, 250 80, 300 50" 
                stroke="url(#waveGradient)" 
                strokeWidth="2" 
                fill="none" 
            />
            <defs>
                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{stopColor: 'hsl(var(--primary))', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: 'hsl(var(--accent))', stopOpacity: 1}} />
                </linearGradient>
            </defs>
            <circle cx="270" cy="58" r="3" fill="hsl(var(--primary))" className="animate-pulse" />
        </svg>
    </div>
);


export function AiAssistantCard({ userName }: AiAssistantCardProps) {
  return (
    <Card className="bg-slate-800 p-6 rounded-2xl shadow-xl h-full flex flex-col text-slate-100 relative overflow-hidden border border-slate-700">
      <WavyLine />
      <CardHeader className="p-0 mb-4 z-10">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-teal-400 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-white"/>
            </div>
            <CardTitle className="text-xl font-semibold">AI Suggestion</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex-grow flex flex-col justify-center z-10">
        <p className="text-slate-200 text-lg leading-relaxed mb-6">
           Hi {userName}, look at how your sales are going today?
        </p>
        <div className="relative">
            <Input 
                placeholder="Ask anything..." 
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:ring-primary h-12"
            />
            <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                <Mic className="h-5 w-5"/>
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
