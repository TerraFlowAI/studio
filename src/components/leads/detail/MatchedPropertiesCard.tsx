
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Eye, Mail, Search, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface Property {
  id: string;
  title: string;
  price: string;
  imageUrl: string;
  aiHint: string;
  hasVrTour?: boolean;
}

interface MatchedPropertiesCardProps {
  properties: Property[];
}

export function MatchedPropertiesCard({ properties }: MatchedPropertiesCardProps) {
  return (
    <Card className="shadow-lg bg-card">
      <CardHeader>
        <CardTitle className="font-headline text-lg text-primary">AI-Matched Listings</CardTitle>
      </CardHeader>
      <CardContent>
        {properties.length > 0 ? (
          <>
            <ScrollArea className="h-[200px] pr-3"> {/* Max height for scroll */}
              <div className="space-y-3">
                {properties.map(prop => (
                  <div key={prop.id} className="flex items-center gap-3 p-2 border border-border rounded-md hover:bg-muted/50">
                    <Image 
                      src={prop.imageUrl} 
                      alt={prop.title} 
                      width={60} 
                      height={40} 
                      className="w-16 h-12 object-cover rounded" 
                      data-ai-hint={prop.aiHint}
                    />
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-foreground truncate">{prop.title}</p>
                      <p className="text-xs text-muted-foreground">{prop.price}</p>
                    </div>
                    {prop.hasVrTour && (
                      <Button variant="ghost" size="icon" className="text-primary h-7 w-7" title="TerraVision™ VR Tour Available">
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
             <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Mail className="mr-2 h-4 w-4" /> Suggest Properties
            </Button>
          </>
        ) : (
          <div className="text-center text-muted-foreground py-6">
            <Search className="mx-auto h-10 w-10 text-primary/30 mb-2" />
            <p className="text-sm">No properties matched yet.</p>
            <Button variant="link" className="mt-1 text-primary p-0 h-auto">Find Matches</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
