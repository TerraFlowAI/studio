
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Share2Icon, Construction, Sparkles } from "lucide-react";

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
      <CardContent className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed m-6 mt-0 rounded-lg">
        <Construction className="h-16 w-16 text-primary/80 mb-4" />
        <p className="text-lg font-semibold text-muted-foreground">Feature Coming Soon!</p>
        <p className="text-sm text-muted-foreground max-w-md mb-4">
          Generate platform-optimized social media content to showcase your listings and engage your audience.
        </p>
         <div className="w-full max-w-md space-y-2 opacity-50">
            <Input placeholder="Enter key info for the post..." disabled />
            <Button disabled className="w-full">
                <Sparkles className="mr-2 h-4 w-4" /> Generate Post
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
