
"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Quote } from "lucide-react";

interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorTitle: string;
  authorAvatarUrl: string;
  companyLogoUrl: string;
  aiHint: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    quote: "TerraFlowAI has completely transformed our lead management. The AI scoring is incredibly accurate and has boosted our conversion rate by over 30%. It's indispensable.",
    authorName: "Aarav Sharma",
    authorTitle: "Lead Agent, Zenith Properties",
    authorAvatarUrl: "https://placehold.co/100x100.png?text=AS",
    companyLogoUrl: "https://placehold.co/100x40.png?text=Zenith",
    aiHint: "man portrait"
  },
  {
    id: "2",
    quote: "As a developer, generating CMA reports was always a bottleneck. With TerraValuate, I can get data-driven valuation reports in minutes. It's an absolute game-changer for our planning phase.",
    authorName: "Priya Patel",
    authorTitle: "Founder, Skyline Developers",
    authorAvatarUrl: "https://placehold.co/100x100.png?text=PP",
    companyLogoUrl: "https://placehold.co/100x40.png?text=Skyline",
    aiHint: "woman portrait"
  },
   {
    id: "3",
    quote: "The amount of time TerraScribe saves us on writing property descriptions is phenomenal. The content is creative, professional, and consistently gets more engagement online.",
    authorName: "Rohan Kumar",
    authorTitle: "Marketing Head, Elite Realty",
    authorAvatarUrl: "https://placehold.co/100x100.png?text=RK",
    companyLogoUrl: "https://placehold.co/100x40.png?text=Elite",
    aiHint: "man portrait smiling"
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Why Industry Leaders are Choosing TerraFlow
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            See how professionals and developers are leveraging TerraFlowAI to grow their business.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
             <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card className="h-full flex flex-col shadow-lg bg-white p-6 rounded-xl">
                <CardContent className="flex-grow p-0 space-y-4">
                  <Image 
                    src={testimonial.companyLogoUrl} 
                    alt={`${testimonial.authorTitle} logo`}
                    width={100}
                    height={40}
                    className="h-8 w-auto object-contain opacity-60"
                    data-ai-hint="company logo"
                  />
                  <blockquote className="text-lg text-slate-700 leading-relaxed italic border-l-4 border-teal-200 pl-4">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                </CardContent>
                <div className="mt-6 pt-4 flex items-center gap-4">
                  <Image
                    src={testimonial.authorAvatarUrl}
                    alt={testimonial.authorName}
                    width={50}
                    height={50}
                    className="rounded-full"
                    data-ai-hint={testimonial.aiHint}
                  />
                  <div>
                    <p className="font-bold text-slate-800">{testimonial.authorName}</p>
                    <p className="text-sm text-slate-500">{testimonial.authorTitle}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
