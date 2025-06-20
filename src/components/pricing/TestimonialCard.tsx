
"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorTitle: string;
  authorAvatarUrl: string;
  aiHint: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="h-full flex flex-col shadow-lg bg-card border border-border p-6 text-center md:text-left">
      <CardContent className="flex-grow p-0 space-y-4">
        <Quote className="w-8 h-8 text-primary/30 mx-auto md:mx-0" />
        <blockquote className="text-lg text-foreground leading-relaxed italic">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
      </CardContent>
      <div className="mt-6 pt-4 border-t border-border flex flex-col md:flex-row items-center gap-3 justify-center md:justify-start">
        <Image
          src={testimonial.authorAvatarUrl}
          alt={testimonial.authorName}
          width={50}
          height={50}
          className="rounded-full"
          data-ai-hint={testimonial.aiHint}
        />
        <div>
          <p className="font-semibold text-foreground">{testimonial.authorName}</p>
          <p className="text-sm text-muted-foreground">{testimonial.authorTitle}</p>
        </div>
      </div>
    </Card>
  );
}
