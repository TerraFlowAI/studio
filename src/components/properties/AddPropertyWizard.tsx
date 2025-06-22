
"use client";

import * as React from "react";
import {
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Wand2, MapPin, Building2, Image as ImageIcon, ArrowLeft, ArrowRight, Save, Loader2, Sparkles, Tv } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/app/context/AuthContext";
import { firestore } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";


// --- WIZARD SETUP ---

const STEPS = [
  { id: 1, title: "Location", icon: MapPin },
  { id: 2, title: "Details", icon: Building2 },
  { id: 3, title: "AI Content", icon: Wand2 },
  { id: 4, title: "Media", icon: ImageIcon },
  { id: 5, title: "Review", icon: CheckCircle },
];

const initialPropertyData = {
  buildingName: "",
  streetAddress: "",
  locality: "",
  city: "",
  propertyType: "",
  listingFor: "Sale",
  furnishingStatus: "",
  bedrooms: 3,
  bathrooms: 2,
  area: 1500,
  price: 5000000,
  keyHighlights: "",
  headline: "",
  description: "",
  vrTourUrl: "",
};


// --- MAIN COMPONENT ---

interface AddPropertyWizardProps {
    onClose: () => void;
}

export function AddPropertyWizard({ onClose }: AddPropertyWizardProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = React.useState(1);
  const [propertyData, setPropertyData] = React.useState(initialPropertyData);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleDataChange = (field: keyof typeof initialPropertyData, value: string | number) => {
    setPropertyData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = async () => {
    // Basic validation, would be more robust with a library like Zod
    if (currentStep === 1 && (!propertyData.locality || !propertyData.city)) {
        toast({ variant: "destructive", title: "Missing fields", description: "Locality and City are required."});
        return;
    }
    setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const prepareDataForFirestore = (status: "Active" | "Draft") => {
    const {
      buildingName, streetAddress, locality, city, headline, description,
      price, area, bedrooms, bathrooms, propertyType, listingFor, furnishingStatus, vrTourUrl, keyHighlights
    } = propertyData;

    return {
      title: headline || `${propertyType} in ${locality}`,
      address: `${buildingName}, ${streetAddress}`,
      locality,
      city,
      description,
      status,
      ownerId: user?.uid,
      createdAt: serverTimestamp(),
      price: `₹${price.toLocaleString()}`,
      areaSqft: area,
      bedrooms,
      bathrooms,
      propertyType,
      listingFor,
      furnishingStatus,
      vrTourUrl,
      keyHighlights,
      imageUrl: 'https://placehold.co/600x400.png',
      aiHint: 'property exterior',
      views: 0,
      leadsGenerated: 0,
      hasVrTour: !!vrTourUrl,
      dateAdded: serverTimestamp() // Compatibility with hook
    };
  };

  const handleSaveDraft = async () => {
    if (!user) {
        toast({ title: "Error", description: "You must be logged in to save a draft.", variant: "destructive" });
        return;
    }
    setIsSubmitting(true);
    try {
        const draftData = prepareDataForFirestore("Draft");
        const propertiesCollectionRef = collection(firestore, "properties");
        const docRef = await addDoc(propertiesCollectionRef, draftData);
        console.log("Successfully saved draft with ID: ", docRef.id);
        toast({ title: "Draft Saved!", description: "Your property draft has been saved." });
        onClose();
    } catch (error) {
        console.error("Error saving draft to Firestore:", error);
        toast({
            title: "Save Failed",
            description: "Could not save your draft. Please check your connection and try again.",
            variant: "destructive",
        });
    } finally {
        setIsSubmitting(false);
    }
  };


  const handlePublish = async () => {
    // 1. Guard Clauses: Check for essential data first.
    if (!user) {
      console.error("No user is logged in. Cannot publish.");
      toast({ title: "Error", description: "You must be logged in to publish a property.", variant: "destructive" });
      return;
    }
    
    if (!propertyData.streetAddress || !propertyData.price) {
        toast({ title: "Missing Information", description: "Please ensure all required fields are filled out.", variant: "destructive" });
        return;
    }

    setIsSubmitting(true);

    try {
      // 2. Prepare the data object to be saved
      const newPropertyData = prepareDataForFirestore("Active");

      // 3. Add the document to Firestore
      const propertiesCollectionRef = collection(firestore, "properties");
      const docRef = await addDoc(propertiesCollectionRef, newPropertyData);

      // 4. Success Feedback
      console.log("Successfully published property with ID: ", docRef.id);
      toast({ title: "Success!", description: "Your property has been published." });

      onClose();

    } catch (error) {
      // 5. Detailed Error Feedback
      console.error("Error publishing property to Firestore:", error);
      toast({
        title: "Publishing Failed",
        description: "Could not save your property to the database. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextButtonText = STEPS[currentStep] ? `Next: ${STEPS[currentStep].title}` : 'Publish Listing';

  return (
    <>
      <DialogHeader className="p-6 pb-2">
        <DialogTitle className="text-2xl font-bold font-headline text-primary">Add New Property</DialogTitle>
        <DialogDescription>Follow the steps below to create a new property listing.</DialogDescription>
        
        {/* --- Stepper --- */}
        <div className="flex items-center justify-between pt-4">
          {STEPS.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center gap-1">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                  currentStep >= step.id ? 'bg-primary border-primary text-white' : 'bg-card border-border text-muted-foreground'
                )}>
                  {currentStep > step.id ? <CheckCircle className="h-5 w-5"/> : step.id}
                </div>
                <p className={cn(
                  "text-xs text-center transition-colors duration-300",
                  currentStep >= step.id ? 'text-primary font-semibold' : 'text-muted-foreground'
                )}>{step.title}</p>
              </div>
              {index < STEPS.length - 1 && <div className={cn("flex-1 h-0.5 mx-2", currentStep > index + 1 ? 'bg-primary' : 'bg-border')}></div>}
            </React.Fragment>
          ))}
        </div>
      </DialogHeader>

      <div className="p-6 max-h-[65vh] overflow-y-auto">
        {currentStep === 1 && <StepLocation data={propertyData} onDataChange={handleDataChange} />}
        {currentStep === 2 && <StepDetails data={propertyData} onDataChange={handleDataChange} />}
        {currentStep === 3 && <StepAiContent data={propertyData} onDataChange={handleDataChange} />}
        {currentStep === 4 && <StepMedia data={propertyData} onDataChange={handleDataChange} />}
        {currentStep === 5 && <StepReview data={propertyData} />}
      </div>

      <DialogFooter className="p-6 border-t bg-muted/50">
        <Button variant="secondary" onClick={handleSaveDraft}>Save as Draft & Close</Button>
        <div className="flex-grow"></div>
        {currentStep > 1 && (
            <Button variant="outline" onClick={handlePrevStep} disabled={isSubmitting}>
                <ArrowLeft className="mr-2 h-4 w-4"/> Back
            </Button>
        )}
        {currentStep < STEPS.length ? (
            <Button onClick={handleNextStep} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                {nextButtonText} <ArrowRight className="ml-2 h-4 w-4"/>
            </Button>
        ) : (
             <Button onClick={handlePublish} disabled={isSubmitting} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <CheckCircle className="mr-2 h-4 w-4"/>}
                {isSubmitting ? 'Publishing...' : 'Publish Listing'}
            </Button>
        )}
      </DialogFooter>
    </>
  );
}

// --- STEP COMPONENTS ---

type StepProps = {
    data: typeof initialPropertyData;
    onDataChange: (field: keyof typeof initialPropertyData, value: string | number) => void;
}

function StepLocation({ data, onDataChange }: StepProps) {
    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-lg">Property Location</h3>
            <div className="grid md:grid-cols-2 gap-4">
                <Input placeholder="Building/Project Name" value={data.buildingName} onChange={e => onDataChange('buildingName', e.target.value)} />
                <Input placeholder="Street Address" value={data.streetAddress} onChange={e => onDataChange('streetAddress', e.target.value)} />
            </div>
             <div className="grid md:grid-cols-2 gap-4">
                <Input placeholder="Locality" value={data.locality} onChange={e => onDataChange('locality', e.target.value)} required />
                <Input placeholder="City" value={data.city} onChange={e => onDataChange('city', e.target.value)} required />
            </div>
            {/* Google Maps Autocomplete placeholder */}
            <div className="text-center text-sm text-muted-foreground p-8 border-2 border-dashed rounded-md">
                [Google Maps Autocomplete will go here]
            </div>
        </div>
    )
}

function StepDetails({ data, onDataChange }: StepProps) {
    return (
        <div className="space-y-4">
             <h3 className="font-semibold text-lg">Property Details</h3>
             <div className="grid md:grid-cols-2 gap-4">
                 <Select value={data.propertyType} onValueChange={value => onDataChange('propertyType', value)}>
                     <SelectTrigger><SelectValue placeholder="Select Property Type" /></SelectTrigger>
                     <SelectContent>
                         <SelectItem value="Apartment">Apartment</SelectItem>
                         <SelectItem value="Villa">Villa</SelectItem>
                         <SelectItem value="Land">Land</SelectItem>
                         <SelectItem value="Commercial">Commercial</SelectItem>
                     </SelectContent>
                 </Select>
                  <Select value={data.furnishingStatus} onValueChange={value => onDataChange('furnishingStatus', value)}>
                     <SelectTrigger><SelectValue placeholder="Select Furnishing Status" /></SelectTrigger>
                     <SelectContent>
                         <SelectItem value="Unfurnished">Unfurnished</SelectItem>
                         <SelectItem value="Semi-Furnished">Semi-Furnished</SelectItem>
                         <SelectItem value="Fully Furnished">Fully Furnished</SelectItem>
                     </SelectContent>
                 </Select>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Input type="number" placeholder="Bedrooms" value={data.bedrooms} onChange={e => onDataChange('bedrooms', e.target.valueAsNumber)} />
                <Input type="number" placeholder="Bathrooms" value={data.bathrooms} onChange={e => onDataChange('bathrooms', e.target.valueAsNumber)} />
                <Input type="number" placeholder="Area (sqft)" value={data.area} onChange={e => onDataChange('area', e.target.valueAsNumber)} />
                <Input type="number" placeholder="Price (INR)" value={data.price} onChange={e => onDataChange('price', e.target.valueAsNumber)} />
             </div>
             <div className="text-center text-sm text-muted-foreground p-3 border rounded-md">
                [TerraValuate™ Quick Insight will appear here]
             </div>
        </div>
    )
}

function StepAiContent({ data, onDataChange }: StepProps) {
    return (
        <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
                 <h3 className="font-semibold text-lg">AI Content Generation (TerraScribe™)</h3>
                 <Textarea placeholder="Key Highlights (one per line)" rows={8} value={data.keyHighlights} onChange={e => onDataChange('keyHighlights', e.target.value)} />
                 <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Sparkles className="mr-2 h-4 w-4"/> Generate with TerraScribe AI
                </Button>
            </div>
            <div className="space-y-4">
                <h3 className="font-semibold text-lg text-muted-foreground">Generated Content</h3>
                <Input placeholder="Listing Headline" value={data.headline} onChange={e => onDataChange('headline', e.target.value)} disabled />
                <Textarea placeholder="Property Description" value={data.description} onChange={e => onDataChange('description', e.target.value)} rows={10} disabled />
            </div>
        </div>
    )
}

function StepMedia({ data, onDataChange }: StepProps) {
    return (
        <div className="space-y-4">
             <h3 className="font-semibold text-lg">Media</h3>
             <div className="p-12 border-2 border-dashed rounded-md flex flex-col items-center justify-center text-muted-foreground">
                <ImageIcon className="h-12 w-12 mb-2" />
                <p>Drag & Drop File Uploader Placeholder</p>
            </div>
            <div className="flex items-center gap-2">
                 <Tv className="h-5 w-5 text-muted-foreground"/>
                 <Input placeholder="VR Tour URL (TerraVision™)" value={data.vrTourUrl} onChange={e => onDataChange('vrTourUrl', e.target.value)} />
            </div>
        </div>
    )
}

function StepReview({ data }: { data: typeof initialPropertyData }) {
    return (
        <div className="space-y-4">
             <h3 className="font-semibold text-lg">Review Your Listing</h3>
             <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 p-4 border rounded-md">
                 <div><strong className="text-muted-foreground">Location:</strong><p>{`${data.buildingName}, ${data.streetAddress}, ${data.locality}, ${data.city}`}</p></div>
                 <div><strong className="text-muted-foreground">Property Type:</strong><p>{data.propertyType}</p></div>
                 <div><strong className="text-muted-foreground">Details:</strong><p>{`${data.bedrooms} beds, ${data.bathrooms} baths, ${data.area} sqft`}</p></div>
                 <div><strong className="text-muted-foreground">Price:</strong><p>{`₹${data.price.toLocaleString()}`}</p></div>
                 <div className="md:col-span-2"><strong className="text-muted-foreground">Headline:</strong><p>{data.headline || "N/A"}</p></div>
                 <div className="md:col-span-2"><strong className="text-muted-foreground">Description:</strong><p className="text-sm whitespace-pre-line">{data.description || "N/A"}</p></div>
                 <div className="md:col-span-2"><strong className="text-muted-foreground">Media:</strong><p className="text-sm">[Image Thumbnails Placeholder]</p></div>
             </div>
        </div>
    )
}
