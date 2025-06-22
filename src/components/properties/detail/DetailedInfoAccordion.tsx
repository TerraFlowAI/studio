// src/components/properties/detail/DetailedInfoAccordion.tsx
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, ListChecks, MapPin, Building2 } from "lucide-react"; // Using Building2 for Property Details
import { ScrollArea } from "@/components/ui/scroll-area"; // Import ScrollArea

interface Amenity {
  name: string;
  available: boolean; // Or just pass a list of available amenity names
}

interface PropertyDetail {
  label: string;
  value: string | number;
}

interface DetailedInfoAccordionProps {
  amenities: string[]; // Assuming these are all available
  propertyDetails: PropertyDetail[];
  locationCoordinates: { lat: number; lng: number }; // For map
}

// Placeholder Map Component
const LocationMapPlaceholder = ({ coordinates }: { coordinates: { lat: number; lng: number }}) => (
  <div className="h-64 bg-muted rounded-md flex items-center justify-center text-muted-foreground border">
    <MapPin className="h-8 w-8 mr-2" />
    Map Area (Lat: {coordinates.lat.toFixed(4)}, Lng: {coordinates.lng.toFixed(4)})
  </div>
);

export function DetailedInfoAccordion({
  amenities,
  propertyDetails,
  locationCoordinates,
}: DetailedInfoAccordionProps) {
  return (
    <Card className="shadow-lg bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="font-headline text-xl text-primary">Property Information</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-base font-semibold hover:no-underline">
                <div className="flex items-center gap-2">
                    <ListChecks className="h-5 w-5 text-primary/80" /> Amenities
                </div>
            </AccordionTrigger>
            <AccordionContent>
              <ScrollArea className="h-48 pr-3"> {/* Scrollable amenities list */}
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 text-sm text-muted-foreground">
                  {amenities.map((amenity, index) => (
                    <li key={index} className="flex items-center">
                      <CheckSquare className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {amenity}
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-base font-semibold hover:no-underline">
                <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary/80" /> Property Details
                </div>
            </AccordionTrigger>
            <AccordionContent>
              <table className="w-full text-sm">
                <tbody>
                  {propertyDetails.map((detail, index) => (
                    <tr key={index} className="border-b border-border last:border-b-0">
                      <td className="py-2 pr-2 font-medium text-foreground">{detail.label}</td>
                      <td className="py-2 text-muted-foreground">{detail.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-base font-semibold hover:no-underline">
                 <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary/80" /> Location & Map
                </div>
            </AccordionTrigger>
            <AccordionContent>
              <LocationMapPlaceholder coordinates={locationCoordinates} />
              {/* In a real app, you'd integrate Google Maps SDK or similar here */}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
