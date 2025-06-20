
// src/components/properties/detail/PropertyPageHeader.tsx
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Eye, Share2, Edit3 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { PROPERTY_STATUSES, PROPERTY_STATUSES_CONFIG } from "@/lib/constants";
import type { Property } from "@/types/property";
import { cn } from "@/lib/utils";

interface PropertyPageHeaderProps {
  propertyName: string;
  currentStatus: Property["status"];
  onStatusChange: (newStatus: string) => void;
  publicPageUrl: string;
  onEdit: () => void;
}

export function PropertyPageHeader({
  propertyName,
  currentStatus,
  onStatusChange,
  publicPageUrl,
  onEdit,
}: PropertyPageHeaderProps) {
  const statusConfig = PROPERTY_STATUSES_CONFIG[currentStatus.toLowerCase() as keyof typeof PROPERTY_STATUSES_CONFIG] || PROPERTY_STATUSES_CONFIG.default;

  return (
    <div className="mb-6 md:mb-8">
      <div className="flex items-center text-sm text-muted-foreground mb-2">
        <Link href="/properties" className="hover:text-primary">Properties</Link>
        <span className="mx-2">/</span>
        <span className="font-medium text-foreground truncate max-w-[calc(100%-100px)]">{propertyName}</span>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-bold font-headline text-primary truncate" title={propertyName}>
            {propertyName}
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Badge
                className={cn(
                  "px-3 py-1 text-sm font-semibold rounded-full border cursor-pointer hover:opacity-80 transition-opacity whitespace-nowrap capitalize",
                  statusConfig.badgeColor, "text-white"
                )}
                style={{ backgroundColor: statusConfig.dotColor }}
              >
                {currentStatus} <ChevronDown className="ml-1.5 h-4 w-4 opacity-70" />
              </Badge>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {PROPERTY_STATUSES.map(status => (
                <DropdownMenuItem key={status.id} onClick={() => onStatusChange(status.label)}>
                  {status.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button variant="outline" onClick={() => window.open(publicPageUrl, '_blank')}>
            <Eye className="mr-2 h-4 w-4" /> View Public Page
          </Button>
          <Button variant="outline" onClick={() => alert("Share options clicked - Placeholder")}>
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={onEdit}>
            <Edit3 className="mr-2 h-4 w-4" /> Edit Listing
          </Button>
        </div>
      </div>
    </div>
  );
}

    