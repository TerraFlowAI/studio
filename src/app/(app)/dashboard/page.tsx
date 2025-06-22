
"use client";

import { useAuth } from "@/app/context/AuthContext";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { ActionableBanner, type BannerItem } from "@/components/dashboard/ActionableBanner";
import { SalesStatisticsCard } from "@/components/dashboard/SalesStatisticsCard";
import { AiAssistantCard } from "@/components/dashboard/AiAssistantCard";
import { useRouter } from "next/navigation";

import {
  FileSignature,
  TrendingUp,
  DollarSign,
  Briefcase,
  Users,
  PlusCircle,
} from "lucide-react";


// Mock Data for the dashboard based on the screenshot
const kpiData = [
  { title: "Active Leads", value: "87", icon: Users, trend: "+12 from last week", trendDirection: "up" as const },
  { title: "Properties Sold", value: "4", icon: Briefcase, trend: "-1 this month", trendDirection: "down" as const },
  { title: "Total Revenue", value: "₹1.8 Cr", icon: DollarSign, trend: "+8.5% this quarter", trendDirection: "up" as const },
  { title: "Avg. Deal Time", value: "32 Days", icon: TrendingUp, trend: "-3 days from last Q", trendDirection: "down" as const },
];

const salesChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    { data: [300000, 450000, 600000, 500000, 750000, 900000], color: "hsl(var(--primary))", name: "Total Sales" },
  ],
};


export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  // A single, static banner item as shown in the screenshot
  const bannerItems: BannerItem[] = [
    {
      id: "secure-docs",
      icon: FileSignature,
      headline: "Secure Your Documents",
      subHeadline: "Verify legal documents and contracts with TerraSecure™.",
      buttonText: "Verify Document",
      onClick: () => router.push('/documents'),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome, ${user?.displayName?.split(' ')[0] || 'User'}!`}
        description="Here’s your business overview for today."
      >
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <a href="/properties/new">
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Property
            </a>
        </Button>
      </PageHeader>
      
      <ActionableBanner items={bannerItems} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <KpiCard
            key={kpi.title}
            title={kpi.title}
            value={kpi.value}
            icon={kpi.icon}
            trend={kpi.trend}
            trendDirection={kpi.trendDirection}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesStatisticsCard 
            chartData={salesChartData}
            totalSales="₹4.2 Cr"
            totalProfit="₹1.1 Cr"
            totalCost="₹3.1 Cr"
          />
        </div>

        <div className="lg:col-span-1">
          <AiAssistantCard />
        </div>
      </div>
    </div>
  );
}
