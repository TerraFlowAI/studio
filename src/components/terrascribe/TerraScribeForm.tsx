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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { generatePropertyDescription, GeneratePropertyDescriptionInput, GeneratePropertyDescriptionOutput } from "@/ai/flows/generate-property-description";
import { useState } from "react";
import { Loader2, Wand2 } from "lucide-react";

const formSchema = z.object({
  propertyType: z.string().min(1, "Property type is required."),
  location: z.string().min(1, "Location is required."),
  bedrooms: z.coerce.number().min(0, "Bedrooms must be 0 or more."),
  bathrooms: z.coerce.number().min(0, "Bathrooms must be 0 or more."),
  squareFootage: z.coerce.number().min(1, "Square footage must be positive."),
  keyFeatures: z.string().min(1, "Key features are required."),
  targetAudience: z.string().min(1, "Target audience is required."),
  style: z.string().min(1, "Writing style is required."),
});

const propertyTypes = ["House", "Apartment", "Condo", "Townhouse", "Villa", "Land"];
const writingStyles = ["Professional", "Casual", "Luxury", "Friendly", "Technical"];
const targetAudiences = ["Young Professionals", "Families", "Retirees", "Investors", "First-time Buyers"];

export function TerraScribeForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratePropertyDescriptionOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyType: "",
      location: "",
      bedrooms: 1,
      bathrooms: 1,
      squareFootage: 1000,
      keyFeatures: "",
      targetAudience: "",
      style: "Professional",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedContent(null);
    try {
      const input: GeneratePropertyDescriptionInput = values;
      const result = await generatePropertyDescription(input);
      setGeneratedContent(result);
      toast({
        title: "Content Generated!",
        description: "Property description and headline are ready.",
      });
    } catch (error) {
      console.error("Error generating content:", error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "Could not generate content. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Property Details</CardTitle>
          <CardDescription>Enter the details of the property to generate marketing content.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {propertyTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location (City, Neighborhood)</FormLabel>
                      <FormControl><Input placeholder="e.g., San Francisco, Nob Hill" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid sm:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="bedrooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bedrooms</FormLabel>
                      <FormControl><Input type="number" placeholder="e.g., 3" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bathrooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bathrooms</FormLabel>
                      <FormControl><Input type="number" placeholder="e.g., 2" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="squareFootage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Square Footage</FormLabel>
                      <FormControl><Input type="number" placeholder="e.g., 1500" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="keyFeatures"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Key Features (comma-separated)</FormLabel>
                    <FormControl><Textarea placeholder="e.g., Hardwood floors, updated kitchen, large backyard" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="targetAudience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Audience</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select audience" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {targetAudiences.map(audience => <SelectItem key={audience} value={audience}>{audience}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="style"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Writing Style</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select style" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {writingStyles.map(style => <SelectItem key={style} value={style}>{style}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Wand2 className="mr-2 h-5 w-5" />}
                {isLoading ? "Generating..." : "Generate Content"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Generated Content</CardTitle>
          <CardDescription>AI-powered property headline and description.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p>Generating your content... Please wait.</p>
            </div>
          )}
          {!isLoading && !generatedContent && (
             <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-10 border-2 border-dashed rounded-lg">
              <Wand2 className="h-16 w-16 text-primary/30 mb-4" />
              <p>Your generated content will appear here.</p>
            </div>
          )}
          {generatedContent && (
            <>
              <div>
                <h3 className="text-lg font-semibold font-headline text-primary mb-2">Headline:</h3>
                <Textarea value={generatedContent.headline} readOnly rows={2} className="bg-muted/50"/>
              </div>
              <div>
                <h3 className="text-lg font-semibold font-headline text-primary mb-2">Description:</h3>
                <Textarea value={generatedContent.description} readOnly rows={10} className="bg-muted/50"/>
              </div>
              <Button 
                onClick={() => {
                  navigator.clipboard.writeText(`Headline: ${generatedContent.headline}\n\nDescription: ${generatedContent.description}`);
                  toast({ title: "Copied to clipboard!"});
                }}
                variant="outline"
                className="w-full"
              >
                Copy All Content
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
