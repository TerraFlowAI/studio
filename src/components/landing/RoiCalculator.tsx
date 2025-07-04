
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export function RoiCalculator() {
  return (
    <section className="py-16 md:py-24 bg-slate-50/50 dark:bg-slate-900/50 text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 font-headline">
            Estimate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">TerraFlow ROI</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            See how much time you can save and revenue you can generate with AI-powered automation.
          </p>
        </div>
        <Card className="shadow-lg">
          <CardContent className="p-10 text-center text-muted-foreground">
            <Sparkles className="mx-auto h-12 w-12 text-primary/30 mb-4" />
            <p className="font-semibold">ROI Calculator is being updated.</p>
            <p className="text-sm">Please check back soon!</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
