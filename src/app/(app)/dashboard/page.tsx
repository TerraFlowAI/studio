
"use client";

import { useAuth } from "@/app/context/AuthContext";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { GrowthStatisticsCard } from "@/components/dashboard/GrowthStatisticsCard";
import { AiAssistantCard } from "@/components/dashboard/AiAssistantCard";
import { AiCoPilots } from "@/components/dashboard/AiCoPilots";
import { ListingBoard } from "@/components/dashboard/ListingBoard";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusCircle, Users, Briefcase, DollarSign, TrendingUp, FileSignature, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from 'next/dynamic';
import type { Property } from "@/hooks/useDashboardData";


const SalesStatisticsCard = dynamic(
  () => import('@/components/dashboard/SalesStatisticsCard').then(mod => mod.SalesStatisticsCard),
  { 
    ssr: false,
    loading: () => <Skeleton className="h-[450px] w-full" />
  }
);


const SecureDocumentsBanner = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    <Card className="bg-green-600 text-white shadow-lg border-none overflow-hidden">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-full">
            <FileSignature className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold font-headline text-lg">Secure Your Documents</h3>
            <p className="text-sm text-white/90">Verify legal documents and contracts with TerraSecure™.</p>
          </div>
        </div>
        <Button asChild variant="secondary" className="bg-white hover:bg-slate-100 text-green-700 font-semibold shrink-0">
          <Link href="/documents">
            Verify Document <ArrowRight className="ml-2 h-4 w-4 hidden sm:inline-block" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  </motion.div>
);


const DashboardSkeleton = () => (
  <div className="space-y-8">
    <div className="flex justify-between items-center">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-80" />
      </div>
      <Skeleton className="h-10 w-40" />
    </div>

    <Skeleton className="h-24 w-full" /> 

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
        </div>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Skeleton className="lg:col-span-2 h-[450px]" />
        <Skeleton className="lg:col-span-1 h-[450px]" />
    </div>
  </div>
);


export default function DashboardPage() {
  const { user } = useAuth();
  
  // Mock data to replace the removed useDashboardData hook
  const loading = false;
  const kpiData = {
    activeLeads: 74,
    propertiesSold: 12,
    totalRevenue: "₹2.1 Cr",
    avgDealTime: 54,
  };
  const salesStats = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        name: "Sales",
        data: [1200000, 1800000, 1500000, 2100000, 1900000, 2400000],
        color: "hsl(var(--primary))",
      },
       {
        name: "Profit",
        data: [400000, 550000, 450000, 700000, 600000, 800000],
        color: "hsl(var(--chart-2))",
      },
    ],
  };
  const aiMessage =
    "I've identified 3 new leads that match the profile for the 'Sea View Penthouse' listing. It would be a good idea to reach out to them today.";
  const recentProperties: Property[] = [
    {
      id: "prop1",
      title: "Luxury Beachfront Villa",
      locality: "Juhu, Mumbai",
      price: "₹5.2 Cr",
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwaW50ZXJpb3J8ZW58MHx8fHwxNzUwOTg5ODY0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      aiHint: "luxury villa",
    },
    {
      id: "prop2",
      title: "Modern 3BHK Apartment",
      locality: "Koregaon Park, Pune",
      price: "₹1.8 Cr",
      imageUrl: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxsaXZpbmclMjByb29tJTIwaW50ZXJpb3J8ZW58MHx8fHwxNzUwOTg5ODQyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      aiHint: "modern apartment",
    },
    {
      id: "prop3",
      title: "Spacious Garden Flat",
      locality: "Indiranagar, Bangalore",
      price: "₹2.5 Cr",
      imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxleHRlcmlvciUyMGhvdXNlfGVufDB8fHx8MTc1MDk4OTkzNHww&ixlib=rb-4.1.0&q=80&w=1080",
      aiHint: "house exterior",
    },
  ];
  const growthStats = {
    totalSales: "₹12.5 Cr",
    totalProfit: "₹2.8 Cr",
    totalCost: "₹9.7 Cr",
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  const kpiCards = [
      { title: "Active Leads", value: kpiData.activeLeads.toString(), icon: Users, trend: "+12 from last week", trendDirection: "up" as const },
      { title: "Properties Sold (Q)", value: kpiData.propertiesSold.toString(), icon: Briefcase, trend: "-1 this month", trendDirection: "down" as const },
      { title: "Total Revenue (Q)", value: kpiData.totalRevenue, icon: DollarSign, trend: "+8.5% this quarter", trendDirection: "up" as const },
      { title: "Avg. Deal Time", value: `${kpiData.avgDealTime} Days`, icon: TrendingUp, trend: "-3 days from last Q", trendDirection: "down" as const },
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

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
      
      <SecureDocumentsBanner />

      <motion.div 
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1, delay: 0.1 }}
      >
        {kpiCards.map((kpi) => (
          <motion.div key={kpi.title} variants={sectionVariants}>
            <KpiCard
              title={kpi.title}
              value={kpi.value}
              icon={kpi.icon}
              trend={kpi.trend}
              trendDirection={kpi.trendDirection}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        <div className="lg:col-span-2">
          <SalesStatisticsCard chartData={salesStats} />
        </div>
        <div className="lg:col-span-1">
          <GrowthStatisticsCard 
            totalSales={growthStats.totalSales}
            totalProfit={growthStats.totalProfit}
            totalCost={growthStats.totalCost}
          />
        </div>
      </motion.div>
      
      <motion.div variants={sectionVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
        <AiCoPilots />
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
      >
        <div className="lg:col-span-2">
            <ListingBoard properties={recentProperties} />
        </div>
        <div className="lg:col-span-1">
            <AiAssistantCard message={aiMessage} />
        </div>
      </motion.div>

    </div>
  );
}
