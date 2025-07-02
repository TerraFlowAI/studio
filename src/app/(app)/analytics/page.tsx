
"use client"; // Add this directive

import * as React from "react";
import Link from 'next/link';
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, TrendingUp, Users, ShieldAlert, Eye, Filter, PieChart as PieChartIcon, Building } from "lucide-react"; 
import { ResponsiveContainer, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Line, ComposedChart, FunnelChart, Funnel, LabelList, PieChart, Pie, Cell } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const chartData = [
  { month: "Jan", sales: 65, forecast: 70, price: 450000 },
  { month: "Feb", sales: 59, forecast: 65, price: 455000 },
  { month: "Mar", sales: 80, forecast: 78, price: 460000 },
  { month: "Apr", sales: 81, forecast: 82, price: 465000 },
  { month: "May", sales: 56, forecast: 60, price: 470000 },
  { month: "Jun", sales: 55, forecast: 58, price: 468000 },
  { month: "Jul", sales: 40, forecast: 45, price: 460000 },
];

const chartConfig = {
  sales: { label: "Actual Sales", color: "hsl(var(--primary))", icon: BarChart },
  forecast: { label: "Forecasted Sales", color: "hsl(var(--accent))", icon: LineChart },
  price: { label: "Avg. Price", color: "hsl(var(--secondary-foreground))", icon: TrendingUp },
  leads: { label: "Leads", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig;

const funnelData = [
  { value: 1200, name: 'New Leads', fill: 'hsl(var(--chart-5))' },
  { value: 950, name: 'Contacted', fill: 'hsl(var(--chart-4))' },
  { value: 600, name: 'Qualified', fill: 'hsl(var(--chart-3))' },
  { value: 350, name: 'Viewing Scheduled', fill: 'hsl(var(--chart-2))' },
  { value: 150, name: 'Offer Made', fill: 'hsl(var(--chart-1))' },
];

const topListingsData = [
    { id: '1', title: 'Luxury 3BHK with Sea View', views: 1250, leads: 45, conversionRate: 3.6 },
    { id: '6', title: 'Penthouse with Rooftop Garden', views: 1800, leads: 35, conversionRate: 1.9 },
    { id: '2', title: 'Spacious 4BHK Villa', views: 800, leads: 22, conversionRate: 2.8 },
    { id: '3', title: '2BHK Apartment for Rent', views: 2100, leads: 88, conversionRate: 4.2 },
];

const leadSourceData = [
  { name: 'Website Chatbot', value: 400, fill: 'hsl(var(--chart-1))' },
  { name: 'Social Media', value: 300, fill: 'hsl(var(--chart-2))' },
  { name: 'Property Listing', value: 250, fill: 'hsl(var(--chart-3))' },
  { name: 'Referral', value: 200, fill: 'hsl(var(--chart-4))' },
  { name: 'Google Ads', value: 150, fill: 'hsl(var(--chart-5))' },
];

const propertyTypeData = [
    { name: 'Apartment', leads: 450 },
    { name: 'Villa', leads: 200 },
    { name: 'House', leads: 150 },
    { name: 'Commercial', leads: 80 },
    { name: 'Land', leads: 30 },
];


export default function MarketAnalyticsPage() {
  return (
    <div className="container mx-auto">
      <PageHeader 
        title="Predictive Market Analytics" 
        description="Forecast market trends, buyer behavior, and investment risks to guide smarter decisions." 
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Market Trend</CardTitle>
            <TrendingUp className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Upward</div>
            <p className="text-xs text-muted-foreground">Projected 3% increase in prices next quarter.</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Buyer Demand</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">High</div>
            <p className="text-xs text-muted-foreground">Strong interest in 2-3 bedroom properties.</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Investment Risk</CardTitle>
            <ShieldAlert className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">Moderate</div>
            <p className="text-xs text-muted-foreground">Monitor interest rate fluctuations.</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Sales &amp; Pricing Trends</CardTitle>
          <CardDescription>Monthly sales data and average pricing forecast.</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px] p-0">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" tickLine={false} axisLine={false} />
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--secondary-foreground))" tickLine={false} axisLine={false} 
                  tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
                />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="sales" fill="hsl(var(--primary))" radius={4} yAxisId="left" />
                <Line type="monotone" dataKey="forecast" stroke="hsl(var(--accent))" strokeWidth={2} yAxisId="left" dot={false} />
                <Line type="monotone" dataKey="price" stroke="hsl(var(--secondary-foreground))" strokeWidth={2} yAxisId="right" dot={{r:4}} />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 mt-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Lead Conversion Funnel</CardTitle>
            <CardDescription>From initial contact to offer made.</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] w-full p-0">
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart>
                <Tooltip />
                <Funnel
                  dataKey="value"
                  data={funnelData}
                  isAnimationActive
                >
                  <LabelList position="right" fill="hsl(var(--foreground))" stroke="none" dataKey="name" className="text-xs"/>
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Top Performing Listings</CardTitle>
            <CardDescription>Properties generating the most engagement.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Listing</TableHead>
                  <TableHead className="text-right">Views</TableHead>
                  <TableHead className="text-right">Leads</TableHead>
                  <TableHead className="text-right">Conversion</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topListingsData.map((listing) => (
                  <TableRow key={listing.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <Link href={`/properties/${listing.id}`} className="hover:underline hover:text-primary transition-colors">
                        {listing.title}
                      </Link>
                    </TableCell>
                    <TableCell className="text-right">{listing.views.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{listing.leads}</TableCell>
                    <TableCell className="text-right">
                        <Badge variant="secondary" className="font-mono">{listing.conversionRate.toFixed(1)}%</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 mt-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center gap-2"><PieChartIcon className="text-primary"/> Lead Source Breakdown</CardTitle>
            <CardDescription>Where are your most valuable leads coming from?</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] w-full p-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                <Pie data={leadSourceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} labelLine={false} label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                    return (
                        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-xs font-bold">
                            {`${(percent * 100).toFixed(0)}%`}
                        </text>
                    );
                }}>
                  {leadSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center gap-2"><Building className="text-primary"/> Property Type Demand</CardTitle>
            <CardDescription>Which property types are generating the most leads?</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] w-full p-0">
            <ChartContainer config={chartConfig} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={propertyTypeData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" tickLine={false} axisLine={false} />
                        <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} />
                        <Tooltip content={<ChartTooltipContent />} cursor={{fill: 'hsl(var(--accent))'}} />
                        <Legend />
                        <Bar dataKey="leads" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8 shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">AI-Generated Insights</CardTitle>
          <CardDescription>Summary of key market predictions by TerraFlowAI.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <p><strong className="text-primary">Overall Outlook:</strong> The market shows strong signs of growth, particularly in suburban areas. Expect a seller's market to continue for the next 6 months.</p>
            <p><strong className="text-primary">Pricing Strategy:</strong> Consider pricing properties slightly above recent comps due to rising demand. Quick sales are likely for well-maintained homes.</p>
            <p><strong className="text-primary">Hot Segments:</strong> Townhouses and single-family homes with home offices are seeing the highest demand. Luxury apartment segment is cooling.</p>
            <p><strong className="text-primary">Potential Risks:</strong> Inflationary pressures could impact buyer affordability. Keep an eye on mortgage rate trends.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
