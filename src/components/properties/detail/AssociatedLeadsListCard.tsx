// src/components/properties/detail/AssociatedLeadsListCard.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserPlus, UserCircle } from "lucide-react"; // UserCircle for lead icon
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Lead } from "@/components/leads/LeadsTable"; // Assuming Lead type is defined
import { cn } from "@/lib/utils";
import { LEAD_STATUSES } from "@/lib/constants";

interface AssociatedLeadsListCardProps {
  leads: Partial<Lead>[]; // Allow partial lead data for display
}

const getStatusPillStyle = (statusLabel?: string): string => {
  if (!statusLabel) return 'bg-slate-100 text-slate-700 border-slate-300';
  const statusConfig = LEAD_STATUSES.find(s => s.label.toLowerCase() === statusLabel.toLowerCase());
  return statusConfig ? statusConfig.color : 'bg-slate-100 text-slate-700 border-slate-300';
};

const getAIScoreColorClasses = (score?: number): string => {
  if (!score) return "text-muted-foreground";
  if (score > 75) return "text-green-600";
  if (score > 40) return "text-yellow-600";
  return "text-red-600";
};

export function AssociatedLeadsListCard({ leads }: AssociatedLeadsListCardProps) {
  return (
    <Card className="shadow-lg bg-card">
      <CardHeader>
        <CardTitle className="font-headline text-lg text-primary">Associated Leads (TerraLead™)</CardTitle>
      </CardHeader>
      <CardContent>
        {leads.length > 0 ? (
          <>
            <ScrollArea className="h-[200px] pr-3">
              <div className="space-y-3">
                {leads.map(lead => (
                  <Link href={`/leads/${lead.id}`} key={lead.id} className="block p-2.5 border border-border rounded-md hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <UserCircle className="h-5 w-5 text-primary/70" />
                        <p className="text-sm font-medium text-foreground truncate">{lead.name}</p>
                      </div>
                      {lead.aiScore && (
                        <span className={cn("text-xs font-semibold", getAIScoreColorClasses(lead.aiScore))}>
                          AI: {lead.aiScore}
                        </span>
                      )}
                    </div>
                    {lead.status && (
                       <Badge variant="outline" className={cn("mt-1 text-xs", getStatusPillStyle(lead.status))}>
                         {lead.status}
                       </Badge>
                    )}
                  </Link>
                ))}
              </div>
            </ScrollArea>
            <Button variant="outline" className="w-full mt-4">
              <UserPlus className="mr-2 h-4 w-4" /> Link New Lead
            </Button>
          </>
        ) : (
          <div className="text-center text-muted-foreground py-6">
            <Users className="mx-auto h-10 w-10 text-primary/30 mb-2" />
            <p className="text-sm">No leads associated with this property yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Dummy Users icon if not imported from lucide already
const Users = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
