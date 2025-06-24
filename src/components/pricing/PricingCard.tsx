
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
  variant: 'default' | 'outline' | 'dark';
}

interface PricingCardProps {
  plan: PricingPlan;
}

export function PricingCard({ plan }: PricingCardProps) {
  return (
    <Card className={cn(
      "flex flex-col h-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1",
      plan.isPopular && "border-2 border-primary ring-4 ring-primary/10 shadow-primary/20 scale-105"
    )}>
      {plan.isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <div className="bg-primary text-primary-foreground px-4 py-1 text-sm font-semibold rounded-full shadow-md flex items-center gap-1">
            <Zap className="w-4 h-4"/> Most Popular
          </div>
        </div>
      )}
      <CardHeader className="pb-4 pt-8">
        <CardTitle className="font-headline text-2xl text-primary mb-1">{plan.name}</CardTitle>
        <div className="flex items-baseline min-h-[44px]">
          <span className="text-4xl font-bold text-foreground">{plan.price}</span>
          <span className="text-muted-foreground ml-1.5">{plan.priceFrequency}</span>
        </div>
        <CardDescription className="text-sm min-h-[40px] pt-1">{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow border-t pt-6">
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
            plan.variant === 'default' && "bg-primary hover:bg-primary/90 text-primary-foreground",
            plan.variant === 'outline' && "bg-secondary hover:bg-secondary/80 text-secondary-foreground",
            plan.variant === 'dark' && "bg-slate-800 hover:bg-slate-900 text-white"
          )}
        >
          <Link href={plan.ctaLink}>{plan.ctaText}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
