
// src/components/properties/detail/MediaGallery.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { PlayCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaGalleryProps {
  mainImage: string;
  thumbnailImages: string[];
  aiHints: string[]; // To match thumbnailImages
  hasVrTour: boolean;
  vrTourUrl: string;
  propertyTitle: string;
}

export function MediaGallery({
  mainImage,
  thumbnailImages,
  aiHints,
  hasVrTour,
  vrTourUrl,
  propertyTitle,
}: MediaGalleryProps) {
  const [currentImage, setCurrentImage] = React.useState(mainImage);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0); // Assuming mainImage is the first in a conceptual combined list
  const allImages = [mainImage, ...thumbnailImages]; // Combine for easier indexing

  const handleThumbnailClick = (imageSrc: string, index: number) => {
    setCurrentImage(imageSrc);
    // Adjust index: if mainImage is at index 0, then thumbnails start from index 1
    setCurrentImageIndex(allImages.indexOf(imageSrc));
  };

  const navigateImage = (direction: 'next' | 'prev') => {
    let newIndex = currentImageIndex;
    if (direction === 'next') {
      newIndex = (currentImageIndex + 1) % allImages.length;
    } else {
      newIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
    }
    setCurrentImageIndex(newIndex);
    setCurrentImage(allImages[newIndex]);
  };

  return (
    <Card className="shadow-lg overflow-hidden">
      <CardContent className="p-0">
        <div className="relative group">
          <Image
            src={currentImage}
            alt={`Main view of ${propertyTitle}`}
            width={1200}
            height={700}
            className="w-full h-auto aspect-[16/9] md:aspect-[16/8] object-cover transition-transform duration-300 ease-in-out"
            priority // Prioritize loading the main image
            data-ai-hint={aiHints[currentImageIndex] || "property interior"}
          />
          {hasVrTour && (
            <Button
              variant="default"
              size="lg"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100"
              onClick={() => alert(`VR Tour Clicked: ${vrTourUrl}`)}
            >
              <PlayCircle className="mr-2 h-6 w-6" /> View TerraVision™ Tour
            </Button>
          )}
           {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => navigateImage('prev')}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => navigateImage('next')}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
        {thumbnailImages.length > 0 && (
          <div className="p-3 bg-muted/30">
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex space-x-3 pb-2">
                {thumbnailImages.map((thumb, index) => (
                  <button
                    key={index}
                    onClick={() => handleThumbnailClick(thumb, index +1)} // index + 1 because mainImage is at index 0
                    className={cn(
                      "block w-24 h-16 rounded-md overflow-hidden border-2 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                      currentImage === thumb ? "border-primary ring-2 ring-primary ring-offset-2" : "border-transparent"
                    )}
                  >
                    <Image
                      src={thumb}
                      alt={`Thumbnail ${index + 1} for ${propertyTitle}`}
                      width={100}
                      height={67}
                      className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                       data-ai-hint={aiHints[index+1] || "property detail"}
                    />
                  </button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

    