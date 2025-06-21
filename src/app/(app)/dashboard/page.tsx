
"use client";
import { motion } from "framer-motion";
import { ActionableBanner } from "@/components/dashboard/ActionableBanner";
import { SalesStatisticsCard } from "@/components/dashboard/SalesStatisticsCard";
import { GrowthStatisticsCard } from "@/components/dashboard/GrowthStatisticsCard";
import { ListingCard } from "@/components/dashboard/ListingCard";
import { AiAssistantCard } from "@/components/dashboard/AiAssistantCard";
import { Button } from "@/components/ui/button"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";


import { Bot, TrendingUp, Brain, BarChart3, PenSquare, Camera, Shield, FileSignature, Files, Home, Users, FileText, AreaChart, Briefcase, Search, Calculator, ArrowRight } from "lucide-react";

const serviceKpiData = [
  { 
    title: "TerraLead™", 
    icon: Bot,
    overlayIcon: TrendingUp,
    stats: [
        { label: "Hot Leads", value: "82" },
        { label: "Conversion Rate", value: "18%" }
    ],
    actionText: "Manage Leads",
    actionLink: "/leads",
    colorClass: "from-teal-500 to-green-500",
    textColor: "text-teal-400"
  },
  { 
    title: "TerraValuate™", 
    icon: Brain, 
    overlayIcon: Calculator,
    stats: [
        { label: "Properties Valued", value: "241" },
        { label: "Avg. Accuracy", value: "96.5%" }
    ],
    actionText: "Run New CMA",
    actionLink: "/terravaluate",
    colorClass: "from-blue-500 to-sky-500",
    textColor: "text-blue-400"
  },
  { 
    title: "TerraScribe™", 
    icon: PenSquare, 
    overlayIcon: Camera,
    stats: [
        { label: "Listings Gen.", value: "42" },
        { label: "RERA Docs Drafted", value: "8" }
    ],
    actionText: "Open Scribe Studio",
    actionLink: "/scribe",
    colorClass: "from-purple-500 to-violet-500",
    textColor: "text-purple-400"
  },
    { 
    title: "TerraSecure™", 
    icon: Shield, 
    overlayIcon: FileSignature,
    stats: [
        { label: "Docs Verified", value: "112" },
        { label: "Risks Flagged", value: "14" }
    ],
    actionText: "Verify Document",
    actionLink: "/documents",
    colorClass: "from-orange-500 to-amber-500",
    textColor: "text-orange-400"
  },
];

const listings = [
  { id: "1", title: "Luxury Apartment", location: "Lenteng Agung DKI Jakarta", price: "₹1.9 Cr", specs: "2 Beds, 2 Bath, 1,032 sqft", imageUrl: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxMdXh1cnklMjBhcGFydG1lbnR8ZW58MHx8fHwxNzUwNTA0OTEzfDA&ixlib=rb-4.1.0&q=80&w=1080", aiHint: "modern apartment exterior" },
  { id: "2", title: "Modern Villa", location: "South Delhi", price: "₹3.5 Cr", specs: "4 Beds, 3 Bath, 2,500 sqft", imageUrl: "https://placehold.co/600x400.png", aiHint: "luxury villa house" },
  { id: "3", title: "Penthouse Suite", location: "Bandra West, Mumbai", price: "₹7.2 Cr", specs: "3 Beds, 4 Bath, 3,100 sqft", imageUrl: "https://placehold.co/600x400.png", aiHint: "penthouse apartment city" },
];

const salesChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    { data: [30, 40, 25, 50, 45, 60], color: "hsl(var(--chart-1))", name: "Residental" }, // Teal
    { data: [20, 30, 35, 40, 55, 50], color: "hsl(var(--chart-2))", name: "Commercial" }, // Soft Blue
    { data: [10, 15, 20, 25, 30, 40], color: "hsl(var(--chart-3))", name: "Plot/Land" }, // Orange/Yellow
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
      {/* AI Co-Pilot Service Cards Row */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
      >
        {serviceKpiData.map((kpi, index) => {
            const Icon = kpi.icon;
            const OverlayIcon = kpi.overlayIcon;
            return (
              <motion.div key={kpi.title} variants={cardVariants} custom={index}>
                <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 bg-card h-full flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                        <div className={`relative w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br ${kpi.colorClass}`}>
                            <Icon className="w-6 h-6 text-white" />
                            <OverlayIcon className="absolute w-4 h-4 text-white bg-black/30 rounded-full p-0.5 -bottom-1 -right-1" />
                        </div>
                        <CardTitle className="text-lg font-semibold font-headline text-foreground">{kpi.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-2">
                    {kpi.stats.map(stat => (
                        <div key={stat.label} className="flex justify-between items-baseline">
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                            <p className="text-lg font-bold text-foreground">{stat.value}</p>
                        </div>
                    ))}
                  </CardContent>
                  <div className="p-4 pt-2">
                    <Button variant="link" asChild className="p-0 h-auto text-sm font-semibold text-primary">
                        <Link href={kpi.actionLink}>
                            {kpi.actionText} <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )
        })}
      </motion.div>

      {/* Actionable Banner */}
      <motion.div variants={cardVariants} custom={serviceKpiData.length}>
        <ActionableBanner
          icon={Shield}
          headline="TerraSecure™ Alert: E-Khata for 'Prestige Falcon City' may have inconsistencies."
          subHeadline="Immediate review is recommended to ensure compliance and mitigate risk."
          buttonText="View Verification Report"
          onClick={() => console.log("Review Verification Report Clicked")}
        />
      </motion.div>

      {/* Main Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <motion.div className="lg:col-span-2" variants={cardVariants} custom={serviceKpiData.length + 1}>
          <SalesStatisticsCard 
            chartData={salesChartData}
            totalSales="₹32,372 Cr" 
            totalProfit="₹10,000 Cr"
            totalCost="₹12,372 Cr"
          />
        </motion.div>
        <motion.div variants={cardVariants} custom={serviceKpiData.length + 2}>
          <GrowthStatisticsCard 
            totalRevenue="₹732,629 Cr"
            chartData={growthChartData}
          />
        </motion.div>
      </div>

      {/* Lower Dashboard Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <motion.div className="lg:col-span-2" variants={cardVariants} custom={serviceKpiData.length + 3}>
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
        <motion.div variants={cardVariants} custom={serviceKpiData.length + 4}>
          <AiAssistantCard />
        </motion.div>
      </div>
    </div>
  );
}
