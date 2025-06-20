
"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BedDouble, Bath, Ruler, Eye, Users, MoreVertical, Tv } from "lucide-react"; // Assuming Tv for VR icon
import type { Property } from "@/types/property";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PROPERTY_STATUSES_CONFIG } from "@/lib/constants";


interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const statusConfig = PROPERTY_STATUSES_CONFIG[property.status.toLowerCase() as keyof typeof PROPERTY_STATUSES_CONFIG] || 
                       PROPERTY_STATUSES_CONFIG['default'];


  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full bg-card">
      <Link href={`/properties/${property.id}`} className="block"> {/* Placeholder link */}
        <div className="relative">
          <Image
            src={property.imageUrl}
            alt={property.title}
            width={400}
            height={250}
            className="w-full h-48 object-cover"
            data-ai-hint={property.aiHint}
          />
          <Badge 
            className={cn(
              "absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded-full border capitalize",
              statusConfig.badgeColor, "text-white" // Ensure text is visible on colored badges
            )}
            style={{ backgroundColor: statusConfig.dotColor }} // Using dotColor for badge background as per spec
          >
            {/* Green dot + Status Text (Conceptual, achieved via bg color) */}
            {property.status}
          </Badge>
          {property.hasVrTour && (
            <div className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-full backdrop-blur-sm" title="TerraVision™ Tour Available">
              <Tv className="w-4 h-4" />
            </div>
          )}
        </div>
      </Link>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <Link href={`/properties/${property.id}`} className="block">
            <CardTitle className="text-lg font-semibold font-headline text-primary leading-tight hover:underline">
              {property.title}
            </CardTitle>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => alert(`View Details: ${property.title}`)}>View Details</DropdownMenuItem>
              <DropdownMenuItem onClick={() => alert(`Edit Listing: ${property.title}`)}>Edit Listing</DropdownMenuItem>
              <DropdownMenuItem onClick={() => alert(`Mark as Sold: ${property.title}`)}>Mark as Sold</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
         <Link href={`/properties/${property.id}`} className="block">
            <CardDescription className="text-xs text-muted-foreground mt-0.5">{property.locality}</CardDescription>
        </Link>
      </CardHeader>
      <CardContent className="p-4 pt-1 flex-grow">
        <Link href={`/properties/${property.id}`} className="block">
          <p className="text-xl font-bold text-foreground mb-2">{property.price}</p>
          <div className="flex items-center text-xs text-muted-foreground space-x-3">
            {property.beds > 0 && <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5 text-primary/80"/> {property.beds} Beds</span>}
            {property.baths > 0 && <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5 text-primary/80"/> {property.baths} Bath</span>}
            {property.sqft > 0 && <span className="flex items-center gap-1"><Ruler className="w-3.5 h-3.5 text-primary/80"/> {property.sqft} sqft</span>}
          </div>
        </Link>
      </CardContent>
      <CardFooter className="p-4 pt-2 border-t border-border">
        <Link href={`/properties/${property.id}`} className="flex items-center text-xs text-muted-foreground space-x-4 w-full">
          <span className="flex items-center gap-1" title="Views"><Eye className="w-3.5 h-3.5"/> {property.views.toLocaleString()}</span>
          <span className="flex items-center gap-1" title="Leads Generated"><Users className="w-3.5 h-3.5"/> {property.leadsGenerated}</span>
        </Link>
      </CardFooter>
    </Card>
  );
}
