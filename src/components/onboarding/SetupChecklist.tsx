"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from '@/components/ui/progress';
import { Briefcase, UserPlus, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface SetupChecklistProps {
  onComplete: () => void;
}

export function SetupChecklist({ onComplete }: SetupChecklistProps) {
  const router = useRouter();
  // In a real app, this state might come from a context or parent to track actual completion.
  // For this implementation, we'll simulate it locally.
  const [leadAdded, setLeadAdded] = useState(false);
  const [propertyAdded, setPropertyAdded] = useState(false);

  const progress = ( (leadAdded ? 50 : 0) + (propertyAdded ? 50 : 0) );

  // These functions would ideally be linked to actual events, e.g., a callback from the Add Lead sheet.
  // For now, they just update local state when the link is clicked.
  const handleAddLeadClick = () => {
    setLeadAdded(true);
    // You would typically open the AddLeadSheet here
    alert("This would open the 'Add Lead' form. For now, we'll mark it as complete.");
  };

  const handleAddPropertyClick = () => {
    setPropertyAdded(true);
    router.push('/properties/new');
  };

  const isComplete = leadAdded && propertyAdded;

  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" hideCloseButton>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold font-headline">Let's Get You Set Up!</DialogTitle>
          <DialogDescription>
            Complete these two simple steps to unlock the full power of TerraFlow.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
            <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Progress</span>
                    <span>{progress}%</span>
                </div>
                <Progress value={progress} className="w-full" />
            </div>

            <Button
                variant="outline"
                className={cn("w-full justify-start h-auto py-3 text-left", leadAdded && "border-green-500 bg-green-50/50")}
                onClick={handleAddLeadClick}
                disabled={leadAdded}
            >
                <div className="flex items-center w-full">
                    <UserPlus className="mr-3 h-5 w-5 text-primary" />
                    <div className="flex-grow">
                        <p className="font-semibold">Import Your First Lead</p>
                        <p className="text-xs text-muted-foreground">Click to add your first contact.</p>
                    </div>
                    {leadAdded && <CheckCircle className="h-5 w-5 text-green-600" />}
                </div>
            </Button>
            
            <Button
                variant="outline"
                className={cn("w-full justify-start h-auto py-3 text-left", propertyAdded && "border-green-500 bg-green-50/50")}
                onClick={handleAddPropertyClick}
                disabled={propertyAdded}
            >
                 <div className="flex items-center w-full">
                    <Briefcase className="mr-3 h-5 w-5 text-primary" />
                    <div className="flex-grow">
                        <p className="font-semibold">Add Your First Property</p>
                        <p className="text-xs text-muted-foreground">Click to create a new listing.</p>
                    </div>
                    {propertyAdded && <CheckCircle className="h-5 w-5 text-green-600" />}
                </div>
            </Button>
        </div>
        <DialogFooter>
          <Button onClick={onComplete} className="w-full" disabled={!isComplete}>
             🎉 You're all set! Finish Setup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
