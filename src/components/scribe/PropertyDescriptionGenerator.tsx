
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { generatePropertyDescription, GeneratePropertyDescriptionInput, GeneratePropertyDescriptionOutput } from "@/ai/flows/generate-property-description";
import { useState } from "react";
import { Loader2, Wand2, Sparkles, RefreshCcw, Edit3, Check, Copy, Save, DatabaseZap } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area"; // Added ScrollArea


const propertyFormSchema = z.object({
  propertyType: z.string().min(1, "Property type is required."),
  location: z.string().min(1, "Location is required."),
  bedrooms: z.coerce.number().min(0, "Bedrooms must be 0 or more."),
  bathrooms: z.coerce.number().min(0, "Bathrooms must be 0 or more."),
  squareFootage: z.coerce.number().min(1, "Square footage must be positive."),
  keyFeatures: z.string().min(1, "Key features are required."),
  targetAudience: z.string().min(1, "Target audience is required."),
  style: z.string().min(1, "Writing style is required."),
});

const propertyTypes = ["House", "Apartment", "Condo", "Townhouse", "Villa", "Land", "Penthouse", "Studio"];
const writingStyles = ["Professional", "Casual", "Luxury", "Friendly", "Technical", "Enthusiastic", "Concise", "Persuasive", "Storytelling", "Minimalist"];
const targetAudiences = ["Young Professionals", "Families with Children", "Retirees/Downsizers", "Investors", "First-time Home Buyers", "Luxury Buyers", "Students", "Tech Employees", "Artists/Creatives"];

const refinementActions = [
  { label: "More Professional", style: "Professional" },
  { label: "More Luxurious", style: "Luxury" },
  { label: "More Casual", style: "Casual" },
  { label: "More Enthusiastic", style: "Enthusiastic" },
  { label: "More Concise", style: "Concise" },
];

export function PropertyDescriptionGenerator() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratePropertyDescriptionOutput | null>(null);

  const form = useForm<z.infer<typeof propertyFormSchema>>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      propertyType: "",
      location: "",
      bedrooms: 1,
      bathrooms: 1,
      squareFootage: 1000,
      keyFeatures: "",
      targetAudience: "Families with Children",
      style: "Professional",
    },
  });

  async function onSubmit(values: z.infer<typeof propertyFormSchema>) {
    setIsLoading(true);
    // Keep previous generated content for a smoother UX during refinement unless it's a brand new generation
    // setGeneratedContent(null); 
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

  const handleRefine = (newStyle: string) => {
    form.setValue("style", newStyle);
    // Programmatically trigger form submission with the new style
    form.handleSubmit(onSubmit)(); 
  };

  const handleCopy = (textToCopy: string, type: string) => {
    navigator.clipboard.writeText(textToCopy);
    toast({ title: `${type} Copied!`, description: "Content copied to clipboard." });
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Left Panel: Input */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl flex items-center"><Edit3 className="mr-2 h-5 w-5 text-primary" /> 1. Input Key Details</CardTitle>
           <Button 
              variant="link" 
              className="p-0 h-auto text-sm text-primary hover:underline justify-start -mt-1" 
              onClick={() => alert("Feature: Load property data from existing listing (Coming Soon!)")}
              title="Coming Soon: Load data from an existing property"
            >
              <DatabaseZap className="mr-1.5 h-4 w-4" /> Or, load from existing property...
            </Button>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger></FormControl>
                        <SelectContent><ScrollArea className="h-48">{propertyTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}</ScrollArea></SelectContent>
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
                      <FormLabel>Location</FormLabel>
                      <FormControl><Input placeholder="e.g., Bandra West, Mumbai" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <FormField control={form.control} name="bedrooms" render={({ field }) => (<FormItem><FormLabel>Beds</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="bathrooms" render={({ field }) => (<FormItem><FormLabel>Baths</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="squareFootage" render={({ field }) => (<FormItem><FormLabel>Area (sqft)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
              </div>
              <FormField
                control={form.control}
                name="keyFeatures"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Key Highlights & Unique Features</FormLabel>
                    <FormControl><Textarea placeholder="One per line, e.g.,\nNewly renovated kitchen\nFloor-to-ceiling windows\n2-minute walk from metro" {...field} rows={4} /></FormControl>
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
                        <FormControl><SelectTrigger><SelectValue placeholder="Select audience" /></SelectTrigger></FormControl>
                        <SelectContent><ScrollArea className="h-48">{targetAudiences.map(audience => <SelectItem key={audience} value={audience}>{audience}</SelectItem>)}</ScrollArea></SelectContent>
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
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select style" /></SelectTrigger></FormControl>
                        <SelectContent><ScrollArea className="h-48">{writingStyles.map(style => <SelectItem key={style} value={style}>{style}</SelectItem>)}</ScrollArea></SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground !mt-6" disabled={isLoading}>
                {isLoading && generatedContent ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                {isLoading && generatedContent ? "Refining..." : isLoading ? "Generating..." : "Generate Description"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Right Panel: Output */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl flex items-center"><Wand2 className="mr-2 h-5 w-5 text-primary" /> 2. Refine & Use</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading && !generatedContent && ( // Only show this loader on initial generation
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
              <Loader2 className="h-10 w-10 animate-spin text-primary mb-3" />
              <p>Crafting your perfect listing...</p>
            </div>
          )}
          {!generatedContent && !isLoading && (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground border-2 border-dashed rounded-lg p-4">
              <Sparkles className="h-12 w-12 text-primary/30 mb-3" />
              <p className="text-center">Your AI-generated headline and description will appear here once you provide the details and click generate.</p>
            </div>
          )}
          {generatedContent && (
            <>
              <div>
                <FormLabel className="text-base">AI-Generated Headline</FormLabel>
                <div className="flex items-center gap-2 mt-1">
                  <Textarea value={generatedContent.headline} readOnly rows={2} className="bg-muted/30 text-lg font-semibold"/>
                  <Button variant="ghost" size="icon" onClick={() => form.handleSubmit(onSubmit)()} title="Regenerate Headline" disabled={isLoading}><RefreshCcw className="h-4 w-4 text-primary"/></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleCopy(generatedContent.headline, "Headline")} title="Copy Headline"><Copy className="h-4 w-4 text-primary"/></Button>
                </div>
              </div>
              <div>
                <FormLabel className="text-base">AI-Generated Description</FormLabel>
                <Textarea value={generatedContent.description} readOnly rows={10} className="bg-muted/30 mt-1 h-64"/>
              </div>
              <div className="space-y-2 pt-2">
                <p className="text-sm font-medium text-muted-foreground">Quick Refinements (changes writing style & regenerates):</p>
                <div className="flex flex-wrap gap-2">
                  {refinementActions.map(action => (
                    <Button 
                      key={action.label} 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleRefine(action.style)}
                      disabled={isLoading || form.getValues("style") === action.style}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
        {generatedContent && (
          <CardFooter className="border-t pt-4 flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="w-full sm:w-auto" onClick={() => handleCopy(`Headline: ${generatedContent.headline}\n\nDescription: ${generatedContent.description}`, "Full Content")}>
              <Copy className="mr-2 h-4 w-4"/> Copy All
            </Button>
            <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => alert("Save to Property Clicked (Placeholder)")}>
              <Save className="mr-2 h-4 w-4"/> Save to Property
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
