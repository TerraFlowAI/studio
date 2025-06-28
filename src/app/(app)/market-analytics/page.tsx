
"use client"; // Add this directive

import * as React from "react";
import type { DateRange } from "react-day-picker";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, TrendingUp, Upload, FileText, Share2, FileSpreadsheet } from "lucide-react"; 
import { ResponsiveContainer, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Line, ComposedChart } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart"; 
import { DateRangePicker } from "@/components/shared/DateRangePicker";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


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
} satisfies ChartConfig;


export default function MarketAnalyticsPage() {
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
        from: new Date(new Date().setMonth(new Date().getMonth() - 6)),
        to: new Date(),
    });

  return (
    <div className="container mx-auto">
      <PageHeader 
        title="Predictive Market Analytics" 
        description="Forecast market trends, buyer behavior, and investment risks to guide smarter decisions." 
      >
        <div className="flex items-center gap-2">
            <DateRangePicker
                initialDateFrom={dateRange?.from}
                initialDateTo={dateRange?.to}
                onUpdate={(values) => setDateRange(values.range)}
                triggerClassName="h-10"
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="h-10 bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Upload className="mr-2 h-4 w-4" /> Export Report
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => alert('Exporting as PDF...')}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Export as PDF</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => alert('Exporting as CSV...')}>
                        <FileSpreadsheet className="mr-2 h-4 w-4" />
                        <span>Export as CSV</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => alert('Sharing report...')}>
                        <Share2 className="mr-2 h-4 w-4" />
                        <span>Share Report</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </PageHeader>

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

// Dummy components for Chart, assuming they are available as per Shadcn UI
const Users = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const ShieldAlert = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>;
