"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorTitle: string;
  authorInitials: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    quote: "TerraFlowAI has completely transformed our lead management. The AI scoring is incredibly accurate and has boosted our conversion rate by over 30%. It's indispensable.",
    authorName: "Aarav Sharma",
    authorTitle: "Lead Agent, Zenith Properties",
    authorInitials: "AS",
  },
  {
    id: "2",
    quote: "As a developer, generating CMA reports was always a bottleneck. With TerraValuate, I can get data-driven valuation reports in minutes. It's an absolute game-changer for our planning phase.",
    authorName: "Priya Patel",
    authorTitle: "Founder, Skyline Developers",
    authorInitials: "PP",
  },
   {
    id: "3",
    quote: "The amount of time TerraScribe saves us on writing property descriptions is phenomenal. The content is creative, professional, and consistently gets more engagement online.",
    authorName: "Rohan Kumar",
    authorTitle: "Marketing Head, Elite Realty",
    authorInitials: "RK",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-slate-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Why Industry <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">Leaders</span> are Choosing TerraFlow
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
                  <Quote className="h-8 w-8 text-primary/20" />
                  <blockquote className="text-lg text-slate-700 leading-relaxed italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                </CardContent>
                <div className="mt-6 pt-6 border-t flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">{testimonial.authorInitials}</AvatarFallback>
                  </Avatar>
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
