
"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UploadCloud, FileText, CheckCircle, Clock, MoreVertical, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const sampleDocuments = [
  { id: "doc1", name: "Sale Agreement - Property P1234", type: "Contract", uploaded: "2024-07-20", status: "Verified" },
  { id: "doc2", name: "Client KYC - Priya Patel", type: "KYC", uploaded: "2024-07-18", status: "Verified" },
  { id: "doc3", name: "Floor Plan - Greenwood Heights", type: "Listing", uploaded: "2024-07-15", status: "Pending" },
  { id: "doc4", name: "RERA Certificate - Project X", type: "Compliance", uploaded: "2024-07-12", status: "Verified" },
  { id: "doc5", name: "Rental Agreement - Unit 5B", type: "Contract", uploaded: "2024-07-22", status: "Pending" },
  { id: "doc6", name: "E-Khata - Plot 7", type: "Compliance", uploaded: "2024-07-19", status: "Verified" },
];

export default function DocumentsPage() {
  return (
    <div className="container mx-auto">
      <PageHeader 
        title="Document Management (TerraSecure™)" 
        description="Securely store, manage, and verify all your important documents."
      >
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <UploadCloud className="mr-2 h-4 w-4" /> Upload Document
        </Button>
      </PageHeader>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="font-headline text-xl">Document Vault</CardTitle>
              <CardDescription>Browse and manage your uploaded files.</CardDescription>
            </div>
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search documents..." className="pl-8" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Documents</TabsTrigger>
              <TabsTrigger value="contracts">Contracts</TabsTrigger>
              <TabsTrigger value="listings">Listing Docs</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="kyc">Client KYC</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <DocumentsTable documents={sampleDocuments} />
            </TabsContent>
             <TabsContent value="contracts" className="mt-4">
              <DocumentsTable documents={sampleDocuments.filter(d => d.type === 'Contract')} />
            </TabsContent>
            <TabsContent value="listings" className="mt-4">
              <DocumentsTable documents={sampleDocuments.filter(d => d.type === 'Listing')} />
            </TabsContent>
             <TabsContent value="compliance" className="mt-4">
              <DocumentsTable documents={sampleDocuments.filter(d => d.type === 'Compliance')} />
            </TabsContent>
             <TabsContent value="kyc" className="mt-4">
              <DocumentsTable documents={sampleDocuments.filter(d => d.type === 'KYC')} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}


function DocumentsTable({ documents }: { documents: typeof sampleDocuments }) {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Document Name</TableHead>
            <TableHead className="hidden md:table-cell">Type</TableHead>
            <TableHead>Uploaded On</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => (
            <TableRow key={doc.id} className="hover:bg-muted/50 transition-colors">
              <TableCell>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="font-medium">{doc.name}</span>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{doc.type}</TableCell>
              <TableCell>{doc.uploaded}</TableCell>
              <TableCell>
                <Badge variant={doc.status === "Verified" ? "default" : "secondary"}
                       className={
                         doc.status === "Verified" 
                           ? "bg-green-100 text-green-700 border-green-200" 
                           : "bg-yellow-100 text-yellow-700 border-yellow-200"
                       }
                >
                  {doc.status === "Verified" 
                    ? <CheckCircle className="mr-1.5 h-3.5 w-3.5" /> 
                    : <Clock className="mr-1.5 h-3.5 w-3.5" />}
                  {doc.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Document</DropdownMenuItem>
                      <DropdownMenuItem>Verify with TerraSecure™</DropdownMenuItem>
                      <DropdownMenuItem>Download</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
