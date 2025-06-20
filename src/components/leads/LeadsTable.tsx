
"use client";

import * as React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
import { MoreVertical, Eye, Mail, Activity, Edit3, Phone, MessageSquare, Zap, UserPlus } from "lucide-react";
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


export function LeadsTable({ leads, selectedLeads, onSelectLead, onSelectAllLeads, isAllSelectedInCurrentPage }: LeadsTableProps) {
  const router = useRouter();

  const handleRowClick = (leadId: string) => {
    // For now, alert. Later, navigate to /app/leads/{lead_id}
    alert(`View details for lead ID: ${leadId}. Navigation to detail page will be implemented later.`);
    // router.push(`/leads/${leadId}`); 
  };

  const handleAction = (e: React.MouseEvent, actionDescription: string) => {
    e.stopPropagation(); // Important to prevent row click when action is clicked
    alert(actionDescription);
  };

  return (
    <TooltipProvider>
      <div className="overflow-x-auto">
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
            {leads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                  No leads found. Try adjusting your filters.
                </TableCell>
              </TableRow>
            ) : (
              leads.map((lead) => (
                <TableRow 
                  key={lead.id} 
                  className="hover:bg-muted/50 cursor-pointer border-b border-border last:border-b-0"
                  onClick={() => handleRowClick(lead.id)}
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
                              className="h-full w-full" // Ensure progress bar fills its container
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
                        <DropdownMenuItem onClick={(e) => handleAction(e, `View Details for ${lead.name}`)}>
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
