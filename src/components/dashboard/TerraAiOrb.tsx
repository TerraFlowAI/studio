// src/components/dashboard/TerraAiOrb.tsx
"use client";

import React, { useState, useEffect, useRef, FormEvent } from 'react';
import dynamic from 'next/dynamic';
import type { Spline as SplineType, Application } from '@splinetool/runtime';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Brain, Mic, MicOff, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { processTerraCommand } from '@/ai/flows/process-terra-command';
import { Skeleton } from '../ui/skeleton';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-full bg-slate-700" />,
});

export function TerraAiOrb({ userName }: { userName: string }) {
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState(`Hi ${userName}! How can I help?`);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const spline = useRef<SplineType>();

  // Function to run when the Spline scene is loaded
  function onLoad(splineApp: Application) {
    spline.current = splineApp as SplineType;
    triggerSplineAnimation('start_idle');
  }

  // Function to trigger animations in the Spline scene
  function triggerSplineAnimation(eventName: 'start_idle' | 'start_listening' | 'start_thinking') {
    if (spline.current) {
      // Emitting a global event for the Spline scene
      spline.current.emitEvent(eventName);
    }
  }

  // Initialize Speech Recognition
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        triggerSplineAnimation('start_listening');
        setAiResponse("Listening...");
      };

      recognition.onresult = (event) => {
        const currentTranscript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        setTranscript(currentTranscript);
      };
      
      recognition.onend = () => {
          setIsListening(false);
          triggerSplineAnimation('start_idle');
          // Use a custom property to get the final transcript, as state update might be async
          const finalTranscript = (recognitionRef.current as any).finalTranscript;
          if (finalTranscript) {
              sendCommandToAI(finalTranscript);
          }
      };

      recognition.onerror = (event) => {
        toast({ variant: "destructive", title: "Voice Error", description: event.error });
        setIsListening(false);
        triggerSplineAnimation('start_idle');
      };
      
      recognitionRef.current = recognition;
    }
  }, [toast]);
  
  // Custom property to hold final transcript
  useEffect(() => {
    if (recognitionRef.current) {
        (recognitionRef.current as any).finalTranscript = transcript;
    }
  }, [transcript]);


  const sendCommandToAI = async (command: string) => {
    if (!command.trim()) return;

    setIsThinking(true);
    triggerSplineAnimation('start_thinking');
    setAiResponse(''); 
    setTranscript(''); 

    try {
        const result = await processTerraCommand({ command });
        setAiResponse(result.responseText);
    } catch(error) {
        const errorMessage = "Sorry, I had trouble processing that. Please try again.";
        setAiResponse(errorMessage);
        toast({variant: "destructive", title: "AI Error", description: (error as Error).message});
    } finally {
        setIsThinking(false);
        triggerSplineAnimation('start_idle');
    }
  };

  const handleToggleListening = () => {
    if (recognitionRef.current) {
        if (isListening) {
            recognitionRef.current.stop();
        } else {
            setTranscript('');
            recognitionRef.current.start();
        }
    } else {
        toast({variant: "destructive", title: "Not Supported", description: "Your browser does not support voice recognition."});
    }
  };
  
  const handleFormSubmit = (e: FormEvent) => {
      e.preventDefault();
      sendCommandToAI(transcript);
  }

  return (
    <Card className="bg-slate-900 border-slate-800 shadow-2xl h-full flex flex-col text-white p-6 justify-between overflow-hidden">
      <div>
        <CardHeader className="p-0 mb-4">
          <CardTitle className="flex items-center gap-3 text-lg text-white">
            <Brain className="text-purple-400" />
            Terra AI Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex flex-col items-center justify-center">
          <div className="w-full h-64 cursor-grab">
            <Spline
              scene="https://prod.spline.design/W0EvPlQZvuX-a4W1/scene.splinecode" 
              onLoad={onLoad}
            />
          </div>
          <p className="text-center text-lg text-gray-300 min-h-[56px] mt-4 leading-relaxed">
            {isThinking ? <span className="italic">Thinking...</span> : aiResponse}
          </p>
        </CardContent>
      </div>

      <form onSubmit={handleFormSubmit} className="relative mt-4">
        <Input
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Ask Terra anything..."
          className="w-full bg-slate-800 rounded-full pl-4 pr-12 py-6 text-base placeholder-gray-400 border-slate-700 focus-visible:ring-purple-500"
          disabled={isListening || isThinking}
        />
        <Button 
          type="button" 
          size="icon"
          onClick={handleToggleListening} 
          className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full w-10 h-10 transition-colors ${
              isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-purple-600 hover:bg-purple-700'
          }`}
          disabled={isThinking}
        >
          {isThinking ? <Loader2 className="h-5 w-5 animate-spin"/> : isListening ? <MicOff className="h-5 w-5"/> : <Mic className="h-5 w-5"/>}
        </Button>
      </form>
    </Card>
  );
}
