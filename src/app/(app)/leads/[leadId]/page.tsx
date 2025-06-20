
// src/app/(app)/leads/[leadId]/page.tsx
"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { LeadDetailHeader } from "@/components/leads/detail/LeadDetailHeader";
import { AiInsightsCard } from "@/components/leads/detail/AiInsightsCard";
import { LeadContactInfoCard } from "@/components/leads/detail/LeadContactInfoCard";
import { LeadPreferencesCard } from "@/components/leads/detail/LeadPreferencesCard";
import { MatchedPropertiesCard } from "@/components/leads/detail/MatchedPropertiesCard";
import { ActivityHub } from "@/components/leads/detail/ActivityHub";
import type { Lead } from "@/components/leads/LeadsTable"; // Assuming Lead type is exported
import type { ActivityEvent } from "@/components/leads/detail/ActivityTimelineItem"; // Define this type

// Mock data for a single lead
const mockLeadData: Lead = {
  id: "1",
  name: "Shamanth Umesh",
  email: "shamanth@example.com",
  phone: "+91 9123456789",
  aiScore: 88,
  aiScoreFactors: "High budget match (+20), Viewed 5+ listings (+15), Inquired on 'Luxury Apartment' (+10), Frequent site visits (+10), Downloaded brochure (+5)",
  source: "Website Chatbot",
  dateAdded: "2023-10-26",
  status: "Contacted",
  propertyOfInterest: "Luxury Apartment in Bandra",
};

const mockMatchedProperties = [
  { id: "prop1", title: "Sea View Penthouse", price: "₹3.8 Cr", imageUrl: "https://images.unsplash.com/photo-1685300077128-ca33b07cc561?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxzZWElMjB2aWV3JTIwcGVudGhvdXNlfGVufDB8fHx8MTc1MDQyNzQ0OHww&ixlib=rb-4.1.0&q=80&w=1080", aiHint: "sea view", hasVrTour: true },
  { id: "prop2", title: "Spacious Bandra Flat", price: "₹3.5 Cr", imageUrl: "https://placehold.co/300x200.png", aiHint: "apartment interior", hasVrTour: false },
  { id: "prop3", title: "Juhu Beachfront Villa", price: "₹4.2 Cr", imageUrl: "https://placehold.co/300x200.png", aiHint: "luxury villa", hasVrTour: true },
];

const mockActivities: ActivityEvent[] = [
  { id: "act1", type: "AI Update", user: "TerraFlow AI", content: "AI detected lead score increase to 88. Reason: Viewed 3 new properties in Bandra.", timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), leadName: mockLeadData.name },
  { id: "act2", type: "Call", user: "Loushik", content: "Discussed requirements for 3BHK in Bandra. Client is keen on sea-facing properties.", timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), leadName: mockLeadData.name },
  { id: "act3", type: "Email", user: "Loushik", content: "Sent initial brochure and company profile.", timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), leadName: mockLeadData.name },
  { id: "act4", type: "Note", user: "Loushik", content: "Client mentioned they are pre-approved for a loan up to ₹4 Cr.", timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), leadName: mockLeadData.name },
];


export default function LeadDetailPage() {
  const params = useParams();
  const leadId = params.leadId as string;

  // In a real app, you would fetch lead data based on leadId
  const [lead, setLead] = React.useState<Lead>(mockLeadData);
  const [activities, setActivities] = React.useState<ActivityEvent[]>(mockActivities);

  const handleStatusChange = (newStatus: string) => {
    setLead(prev => ({ ...prev, status: newStatus }));
    // Add a system activity for status change
    const newActivity: ActivityEvent = {
      id: `act-${Date.now()}`,
      type: "System Update",
      user: "System",
      content: `Lead status changed to ${newStatus}.`,
      timestamp: new Date(),
      leadName: lead.name,
    };
    setActivities(prev => [newActivity, ...prev]);
  };

  const handleAddActivity = (activity: Omit<ActivityEvent, 'id' | 'timestamp' | 'leadName'>) => {
    const newActivity: ActivityEvent = {
      ...activity,
      id: `act-${Date.now()}`,
      timestamp: new Date(),
      leadName: lead.name,
    };
    setActivities(prev => [newActivity, ...prev]);
  };


  if (!lead) {
    // TODO: Add a proper loading state or not found page
    return <div>Loading lead details...</div>;
  }

  return (
    <div className="container mx-auto p-0">
      <LeadDetailHeader
        leadName={lead.name}
        currentStatus={lead.status}
        onStatusChange={handleStatusChange}
      />
      {/* Top section: Activity Hub on left, AI Insights & Contact Info on right */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Activity Hub) */}
        <div className="lg:col-span-2">
          <ActivityHub activities={activities} onAddActivity={handleAddActivity} leadName={lead.name} />
        </div>

        {/* Right Column (Top Profile & Intel Cards) */}
        <div className="lg:col-span-1 space-y-3">
          <AiInsightsCard
            leadScore={lead.aiScore}
            scoreSummary={`This is a **Hot Lead** based on high engagement and budget match.`}
            nextBestAction={`Call now to discuss their interest in '${lead.propertyOfInterest || "their preferred property type"}'."`}
          />
          <LeadContactInfoCard
            email={lead.email}
            phone={lead.phone}
            source={lead.source}
            assignedTo="Loushik" // Mocked
          />
        </div>
      </div>

      {/* Bottom section: Client Preferences and Matched Properties side-by-side */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <LeadPreferencesCard
          location="Bandra West, Juhu" // Mocked
          budget="₹3.5 Cr - ₹4.0 Cr" // Mocked
          propertyType="3 BHK+ Apartment" // Mocked
        />
        <MatchedPropertiesCard properties={mockMatchedProperties} />
      </div>
    </div>
  );
}
