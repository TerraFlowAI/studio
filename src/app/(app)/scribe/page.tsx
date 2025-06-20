
"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { HomeIcon, MailIcon, Share2Icon, FileTextIcon, FileSignatureIcon, Sparkles, Wand2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Import Generator Components
import { PropertyDescriptionGenerator } from "@/components/scribe/PropertyDescriptionGenerator";
import { MarketingEmailGenerator } from "@/components/scribe/MarketingEmailGenerator";
import { SocialMediaPostGenerator } from "@/components/scribe/SocialMediaPostGenerator";
import { BlogPostGenerator } from "@/components/scribe/BlogPostGenerator";
import { ContractGenerator } from "@/components/scribe/ContractGenerator";

type GeneratorType = 
  | "propertyDescription"
  | "marketingEmail"
  | "socialMediaPost"
  | "blogPost"
  | "contractGeneration";

interface GeneratorMenuItem {
  id: GeneratorType;
  label: string;
  icon: LucideIcon;
  component: React.FC;
  isPro?: boolean;
}

const generatorMenuItems: GeneratorMenuItem[] = [
  { id: "propertyDescription", label: "Property Listing Description", icon: HomeIcon, component: PropertyDescriptionGenerator },
  { id: "marketingEmail", label: "Marketing Email / Newsletter", icon: MailIcon, component: MarketingEmailGenerator },
  { id: "socialMediaPost", label: "Social Media Post", icon: Share2Icon, component: SocialMediaPostGenerator },
  { id: "blogPost", label: "Blog Post / Article", icon: FileTextIcon, component: BlogPostGenerator },
  { id: "contractGeneration", label: "Contract Generation", icon: FileSignatureIcon, component: ContractGenerator, isPro: true },
];

export default function ScribeStudioPage() {
  const [selectedGenerator, setSelectedGenerator] = React.useState<GeneratorType>("propertyDescription");

  const ActiveGeneratorComponent = generatorMenuItems.find(item => item.id === selectedGenerator)?.component || (() => <div>Select a generator</div>);

  return (
    <div className="container mx-auto">
      <PageHeader
        title="TerraScribe™ AI Studio"
        description="Your AI-powered partner for creating compelling content and secure documents."
      />

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column: Generator Menu */}
        <div className="lg:col-span-3">
          <Card className="shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="font-headline text-lg text-primary">Choose a Generator</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <nav className="space-y-1">
                {generatorMenuItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={selectedGenerator === item.id ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start text-left h-auto py-2.5 px-3",
                      selectedGenerator === item.id 
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "text-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                    onClick={() => setSelectedGenerator(item.id)}
                  >
                    <item.icon className={cn("h-5 w-5 mr-3 shrink-0", 
                        selectedGenerator === item.id ? "text-primary-foreground" : "text-primary/80"
                    )} />
                    <span className="flex-grow">{item.label}</span>
                    {item.isPro && (
                      <span className="ml-auto text-xs font-semibold bg-yellow-400/20 text-yellow-600 dark:text-yellow-300 px-1.5 py-0.5 rounded-sm">
                        PRO
                      </span>
                    )}
                  </Button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Workspace */}
        <div className="lg:col-span-9">
          <ActiveGeneratorComponent />
        </div>
      </div>
    </div>
  );
}
