"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HelpCircle, BookOpen, MessageSquare, Info, Users, Search, ExternalLink, Construction, PlayCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';

interface SupportResource {
  icon: React.ElementType;
  title: string;
  description: string;
  ctaText: string;
  action: (() => void) | string;
  isComingSoon?: boolean;
}

export default function HelpSupportPage() {
  const { toast } = useToast();

  const handleComingSoon = (featureName: string) => {
    toast({
      title: "Feature Coming Soon!",
      description: `${featureName} is currently under development. Check back later!`,
    });
  };

  const supportResources: SupportResource[] = [
    {
      icon: PlayCircle,
      title: "Restart Onboarding Tour",
      description: "Re-take the interactive guided tour to refresh your memory of the dashboard's key features.",
      ctaText: "Start Tour",
      action: "/dashboard?tour=true",
      isComingSoon: false,
    },
    {
      icon: BookOpen,
      title: "Knowledge Base",
      description: "Find detailed articles, tutorials, and answers to frequently asked questions.",
      ctaText: "Browse Articles",
      action: () => handleComingSoon("Knowledge Base"),
      isComingSoon: true,
    },
    {
      icon: HelpCircle,
      title: "FAQs",
      description: "Quick answers to common questions about TerraFlowAI features and billing.",
      ctaText: "View FAQs",
      action: () => handleComingSoon("FAQs section"),
      isComingSoon: true,
    },
    {
      icon: MessageSquare,
      title: "Contact Support",
      description: "Need personalized assistance? Our support team is ready to help.",
      ctaText: "Submit a Ticket",
      action: () => handleComingSoon("Support Ticket System"),
      isComingSoon: true,
    },
    {
      icon: Info,
      title: "Product Updates",
      description: "Stay informed about the latest features, improvements, and announcements.",
      ctaText: "View Changelog",
      action: () => handleComingSoon("Changelog / Product Updates"),
      isComingSoon: true,
    },
    {
      icon: Users,
      title: "Community Forum",
      description: "Connect with other TerraFlowAI users, share tips, and ask questions.",
      ctaText: "Visit Forum",
      action: () => handleComingSoon("Community Forum"),
      isComingSoon: true,
    },
  ];

  return (
    <div className="container mx-auto">
      <PageHeader
        title="Help & Support Center"
        description="Your central hub for assistance, learning resources, and product information."
      />

      <Card className="mb-8 shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl flex items-center">
            <Search className="mr-2 h-5 w-5 text-primary" />
            Search Our Resources
          </CardTitle>
          <CardDescription>
            Looking for something specific? Type your query below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              type="search"
              placeholder="E.g., How to create a SmartFlow, billing questions..."
              className="flex-grow"
            />
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Search</Button>
          </div>
           <p className="text-xs text-muted-foreground mt-2 text-center">Search functionality is under development.</p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {supportResources.map((resource, index) => (
          <Card key={index} className="shadow-lg flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <resource.icon className="h-8 w-8 text-primary" />
                <CardTitle className="font-headline text-lg">{resource.title}</CardTitle>
              </div>
              <CardDescription className="text-sm min-h-[40px]">{resource.description}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto pt-4 border-t">
              <Button 
                asChild={typeof resource.action === 'string'}
                variant="outline" 
                className="w-full" 
                onClick={() => typeof resource.action === 'function' && resource.action()}
                disabled={resource.isComingSoon}
              >
                {typeof resource.action === 'string' ? (
                  <Link href={resource.action}>
                    {resource.ctaText}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                ) : (
                  <>
                    {resource.ctaText}
                    {resource.isComingSoon && <Construction className="ml-2 h-4 w-4 opacity-50" />}
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
