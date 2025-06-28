
"use client";
import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mic, Send, Loader2, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useToast } from '@/hooks/use-toast';
import { processTerraCommand } from '@/ai/flows/process-terra-command';

interface AiAssistantCardProps {
    userName: string;
}

type AiStatus = "idle" | "listening" | "thinking" | "speaking";

// A new component for the animated waveform
const AudioWaveform = ({ status }: { status: AiStatus }) => {
  const idleVariants = {
    animate: {
      d: [
        "M 0 50 Q 50 30, 100 50 T 200 50",
        "M 0 50 Q 50 70, 100 50 T 200 50",
        "M 0 50 Q 50 30, 100 50 T 200 50",
      ],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    },
  };
  const listeningVariants = {
    animate: {
      d: [
        "M 0 50 Q 50 10, 100 50 T 200 50",
        "M 0 50 Q 50 90, 100 50 T 200 50",
        "M 0 50 Q 50 10, 100 50 T 200 50",
      ],
      transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" },
    },
  };
   const thinkingVariants = {
    animate: {
      d: [
        "M 0 50 Q 25 20, 50 50 T 100 50 T 150 50 T 200 50",
        "M 0 50 Q 25 80, 50 50 T 100 50 T 150 50 T 200 50",
        "M 0 50 Q 25 20, 50 50 T 100 50 T 150 50 T 200 50",
      ],
      transition: { duration: 1.5, repeat: Infinity, ease: "linear" },
    },
  };
  
  const statusMap = {
      idle: idleVariants,
      listening: listeningVariants,
      thinking: thinkingVariants,
      speaking: listeningVariants, // reuse listening for speaking visual
  };

  return (
    <svg viewBox="0 0 200 100" className="w-full h-auto absolute inset-0 opacity-50">
      <motion.path
        variants={statusMap[status]}
        animate="animate"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        style={{ transitionDelay: '0.2s' }}
      />
       <motion.path
        variants={statusMap[status]}
        animate="animate"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        style={{ transitionDelay: '0.4s', opacity: 0.7 }}
      />
    </svg>
  );
};


export function AiAssistantCard({ userName }: AiAssistantCardProps) {
  const { toast } = useToast();
  const [status, setStatus] = useState<AiStatus>("idle");
  const [inputText, setInputText] = useState("");
  const [aiResponse, setAiResponse] = useState(`Hi ${userName}, how can I help you dominate your market today?`);

  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Speech Recognition setup (client-side only)
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setStatus("listening");
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        setInputText(transcript);
      };
      
      recognition.onend = () => {
          setStatus("thinking");
      };

      recognition.onerror = (event) => {
        toast({ variant: "destructive", title: "Voice Error", description: event.error });
        setStatus("idle");
      };
      
      recognitionRef.current = recognition;
    }
  }, [toast]);
  
  // Effect to process command when listening stops
  useEffect(() => {
    if (status === 'thinking' && inputText) {
      processCommand(inputText);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);


  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) {
        toast({variant: "destructive", title: "Not Supported", description: "Your browser does not support speech synthesis."});
        setStatus("idle");
        return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => setStatus("speaking");
    utterance.onend = () => setStatus("idle");
    utterance.onerror = () => {
        setStatus("idle");
        toast({variant: "destructive", title: "Speech Error", description: "Could not speak the response."});
    };
    window.speechSynthesis.speak(utterance);
  }

  const processCommand = async (command: string) => {
    if (!command.trim()) {
        setStatus("idle");
        return;
    }
    setStatus("thinking");
    try {
        const result = await processTerraCommand({ command });
        setAiResponse(result.responseText);
        speak(result.responseText);
    } catch(error) {
        const errorMessage = "Sorry, I had trouble processing that. Please try again.";
        setAiResponse(errorMessage);
        speak(errorMessage);
        toast({variant: "destructive", title: "AI Error", description: (error as Error).message});
    }
  };

  const handleMicClick = () => {
    if (status === "listening") {
      recognitionRef.current?.stop();
      setStatus("idle");
    } else {
      if(recognitionRef.current) {
         setInputText("");
         recognitionRef.current.start();
      } else {
          toast({variant: "destructive", title: "Not Supported", description: "Your browser does not support voice recognition."});
      }
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    processCommand(inputText);
  };

  const getOrbIcon = () => {
      switch(status) {
          case "thinking":
              return <Loader2 className="h-8 w-8 text-primary animate-spin" />;
          case "listening":
          case "speaking":
              return <Mic className="h-8 w-8 text-primary" />;
          default:
              return <Bot className="h-8 w-8 text-primary" />;
      }
  }

  return (
    <Card className="relative bg-slate-900 border-slate-700/50 rounded-2xl shadow-2xl h-full flex flex-col text-white overflow-hidden group">
      <div className="absolute -inset-px bg-gradient-to-r from-teal-500 via-sky-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-md"></div>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 via-sky-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-lg"></div>

      <CardContent className="relative p-6 flex-grow flex flex-col items-center justify-between">
        
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-sky-900/50 to-slate-900 rounded-full animate-pulse-subtle"></div>
          <div className="absolute inset-2 rounded-full shadow-[inset_0_4px_15px_rgba(0,0,0,0.4)]"></div>
          <div className="relative w-3/4 h-3/4"><AudioWaveform status={status} /></div>
          <div className="absolute w-20 h-20 bg-primary/20 rounded-full blur-2xl"></div>
          <div className="absolute z-10">{getOrbIcon()}</div>
        </div>

        <div className="text-center my-6 min-h-[48px] flex items-center justify-center">
            <AnimatePresence mode="wait">
                <motion.p 
                  key={aiResponse}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-lg text-slate-200" 
                  style={{ textShadow: '0 0 8px hsla(var(--primary), 0.5)' }}
                >
                    {aiResponse}
                </motion.p>
            </AnimatePresence>
        </div>

        <form onSubmit={handleFormSubmit} className="w-full relative">
            <Input 
                placeholder='Ask Terra anything...'
                className="bg-slate-800/80 border-slate-700 text-white placeholder:text-slate-400 focus:ring-primary h-12 rounded-full pl-5 pr-20"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={status !== 'idle' && status !== 'listening'}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <Button type="submit" variant="ghost" size="icon" className="text-slate-300 hover:text-white hover:bg-primary/20 rounded-full" disabled={!inputText || status === 'thinking'}>
                   <Send className="h-5 w-5"/>
                   <span className="sr-only">Submit Command</span>
                </Button>
                <Button type="button" onClick={handleMicClick} variant="ghost" size="icon" className="text-slate-300 hover:text-white hover:bg-primary/20 rounded-full">
                    <Mic className="h-5 w-5"/>
                    <span className="sr-only">Use Voice Command</span>
                </Button>
            </div>
        </form>
      </CardContent>
    </Card>
  );
}
