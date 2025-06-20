
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Zap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface PricingPlan {
  name: string;
  price: string;
  priceFrequency: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  isPopular?: boolean;
  isEnterprise?: boolean;
}

interface PricingCardProps {
  plan: PricingPlan;
}

export function PricingCard({ plan }: PricingCardProps) {
  return (
    <Card className={cn(
      "flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300",
      plan.isPopular && "border-2 border-primary ring-2 ring-primary/20 shadow-primary/10"
    )}>
      {plan.isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <div className="bg-primary text-primary-foreground px-4 py-1 text-xs font-semibold rounded-full shadow-md flex items-center gap-1">
            <Zap className="w-3 h-3"/> Popular Choice
          </div>
        </div>
      )}
      <CardHeader className="pb-4 pt-8">
        <CardTitle className="font-headline text-2xl text-primary mb-1">{plan.name}</CardTitle>
        <div className="flex items-baseline">
          <span className="text-4xl font-bold text-foreground">{plan.price}</span>
          <span className="text-muted-foreground ml-1">{plan.priceFrequency}</span>
        </div>
        <CardDescription className="text-sm min-h-[40px]">{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="mt-auto pt-6">
        <Button 
          asChild 
          className={cn(
            "w-full text-lg py-6",
            plan.isPopular ? "bg-primary hover:bg-primary/90 text-primary-foreground" : "bg-secondary hover:bg-secondary/80 text-secondary-foreground",
            plan.isEnterprise && "bg-slate-700 hover:bg-slate-800 text-white"
          )}
        >
          <Link href={plan.ctaLink}>{plan.ctaText}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
