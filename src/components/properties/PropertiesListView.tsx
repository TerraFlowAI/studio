"use client";

import * as React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Eye, Edit3, CheckCircle, Archive, Tv, Users, SquarePen, Loader2 } from "lucide-react";
import Image from "next/image";
import type { Property } from "@/types/property";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { PROPERTY_STATUSES_CONFIG } from "@/lib/constants";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

interface PropertiesListViewProps {
  properties: Property[];
  selectedProperties: Set<string>;
  onSelectProperty: (propertyId: string, isSelected: boolean) => void;
  isAllSelectedInCurrentPage: boolean;
  isLoading?: boolean;
}

export function PropertiesListView({
  properties,
  selectedProperties,
  onSelectProperty,
  isAllSelectedInCurrentPage,
  isLoading = false,
}: PropertiesListViewProps) {
  const router = useRouter();

  const handleRowClick = (propertyId: string) => {
    router.push(`/properties/${propertyId}`);
  };

  const handleAction = (
    e: React.MouseEvent,
    actionDescription: string,
    propertyId?: string
  ) => {
    e.stopPropagation();
    if (actionDescription.startsWith("View Details") && propertyId) {
      router.push(`/properties/${propertyId}`);
    } else {
      alert(`${actionDescription} for ${propertyId} (Placeholder)`);
    }
  };
  
  const MobilePropertyCard = ({ property }: { property: Property }) => {
    const statusConfig = PROPERTY_STATUSES_CONFIG[property.status.toLowerCase() as keyof typeof PROPERTY_STATUSES_CONFIG] || PROPERTY_STATUSES_CONFIG['default'];
    return (
      <Card className="mb-4" onClick={() => handleRowClick(property.id)}>
        <CardHeader className="p-0">
          <div className="relative">
            <Image
              src={property.imageUrl}
              alt={property.title}
              width={400}
              height={200}
              className="w-full h-40 object-cover rounded-t-lg"
              data-ai-hint={property.aiHint}
            />
            <Badge
              className={cn(
                "absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded-full border capitalize text-white",
                statusConfig.badgeColor
              )}
              style={{ backgroundColor: statusConfig.dotColor }}
            >
              {property.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-2">
          <h3 className="font-semibold text-foreground leading-tight">{property.title}</h3>
          <p className="text-sm text-muted-foreground">{property.locality}</p>
          <p className="text-lg font-bold text-primary">{property.price}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t">
              <span className="flex items-center gap-1" title="Views"><Eye className="w-3 h-3"/> {property.views.toLocaleString()}</span>
              <span className="flex items-center gap-1" title="Leads"><Users className="w-3 h-3"/> {property.leadsGenerated}</span>
              {property.hasVrTour && <Tv className="w-3.5 h-3.5 text-primary" title="TerraVision™ Tour Available"/>}
          </div>
        </CardContent>
      </Card>
    );
  };


  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No properties match your current filters.
      </div>
    );
  }

  return (
    <>
      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {properties.map(prop => <MobilePropertyCard key={prop.id} property={prop} />)}
      </div>
      
      {/* Desktop Table View */}
      <div className="overflow-x-auto bg-card shadow-sm border rounded-lg hidden md:block">
        <Table className="min-w-full whitespace-nowrap">
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-border">
              <TableHead className="w-[50px] px-4">
                <Checkbox
                  disabled // Placeholder for full implementation
                />
              </TableHead>
              <TableHead className="min-w-[250px] py-3 px-4 text-muted-foreground font-medium">
                Property Info
              </TableHead>
              <TableHead className="min-w-[100px] py-3 px-4 text-muted-foreground font-medium">
                Status
              </TableHead>
              <TableHead className="min-w-[120px] py-3 px-4 text-muted-foreground font-medium">
                Price
              </TableHead>
              <TableHead className="min-w-[150px] py-3 px-4 text-muted-foreground font-medium">
                Performance
              </TableHead>
              <TableHead className="min-w-[120px] py-3 px-4 text-muted-foreground font-medium">
                Date Added
              </TableHead>
              <TableHead className="w-[80px] text-right py-3 px-4 text-muted-foreground font-medium">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((prop) => {
              const statusConfig =
                PROPERTY_STATUSES_CONFIG[
                  prop.status.toLowerCase() as keyof typeof PROPERTY_STATUSES_CONFIG
                ] || PROPERTY_STATUSES_CONFIG["default"];
              return (
                <TableRow
                  key={prop.id}
                  className="hover:bg-muted/50 border-b border-border last:border-b-0 cursor-pointer"
                  onClick={() => handleRowClick(prop.id)}
                >
                  <TableCell
                    className="px-4 py-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Checkbox
                      checked={selectedProperties.has(prop.id)}
                      onCheckedChange={(checked) =>
                        onSelectProperty(prop.id, Boolean(checked))
                      }
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
                        <Link
                          href={`/properties/${prop.id}`}
                          className="font-semibold text-foreground hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {prop.title}
                        </Link>
                        <div className="text-xs text-muted-foreground">
                          {prop.locality}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Badge
                      className={cn(
                        "px-2 py-0.5 text-xs font-medium rounded-full border capitalize text-white",
                        statusConfig.badgeColor
                      )}
                      style={{ backgroundColor: statusConfig.dotColor }}
                    >
                      {prop.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-foreground font-medium px-4 py-3">
                    {prop.price}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1" title="Views">
                        <Eye className="w-3 h-3" />{" "}
                        {prop.views.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1" title="Leads">
                        <Users className="w-3 h-3" /> {prop.leadsGenerated}
                      </span>
                      {prop.hasVrTour && (
                        <Tv
                          className="w-3.5 h-3.5 text-primary"
                          title="TerraVision™ Tour Available"
                        />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground px-4 py-3">
                    {new Date(prop.dateAdded).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell
                    className="text-right px-4 py-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:bg-accent"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem
                          onClick={(e) =>
                            handleAction(e, "View Details", prop.id)
                          }
                        >
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) =>
                            handleAction(e, "Edit Listing", prop.id)
                          }
                        >
                          <SquarePen className="mr-2 h-4 w-4" /> Edit Listing
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) =>
                            handleAction(e, "Mark as Sold", prop.id)
                          }
                        >
                          <CheckCircle className="mr-2 h-4 w-4" /> Mark as
                          Sold
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => handleAction(e, "Archive", prop.id)}
                        >
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
    </>
  );
}
