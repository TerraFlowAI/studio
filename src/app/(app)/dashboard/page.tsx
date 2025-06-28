
"use client";

import { KpiCard } from "@/components/dashboard/KpiCard";
import { SalesStatisticsCard } from "@/components/dashboard/SalesStatisticsCard";
import { AiCoPilots } from "@/components/dashboard/AiCoPilots";
import { ListingBoard } from "@/components/dashboard/ListingBoard";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusCircle, Users, Briefcase, DollarSign, TrendingUp, FileSignature, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";

// Mock data as the hook was removed
const mockDashboardData = {
    kpiData: {
        activeListings: { value: '74', trend: '+5 since last week' },
        leadsGenerated: { value: '32', trend: '+12% from last month' },
        contractsSigned: { value: '9', trend: '-1 from last month', trendDirection: 'down' },
        totalSales: { value: '₹4.5Cr', trend: '+₹1.2Cr from last month' }
    },
    salesData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [{
            name: 'This Year',
            data: [1200000, 1900000, 3000000, 5000000, 2300000, 3200000],
            color: 'hsl(var(--primary))'
        }, {
            name: 'Last Year',
            data: [800000, 1200000, 4000000, 2500000, 4000000, 4500000],
            color: 'hsl(var(--muted-foreground))'
        }]
    },
    recentProperties: [
        { id: "prop1", title: "Modern 3BHK Apartment", locality: "Koramangala, Bangalore", price: "₹2.5 Cr", imageUrl: 'https://placehold.co/400x250.png', aiHint: "modern apartment" },
        { id: "prop2", title: "Luxury Villa with Pool", locality: "Indiranagar, Bangalore", price: "₹7 Cr", imageUrl: 'https://images.unsplash.com/photo-1717167398817-121e3c283dbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxsdXh1cnklMjB2aWxsYSUyMHxlbnwwfHx8fDE3NTExMTk5NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080', aiHint: "luxury villa" },
        { id: "prop3", title: "Spacious 2BHK Flat", locality: "Whitefield, Bangalore", price: "₹1.1 Cr", imageUrl: 'https://placehold.co/400x250.png', aiHint: "apartment interior" },
    ]
};

export default function DashboardPage() {
    const { user, isLoading } = useAuth();
    const data = mockDashboardData; // Use mock data

    if (isLoading || !data) {
        return <DashboardSkeleton />;
    }

    const { kpiData, salesData, recentProperties } = data;

    return (
        <div className="container mx-auto">
            <PageHeader title={`Welcome, ${user?.displayName?.split(' ')[0] || 'Agent'}!`} description="Here's a snapshot of your real estate business.">
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link href="/properties/new"><PlusCircle className="mr-2 h-4 w-4"/> Add New Property</Link>
                </Button>
            </PageHeader>
            
            <div className="mb-8">
                <AiCoPilots />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <KpiCard title="Active Listings" value={kpiData.activeListings.value} trend={kpiData.activeListings.trend} icon={Briefcase} />
                <KpiCard title="New Leads" value={kpiData.leadsGenerated.value} trend={kpiData.leadsGenerated.trend} icon={Users} />
                <KpiCard title="Contracts Signed" value={kpiData.contractsSigned.value} trend={kpiData.contractsSigned.trend} trendDirection="down" icon={FileSignature} />
                <KpiCard title="Total Sales (Month)" value={kpiData.totalSales.value} trend={kpiData.totalSales.trend} icon={DollarSign} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-8">
                <SalesStatisticsCard chartData={salesData} />
            </div>
            
            <div className="mb-8">
              <ListingBoard properties={recentProperties} />
            </div>

        </div>
    )
}

function DashboardSkeleton() {
    return (
        <div className="container mx-auto animate-pulse">
            <div className="mb-8">
                <Skeleton className="h-9 w-64" />
                <Skeleton className="h-5 w-80 mt-2" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Skeleton className="h-28 rounded-lg" />
                <Skeleton className="h-28 rounded-lg" />
                <Skeleton className="h-28 rounded-lg" />
                <Skeleton className="h-28 rounded-lg" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-8">
                 <Skeleton className="h-96 rounded-lg" />
            </div>
            <div className="mb-8">
                <Skeleton className="h-8 w-48 mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Skeleton className="h-56 rounded-lg" />
                    <Skeleton className="h-56 rounded-lg" />
                    <Skeleton className="h-56 rounded-lg" />
                </div>
            </div>
        </div>
    );
}
