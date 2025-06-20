
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { generateImageFromText, GenerateImageFromTextInput, GenerateImageFromTextOutput } from "@/ai/flows/generate-image-from-text";
import { useState } from "react";
import { Loader2, Wand2, Sparkles, RefreshCcw, Edit3, Check, Copy, Save, DatabaseZap, Image as ImageIcon, Share2, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import NextImage from "next/image"; // Renamed to avoid conflict


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
  const [isRefining, setIsRefining] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratePropertyDescriptionOutput | null>(null);

  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImageDataUri, setGeneratedImageDataUri] = useState<string | null>(null);
  const [imageGenError, setImageGenError] = useState<string | null>(null);


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
    if (!isRefining) setIsLoading(true);
    setGeneratedContent(null); // Clear previous text content on new generation
    setGeneratedImageDataUri(null); // Clear previous image on new text generation
    setImageGenError(null);
    
    try {
      const input: GeneratePropertyDescriptionInput = values;
      const result = await generatePropertyDescription(input);
      setGeneratedContent(result);
      toast({
        title: isRefining ? "Content Refined!" : "Content Generated!",
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
      setIsRefining(false);
    }
  }

  const handleRefine = (newStyle: string) => {
    setIsRefining(true);
    setIsLoading(true); 
    form.setValue("style", newStyle);
    // Clear previous image when refining text
    setGeneratedImageDataUri(null); 
    setImageGenError(null);
    form.handleSubmit(onSubmit)(); 
  };

  const handleCopy = (textToCopy: string, type: string) => {
    navigator.clipboard.writeText(textToCopy);
    toast({ title: `${type} Copied!`, description: "Content copied to clipboard." });
  };

  const handleGenerateImage = async () => {
    if (!generatedContent?.description) {
      toast({ variant: "destructive", title: "No Description", description: "Please generate a description first." });
      return;
    }
    setIsGeneratingImage(true);
    setGeneratedImageDataUri(null);
    setImageGenError(null);
    try {
      const input: GenerateImageFromTextInput = { description: generatedContent.description };
      const result = await generateImageFromText(input);
      setGeneratedImageDataUri(result.imageUrl);
      toast({ title: "Image Generated!", description: "AI has generated an image based on the description." });
    } catch (error) {
      console.error("Error generating image:", error);
      setImageGenError("Failed to generate image. Please try again.");
      toast({ variant: "destructive", title: "Image Generation Failed", description: (error as Error).message || "Could not generate image." });
    } finally {
      setIsGeneratingImage(false);
    }
  };
  
  const handleSocialShare = (platform: 'facebook' | 'twitter' | 'linkedin' | 'instagram') => {
    const textToShare = generatedContent?.headline || "Check out this property!";
    // In a real app, this URL would be the actual public property page
    const propertyPageUrl = "https://terraflow.ai/mock-property-url"; 

    let shareUrl = "";
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(propertyPageUrl)}&quote=${encodeURIComponent(textToShare)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(propertyPageUrl)}&text=${encodeURIComponent(textToShare)}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(propertyPageUrl)}`;
            break;
        case 'instagram':
            alert("Instagram sharing usually requires their app. Consider providing a way to download the image and copy the text.");
            return;
    }
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
    toast({ title: "Sharing...", description: `Opening ${platform} in a new tab.`});
  };


  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Left Panel: Input */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl flex items-center"><Edit3 className="mr-2 h-5 w-5 text-primary" /> 1. Input Key Details</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                 <Button 
                    variant="outline" 
                    size="sm"
                    className="mt-1 text-sm text-muted-foreground hover:text-primary hover:border-primary justify-start w-fit" 
                    onClick={() => alert("Feature: Load property data from existing listing (Coming Soon!)")}
                  >
                    <DatabaseZap className="mr-1.5 h-4 w-4" /> Load from existing property...
                  </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Coming Soon: Automatically populate fields from your existing property listings.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
                {isLoading && !isRefining ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 
                 isLoading && isRefining ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 
                 <Sparkles className="mr-2 h-4 w-4" />}
                {isLoading && isRefining ? "Refining..." : isLoading ? "Generating..." : "Generate Description"}
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
          {isLoading && !generatedContent && !isRefining && ( 
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
                  <TooltipProvider><Tooltip><TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => form.handleSubmit(onSubmit)()} title="Regenerate Headline" disabled={isLoading || isRefining}><RefreshCcw className="h-4 w-4 text-primary"/></Button>
                  </TooltipTrigger><TooltipContent><p>Regenerate All</p></TooltipContent></Tooltip></TooltipProvider>
                  <TooltipProvider><Tooltip><TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => handleCopy(generatedContent.headline, "Headline")} title="Copy Headline"><Copy className="h-4 w-4 text-primary"/></Button>
                  </TooltipTrigger><TooltipContent><p>Copy Headline</p></TooltipContent></Tooltip></TooltipProvider>
                </div>
              </div>
              <div>
                <FormLabel className="text-base">AI-Generated Description</FormLabel>
                <Textarea value={generatedContent.description} readOnly rows={8} className="bg-muted/30 mt-1 h-auto min-h-[150px]"/>
              </div>
              <div className="space-y-2 pt-2">
                <p className="text-sm font-medium text-muted-foreground">Quick Refinements (changes writing style & regenerates text):</p>
                <div className="flex flex-wrap gap-2">
                  {refinementActions.map(action => (
                    <Button 
                      key={action.label} 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleRefine(action.style)}
                      disabled={isLoading || form.getValues("style") === action.style}
                      className={form.getValues("style") === action.style ? "border-primary text-primary" : ""}
                    >
                      {isLoading && form.getValues("style") === action.style && isRefining ? <Loader2 className="mr-2 h-3 w-3 animate-spin" /> : null}
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* AI Image Generation Section */}
              <div className="pt-4 border-t mt-4">
                <h3 className="text-base font-semibold text-primary mb-2 flex items-center">
                  <ImageIcon className="mr-2 h-5 w-5" /> AI Image Generation (Beta)
                </h3>
                {!generatedImageDataUri && !isGeneratingImage && !imageGenError && (
                  <Button onClick={handleGenerateImage} disabled={!generatedContent || isLoading} className="w-full">
                    <Sparkles className="mr-2 h-4 w-4" /> Generate Image from Description
                  </Button>
                )}
                {isGeneratingImage && (
                  <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                    <p>Generating image... This can take a moment.</p>
                  </div>
                )}
                {imageGenError && !isGeneratingImage && (
                   <p className="text-sm text-destructive text-center py-4">{imageGenError}</p>
                )}
                {generatedImageDataUri && !isGeneratingImage && (
                  <div className="mt-2 space-y-3">
                    <NextImage 
                        src={generatedImageDataUri} 
                        alt="AI Generated Property Image" 
                        width={500} 
                        height={300} 
                        className="rounded-md border object-contain mx-auto shadow-md" 
                        data-ai-hint="property building"
                    />
                    <Button onClick={handleGenerateImage} variant="outline" disabled={!generatedContent || isLoading} className="w-full">
                        <RefreshCcw className="mr-2 h-4 w-4" /> Regenerate Image
                    </Button>
                  </div>
                )}
              </div>

              {/* Social Media Sharing Section */}
              {(generatedContent || generatedImageDataUri) && (
                <div className="pt-4 border-t mt-4">
                   <h3 className="text-base font-semibold text-primary mb-2 flex items-center">
                    <Share2 className="mr-2 h-5 w-5" /> Share Content
                   </h3>
                   <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleSocialShare('facebook')}><Facebook className="mr-1.5 h-4 w-4 text-[#1877F2]"/> Facebook</Button>
                        <Button variant="outline" size="sm" onClick={() => handleSocialShare('twitter')}><Twitter className="mr-1.5 h-4 w-4 text-[#1DA1F2]"/> X (Twitter)</Button>
                        <Button variant="outline" size="sm" onClick={() => handleSocialShare('linkedin')}><Linkedin className="mr-1.5 h-4 w-4 text-[#0A66C2]"/> LinkedIn</Button>
                        <Button variant="outline" size="sm" onClick={() => handleSocialShare('instagram')}><Instagram className="mr-1.5 h-4 w-4 text-[#E4405F]"/> Instagram</Button>
                   </div>
                </div>
              )}
            </>
          )}
        </CardContent>
        {generatedContent && (
          <CardFooter className="border-t pt-4 flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="w-full sm:w-auto" onClick={() => handleCopy(`Headline: ${generatedContent.headline}\n\nDescription: ${generatedContent.description}`, "Full Content")}>
              <Copy className="mr-2 h-4 w-4"/> Copy All Text
            </Button>
            <TooltipProvider><Tooltip><TooltipTrigger asChild>
              <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => alert("Save to Property Clicked (Placeholder - would save text & image if available)")}>
                <Save className="mr-2 h-4 w-4"/> Save to Property
              </Button>
            </TooltipTrigger><TooltipContent><p>Coming Soon: Save this content and image directly to a property listing.</p></TooltipContent></Tooltip></TooltipProvider>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
