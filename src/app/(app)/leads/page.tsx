
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
import { LEAD_STATUSES, LEAD_SOURCES } from "@/lib/constants"; 
import type { LeadStatusId, LeadSourceId, AiSmartViewId } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { firestore, auth } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

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
  // Added leads
  {
    id: '8',
    name: 'Ishaan Kapoor',
    email: 'ishaan.k@example.com',
    phone: '+91 77665 54433',
    aiScore: 72,
    aiScoreFactors: "Interested in new developments (+15), budget aligns with premium properties (+12), short website visit (-5)",
    source: 'Google Ads',
    dateAdded: '2023-11-02',
    status: 'Contacted',
    propertyOfInterest: 'Luxury Villa, South Delhi',
  },
  {
    id: '9',
    name: 'Myra Reddy',
    email: 'myra.r@example.com',
    phone: '+91 66554 43322',
    aiScore: 85,
    aiScoreFactors: "Specific request for penthouse (+20), referred by existing client (+18), high engagement (+10)",
    source: 'Referral',
    dateAdded: '2023-11-03',
    status: 'New',
    propertyOfInterest: 'Penthouse, Hiranandani Gardens',
  },
  {
    id: '10',
    name: 'Kabir Khan',
    email: 'kabir.khan@example.com',
    phone: '+91 98765 11223',
    aiScore: 60,
    aiScoreFactors: "Looking for investment property (+10), Active on market news (+10), Budget flexible (+5)",
    source: 'Manual Entry',
    dateAdded: '2023-11-04',
    status: 'Qualified',
    propertyOfInterest: 'Commercial plot, Navi Mumbai',
  },
  {
    id: '11',
    name: 'Diya Sharma',
    email: 'diya.s@example.com',
    phone: '+91 87654 22334',
    aiScore: 40,
    aiScoreFactors: "First-time buyer questions (+5), Inconsistent communication (-10), Viewed budget properties (+5)",
    source: 'Social Media',
    dateAdded: '2023-11-05',
    status: 'New',
    propertyOfInterest: '1BHK, Thane',
  },
  {
    id: '12',
    name: 'Vivaan Malhotra',
    email: 'vivaan.m@example.com',
    phone: '+91 76543 33445',
    aiScore: 79,
    aiScoreFactors: "High engagement on luxury listings (+20), Requested virtual tour (+10), Specific amenity requirements (+8)",
    source: 'Website Chatbot',
    dateAdded: '2023-11-06',
    status: 'Viewing Scheduled',
    propertyOfInterest: 'Sea-facing apartment, Worli',
  },
  {
    id: '13',
    name: 'Zara Ali',
    email: 'zara.ali@example.com',
    phone: '+91 65432 44556',
    aiScore: 55,
    aiScoreFactors: "Looking for rental (+5), Quick decision timeline (+10), Multiple property inquiries (+5)",
    source: 'Property Listing',
    dateAdded: '2023-11-07',
    status: 'Contacted',
    propertyOfInterest: '2BHK Rental, Andheri West',
  },
  {
    id: '14',
    name: 'Aryan Joshi',
    email: 'aryan.j@example.com',
    phone: '+91 99887 55667',
    aiScore: 30,
    aiScoreFactors: "Not responsive to calls (-15), General inquiry, no specifics (-5), Viewed one old listing (-2)",
    source: 'Google Ads',
    dateAdded: '2023-11-08',
    status: 'Unqualified',
    propertyOfInterest: 'Properties in Pune',
  },
  {
    id: '15',
    name: 'Naina Gupta',
    email: 'naina.g@example.com',
    phone: '+91 88776 66778',
    aiScore: 95,
    aiScoreFactors: "Previous high-value client (+25), Clear investment goals (+20), Actively discussing terms (+15)",
    source: 'Referral',
    dateAdded: '2023-11-09',
    status: 'Offer Made',
    propertyOfInterest: 'Portfolio of 3 flats, Bangalore',
  },
  {
    id: '16',
    name: 'Dev Mehra',
    email: 'dev.mehra@example.com',
    phone: '+91 77665 77889',
    aiScore: 68,
    aiScoreFactors: "Interested in off-plan projects (+15), Attended webinar (+10), Asked financial questions (+8)",
    source: 'Manual Entry',
    dateAdded: '2023-11-10',
    status: 'Qualified',
    propertyOfInterest: 'New township project, Gurgaon',
  },
  {
    id: '17',
    name: 'Saanvi Iyer',
    email: 'saanvi.i@example.com',
    phone: '+91 66554 88990',
    aiScore: 82,
    aiScoreFactors: "Relocating for work (+20), Urgent requirement (+15), Viewed listings matching criteria (+10)",
    source: 'Website Chatbot',
    dateAdded: '2023-11-11',
    status: 'New',
    propertyOfInterest: '3BHK near Financial District, Hyderabad',
  },
  {
    id: '18',
    name: 'Advik Singh',
    email: 'advik.s@example.com',
    phone: '+91 91234 99001',
    aiScore: 48,
    aiScoreFactors: "Looking for plot/land (+10), Researching for 6+ months (+5), Vague budget (-5)",
    source: 'Property Listing',
    dateAdded: '2023-11-12',
    status: 'Contacted',
    propertyOfInterest: 'Agricultural land, outskirts of Chennai',
  },
  {
    id: '19',
    name: 'Kiara Bhatia',
    email: 'kiara.b@example.com',
    phone: '+91 87654 00112',
    aiScore: 75,
    aiScoreFactors: "Upsizing family home (+18), Good credit history noted (+12), Active in specific school district (+10)",
    source: 'Referral',
    dateAdded: '2023-11-13',
    status: 'Viewing Scheduled',
    propertyOfInterest: '4BHK Villa, Whitefield',
  },
  {
    id: '20',
    name: 'Reyansh Pillai',
    email: 'reyansh.p@example.com',
    phone: '+91 76543 11223',
    aiScore: 58,
    aiScoreFactors: "Multiple open house visits (+10), Interested in fixer-uppers (+8), Email open rate high (+5)",
    source: 'Social Media',
    dateAdded: '2023-11-14',
    status: 'Qualified',
    propertyOfInterest: 'Old bungalow, Goa',
  },
  {
    id: '21',
    name: 'Anika Varma',
    email: 'anika.v@example.com',
    phone: '+91 65432 22334',
    aiScore: 90,
    aiScoreFactors: "Returning customer (+20), High net worth individual (+20), Seeking premium services (+10)",
    source: 'Manual Entry',
    dateAdded: '2023-11-15',
    status: 'New',
    propertyOfInterest: 'Luxury penthouse, Mumbai',
  },
  {
    id: '22',
    name: 'Yash Choudhary',
    email: 'yash.c@example.com',
    phone: '+91 99887 33445',
    aiScore: 38,
    aiScoreFactors: "Looking for short-term rental (-5), Infrequent site visits (-8), Unclear requirements (-10)",
    source: 'Website Chatbot',
    dateAdded: '2023-11-16',
    status: 'Unqualified',
    propertyOfInterest: 'Any 2BHK rental',
  },
  {
    id: '23',
    name: 'Aisha Begum',
    email: 'aisha.b@example.com',
    phone: '+91 88776 44556',
    aiScore: 62,
    aiScoreFactors: "Investor looking for ROI (+10), Prefers commercial units (+10), Asked about rental yields (+7)",
    source: 'Google Ads',
    dateAdded: '2023-11-17',
    status: 'Contacted',
    propertyOfInterest: 'Shop in commercial complex',
  },
  {
    id: '24',
    name: 'Dhruv Batra',
    email: 'dhruv.b@example.com',
    phone: '+91 77665 55667',
    aiScore: 81,
    aiScoreFactors: "Tech professional (+10), Budget for smart home features (+15), Viewed properties with home automation (+10)",
    source: 'Property Listing',
    dateAdded: '2023-11-18',
    status: 'Viewing Scheduled',
    propertyOfInterest: 'Smart home, Electronic City',
  },
  {
    id: '25',
    name: 'Paridhi Jain',
    email: 'paridhi.j@example.com',
    phone: '+91 66554 66778',
    aiScore: 70,
    aiScoreFactors: "Recently married (+10), Looking for first home (+10), Stable income (+8)",
    source: 'Referral',
    dateAdded: '2023-11-19',
    status: 'Qualified',
    propertyOfInterest: '2BHK, well-connected area',
  },
  {
    id: '26',
    name: 'Vihaan Sethi',
    email: 'vihaan.s@example.com',
    phone: '+91 98765 77889',
    aiScore: 52,
    aiScoreFactors: "Wants farmhouse property (+10), Large land requirement (+8), Location flexible but remote (-5)",
    source: 'Social Media',
    dateAdded: '2023-11-20',
    status: 'New',
    propertyOfInterest: 'Farmhouse near Lonavala',
  },
  {
    id: '27',
    name: 'Eva Menon',
    email: 'eva.menon@example.com',
    phone: '+91 87654 88990',
    aiScore: 88,
    aiScoreFactors: "Corporate client looking for employee housing (+25), Bulk deal potential (+15), Specific layout preferences (+10)",
    source: 'Manual Entry',
    dateAdded: '2023-11-21',
    status: 'Offer Made',
    propertyOfInterest: 'Multiple 2BHK units in same complex',
  },
  {
    id: '28',
    name: 'Rudra Pratap Singh',
    email: 'rudra.ps@example.com',
    phone: '+91 76543 99001',
    aiScore: 42,
    aiScoreFactors: "Student looking for PG (-5), Low budget (-10), Temporary requirement (-8)",
    source: 'Website Chatbot',
    dateAdded: '2023-11-22',
    status: 'Unqualified',
    propertyOfInterest: 'Shared accommodation near university',
  },
  {
    id: '29',
    name: 'Anvi Goel',
    email: 'anvi.g@example.com',
    phone: '+91 65432 00112',
    aiScore: 77,
    aiScoreFactors: "Downsizing from larger home (+15), Seeking low-maintenance property (+10), Prefers gated community (+8)",
    source: 'Property Listing',
    dateAdded: '2023-11-23',
    status: 'Contacted',
    propertyOfInterest: 'Luxury condo, Gachibowli',
  },
  {
    id: '30',
    name: 'Zoya Akhtar',
    email: 'zoya.a@example.com',
    phone: '+91 99887 11223',
    aiScore: 69,
    aiScoreFactors: "Artist looking for studio space (+10), Needs good natural light (+10), Flexible on location if budget met (+5)",
    source: 'Google Ads',
    dateAdded: '2023-11-24',
    status: 'Qualified',
    propertyOfInterest: 'Commercial space with high ceilings',
  },
  {
    id: '31',
    name: 'Samar Anand',
    email: 'samar.anand@example.com',
    phone: '+91 88776 22334',
    aiScore: 93,
    aiScoreFactors: "NRI investor (+20), Interested in property management services (+15), Clear ROI expectations (+12), Referred by bank (+10)",
    source: 'Referral',
    dateAdded: '2023-11-25',
    status: 'Viewing Scheduled', // Changed for variety
    propertyOfInterest: 'Pre-leased commercial property, Pune',
  }
];


export default function LeadsPage() {
  const router = useRouter();
  const { toast } = useToast();
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
  
  const handleAddLead = async (leadData: Omit<Lead, 'id' | 'aiScore' | 'aiScoreFactors' | 'dateAdded'>) => {
    const { currentUser } = auth;
    if (!currentUser) {
      toast({
        variant: "destructive",
        title: "Not Authenticated",
        description: "You must be logged in to add a new lead.",
      });
      return;
    }

    try {
      // Create a new document in the 'leads' collection
      await addDoc(collection(firestore, "leads"), {
        ...leadData,
        ownerId: currentUser.uid,
        createdAt: serverTimestamp(),
        // Default values for fields not in the form
        aiScore: 0, // Initial AI score can be 0 or calculated by a backend function
        aiScoreFactors: "Lead manually created",
        status: leadData.status || "New",
      });

      toast({
        title: "Lead Created!",
        description: `${leadData.name} has been successfully added to your leads.`,
      });
      
      // Here you would typically refetch the leads from Firestore
      // For now, we'll just add it to the local mock state to see the result immediately
      const newLeadForState: Lead = {
        ...leadData,
        id: Date.now().toString(), // Mock ID for local state
        aiScore: 0,
        aiScoreFactors: "Lead manually created",
        dateAdded: new Date().toISOString().split('T')[0],
      };
      setLeads(prev => [newLeadForState, ...prev]);

    } catch (error) {
      console.error("Error adding lead to Firestore: ", error);
      toast({
        variant: "destructive",
        title: "Save Failed",
        description: "Could not save the lead to the database. Please try again.",
      });
    }
  };


  const filteredLeads = React.useMemo(() => {
    let tempLeads = [...leads];
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    if (filters.smartView === 'hot') {
      tempLeads = tempLeads.filter(lead => lead.aiScore > 80);
    } else if (filters.smartView === 'new') {
      tempLeads = tempLeads.filter(lead => lead.status.toLowerCase() === 'new');
    } else if (filters.smartView === 'needs_attention') {
      tempLeads = tempLeads.filter(lead => {
        const leadDate = new Date(lead.dateAdded);
        const isOldContacted = lead.status.toLowerCase() === 'contacted' && leadDate < sevenDaysAgo;
        const isLowEngagement = lead.aiScore < 50 && !['qualified', 'unqualified', 'new'].includes(lead.status.toLowerCase());
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
    <div className="bg-background min-h-screen w-full">
      <div className="p-0"> 
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

        <Card className="mt-6 shadow-sm border bg-card">
          <CardContent className="p-0">
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
            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                <Button
                  key={pageNumber}
                  variant={currentPage === pageNumber ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(pageNumber)}
                  className={cn(
                    "h-8 w-8 p-0", 
                    currentPage === pageNumber && "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  {pageNumber}
                </Button>
              ))}
            </div>
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
