
"use client";

import { useAuth } from "@/app/context/AuthContext";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { SalesStatisticsCard } from "@/components/dashboard/SalesStatisticsCard";
import { AiAssistantCard } from "@/components/dashboard/AiAssistantCard";
import { AiCoPilots } from "@/components/dashboard/AiCoPilots";
import { ListingBoard } from "@/components/dashboard/ListingBoard";
import { useDashboardData } from "@/hooks/useDashboardData";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusCircle, Users, Briefcase, DollarSign, TrendingUp } from "lucide-react";
import Link from "next/link";


const DashboardSkeleton = () => (
  <div className="space-y-8">
    <div className="flex justify-between items-center">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-80" />
      </div>
      <Skeleton className="h-10 w-40" />
    </div>

    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-28 w-full" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Skeleton className="lg:col-span-2 h-[450px]" />
      <Skeleton className="lg:col-span-1 h-[450px]" />
    </div>

    <div>
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
        </div>
    </div>
    
    <div>
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
        </div>
    </div>
  </div>
);


export default function DashboardPage() {
  const { user } = useAuth();
  const { loading, kpiData, salesStats, aiMessage, recentProperties } = useDashboardData();

  if (loading) {
    return <DashboardSkeleton />;
  }

  const kpiCards = [
      { title: "Active Leads", value: kpiData.activeLeads.toString(), icon: Users, trend: "+12 from last week", trendDirection: "up" as const },
      { title: "Properties Sold (Q)", value: kpiData.propertiesSold.toString(), icon: Briefcase, trend: "-1 this month", trendDirection: "down" as const },
      { title: "Total Revenue (Q)", value: kpiData.totalRevenue, icon: DollarSign, trend: "+8.5% this quarter", trendDirection: "up" as const },
      { title: "Avg. Deal Time", value: `${kpiData.avgDealTime} Days`, icon: TrendingUp, trend: "-3 days from last Q", trendDirection: "down" as const },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome, ${user?.displayName?.split(' ')[0] || 'User'}!`}
        description="Here’s your business overview for today."
      >
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/properties/new">
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Property
            </Link>
        </Button>
      </PageHeader>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((kpi) => (
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
            chartData={salesStats}
            // These totals should ideally come from the hook as well
            totalSales="₹4.2 Cr" 
            totalProfit="₹1.1 Cr"
            totalCost="₹3.1 Cr"
          />
        </div>

        <div className="lg:col-span-1">
          <AiAssistantCard message={aiMessage} />
        </div>
      </div>
      
      <AiCoPilots />

      <ListingBoard properties={recentProperties} />

    </div>
  );
}
