
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
import type { Lead } from "@/components/leads/LeadsTable";
import type { ActivityEvent } from "@/components/leads/detail/ActivityTimelineItem";
import { doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { useAuth } from "@/app/context/AuthContext";
import { Loader2 } from "lucide-react";

// Mock data for components that are not yet connected to the backend
const mockMatchedProperties = [
  { id: "prop1", title: "Sea View Penthouse", price: "₹3.8 Cr", imageUrl: "https://images.unsplash.com/photo-1685300077128-ca33b07cc561?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxzZWElMjB2aWV3JTIwcGVudGhvdXNlfGVufDB8fHx8MTc1MDQyNzQ0OHww&ixlib=rb-4.1.0&q=80&w=1080", aiHint: "sea view", hasVrTour: true },
  { id: "prop2", title: "Spacious Bandra Flat", price: "₹3.5 Cr", imageUrl: "https://placehold.co/300x200.png", aiHint: "apartment interior", hasVrTour: false },
  { id: "prop3", title: "Juhu Beachfront Villa", price: "₹4.2 Cr", imageUrl: "https://placehold.co/300x200.png", aiHint: "luxury villa", hasVrTour: true },
];


export default function LeadDetailPage() {
  const params = useParams();
  const leadId = params.leadId as string;
  const { user: authUser } = useAuth();

  const [lead, setLead] = React.useState<Lead | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [activities, setActivities] = React.useState<ActivityEvent[]>([]);

  // Fetch lead data from Firestore
  React.useEffect(() => {
    if (!leadId) return;

    const fetchLead = async () => {
      setIsLoading(true);
      try {
        const leadDocRef = doc(firestore, "leads", leadId);
        const docSnap = await getDoc(leadDocRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const fetchedLead: Lead = {
            id: docSnap.id,
            name: data.name,
            email: data.email,
            phone: data.phone,
            aiScore: data.aiScore || 0,
            aiScoreFactors: data.aiScoreFactors || "No factors available.",
            source: data.source,
            dateAdded: data.createdAt instanceof Timestamp 
              ? data.createdAt.toDate().toISOString().split('T')[0] 
              : new Date().toISOString().split('T')[0],
            status: data.status,
            propertyOfInterest: data.propertyOfInterest,
          };
          setLead(fetchedLead);

          // For demo, let's also initialize the activities with a personalized message
          setActivities([
            { id: "act_init", type: "AI Update", user: "TerraFlow AI", content: `AI profile loaded for ${data.name}.`, timestamp: new Date(), leadName: data.name }
          ]);

        } else {
          console.log("No such document!");
          setLead(null);
        }
      } catch (error) {
        console.error("Error fetching lead:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLead();
  }, [leadId]);
  
  const handleStatusChange = async (newStatus: string) => {
    if (!lead) return;
    const leadDocRef = doc(firestore, "leads", lead.id);
    try {
        await updateDoc(leadDocRef, { status: newStatus });
        setLead(prev => prev ? ({ ...prev, status: newStatus }) : null);
        const newActivity: ActivityEvent = {
          id: `act-${Date.now()}`,
          type: "System Update",
          user: "System",
          content: `Lead status changed to ${newStatus}.`,
          timestamp: new Date(),
          leadName: lead.name,
        };
        setActivities(prev => [newActivity, ...prev]);
    } catch (error) {
        console.error("Error updating status: ", error);
    }
  };

  const handleAddActivity = (activity: Omit<ActivityEvent, 'id' | 'timestamp' | 'leadName'>) => {
    if (!lead) return;
    const newActivity: ActivityEvent = {
      ...activity,
      id: `act-${Date.now()}`,
      timestamp: new Date(),
      leadName: lead.name,
    };
    setActivities(prev => [newActivity, ...prev]);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h2 className="text-xl font-semibold">Lead not found</h2>
        <p className="text-muted-foreground">The lead you are looking for does not exist or could not be loaded.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-0">
      <LeadDetailHeader
        leadName={lead.name}
        currentStatus={lead.status}
        onStatusChange={handleStatusChange}
      />
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityHub activities={activities} onAddActivity={handleAddActivity} leadName={lead.name} />
        </div>

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
            assignedTo={authUser?.displayName || "Agent"}
          />
        </div>
      </div>

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
