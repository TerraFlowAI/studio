
"use client";

import type { Property } from "@/types/property";
import { PropertyCard } from "./PropertyCard";
import { SearchX } from "lucide-react";

interface PropertiesGridViewProps {
  properties: Property[];
}

export function PropertiesGridView({ properties }: PropertiesGridViewProps) {
  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
        <SearchX className="h-16 w-16 text-primary/30 mb-4" />
        <h3 className="text-xl font-semibold">No Properties Found</h3>
        <p className="text-sm">Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
