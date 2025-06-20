
"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Camera, MapPin, BedDouble, Bath, SquareAsterisk, MoreHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ListingCardProps {
  title: string;
  location: string;
  price: string;
  specs: string;
  imageUrl: string;
  aiHint: string;
}

export function ListingCard({ title, location, price, specs, imageUrl, aiHint }: ListingCardProps) {
  // Simple parsing for specs, can be made more robust
  const [beds, baths, sqft] = specs.split(",").map(s => s.trim());

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-card flex flex-col h-full">
      <div className="relative">
        <Image
          src={imageUrl}
          alt={title}
          width={400}
          height={250}
          className="w-full h-44 object-cover"
          data-ai-hint={aiHint}
        />
        <div className="absolute top-2 right-2 bg-black/40 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1 backdrop-blur-sm">
          <Camera className="w-3 h-3" />
          <span>VR Tour</span>
        </div>
      </div>
      <CardContent className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
            <h3 className="text-md font-semibold text-foreground leading-tight">{title}</h3>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground">
                <MoreHorizontal className="h-4 w-4" />
            </Button>
        </div>
        <p className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
          <MapPin className="w-3 h-3" /> {location}
        </p>
        <p className="text-lg font-bold text-primary mb-3">{price} <span className="text-xs text-muted-foreground font-normal">/month</span></p>
        
        <div className="mt-auto border-t border-border pt-3 flex items-center text-xs text-muted-foreground gap-3">
          <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5 text-primary/70"/> {beds}</span>
          <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5 text-primary/70"/> {baths}</span>
          <span className="flex items-center gap-1"><SquareAsterisk className="w-3.5 h-3.5 text-primary/70"/> {sqft}</span>
        </div>
      </CardContent>
    </Card>
  );
}
