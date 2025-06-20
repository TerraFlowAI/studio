
// src/app/(app)/properties/[propertyId]/page.tsx
"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { PropertyPageHeader } from "@/components/properties/detail/PropertyPageHeader";
import { MediaGallery } from "@/components/properties/detail/MediaGallery";
import { KeyDetailsBar } from "@/components/properties/detail/KeyDetailsBar";
import { TerraScribeDisplayCard } from "@/components/properties/detail/TerraScribeDisplayCard";
import { DetailedInfoAccordion } from "@/components/properties/detail/DetailedInfoAccordion";
import { ListingPerformanceCard } from "@/components/properties/detail/ListingPerformanceCard";
import { AssociatedLeadsListCard } from "@/components/properties/detail/AssociatedLeadsListCard";
import { PropertyDocumentsManagerCard } from "@/components/properties/detail/PropertyDocumentsManagerCard";
import type { Property } from "@/types/property"; // Assuming a detailed type might be needed
import type { Lead } from "@/components/leads/LeadsTable"; // For associated leads

// Mock Data for a single detailed property
// This would typically be fetched based on params.propertyId
const mockPropertyDetail = {
  id: "prop1",
  title: "3 BHK Sea-View Apartment in Bandra West",
  fullAddress: "Apt 1201, Ocean Heights, Bandra West, Mumbai, Maharashtra 400050",
  status: "Active" as Property["status"],
  publicPageUrl: "/public/properties/prop1", // Placeholder
  mainImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzb2ZhcGVudGhvdXNlfGVufDB8fHx8MTc1MDk4OTgwOXww&ixlib=rb-4.1.0&q=80&w=1080",
  thumbnailImages: [
    "https://images.unsplash.com/photo-1616046229478-9901c5536a45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxsaXZpbmclMjByb29tJTIwaW50ZXJpb3J8ZW58MHx8fHwxNzUwOTg5ODQyfDA&ixlib=rb-4.1.0&q=80&w=200",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwaW50ZXJpb3J8ZW58MHx8fHwxNzUwOTg5ODY0fDA&ixlib=rb-4.1.0&q=80&w=200",
    "https://images.unsplash.com/photo-1615875605825-5eb9bb5d52ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxiZWRyb29tJTIwaW50ZXJpb3J8ZW58MHx8fHwxNzUwOTg5ODg2fDA&ixlib=rb-4.1.0&q=80&w=200",
    "https://images.unsplash.com/photo-1582582494705-f8ce0b0c2490?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxiYXRocm9vbSUyMGludGVyaW9yfGVufDB8fHx8MTc1MDk4OTkxMXww&ixlib=rb-4.1.0&q=80&w=200",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxleHRlcmlvciUyMGhvdXNlfGVufDB8fHx8MTc1MDk4OTkzNHww&ixlib=rb-4.1.0&q=80&w=200",
  ],
  aiHints: ["modern apartment living room", "modern kitchen", "luxury bedroom", "modern bathroom", "apartment building exterior"],
  hasVrTour: true,
  vrTourUrl: "/vr-tours/prop1", // Placeholder
  price: "₹3.5 Cr",
  beds: 3,
  baths: 3,
  sqft: 1800,
  terraScribeDescription: "Indulge in breathtaking panoramic sea views from this exquisite 3 BHK apartment, perfectly situated in the heart of vibrant Bandra West. Designed for modern living, this residence boasts an expansive open-plan living and dining area, ideal for entertaining. Floor-to-ceiling windows flood the space with natural light, highlighting the premium finishes and elegant interiors. The gourmet kitchen is a chef's delight, equipped with top-of-the-line appliances and sleek cabinetry. Each of the three spacious bedrooms offers a serene retreat, with the master suite featuring a luxurious en-suite bathroom and a private balcony overlooking the Arabian Sea. Residents enjoy access to exclusive amenities including a state-of-the-art gym, swimming pool, and dedicated concierge services. Experience the pinnacle of coastal luxury living in one of Mumbai's most sought-after addresses.",
  amenities: ["Sea View", "Swimming Pool", "Gymnasium", "Concierge", "Reserved Parking", "High-speed Elevators", "Power Backup", "Security System"],
  propertyDetailsTable: [
    { label: "Property Age", value: "2 Years" },
    { label: "Floor", value: "12th of 20" },
    { label: "Furnishing", value: "Semi-Furnished" },
    { label: "Facing", value: "West (Sea Facing)" },
    { label: "Possession", value: "Ready to Move" },
  ],
  locationCoordinates: { lat: 19.0596, lng: 72.8295 }, // Example coordinates for Bandra West
  performance: {
    views: 1256,
    leads: 15,
    ctr: 1.2,
    viewHistory: [ // Simplified for chart
      { date: "2024-06-28", views: 30 }, { date: "2024-07-05", views: 50 },
      { date: "2024-07-12", views: 75 }, { date: "2024-07-19", views: 60 },
      { date: "2024-07-26", views: 90 },
    ],
  },
  aiPriceAnalysis: "This property is priced competitively. The average for similar properties in this area is ₹3.4 Cr.",
  associatedLeads: [
    { id: "1", name: "Aarav Sharma", email: "aarav@example.com", aiScore: 88, source: "Website", dateAdded: "2023-10-26", status: "Hot Lead" },
    { id: "2", name: "Priya Singh", email: "priya@example.com", aiScore: 72, source: "Referral", dateAdded: "2023-10-24", status: "Contacted" },
  ] as Partial<Lead>[], // Use Partial as full Lead type has more fields
  documents: [
    { id: "doc1", name: "Title Deed.pdf", url: "#", verifiedStatus: true, type: "Legal" },
    { id: "doc2", name: "Floor Plan.jpg", url: "#", verifiedStatus: true, type: "Layout" },
    { id: "doc3", name: "RERA Certificate.pdf", url: "#", verifiedStatus: false, type: "Compliance" },
  ],
  terraSecureVerified: true,
};


export default function PropertyDetailPage() {
  const params = useParams();
  const propertyId = params.propertyId as string;

  // In a real app, fetch propertyData based on propertyId
  // For now, using mock data. We'll assume propertyId 'prop1' matches our mock data.
  const [propertyData, setPropertyData] = React.useState(mockPropertyDetail); 

  if (!propertyData) {
    // TODO: Add a proper loading state or not found page
    return <div className="container mx-auto p-4">Loading property details...</div>;
  }
  
  const handleStatusChange = (newStatus: string) => {
    setPropertyData(prev => prev ? ({ ...prev, status: newStatus as Property["status"] }) : null);
    // API call to update status would go here
  };

  return (
    <div className="container mx-auto">
      <PropertyPageHeader
        propertyName={propertyData.title}
        currentStatus={propertyData.status}
        onStatusChange={handleStatusChange}
        publicPageUrl={propertyData.publicPageUrl}
        onEdit={() => alert("Edit Listing Clicked - Placeholder for Wizard")}
      />
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left Column: Showcase */}
        <div className="lg:col-span-2 space-y-6">
          <MediaGallery
            mainImage={propertyData.mainImage}
            thumbnailImages={propertyData.thumbnailImages}
            aiHints={propertyData.aiHints}
            hasVrTour={propertyData.hasVrTour}
            vrTourUrl={propertyData.vrTourUrl}
            propertyTitle={propertyData.title}
          />
          <KeyDetailsBar
            price={propertyData.price}
            beds={propertyData.beds}
            baths={propertyData.baths}
            sqft={propertyData.sqft}
          />
          <TerraScribeDisplayCard
            description={propertyData.terraScribeDescription}
            onRefine={() => alert("Refine with TerraScribe™ Clicked")}
          />
          <DetailedInfoAccordion
            amenities={propertyData.amenities}
            propertyDetails={propertyData.propertyDetailsTable}
            locationCoordinates={propertyData.locationCoordinates}
          />
        </div>

        {/* Right Column: Agent's Control Panel */}
        <div className="lg:col-span-1 space-y-6">
          <ListingPerformanceCard
            views={propertyData.performance.views}
            leads={propertyData.performance.leads}
            ctr={propertyData.performance.ctr}
            viewHistory={propertyData.performance.viewHistory}
            aiPriceAnalysis={propertyData.aiPriceAnalysis}
          />
          <AssociatedLeadsListCard leads={propertyData.associatedLeads as Lead[]} />
          <PropertyDocumentsManagerCard
            documents={propertyData.documents}
            isTerraSecureVerified={propertyData.terraSecureVerified}
            onUpload={() => alert("Upload Document Clicked")}
            onGetVerified={() => alert("Get Verified Clicked")}
          />
        </div>
      </div>
    </div>
  );
}

    