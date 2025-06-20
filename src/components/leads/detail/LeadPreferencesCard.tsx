
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Home, DollarSign, Edit3 } from "lucide-react";

interface LeadPreferencesCardProps {
  location: string;
  budget: string;
  propertyType: string;
}

const PreferenceItem: React.FC<{icon: React.ElementType, label: string, value: string}> = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3 py-2 border-b border-border last:border-b-0">
    <Icon className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
    <div className="flex-grow">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm text-foreground">{value}</p>
    </div>
  </div>
);

export function LeadPreferencesCard({ location, budget, propertyType }: LeadPreferencesCardProps) {
  return (
    <Card className="shadow-lg bg-card">
       <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-headline text-lg text-primary">Client Preferences</CardTitle>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
          <Edit3 className="h-4 w-4" />
          <span className="sr-only">Edit Preferences</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-1 pt-0">
        <PreferenceItem icon={MapPin} label="Preferred Location(s)" value={location} />
        <PreferenceItem icon={DollarSign} label="Budget Range" value={budget} />
        <PreferenceItem icon={Home} label="Property Type" value={propertyType} />
      </CardContent>
    </Card>
  );
}
