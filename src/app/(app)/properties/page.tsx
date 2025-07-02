"use client";

import { useState, useMemo } from 'react';
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { PlusCircle, Loader2 } from "lucide-react";
import Link from 'next/link';
import { PropertiesGridView } from '@/components/properties/PropertiesGridView';
import { PropertiesListView } from '@/components/properties/PropertiesListView';
import { PropertyFiltersToolbar, type PropertyFilters } from '@/components/properties/PropertyFiltersToolbar';
import type { Property } from '@/types/property';


// Mock data as the hook was removed
const mockProperties: Property[] = [
    { id: '1', title: 'Luxury 3BHK with Sea View', address: '123 Ocean Drive', locality: 'Bandra West', city: 'Mumbai', status: 'Active', price: '₹7.5 Cr', beds: 3, baths: 3, sqft: 2200, imageUrl: 'https://placehold.co/600x400.png', aiHint: "apartment ocean view", hasVrTour: true, views: 1250, leadsGenerated: 45, dateAdded: '2024-07-15T10:00:00Z', listingFor: 'Sale', propertyType: 'Apartment' },
    { id: '2', title: 'Spacious 4BHK Villa', address: '45 Green Valley', locality: 'Koramangala', city: 'Bangalore', status: 'Active', price: '₹12 Cr', beds: 4, baths: 5, sqft: 4500, imageUrl: 'https://placehold.co/600x400.png', aiHint: "modern villa exterior", hasVrTour: false, views: 800, leadsGenerated: 22, dateAdded: '2024-07-10T12:30:00Z', listingFor: 'Sale', propertyType: 'Villa' },
    { id: '3', title: '2BHK Apartment for Rent', address: '789 Tech Park Road', locality: 'Hitech City', city: 'Hyderabad', status: 'Pending', price: '₹65,000/mo', beds: 2, baths: 2, sqft: 1300, imageUrl: 'https://placehold.co/600x400.png', aiHint: "apartment building", hasVrTour: true, views: 2100, leadsGenerated: 88, dateAdded: '2024-06-28T09:00:00Z', listingFor: 'Rent', propertyType: 'Apartment' },
    { id: '4', title: 'Commercial Office Space', address: '101 Business Hub', locality: 'Cyber City', city: 'Gurgaon', status: 'Sold', price: '₹5 Cr', beds: 0, baths: 2, sqft: 3000, imageUrl: 'https://placehold.co/600x400.png', aiHint: "office space interior", hasVrTour: false, views: 3500, leadsGenerated: 150, dateAdded: '2024-05-20T11:00:00Z', listingFor: 'Sale', propertyType: 'Commercial' },
    { id: '5', title: 'Plot of Land for Development', address: 'Plot 55, Future City', locality: 'ECR', city: 'Chennai', status: 'Archived', price: '₹3 Cr', beds: 0, baths: 0, sqft: 5000, imageUrl: 'https://placehold.co/600x400.png', aiHint: "land plot aerial", hasVrTour: false, views: 450, leadsGenerated: 12, dateAdded: '2024-04-10T15:00:00Z', listingFor: 'Sale', propertyType: 'Land' },
    { id: '6', title: 'Penthouse with Rooftop Garden', address: 'The Zenith Tower', locality: 'Indiranagar', city: 'Bangalore', status: 'Active', price: '₹15 Cr', beds: 5, baths: 6, sqft: 6000, imageUrl: 'https://placehold.co/600x400.png', aiHint: "luxury penthouse", hasVrTour: true, views: 1800, leadsGenerated: 35, dateAdded: '2024-07-18T18:00:00Z', listingFor: 'Sale', propertyType: 'Apartment' },
];


export default function PropertiesPage() {
    const [properties, setProperties] = useState<Property[]>(mockProperties);
    const [isLoading, setIsLoading] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedProperties, setSelectedProperties] = useState<Set<string>>(new Set());
    
    const [filters, setFilters] = useState<PropertyFilters>({
      searchTerm: '',
      status: [],
      propertyType: [],
    });

    const filteredProperties = useMemo(() => {
        let tempProperties = [...properties];
        
        if (filters.searchTerm) {
            tempProperties = tempProperties.filter(prop => 
                prop.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                prop.address.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                prop.locality.toLowerCase().includes(filters.searchTerm.toLowerCase())
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

    const handleSelectProperty = (propertyId: string, isSelected: boolean) => {
        const newSelection = new Set(selectedProperties);
        if (isSelected) {
            newSelection.add(propertyId);
        } else {
            newSelection.delete(propertyId);
        }
        setSelectedProperties(newSelection);
    };

    return (
        <>
            <PageHeader title="Property Listings" description="Manage all your properties in one place.">
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link href="/properties/new">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add New Property
                    </Link>
                </Button>
            </PageHeader>

            <PropertyFiltersToolbar 
                filters={filters}
                onFiltersChange={setFilters}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
            />

            <div className="mt-6">
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : viewMode === 'grid' ? (
                    <PropertiesGridView properties={filteredProperties} />
                ) : (
                    <PropertiesListView 
                        properties={filteredProperties} 
                        selectedProperties={selectedProperties}
                        onSelectProperty={handleSelectProperty}
                        isAllSelectedInCurrentPage={filteredProperties.length > 0 && selectedProperties.size === filteredProperties.length}
                    />
                )}
            </div>
        </>
    );
}
