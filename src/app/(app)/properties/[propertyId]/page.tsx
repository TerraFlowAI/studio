"use client";

import { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import { PropertyPageHeader } from '@/components/properties/detail/PropertyPageHeader';
import { MediaGallery } from '@/components/properties/detail/MediaGallery';
import { KeyDetailsBar } from '@/components/properties/detail/KeyDetailsBar';
import { TerraScribeDisplayCard } from '@/components/properties/detail/TerraScribeDisplayCard';
import { DetailedInfoAccordion } from '@/components/properties/detail/DetailedInfoAccordion';
import { ListingPerformanceCard } from '@/components/properties/detail/ListingPerformanceCard';
import { AssociatedLeadsListCard } from '@/components/properties/detail/AssociatedLeadsListCard';
import { PropertyDocumentsManagerCard } from '@/components/properties/detail/PropertyDocumentsManagerCard';
import type { Property } from '@/types/property';
import type { Lead } from '@/components/leads/LeadsTable';

// MOCK DATA - In a real app, this would be a fetch call
const getPropertyData = (propertyId: string): Property | undefined => {
  const mockProperties: Property[] = [
    { id: '1', title: 'Luxury 3BHK with Sea View', address: '123 Ocean Drive', locality: 'Bandra West', city: 'Mumbai', status: 'Active', price: '₹7.5 Cr', beds: 3, baths: 3, sqft: 2200, imageUrl: 'https://placehold.co/1200x700.png', aiHint: "apartment ocean view", hasVrTour: true, views: 1250, leadsGenerated: 45, dateAdded: '2024-07-15T10:00:00Z', listingFor: 'Sale', propertyType: 'Apartment' },
  ];
  return mockProperties.find(p => p.id === propertyId);
};

const mockPropertyData = {
  description: "Discover unparalleled luxury in this stunning 3BHK apartment, perfectly situated in the heart of Bandra West. Boasting panoramic sea views from every room, this residence offers a serene escape from the city's hustle.\n\nThe spacious living area is bathed in natural light, complemented by high ceilings and imported marble flooring. A state-of-the-art modular kitchen with premium appliances awaits your culinary adventures. Each of the three bedrooms features an en-suite bathroom and ample closet space, ensuring comfort and privacy for the entire family. Step out onto the expansive balcony to enjoy breathtaking sunsets over the Arabian Sea.",
  amenities: ["Swimming Pool", "Gymnasium", "24/7 Security", "Clubhouse", "High-speed Elevators", "Concierge Service", "Power Backup", "Reserved Parking", "Children's Play Area"],
  details: [
    { label: "Possession Status", value: "Ready to Move" },
    { label: "Facing", value: "West (Sea-facing)" },
    { label: "Floor", value: "15th of 22 Floors" },
    { label: "Age of Property", value: "2 Years" },
    { label: "Transaction Type", value: "Resale" },
    { label: "RERA ID", value: "P51900000001" },
  ],
  coordinates: { lat: 19.0596, lng: 72.8295 }, // Approx. coordinates for Bandra, Mumbai
  thumbnailImages: [
      'https://placehold.co/100x67.png?1', 
      'https://placehold.co/100x67.png?2', 
      'https://placehold.co/100x67.png?3',
      'https://placehold.co/100x67.png?4',
      'https://placehold.co/100x67.png?5',
  ],
  aiHints: ["living room modern", "kitchen sleek", "bedroom minimalist", "bathroom elegant", "balcony view"],
  viewHistory: [
    { date: "2024-07-20", views: 50 },
    { date: "2024-07-21", views: 120 },
    { date: "2024-07-22", views: 95 },
    { date: "2024-07-23", views: 150 },
    { date: "2024-07-24", views: 180 },
    { date: "2024-07-25", views: 250 },
    { date: "2024-07-26", views: 405 },
  ],
  aiPriceAnalysis: "Price is 3% above the local average for similar properties but justified by premium sea view and recent renovations.",
  associatedLeads: [
    { id: '1', name: 'Aarav Sharma', aiScore: 92, status: 'Viewing Scheduled'},
    { id: '7', name: 'Ishaan Mehta', aiScore: 85, status: 'Contacted'},
    { id: '8', name: 'Diya Singh', aiScore: 72, status: 'New'},
  ],
  documents: [
    { id: 'd1', name: 'Sale_Deed.pdf', url: '#', verifiedStatus: true, type: 'Legal'},
    { id: 'd2', name: 'Floor_Plan_Final.pdf', url: '#', verifiedStatus: false, type: 'Layout'},
    { id: 'd3', name: 'RERA_Certificate.pdf', url: '#', verifiedStatus: true, type: 'Compliance'},
  ]
};

export default function PropertyDetailPage() {
    const { propertyId } = useParams<{ propertyId: string }>();
    
    const propertyData = getPropertyData(propertyId);
    
    if (!propertyData) {
        notFound();
    }

    const [status, setStatus] = useState<Property["status"]>(propertyData.status);

    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus as Property["status"]);
        // In a real app, you would also persist this change to the database
    };

    return (
        <div className="container mx-auto">
            <PropertyPageHeader 
                propertyName={propertyData.title}
                currentStatus={status}
                onStatusChange={handleStatusChange}
                publicPageUrl={`/properties/${propertyData.id}`} // Mock public URL
                onEdit={() => alert("Navigate to edit page")}
            />
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-8">
                {/* Main Content */}
                <div className="lg:col-span-7 space-y-6">
                    <MediaGallery 
                        mainImage={propertyData.imageUrl}
                        thumbnailImages={mockPropertyData.thumbnailImages}
                        aiHints={mockPropertyData.aiHints}
                        hasVrTour={propertyData.hasVrTour}
                        vrTourUrl={propertyData.vrTourUrl || ''}
                        propertyTitle={propertyData.title}
                    />
                    <KeyDetailsBar 
                        price={propertyData.price}
                        beds={propertyData.beds}
                        baths={propertyData.baths}
                        sqft={propertyData.sqft}
                    />
                    <TerraScribeDisplayCard 
                        description={mockPropertyData.description}
                        onRefine={() => alert("Refine description clicked")}
                    />
                    <DetailedInfoAccordion 
                        amenities={mockPropertyData.amenities}
                        propertyDetails={mockPropertyData.details}
                        locationCoordinates={mockPropertyData.coordinates}
                    />
                </div>
                {/* Sidebar */}
                <div className="lg:col-span-3 space-y-6">
                    <ListingPerformanceCard 
                        views={propertyData.views}
                        leads={propertyData.leadsGenerated}
                        ctr={2.5} // Mock CTR
                        viewHistory={mockPropertyData.viewHistory}
                        aiPriceAnalysis={mockPropertyData.aiPriceAnalysis}
                    />
                    <AssociatedLeadsListCard leads={mockPropertyData.associatedLeads as Partial<Lead>[]} />
                    <PropertyDocumentsManagerCard 
                        documents={mockPropertyData.documents}
                        isTerraSecureVerified={false}
                        onUpload={() => alert("Upload clicked")}
                        onGetVerified={() => alert("Get Verified clicked")}
                    />
                </div>
            </div>
        </div>
    );
}
