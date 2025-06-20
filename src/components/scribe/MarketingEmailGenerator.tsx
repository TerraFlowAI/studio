
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MailIcon, Construction } from "lucide-react";

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
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <Construction className="h-16 w-16 text-primary/80 mb-4" />
        <p className="text-lg font-semibold text-muted-foreground">Feature Coming Soon!</p>
        <p className="text-sm text-muted-foreground max-w-md">
          This generator will help you create targeted emails for new listings, price drops, market updates, and more. Stay tuned!
        </p>
      </CardContent>
    </Card>
  );
}
