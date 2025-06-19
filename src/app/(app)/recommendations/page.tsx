"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/PageHeader";
import { useToast } from "@/hooks/use-toast";
import { suggestProperties, SuggestPropertiesInput, SuggestPropertiesOutput } from "@/ai/flows/suggest-properties";
import { useState } from "react";
import { Loader2, Sparkles, Search } from "lucide-react";
import Image from "next/image";

const formSchema = z.object({
  preferences: z.string().min(10, "Please describe preferences in more detail (at least 10 characters)."),
  browsingHistory: z.string().optional(),
});

interface RecommendedProperty {
  name: string;
  price: string;
  location: string;
  features: string[];
  imageUrl: string;
}

// Helper to parse AI output (example structure)
const parseRecommendations = (text: string): RecommendedProperty[] => {
  // This is a placeholder parser. Actual implementation would depend on AI output format.
  // For now, let's assume AI returns a list of properties in a structured way or plain text.
  // Example: "1. Sunnyvale Villa, $500k, Downtown, [Pool, Garden]\n2. Lakeside Condo, $350k, West Suburbs, [Gym, Lake View]"
  const properties: RecommendedProperty[] = [];
  const lines = text.split('\n').filter(line => line.trim() !== '');
  lines.forEach(line => {
    const parts = line.match(/^(\d+\.\s*)?(.*?), (\$.*?), (.*?), \[(.*?)\]$/);
    if (parts && parts.length >= 5) {
      properties.push({
        name: parts[2]?.trim() || "Unknown Property",
        price: parts[3]?.trim() || "N/A",
        location: parts[4]?.trim() || "N/A",
        features: parts[5]?.split(',').map(f => f.trim()) || [],
        imageUrl: `https://placehold.co/300x200.png` // Placeholder image
      });
    } else if (line.includes(',')) { // Fallback for less structured lines
        const simpleParts = line.split(',');
        properties.push({
            name: simpleParts[0]?.replace(/^\d+\.\s*/, '').trim() || "Unknown Property",
            price: simpleParts[1]?.trim() || "N/A",
            location: simpleParts[2]?.trim() || "N/A",
            features: simpleParts[3]?.split(';').map(f => f.trim()) || [],
            imageUrl: `https://placehold.co/300x200.png`
        });
    }
  });
  if (properties.length === 0 && text.length > 0) {
    // If parsing fails but there's text, show it as a general recommendation
     properties.push({
        name: "General Recommendation",
        price: "",
        location: "",
        features: [text.substring(0, 200) + (text.length > 200 ? "..." : "")],
        imageUrl: `https://placehold.co/300x200.png`
     });
  }
  return properties;
};


export default function RecommendationsPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<SuggestPropertiesOutput | null>(null);
  const [parsedProperties, setParsedProperties] = useState<RecommendedProperty[]>([]);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preferences: "",
      browsingHistory: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setRecommendations(null);
    setParsedProperties([]);
    try {
      const input: SuggestPropertiesInput = {
        preferences: values.preferences,
        browsingHistory: values.browsingHistory || "No specific browsing history provided.",
      };
      const result = await suggestProperties(input);
      setRecommendations(result);
      setParsedProperties(parseRecommendations(result.propertyRecommendations));
      toast({
        title: "Recommendations Ready!",
        description: "Personalized property suggestions have been generated.",
      });
    } catch (error) {
      console.error("Error generating recommendations:", error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "Could not generate recommendations. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto">
      <PageHeader
        title="Personalized Property Recommendations"
        description="Discover properties tailored to your preferences and behavior using AI."
      />
      <div className="grid md:grid-cols-3 gap-8">
        <Card className="md:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Your Preferences</CardTitle>
            <CardDescription>Tell us what you&apos;re looking for.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="preferences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Describe your ideal property</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., 3-bedroom house in a quiet neighborhood, near good schools, with a budget of $500k. Likes modern kitchens and a backyard."
                          {...field}
                          rows={6}
                        />
                      </FormControl>
                      <FormDescription>Include location, price range, property type, desired features, etc.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="browsingHistory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Browsing History (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Viewed properties in downtown, saved searches for condos under $400k."
                          {...field}
                          rows={3}
                        />
                      </FormControl>
                      <FormDescription>Any past activity that might help us refine suggestions.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Search className="mr-2 h-5 w-5" />}
                  {isLoading ? "Finding Properties..." : "Get Recommendations"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Suggested Properties</CardTitle>
              <CardDescription>AI-powered suggestions based on your input.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading && (
                <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                  <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                  <p>Searching for the best matches... Please wait.</p>
                </div>
              )}
              {!isLoading && !recommendations && (
                <div className="flex flex-col items-center justify-center h-64 text-muted-foreground border-2 border-dashed rounded-lg">
                  <Sparkles className="h-16 w-16 text-primary/30 mb-4" />
                  <p>Your property recommendations will appear here.</p>
                </div>
              )}
              {!isLoading && recommendations && (
                <div className="space-y-6">
                  {recommendations.reasoning && (
                    <Card className="bg-accent/10 border-accent/30">
                      <CardHeader>
                        <CardTitle className="text-md text-accent-foreground/80 flex items-center"><Lightbulb className="text-accent mr-2 h-5 w-5" /> AI Reasoning</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-accent-foreground/70">{recommendations.reasoning}</p>
                      </CardContent>
                    </Card>
                  )}
                  {parsedProperties.length > 0 ? (
                    <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
                      {parsedProperties.map((prop, index) => (
                        <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                           <Image 
                              src={prop.imageUrl} 
                              alt={prop.name} 
                              width={300} 
                              height={200} 
                              className="w-full h-40 object-cover"
                              data-ai-hint="house exterior" 
                            />
                          <CardHeader>
                            <CardTitle className="text-lg">{prop.name}</CardTitle>
                            <CardDescription>{prop.location} - <span className="font-semibold text-primary">{prop.price}</span></CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ul className="text-xs list-disc list-inside text-muted-foreground space-y-1">
                              {prop.features.slice(0,3).map((feature, i) => <li key={i}>{feature}</li>)}
                            </ul>
                            <Button variant="outline" size="sm" className="mt-4 w-full">View Details</Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                     <p className="text-muted-foreground text-center py-8">No specific properties matched. Try refining your preferences. The AI suggested: <br/> "{recommendations.propertyRecommendations}"</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
