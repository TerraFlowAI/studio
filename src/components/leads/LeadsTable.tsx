
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
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MoreVertical, Eye, Mail, Activity, Edit3 } from "lucide-react";
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
  aiScoreFactors: string; // Comma-separated string of factors like "High budget match (+20), Viewed 5+ listings (+15)"
  source: string;
  dateAdded: string; // YYYY-MM-DD
  status: string; // e.g., 'New', 'Contacted', 'Qualified'
  propertyOfInterest?: string;
}

interface LeadsTableProps {
  leads: Lead[];
  selectedLeads: Set<string>;
  onSelectLead: (leadId: string, isSelected: boolean) => void;
  onSelectAllLeads: (isSelected: boolean) => void;
  isAllSelectedInCurrentPage: boolean;
}

const getStatusPillStyle = (status: string) => {
  const statusConfig = LEAD_STATUSES.find(s => s.label === status || s.id === status);
  return statusConfig ? statusConfig.color : 'bg-gray-100 text-gray-700 border-gray-300';
};

const getAIScoreColor = (score: number): string => {
  if (score > 75) return "bg-green-500"; // High score
  if (score > 40) return "bg-yellow-500"; // Medium score
  return "bg-red-500"; // Low score
};

export function LeadsTable({ leads, selectedLeads, onSelectLead, onSelectAllLeads, isAllSelectedInCurrentPage }: LeadsTableProps) {
  const router = useRouter();

  const handleRowClick = (leadId: string) => {
    // router.push(`/leads/${leadId}`); // Uncomment when detail page exists
    alert(`Navigate to lead detail page for ID: ${leadId}`);
  };

  return (
    <TooltipProvider>
      <div className="overflow-x-auto">
        <Table className="min-w-full whitespace-nowrap">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={isAllSelectedInCurrentPage && leads.length > 0}
                  onCheckedChange={(checked) => onSelectAllLeads(Boolean(checked))}
                  aria-label="Select all leads in current page"
                />
              </TableHead>
              <TableHead className="min-w-[200px]">Lead Name</TableHead>
              <TableHead className="min-w-[180px]">AI Lead Score</TableHead>
              <TableHead className="min-w-[150px]">Source</TableHead>
              <TableHead className="min-w-[120px]">Date Added</TableHead>
              <TableHead className="min-w-[120px]">Status</TableHead>
              <TableHead className="w-[80px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                  No leads found.
                </TableCell>
              </TableRow>
            ) : (
              leads.map((lead) => (
                <TableRow 
                  key={lead.id} 
                  className="hover:bg-muted/50 cursor-pointer"
                  onClick={(e) => {
                     // Prevent row click if clicking on checkbox, dropdown trigger or its items
                    if ((e.target as HTMLElement).closest('[role="checkbox"], [data-radix-dropdown-menu-trigger], [role="menuitem"]')) {
                      return;
                    }
                    handleRowClick(lead.id)
                  }}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedLeads.has(lead.id)}
                      onCheckedChange={(checked) => onSelectLead(lead.id, Boolean(checked))}
                      aria-label={`Select lead ${lead.name}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{lead.name}</div>
                    <div className="text-xs text-muted-foreground">{lead.email}</div>
                  </TableCell>
                  <TableCell>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2.5 rounded-full bg-muted overflow-hidden">
                            <Progress
                              value={lead.aiScore}
                              className="h-full"
                              indicatorClassName={getAIScoreColor(lead.aiScore)}
                            />
                          </div>
                          <span className={`font-semibold text-sm ${
                            lead.aiScore > 75 ? 'text-green-600' : lead.aiScore > 40 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {lead.aiScore}
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs text-xs bg-popover text-popover-foreground p-2 rounded-md shadow-lg border">
                        <p className="font-semibold mb-1">Lead Score Factors:</p>
                        <ul className="list-disc list-inside space-y-0.5">
                          {lead.aiScoreFactors.split(',').map((factor, index) => (
                            <li key={index}>{factor.trim()}</li>
                          ))}
                        </ul>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{lead.source}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(lead.dateAdded).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn("px-2 py-1 text-xs font-medium rounded-full border", getStatusPillStyle(lead.status))}
                    >
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Lead Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleRowClick(lead.id)}>
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => alert(`Send email to ${lead.name}`)}>
                          <Mail className="mr-2 h-4 w-4" /> Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => alert(`Log activity for ${lead.name}`)}>
                          <Activity className="mr-2 h-4 w-4" /> Log Activity
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => alert(`Change status for ${lead.name}`)}>
                           <Edit3 className="mr-2 h-4 w-4" /> Change Status
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
