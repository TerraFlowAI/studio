
"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, Zap, PlayCircle, MoreVertical, Edit, Copy, Trash2 } from "lucide-react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const sampleWorkflows = [
  { id: "wf1", name: "New Lead Welcome Email", status: true, lastModified: "2024-07-22", trigger: "New Lead Created" },
  { id: "wf2", name: "3-Day Follow-up Reminder", status: true, lastModified: "2024-07-20", trigger: "Lead Status is 'Contacted'" },
  { id: "wf3", name: "Post-Viewing Feedback Request", status: false, lastModified: "2024-07-18", trigger: "Viewing Completed" },
  { id: "wf4", name: "Notify Agent on Hot Lead", status: true, lastModified: "2024-07-21", trigger: "Lead Score > 85" },
];

export default function SmartflowPage() {
  return (
    <div className="container mx-auto">
      <PageHeader 
        title="SmartFlow™ Automation" 
        description="Automate your real estate workflows to save time and close deals faster."
      >
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/smartflow/new"><PlusCircle className="mr-2 h-4 w-4" /> Create New Workflow</Link>
        </Button>
      </PageHeader>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Workflows</CardTitle>
            <Zap className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sampleWorkflows.length}</div>
            <p className="text-xs text-muted-foreground">automations configured</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Automations</CardTitle>
            <PlayCircle className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sampleWorkflows.filter(w => w.status).length}</div>
            <p className="text-xs text-muted-foreground">currently running</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tasks Executed</CardTitle>
            <Zap className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,482</div>
            <p className="text-xs text-muted-foreground">in the last 30 days</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Your Workflows</CardTitle>
          <CardDescription>Manage your automated processes.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Workflow Name</TableHead>
                <TableHead>Trigger</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleWorkflows.map((workflow) => (
                <TableRow key={workflow.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">{workflow.name}</TableCell>
                  <TableCell><Badge variant="outline">{workflow.trigger}</Badge></TableCell>
                  <TableCell>{workflow.lastModified}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch checked={workflow.status} aria-label={`Toggle ${workflow.name}`} />
                      <span className="text-sm">{workflow.status ? 'Active' : 'Inactive'}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Edit className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                        <DropdownMenuItem><Copy className="mr-2 h-4 w-4" /> Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
