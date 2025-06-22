// src/components/properties/detail/ListingPerformanceCard.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Eye, Users, Percent, TrendingUp, Calculator, LineChart as LineChartIcon } from "lucide-react"; // Added LineChartIcon for config
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface ViewHistoryPoint {
  date: string; // e.g., "2024-07-26"
  views: number;
}

interface ListingPerformanceCardProps {
  views: number;
  leads: number;
  ctr: number; // Click-through rate as a percentage
  viewHistory: ViewHistoryPoint[];
  aiPriceAnalysis: string;
}

const chartConfig = {
  views: {
    label: "Views",
    color: "hsl(var(--primary))",
    icon: LineChartIcon,
  },
} satisfies ChartConfig;


export function ListingPerformanceCard({
  views,
  leads,
  ctr,
  viewHistory,
  aiPriceAnalysis,
}: ListingPerformanceCardProps) {

  const chartData = viewHistory.map(item => ({
    name: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    views: item.views
  }));

  return (
    <Card className="shadow-lg bg-card">
      <CardHeader>
        <CardTitle className="font-headline text-lg text-primary">Performance Analytics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <Eye className="h-5 w-5 text-primary mx-auto mb-1" />
            <p className="text-xl font-bold text-foreground">{views.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Total Views</p>
          </div>
          <div>
            <Users className="h-5 w-5 text-primary mx-auto mb-1" />
            <p className="text-xl font-bold text-foreground">{leads}</p>
            <p className="text-xs text-muted-foreground">Leads</p>
          </div>
          <div>
            <Percent className="h-5 w-5 text-primary mx-auto mb-1" />
            <p className="text-xl font-bold text-foreground">{ctr}%</p>
            <p className="text-xs text-muted-foreground">CTR</p>
          </div>
        </div>

        <div className="h-[150px] w-full">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltipContent indicator="dot" />} cursor={{stroke: 'hsl(var(--primary))', strokeWidth:1, strokeDasharray: "3 3"}}/>
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="var(--color-views)" // Use color from chartConfig
                  strokeWidth={2}
                  dot={{ r: 3, fill: 'var(--color-views)', strokeWidth:0 }}
                  activeDot={{ r: 5, fill: 'var(--color-views)', stroke: 'hsl(var(--background))', strokeWidth: 1 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-center text-primary mb-1.5">
            <Calculator className="h-4 w-4 mr-2" />
            <h4 className="font-semibold text-sm">TerraValuate™ AI Insight</h4>
          </div>
          <p className="text-xs text-muted-foreground">{aiPriceAnalysis}</p>
        </div>
      </CardContent>
    </Card>
  );
}
