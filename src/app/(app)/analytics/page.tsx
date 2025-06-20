
"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DateRangePicker } from "@/components/shared/DateRangePicker"; // Assuming a generic DateRangePicker component
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { TrendingUp, DollarSign, Users, BarChartHorizontal, Download, Filter, Map, Layers, Target, Calculator, FileText } from "lucide-react";
import { KpiCard } from "@/components/dashboard/KpiCard"; // Reusing KpiCard from dashboard

// Mock Data for Sales Performance Tab
const salesKpiData = [
  { title: "Total Revenue", value: "₹1.25 Cr", icon: DollarSign, trend: "+15% from last month", trendDirection: "up" as "up" | "down" },
  { title: "Total Profit", value: "₹45 Lakhs", icon: TrendingUp, trend: "+12% from last month", trendDirection: "up" as "up" | "down" },
  { title: "Average Deal Size", value: "₹82 Lakhs", icon: BarChartHorizontal, trend: "+5% from last month", trendDirection: "up" as "up" | "down" },
  { title: "Sales Cycle", value: "42 Days", icon: Filter, trend: "-3 days from last month", trendDirection: "down" as "up" | "down" },
];

const revenueChartData = [
  { month: "Jan", revenue: 1500000, profit: 400000 },
  { month: "Feb", revenue: 1800000, profit: 550000 },
  { month: "Mar", revenue: 2200000, profit: 700000 },
  { month: "Apr", revenue: 1900000, profit: 600000 },
  { month: "May", revenue: 2500000, profit: 850000 },
  { month: "Jun", revenue: 2800000, profit: 950000 },
];

const revenueChartConfig = {
  revenue: { label: "Revenue", color: "hsl(var(--primary))" },
  profit: { label: "Profit", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

const propertyTypeSalesData = [
  { type: "Apartment", deals: 12, revenue: "₹6.5 Cr" },
  { type: "Villa", deals: 5, revenue: "₹4.2 Cr" },
  { type: "Land", deals: 3, revenue: "₹1.5 Cr" },
  { type: "Commercial", deals: 2, revenue: "₹2.3 Cr" },
];

const agentPerformanceData = [
  { agent: "Riya Sharma", deals: 8, revenue: "₹5.1 Cr" },
  { agent: "Amit Patel", deals: 7, revenue: "₹4.8 Cr" },
  { agent: "Priya Singh", deals: 5, revenue: "₹3.2 Cr" },
];

// Mock data for Lead Analytics
const leadFunnelData = [
  { stage: 'New Leads', value: 1250, fill: "hsl(var(--chart-1))" },
  { stage: 'Contacted', value: 980, fill: "hsl(var(--chart-2))" },
  { stage: 'Viewings', value: 450, fill: "hsl(var(--chart-3))" },
  { stage: 'Offers Made', value: 150, fill: "hsl(var(--chart-4))" },
  { stage: 'Closed', value: 75, fill: "hsl(var(--chart-5))" },
];

const leadSourceData = [
    { name: 'Website Chatbot', leads: 450, conversion: 12, fill: "hsl(var(--chart-1))" },
    { name: 'Google Ads', leads: 300, conversion: 8, fill: "hsl(var(--chart-2))" },
    { name: 'Referrals', leads: 250, conversion: 20, fill: "hsl(var(--chart-3))" },
    { name: 'Social Media', leads: 150, conversion: 5, fill: "hsl(var(--chart-4))" },
    { name: 'Other', leads: 100, conversion: 3, fill: "hsl(var(--chart-5))" },
];


export default function AnalyticsPage() {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });

  return (
    <div className="container mx-auto">
      <PageHeader title="Analytics & Insights">
        <div className="flex items-center gap-2">
          <DateRangePicker
            initialDateFrom={dateRange?.from}
            initialDateTo={dateRange?.to}
            onUpdate={(values) => {
              const { range } = values;
              setDateRange(range);
              console.log("Date range updated:", range); // Placeholder for actual data refetching
            }}
            align="end"
            triggerClassName="h-10"
          />
          <Button variant="outline" className="h-10">
            <Download className="mr-2 h-4 w-4" /> Export Report
          </Button>
        </div>
      </PageHeader>

      <Tabs defaultValue="sales-performance" className="w-full">
        <TabsList className="border-b-0 justify-start mb-4 bg-transparent p-0">
          <TabsTrigger value="sales-performance" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none px-4 pb-2 text-muted-foreground hover:text-primary">Sales Performance</TabsTrigger>
          <TabsTrigger value="lead-analytics" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none px-4 pb-2 text-muted-foreground hover:text-primary">Lead Analytics</TabsTrigger>
          <TabsTrigger value="market-intel" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none px-4 pb-2 text-muted-foreground hover:text-primary">MarketIntel™</TabsTrigger>
          <TabsTrigger value="valuation-tools" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none px-4 pb-2 text-muted-foreground hover:text-primary">Valuation Tools</TabsTrigger>
        </TabsList>

        {/* Sales Performance Tab */}
        <TabsContent value="sales-performance" className="mt-0">
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {salesKpiData.map((kpi) => (
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

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-xl">Revenue & Profit Over Time</CardTitle>
                {/* Placeholder for metric switcher dropdown */}
              </CardHeader>
              <CardContent className="h-[350px] p-0">
                <ChartContainer config={revenueChartConfig} className="w-full h-full">
                    <ResponsiveContainer>
                        <LineChart data={revenueChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="month" tickLine={false} axisLine={false} dy={10} />
                            <YAxis tickFormatter={(value) => `₹${value/100000}L`} tickLine={false} axisLine={false} dx={-5} />
                            <Tooltip content={<ChartTooltipContent indicator="dot" />} cursor={{stroke: 'hsl(var(--primary))', strokeWidth:1, strokeDasharray: "3 3"}} />
                            <Legend verticalAlign="top" align="right" iconSize={12} wrapperStyle={{paddingBottom: "10px"}} />
                            <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                            <Line type="monotone" dataKey="profit" stroke="var(--color-profit)" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="font-headline text-lg">By Property Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Deals</TableHead>
                        <TableHead className="text-right">Revenue</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {propertyTypeSalesData.map((item) => (
                        <TableRow key={item.type}>
                          <TableCell className="font-medium">{item.type}</TableCell>
                          <TableCell>{item.deals}</TableCell>
                          <TableCell className="text-right">{item.revenue}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="font-headline text-lg">By Agent</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Agent</TableHead>
                        <TableHead>Deals</TableHead>
                        <TableHead className="text-right">Revenue</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {agentPerformanceData.map((item) => (
                        <TableRow key={item.agent}>
                          <TableCell className="font-medium">{item.agent}</TableCell>
                          <TableCell>{item.deals}</TableCell>
                          <TableCell className="text-right">{item.revenue}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Lead Analytics Tab (Placeholder) */}
        <TabsContent value="lead-analytics" className="mt-0">
           <div className="space-y-6">
             <Card>
                <CardHeader><CardTitle className="font-headline">Lead Funnel</CardTitle></CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={leadFunnelData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" />
                      <YAxis dataKey="stage" type="category" width={100} />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="value" name="Leads" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
             </Card>
             <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader><CardTitle className="font-headline">Lead Source Performance</CardTitle></CardHeader>
                    <CardContent className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={leadSourceData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                           <CartesianGrid strokeDasharray="3 3" vertical={false} />
                           <XAxis dataKey="name" tick={{fontSize: 10}} />
                           <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" />
                           <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-2))" tickFormatter={(val) => `${val}%`}/>
                           <Tooltip content={<ChartTooltipContent />} />
                           <Legend verticalAlign="top" />
                           <Bar yAxisId="left" dataKey="leads" name="Leads" fill="hsl(var(--primary))" radius={[4,4,0,0]}/>
                           <Bar yAxisId="right" dataKey="conversion" name="Conversion Rate (%)" fill="hsl(var(--chart-2))" radius={[4,4,0,0]}/>
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle className="font-headline">Response Time Analysis</CardTitle></CardHeader>
                    <CardContent className="flex flex-col items-center justify-center h-[300px] text-center">
                        <KpiCard title="Avg. First Response" value="2h 15m" icon={TrendingUp} trend="-10m vs last week" trendDirection="down" />
                        <p className="text-sm text-muted-foreground mt-4">Faster response times significantly improve conversion.</p>
                    </CardContent>
                </Card>
             </div>
          </div>
        </TabsContent>

        {/* MarketIntel™ Tab (Placeholder) */}
        <TabsContent value="market-intel" className="mt-0">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center"><Map className="mr-2 h-5 w-5 text-primary" /> MarketIntel™ Dashboard</CardTitle>
              <CardDescription>Interactive market map and predictive analytics. (Coming Soon)</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex flex-col items-center justify-center text-center">
              <Layers className="h-16 w-16 text-primary/30 mb-4" />
              <p className="text-lg font-semibold text-muted-foreground">Market Map & Predictions</p>
              <p className="text-sm text-muted-foreground">
                Visualize price heatmaps, demand hotspots, and AI-powered growth forecasts. This section is under active development.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Valuation Tools Tab (Placeholder) */}
        <TabsContent value="valuation-tools" className="mt-0">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center"><Calculator className="mr-2 h-5 w-5 text-primary" /> TerraValuate™ Tools</CardTitle>
              <CardDescription>On-demand AVM and CMA report builder. (Coming Soon)</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex flex-col items-center justify-center text-center">
              <FileText className="h-16 w-16 text-primary/30 mb-4" />
              <p className="text-lg font-semibold text-muted-foreground">AVM & CMA Reports</p>
              <p className="text-sm text-muted-foreground">
                Generate instant property valuations and build professional CMA reports. This section is under active development.
              </p>
              <Button className="mt-4" onClick={() => alert("Navigate to /terravaluate page (mock)")}>Go to TerraValuate Pro Page</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// A simple DateRangePicker placeholder - in a real app, this would be a proper component
// For now, this is just illustrative. In a real scenario, you'd import a ready component.
interface DateRange {
  from?: Date;
  to?: Date;
}
interface DateRangePickerProps {
    initialDateFrom?: Date;
    initialDateTo?: Date;
    onUpdate: (values: { range: DateRange, rangeCompare?: DateRange }) => void;
    align?: "start" | "center" | "end";
    triggerClassName?: string;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onUpdate, align, triggerClassName, initialDateFrom, initialDateTo }) => {
    const [from, setFrom] = React.useState<Date | undefined>(initialDateFrom);
    const [to, setTo] = React.useState<Date | undefined>(initialDateTo);

    // Simplified: just a button to simulate picking a range
    const handlePickRange = () => {
        const newFrom = new Date(2024, 0, 1); // Jan 1, 2024
        const newTo = new Date(2024, 0, 31); // Jan 31, 2024
        setFrom(newFrom);
        setTo(newTo);
        onUpdate({ range: { from: newFrom, to: newTo }});
    };

    return (
        <Button variant="outline" onClick={handlePickRange} className={triggerClassName}>
            {from && to ? `${from.toLocaleDateString()} - ${to.toLocaleDateString()}` : "Select Date Range"}
        </Button>
    );
};

    