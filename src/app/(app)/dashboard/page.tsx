
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
import { useDashboardData } from "@/hooks/useDashboardData";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusCircle, Users, Briefcase, DollarSign, TrendingUp, FileSignature, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from 'next/dynamic';

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
  const { loading, kpiData, salesStats, aiMessage, recentProperties, growthStats } = useDashboardData();

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
