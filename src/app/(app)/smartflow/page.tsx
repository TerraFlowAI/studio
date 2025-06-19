import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Zap, PlayCircle, Edit3, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const sampleWorkflows = [
  { id: "wf1", name: "New Lead Welcome Email", description: "Automatically sends a welcome email to new leads.", status: "Active", triggers: 120, lastRun: "2024-07-22 10:00 AM" },
  { id: "wf2", name: "Client Follow-up Reminder", description: "Reminds to follow up with clients after 7 days of no contact.", status: "Active", triggers: 45, lastRun: "2024-07-21 03:30 PM" },
  { id: "wf3", name: "Property Viewing Confirmation", description: "Sends confirmation and details for scheduled property viewings.", status: "Paused", triggers: 88, lastRun: "2024-07-20 09:00 AM" },
];

export default function SmartflowPage() {
  return (
    <div className="container mx-auto">
      <PageHeader title="SmartFlow Automation" description="Automate your workflows and save time.">
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/smartflow/new"><PlusCircle className="mr-2 h-4 w-4" /> Create New Workflow</Link>
        </Button>
      </PageHeader>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sampleWorkflows.map(flow => (
          <Card key={flow.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <Zap className="h-8 w-8 text-primary mb-2" />
                <span className={`px-2 py-1 text-xs rounded-full ${flow.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {flow.status}
                </span>
              </div>
              <CardTitle className="font-headline text-lg">{flow.name}</CardTitle>
              <CardDescription className="text-xs h-10 overflow-hidden">{flow.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Triggers: <span className="font-semibold text-foreground">{flow.triggers}</span></p>
                <p>Last Run: <span className="font-semibold text-foreground">{flow.lastRun}</span></p>
              </div>
            </CardContent>
            <CardContent className="border-t pt-4">
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary"><Eye className="mr-1 h-4 w-4" /> View</Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary"><Edit3 className="mr-1 h-4 w-4" /> Edit</Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive"><Trash2 className="mr-1 h-4 w-4" /> Delete</Button>
                 <Button variant="outline" size="sm" className="text-primary border-primary hover:bg-primary/10">
                  {flow.status === 'Active' ? <PlayCircle className="mr-1 h-4 w-4" /> : <PlayCircle className="mr-1 h-4 w-4" />}
                  {flow.status === 'Active' ? 'Pause' : 'Activate'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Workflow Ideas</CardTitle>
          <CardDescription>Get inspired with these common automation examples.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50">
            <Image src="https://placehold.co/60x60.png" alt="Workflow Idea" width={60} height={60} className="rounded-md" data-ai-hint="automation process" />
            <div>
              <h4 className="font-semibold">Automated Property Matching</h4>
              <p className="text-sm text-muted-foreground">Notify clients when new properties match their saved criteria.</p>
            </div>
          </div>
           <div className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50">
            <Image src="https://placehold.co/60x60.png" alt="Workflow Idea" width={60} height={60} className="rounded-md" data-ai-hint="document flow" />
            <div>
              <h4 className="font-semibold">Document Collection Reminders</h4>
              <p className="text-sm text-muted-foreground">Automatically remind clients about pending document submissions.</p>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
