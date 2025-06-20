
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Send } from "lucide-react"; // Using Mic for voice input idea
import Image from "next/image";

const WaveformDot = () => <div className="waveform-dot" />;


export function AiAssistantCard() {
  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-xl h-full flex flex-col text-slate-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-teal-400 rounded-full flex items-center justify-center">
          <Image src="https://placehold.co/40x40.png?text=AI" alt="AI Avatar" width={24} height={24} className="rounded-full invert brightness-0 data-ai-hint='abstract geometric'" />
        </div>
        <h2 className="text-xl font-semibold">AI Suggestion</h2>
      </div>

      {/* Animated waveform placeholder */}
      <div className="flex-grow flex flex-col items-center justify-center my-6">
        <div className="relative w-48 h-20 flex items-center justify-center">
            {/* Central pulsing dot */}
            <div className="absolute w-8 h-8 bg-primary/30 rounded-full animate-ping"></div>
            <div className="absolute w-6 h-6 bg-primary/50 rounded-full animate-pulse"></div>
            {/* Simulating sound wave lines - can be enhanced with SVG or more divs */}
            <div className="flex items-center justify-center space-x-1.5 opacity-70">
                <WaveformDot /> <WaveformDot /> <WaveformDot />
                <WaveformDot /> <WaveformDot /> <WaveformDot />
                <WaveformDot /> <WaveformDot /> <WaveformDot />
            </div>
        </div>
      </div>
      
      <p className="text-center text-slate-300 mb-6 text-sm">
        Hi Aman, look at how your sales are going today?
      </p>

      <div className="relative">
        <Input
          type="text"
          placeholder="Ask about hot leads, market risks, or project compliance..."
          className="bg-slate-700 border-slate-600 text-slate-200 placeholder-slate-400 rounded-lg pl-4 pr-20 h-12 text-sm focus:ring-primary focus:border-primary"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary h-9 w-9">
                <Mic className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary h-9 w-9">
                <Send className="h-4 w-4" />
            </Button>
        </div>
      </div>
    </div>
  );
}
