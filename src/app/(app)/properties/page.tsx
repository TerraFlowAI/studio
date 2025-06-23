
// src/app/(app)/properties/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Import your UI components
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Plus, List, Grid as GridIcon } from 'lucide-react'; // Renamed Grid to GridIcon
import { PageHeader } from '@/components/shared/PageHeader';
import { PropertyFiltersToolbar, type PropertyFilters as FiltersType } from '@/components/properties/PropertyFiltersToolbar';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { AddPropertyWizard } from '@/components/properties/AddPropertyWizard';
import type { Property as PropertyType } from '@/types/property';
import { PropertiesGridView } from '@/components/properties/PropertiesGridView';
import { PropertiesListView } from '@/components/properties/PropertiesListView';
import { Building } from 'lucide-react';

const mockProperties: PropertyType[] = [
    {
      id: 'prop-1',
      title: 'Stunning 3BHK with Sea View',
      address: 'Oceanic Towers, Bandra West',
      locality: 'Bandra West',
      city: 'Mumbai',
      price: '₹3.5 Cr',
      beds: 3,
      baths: 3,
      sqft: 1800,
      status: 'Active',
      listingFor: 'Sale',
      propertyType: 'Apartment',
      imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzb2ZhcGVudGhvdXNlfGVufDB8fHx8MTc1MDk4OTgwOXww&ixlib=rb-4.1.0&q=80&w=1080',
      aiHint: 'apartment living room',
      hasVrTour: true,
      views: 1256,
      leadsGenerated: 15,
      dateAdded: '2024-07-26T10:00:00Z',
    },
    {
      id: 'prop-2',
      title: 'Luxury Villa with Private Pool',
      address: 'Prestige Golfshire',
      locality: 'Nandi Hills',
      city: 'Bengaluru',
      price: '₹7.8 Cr',
      beds: 4,
      baths: 5,
      sqft: 4500,
      status: 'Sold',
      listingFor: 'Sale',
      propertyType: 'Villa',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwaW50ZXJpb3J8ZW58MHx8fHwxNzUwOTg5ODY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      aiHint: 'luxury villa',
      hasVrTour: true,
      views: 3400,
      leadsGenerated: 42,
      dateAdded: '2024-06-15T10:00:00Z',
    },
     {
      id: 'prop-3',
      title: 'Spacious Commercial Office Space',
      address: 'Cyber Hub, Sector 24',
      locality: 'DLF Cyber City',
      city: 'Gurugram',
      price: '₹2 Lakh/month',
      beds: 0,
      baths: 2,
      sqft: 3000,
      status: 'Pending',
      listingFor: 'Rent',
      propertyType: 'Commercial',
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxleHRlcmlvciUyMGhvdXNlfGVufDB8fHx8MTc1MDk4OTkzNHww&ixlib=rb-4.1.0&q=80&w=1080',
      aiHint: 'modern office',
      hasVrTour: false,
      views: 890,
      leadsGenerated: 5,
      dateAdded: '2024-07-20T10:00:00Z',
    },
    {
      id: 'prop-4',
      title: 'Cozy Studio Apartment',
      address: 'Koregaon Park',
      locality: 'Koregaon Park',
      city: 'Pune',
      price: '₹85 Lakh',
      beds: 1,
      baths: 1,
      sqft: 650,
      status: 'Draft',
      listingFor: 'Sale',
      propertyType: 'Apartment',
      imageUrl: 'https://placehold.co/600x400.png',
      aiHint: 'studio apartment',
      hasVrTour: false,
      views: 0,
      leadsGenerated: 0,
      dateAdded: '2024-07-28T10:00:00Z',
    },
];

// Main Page Component
export default function PropertiesPage() {
  const { properties, loading } = { properties: mockProperties, loading: false };
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<FiltersType>({
    searchTerm: "",
    status: [],
    propertyType: [],
  });
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const router = useRouter();

  const filteredProperties = React.useMemo(() => {
    let tempProperties = [...properties];
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
        tempProperties = tempProperties.filter(prop => filters.status.includes(prop.status.toLowerCase() as any));
    }
    if (filters.propertyType.length > 0) {
        tempProperties = tempProperties.filter(prop => filters.propertyType.includes(prop.propertyType.toLowerCase() as any));
    }
    return tempProperties;
  }, [properties, filters]);


  const renderContent = () => {
    if (loading) {
      return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
    }

    if (properties.length === 0) {
      return (
        <div className="text-center py-16 border-2 border-dashed rounded-lg flex flex-col items-center">
            <Building className="h-20 w-20 text-primary/20 mb-4" />
            <h3 className="text-xl font-semibold">Your inventory is empty.</h3>
            <p className="text-gray-500 mt-2 mb-4">Add your first property to get started.</p>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add New Property
                </Button>
            </DialogTrigger>
        </div>
      );
    }
    
    return (
        <>
            <PropertyFiltersToolbar 
                filters={filters}
                onFiltersChange={setFilters}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
            />
            <div className="mt-6">
                {viewMode === 'grid' ? (
                    <PropertiesGridView properties={filteredProperties} />
                ) : (
                    <PropertiesListView 
                        properties={filteredProperties} 
                        selectedProperties={new Set()} // Placeholder
                        onSelectProperty={() => {}} // Placeholder
                        isAllSelectedInCurrentPage={false} // Placeholder
                    />
                )}
            </div>
        </>
    )
  };

  return (
    <Dialog open={isWizardOpen} onOpenChange={setIsWizardOpen}>
        <div className="container mx-auto">
            <PageHeader title="Properties">
                 <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => router.push('/properties/new')}>
                    <Plus className="mr-2 h-4 w-4" /> Add New Property
                </Button>
            </PageHeader>
            {renderContent()}
        </div>
         <DialogContent className="sm:max-w-4xl p-0">
          <AddPropertyWizard onClose={() => setIsWizardOpen(false)} />
        </DialogContent>
    </Dialog>
  );
}
