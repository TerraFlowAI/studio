
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction } from "lucide-react";

export default function PropertiesPage() {
  return (
    <div className="container mx-auto">
      <PageHeader 
        title="Properties" 
        description="Manage your property listings, inventory, and virtual tours." 
      />
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Property Management</CardTitle>
          <CardDescription>
            This section is under development. Here you will manage all your property listings, 
            including adding new properties, editing existing ones, tracking performance,
            integrating TerraScribe™ for descriptions, and managing TerraVision™ VR tours.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Construction className="h-16 w-16 text-primary mb-4" />
          <p className="text-lg font-semibold text-muted-foreground">Coming Soon!</p>
          <p className="text-sm text-muted-foreground">
            The Properties page is currently being built.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
