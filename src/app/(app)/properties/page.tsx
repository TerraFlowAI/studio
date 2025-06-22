
"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { PropertyFiltersToolbar, type PropertyFilters } from "@/components/properties/PropertyFiltersToolbar";
import { PropertiesGridView } from "@/components/properties/PropertiesGridView";
import { PropertiesListView } from "@/components/properties/PropertiesListView";
import { PlusCircle, Upload, Settings as SettingsIcon, Building, Loader2 } from "lucide-react";
import Link from "next/link";
import type { Property } from "@/types/property";
import { PROPERTY_STATUSES, PROPERTY_TYPES } from "@/lib/constants";
import { useAuth } from "@/app/context/AuthContext";
import { firestore } from "@/lib/firebase";
import { collection, query, where, onSnapshot, orderBy, Timestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AddPropertyWizard } from "@/components/properties/AddPropertyWizard";

export default function PropertiesPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [properties, setProperties] = React.useState<Property[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [filters, setFilters] = React.useState<PropertyFilters>({
    searchTerm: "",
    status: [],
    propertyType: [],
  });
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [selectedProperties, setSelectedProperties] = React.useState<Set<string>>(new Set());
  const [isWizardOpen, setIsWizardOpen] = React.useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = viewMode === 'grid' ? 9 : 10;
  
  // Real-time data fetching from Firestore
  React.useEffect(() => {
    if (!user) {
        setIsLoading(false);
        return;
    }

    setIsLoading(true);
    const propertiesCollectionRef = collection(firestore, "properties");
    
    // Base query for the current user's properties
    const q = query(
      propertiesCollectionRef, 
      where("ownerId", "==", user.uid),
      orderBy("dateAdded", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedProperties: Property[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const dateAdded = data.dateAdded instanceof Timestamp 
          ? data.dateAdded.toDate().toISOString().split('T')[0] 
          : typeof data.dateAdded === 'string' ? data.dateAdded : new Date().toISOString().split('T')[0];
          
        fetchedProperties.push({
          id: doc.id,
          title: data.title || "Untitled Property",
          address: data.address || "No Address",
          locality: data.locality || "Unknown",
          imageUrl: data.imageUrl || "https://placehold.co/600x400.png",
          aiHint: data.aiHint || "property exterior",
          status: data.status || "Draft",
          hasVrTour: data.hasVrTour || false,
          price: data.price || "N/A",
          beds: data.beds || 0,
          baths: data.baths || 0,
          sqft: data.sqft || 0,
          views: data.views || 0,
          leadsGenerated: data.leadsGenerated || 0,
          dateAdded: dateAdded,
          propertyType: data.propertyType || "Other",
        });
      });
      setProperties(fetchedProperties);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching properties: ", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not fetch properties from the database.",
      });
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [user, toast]);


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
      tempProperties = tempProperties.filter(prop => filters.status.includes(prop.status.toLowerCase() as typeof PROPERTY_STATUSES[number]['id']));
    }

    if (filters.propertyType.length > 0) {
      tempProperties = tempProperties.filter(prop => filters.propertyType.includes(prop.propertyType.toLowerCase() as typeof PROPERTY_TYPES[number]['id']));
    }

    return tempProperties;
  }, [properties, filters]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-24 text-center text-muted-foreground">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-lg font-semibold">Loading Your Properties...</p>
        </div>
      );
    }

    if (properties.length === 0) {
       return (
        <div className="flex flex-col items-center justify-center py-24 text-center text-muted-foreground">
          <Building className="h-20 w-20 text-primary/20 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Your inventory is empty.</h3>
          <p className="mb-4">Get started by adding your first property listing.</p>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Property
            </Button>
          </DialogTrigger>
        </div>
      );
    }

    return (
      <>
        {viewMode === 'grid' ? (
          <PropertiesGridView properties={currentProperties} />
        ) : (
          <PropertiesListView 
            properties={currentProperties} 
            selectedProperties={selectedProperties}
            onSelectProperty={handleSelectProperty}
            isAllSelectedInCurrentPage={currentProperties.length > 0 && currentProperties.every(prop => selectedProperties.has(prop.id))}
          />
        )}
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
      </>
    );
  };
  
  return (
    <Dialog open={isWizardOpen} onOpenChange={setIsWizardOpen}>
      <div className="container mx-auto">
        <PageHeader title="Properties">
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => alert("Import Listings: Coming Soon!")}>
              <Upload className="mr-2 h-4 w-4" /> Import Listings
            </Button>
            <Button variant="outline" onClick={() => alert("Manage Settings: Coming Soon!")}>
              <SettingsIcon className="mr-2 h-4 w-4" /> Manage Settings
            </Button>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Property
              </Button>
            </DialogTrigger>
          </div>
        </PageHeader>

        <PropertyFiltersToolbar 
          filters={filters} 
          onFiltersChange={handleFiltersChange}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
        
        <div className="mt-6">
          {renderContent()}
        </div>
      </div>
      <DialogContent className="sm:max-w-4xl p-0">
          <AddPropertyWizard onClose={() => setIsWizardOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
