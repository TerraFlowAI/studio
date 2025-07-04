
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  ClipboardList,
  Clock,
  DollarSign,
  IndianRupee,
  LineChart,
  Sparkles,
  TrendingUp,
  Users,
  MailWarning,
  Percent,
  Timer,
} from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, ResponsiveContainer, Tooltip as RechartsTooltip, Legend as RechartsLegend, LineChart as RechartsLineChart } from "recharts";

const formatCurrency = (amount: number, showFractionDigits = false) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: showFractionDigits ? 2 : 0,
    maximumFractionDigits: showFractionDigits ? 2 : 0,
  }).format(amount);
};

const formatNumber = (num: number, precision = 1) => {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  }).format(num);
};

const cityTierDefaults = {
  "mumbai-delhi": 250000,
  "pune-hyderabad": 150000,
  "other-cities": 75000,
};

export const RoiCalculator: React.FC = () => {
  const [cityTier, setCityTier] = useState<string>("mumbai-delhi");
  const [leadsPerMonth, setLeadsPerMonth] = useState<number>(100);
  const [dailyMissedCalls, setDailyMissedCalls] = useState<number>(10);
  const [currentConversionRate, setCurrentConversionRate] = useState<number>(3); // %
  const [avgHoursSpentPerLeadManual, setAvgHoursSpentPerLeadManual] = useState<number>(1.5); // hours
  const [avgResponseTime, setAvgResponseTime] = useState<number>(6); // hours
  const [avgCommissionPerDeal, setAvgCommissionPerDeal] = useState<number>(cityTierDefaults["mumbai-delhi"]);

  // Update commission when city tier changes
  useEffect(() => {
    setAvgCommissionPerDeal(cityTierDefaults[cityTier as keyof typeof cityTierDefaults] || 100000);
  }, [cityTier]);

  // Placeholder factors for TerraFlow's impact
  const TF_CONVERSION_RATE_INCREASE_FACTOR = 1.2; // 20% increase
  const TF_TIME_SAVED_PER_LEAD_FACTOR = 0.75; // 75% time saved on automatable tasks
  const TF_MISSED_CALL_RECOVERY_ENGAGEMENT_RATE = 0.15; // 15% of missed calls re-engaged by AI convert
  const TF_REVENUE_GROWTH_MOM = 0.05; // 5% month-over-month growth

  const monthlyTimeSaved = useMemo(() => {
    return leadsPerMonth * avgHoursSpentPerLeadManual * TF_TIME_SAVED_PER_LEAD_FACTOR;
  }, [leadsPerMonth, avgHoursSpentPerLeadManual]);

  const workdaysReclaimed = useMemo(() => {
    return monthlyTimeSaved / 8; 
  }, [monthlyTimeSaved]);

  const dealsBeforeTerraFlow = useMemo(() => {
    return leadsPerMonth * (currentConversionRate / 100);
  }, [leadsPerMonth, currentConversionRate]);

  const dealsWithTerraFlow = useMemo(() => {
    return leadsPerMonth * ((currentConversionRate * TF_CONVERSION_RATE_INCREASE_FACTOR) / 100);
  }, [leadsPerMonth, currentConversionRate]);

  const additionalDealsPerMonth = useMemo(() => {
    return dealsWithTerraFlow - dealsBeforeTerraFlow;
  }, [dealsWithTerraFlow, dealsBeforeTerraFlow]);

  const monthlyRevenueBefore = useMemo(() => {
    return dealsBeforeTerraFlow * avgCommissionPerDeal;
  }, [dealsBeforeTerraFlow, avgCommissionPerDeal]);

  const monthlyRevenueWithTerraFlow = useMemo(() => {
    return dealsWithTerraFlow * avgCommissionPerDeal;
  }, [dealsWithTerraFlow, avgCommissionPerDeal]);

  const monthlyRevenueIncrease = useMemo(() => {
    return monthlyRevenueWithTerraFlow - monthlyRevenueBefore;
  }, [monthlyRevenueWithTerraFlow, monthlyRevenueBefore]);

  const valueOfRecoveredLeads = useMemo(() => {
    const monthlyMissedCalls = dailyMissedCalls * 30;
    const recoveredAndConvertedLeads = monthlyMissedCalls * TF_MISSED_CALL_RECOVERY_ENGAGEMENT_RATE;
    return recoveredAndConvertedLeads * avgCommissionPerDeal;
  }, [dailyMissedCalls, avgCommissionPerDeal]);


  const leadConversionChartData = useMemo(() => {
    const data = [];
    let manualRate = currentConversionRate;
    let tfRate = currentConversionRate * TF_CONVERSION_RATE_INCREASE_FACTOR; 
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

    for (let i = 0; i < 6; i++) {
      data.push({
        month: months[i],
        manual: parseFloat(manualRate.toFixed(2)),
        withTerraFlow: parseFloat(tfRate.toFixed(2)),
      });
      tfRate *= 1.005; 
    }
    return data;
  }, [currentConversionRate]);

  const revenueProjectionChartData = useMemo(() => {
    const data = [];
    let currentProjectedRevenue = monthlyRevenueWithTerraFlow;
    const months = ["M1", "M2", "M3", "M4", "M5", "M6"];
    for (let i = 0; i < 6; i++) {
      data.push({
        month: months[i],
        revenue: Math.round(currentProjectedRevenue / 1000) 
      });
      currentProjectedRevenue *= (1 + TF_REVENUE_GROWTH_MOM);
    }
    return data;
  }, [monthlyRevenueWithTerraFlow]);
  
  const chartConfig = {
    manual: { label: "Manual", color: "hsl(var(--muted-foreground))" },
    withTerraFlow: { label: "With TerraFlow", color: "hsl(var(--primary))" },
    revenue: { label: "Revenue (₹K)", color: "hsl(var(--primary))" },
  } satisfies React.ComponentProps<typeof ChartContainer>["config"];

  const outputCardData = [
    { 
      icon: Clock, title: "Monthly Time Saved", 
      value: `${formatNumber(monthlyTimeSaved, 0)} hours`, 
      subValue: `Equivalent to ${formatNumber(workdaysReclaimed, 1)} full workdays reclaimed!`,
      themeColorClasses: {
        icon: "text-blue-600 dark:text-blue-400",
        title: "text-blue-700 dark:text-blue-300",
        value: "text-blue-600 dark:text-blue-400",
      }
    },
    { 
      icon: TrendingUp, title: "Additional Deals / Month", 
      customContent: (
        <div className="text-center sm:text-left">
          <div className="grid grid-cols-2 gap-2 items-end mb-1">
            <div>
              <p className="text-xs text-muted-foreground">Before TerraFlow</p>
              <p className="text-2xl font-bold text-foreground">{formatNumber(dealsBeforeTerraFlow, 1)}</p>
            </div>
             <div>
              <p className="text-xs text-muted-foreground">With TerraFlow</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{formatNumber(dealsWithTerraFlow, 1)}</p>
            </div>
          </div>
          <p className="text-lg font-semibold text-green-600 dark:text-green-400 text-center">+{formatNumber(additionalDealsPerMonth, 1)} deals</p>
        </div>
      ),
      themeColorClasses: {
        icon: "text-green-600 dark:text-green-400",
        title: "text-green-700 dark:text-green-300",
      }
    },
    { 
      icon: DollarSign, title: "Monthly Revenue Uplift", 
      customContent: (
        <div className="text-center sm:text-left">
          <div className="grid grid-cols-2 gap-2 items-end mb-2">
            <div>
              <p className="text-xs text-muted-foreground">Before TerraFlow</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(monthlyRevenueBefore)}</p>
            </div>
             <div>
              <p className="text-xs text-muted-foreground">With TerraFlow</p>
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{formatCurrency(monthlyRevenueWithTerraFlow)}</p>
            </div>
          </div>
          <div className="bg-green-100 text-green-700 dark:bg-green-800/50 dark:text-green-300 p-2 rounded-md text-center">
              <p className="text-lg font-bold">Increase: {formatCurrency(monthlyRevenueIncrease)}</p>
          </div>
        </div>
      ),
      themeColorClasses: {
        icon: "text-amber-600 dark:text-amber-400",
        title: "text-amber-700 dark:text-amber-300",
      }
    },
    { 
      icon: Users, title: "Value of Recovered Leads", 
      description: `Estimated from ${dailyMissedCalls * 30} monthly missed calls.`,
      value: formatCurrency(valueOfRecoveredLeads), 
      subValue: "Potential revenue from leads TerraFlow engages 24/7.",
      themeColorClasses: {
        icon: "text-purple-600 dark:text-purple-400",
        title: "text-purple-700 dark:text-purple-300",
        value: "text-purple-600 dark:text-purple-400",
      }
    },
  ];


  return (
    <section className="py-16 md:py-24 bg-slate-50/50 dark:bg-slate-900/50 text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 font-headline">
            Estimate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">TerraFlow ROI</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            See how much time you can save and revenue you can generate with AI-powered automation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column: Inputs */}
          <div className="lg:col-span-3">
            <Card className="shadow-lg bg-card border border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <ClipboardList className="w-6 h-6 text-primary" />
                  <CardTitle className="text-2xl">Your Current Real Estate Metrics</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="city-tier" className="text-sm font-medium mb-2 block">Select Your City Tier</Label>
                  <Tabs value={cityTier} onValueChange={setCityTier} id="city-tier">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="mumbai-delhi">Mumbai/Delhi</TabsTrigger>
                      <TabsTrigger value="pune-hyderabad">Pune/Hyderabad</TabsTrigger>
                      <TabsTrigger value="other-cities">Other Cities</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {[
                  { id: "leads-month", label: "Leads per Month", value: leadsPerMonth, setter: setLeadsPerMonth, min: 10, max: 500, step: 10, unit: "leads", icon: Users },
                  { id: "missed-calls", label: "Daily Missed Calls", value: dailyMissedCalls, setter: setDailyMissedCalls, min: 0, max: 50, step: 1, unit: "calls", icon: MailWarning },
                  { id: "conversion-rate", label: "Current Conversion Rate (%)", value: currentConversionRate, setter: setCurrentConversionRate, min: 0.5, max: 20, step: 0.1, unit: "%", icon: Percent },
                  { id: "hours-lead-manual", label: "Avg. Hours Spent per Lead (Manual)", value: avgHoursSpentPerLeadManual, setter: setAvgHoursSpentPerLeadManual, min: 0.5, max: 10, step: 0.25, unit: "hrs", icon: Timer },
                  { id: "response-time", label: "Avg. Response Time (Hours)", value: avgResponseTime, setter: setAvgResponseTime, min: 0.5, max: 24, step: 0.5, unit: "hrs", icon: Clock },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.id} className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <Label htmlFor={item.id} className="flex items-center gap-2 text-sm">
                          <Icon className="w-4 h-4 text-muted-foreground" />
                          {item.label}
                        </Label>
                        <span className="text-sm font-medium text-primary">{formatNumber(item.value, item.unit === "%" || item.unit === "hrs" ? 1:0)} {item.unit}</span>
                      </div>
                      <Slider id={item.id} value={[item.value]} onValueChange={(val) => item.setter(val[0])} min={item.min} max={item.max} step={item.step} />
                    </div>
                  );
                })}

                <div className="space-y-1.5">
                  <Label htmlFor="commission-deal" className="flex items-center gap-2 text-sm">
                     <IndianRupee className="w-4 h-4 text-muted-foreground" />
                    Avg. Commission per Deal (₹)
                  </Label>
                  <Input
                    id="commission-deal"
                    type="number"
                    value={avgCommissionPerDeal}
                    onChange={(e) => setAvgCommissionPerDeal(Math.max(0, parseFloat(e.target.value)))}
                    placeholder="e.g., 100000"
                    className="text-sm"
                  />
                  <p className="text-xs text-muted-foreground">Updated based on City Tier. Adjust if needed.</p>
                </div>

                <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-primary mb-1">TerraFlow Advantage</h4>
                      <p className="text-sm text-foreground/80">
                        Our AI responds instantly 24/7, qualifies leads, and automates follow-ups, significantly boosting conversions and saving you valuable hours daily. Reduce manual effort, close more deals.
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Calculations are estimates based on typical industry improvements.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Outputs */}
          <div className="lg:col-span-2 space-y-6">
            {outputCardData.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="shadow-lg bg-card border border-border">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Icon className={`w-6 h-6 ${item.themeColorClasses.icon}`} />
                      <CardTitle className={`text-xl ${item.themeColorClasses.title}`}>{item.title}</CardTitle>
                    </div>
                    {item.description && <CardDescription className="pt-1 text-sm text-muted-foreground">{item.description}</CardDescription>}
                  </CardHeader>
                  <CardContent>
                    {item.customContent ? item.customContent : (
                      <>
                        <p className={`text-3xl font-bold ${item.themeColorClasses.value} mb-1`}>{item.value}</p>
                        {item.subValue && <p className="text-sm text-muted-foreground">{item.subValue}</p>}
                      </>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Chart Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <Card className="shadow-lg bg-card border border-border">
            <CardHeader>
              <div className="flex items-center gap-3">
                <LineChart className="w-6 h-6 text-primary" />
                <CardTitle className="text-xl">Lead Conversion Potential</CardTitle>
              </div>
              <CardDescription>Projected conversion rate improvements with TerraFlow over 6 months.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[250px] w-full">
                <RechartsLineChart data={leadConversionChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis unit="%" tickLine={false} axisLine={false} tickMargin={8} />
                  <RechartsTooltip 
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" hideLabel />} 
                  />
                  <RechartsLegend content={<ChartLegendContent />} />
                  <Line dataKey="manual" type="monotone" stroke="var(--color-manual)" strokeWidth={2} dot={true} />
                  <Line dataKey="withTerraFlow" type="monotone" stroke="var(--color-withTerraFlow)" strokeWidth={2} dot={true} />
                </RechartsLineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="shadow-lg bg-card border border-border">
            <CardHeader>
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-primary" />
                <CardTitle className="text-xl">6-Month Revenue Projection</CardTitle>
              </div>
              <CardDescription>Projected monthly revenue with TerraFlow, assuming {TF_REVENUE_GROWTH_MOM * 100}% MoM growth.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[250px] w-full">
                <BarChart data={revenueProjectionChartData} margin={{ top: 5, right: 0, left: -25, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis unit="K" tickFormatter={(value) => `₹${value}`} tickLine={false} axisLine={false} tickMargin={8}/>
                  <RechartsTooltip 
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
            <Button asChild size="lg" className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg">
                <Link href="#contact">
                    Book Demo & Get Custom ROI Analysis <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
};
