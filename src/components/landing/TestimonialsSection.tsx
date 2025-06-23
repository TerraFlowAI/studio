// src/components/landing/TestimonialsSection.tsx
"use client";

import { motion } from "framer-motion";
import { TestimonialCard, type Testimonial } from "@/components/pricing/TestimonialCard";

const testimonials: Testimonial[] = [
  {
    id: "1",
    quote: "TerraFlowAI has completely transformed our lead management. The AI scoring is incredibly accurate and has boosted our conversion rate by over 30%.",
    authorName: "Aarav Sharma",
    authorTitle: "Lead Agent, Zenith Properties",
    authorAvatarUrl: "https://placehold.co/100x100.png?text=AS",
    aiHint: "man portrait"
  },
  {
    id: "2",
    quote: "As a developer, generating CMA reports was always time-consuming. With TerraValuate, I can get data-driven valuation reports in minutes. It's a game-changer.",
    authorName: "Priya Patel",
    authorTitle: "Founder, Skyline Developers",
    authorAvatarUrl: "https://placehold.co/100x100.png?text=PP",
    aiHint: "woman portrait"
  },
   {
    id: "3",
    quote: "The amount of time TerraScribe saves us on writing property descriptions is phenomenal. The content is creative, professional, and gets more engagement.",
    authorName: "Rohan Kumar",
    authorTitle: "Marketing Head, Elite Realty",
    authorAvatarUrl: "https://placehold.co/100x100.png?text=RK",
    aiHint: "man portrait smiling"
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-gradient-to-b from-background to-slate-50 dark:from-slate-900/20 dark:to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-foreground mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            See how professionals and developers are leveraging TerraFlowAI to grow their business.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
             <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
                <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
