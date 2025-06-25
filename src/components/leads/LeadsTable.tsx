
"use client";

import * as React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MoreVertical, Eye, Mail, Activity, Edit3, Phone, MessageSquare, Zap, UserPlus, Loader2, UserX, Calendar, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { LEAD_STATUSES } from "@/lib/constants";
import type { LeadStatusId } from "@/lib/constants";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  aiScore: number;
  aiScoreFactors: string; 
  source: string;
  dateAdded: string; 
  status: string; 
  propertyOfInterest?: string;
}

interface LeadsTableProps {
  leads: Lead[];
  isLoading: boolean;
  selectedLeads: Set<string>;
  onSelectLead: (leadId: string, isSelected: boolean) => void;
  onSelectAllLeads: (isSelected: boolean) => void;
  isAllSelectedInCurrentPage: boolean;
}

const getStatusPillStyle = (statusLabel: string): string => {
  const statusConfig = LEAD_STATUSES.find(s => s.label.toLowerCase() === statusLabel.toLowerCase());
  return statusConfig ? statusConfig.color : 'bg-slate-100 text-slate-700 border-slate-300';
};

const getAIScoreColorClasses = (score: number): string => {
  if (score > 75) return "bg-green-500"; 
  if (score > 40) return "bg-yellow-500"; 
  return "bg-red-500"; 
};
const getAIScoreTextClasses = (score: number): string => {
  if (score > 75) return "text-green-600"; 
  if (score > 40) return "text-yellow-600"; 
  return "text-red-600"; 
};


export function LeadsTable({ leads, isLoading, selectedLeads, onSelectLead, onSelectAllLeads, isAllSelectedInCurrentPage }: LeadsTableProps) {
  const router = useRouter();

  const handleNavigateToDetail = (leadId: string) => {
    router.push(`/leads/${leadId}`); 
  };

  const handleAction = (e: React.MouseEvent, actionDescription: string, leadId?: string) => {
    e.stopPropagation(); 
    if (actionDescription.startsWith("View Details") && leadId) {
      handleNavigateToDetail(leadId);
    } else {
      alert(actionDescription);
    }
  };

  const MobileLeadCard = ({ lead }: { lead: Lead }) => (
    <Card className="mb-4" onClick={() => handleNavigateToDetail(lead.id)}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base">{lead.name}</CardTitle>
            <p className="text-xs text-muted-foreground">{lead.email}</p>
          </div>
          <Checkbox
            checked={selectedLeads.has(lead.id)}
            onCheckedChange={(checked) => onSelectLead(lead.id, Boolean(checked))}
            aria-label={`Select lead ${lead.name}`}
            onClick={(e) => e.stopPropagation()}
            className="mt-1"
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Status</span>
          <Badge className={cn("px-2.5 py-1 text-xs font-medium rounded-full border whitespace-nowrap", getStatusPillStyle(lead.status))}>
            {lead.status}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground flex items-center gap-1"><TrendingUp className="h-4 w-4" /> AI Score</span>
           <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2">
                <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
                  <Progress value={lead.aiScore} className="h-full w-full" indicatorClassName={cn(getAIScoreColorClasses(lead.aiScore))}/>
                </div>
                <span className={cn("font-semibold", getAIScoreTextClasses(lead.aiScore))}>{lead.aiScore}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent><p className="text-xs">{lead.aiScoreFactors}</p></TooltipContent>
          </Tooltip>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground flex items-center gap-1"><Calendar className="h-4 w-4" /> Date Added</span>
          <span>{new Date(lead.dateAdded).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" onClick={(e) => handleAction(e, `View Details for ${lead.name}`, lead.id)}>
          <Eye className="mr-2 h-4 w-4" /> View Details
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <TooltipProvider>
      {/* Mobile Card View */}
      <div className="md:hidden">
        {isLoading ? (
          <div className="flex items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : leads.length === 0 ? (
          <div className="text-center p-8 text-muted-foreground">
            <UserX className="h-12 w-12 mx-auto mb-2 text-primary/30" />
            <p>No leads found.</p>
          </div>
        ) : (
          leads.map(lead => <MobileLeadCard key={lead.id} lead={lead} />)
        )}
      </div>

      {/* Desktop Table View */}
      <div className="overflow-x-auto hidden md:block">
        <Table className="min-w-full whitespace-nowrap">
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-border">
              <TableHead className="w-[50px] px-4">
                <Checkbox
                  checked={isAllSelectedInCurrentPage && leads.length > 0}
                  onCheckedChange={(checked) => onSelectAllLeads(Boolean(checked))}
                  aria-label="Select all leads in current page"
                />
              </TableHead>
              <TableHead className="min-w-[200px] py-3 px-4 text-muted-foreground font-medium">Lead Name</TableHead>
              <TableHead className="min-w-[180px] py-3 px-4 text-muted-foreground font-medium">AI Lead Score</TableHead>
              <TableHead className="min-w-[150px] py-3 px-4 text-muted-foreground font-medium">Source</TableHead>
              <TableHead className="min-w-[120px] py-3 px-4 text-muted-foreground font-medium">Date Added</TableHead>
              <TableHead className="min-w-[120px] py-3 px-4 text-muted-foreground font-medium">Status</TableHead>
              <TableHead className="w-[80px] text-right py-3 px-4 text-muted-foreground font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
               <TableRow>
                <TableCell colSpan={7} className="h-48 text-center text-muted-foreground">
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="ml-2">Loading leads...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : leads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-48 text-center text-muted-foreground">
                  <div className="flex flex-col items-center justify-center">
                      <UserX className="h-12 w-12 text-primary/30 mb-2"/>
                      <p className="font-semibold">No leads found.</p>
                      <p className="text-sm">Try adjusting your filters or add a new lead.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              leads.map((lead) => (
                <TableRow 
                  key={lead.id} 
                  className="hover:bg-muted/50 cursor-pointer border-b border-border last:border-b-0"
                  onClick={() => handleNavigateToDetail(lead.id)}
                >
                  <TableCell className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedLeads.has(lead.id)}
                      onCheckedChange={(checked) => onSelectLead(lead.id, Boolean(checked))}
                      aria-label={`Select lead ${lead.name}`}
                    />
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="font-semibold text-foreground">{lead.name}</div>
                    <div className="text-xs text-muted-foreground">{lead.email}</div>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                            <Progress
                              value={lead.aiScore}
                              className="h-full w-full" 
                              indicatorClassName={cn(getAIScoreColorClasses(lead.aiScore))}
                            />
                          </div>
                          <span className={cn("font-semibold text-sm", getAIScoreTextClasses(lead.aiScore))}>
                            {lead.aiScore}
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs text-xs bg-popover text-popover-foreground p-2 rounded-md shadow-lg border">
                        <p className="font-semibold mb-1">AI Score Factors:</p>
                        <ul className="list-disc list-inside space-y-0.5">
                          {lead.aiScoreFactors.split(',').map((factor, index) => (
                            <li key={index}>{factor.trim()}</li>
                          ))}
                        </ul>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="text-muted-foreground px-4 py-3">{lead.source}</TableCell>
                  <TableCell className="text-muted-foreground px-4 py-3">
                    {new Date(lead.dateAdded).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Badge
                      className={cn("px-2.5 py-1 text-xs font-medium rounded-full border whitespace-nowrap", getStatusPillStyle(lead.status))}
                    >
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Lead Actions for {lead.name}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={(e) => handleAction(e, `View Details for ${lead.name}`, lead.id)}>
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={(e) => handleAction(e, `Send Email to ${lead.name}`)}>
                          <Mail className="mr-2 h-4 w-4" /> Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => handleAction(e, `Call ${lead.name}`)}>
                          <Phone className="mr-2 h-4 w-4" /> Call Lead
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => handleAction(e, `Send SMS to ${lead.name}`)}>
                          <MessageSquare className="mr-2 h-4 w-4" /> Send SMS
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={(e) => handleAction(e, `Log Activity for ${lead.name}`)}>
                          <Activity className="mr-2 h-4 w-4" /> Log Activity
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => handleAction(e, `Change Status for ${lead.name}`)}>
                           <Edit3 className="mr-2 h-4 w-4" /> Change Status
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => handleAction(e, `Add to Automation for ${lead.name}`)}>
                           <Zap className="mr-2 h-4 w-4" /> Add to Automation
                        </DropdownMenuItem>
                         <DropdownMenuItem onClick={(e) => handleAction(e, `Assign to... for ${lead.name}`)}>
                           <UserPlus className="mr-2 h-4 w-4" /> Assign to...
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </TooltipProvider>
  );
}
