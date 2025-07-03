"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface WelcomeModalProps {
  userName: string;
  onStartTour: () => void;
  onSkipTour: () => void;
}

export function WelcomeModal({ userName, onStartTour, onSkipTour }: WelcomeModalProps) {
  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-lg" hideCloseButton>
        <DialogHeader className="text-center items-center">
          <video
            className="w-full h-auto rounded-lg mb-4 max-h-[200px] object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/videos/terralead-showcase.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <DialogTitle className="text-2xl font-bold font-headline">Welcome to TerraFlow, {userName}!</DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            We're thrilled to have you. Let's take a quick 2-minute tour to get you set up for success.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col gap-2 sm:flex-col sm:space-x-0">
          <Button onClick={onStartTour} size="lg" className="w-full">
            Start the Tour
          </Button>
          <Button onClick={onSkipTour} variant="ghost" size="sm">
            No thanks, I'll explore on my own.
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
