
"use client";

import React,
{ useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Wand2, ChevronRight, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const BeforeAfterAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [beforeText, setBeforeText] = useState(
    "3bhk flat. good location. near metro. new kitchen. balcony. parking available. needs some work. good for family."
  );
  const [afterText, setAfterText] = useState("");

  const exampleOutputs = [
    {
      headline: "✨ Stunning 3-Bedroom Oasis with Metro Access & Modern Kitchen!",
      description: "Discover your dream family home in this exceptionally located 3-bedroom apartment! Boasting a brand-new, chef-inspired kitchen, a private balcony perfect for morning coffee, and dedicated parking, this residence offers unparalleled convenience. Just steps from the metro, your commute will be a breeze. While ready for your personal touch, this gem is an incredible opportunity for families seeking space, style, and a prime address. Don't miss out!"
    },
    {
      headline: "🔑 Prime Location 3BHK: Renovated Kitchen, Balcony & Parking!",
      description: "Unlock the door to comfortable city living in this spacious 3-bedroom flat, ideally situated near public transport. Featuring a recently updated kitchen, a charming balcony, and the convenience of included parking, this property is a fantastic find. Though it offers scope for personalization, its core features and unbeatable location make it perfect for families. Act fast – properties like this are in high demand!"
    }
  ];

  const handleGenerate = async () => {
    if (!beforeText.trim()) {
      // Optionally, show a toast or error message if beforeText is empty
      setAfterText("Please enter some property features to generate a description.");
      return;
    }
    setIsLoading(true);
    setAfterText(""); // Clear previous after text

    // Simulate AI call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Pick a random example
    const randomIndex = Math.floor(Math.random() * exampleOutputs.length);
    const selectedOutput = exampleOutputs[randomIndex];

    setAfterText(`Headline: ${selectedOutput.headline}\n\nDescription: ${selectedOutput.description}`);
    setIsLoading(false);
  };

  return (
    <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-800/30" data-section-view="before-after-ai">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            From Basic Facts to <span className="animate-text-shimmer-strong">Compelling Listings</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            See how TerraScribe™ AI transforms your raw property notes into captivating marketing copy in seconds.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="font-headline text-xl text-muted-foreground/80">Your Raw Notes (Before AI)</CardTitle>
              <CardDescription>Enter basic property features and details.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="e.g., 2 bed, 2 bath, sea view, near park..."
                value={beforeText}
                onChange={(e) => setBeforeText(e.target.value)}
                rows={8}
                className="mb-4 text-sm bg-background"
              />
              <Button onClick={handleGenerate} disabled={isLoading || !beforeText.trim()} className="w-full text-base py-6 group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                {isLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                )}
                {isLoading ? 'TerraScribing...' : 'Generate with AI'}
              </Button>
            </CardContent>
          </Card>

          <div className="relative">
            <div className={cn(
              "absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 p-2 bg-background rounded-full shadow-lg border border-border transition-opacity duration-500",
              isLoading ? "opacity-0" : "opacity-100"
            )}>
              <ChevronRight className="h-6 w-6 text-primary" />
            </div>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-primary/30 min-h-[300px]">
              <CardHeader>
                <CardTitle className="font-headline text-xl flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-primary animate-pulse" />
                  AI-Generated Content (After AI)
                </CardTitle>
                <CardDescription>Engaging headline and description ready to use.</CardDescription>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loader"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col items-center justify-center h-40 text-muted-foreground"
                    >
                      <Loader2 className="h-10 w-10 animate-spin text-primary mb-3" />
                      <p>Crafting compelling content...</p>
                    </motion.div>
                  ) : afterText ? (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="whitespace-pre-wrap p-4 bg-primary/5 rounded-md border border-primary/20 text-sm text-foreground"
                    >
                      {afterText}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center h-40 text-center text-muted-foreground border-2 border-dashed border-border/70 rounded-lg p-4"
                    >
                       <Wand2 className="h-10 w-10 text-primary/40 mb-3" />
                       <p>Your AI-generated property description and headline will appear here.</p>
                       <p className="text-xs mt-1">Try inputting some features on the left and click "Generate"!</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterAI;
