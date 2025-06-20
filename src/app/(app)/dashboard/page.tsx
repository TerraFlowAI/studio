
"use client";
import { motion } from "framer-motion";
import { OverviewKpiCard } from "@/components/dashboard/OverviewKpiCard";
import { ActionableBanner } from "@/components/dashboard/ActionableBanner";
import { SalesStatisticsCard } from "@/components/dashboard/SalesStatisticsCard";
import { GrowthStatisticsCard } from "@/components/dashboard/GrowthStatisticsCard";
import { ListingCard } from "@/components/dashboard/ListingCard";
import { AiAssistantCard } from "@/components/dashboard/AiAssistantCard";

import { BarChartHorizontal, TrendingUp, PieChartIcon, LineChartIcon, Files, Home, Users, BarChart3, FileText, AreaChart, Briefcase, Camera, Search } from "lucide-react";

const kpiData = [
  { title: "Active Listings", value: "756", trend: "-1k from last month", trendColor: "text-red-500", icon: BarChartHorizontal, service: "Property Management" },
  { title: "Hot Leads", value: "569", trend: "+2.7k from last month", trendColor: "text-green-500", icon: PieChartIcon, service: "TerraLead™" },
  { title: "Total Sale Value", value: "₹50 Cr", trend: "+5Cr this month", trendColor: "text-green-500", icon: TrendingUp, service: "TerraValuate™" },
  { title: "Total Revenue", value: "₹5 Cr", trend: "+5Cr this month", trendColor: "text-green-500", icon: PieChartIcon, service: "Dynamic Pricing Optimization" },
];

const listings = [
  { id: "1", title: "Luxury Apartment", location: "Lenteng Agung DKI Jakarta", price: "₹1.9 Cr", specs: "2 Beds, 2 Bath, 1,032 sqft", imageUrl: "https://placehold.co/600x400.png", aiHint: "modern apartment exterior" },
  { id: "2", title: "Modern Villa", location: "South Delhi", price: "₹3.5 Cr", specs: "4 Beds, 3 Bath, 2,500 sqft", imageUrl: "https://placehold.co/600x400.png", aiHint: "luxury villa house" },
  { id: "3", title: "Penthouse Suite", location: "Bandra West, Mumbai", price: "₹7.2 Cr", specs: "3 Beds, 4 Bath, 3,100 sqft", imageUrl: "https://placehold.co/600x400.png", aiHint: "penthouse apartment city" },
];

const salesChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    { data: [30, 40, 25, 50, 45, 60], color: "hsl(var(--chart-1))" }, // Teal
    { data: [20, 30, 35, 40, 55, 50], color: "hsl(var(--chart-2))" }, // Soft Blue
    { data: [10, 15, 20, 25, 30, 40], color: "hsl(var(--chart-3))" }, // Orange/Yellow
  ],
};

const growthChartData = {
  labels: ["Q1", "Q2", "Q3", "Q4"],
  residential: [300, 500, 420, 600], // In '000s for example
  commercial: [200, 350, 540, 480],
};


export default function OverviewDashboardPage() {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="p-6 md:p-8 space-y-6 md:space-y-8 bg-background min-h-screen">
      {/* KPI Cards Row */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
      >
        {kpiData.map((kpi, index) => (
          <motion.div key={kpi.title} variants={cardVariants} custom={index}>
            <OverviewKpiCard
              title={kpi.title}
              value={kpi.value}
              trend={kpi.trend}
              trendColor={kpi.trendColor}
              icon={kpi.icon}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Actionable Banner */}
      <motion.div variants={cardVariants} custom={kpiData.length}>
        <ActionableBanner
          icon={Files}
          headline="74 High-Risk Contracts Flagged by TerraSecure™ AI."
          subHeadline="Compliance issues and fraudulent clauses detected. Review immediately."
          buttonText="Review Contracts"
          onClick={() => console.log("Review Contracts Clicked")}
        />
      </motion.div>

      {/* Main Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <motion.div className="lg:col-span-2" variants={cardVariants} custom={kpiData.length + 1}>
          <SalesStatisticsCard 
            chartData={salesChartData}
            totalSales="₹32,372 Cr" 
            totalProfit="₹10,000 Cr"
            totalCost="₹12,372 Cr"
          />
        </motion.div>
        <motion.div variants={cardVariants} custom={kpiData.length + 2}>
          <GrowthStatisticsCard 
            totalRevenue="₹732,629 Cr"
            chartData={growthChartData}
          />
        </motion.div>
      </div>

      {/* Lower Dashboard Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <motion.div className="lg:col-span-2" variants={cardVariants} custom={kpiData.length + 3}>
          <div className="bg-card p-6 rounded-lg shadow-md h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-foreground">Listing Board</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">Newly added</span>
                {/* Placeholder for Recent Listed Dropdown */}
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">Recent Listed</Button> 
                <Button variant="outline" size="sm" className="text-primary border-primary hover:bg-primary/10">View All Listings</Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {listings.map(listing => (
                <ListingCard
                  key={listing.id}
                  title={listing.title}
                  location={listing.location}
                  price={listing.price}
                  specs={listing.specs}
                  imageUrl={listing.imageUrl}
                  aiHint={listing.aiHint}
                />
              ))}
            </div>
          </div>
        </motion.div>
        <motion.div variants={cardVariants} custom={kpiData.length + 4}>
          <AiAssistantCard />
        </motion.div>
      </div>
    </div>
  );
}
