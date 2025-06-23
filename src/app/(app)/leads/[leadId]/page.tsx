
"use client";

import { useState } from 'react';
import { notFound } from 'next/navigation';
import { LeadDetailHeader } from '@/components/leads/detail/LeadDetailHeader';
import { LeadContactInfoCard } from '@/components/leads/detail/LeadContactInfoCard';
import { AiInsightsCard } from '@/components/leads/detail/AiInsightsCard';
import { LeadPreferencesCard } from '@/components/leads/detail/LeadPreferencesCard';
import { MatchedPropertiesCard } from '@/components/leads/detail/MatchedPropertiesCard';
import { ActivityHub } from '@/components/leads/detail/ActivityHub';
import type { Lead } from '@/components/leads/LeadsTable';
import type { ActivityEvent, ActivityType } from '@/components/leads/detail/ActivityTimelineItem';

// Mock data fetching - in a real app, this would fetch data from your DB based on `params.leadId`
const getLeadData = (leadId: string): Lead | undefined => {
  const mockLeads: Lead[] = [
    { id: '1', name: 'Aarav Sharma', email: 'aarav.sharma@example.com', phone: '+91 98765 43210', aiScore: 92, aiScoreFactors: 'High budget, interested in 3BHK, active on weekends', source: 'Website Chatbot', dateAdded: '2024-07-20T10:00:00Z', status: 'New', propertyOfInterest: 'Skyline Apartments' },
    { id: '2', name: 'Priya Patel', email: 'priya.p@example.com', phone: '+91 91234 56789', aiScore: 78, aiScoreFactors: 'Interested in villas, viewed 3 listings', source: 'Property Listing', dateAdded: '2024-07-19T14:30:00Z', status: 'Contacted', propertyOfInterest: 'Greenwood Heights' },
  ];
  return mockLeads.find(lead => lead.id === leadId);
};

const getLeadActivities = (leadId: string): ActivityEvent[] => {
    // This would also be fetched
    return [
        { id: 'act5', type: 'AI Update', user: 'TerraFlow AI', content: 'Lead score increased from 88 to 92 based on recent property view activity.', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), leadName: 'Aarav Sharma' },
        { id: 'act4', type: 'System Update', user: 'System', content: 'Lead viewed "Luxury 3BHK with Sea View" for 5 minutes.', timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), leadName: 'Aarav Sharma' },
        { id: 'act3', type: 'Email', user: 'Loushik (Agent)', content: 'Subject: Following up on your interest\n\nHi Aarav, just wanted to follow up on the properties we discussed...', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), leadName: 'Aarav Sharma' },
        { id: 'act2', type: 'Call', user: 'Loushik (Agent)', content: 'Initial discovery call. Client is looking for a 3BHK in Bandra with a budget of ₹7-8 Cr. Sent initial list.', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), leadName: 'Aarav Sharma' },
        { id: 'act1', type: 'System Update', user: 'System', content: 'Lead created from Website Chatbot.', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), leadName: 'Aarav Sharma' },
    ].sort((a,b) => b.timestamp.getTime() - a.timestamp.getTime());
};

const getMatchedProperties = (leadId: string) => {
    return [
        { id: 'prop1', title: 'Luxury 3BHK with Sea View', price: '₹7.5 Cr', imageUrl: 'https://placehold.co/120x80.png', aiHint: 'apartment sea view', hasVrTour: true },
        { id: 'prop2', title: 'Modern Penthouse in Pali Hill', price: '₹8.1 Cr', imageUrl: 'https://placehold.co/120x80.png', aiHint: 'luxury penthouse', hasVrTour: false },
        { id: 'prop3', title: 'Spacious Apartment near Carter Road', price: '₹7.2 Cr', imageUrl: 'https://placehold.co/120x80.png', aiHint: 'modern apartment', hasVrTour: true },
    ];
};


export default function LeadDetailPage({ params }: { params: { leadId: string } }) {
    const leadData = getLeadData(params.leadId);
    
    // Get initial data before the state hooks
    const initialActivities = getLeadActivities(params.leadId);

    const [status, setStatus] = useState(leadData?.status || 'New');
    const [activities, setActivities] = useState(initialActivities);

    if (!leadData) {
        notFound();
    }

    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus);
        const newActivity: Omit<ActivityEvent, 'id'|'timestamp'|'leadName'> = {
            type: 'System Update',
            user: 'Loushik (Agent)',
            content: `Status changed from ${status} to ${newStatus}.`,
        };
        addActivity(newActivity);
    };

    const addActivity = (activity: Omit<ActivityEvent, 'id'|'timestamp'|'leadName'>) => {
        const newEvent: ActivityEvent = {
            ...activity,
            id: `act-${Math.random()}`,
            timestamp: new Date(),
            leadName: leadData.name,
        };
        setActivities(prev => [newEvent, ...prev]);
    };

    const matchedProperties = getMatchedProperties(params.leadId);
    
    return (
        <div className="container mx-auto">
            <LeadDetailHeader leadName={leadData.name} currentStatus={status} onStatusChange={handleStatusChange} />
            
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
                {/* Left Sidebar */}
                <div className="lg:col-span-3 space-y-6">
                    <LeadContactInfoCard 
                        email={leadData.email}
                        phone={leadData.phone}
                        source={leadData.source}
                        assignedTo="Loushik (Agent)" // Mock data
                    />
                    <AiInsightsCard 
                        leadScore={leadData.aiScore}
                        scoreSummary="This is a **Hot Lead** based on high engagement, budget match, and recent activity."
                        nextBestAction="Recommendation: Call now to schedule a viewing for 'Luxury 3BHK with Sea View'."
                    />
                    <LeadPreferencesCard
                        location="Bandra West, Mumbai"
                        budget="₹7 Cr - ₹8.5 Cr"
                        propertyType="Apartment, Penthouse"
                    />
                    <MatchedPropertiesCard properties={matchedProperties} />
                </div>

                {/* Main Content */}
                <div className="lg:col-span-7">
                    <ActivityHub activities={activities} onAddActivity={addActivity} leadName={leadData.name} />
                </div>
            </div>
        </div>
    );
}
