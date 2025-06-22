
"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BedDouble, Bath, Ruler, Eye, Users, MoreVertical, Tv, Edit3, CheckCircle } from "lucide-react";
import type { Property } from "@/types/property";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PROPERTY_STATUSES_CONFIG } from "@/lib/constants";
import { useRouter } from "next/navigation";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const router = useRouter();
  const statusConfig = PROPERTY_STATUSES_CONFIG[property.status.toLowerCase() as keyof typeof PROPERTY_STATUSES_CONFIG] || 
                       PROPERTY_STATUSES_CONFIG['default'];

  const handleNavigate = () => {
    router.push(`/properties/${property.id}`);
  };

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full bg-card">
      <div onClick={handleNavigate} className="cursor-pointer">
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
              statusConfig.badgeColor, "text-white" 
            )}
            style={{ backgroundColor: statusConfig.dotColor }} 
          >
            {property.status}
          </Badge>
          {property.hasVrTour && (
            <div className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-full backdrop-blur-sm" title="TerraVision™ Tour Available">
              <Tv className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div onClick={handleNavigate} className="cursor-pointer flex-grow">
            <CardTitle className="text-lg font-semibold font-headline text-primary leading-tight hover:underline">
              {property.title}
            </CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground flex-shrink-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleNavigate}>
                 <Eye className="mr-2 h-4 w-4" /> View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => alert(`Edit Listing: ${property.title}`)}>
                <Edit3 className="mr-2 h-4 w-4" /> Edit Listing
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => alert(`Mark as Sold: ${property.title}`)}>
                <CheckCircle className="mr-2 h-4 w-4" /> Mark as Sold
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div onClick={handleNavigate} className="cursor-pointer">
            <CardDescription className="text-xs text-muted-foreground mt-0.5">{property.locality}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-1 flex-grow cursor-pointer" onClick={handleNavigate}>
          <p className="text-xl font-bold text-foreground mb-2">{property.price}</p>
          <div className="flex items-center text-xs text-muted-foreground space-x-3">
            {property.beds > 0 && <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5 text-primary/80"/> {property.beds} Beds</span>}
            {property.baths > 0 && <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5 text-primary/80"/> {property.baths} Bath</span>}
            {property.sqft > 0 && <span className="flex items-center gap-1"><Ruler className="w-3.5 h-3.5 text-primary/80"/> {property.sqft} sqft</span>}
          </div>
      </CardContent>
      <CardFooter className="p-4 pt-2 border-t border-border cursor-pointer" onClick={handleNavigate}>
        <div className="flex items-center text-xs text-muted-foreground space-x-4 w-full">
          <span className="flex items-center gap-1" title="Views"><Eye className="w-3.5 h-3.5"/> {property.views.toLocaleString()}</span>
          <span className="flex items-center gap-1" title="Leads Generated"><Users className="w-3.5 h-3.5"/> {property.leadsGenerated}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
