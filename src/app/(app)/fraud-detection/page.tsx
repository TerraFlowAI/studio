import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, AlertTriangle, FileSearch, Landmark, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const sampleAlerts = [
  { id: "alert1", type: "Unusual Transaction", severity: "High", date: "2024-07-22", description: "Large cash deposit from unverified source for property ID P7890.", status: "Pending Review" },
  { id: "alert2", type: "Document Mismatch", severity: "Medium", date: "2024-07-21", description: "E-Khata details for property ID P1234 differ from submitted KYC.", status: "Investigating" },
  { id: "alert3", type: "RERA Compliance Flag", severity: "Low", date: "2024-07-20", description: "Project X marketing material missing RERA registration number.", status: "Resolved" },
  { id: "alert4", type: "Suspicious Login Attempt", severity: "Medium", date: "2024-07-22", description: "Multiple failed login attempts from an unrecognized IP.", status: "Action Required" },
];

const complianceItems = [
 { id: "comp1", name: "RERA Project Registration (PRJ001)", status: "Compliant", lastChecked: "2024-07-15", details: "All documents verified." },
 { id: "comp2", name: "E-Khata Verification (PROP567)", status: "Pending", lastChecked: "2024-07-20", details: "Awaiting updated records from authority." },
 { id: "comp3", name: "AML Policy Adherence", status: "Compliant", lastChecked: "2024-07-01", details: "Annual review completed." },
];

export default function FraudDetectionPage() {
  return (
    <div className="container mx-auto">
      <PageHeader 
        title="Fraud Detection &amp; Compliance" 
        description="AI algorithms to detect anomalies, verify documents, and ensure regulatory compliance."
      />
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Alerts</CardTitle>
            <AlertTriangle className="h-5 w-5 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Requiring attention.</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Documents Verified</CardTitle>
            <FileSearch className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,287</div>
            <p className="text-xs text-muted-foreground">Past 30 days.</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Compliance Rate</CardTitle>
            <Landmark className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.2%</div>
            <p className="text-xs text-muted-foreground">Across all regulations.</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8 shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Security Alerts</CardTitle>
           <div className="flex items-center gap-2 pt-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search alerts..." className="pl-8" />
            </div>
            <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter Alerts</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleAlerts.map((alert) => (
                <TableRow key={alert.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">{alert.type}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={alert.severity === "High" ? "destructive" : alert.severity === "Medium" ? "default" : "outline"}
                      className={
                        alert.severity === "High" ? "bg-red-500 text-white" :
                        alert.severity === "Medium" ? "bg-yellow-500 text-black" :
                        "border-gray-400 text-gray-600"
                      }
                    >
                      {alert.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{alert.date}</TableCell>
                  <TableCell className="text-xs max-w-xs truncate">{alert.description}</TableCell>
                   <TableCell>
                     <Badge variant={alert.status === 'Resolved' ? 'default' : 'secondary'}
                            className={alert.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}>
                       {alert.status}
                     </Badge>
                   </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Compliance Dashboard (RERA, E-Khata)</CardTitle>
          <CardDescription>Monitor adherence to key regulations and data integrity.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item/Document</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Last Checked</TableHead>
                <TableHead>Details</TableHead>
                 <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complianceItems.map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <Badge variant={item.status === "Compliant" ? "default" : "outline"}
                           className={item.status === "Compliant" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{item.lastChecked}</TableCell>
                  <TableCell className="text-xs max-w-xs truncate">{item.details}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      {item.status === "Pending" ? "Update" : "View Log"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
