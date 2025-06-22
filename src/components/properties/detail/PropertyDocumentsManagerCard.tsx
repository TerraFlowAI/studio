// src/components/properties/detail/PropertyDocumentsManagerCard.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, UploadCloud, ShieldCheck, ShieldAlert, BadgeCheck, Star } from "lucide-react"; // Using BadgeCheck for verified
import { cn } from "@/lib/utils";

interface DocumentItem {
  id: string;
  name: string;
  url: string; // Placeholder
  verifiedStatus: boolean;
  type: string; // e.g., Legal, Layout, Compliance
}

interface PropertyDocumentsManagerCardProps {
  documents: DocumentItem[];
  isTerraSecureVerified: boolean;
  onUpload: () => void;
  onGetVerified: () => void;
}

export function PropertyDocumentsManagerCard({
  documents,
  isTerraSecureVerified,
  onUpload,
  onGetVerified,
}: PropertyDocumentsManagerCardProps) {
  return (
    <Card className="shadow-lg bg-card">
      <CardHeader>
        <CardTitle className="font-headline text-lg text-primary">Property Documents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={cn(
          "p-3 mb-4 rounded-md border flex items-center gap-2 text-sm font-medium",
          isTerraSecureVerified 
            ? "bg-green-50 border-green-200 text-green-700 dark:bg-green-900/30 dark:border-green-700 dark:text-green-300" 
            : "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/30 dark:border-amber-700 dark:text-amber-300"
        )}>
          {isTerraSecureVerified ? <BadgeCheck className="h-5 w-5" /> : <ShieldAlert className="h-5 w-5" />}
          <span>
            {isTerraSecureVerified ? "Verified by TerraSecure™" : "Verification Recommended"}
          </span>
        </div>

        {documents.length > 0 ? (
          <ScrollArea className="h-[150px] pr-3">
            <div className="space-y-2">
              {documents.map(doc => (
                <a 
                  key={doc.id} 
                  href={doc.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-between p-2 border border-border rounded-md hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                    <span className="text-sm text-foreground truncate group-hover:text-primary">{doc.name}</span>
                  </div>
                  {doc.verifiedStatus && <ShieldCheck className="h-4 w-4 text-green-500 flex-shrink-0" title="Verified" />}
                </a>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="text-center text-muted-foreground py-4">
            <FileText className="mx-auto h-8 w-8 text-primary/30 mb-2" />
            <p className="text-sm">No documents uploaded yet.</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-4 border-t border-border flex flex-col sm:flex-row gap-2">
        <Button variant="outline" onClick={onUpload} className="w-full sm:flex-1">
          <UploadCloud className="mr-2 h-4 w-4" /> Upload Document
        </Button>
        {!isTerraSecureVerified && (
          <Button onClick={onGetVerified} className="w-full sm:flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Star className="mr-2 h-4 w-4" /> Get Verified
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
