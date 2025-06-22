
"use client";

import { useAuth } from "@/app/context/AuthContext";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { ActionableBanner, type BannerItem } from "@/components/dashboard/ActionableBanner";
import { SalesStatisticsCard } from "@/components/dashboard/SalesStatisticsCard";
import { GrowthStatisticsCard } from "@/components/dashboard/GrowthStatisticsCard";
import { AiAssistantCard } from "@/components/dashboard/AiAssistantCard";
import { TerraLeadChatbot } from "@/components/chatbot/TerraLeadChatbot";
import { ListingCard } from "@/components/dashboard/ListingCard";
import { useRouter } from "next/navigation";

import {
  Lightbulb,
  Zap,
  FileSignature,
  TrendingUp,
  DollarSign,
  Briefcase,
  Users,
  PlusCircle,
} from "lucide-react";


// Mock Data for the dashboard
const kpiData = [
  { title: "Active Leads", value: "87", icon: Users, trend: "+12 from last week", trendDirection: "up" as const },
  { title: "Properties Sold", value: "4", icon: Briefcase, trend: "+1 this month", trendDirection: "up" as const },
  { title: "Total Revenue", value: "₹1.8 Cr", icon: DollarSign, trend: "+8.5% this quarter", trendDirection: "up" as const },
  { title: "Avg. Deal Time", value: "32 Days", icon: TrendingUp, trend: "-3 days from last Q", trendDirection: "down" as const },
];

const salesChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    { data: [300000, 450000, 600000, 500000, 750000, 900000], color: "hsl(var(--primary))", name: "Total Sales" },
  ],
};

const growthChartData = {
  labels: ["Q1", "Q2", "Q3", "Q4"],
  residential: [1200, 1500, 1800, 2200],
  commercial: [800, 900, 1100, 1300],
};

const recentListings = [
    { title: "Modern Downtown Apartment", location: "Lower Parel, Mumbai", price: "₹3.8 Cr", specs: "3 Beds, 3 Baths, 1800 sqft", imageUrl: "https://placehold.co/600x400.png", aiHint: "modern apartment city" },
    { title: "Luxury Seafront Villa", location: "Juhu, Mumbai", price: "₹12.5 Cr", specs: "5 Beds, 6 Baths, 5500 sqft", imageUrl: "https://images.unsplash.com/photo-1740497708249-555d807a157a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxOHx8THV4dXJ5JTIwU2VhZnJvbnQlMjBWaWxsYXxlbnwwfHx8fDE3NTA0Mjk1ODh8MA&ixlib=rb-4.1.0&q=80&w=1080", aiHint: "luxury villa sea" },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  const bannerItems: BannerItem[] = [
    {
      id: "scribe-intro",
      icon: Lightbulb,
      headline: "Try TerraScribe™ AI!",
      subHeadline: "Instantly generate compelling property descriptions and headlines.",
      buttonText: "Generate Now",
      onClick: () => router.push('/scribe'),
    },
    {
      id: "smartflow-intro",
      icon: Zap,
      headline: "Automate Your Workflow",
      subHeadline: "Use SmartFlow™ to automate lead follow-ups and client onboarding.",
      buttonText: "Create Flow",
      onClick: () => router.push('/smartflow'),
    },
     {
      id: "docs-intro",
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
            <a href="/properties/new"> {/* Using <a> for simple navigation */}
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Property
            </a>
        </Button>
      </PageHeader>
      
      {/* Actionable Banner */}
      <ActionableBanner items={bannerItems} />

      {/* KPI Cards */}
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

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Main Stats & Listings) */}
        <div className="lg:col-span-2 space-y-6">
          <SalesStatisticsCard 
            chartData={salesChartData}
            totalSales="₹4.2 Cr"
            totalProfit="₹1.1 Cr"
            totalCost="₹3.1 Cr"
          />
          <GrowthStatisticsCard 
            totalRevenue="₹22.5 Cr"
            chartData={growthChartData}
          />
        </div>

        {/* Right Column (AI Assistant & Chat) */}
        <div className="lg:col-span-1 space-y-6">
          <AiAssistantCard />
          <TerraLeadChatbot />
        </div>
      </div>

       {/* Recent Listings Section */}
      <div>
        <h2 className="text-2xl font-bold font-headline text-primary mb-4">Recent Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentListings.map((listing, index) => (
                <ListingCard key={index} {...listing} />
            ))}
        </div>
      </div>

    </div>
  );
}
