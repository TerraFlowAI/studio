"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  title: string;
  faqs: FaqItem[];
}

export function FaqSection({ title, faqs }: FaqSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-slate-50/50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-10 text-slate-800 dark:text-slate-100">
          {title}
        </h2>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-border rounded-lg shadow-sm px-6"
            >
              <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline py-4 group">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pt-0 pb-4 text-muted-foreground text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
