
"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { PropertyFiltersToolbar, type PropertyFilters } from "@/components/properties/PropertyFiltersToolbar";
import { PropertiesGridView } from "@/components/properties/PropertiesGridView";
import { PropertiesListView } from "@/components/properties/PropertiesListView";
// import { BulkActionsToolbar } from "@/components/properties/BulkActionsToolbarProperties"; // Placeholder for now
import { PlusCircle, Upload, Settings as SettingsIcon, List, LayoutGrid } from "lucide-react";
import Link from "next/link";
import type { Property } from "@/types/property";
import { PROPERTY_STATUSES, PROPERTY_TYPES } from "@/lib/constants";

const mockProperties: Property[] = [
  {
    id: "prop1",
    title: "Luxury Seafront Villa",
    address: "12 Beach Road, Juhu, Mumbai",
    locality: "Juhu",
    imageUrl: "https://images.unsplash.com/photo-1740497708249-555d807a157a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxOHx8THV4dXJ5JTIwU2VhZnJvbnQlMjBWaWxsYXxlbnwwfHx8fDE3NTA0Mjk1ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    aiHint: "luxury villa sea",
    status: "Active",
    hasVrTour: true,
    price: "₹12.5 Cr",
    beds: 5,
    baths: 6,
    sqft: 5500,
    views: 1250,
    leadsGenerated: 45,
    dateAdded: "2024-07-01",
    propertyType: "Villa",
  },
  {
    id: "prop2",
    title: "Modern Downtown Apartment",
    address: "25 High Street, Lower Parel, Mumbai",
    locality: "Lower Parel",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "modern apartment city",
    status: "Active",
    hasVrTour: false,
    price: "₹3.8 Cr",
    beds: 3,
    baths: 3,
    sqft: 1800,
    views: 870,
    leadsGenerated: 22,
    dateAdded: "2024-06-15",
    propertyType: "Apartment",
  },
  {
    id: "prop3",
    title: "Spacious Suburban House",
    address: "7 Green Avenue, Powai, Mumbai",
    locality: "Powai",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "suburban house garden",
    status: "Pending",
    hasVrTour: true,
    price: "₹5.2 Cr",
    beds: 4,
    baths: 4,
    sqft: 2800,
    views: 450,
    leadsGenerated: 10,
    dateAdded: "2024-07-10",
    propertyType: "House",
  },
  {
    id: "prop4",
    title: "Commercial Office Space",
    address: "Unit 505, BKC Business Hub, Mumbai",
    locality: "BKC",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "office building interior",
    status: "Active",
    hasVrTour: false,
    price: "₹250/sqft/month",
    beds: 0, // Not applicable
    baths: 2, // Common washrooms
    sqft: 3000,
    views: 600,
    leadsGenerated: 18,
    dateAdded: "2024-05-20",
    propertyType: "Commercial",
  },
  {
    id: "prop5",
    title: "Prime Plot of Land",
    address: "Survey No. 101, Alibaug, Raigad",
    locality: "Alibaug",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "empty land plot",
    status: "Sold",
    hasVrTour: false,
    price: "₹2.1 Cr",
    beds: 0,
    baths: 0,
    sqft: 10000, // Plot area
    views: 300,
    leadsGenerated: 5,
    dateAdded: "2024-03-01",
    propertyType: "Land",
  },
  {
    id: "prop6",
    title: "Cozy Studio Apartment",
    address: "Apt 12B, Skyline Towers, Andheri West",
    locality: "Andheri West",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "studio apartment compact",
    status: "Active",
    hasVrTour: true,
    price: "₹1.5 Cr",
    beds: 1,
    baths: 1,
    sqft: 650,
    views: 950,
    leadsGenerated: 30,
    dateAdded: "2024-07-15",
    propertyType: "Apartment",
  },
   {
    id: "prop7",
    title: "Penthouse with City View",
    address: "42nd Floor, Imperial Heights, Tardeo",
    locality: "Tardeo",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "penthouse city skyline",
    status: "Active",
    hasVrTour: true,
    price: "₹25 Cr",
    beds: 4,
    baths: 5,
    sqft: 4500,
    views: 1800,
    leadsGenerated: 60,
    dateAdded: "2024-06-01",
    propertyType: "Apartment",
  },
  {
    id: "prop8",
    title: "Retail Shop in High Street",
    address: "Shop No. 5, Linking Road, Bandra",
    locality: "Bandra",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "retail shop storefront",
    status: "Archived",
    hasVrTour: false,
    price: "₹1.8 Cr Leasehold",
    beds: 0,
    baths: 1,
    sqft: 800,
    views: 250,
    leadsGenerated: 8,
    dateAdded: "2023-12-10",
    propertyType: "Commercial",
  },
   {
    id: "prop9",
    title: "Farmhouse with Pool",
    address: "Green Valley Farms, Lonavala",
    locality: "Lonavala",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "farmhouse pool nature",
    status: "Active",
    hasVrTour: true,
    price: "₹7.0 Cr",
    beds: 6,
    baths: 7,
    sqft: 6000, // Plot area
    views: 700,
    leadsGenerated: 15,
    dateAdded: "2024-05-01",
    propertyType: "Villa",
  },
   {
    id: "prop10",
    title: "Affordable 1BHK Flat",
    address: "C-Wing, Happy Homes, Virar",
    locality: "Virar",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "budget apartment building",
    status: "Draft",
    hasVrTour: false,
    price: "₹45 Lacs",
    beds: 1,
    baths: 1,
    sqft: 450,
    views: 150,
    leadsGenerated: 3,
    dateAdded: "2024-07-20",
    propertyType: "Apartment",
  },
];


export default function PropertiesPage() {
  const [properties, setProperties] = React.useState<Property[]>(mockProperties);
  const [filters, setFilters] = React.useState<PropertyFilters>({
    searchTerm: "",
    status: [],
    propertyType: [],
    // location: "", // TODO: Implement location filter
  });
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [selectedProperties, setSelectedProperties] = React.useState<Set<string>>(new Set());

  // Pagination state
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = viewMode === 'grid' ? 9 : 10;

  const handleFiltersChange = (newFilters: PropertyFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); 
  };

  const handleSelectProperty = (propertyId: string, isSelected: boolean) => {
    setSelectedProperties(prev => {
      const newSelected = new Set(prev);
      if (isSelected) {
        newSelected.add(propertyId);
      } else {
        newSelected.delete(propertyId);
      }
      return newSelected;
    });
  };
  
  // const handleSelectAllProperties = (isSelected: boolean, propertiesToSelect: Property[]) => { // Placeholder
  //   setSelectedProperties(prev => {
  //     const newSelected = new Set(prev);
  //     if (isSelected) {
  //       propertiesToSelect.forEach(prop => newSelected.add(prop.id));
  //     } else {
  //       propertiesToSelect.forEach(prop => newSelected.delete(prop.id));
  //     }
  //     return newSelected;
  //   });
  // };

  const filteredProperties = React.useMemo(() => {
    let tempProperties = [...mockProperties]; // Use mockProperties directly for filtering
    
    if (filters.searchTerm) {
      const lowerSearchTerm = filters.searchTerm.toLowerCase();
      tempProperties = tempProperties.filter(prop =>
        prop.title.toLowerCase().includes(lowerSearchTerm) ||
        prop.address.toLowerCase().includes(lowerSearchTerm) ||
        prop.locality.toLowerCase().includes(lowerSearchTerm) ||
        prop.id.toLowerCase().includes(lowerSearchTerm)
      );
    }

    if (filters.status.length > 0) {
      tempProperties = tempProperties.filter(prop => filters.status.includes(prop.status.toLowerCase() as typeof PROPERTY_STATUSES[number]['id']));
    }

    if (filters.propertyType.length > 0) {
      tempProperties = tempProperties.filter(prop => filters.propertyType.includes(prop.propertyType.toLowerCase() as typeof PROPERTY_TYPES[number]['id']));
    }
    
    // TODO: Add location filter logic when typeahead is implemented

    return tempProperties;
  }, [filters]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  return (
    <div className="container mx-auto">
      <PageHeader title="Properties">
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => alert("Import Listings: Coming Soon!")}>
            <Upload className="mr-2 h-4 w-4" /> Import Listings
          </Button>
          <Button variant="outline" onClick={() => alert("Manage Settings: Coming Soon!")}>
            <SettingsIcon className="mr-2 h-4 w-4" /> Manage Settings
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
            <Link href="/properties/new"> {/* Placeholder link */}
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Property
            </Link>
          </Button>
        </div>
      </PageHeader>

      <PropertyFiltersToolbar 
        filters={filters} 
        onFiltersChange={handleFiltersChange}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* {selectedProperties.size > 0 && ( // Placeholder for bulk actions
        <BulkActionsToolbarProperties 
          selectedCount={selectedProperties.size}
          onClearSelection={() => setSelectedProperties(new Set())} 
        />
      )} */}

      <div className="mt-6">
        {viewMode === 'grid' ? (
          <PropertiesGridView properties={currentProperties} />
        ) : (
          <PropertiesListView 
            properties={currentProperties} 
            selectedProperties={selectedProperties}
            onSelectProperty={handleSelectProperty}
            // onSelectAllProperties={(isSelected) => handleSelectAllProperties(isSelected, currentProperties)} // Placeholder
            isAllSelectedInCurrentPage={currentProperties.length > 0 && currentProperties.every(prop => selectedProperties.has(prop.id))} // Placeholder
          />
        )}
      </div>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-end space-x-2 py-4 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

    