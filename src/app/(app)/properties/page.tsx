// src/app/(app)/properties/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { firestore } from '@/lib/firebase';
import { collection, query, where, onSnapshot, orderBy, Timestamp } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Import your UI components
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Plus, List, Grid as GridIcon } from 'lucide-react'; // Renamed Grid to GridIcon
import Image from 'next/image';
import { PageHeader } from '@/components/shared/PageHeader';
import { PropertyFilters, type PropertyFilters as FiltersType } from '@/components/properties/PropertyFiltersToolbar';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { AddPropertyWizard } from '@/components/properties/AddPropertyWizard';
import { cn } from '@/lib/utils';
import type { Property as PropertyType } from '@/types/property';
import { PropertiesGridView } from '@/components/properties/PropertiesGridView';
import { PropertiesListView } from '@/components/properties/PropertiesListView';
import { Building } from 'lucide-react';
import { PropertyFiltersToolbar } from '@/components/properties/PropertyFiltersToolbar';


// Custom hook to fetch properties
const useProperties = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const propertiesCollectionRef = collection(firestore, "properties");
    const q = query(
      propertiesCollectionRef,
      where("ownerId", "==", user.uid),
      orderBy("dateAdded", "desc") // Changed from createdAt to dateAdded to match schema
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const propertiesData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        const dateAdded = data.dateAdded instanceof Timestamp 
          ? data.dateAdded.toDate().toISOString() 
          : new Date().toISOString();

        return {
          id: doc.id,
          title: data.title || 'Untitled Property',
          address: data.address || 'No Address',
          locality: data.locality || '',
          city: data.city || '',
          price: data.price || 'N/A',
          beds: data.bedrooms || 0,
          baths: data.bathrooms || 0,
          sqft: data.areaSqft || 0,
          status: data.status || 'Draft',
          listingFor: data.listingFor || 'Sale',
          propertyType: data.propertyType || 'Other',
          imageUrl: data.imageUrl || 'https://placehold.co/600x400.png',
          aiHint: data.aiHint || 'property exterior',
          hasVrTour: data.hasVrTour || false,
          views: data.views || 0,
          leadsGenerated: data.leadsGenerated || 0,
          dateAdded: dateAdded,
        } as PropertyType;
      });
      setProperties(propertiesData);
      setLoading(false);
    }, (error) => {
        console.error("Error fetching properties: ", error);
        setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  return { properties, loading };
};

// Main Page Component
export default function PropertiesPage() {
  const { properties, loading } = useProperties();
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
                 <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Plus className="mr-2 h-4 w-4" /> Add New Property
                    </Button>
                </DialogTrigger>
            </PageHeader>
            {renderContent()}
        </div>
         <DialogContent className="sm:max-w-4xl p-0">
          <AddPropertyWizard onClose={() => setIsWizardOpen(false)} />
        </DialogContent>
    </Dialog>
  );
}