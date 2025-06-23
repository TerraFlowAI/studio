
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileTextIcon, Construction, Sparkles } from "lucide-react";

export function BlogPostGenerator() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-xl flex items-center">
          <FileTextIcon className="mr-2 h-5 w-5 text-primary" /> Blog Post / Article Generator
        </CardTitle>
        <CardDescription>
          Develop insightful articles about market trends, neighborhood guides, or home buying/selling tips.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed m-6 mt-0 rounded-lg">
        <Construction className="h-16 w-16 text-primary/80 mb-4" />
        <p className="text-lg font-semibold text-muted-foreground">Feature Coming Soon!</p>
        <p className="text-sm text-muted-foreground max-w-md mb-4">
          This tool will assist you in drafting informative and engaging blog posts to establish your expertise.
        </p>
         <div className="w-full max-w-md space-y-2 opacity-50">
            <Input placeholder="Enter a blog post topic..." disabled />
            <Button disabled className="w-full">
                <Sparkles className="mr-2 h-4 w-4" /> Generate Article
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
