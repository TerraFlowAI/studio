
"use client";

import { useState, useMemo } from 'react';
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { PlusCircle, UserX } from "lucide-react";
import { LeadsTable, type Lead } from "@/components/leads/LeadsTable";
import { LeadFiltersToolbar, type Filters } from "@/components/leads/LeadFiltersToolbar";
import { BulkActionsToolbar } from "@/components/leads/BulkActionsToolbar";
import { AddLeadSheet } from "@/components/leads/AddLeadSheet";
import { useToast } from "@/hooks/use-toast";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import { useAuth } from '@/app/context/AuthContext';


const mockLeads: Lead[] = [
  { id: '1', name: 'Aarav Sharma', email: 'aarav.sharma@example.com', aiScore: 92, aiScoreFactors: 'High budget, looking for 3BHK, active on weekends', source: 'Website Chatbot', dateAdded: '2024-07-20T10:00:00Z', status: 'New', propertyOfInterest: 'Skyline Apartments' },
  { id: '2', name: 'Priya Patel', email: 'priya.p@example.com', aiScore: 78, aiScoreFactors: 'Interested in villas, viewed 3 listings', source: 'Property Listing', dateAdded: '2024-07-19T14:30:00Z', status: 'Contacted' },
  { id: '3', name: 'Rohan Kumar', email: 'rohan.k@example.com', aiScore: 45, aiScoreFactors: 'Low engagement, budget is unclear', source: 'Social Media', dateAdded: '2024-07-18T09:00:00Z', status: 'Qualified' },
  { id: '4', name: 'Sneha Reddy', email: 'sneha.r@example.com', aiScore: 85, aiScoreFactors: 'Matches new premium listing, high urgency', source: 'Referral', dateAdded: '2024-07-21T11:00:00Z', status: 'Viewing Scheduled' },
  { id: '5', name: 'Vikram Singh', email: 'vikram.s@example.com', aiScore: 62, aiScoreFactors: 'Interested in commercial properties', source: 'Manual Entry', dateAdded: '2024-07-15T16:00:00Z', status: 'Offer Made' },
  { id: '6', name: 'Anjali Rao', email: 'anjali.rao@example.com', aiScore: 33, aiScoreFactors: 'Not responsive to emails', source: 'Google Ads', dateAdded: '2024-07-12T12:00:00Z', status: 'Unqualified' },
];

export default function LeadsPage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  
  const [filters, setFilters] = useState<Filters>({
    searchTerm: '',
    status: [],
    source: [],
    dateRange: { from: undefined, to: undefined },
    smartView: 'all'
  });

  const filteredLeads = useMemo(() => {
    let tempLeads = [...leads];
    
    // Smart Views
    switch (filters.smartView) {
      case 'hot':
        tempLeads = tempLeads.filter(lead => lead.aiScore > 75);
        break;
      case 'new':
        tempLeads = tempLeads.filter(lead => lead.status === 'New');
        break;
      case 'needs_attention':
        // Example logic: contacted but no update for 3 days
        tempLeads = tempLeads.filter(lead => {
            if (lead.status !== 'Contacted') return false;
            const dateAdded = new Date(lead.dateAdded);
            const threeDaysAgo = new Date();
            threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
            return dateAdded < threeDaysAgo;
        });
        break;
    }
    
    // Manual Filters (ignored if a smart view other than 'all' is active)
    if (filters.smartView === 'all') {
        if (filters.searchTerm) {
          tempLeads = tempLeads.filter(lead => 
            lead.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            lead.email.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            lead.propertyOfInterest?.toLowerCase().includes(filters.searchTerm.toLowerCase())
          );
        }
        if (filters.status.length > 0) {
          const statusLabels = filters.status.map(id => id.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()));
          tempLeads = tempLeads.filter(lead => statusLabels.includes(lead.status));
        }
        if (filters.source.length > 0) {
          const sourceLabels = filters.source.map(id => id.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()));
          tempLeads = tempLeads.filter(lead => sourceLabels.includes(lead.source));
        }
        if (filters.dateRange.from) {
            tempLeads = tempLeads.filter(lead => new Date(lead.dateAdded) >= filters.dateRange.from!);
        }
        if (filters.dateRange.to) {
            tempLeads = tempLeads.filter(lead => new Date(lead.dateAdded) <= filters.dateRange.to!);
        }
    }

    return tempLeads;
  }, [leads, filters]);

  const handleSelectLead = (leadId: string, isSelected: boolean) => {
    const newSelection = new Set(selectedLeads);
    if (isSelected) {
      newSelection.add(leadId);
    } else {
      newSelection.delete(leadId);
    }
    setSelectedLeads(newSelection);
  };

  const handleSelectAllLeads = (isSelected: boolean) => {
    if (isSelected) {
      setSelectedLeads(new Set(filteredLeads.map(lead => lead.id)));
    } else {
      setSelectedLeads(new Set());
    }
  };
  
  const handleAddLead = async (leadData: Omit<Lead, 'id' | 'aiScore' | 'aiScoreFactors' | 'dateAdded'>) => {
    if (!user) {
        toast({ title: "Authentication Error", description: "You must be logged in to add a lead.", variant: "destructive" });
        return;
    }

    const newLead: Lead = {
      id: (Math.random() * 10000).toString(), // Mock ID
      aiScore: Math.floor(Math.random() * 60) + 40, // Mock AI Score
      aiScoreFactors: "Generated from manual entry",
      dateAdded: new Date().toISOString(),
      ...leadData,
    };
    
    // This is where you would call your actual Firebase/Supabase add function.
    // For now, we just update the local state.
    setLeads(prev => [newLead, ...prev]);

    toast({ title: "Lead Added!", description: `${leadData.name} has been successfully added.` });
  };


  return (
    <div className="container mx-auto">
      <PageHeader title="Leads Management (TerraLead™)" description="View, manage, and analyze all your potential clients.">
        <Button onClick={() => setIsAddSheetOpen(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Lead
        </Button>
      </PageHeader>
      
      <LeadFiltersToolbar filters={filters} onFiltersChange={setFilters} />
      
      <BulkActionsToolbar selectedCount={selectedLeads.size} onClearSelection={() => setSelectedLeads(new Set())} />

      <div className="bg-card shadow-sm border rounded-lg">
          <LeadsTable
            leads={filteredLeads}
            isLoading={isLoading}
            selectedLeads={selectedLeads}
            onSelectLead={handleSelectLead}
            onSelectAllLeads={handleSelectAllLeads}
            isAllSelectedInCurrentPage={filteredLeads.length > 0 && selectedLeads.size === filteredLeads.length}
          />
          {/* We can add pagination controls here in the future */}
      </div>

       <AddLeadSheet 
        isOpen={isAddSheetOpen} 
        onOpenChange={setIsAddSheetOpen} 
        onAddLead={handleAddLead} 
      />
    </div>
  );
}
