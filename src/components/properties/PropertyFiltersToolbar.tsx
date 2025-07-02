"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, ListFilter, ChevronDown, LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { PROPERTY_STATUSES, PROPERTY_TYPES } from "@/lib/constants";
import type { PropertyStatusId, PropertyTypeId } from "@/lib/constants";

export interface PropertyFilters {
  searchTerm: string;
  status: PropertyStatusId[];
  propertyType: PropertyTypeId[];
}

interface PropertyFiltersToolbarProps {
  filters: PropertyFilters;
  onFiltersChange: (filters: PropertyFilters) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export function PropertyFiltersToolbar({ filters, onFiltersChange, viewMode, onViewModeChange }: PropertyFiltersToolbarProps) {

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, searchTerm: event.target.value });
  };

  const handleStatusChange = (statusId: PropertyStatusId) => {
    const newStatus = filters.status.includes(statusId)
      ? filters.status.filter(s => s !== statusId)
      : [...filters.status, statusId];
    onFiltersChange({ ...filters, status: newStatus });
  };

  const handlePropertyTypeChange = (typeId: PropertyTypeId) => {
    const newType = filters.propertyType.includes(typeId)
      ? filters.propertyType.filter(t => t !== typeId)
      : [...filters.propertyType, typeId];
    onFiltersChange({ ...filters, propertyType: newType });
  };

  return (
    <div className="py-4 space-y-4 md:space-y-0 md:flex md:flex-wrap md:items-center md:justify-between md:gap-4 bg-card p-4 rounded-lg shadow-sm border">
      <div className="relative flex-grow md:max-w-md lg:max-w-lg">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by address, listing ID, or locality..."
          value={filters.searchTerm}
          onChange={handleSearchChange}
          className="pl-10 pr-3 py-2 h-10 rounded-md border"
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-10 border text-muted-foreground hover:border-primary/50">
              <ListFilter className="mr-2 h-4 w-4" /> Status <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {PROPERTY_STATUSES.map((status) => (
              <DropdownMenuCheckboxItem
                key={status.id}
                checked={filters.status.includes(status.id)}
                onCheckedChange={() => handleStatusChange(status.id)}
              >
                {status.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-10 border text-muted-foreground hover:border-primary/50">
               <ListFilter className="mr-2 h-4 w-4" /> Property Type <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Filter by Property Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {PROPERTY_TYPES.map((type) => (
              <DropdownMenuCheckboxItem
                key={type.id}
                checked={filters.propertyType.includes(type.id)}
                onCheckedChange={() => handlePropertyTypeChange(type.id)}
              >
                {type.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
      </div>
      
      <div className="flex items-center gap-1 p-0.5 bg-muted rounded-md">
        <Button 
            variant={viewMode === 'grid' ? 'default' : 'ghost'} 
            size="sm" 
            onClick={() => onViewModeChange('grid')}
            className={cn("h-8 px-3", viewMode === 'grid' && "bg-primary text-primary-foreground shadow hover:bg-primary/90")}
            aria-pressed={viewMode === 'grid'}
        >
            <LayoutGrid className="mr-1.5 h-4 w-4" /> Grid
        </Button>
        <Button 
            variant={viewMode === 'list' ? 'default' : 'ghost'} 
            size="sm" 
            onClick={() => onViewModeChange('list')}
            className={cn("h-8 px-3", viewMode === 'list' && "bg-primary text-primary-foreground shadow hover:bg-primary/90")}
            aria-pressed={viewMode === 'list'}
        >
            <List className="mr-1.5 h-4 w-4" /> List
        </Button>
      </div>
    </div>
  );
}
