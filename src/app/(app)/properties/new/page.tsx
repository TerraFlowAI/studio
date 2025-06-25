
"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { generatePropertyDescription } from "@/ai/flows/generate-property-description";
import { MapPin, Building2, Wand2, Image as ImageIcon, CheckCircle, Loader2, Sparkles, ArrowLeft, ArrowRight, Save, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useAuth } from "@/app/context/AuthContext";
import { firestore } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

// --- Validation Schema ---
const propertySchema = z.object({
  // Step 1
  propertyType: z.string().min(1, "Property type is required."),
  listingFor: z.enum(["Sale", "Rent"]),
  addressBuilding: z.string().min(1, "Building name/number is required."),
  addressStreet: z.string().min(1, "Street is required."),
  addressLocality: z.string().min(1, "Locality is required."),
  addressCity: z.string().min(1, "City is required."),
  
  // Step 2
  bedrooms: z.coerce.number().min(0),
  bathrooms: z.coerce.number().min(0),
  areaSqft: z.coerce.number().min(1, "Area must be positive."),
  furnishingStatus: z.enum(["Unfurnished", "Semi-Furnished", "Fully Furnished"]),
  expectedPrice: z.coerce.number().min(1, "Price is required."),
  
  // Step 3
  keyHighlights: z.string().min(10, "Provide at least one highlight."),
  targetAudience: z.string().min(1, "Target audience is required."),
  style: z.string().min(1, "Writing style is required."),
  aiGeneratedHeadline: z.string(),
  aiGeneratedDescription: z.string(),

  // Step 4
  imageUrls: z.array(z.string().url()).optional().default([]), // For now, we'll manage files separately
  vrTourUrl: z.string().url().optional().or(z.literal('')),
});

type PropertyFormValues = z.infer<typeof propertySchema>;

const STEPS = [
  { id: 1, title: "Location & Type", icon: MapPin, fields: ["propertyType", "listingFor", "addressBuilding", "addressStreet", "addressLocality", "addressCity"] },
  { id: 2, title: "Details & Price", icon: Building2, fields: ["bedrooms", "bathrooms", "areaSqft", "furnishingStatus", "expectedPrice"] },
  { id: 3, title: "AI Content", icon: Wand2, fields: ["keyHighlights", "targetAudience", "style", "aiGeneratedHeadline", "aiGeneratedDescription"] },
  { id: 4, title: "Media", icon: ImageIcon, fields: ["imageUrls", "vrTourUrl"] },
  { id: 5, title: "Review & Publish", icon: CheckCircle, fields: [] },
];

const writingStyles = ["Professional", "Casual", "Luxury", "Friendly", "Technical", "Enthusiastic", "Concise", "Persuasive", "Storytelling", "Minimalist"];
const targetAudiences = ["Young Professionals", "Families with Children", "Retirees/Downsizers", "Investors", "First-time Home Buyers", "Luxury Buyers", "Students", "Tech Employees", "Artists/Creatives"];


export default function AddNewPropertyPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      propertyType: "Apartment",
      listingFor: "Sale",
      addressBuilding: "",
      addressStreet: "",
      addressLocality: "",
      addressCity: "",
      bedrooms: 3,
      bathrooms: 2,
      areaSqft: 1500,
      furnishingStatus: "Semi-Furnished",
      expectedPrice: 5000000,
      keyHighlights: "Spacious Balcony\nSea View\nModern Kitchen",
      targetAudience: "Families with Children",
      style: "Professional",
      aiGeneratedHeadline: "",
      aiGeneratedDescription: "",
      imageUrls: [],
      vrTourUrl: "",
    },
  });

  const handleNextStep = async () => {
    const fieldsToValidate = STEPS[currentStep - 1].fields;
    const isValid = await form.trigger(fieldsToValidate as any);
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  const handleGenerateAIContent = async () => {
      const fieldsForAI = ["propertyType", "addressLocality", "addressCity", "bedrooms", "bathrooms", "areaSqft", "keyHighlights", "targetAudience", "style"];
      const isAiFormValid = await form.trigger(fieldsForAI as any);
      if (!isAiFormValid) {
        toast({
          variant: "destructive",
          title: "Missing Information",
          description: "Please fill in all property and content details before generating."
        });
        return;
      }
      
      setIsLoading(true);
      const values = form.getValues();
      try {
          const result = await generatePropertyDescription({
              propertyType: values.propertyType,
              location: `${values.addressLocality}, ${values.addressCity}`,
              bedrooms: values.bedrooms,
              bathrooms: values.bathrooms,
              squareFootage: values.areaSqft,
              keyFeatures: values.keyHighlights,
              targetAudience: values.targetAudience,
              style: values.style
          });
          form.setValue("aiGeneratedHeadline", result.headline);
          form.setValue("aiGeneratedDescription", result.description);
          toast({ title: "Content Generated!", description: "Headline and description populated." });
      } catch (error) {
          toast({ variant: "destructive", title: "AI Generation Failed", description: "Could not generate content." });
      } finally {
          setIsLoading(false);
      }
  };

  const processForm = async (status: 'Active' | 'Draft') => {
    if (!user) {
      toast({ variant: "destructive", title: "Authentication Error", description: "You must be logged in to save a property." });
      return;
    }

    setIsLoading(true);
    if (status === 'Draft') setIsSavingDraft(true);

    const isValid = await form.trigger();
    if (!isValid && status === 'Active') {
        toast({ variant: 'destructive', title: 'Missing Information', description: 'Please complete all required fields before publishing.' });
        // Go to first step with an error
        for (const step of STEPS) {
            for (const field of step.fields) {
                if (form.formState.errors[field as keyof PropertyFormValues]) {
                    setCurrentStep(step.id);
                    setIsLoading(false);
                    setIsSavingDraft(false);
                    return;
                }
            }
        }
    }

    try {
        const values = form.getValues();
        const { aiGeneratedHeadline, aiGeneratedDescription, addressLocality, addressBuilding, addressStreet, addressCity, expectedPrice, ...restOfData } = values;

        await addDoc(collection(firestore, 'properties'), {
            ownerId: user.uid,
            status: status,
            title: aiGeneratedHeadline || `${restOfData.propertyType} in ${addressLocality}`,
            description: aiGeneratedDescription,
            address: `${addressBuilding}, ${addressStreet}`,
            locality: addressLocality,
            city: addressCity,
            price: `₹${expectedPrice.toLocaleString()}`,
            ...restOfData,
            imageUrl: values.imageUrls?.[0] || 'https://placehold.co/600x400.png',
            aiHint: 'property exterior',
            views: 0,
            leadsGenerated: 0,
            dateAdded: serverTimestamp(),
        });
        
        toast({ title: `Property ${status === 'Active' ? 'Published' : 'Saved as Draft'}!`, description: 'Your new property has been saved successfully.' });
        router.push('/properties');
    } catch (error) {
        console.error("Error saving property to Firestore: ", error);
        toast({ variant: 'destructive', title: 'Save Failed', description: 'There was an error saving your property to the database.' });
    } finally {
        setIsLoading(false);
        setIsSavingDraft(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-headline text-primary">Create New Property Listing</h1>
          <p className="text-muted-foreground">Follow the steps to add your new property.</p>
        </div>
        <Button variant="ghost" asChild>
           <Link href="/properties"><X className="mr-2 h-4 w-4"/> Close</Link>
        </Button>
      </div>

      <div className="mb-8 flex items-center justify-between">
        {STEPS.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center" onClick={() => setCurrentStep(step.id)}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 cursor-pointer ${currentStep >= step.id ? 'bg-primary border-primary text-white' : 'bg-card border-border text-muted-foreground'}`}>
                {currentStep > step.id ? <CheckCircle className="h-5 w-5"/> : <step.icon className="h-5 w-5" />}
              </div>
              <p className={`mt-2 text-xs text-center transition-colors duration-300 ${currentStep >= step.id ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>{step.title}</p>
            </div>
            {index < STEPS.length - 1 && <div className={`flex-1 h-0.5 mx-2 ${currentStep > index + 1 ? 'bg-primary' : 'bg-border'}`}></div>}
          </React.Fragment>
        ))}
      </div>

      <Card className="shadow-lg">
        <CardContent className="p-6">
          <Form {...form}>
            <form>
              {currentStep === 1 && <Step1Location form={form} />}
              {currentStep === 2 && <Step2Details form={form} />}
              {currentStep === 3 && <Step3AIContent form={form} onGenerate={handleGenerateAIContent} isLoading={isLoading} />}
              {currentStep === 4 && <Step4Media form={form} />}
              {currentStep === 5 && <Step5Review values={form.getValues()} />}
            </form>
          </Form>
        </CardContent>
        <CardHeader className="p-6 border-t flex justify-between items-center">
            <div>
                 <Button variant="outline" onClick={() => processForm('Draft')} disabled={isLoading}>
                    {isSavingDraft ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Save className="mr-2 h-4 w-4"/>}
                    {isSavingDraft ? 'Saving...' : 'Save Draft'}
                 </Button>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" onClick={handlePrevStep} disabled={currentStep === 1 || isLoading}>
                    <ArrowLeft className="mr-2 h-4 w-4"/> Back
                </Button>
                {currentStep < STEPS.length ? (
                    <Button onClick={handleNextStep} disabled={isLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Next <ArrowRight className="ml-2 h-4 w-4"/>
                    </Button>
                ) : (
                    <Button onClick={() => processForm('Active')} disabled={isLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        {isLoading && !isSavingDraft ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <CheckCircle className="mr-2 h-4 w-4"/>}
                        {isLoading && !isSavingDraft ? 'Publishing...' : 'Publish Listing'}
                    </Button>
                )}
            </div>
        </CardHeader>
      </Card>
    </div>
  );
}

// --- Step Components ---

const Step1Location = ({ form }: { form: any }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground">Location & Type</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField control={form.control} name="propertyType" render={({ field }) => (
            <FormItem><FormLabel>Property Type *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger></FormControl>
                    <SelectContent>
                        <SelectItem value="Apartment">Apartment</SelectItem>
                        <SelectItem value="Villa">Villa</SelectItem>
                        <SelectItem value="House">House</SelectItem>
                        <SelectItem value="Land">Land</SelectItem>
                        <SelectItem value="Commercial">Commercial</SelectItem>
                    </SelectContent>
                </Select>
            <FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="listingFor" render={({ field }) => (
            <FormItem><FormLabel>Listing For *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select purpose" /></SelectTrigger></FormControl>
                    <SelectContent><SelectItem value="Sale">For Sale</SelectItem><SelectItem value="Rent">For Rent</SelectItem></SelectContent>
                </Select>
            <FormMessage /></FormItem>
        )} />
    </div>
    <div>
        <FormLabel>Full Address *</FormLabel>
        <p className="text-xs text-muted-foreground mb-2">Google Maps Autocomplete coming soon.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <FormField control={form.control} name="addressBuilding" render={({ field }) => (<FormItem><FormControl><Input placeholder="Building, Apartment, or Plot No." {...field} /></FormControl><FormMessage /></FormItem>)} />
             <FormField control={form.control} name="addressStreet" render={({ field }) => (<FormItem><FormControl><Input placeholder="Street Address" {...field} /></FormControl><FormMessage /></FormItem>)} />
             <FormField control={form.control} name="addressLocality" render={({ field }) => (<FormItem><FormControl><Input placeholder="Locality / Area" {...field} /></FormControl><FormMessage /></FormItem>)} />
             <FormField control={form.control} name="addressCity" render={({ field }) => (<FormItem><FormControl><Input placeholder="City" {...field} /></FormControl><FormMessage /></FormItem>)} />
        </div>
    </div>
  </div>
);

const Step2Details = ({ form }: { form: any }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground">Details & Pricing</h3>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FormField control={form.control} name="bedrooms" render={({ field }) => (<FormItem><FormLabel>Bedrooms</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
        <FormField control={form.control} name="bathrooms" render={({ field }) => (<FormItem><FormLabel>Bathrooms</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
        <FormField control={form.control} name="areaSqft" render={({ field }) => (<FormItem><FormLabel>Area (sqft) *</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField control={form.control} name="furnishingStatus" render={({ field }) => (
            <FormItem><FormLabel>Furnishing</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select furnishing" /></SelectTrigger></FormControl>
                    <SelectContent>
                        <SelectItem value="Unfurnished">Unfurnished</SelectItem>
                        <SelectItem value="Semi-Furnished">Semi-Furnished</SelectItem>
                        <SelectItem value="Fully Furnished">Fully Furnished</SelectItem>
                    </SelectContent>
                </Select>
            <FormMessage /></FormItem>
        )} />
         <FormField control={form.control} name="expectedPrice" render={({ field }) => (
            <FormItem><FormLabel>Expected Price (INR) *</FormLabel>
                <FormControl><Input type="number" placeholder="e.g., 25000000" {...field} /></FormControl>
                <FormDescription className="flex items-center text-xs gap-1 pt-1 text-blue-600"><Sparkles className="h-3 w-3"/>AI Suggestion: ₹{((field.value || 0) * 0.95).toLocaleString()} - ₹{((field.value || 0) * 1.05).toLocaleString()}</FormDescription>
                <FormMessage />
            </FormItem>
        )} />
    </div>
  </div>
);

const Step3AIContent = ({ form, onGenerate, isLoading }: { form: any, onGenerate: () => void, isLoading: boolean }) => (
    <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">AI Generated Content (TerraScribe™)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                 <FormField control={form.control} name="keyHighlights" render={({ field }) => (
                    <FormItem><FormLabel>Key Highlights *</FormLabel>
                        <FormControl><Textarea placeholder="List unique features, one per line. e.g.,&#10;Panoramic Sea View&#10;Rooftop Infinity Pool" {...field} rows={4} /></FormControl>
                        <FormDescription className="text-xs">Provide the best features to guide the AI.</FormDescription>
                    <FormMessage /></FormItem>
                )} />
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField control={form.control} name="targetAudience" render={({ field }) => (
                      <FormItem><FormLabel>Target Audience *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl><SelectTrigger><SelectValue placeholder="Select audience" /></SelectTrigger></FormControl>
                              <SelectContent><ScrollArea className="h-48">{targetAudiences.map(audience => <SelectItem key={audience} value={audience}>{audience}</SelectItem>)}</ScrollArea></SelectContent>
                          </Select>
                      <FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="style" render={({ field }) => (
                      <FormItem><FormLabel>Writing Style *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl><SelectTrigger><SelectValue placeholder="Select style" /></SelectTrigger></FormControl>
                              <SelectContent><ScrollArea className="h-48">{writingStyles.map(style => <SelectItem key={style} value={style}>{style}</SelectItem>)}</ScrollArea></SelectContent>
                          </Select>
                      <FormMessage /></FormItem>
                  )} />
                </div>
                <Button onClick={onGenerate} disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Wand2 className="mr-2 h-4 w-4"/>}
                    {isLoading ? 'Generating...' : 'Generate with TerraScribe™'}
                </Button>
            </div>
            <div className="space-y-4">
                 <FormField control={form.control} name="aiGeneratedHeadline" render={({ field }) => (
                    <FormItem><FormLabel>Listing Headline</FormLabel>
                        <FormControl><Input placeholder="AI will generate this..." {...field} /></FormControl>
                    <FormMessage /></FormItem>
                )} />
                 <FormField control={form.control} name="aiGeneratedDescription" render={({ field }) => (
                    <FormItem><FormLabel>Property Description</FormLabel>
                        <FormControl><Textarea placeholder="AI will generate this..." {...field} rows={10} /></FormControl>
                    <FormMessage /></FormItem>
                )} />
            </div>
        </div>
    </div>
);

const Step4Media = ({ form }: { form: any }) => (
    <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Media Upload</h3>
        <Card>
            <CardHeader><CardTitle className="text-base">Property Photos</CardTitle><CardDescription>Drag & drop coming soon. Please upload via a service and paste URLs.</CardDescription></CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground text-center p-8 border-2 border-dashed rounded-lg">Placeholder for Drag & Drop Image Uploader</p>
            </CardContent>
        </Card>
        <FormField control={form.control} name="vrTourUrl" render={({ field }) => (
            <FormItem><FormLabel>TerraVision™ VR Tour URL (Optional)</FormLabel>
                <FormControl><Input placeholder="https://your-vr-tour-host.com/tour-id" {...field} /></FormControl>
            <FormMessage /></FormItem>
        )} />
    </div>
);

const Step5Review = ({ values }: { values: PropertyFormValues }) => (
    <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">Review & Publish</h3>
        <Card className="bg-muted/30">
            <CardHeader><CardTitle className="text-base text-primary">Summary</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
                <p><strong>Title:</strong> {values.aiGeneratedHeadline || "To be generated"}</p>
                <p><strong>Address:</strong> {`${values.addressBuilding}, ${values.addressStreet}, ${values.addressLocality}, ${values.addressCity}`}</p>
                <p><strong>Price:</strong> ₹{values.expectedPrice.toLocaleString()}</p>
                <p><strong>Details:</strong> {values.bedrooms} Beds, {values.bathrooms} Baths, {values.areaSqft} sqft</p>
                <p><strong>Description:</strong> {values.aiGeneratedDescription.substring(0, 100) + '...' || "To be generated"}</p>
            </CardContent>
        </Card>
        <p className="text-sm text-center text-muted-foreground">Please review all details. Once published, the listing will be live.</p>
    </div>
);
