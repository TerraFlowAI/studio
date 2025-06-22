"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface AiAssistantCardProps {
    message: string;
}

export function AiAssistantCard({ message }: AiAssistantCardProps) {
  return (
    <Card className="bg-slate-800 p-6 rounded-xl shadow-xl h-full flex flex-col text-slate-100">
      <CardHeader className="p-0 mb-4">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-teal-400 rounded-full flex items-center justify-center relative">
                <div className="w-3 h-3 bg-white rounded-full animate-ping absolute"></div>
                <div className="w-2 h-2 bg-white rounded-full absolute"></div>
            </div>
            <CardTitle className="text-xl font-semibold">AI Assistant</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex-grow flex flex-col justify-center">
        <p className="text-slate-300 text-sm leading-relaxed">
           {message}
        </p>
      </CardContent>
    </Card>
  );
}
