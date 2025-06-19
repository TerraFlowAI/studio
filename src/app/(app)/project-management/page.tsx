import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Briefcase, PlusCircle, ListChecks, Users, FileText, AlertTriangle } from "lucide-react";
import Link from "next/link";

const projectsData = [
  { id: "proj1", name: "Greenwood Heights Development", status: "In Progress", progress: 65, deadline: "2024-12-31", teamSize: 12, issues: 2 },
  { id: "proj2", name: "Oceanview Condos Phase II", status: "Planning", progress: 15, deadline: "2025-06-30", teamSize: 8, issues: 0 },
  { id: "proj3", name: "Downtown Office Renovation", status: "Completed", progress: 100, deadline: "2024-05-01", teamSize: 10, issues: 0 },
  { id: "proj4", name: "Riverside Apartments", status: "On Hold", progress: 40, deadline: "2025-03-15", teamSize: 5, issues: 5 },
];

export default function ProjectManagementPage() {
  return (
    <div className="container mx-auto">
      <PageHeader 
        title="Project Management Automation" 
        description="AI tools for tracking project milestones, resource allocation, and compliance."
      >
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/project-management/new"><PlusCircle className="mr-2 h-4 w-4" /> Start New Project</Link>
        </Button>
      </PageHeader>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
            <Briefcase className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Currently in progress or planning.</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tasks Overdue</CardTitle>
            <ListChecks className="h-5 w-5 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Require immediate attention.</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Resource Allocation</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">Overall team capacity utilized.</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Compliance Status</CardTitle>
            <FileText className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-muted-foreground">Documents and permits up-to-date.</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Project Overview</CardTitle>
          <CardDescription>Manage and track all your development projects.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead className="hidden md:table-cell">Deadline</TableHead>
                <TableHead className="hidden lg:table-cell">Team Size</TableHead>
                <TableHead className="hidden lg:table-cell">Open Issues</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectsData.map((project) => (
                <TableRow key={project.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={project.status === "Completed" ? "default" : project.status === "In Progress" ? "secondary" : "outline"}
                      className={
                        project.status === "Completed" ? "bg-green-100 text-green-700" :
                        project.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                        project.status === "Planning" ? "bg-purple-100 text-purple-700" :
                        "bg-yellow-100 text-yellow-700"
                      }
                    >
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={project.progress} aria-label={`${project.progress}% complete`} className="w-24 h-2" />
                      <span className="text-xs text-muted-foreground">{project.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{project.deadline}</TableCell>
                  <TableCell className="hidden lg:table-cell">{project.teamSize}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {project.issues > 0 ? (
                      <Badge variant="destructive" className="flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" /> {project.issues}
                      </Badge>
                    ) : (
                      <span className="text-green-600">0</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
       <Card className="mt-8 shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">AI-Powered Project Assistance</CardTitle>
          <CardDescription>Let AI help you manage projects more efficiently.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
           <p className="text-sm"><strong className="text-primary">Automated Milestone Tracking:</strong> AI monitors progress and alerts on potential delays.</p>
           <p className="text-sm"><strong className="text-primary">Smart Resource Allocation:</strong> Get suggestions for optimal team member assignments based on skills and availability.</p>
           <p className="text-sm"><strong className="text-primary">Risk Prediction:</strong> AI identifies potential risks (e.g., budget overruns, compliance issues) before they escalate.</p>
           <Button variant="link" className="p-0 h-auto text-primary">Explore AI Features</Button>
        </CardContent>
      </Card>
    </div>
  );
}
