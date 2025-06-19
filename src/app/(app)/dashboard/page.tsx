import { PageHeader } from "@/components/shared/PageHeader";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, BarChart, DollarSign, Users, Zap, Lightbulb, FileSignature, Calculator } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { TerraLeadChatbot } from '@/components/chatbot/TerraLeadChatbot';


export default function DashboardPage() {
  const kpiData = [
    { title: "Total Leads", value: "1,250", icon: Users, trend: "+15% this month", trendDirection: "up" as "up" | "down", description: "Active leads in the pipeline" },
    { title: "Properties Sold", value: "78", icon: DollarSign, trend: "+5 units this month", trendDirection: "up" as "up" | "down", description: "Successful transactions" },
    { title: "Market Activity", value: "High", icon: Activity, trend: "Stable", description: "Current market engagement level" },
    { title: "Avg. Valuation Accuracy", value: "92%", icon: BarChart, trend: "-1% from last qtr", trendDirection: "down" as "up" | "down", description: "AI valuation performance" },
  ];

  const quickAccessLinks = [
    { href: "/terrascribe", label: "Generate Description", icon: FileSignature, description: "Create compelling property listings with AI." },
    { href: "/terravaluate", label: "Run CMA Report", icon: Calculator, description: "Get an AI-powered market analysis." },
    { href: "/clients/new", label: "Add New Client", icon: Users, description: "Expand your client database." },
    { href: "/smartflow/new", label: "Create Automation", icon: Zap, description: "Streamline your repetitive tasks." },
  ];

  return (
    <div className="container mx-auto">
      <PageHeader title="Dashboard" description="Welcome to TerraFlowAI. Here's an overview of your activities." />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {kpiData.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Quick Access Tools</CardTitle>
            <CardDescription>Jumpstart your tasks with these popular tools.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {quickAccessLinks.map(link => (
              <Link href={link.href} key={link.href} className="block group">
                <Card className="h-full hover:shadow-md transition-shadow bg-card hover:border-primary">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <link.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                    <div>
                      <CardTitle className="text-md font-semibold">{link.label}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">{link.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center">
              <Lightbulb className="mr-2 h-6 w-6 text-accent" />
              TerraLead AI
            </CardTitle>
            <CardDescription>Engage with potential leads instantly.</CardDescription>
          </CardHeader>
          <CardContent>
            <TerraLeadChatbot />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8 shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Recent Activity</CardTitle>
          <CardDescription>Overview of your latest actions and system updates.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {user: "AI Bot", action: "Generated new property description for 'Sunnyvale Villa'", time: "2m ago"},
              {user: "You", action: "Added new client: Jane Doe", time: "1h ago"},
              {user: "System", action: "Market trend update: Local prices increased by 0.5%", time: "3h ago"},
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-md hover:bg-muted/50 transition-colors">
                <Image src={`https://placehold.co/40x40.png`} alt="User avatar" width={40} height={40} className="rounded-full" data-ai-hint="avatar person" />
                <div>
                  <p className="text-sm font-medium">{activity.user} <span className="text-muted-foreground font-normal">{activity.action}</span></p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="link" className="mt-4 text-primary">View all activity</Button>
        </CardContent>
      </Card>
    </div>
  );
}
