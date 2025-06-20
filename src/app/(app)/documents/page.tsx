
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ShieldCheck, Construction } from "lucide-react";

export default function DocumentsPage() {
  return (
    <div className="container mx-auto">
      <PageHeader 
        title="Documents" 
        description="Securely manage and verify all your transactional documents." 
      />
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Document Repository & TerraSecure™</CardTitle>
          <CardDescription>
            This section is under development. It will serve as a centralized and secure repository 
            for all transactional documents. You'll be able to leverage TerraSecure™ for compliance checks, 
            fraud detection, and document verification.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Construction className="h-16 w-16 text-primary mb-4" />
          <p className="text-lg font-semibold text-muted-foreground">Coming Soon!</p>
          <p className="text-sm text-muted-foreground">
            The Documents page is currently being built.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
