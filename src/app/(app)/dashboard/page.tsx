
"use client";

import * as React from "react";
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { KpiCard } from "@/components/dashboard/KpiCard";
import { SalesStatisticsCard } from "@/components/dashboard/SalesStatisticsCard";
import { GrowthStatisticsCard } from "@/components/dashboard/GrowthStatisticsCard";
import { AiCoPilots } from "@/components/dashboard/AiCoPilots";
import { ListingBoard } from "@/components/dashboard/ListingBoard";
import { AiAssistantCard } from "@/components/dashboard/AiAssistantCard";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusCircle, Users, Briefcase, DollarSign, TrendingUp, FileSignature, Loader2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import type { Step, CallBackProps } from "react-joyride";
import { WelcomeModal } from "@/components/onboarding/WelcomeModal";
import { SetupChecklist } from "@/components/onboarding/SetupChecklist";

const OnboardingTour = dynamic(
  () => import('@/components/onboarding/OnboardingTour').then(mod => mod.OnboardingTour),
  { 
    ssr: false,
  }
);

type OnboardingStatus = 'loading' | 'pending_welcome' | 'tour_active' | 'checklist_active' | 'complete';

type MockProperty = { 
    id: string; 
    title: string; 
    locality: string; 
    price: string; 
    imageUrl: string; 
    aiHint: string;
    beds: number;
    baths: number;
    sqft: number;
    hasVrTour: boolean;
};

const mockDashboardData = {
    kpiData: {
        activeListings: { value: '74', trend: '+5 since last week' },
        leadsGenerated: { value: '32', trend: '+12% from last month' },
        contractsSigned: { value: '9', trend: '-1 from last month', trendDirection: 'down' },
        totalSales: { value: '₹4.5Cr', trend: '+₹1.2Cr from last month' }
    },
    salesData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
            name: 'This Year',
            data: [1200000, 1900000, 3000000, 5000000, 2300000, 3200000, 4500000, 4800000, 4200000, 6000000, 5500000, 7000000],
            color: 'hsl(var(--primary))'
        }, {
            name: 'Last Year',
            data: [800000, 1200000, 4000000, 2500000, 4000000, 4500000, 4100000, 4300000, 3800000, 5500000, 5000000, 6500000],
            color: 'hsl(var(--muted-foreground))'
        }]
    },
    recentProperties: [
        { id: "prop1", title: "Luxury Villa with Pool", locality: "Indiranagar, Bangalore", price: "₹7 Cr", imageUrl: 'https://images.unsplash.com/photo-1717167398817-121e3c283dbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxsdXh1cnklMjB2aWxsYSUyMHxlbnwwfHx8fDE3NTExMTk5NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080', aiHint: "luxury villa", beds: 5, baths: 6, sqft: 6000, hasVrTour: true },
        { id: "prop2", title: "Modern 3BHK Apartment", locality: "Koramangala, Bangalore", price: "₹2.5 Cr", imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267', aiHint: "modern apartment", beds: 3, baths: 3, sqft: 1800, hasVrTour: true },
        { id: "prop3", title: "Spacious 2BHK Flat", locality: "Whitefield, Bangalore", price: "₹1.1 Cr", imageUrl: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45', aiHint: "apartment interior", beds: 2, baths: 2, sqft: 1250, hasVrTour: false },
    ] as MockProperty[],
    growthData: {
        totalRevenue: '₹7.32Cr',
        monthlyData: [
            { month: "Jan", sale: 180000, rent: 90000 }, { month: "Feb", sale: 210000, rent: 100000 }, { month: "Mar", sale: 250000, rent: 110000 }, { month: "Apr", sale: 230000, rent: 115000 }, { month: "May", sale: 270000, rent: 120000 }, { month: "Jun", sale: 300000, rent: 130000 }, { month: "Jul", sale: 280000, rent: 125000 }, { month: "Aug", sale: 310000, rent: 135000 }, { month: "Sep", sale: 340000, rent: 140000 }, { month: "Oct", sale: 370000, rent: 150000 }, { month: "Nov", sale: 350000, rent: 145000 }, { month: "Dec", sale: 400000, rent: 160000 },
        ]
    }
};

const onboardingSteps: Step[] = [
    { target: '#onboarding-step-1', content: "This is the heart of TerraFlow. Each card is a launchpad into a powerful suite of tools. Let's start here.", title: "Your Command Center", disableBeacon: true },
    { target: '#onboarding-step-2', content: "This is your personal AI assistant. Use voice or chat to command your entire business—from adding leads to making calls. Try asking it, 'What can you do?' later on.", title: "Meet Terra, Your AI Agent" },
    { target: '#onboarding-step-3', content: "Use this button to quickly add a new lead or property from anywhere in the app. This is the fastest way to get your data into the system.", title: "Create Anything" },
    { target: '#onboarding-step-4', content: "Your sidebar contains all your main workspaces. You'll spend most of your time in 'Leads' and 'Properties'.", title: "Navigate Your Business" },
];

function DashboardPageContent() {
    const { user, profile, supabase, isLoading } = useAuth();
    const searchParams = useSearchParams();
    const data = mockDashboardData;
    const [onboardingStatus, setOnboardingStatus] = React.useState<OnboardingStatus>('loading');
    
    React.useEffect(() => {
        if (searchParams.get('tour') === 'true') {
            setOnboardingStatus('tour_active');
        }
    }, [searchParams]);

    React.useEffect(() => {
      if (!isLoading && user && profile && searchParams.get('tour') !== 'true') {
        if (profile.has_completed_onboarding) {
          setOnboardingStatus('complete');
        } else {
          setOnboardingStatus('pending_welcome');
        }
      } else if (!isLoading && user && searchParams.get('tour') === 'true') {
        setOnboardingStatus('tour_active');
      }
    }, [user, profile, isLoading, searchParams]);

    const markOnboardingComplete = async () => {
        if (user) {
            const { error } = await supabase
                .from('users')
                .update({ has_completed_onboarding: true })
                .eq('id', user.id);
            if (error) console.error("Error updating onboarding status", error);
        }
        setOnboardingStatus('complete');
    };

    const handleJoyrideCallback = (data: CallBackProps) => {
        const { status } = data;
        const finishedStatuses: string[] = ['finished', 'skipped'];

        if (finishedStatuses.includes(status)) {
            if (searchParams.get('tour') === 'true') {
                setOnboardingStatus('complete');
            } else {
                setOnboardingStatus('checklist_active');
            }
        }
    };
    
    if (isLoading || onboardingStatus === 'loading' || !data) {
        return <DashboardSkeleton />;
    }

    const { kpiData, salesData, recentProperties, growthData } = data;
    const userName = profile?.display_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Agent';

    return (
        <>
            {onboardingStatus === 'pending_welcome' && (
                <WelcomeModal
                    userName={userName}
                    onStartTour={() => setOnboardingStatus('tour_active')}
                    onSkipTour={markOnboardingComplete}
                />
            )}
            <OnboardingTour
                run={onboardingStatus === 'tour_active'}
                steps={onboardingSteps}
                onCallback={handleJoyrideCallback}
            />
            {onboardingStatus === 'checklist_active' && (
                <SetupChecklist onComplete={markOnboardingComplete} />
            )}

            <div className="container mx-auto">
                <PageHeader title={`Welcome, ${userName}!`} description="Here's a snapshot of your real estate business.">
                    <div id="onboarding-step-3">
                      <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground h-10">
                          <Link href="/properties/new"><PlusCircle className="mr-2 h-4 w-4"/> Add New Property</Link>
                      </Button>
                    </div>
                </PageHeader>
                
                <div className="mb-8" id="onboarding-step-1">
                    <AiCoPilots />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <KpiCard title="Active Listings" value={kpiData.activeListings.value} trend={kpiData.activeListings.trend} icon={Briefcase} />
                    <KpiCard title="New Leads" value={kpiData.leadsGenerated.value} trend={kpiData.leadsGenerated.trend} icon={Users} />
                    <KpiCard title="Contracts Signed" value={kpiData.contractsSigned.value} trend={kpiData.contractsSigned.trend} trendDirection="down" icon={FileSignature} />
                    <KpiCard title="Total Sales (Month)" value={kpiData.totalSales.value} trend={kpiData.totalSales.trend} icon={DollarSign} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
                    <div className="lg:col-span-3">
                        <SalesStatisticsCard chartData={salesData} />
                    </div>
                    <div className="lg:col-span-2">
                        <GrowthStatisticsCard totalRevenue={growthData.totalRevenue} monthlyData={growthData.monthlyData} />
                    </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    <div className="lg:col-span-2">
                        <ListingBoard properties={recentProperties} />
                    </div>
                    <div id="onboarding-step-2">
                        <AiAssistantCard userName={userName} />
                    </div>
                </div>

            </div>
        </>
    )
}

// Wrapper component to use Suspense for useSearchParams
export default function DashboardPage() {
  return (
    <React.Suspense fallback={<DashboardSkeleton />}>
      <DashboardPageContent />
    </React.Suspense>
  );
}


function DashboardSkeleton() {
    return (
        <div className="container mx-auto animate-pulse">
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        </div>
    );
}
