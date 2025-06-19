import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Aperture, Eye, UploadCloud, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const sampleTours = [
  { id: "vt1", name: "Modern Downtown Apartment", date: "2024-07-20", views: 152, imageUrl: "https://placehold.co/600x400.png", status: "Published", type: "VR" },
  { id: "vt2", name: "Suburban Family Home", date: "2024-07-18", views: 98, imageUrl: "https://placehold.co/600x400.png", status: "Draft", type: "3D" },
  { id: "vt3", name: "Luxury Beachfront Villa", date: "2024-07-15", views: 320, imageUrl: "https://placehold.co/600x400.png", status: "Published", type: "AR Enabled" },
];

export default function VirtualToursPage() {
  return (
    <div className="container mx-auto">
      <PageHeader 
        title="Virtual &amp; Augmented Reality Tours" 
        description="Create and manage immersive 3D, VR, and AR property tours."
      >
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <UploadCloud className="mr-2 h-4 w-4" /> Create New Tour
        </Button>
      </PageHeader>

      <Card className="mb-8 shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Manage Your Tours</CardTitle>
          <div className="flex items-center gap-2 pt-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search tours..." className="pl-8" />
              </div>
            </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleTours.map(tour => (
              <Card key={tour.id} className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <Image 
                    src={tour.imageUrl} 
                    alt={tour.name} 
                    width={600} 
                    height={400} 
                    className="w-full h-48 object-cover"
                    data-ai-hint="property interior"
                  />
                  <div className={`absolute top-2 right-2 px-2 py-1 text-xs rounded-full text-white ${tour.status === 'Published' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                    {tour.status}
                  </div>
                   <div className="absolute bottom-2 left-2 px-2 py-1 text-xs rounded-full bg-black/50 text-white">
                    {tour.type}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">{tour.name}</CardTitle>
                  <CardDescription>Created: {tour.date} &bull; Views: {tour.views}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" size="sm"><Eye className="mr-1 h-4 w-4" /> Preview</Button>
                  <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90">Edit</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Explore AI Enhancements for Tours</CardTitle>
          <CardDescription>Leverage AI to make your virtual tours more engaging and informative.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50">
            <Aperture className="h-10 w-10 text-primary mt-1 shrink-0" />
            <div>
              <h4 className="font-semibold">AI-Powered Object Recognition</h4>
              <p className="text-sm text-muted-foreground">Automatically identify and tag furniture, appliances, and architectural features within tours. Provide pop-up info on demand.</p>
              <Button variant="link" className="p-0 h-auto text-primary mt-1">Learn More</Button>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50">
            <Eye className="h-10 w-10 text-primary mt-1 shrink-0" />
            <div>
              <h4 className="font-semibold">AI-Generated Tour Narration</h4>
              <p className="text-sm text-muted-foreground">Create dynamic, natural-sounding voiceovers for your tours, highlighting key features as users navigate.</p>
              <Button variant="link" className="p-0 h-auto text-primary mt-1">Explore Feature</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
