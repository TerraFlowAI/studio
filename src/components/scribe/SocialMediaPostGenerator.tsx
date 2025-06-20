
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Share2Icon, Construction } from "lucide-react";

export function SocialMediaPostGenerator() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-xl flex items-center">
          <Share2Icon className="mr-2 h-5 w-5 text-primary" /> Social Media Post Generator
        </CardTitle>
        <CardDescription>
          Create catchy posts for platforms like Instagram, Facebook, LinkedIn, and X (Twitter).
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <Construction className="h-16 w-16 text-primary/80 mb-4" />
        <p className="text-lg font-semibold text-muted-foreground">Feature Coming Soon!</p>
        <p className="text-sm text-muted-foreground max-w-md">
          Generate platform-optimized social media content to showcase your listings and engage your audience.
        </p>
      </CardContent>
    </Card>
  );
}
