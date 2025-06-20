
"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { LeadsTable, type Lead } from "@/components/leads/LeadsTable";
import { LeadFiltersToolbar, type Filters } from "@/components/leads/LeadFiltersToolbar";
import { BulkActionsToolbar } from "@/components/leads/BulkActionsToolbar";
import { AddLeadSheet } from "@/components/leads/AddLeadSheet";
import { PlusCircle, Upload, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { LEAD_STATUSES, LEAD_SOURCES } from "@/lib/constants"; // AI_SMART_VIEWS is used in LeadFiltersToolbar
import type { LeadStatusId, LeadSourceId, AiSmartViewId } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";

const initialMockLeads: Lead[] = [
  {
    id: '1',
    name: 'Aarav Sharma',
    email: 'aarav@example.com',
    phone: '+91 98765 43210',
    aiScore: 88,
    aiScoreFactors: "High budget match (+20), Viewed 5+ listings (+15), Inquired on 'Luxury Apartment' (+10), Frequent site visits (+10), Downloaded brochure (+5)",
    source: 'Website Chatbot',
    dateAdded: '2023-10-26',
    status: 'New',
    propertyOfInterest: 'Luxury Apartment in Bandra',
  },
  {
    id: '2',
    name: 'Priya Singh',
    email: 'priya.singh@example.com',
    phone: '+91 91234 56789',
    aiScore: 65,
    aiScoreFactors: "Good fit for new 2BHK listings (+15), Active last 7 days (+10), Low engagement with emails (-5)",
    source: 'Property Listing',
    dateAdded: '2023-10-24',
    status: 'Contacted',
    propertyOfInterest: '2BHK, Koramangala',
  },
  {
    id: '3',
    name: 'Rohan Mehta',
    email: 'rohan.m@example.com',
    phone: '+91 87654 32109',
    aiScore: 35,
    aiScoreFactors: "Unsubscribed from newsletter (-10), Old inquiry (-5), No recent activity (-15)",
    source: 'Google Ads',
    dateAdded: '2023-09-15',
    status: 'Unqualified',
    propertyOfInterest: 'Any commercial property',
  },
  {
    id: '4',
    name: 'Ananya Reddy',
    email: 'ananya.r@example.com',
    phone: '+91 76543 21098',
    aiScore: 92,
    aiScoreFactors: "Pre-approved loan (+25), Specific area focus (+15), Requested viewing for 3 properties (+12)",
    source: 'Referral',
    dateAdded: '2023-10-28',
    status: 'Viewing Scheduled',
    propertyOfInterest: 'Villa in Jubilee Hills',
  },
  {
    id: '5',
    name: 'Vikram Kumar',
    email: 'vikram.kumar@example.com',
    phone: '+91 65432 10987',
    aiScore: 50,
    aiScoreFactors: "Generic inquiry (+5), Responded to initial email (+10), Budget slightly below average (-5)",
    source: 'Social Media',
    dateAdded: '2023-10-20',
    status: 'Qualified',
    propertyOfInterest: 'Apartment near Hitech City',
  },
   {
    id: '6',
    name: 'Sneha Patel',
    email: 'sneha.p@example.com',
    phone: '+91 99887 76655',
    aiScore: 78,
    aiScoreFactors: "Multiple inquiries (+18), Matches ideal client profile (+15), High engagement on website (+10)",
    source: 'Website Chatbot',
    dateAdded: '2023-11-01',
    status: 'New',
    propertyOfInterest: 'Penthouse with city view',
  },
  {
    id: '7',
    name: 'Arjun Desai',
    email: 'arjun.d@example.com',
    phone: '+91 88776 65544',
    aiScore: 45,
    aiScoreFactors: "Viewed commercial properties (+10), Single site visit (+5), Inquiry about lease terms (+5)",
    source: 'Property Listing',
    dateAdded: '2023-10-15',
    status: 'Contacted',
    propertyOfInterest: 'Office Space in BKC',
  },
];


export default function LeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = React.useState<Lead[]>(initialMockLeads);
  const [filters, setFilters] = React.useState<Filters>({
    searchTerm: "",
    status: [],
    source: [],
    dateRange: { from: undefined, to: undefined },
    smartView: 'all', // Default to 'All Leads'
  });
  const [selectedLeads, setSelectedLeads] = React.useState<Set<string>>(new Set());
  const [isAddLeadSheetOpen, setIsAddLeadSheetOpen] = React.useState(false);

  const [currentPage, setCurrentPage] = React.useState(1);
  const leadsPerPage = 10;

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(1); 
  };

  const handleSelectLead = (leadId: string, isSelected: boolean) => {
    setSelectedLeads(prev => {
      const newSelected = new Set(prev);
      if (isSelected) {
        newSelected.add(leadId);
      } else {
        newSelected.delete(leadId);
      }
      return newSelected;
    });
  };

  const handleSelectAllLeads = (isSelected: boolean, leadsToSelect: Lead[]) => {
    setSelectedLeads(prev => {
      const newSelected = new Set(prev);
      if (isSelected) {
        leadsToSelect.forEach(lead => newSelected.add(lead.id));
      } else {
        leadsToSelect.forEach(lead => newSelected.delete(lead.id));
      }
      return newSelected;
    });
  };
  
  const handleAddLead = (newLeadData: Omit<Lead, 'id' | 'aiScore' | 'aiScoreFactors' | 'dateAdded'>) => {
    const newLead: Lead = {
      ...newLeadData,
      id: (leads.length + 1 + Math.random()).toString(), // Ensure unique ID
      aiScore: Math.floor(Math.random() * 60) + 40, 
      aiScoreFactors: "Manually added (+5), Source: " + newLeadData.source,
      dateAdded: new Date().toISOString().split('T')[0],
    };
    setLeads(prev => [newLead, ...prev]);
  };


  const filteredLeads = React.useMemo(() => {
    let tempLeads = [...leads];
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Apply Smart View filters first
    if (filters.smartView === 'hot') {
      tempLeads = tempLeads.filter(lead => lead.aiScore > 80);
    } else if (filters.smartView === 'new') {
      tempLeads = tempLeads.filter(lead => lead.status.toLowerCase() === 'new');
    } else if (filters.smartView === 'needs_attention') {
      tempLeads = tempLeads.filter(lead => {
        const leadDate = new Date(lead.dateAdded);
        const isOldContacted = lead.status.toLowerCase() === 'contacted' && leadDate < sevenDaysAgo;
        const isLowEngagement = lead.aiScore < 50 && !['qualified', 'unqualified', 'new'].includes(lead.status.toLowerCase()); // Example: low score and not new/closed
        return isOldContacted || isLowEngagement;
      });
    }
    
    if (filters.searchTerm) {
      const lowerSearchTerm = filters.searchTerm.toLowerCase();
      tempLeads = tempLeads.filter(lead =>
        lead.name.toLowerCase().includes(lowerSearchTerm) ||
        lead.email.toLowerCase().includes(lowerSearchTerm) ||
        (lead.phone && lead.phone.toLowerCase().includes(lowerSearchTerm)) ||
        (lead.propertyOfInterest && lead.propertyOfInterest.toLowerCase().includes(lowerSearchTerm))
      );
    }

    if (filters.status.length > 0) {
      tempLeads = tempLeads.filter(lead => filters.status.includes(lead.status.toLowerCase().replace(/\s+/g, '_') as LeadStatusId));
    }

    if (filters.source.length > 0) {
      tempLeads = tempLeads.filter(lead => filters.source.includes(lead.source.toLowerCase().replace(/\s+/g, '_') as LeadSourceId));
    }
    
    if (filters.dateRange?.from) {
      tempLeads = tempLeads.filter(lead => new Date(lead.dateAdded) >= new Date(filters.dateRange.from as Date));
    }
    if (filters.dateRange?.to) {
      tempLeads = tempLeads.filter(lead => new Date(lead.dateAdded) <= new Date(filters.dateRange.to as Date));
    }

    return tempLeads;
  }, [leads, filters]);

  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);
  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);

  return (
    <div className="bg-background min-h-screen w-full"> {/* Ensure page takes full width and uses theme background */}
      <div className="p-0"> {/* Removed outer padding, page content will define its own */}
        <PageHeader title="Leads">
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => alert("Import Leads: This feature is coming soon!")}>
              <Upload className="mr-2 h-4 w-4" /> Import Leads
            </Button>
            <Button variant="outline" onClick={() => router.push('/smartflow?filter=lead_automations')}>
              <Zap className="mr-2 h-4 w-4" /> Manage Automations
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => setIsAddLeadSheetOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Lead
            </Button>
          </div>
        </PageHeader>

        <LeadFiltersToolbar filters={filters} onFiltersChange={handleFiltersChange} />

        {selectedLeads.size > 0 && (
          <BulkActionsToolbar 
            selectedCount={selectedLeads.size}
            onClearSelection={() => setSelectedLeads(new Set())} 
          />
        )}

        <Card className="mt-6 shadow-sm border bg-card"> {/* Card uses theme card background (white by default) and theme border */}
          <CardContent className="p-0"> {/* Remove card content padding if table handles it */}
            <LeadsTable
              leads={currentLeads}
              selectedLeads={selectedLeads}
              onSelectLead={handleSelectLead}
              onSelectAllLeads={(isSelected) => handleSelectAllLeads(isSelected, currentLeads)}
              isAllSelectedInCurrentPage={currentLeads.length > 0 && currentLeads.every(lead => selectedLeads.has(lead.id))}
            />
          </CardContent>
        </Card>

        {totalPages > 1 && (
          <div className="flex items-center justify-end space-x-2 py-4">
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
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
      </div>
      <AddLeadSheet 
        isOpen={isAddLeadSheetOpen} 
        onOpenChange={setIsAddLeadSheetOpen}
        onAddLead={handleAddLead}
      />
    </div>
  );
}
