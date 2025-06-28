
'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, SearchX, BedDouble, Bath, Ruler, Tv } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';

// Use a more specific type for the properties
interface Property {
    id: string; 
    title: string; 
    locality: string; 
    price: string; 
    imageUrl: string; 
    aiHint: string;
    beds: number;
    baths: number;
    sqft: number;
    hasVrTour: boolean;
}

interface ListingBoardProps {
    properties: Property[];
}

export function ListingBoard({ properties }: ListingBoardProps) {
    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                 <h2 className="text-2xl font-bold font-headline text-foreground">Listing Board</h2>
                 <Button variant="ghost" asChild>
                    <Link href="/properties">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
                 </Button>
            </div>
            {properties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {properties.map((prop) => (
                         <Card key={prop.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full bg-card">
                            <Link href={`/properties/${prop.id}`} className="flex flex-col h-full">
                                <div className="relative">
                                    <Image
                                        src={prop.imageUrl}
                                        alt={prop.title}
                                        width={400}
                                        height={250}
                                        className="w-full h-40 object-cover"
                                        data-ai-hint={prop.aiHint}
                                    />
                                    {prop.hasVrTour && (
                                        <div className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-full backdrop-blur-sm" title="TerraVision™ Tour Available">
                                            <Tv className="w-4 h-4" />
                                        </div>
                                    )}
                                </div>
                                <CardContent className="p-3 flex-grow">
                                    <h3 className="font-semibold text-sm truncate text-foreground">{prop.title}</h3>
                                    <p className="text-xs text-muted-foreground">{prop.locality}</p>
                                    <p className="font-bold text-sm mt-1 text-primary">{prop.price}</p>
                                </CardContent>
                                <CardFooter className="p-3 pt-2 border-t mt-auto">
                                    <div className="flex items-center text-xs text-muted-foreground gap-3">
                                        <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5 text-primary/70"/> {prop.beds}</span>
                                        <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5 text-primary/70"/> {prop.baths}</span>
                                        <span className="flex items-center gap-1"><Ruler className="w-3.5 h-3.5 text-primary/70"/> {prop.sqft.toLocaleString()} sqft</span>
                                    </div>
                                </CardFooter>
                            </Link>
                         </Card>
                    ))}
                </div>
            ) : (
                 <Card className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                    <SearchX className="h-16 w-16 text-primary/30 mb-4" />
                    <h3 className="text-lg font-semibold">No Recent Listings</h3>
                    <p className="text-sm">Your most recently added properties will appear here.</p>
                 </Card>
            )}
        </div>
    )
}
