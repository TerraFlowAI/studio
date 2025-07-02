
"use client";

import { useState, useMemo } from 'react';
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { PlusCircle, UserX } from "lucide-react";
import { LeadsTable, convertLeadForUI } from "@/components/leads/LeadsTable";
import { LeadFiltersToolbar, type Filters } from "@/components/leads/LeadFiltersToolbar";
import { BulkActionsToolbar } from "@/components/leads/BulkActionsToolbar";
import { AddLeadSheet } from "@/components/leads/AddLeadSheet";
import { useLeads } from '@/hooks/useLeads';
import type { LeadInsert } from '@/lib/supabase';

export default function LeadsPage() {
  const { leads, isLoading, createLead, updateLead, deleteLead, deleteLeads, updateLeadStatus } = useLeads()
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set())
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false)
  
  const [filters, setFilters] = useState<Filters>({
    searchTerm: '',
    status: [],
    source: [],
    dateRange: { from: undefined, to: undefined },
    smartView: 'all'
  });

  const filteredLeads = useMemo(() => {
    let tempLeads = leads.map(convertLeadForUI)
    
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
  
  const handleAddLead = async (leadData: Omit<LeadInsert, 'id' | 'user_id' | 'ai_score' | 'ai_score_factors' | 'created_at' | 'updated_at'>) => {
    await createLead(leadData)
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
