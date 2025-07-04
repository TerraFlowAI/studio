
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MailIcon, Construction, Sparkles } from "lucide-react";

export function MarketingEmailGenerator() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-xl flex items-center">
          <MailIcon className="mr-2 h-5 w-5 text-primary" /> Marketing Email / Newsletter Generator
        </CardTitle>
        <CardDescription>
          Craft engaging emails and newsletters for various marketing campaigns.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed m-6 mt-0 rounded-lg">
        <Construction className="h-16 w-16 text-primary/80 mb-4" />
        <p className="text-lg font-semibold text-muted-foreground">Feature Coming Soon!</p>
        <p className="text-sm text-muted-foreground max-w-md mb-4">
          This generator will help you create targeted emails for new listings, price drops, market updates, and more. Stay tuned!
        </p>
        <div className="w-full max-w-md space-y-2 opacity-50">
            <Input placeholder="What is the goal of this email?" disabled />
            <Button disabled className="w-full">
                <Sparkles className="mr-2 h-4 w-4" /> Generate Email
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
