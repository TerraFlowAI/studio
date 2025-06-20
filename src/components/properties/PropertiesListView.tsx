
"use client";

import * as React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, Eye, Edit3, CheckCircle, Archive, Tv, Users, SquarePen } from "lucide-react";
import Image from "next/image";
import type { Property } from "@/types/property";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PROPERTY_STATUSES_CONFIG } from "@/lib/constants";

interface PropertiesListViewProps {
  properties: Property[];
  selectedProperties: Set<string>;
  onSelectProperty: (propertyId: string, isSelected: boolean) => void;
  // onSelectAllProperties: (isSelected: boolean) => void; // For future bulk actions
  isAllSelectedInCurrentPage: boolean;
}

export function PropertiesListView({ 
  properties, 
  selectedProperties, 
  onSelectProperty, 
  // onSelectAllProperties, 
  isAllSelectedInCurrentPage 
}: PropertiesListViewProps) {
  
  const handleAction = (e: React.MouseEvent, actionDescription: string, propertyId?: string) => {
    e.stopPropagation(); 
    if (actionDescription.startsWith("View Details") && propertyId) {
      // Placeholder for navigation, ideally use router.push
      console.log(`Navigating to details for ${propertyId}`);
      // router.push(`/properties/${propertyId}`);
    } else {
      alert(actionDescription);
    }
  };

  if (properties.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No properties match your current filters.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-card shadow-sm border rounded-lg">
      <Table className="min-w-full whitespace-nowrap">
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b border-border">
            <TableHead className="w-[50px] px-4">
              <Checkbox
                // checked={isAllSelectedInCurrentPage && properties.length > 0}
                // onCheckedChange={(checked) => onSelectAllProperties(Boolean(checked))}
                // aria-label="Select all properties in current page"
                disabled // Placeholder for full implementation
              />
            </TableHead>
            <TableHead className="min-w-[250px] py-3 px-4 text-muted-foreground font-medium">Property Info</TableHead>
            <TableHead className="min-w-[100px] py-3 px-4 text-muted-foreground font-medium">Status</TableHead>
            <TableHead className="min-w-[120px] py-3 px-4 text-muted-foreground font-medium">Price</TableHead>
            <TableHead className="min-w-[150px] py-3 px-4 text-muted-foreground font-medium">Performance</TableHead>
            <TableHead className="min-w-[120px] py-3 px-4 text-muted-foreground font-medium">Date Added</TableHead>
            <TableHead className="w-[80px] text-right py-3 px-4 text-muted-foreground font-medium">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.map((prop) => {
            const statusConfig = PROPERTY_STATUSES_CONFIG[prop.status.toLowerCase() as keyof typeof PROPERTY_STATUSES_CONFIG] || 
                                 PROPERTY_STATUSES_CONFIG['default'];
            return (
              <TableRow 
                key={prop.id} 
                className="hover:bg-muted/50 border-b border-border last:border-b-0"
              >
                <TableCell className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedProperties.has(prop.id)}
                    onCheckedChange={(checked) => onSelectProperty(prop.id, Boolean(checked))}
                    aria-label={`Select property ${prop.title}`}
                  />
                </TableCell>
                <TableCell className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Image 
                      src={prop.imageUrl} 
                      alt={prop.title} 
                      width={50} 
                      height={35} 
                      className="w-[50px] h-[35px] object-cover rounded"
                      data-ai-hint={prop.aiHint}
                    />
                    <div>
                      <Link href={`/properties/${prop.id}`} className="font-semibold text-foreground hover:underline">{prop.title}</Link>
                      <div className="text-xs text-muted-foreground">{prop.locality}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Badge
                    className={cn("px-2 py-0.5 text-xs font-medium rounded-full border capitalize text-white", statusConfig.badgeColor)} // Ensure text is visible
                    style={{ backgroundColor: statusConfig.dotColor }}
                  >
                    {prop.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-foreground font-medium px-4 py-3">{prop.price}</TableCell>
                <TableCell className="px-4 py-3">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1" title="Views"><Eye className="w-3 h-3"/> {prop.views.toLocaleString()}</span>
                    <span className="flex items-center gap-1" title="Leads"><Users className="w-3 h-3"/> {prop.leadsGenerated}</span>
                    {prop.hasVrTour && <Tv className="w-3.5 h-3.5 text-primary" title="TerraVision™ Tour Available"/>}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground px-4 py-3">
                  {new Date(prop.dateAdded).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </TableCell>
                <TableCell className="text-right px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-accent">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={(e) => handleAction(e, `View Details for ${prop.title}`, prop.id)}>
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => handleAction(e, `Edit Listing: ${prop.title}`)}>
                        <SquarePen className="mr-2 h-4 w-4" /> Edit Listing
                      </DropdownMenuItem>
                       <DropdownMenuItem onClick={(e) => handleAction(e, `Mark as Sold: ${prop.title}`)}>
                        <CheckCircle className="mr-2 h-4 w-4" /> Mark as Sold
                      </DropdownMenuItem>
                       <DropdownMenuItem onClick={(e) => handleAction(e, `Archive: ${prop.title}`)}>
                        <Archive className="mr-2 h-4 w-4" /> Archive
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

