"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles } from "lucide-react";
import { motion } from "@/lib/client-motion"; // Updated import
import { useToast } from "@/hooks/use-toast";

export const WaitlistSection = () => {
  const { toast } = useToast();

  return (
    <section className="py-16 md:py-24 bg-background" data-section-view="waitlist">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary/5 via-background to-background p-8 rounded-2xl border border-border shadow-lg"
        >
          <Sparkles className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground mb-4">
            Join the Next Wave of Real Estate AI
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get exclusive early access to our newest features, including predictive market analytics and automated contract generation. Sign up to stay ahead of the curve.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              toast({
                title: "You're on the list!",
                description: "Thanks for joining the TerraFlowAI waitlist. We'll be in touch.",
              });
              (e.target as HTMLFormElement).reset();
            }}
          >
            <Input
              type="email"
              placeholder="Enter your email address"
              className="h-12 text-base flex-grow bg-card"
              required
            />
            <Button
              type="submit"
              size="lg"
              className="h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Send className="mr-2 h-4 w-4" />
              Join Waitlist
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-4">
            We respect your privacy. No spam, just updates on our latest AI tools.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
