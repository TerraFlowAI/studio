
"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Save, Play, Settings2, PlusCircle, Zap, Mail, CalendarCheck, Database, Filter, GitFork, Clock, MessageSquare, Users, BarChart3, Briefcase, PenSquare } from "lucide-react";
import { cn } from "@/lib/utils";

// Placeholder components for the builder UI
const WorkflowBuilderHeader: React.FC<{ workflowName: string; onWorkflowNameChange: (name: string) => void; isWorkflowActive: boolean; onWorkflowToggle: (active: boolean) => void; }> = 
  ({ workflowName, onWorkflowNameChange, isWorkflowActive, onWorkflowToggle }) => (
  <div className="flex items-center justify-between p-3 border-b bg-card sticky top-0 z-10 h-16">
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" asChild>
        <Link href="/smartflow">
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Back to Workflows</span>
        </Link>
      </Button>
      <Input 
        value={workflowName} 
        onChange={(e) => onWorkflowNameChange(e.target.value)} 
        placeholder="Untitled Workflow"
        className="text-lg font-semibold border-none focus-visible:ring-0 focus-visible:ring-offset-0 w-auto min-w-[200px] max-w-md"
      />
    </div>
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm"><Play className="mr-2 h-4 w-4" /> Test</Button>
      <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground"><Save className="mr-2 h-4 w-4" /> Save</Button>
      <Switch checked={isWorkflowActive} onCheckedChange={onWorkflowToggle} aria-label="Activate Workflow" />
    </div>
  </div>
);

const NodePalette: React.FC = () => {
  const triggerNodes = [
    { name: "New Lead Created", icon: Users, app: "TerraLead™" },
    { name: "Property Status Updated", icon: Briefcase, app: "Properties" },
    { name: "Scheduled Time", icon: Clock, app: "System" },
    { name: "Incoming Webhook", icon: Zap, app: "System" },
  ];
  const actionNodes = [
    { name: "Send Email", icon: Mail, app: "System" },
    { name: "Create Task", icon: CalendarCheck, app: "System" },
    { name: "Update CRM Record", icon: Database, app: "TerraLead™" },
    { name: "Generate Document", icon: PenSquare, app: "TerraScribe™" },
    { name: "Get Market Report", icon: BarChart3, app: "MarketIntel™" },
    { name: "Add Delay", icon: Clock, app: "System" },
    { name: "Filter Data", icon: Filter, app: "System" },
    { name: "Router (Branch)", icon: GitFork, app: "System" },
    { name: "Send SMS", icon: MessageSquare, app: "System" },
  ];

  const NodeItem: React.FC<{name: string, icon: React.ElementType, app: string}> = ({ name, icon: Icon, app }) => (
    <div className="p-2.5 border border-border rounded-md hover:bg-accent hover:shadow-md cursor-grab transition-all bg-card">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-primary" />
        <span className="text-sm font-medium text-foreground">{name}</span>
      </div>
      <p className="text-xs text-muted-foreground mt-0.5 ml-7">{app}</p>
    </div>
  );

  return (
    <Card className="w-64 lg:w-72 h-full flex flex-col shadow-md border-r">
      <CardHeader className="pb-2 pt-3 px-3 border-b">
        <CardTitle className="text-base font-semibold text-primary">Add Triggers & Actions</CardTitle>
      </CardHeader>
      <ScrollArea className="flex-grow">
        <CardContent className="p-3 space-y-3">
          <div>
            <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1.5 px-1">Triggers</h4>
            <div className="space-y-1.5">
              {triggerNodes.map(node => <NodeItem key={node.name} {...node} />)}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1.5 px-1">Actions</h4>
            <div className="space-y-1.5">
              {actionNodes.map(node => <NodeItem key={node.name} {...node} />)}
            </div>
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

const WorkflowCanvasPlaceholder: React.FC = () => (
  <div className="flex-1 bg-background p-8 relative overflow-hidden">
    {/* Grid background */}
    <svg width="100%" height="100%" className="absolute inset-0 opacity-50">
      <defs>
        <pattern id="dot-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="hsl(var(--border))" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dot-grid)" />
    </svg>
    
    {/* Placeholder flow representation */}
    <div className="relative z-10 flex flex-col items-center justify-center h-full text-muted-foreground">
      <div className="space-y-8 flex flex-col items-center">
        {/* Trigger Node */}
        <div className="flex items-center p-4 bg-card border border-primary rounded-lg shadow-lg w-64">
          <Zap className="h-6 w-6 text-primary mr-3" />
          <div>
            <p className="font-semibold text-foreground">New Lead Created</p>
            <p className="text-xs text-muted-foreground">TerraLead™</p>
          </div>
        </div>
        
        <div className="h-10 w-px bg-border"></div> {/* Connector line */}
        
        {/* Action Node */}
        <div className="flex items-center p-4 bg-card border border-border rounded-lg shadow-md w-64">
          <Mail className="h-6 w-6 text-blue-500 mr-3" />
          <div>
            <p className="font-semibold text-foreground">Send Welcome Email</p>
            <p className="text-xs text-muted-foreground">System</p>
          </div>
        </div>
        
         <div className="h-10 w-px bg-border"></div> {/* Connector line */}

        {/* Condition/Filter Node (example) */}
        <div className="flex items-center p-4 bg-card border border-border rounded-lg shadow-md w-64">
          <Filter className="h-6 w-6 text-orange-500 mr-3" />
          <div>
            <p className="font-semibold text-foreground">Filter: Hot Lead?</p>
            <p className="text-xs text-muted-foreground">System</p>
          </div>
        </div>
      </div>
       <p className="mt-12 text-center text-sm">Drag nodes from the left panel to build your workflow. <br />Click a node to configure it.</p>
    </div>
  </div>
);


const NodeConfigurationPanelPlaceholder: React.FC<{ selectedNodeName?: string }> = ({ selectedNodeName }) => (
  <Card className="w-72 lg:w-80 h-full flex flex-col shadow-md border-l">
    <CardHeader className="pb-2 pt-3 px-3 border-b">
      <CardTitle className="text-base font-semibold text-primary">
        {selectedNodeName ? `Configure: ${selectedNodeName}` : "Node Settings"}
      </CardTitle>
    </CardHeader>
    <ScrollArea className="flex-grow">
      <CardContent className="p-4">
        {!selectedNodeName && (
          <div className="text-center text-muted-foreground py-10">
            <Settings2 className="h-10 w-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm">Select a node on the canvas to configure its properties here.</p>
          </div>
        )}
        {selectedNodeName && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Configuration options for <span className="font-semibold text-foreground">{selectedNodeName}</span> will appear here.</p>
            {/* Example: if selectedNodeName === 'Send Email' */}
            {selectedNodeName === 'Send Email' && (
              <div className="space-y-3">
                <div><label className="text-xs font-medium">To:</label><Input defaultValue="{{lead.email}}" /></div>
                <div><label className="text-xs font-medium">Subject:</label><Input defaultValue="Welcome to TerraFlow!" /></div>
                <div><label className="text-xs font-medium">Body:</label><Textarea rows={5} defaultValue="Hi {{lead.name}},\n\nWelcome aboard..." /></div>
              </div>
            )}
            <Button variant="outline" className="w-full">Save Node Settings</Button>
          </div>
        )}
      </CardContent>
    </ScrollArea>
  </Card>
);


export default function NewWorkflowPage() {
  const [workflowName, setWorkflowName] = React.useState("My New Automation");
  const [isWorkflowActive, setIsWorkflowActive] = React.useState(false);
  const [selectedNodeForConfig, setSelectedNodeForConfig] = React.useState<string | undefined>(undefined); // Example state

  // In a real app, clicking a node on canvas would set selectedNodeForConfig

  return (
    <div className="flex flex-col h-screen bg-muted overflow-hidden">
      <WorkflowBuilderHeader 
        workflowName={workflowName} 
        onWorkflowNameChange={setWorkflowName}
        isWorkflowActive={isWorkflowActive}
        onWorkflowToggle={setIsWorkflowActive}
      />
      <div className="flex flex-1 overflow-hidden">
        <NodePalette />
        <WorkflowCanvasPlaceholder />
        <NodeConfigurationPanelPlaceholder selectedNodeName={selectedNodeForConfig || "Send Email"} /> 
        {/* Passing a default to show some config example */}
      </div>
    </div>
  );
}
