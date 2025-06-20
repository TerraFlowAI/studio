
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Mail, PlusCircle, Edit2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { LEAD_STATUSES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface LeadDetailHeaderProps {
  leadName: string;
  currentStatus: string;
  onStatusChange: (newStatus: string) => void;
}

export function LeadDetailHeader({ leadName, currentStatus, onStatusChange }: LeadDetailHeaderProps) {
  const getStatusPillStyle = (statusLabel: string): string => {
    const statusConfig = LEAD_STATUSES.find(s => s.label.toLowerCase() === statusLabel.toLowerCase());
    return statusConfig ? statusConfig.color : 'bg-slate-100 text-slate-700 border-slate-300';
  };
  
  return (
    <div className="mb-6 md:mb-8">
      <div className="flex items-center text-sm text-muted-foreground mb-2">
        <Link href="/leads" className="hover:text-primary">Leads</Link>
        <span className="mx-2">/</span>
        <span className="font-medium text-foreground">{leadName}</span>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-bold font-headline text-primary">{leadName}</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Badge
                className={cn(
                  "px-3 py-1 text-sm font-semibold rounded-full border cursor-pointer hover:opacity-80 transition-opacity whitespace-nowrap",
                  getStatusPillStyle(currentStatus)
                )}
              >
                {currentStatus} <ChevronDown className="ml-1.5 h-4 w-4 opacity-70" />
              </Badge>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {LEAD_STATUSES.map(status => (
                <DropdownMenuItem key={status.id} onClick={() => onStatusChange(status.label)}>
                  {status.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <Button variant="outline">
            <Edit2 className="mr-2 h-4 w-4" /> Log Activity
          </Button>
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" /> Send Email
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <PlusCircle className="mr-2 h-4 w-4" /> Create Task
          </Button>
        </div>
      </div>
    </div>
  );
}
