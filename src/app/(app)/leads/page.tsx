
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
import { LEAD_SOURCES, LEAD_STATUSES } from "@/lib/constants";
import type { LeadStatusId, LeadSourceId } from "@/lib/constants";
import { Card } from "@/components/ui/card"; // Added import for Card

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
    smartView: 'all',
  });
  const [selectedLeads, setSelectedLeads] = React.useState<Set<string>>(new Set());
  const [isAddLeadSheetOpen, setIsAddLeadSheetOpen] = React.useState(false);

  // Pagination state (basic)
  const [currentPage, setCurrentPage] = React.useState(1);
  const leadsPerPage = 10;

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page on filter change
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
      id: (leads.length + 1).toString(),
      aiScore: Math.floor(Math.random() * 60) + 40, // Random score for demo
      aiScoreFactors: "Manually added (+5), Source: " + newLeadData.source,
      dateAdded: new Date().toISOString().split('T')[0], // Today's date
    };
    setLeads(prev => [newLead, ...prev]); // Add to top for visibility
  };


  const filteredLeads = React.useMemo(() => {
    let tempLeads = [...leads];

    // Apply Smart View filters first
    if (filters.smartView === 'hot') {
      tempLeads = tempLeads.filter(lead => lead.aiScore > 80);
    } else if (filters.smartView === 'new') {
      tempLeads = tempLeads.filter(lead => lead.status === 'New');
    } else if (filters.smartView === 'needs_attention') {
      // Placeholder logic for "Needs Attention" - e.g., contacted more than 7 days ago and not qualified/unqualified
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      tempLeads = tempLeads.filter(lead => {
        const leadDate = new Date(lead.dateAdded); // Assuming 'Contacted' status would update a 'lastContactedDate'
        return lead.status === 'Contacted' && leadDate < sevenDaysAgo && !['Qualified', 'Unqualified'].includes(lead.status);
      });
    }
    
    // Apply search term
    if (filters.searchTerm) {
      const lowerSearchTerm = filters.searchTerm.toLowerCase();
      tempLeads = tempLeads.filter(lead =>
        lead.name.toLowerCase().includes(lowerSearchTerm) ||
        lead.email.toLowerCase().includes(lowerSearchTerm) ||
        (lead.phone && lead.phone.toLowerCase().includes(lowerSearchTerm)) ||
        (lead.propertyOfInterest && lead.propertyOfInterest.toLowerCase().includes(lowerSearchTerm))
      );
    }

    // Apply status filters
    if (filters.status.length > 0) {
      tempLeads = tempLeads.filter(lead => filters.status.includes(lead.status as LeadStatusId));
    }

    // Apply source filters
    if (filters.source.length > 0) {
      tempLeads = tempLeads.filter(lead => filters.source.includes(lead.source.replace(/\s+/g, '_').toLowerCase() as LeadSourceId));
    }
    
    // Apply date range filters
    if (filters.dateRange?.from) {
      tempLeads = tempLeads.filter(lead => new Date(lead.dateAdded) >= new Date(filters.dateRange.from as Date));
    }
    if (filters.dateRange?.to) {
      tempLeads = tempLeads.filter(lead => new Date(lead.dateAdded) <= new Date(filters.dateRange.to as Date));
    }

    return tempLeads;
  }, [leads, filters]);

  // Pagination logic
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);
  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);

  return (
    <div className="container mx-auto bg-[#F8F9FA] min-h-screen p-0 md:p-0 lg:p-0"> {/* Ensure full width and light gray background */}
      <div className="p-4 md:p-6 lg:p-8"> {/* Add padding back for content within the page */}
        <PageHeader title="Leads">
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => alert("Import Leads clicked!")}>
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

        <Card className="mt-6 shadow-sm border border-[#E5E7EB]">
          <LeadsTable
            leads={currentLeads}
            selectedLeads={selectedLeads}
            onSelectLead={handleSelectLead}
            onSelectAllLeads={(isSelected) => handleSelectAllLeads(isSelected, currentLeads)}
            isAllSelectedInCurrentPage={currentLeads.length > 0 && currentLeads.every(lead => selectedLeads.has(lead.id))}
          />
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
