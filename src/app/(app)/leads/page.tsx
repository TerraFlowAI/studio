"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { LeadsTable, type Lead } from "@/components/leads/LeadsTable";
import { LeadFiltersToolbar, type Filters } from "@/components/leads/LeadFiltersToolbar";
import { BulkActionsToolbar } from "@/components/leads/BulkActionsToolbar";
import { AddLeadSheet } from "@/components/leads/AddLeadSheet";
import { PlusCircle, Upload, Zap, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import type { LeadStatusId, LeadSourceId, AiSmartViewId } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/app/context/AuthContext";
import { firestore } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp, query, where, onSnapshot, orderBy, Timestamp } from "firebase/firestore";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function LeadsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();

  const [leads, setLeads] = React.useState<Lead[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
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

  // Real-time data fetching from Firestore, now more robust
  React.useEffect(() => {
    // If there's no user logged in yet, don't even try to fetch.
    if (!user) {
      setIsLoading(false); // Stop loading if there's no user
      return;
    }

    setIsLoading(true);
    setError(null); // Reset error on a new fetch attempt
    
    const leadsCollectionRef = collection(firestore, "leads");
    
    const q = query(
      leadsCollectionRef, 
      where("ownerId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedLeads: Lead[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedLeads.push({
          id: doc.id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          aiScore: data.aiScore || 0,
          aiScoreFactors: data.aiScoreFactors || "No factors available.",
          source: data.source,
          // Convert Firestore Timestamp to a string date
          dateAdded: data.createdAt instanceof Timestamp 
            ? data.createdAt.toDate().toISOString().split('T')[0] 
            : new Date().toISOString().split('T')[0],
          status: data.status,
          propertyOfInterest: data.propertyOfInterest,
        });
      });
      setLeads(fetchedLeads);
      setIsLoading(false);
      console.log(`Successfully fetched ${fetchedLeads.length} leads.`);
    }, (err) => {
      // This will catch security rule errors or other Firestore issues!
      console.error("Error fetching leads:", err);
      setError("Failed to fetch leads. You may not have permission to view this data.");
      setIsLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [user]);


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
    if (!user) {
      toast({
        variant: "destructive",
        title: "Not Authenticated",
        description: "You must be logged in to add a new lead.",
      });
      return;
    }

    try {
      await addDoc(collection(firestore, "leads"), {
        ...leadData,
        ownerId: user.uid,
        createdAt: serverTimestamp(),
        aiScore: 0,
        aiScoreFactors: "Lead manually created",
        status: leadData.status || "New",
      });

      toast({
        title: "Lead Created!",
        description: `${leadData.name} has been successfully added.`,
      });
      
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

        {error && (
            <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Data Fetching Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

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
              isLoading={isLoading}
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
