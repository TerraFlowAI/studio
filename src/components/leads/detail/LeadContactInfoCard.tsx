
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Info, UserCircle, Edit3 } from "lucide-react";

interface LeadContactInfoCardProps {
  email: string;
  phone?: string;
  source: string;
  assignedTo: string;
}

const DetailItem: React.FC<{icon: React.ElementType, label: string, value?: string, href?: string}> = ({ icon: Icon, label, value, href }) => (
  <div className="flex items-start gap-3 py-2 border-b border-border last:border-b-0">
    <Icon className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
    <div className="flex-grow">
      <p className="text-xs text-muted-foreground">{label}</p>
      {href && value ? (
        <a href={href} className="text-sm text-foreground hover:underline break-all">{value}</a>
      ) : value ? (
        <p className="text-sm text-foreground break-all">{value}</p>
      ) : (
        <p className="text-sm text-muted-foreground italic">Not provided</p>
      )}
    </div>
  </div>
);


export function LeadContactInfoCard({ email, phone, source, assignedTo }: LeadContactInfoCardProps) {
  return (
    <Card className="shadow-lg bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-headline text-lg text-primary">Contact Information</CardTitle>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
          <Edit3 className="h-4 w-4" />
          <span className="sr-only">Edit Contact Info</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-1 pt-0">
        <DetailItem icon={Mail} label="Email" value={email} href={`mailto:${email}`} />
        <DetailItem icon={Phone} label="Phone" value={phone} href={phone ? `tel:${phone}` : undefined} />
        <DetailItem icon={Info} label="Source" value={source} />
        <DetailItem icon={UserCircle} label="Assigned To" value={assignedTo} />
      </CardContent>
    </Card>
  );
}
