
"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, Zap, PlayCircle, Edit3, Trash2, Eye, Briefcase, Layers, PackageSearch, GanttChartSquare, AlertTriangle, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image"; // Using next/image for consistency
import { cn } from "@/lib/utils";

// Mock data for workflows - this would come from an API in a real app
const sampleWorkflows = [
  { 
    id: "wf1", 
    name: "New Lead Welcome Email", 
    description: "Automatically sends a welcome email to new leads from TerraLead™.", 
    status: "Active" as "Active" | "Paused", 
    triggers: 120, 
    successRate: 98,
    lastRun: "2024-07-22 10:00 AM",
    apps: ["TerraLead", "Email"] 
  },
  { 
    id: "wf2", 
    name: "Client Follow-up Reminder", 
    description: "Reminds agent to follow up with clients after 7 days of no contact.", 
    status: "Active" as "Active" | "Paused", 
    triggers: 45, 
    successRate: 100,
    lastRun: "2024-07-21 03:30 PM",
    apps: ["TerraLead", "Calendar", "Notification"] 
  },
  { 
    id: "wf3", 
    name: "Property Viewing Confirmation", 
    description: "Sends confirmation and details for scheduled property viewings via Email & SMS.", 
    status: "Paused" as "Active" | "Paused", 
    triggers: 88, 
    successRate: 92,
    lastRun: "2024-07-20 09:00 AM",
    apps: ["Calendar", "Email", "SMS"]
  },
  { 
    id: "wf4", 
    name: "Post-Viewing Feedback Request", 
    description: "Automatically sends a feedback survey after a property viewing.", 
    status: "Active" as "Active" | "Paused", 
    triggers: 60, 
    successRate: 95,
    lastRun: "2024-07-23 11:00 AM",
    apps: ["Calendar", "Email", "Survey"]
  },
];

// Mock data for developer projects
const developerProjects = [
  { id: "devProj1", name: "Greenwood Heights Tower A", progress: 75, status: "On Track", rera: "Verified", envClearance: "Pending" },
  { id: "devProj2", name: "Oceanview Luxury Condos", progress: 40, status: "At Risk", rera: "Pending", envClearance: "Verified" },
  { id: "devProj3", name: "Downtown Commercial Hub", progress: 95, status: "Nearing Completion", rera: "Verified", envClearance: "Verified" },
];

// Mock data for workflow templates
const workflowTemplates = [
    { id: "tpl1", name: "Automated Hot Lead Nurturing", description: "Engage high-scoring leads with a series of targeted emails and tasks.", apps: ["TerraLead", "Email", "Tasks"] },
    { id: "tpl2", name: "New Property Listing Blast", description: "Announce new properties to relevant client segments via multiple channels.", apps: ["Properties", "Email", "SMS", "SocialMedia"] },
    { id: "tpl3", name: "Contract Document Workflow", description: "Automate reminders and follow-ups for contract signing and document collection.", apps: ["Documents", "Email", "Calendar"] },
];


const AppIcon: React.FC<{ appName: string }> = ({ appName }) => {
  // In a real app, these would be proper icons
  const baseStyle = "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm";
  switch(appName) {
    case "TerraLead": return <div className={cn(baseStyle, "bg-teal-500")} title="TerraLead™">TL</div>;
    case "Email": return <div className={cn(baseStyle, "bg-blue-500")} title="Email">E</div>;
    case "Calendar": return <div className={cn(baseStyle, "bg-green-500")} title="Calendar">C</div>;
    case "Notification": return <div className={cn(baseStyle, "bg-yellow-500")} title="Notification">N</div>;
    case "SMS": return <div className={cn(baseStyle, "bg-purple-500")} title="SMS">S</div>;
    case "Survey": return <div className={cn(baseStyle, "bg-indigo-500")} title="Survey">Sy</div>;
    case "Properties": return <div className={cn(baseStyle, "bg-sky-500")} title="Properties">P</div>;
    case "SocialMedia": return <div className={cn(baseStyle, "bg-pink-500")} title="Social Media">SM</div>;
    case "Documents": return <div className={cn(baseStyle, "bg-slate-500")} title="Documents">D</div>;
    case "Tasks": return <div className={cn(baseStyle, "bg-orange-500")} title="Tasks">T</div>;
    default: return <div className={cn(baseStyle, "bg-gray-400")}>{appName.substring(0,1)}</div>;
  }
};

export default function SmartflowStudioPage() {
  const [workflows, setWorkflows] = React.useState(sampleWorkflows);

  const toggleWorkflowStatus = (id: string) => {
    setWorkflows(currentWorkflows => 
      currentWorkflows.map(wf => 
        wf.id === id ? { ...wf, status: wf.status === "Active" ? "Paused" : "Active" } : wf
      )
    );
  };

  return (
    <div className="container mx-auto">
      <PageHeader title="SmartFlow™ Automation Studio">
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/smartflow/new"><PlusCircle className="mr-2 h-4 w-4" /> Create New Workflow</Link>
        </Button>
      </PageHeader>

      <Tabs defaultValue="my-workflows" className="w-full">
        <TabsList className="border-b-0 justify-start mb-6 bg-transparent p-0">
          <TabsTrigger value="my-workflows" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none px-4 pb-2 text-muted-foreground hover:text-primary">My Workflows</TabsTrigger>
          <TabsTrigger value="project-dashboard" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none px-4 pb-2 text-muted-foreground hover:text-primary">Project Dashboard</TabsTrigger>
          <TabsTrigger value="template-library" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none px-4 pb-2 text-muted-foreground hover:text-primary">Template Library</TabsTrigger>
        </TabsList>

        <TabsContent value="my-workflows">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {workflows.map(flow => (
              <Card key={flow.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col bg-card border border-border">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <Zap className="h-7 w-7 text-primary" />
                    <Switch 
                      checked={flow.status === 'Active'} 
                      onCheckedChange={() => toggleWorkflowStatus(flow.id)}
                      aria-label={`Toggle workflow ${flow.name}`}
                      className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted"
                    />
                  </div>
                  <CardTitle className="font-headline text-md font-semibold text-foreground leading-tight">{flow.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow space-y-3">
                  <div className="flex items-center space-x-1.5 mb-2">
                    {flow.apps.map(app => <AppIcon key={app} appName={app} />)}
                  </div>
                  <p className="text-xs text-muted-foreground h-10 overflow-hidden leading-relaxed">{flow.description}</p>
                  <div className="text-xs text-muted-foreground space-y-0.5 pt-2 border-t border-border">
                    <p>Runs (Last 7d): <span className="font-semibold text-foreground">{flow.triggers}</span></p>
                    <p>Success Rate: <span className="font-semibold text-foreground">{flow.successRate}%</span></p>
                    <p>Last Run: <span className="font-semibold text-foreground">{flow.lastRun}</span></p>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-border pt-3 pb-3">
                  <div className="flex justify-end gap-1.5 w-full">
                    <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-primary"><Eye className="mr-1 h-3.5 w-3.5" /> View Log</Button>
                    <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-primary"><Edit3 className="mr-1 h-3.5 w-3.5" /> Edit</Button>
                    <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-destructive"><Trash2 className="mr-1 h-3.5 w-3.5" /> Delete</Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="project-dashboard">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center"><GanttChartSquare className="mr-2 h-6 w-6 text-primary" /> Project Milestones Dashboard</CardTitle>
              <CardDescription>Track progress, resource allocation, and compliance for developer projects.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="bg-muted/30">
                  <CardHeader><CardTitle className="text-sm text-muted-foreground">Overall Progress</CardTitle></CardHeader>
                  <CardContent><p className="text-2xl font-bold text-primary">65%</p></CardContent>
                </Card>
                 <Card className="bg-muted/30">
                  <CardHeader><CardTitle className="text-sm text-muted-foreground">Upcoming Milestones</CardTitle></CardHeader>
                  <CardContent><p className="text-2xl font-bold text-primary">3</p></CardContent>
                </Card>
                 <Card className="bg-muted/30">
                  <CardHeader><CardTitle className="text-sm text-muted-foreground">Overdue Tasks</CardTitle></CardHeader>
                  <CardContent><p className="text-2xl font-bold text-destructive">1</p></CardContent>
                </Card>
              </div>

              <div className="h-[300px] border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center text-muted-foreground bg-background">
                <GanttChartSquare className="h-16 w-16 text-primary/30 mb-4" />
                <p className="text-lg font-semibold">Interactive Gantt Chart</p>
                <p className="text-sm">(Coming Soon)</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Compliance Monitoring</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b">
                                <th className="p-2 text-left font-medium text-muted-foreground">Project Name</th>
                                <th className="p-2 text-left font-medium text-muted-foreground">Progress</th>
                                <th className="p-2 text-left font-medium text-muted-foreground">RERA Status</th>
                                <th className="p-2 text-left font-medium text-muted-foreground">Env. Clearance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {developerProjects.map(proj => (
                                <tr key={proj.id} className="border-b last:border-none hover:bg-muted/20">
                                    <td className="p-2 text-foreground">{proj.name}</td>
                                    <td className="p-2 text-foreground">{proj.progress}%</td>
                                    <td className={`p-2 font-medium ${proj.rera === 'Verified' ? 'text-green-600' : 'text-amber-600'}`}>{proj.rera}</td>
                                    <td className={`p-2 font-medium ${proj.envClearance === 'Verified' ? 'text-green-600' : 'text-amber-600'}`}>{proj.envClearance}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="template-library">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center"><PackageSearch className="mr-2 h-6 w-6 text-primary" /> Workflow Template Library</CardTitle>
              <CardDescription>Kickstart your automations with pre-built templates for common real estate tasks.</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {workflowTemplates.map(template => (
                    <Card key={template.id} className="bg-muted/30 hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-md font-semibold text-primary">{template.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p className="text-xs text-muted-foreground h-12 overflow-hidden">{template.description}</p>
                             <div className="flex items-center space-x-1.5 pt-1">
                                {template.apps.map(app => <AppIcon key={app} appName={app} />)}
                            </div>
                        </CardContent>
                        <CardFooter>
                             <Button size="sm" className="w-full bg-primary hover:bg-primary/90">Use Template</Button>
                        </CardFooter>
                    </Card>
                ))}
               </div>
                <div className="mt-8 h-[200px] border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center text-muted-foreground bg-background">
                    <PackageSearch className="h-12 w-12 text-primary/30 mb-3" />
                    <p className="text-md font-semibold">More templates coming soon!</p>
                </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
