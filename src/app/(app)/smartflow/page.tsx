
"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { PlusCircle, Zap, PlayCircle, Edit3, Trash2, Eye, Briefcase, Layers, PackageSearch, GanttChartSquare, AlertTriangle, CheckCircle, Search, ListFilter, ChevronDown, MoreVertical, CalendarDays, Database, MessageSquare, Users as LeadUsersIcon, Home as PropertyIcon, Mail } from "lucide-react"; // Added Mail here
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Workflow {
  id: string;
  name: string;
  status: "Active" | "Inactive";
  apps: string[]; // App names like "TerraLead", "Email", "Filter"
  runsLast7Days: number;
  successRate: number;
  lastModified: string; // ISO Date string
  description?: string; // Optional, for template library
}

const initialWorkflows: Workflow[] = [
  {
    id: "wf1",
    name: "Hot Lead Follow-up Sequence",
    status: "Active",
    apps: ["TerraLead", "Filter", "Email", "Calendar"],
    runsLast7Days: 120,
    successRate: 98,
    lastModified: "2024-07-20T10:00:00Z",
  },
  {
    id: "wf2",
    name: "Client Onboarding Automation",
    status: "Active",
    apps: ["TerraLead", "TerraScribe", "Email"],
    runsLast7Days: 45,
    successRate: 100,
    lastModified: "2024-07-21T15:30:00Z",
  },
  {
    id: "wf3",
    name: "Property Viewing Feedback Loop",
    status: "Inactive",
    apps: ["Calendar", "Email", "Survey"],
    runsLast7Days: 88,
    successRate: 92,
    lastModified: "2024-07-18T09:00:00Z",
  },
  {
    id: "wf4",
    name: "Weekly Market Update Newsletter",
    status: "Active",
    apps: ["MarketIntel", "TerraScribe", "Email"],
    runsLast7Days: 60,
    successRate: 95,
    lastModified: "2024-07-23T11:00:00Z",
  },
   {
    id: "wf5",
    name: "Expired Listing Re-engagement",
    status: "Inactive",
    apps: ["Properties", "Email", "Tasks"],
    runsLast7Days: 15,
    successRate: 85,
    lastModified: "2024-07-15T14:00:00Z",
  },
];

const developerProjects = [
  { id: "devProj1", name: "Greenwood Heights Tower A", progress: 75, status: "On Track", rera: "Verified", envClearance: "Pending" },
  { id: "devProj2", name: "Oceanview Luxury Condos", progress: 40, status: "At Risk", rera: "Pending", envClearance: "Verified" },
  { id: "devProj3", name: "Downtown Commercial Hub", progress: 95, status: "Nearing Completion", rera: "Verified", envClearance: "Verified" },
];

const workflowTemplates = [
    { id: "tpl1", name: "Automated Hot Lead Nurturing", description: "Engage high-scoring leads with a series of targeted emails and tasks.", apps: ["TerraLead", "Email", "Tasks"] },
    { id: "tpl2", name: "New Property Listing Blast", description: "Announce new properties to relevant client segments via multiple channels.", apps: ["Properties", "Email", "SMS", "SocialMedia"] },
    { id: "tpl3", name: "Contract Document Workflow", description: "Automate reminders and follow-ups for contract signing and document collection.", apps: ["Documents", "Email", "Calendar"] },
];

const AppIcon: React.FC<{ appName: string }> = ({ appName }) => {
  const baseStyle = "w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold text-white shadow-sm border border-white/20";
  let iconElement;
  let bgColor = "bg-slate-400";
  let title = appName;

  switch(appName.toLowerCase()) {
    case "terralead": iconElement = <LeadUsersIcon size={14}/>; bgColor="bg-teal-500"; title="TerraLead™"; break;
    case "email": iconElement = <Mail size={14}/>; bgColor="bg-blue-500"; break;
    case "calendar": iconElement = <CalendarDays size={14}/>; bgColor="bg-green-500"; break;
    case "filter": iconElement = <ListFilter size={14}/>; bgColor="bg-orange-500"; break;
    case "properties": iconElement = <PropertyIcon size={14}/>; bgColor="bg-sky-500"; title="Properties"; break;
    case "terrascribe": iconElement = <Edit3 size={14}/>; bgColor="bg-purple-500"; title="TerraScribe™"; break;
    case "marketintel": iconElement = <Briefcase size={14}/>; bgColor="bg-indigo-500"; title="MarketIntel™"; break;
    case "tasks": iconElement = <CheckCircle size={14}/>; bgColor="bg-lime-500"; break;
    case "sms": iconElement = <MessageSquare size={14}/>; bgColor="bg-pink-500"; break;
    case "socialmedia": iconElement = <Share2 size={14}/>; bgColor="bg-rose-500"; title="Social Media"; break;
    case "documents": iconElement = <Database size={14}/>; bgColor="bg-stone-500"; break;
    case "survey": iconElement = <PlayCircle size={14}/>; bgColor="bg-cyan-500"; break; // Placeholder
    default: iconElement = <Zap size={14}/>; bgColor="bg-gray-400";
  }
  return <div className={cn(baseStyle, bgColor)} title={title}>{iconElement}</div>;
};

const WorkflowCard: React.FC<{ workflow: Workflow; onStatusToggle: (id: string) => void; onAction: (action: string, id: string) => void; }> = 
  ({ workflow, onStatusToggle, onAction }) => {
  const statusColor = workflow.status === "Active" ? "bg-green-500" : "bg-slate-400";
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col bg-card border border-border overflow-hidden">
      <div className={cn("w-1.5 h-full shrink-0", statusColor)}></div>
      <div className="flex flex-col flex-grow p-4">
        <CardHeader className="p-0 pb-3">
          <div className="flex justify-between items-start">
            <Link href={`/smartflow/new?id=${workflow.id}`} className="flex-grow"> {/* Placeholder for specific workflow edit */}
              <CardTitle className="font-headline text-md font-semibold text-foreground leading-tight hover:text-primary transition-colors">
                {workflow.name}
              </CardTitle>
            </Link>
            <Switch
              checked={workflow.status === 'Active'}
              onCheckedChange={() => onStatusToggle(workflow.id)}
              aria-label={`Toggle workflow ${workflow.name}`}
              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted ml-2 shrink-0"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-grow space-y-3 mb-3">
          <div className="flex items-center space-x-1.5">
            {workflow.apps.slice(0, 5).map((app, index) => <AppIcon key={`${workflow.id}-${app}-${index}`} appName={app} />)}
            {workflow.apps.length > 5 && <span className="text-xs text-muted-foreground ml-1">+{workflow.apps.length - 5} more</span>}
          </div>
          <div className="text-xs text-muted-foreground space-y-0.5 pt-2 border-t border-border">
            <p>Runs (7d): <span className="font-semibold text-foreground">{workflow.runsLast7Days}</span></p>
            <p>Success: <span className="font-semibold text-foreground">{workflow.successRate}%</span></p>
            <p>Modified: <span className="font-semibold text-foreground">{new Date(workflow.lastModified).toLocaleDateString()}</span></p>
          </div>
        </CardContent>
        <CardFooter className="p-0 pt-3 border-t border-border">
          <div className="flex justify-end gap-1 w-full">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-primary h-7 w-7 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => onAction("Run History", workflow.id)}>Run History</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAction("Rename", workflow.id)}>Rename</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAction("Duplicate", workflow.id)}>Duplicate</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onAction("Delete", workflow.id)} className="text-destructive focus:text-destructive focus:bg-destructive/10">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};


export default function SmartflowStudioPage() {
  const { toast } = useToast();
  const [workflows, setWorkflows] = React.useState<Workflow[]>(initialWorkflows);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<"All" | "Active" | "Inactive">("All");
  const [sortOrder, setSortOrder] = React.useState<"Last Modified" | "Name (A-Z)" | "Most Runs">("Last Modified");

  const toggleWorkflowStatus = (id: string) => {
    setWorkflows(currentWorkflows =>
      currentWorkflows.map(wf =>
        wf.id === id ? { ...wf, status: wf.status === "Active" ? "Inactive" : "Active" } : wf
      )
    );
    const toggledWf = workflows.find(wf => wf.id === id);
    if (toggledWf) {
        toast({
            title: `Workflow ${toggledWf.status === "Active" ? "Deactivated" : "Activated"}`,
            description: `"${toggledWf.name}" is now ${toggledWf.status === "Active" ? "Inactive" : "Active"}.`
        });
    }
  };
  
  const handleWorkflowAction = (action: string, id: string) => {
    const wf = workflows.find(w => w.id === id);
    toast({ title: `${action} Clicked`, description: `Action for workflow: ${wf?.name || id}`});
  };

  const filteredAndSortedWorkflows = React.useMemo(() => {
    let filtered = workflows;
    if (searchTerm) {
      filtered = filtered.filter(wf => wf.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (statusFilter !== "All") {
      filtered = filtered.filter(wf => wf.status === statusFilter);
    }
    // Sorting logic
    if (sortOrder === "Name (A-Z)") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "Most Runs") {
      filtered.sort((a, b) => b.runsLast7Days - a.runsLast7Days);
    } else { // Default to Last Modified
      filtered.sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());
    }
    return filtered;
  }, [workflows, searchTerm, statusFilter, sortOrder]);

  return (
    <div className="container mx-auto">
      <PageHeader title="SmartFlow™ Automation Studio">
        <Link href="/smartflow/new">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                 <PlusCircle className="mr-2 h-4 w-4" /> Create New Workflow
            </Button>
        </Link>
      </PageHeader>

      <Tabs defaultValue="my-workflows" className="w-full">
        <TabsList className="border-b-0 justify-start mb-6 bg-transparent p-0">
          <TabsTrigger value="my-workflows" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none px-4 pb-2 text-muted-foreground hover:text-primary">My Workflows</TabsTrigger>
          <TabsTrigger value="project-dashboard" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none px-4 pb-2 text-muted-foreground hover:text-primary">Project Dashboard</TabsTrigger>
          <TabsTrigger value="template-library" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none px-4 pb-2 text-muted-foreground hover:text-primary">Template Library</TabsTrigger>
        </TabsList>

        <TabsContent value="my-workflows">
          {/* Filtering and Organization Toolbar */}
          <div className="mb-6 p-4 bg-card border border-border rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="relative flex-grow sm:max-w-xs">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search workflows by name..." 
                className="pl-8 h-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 text-muted-foreground hover:text-primary">
                    Status: {statusFilter} <ChevronDown className="ml-1.5 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {["All", "Active", "Inactive"].map(status => (
                    <DropdownMenuCheckboxItem 
                      key={status} 
                      checked={statusFilter === status}
                      onCheckedChange={() => setStatusFilter(status as "All" | "Active" | "Inactive")}
                    >
                      {status}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 text-muted-foreground hover:text-primary">
                    Sort: {sortOrder} <ChevronDown className="ml-1.5 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {["Last Modified", "Name (A-Z)", "Most Runs"].map(sort => (
                    <DropdownMenuCheckboxItem 
                      key={sort} 
                      checked={sortOrder === sort}
                      onCheckedChange={() => setSortOrder(sort as "Last Modified" | "Name (A-Z)" | "Most Runs")}
                    >
                      {sort}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
            
          {filteredAndSortedWorkflows.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredAndSortedWorkflows.map(flow => (
                <WorkflowCard 
                    key={flow.id} 
                    workflow={flow} 
                    onStatusToggle={toggleWorkflowStatus}
                    onAction={handleWorkflowAction}
                />
              ))}
            </div>
          ) : (
             <div className="text-center py-12 bg-card border border-border rounded-lg shadow-sm">
                <Zap className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-1">
                    {searchTerm || statusFilter !== "All" ? "No workflows match your criteria." : "You haven't created any workflows yet."}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                    {searchTerm || statusFilter !== "All" ? "Try adjusting your search or filters." : "Get started by automating your first task!"}
                </p>
                <Link href="/smartflow/new">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        <PlusCircle className="mr-2 h-4 w-4" /> Create New Workflow
                    </Button>
                </Link>
            </div>
          )}
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
                                {template.apps.map(app => <AppIcon key={`${template.id}-${app}`} appName={app} />)}
                            </div>
                        </CardContent>
                        <CardFooter>
                             <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Use Template</Button>
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

