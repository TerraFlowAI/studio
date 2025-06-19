import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Landmark, FileText, CheckCircle, AlertCircle, UploadCloud } from "lucide-react";

export default function CompliancePage() {
  return (
    <div className="container mx-auto">
      <PageHeader 
        title="RERA &amp; E-Khata Compliance" 
        description="Manage and track compliance with RERA regulations and E-Khata data integration."
      />

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Landmark className="h-8 w-8 text-primary" />
              <CardTitle className="font-headline text-xl">RERA Compliance Status</CardTitle>
            </div>
            <CardDescription>Overview of Real Estate Regulatory Authority (RERA) compliance.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-semibold">Project Registrations</p>
                <p className="text-sm text-muted-foreground">All projects correctly registered.</p>
              </div>
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-semibold">Quarterly Updates</p>
                <p className="text-sm text-muted-foreground">Next update due: 2024-08-15.</p>
              </div>
              <AlertCircle className="h-6 w-6 text-yellow-500" />
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-semibold">Advertisement Guidelines</p>
                <p className="text-sm text-muted-foreground">All current ads compliant.</p>
              </div>
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <Button className="w-full mt-2">View RERA Dashboard</Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <FileText className="h-8 w-8 text-primary" />
              <CardTitle className="font-headline text-xl">E-Khata Data Management</CardTitle>
            </div>
            <CardDescription>Status of E-Khata document verification and integration.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-semibold">E-Khata Verification Queue</p>
                <p className="text-sm text-muted-foreground">5 documents pending verification.</p>
              </div>
              <AlertCircle className="h-6 w-6 text-yellow-500" />
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-semibold">Data Sync Status</p>
                <p className="text-sm text-muted-foreground">Last sync: Today, 10:00 AM.</p>
              </div>
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
             <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-semibold">Mismatch Reports</p>
                <p className="text-sm text-muted-foreground">1 active mismatch report.</p>
              </div>
              <AlertCircle className="h-6 w-6 text-red-500" />
            </div>
            <Button className="w-full mt-2">Access E-Khata Portal</Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8 shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Compliance Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" className="flex-1">
            <UploadCloud className="mr-2 h-4 w-4" /> Upload Compliance Documents
          </Button>
          <Button variant="outline" className="flex-1">
            Generate Compliance Report
          </Button>
           <Button variant="outline" className="flex-1">
            Audit Log
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
