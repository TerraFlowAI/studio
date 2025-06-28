
"use client";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface GrowthChartPoint {
  month: string;
  sale: number;
  rent: number;
}

interface GrowthStatisticsCardProps {
  totalRevenue: string;
  monthlyData: GrowthChartPoint[];
}

const chartConfig = {
  sale: { label: "Property Sale", color: "hsl(var(--primary))" },
  rent: { label: "Property Rent", color: "hsl(var(--accent))" },
};

type TimeRange = "quarterly" | "yearly";

export function GrowthStatisticsCard({ totalRevenue, monthlyData }: GrowthStatisticsCardProps) {
  const [timeRange, setTimeRange] = React.useState<TimeRange>("yearly");

  const chartData = React.useMemo(() => {
    if (timeRange === 'quarterly') {
      const quarterlyData: { name: string; sale: number; rent: number }[] = [
        { name: 'Q1', sale: 0, rent: 0 },
        { name: 'Q2', sale: 0, rent: 0 },
        { name: 'Q3', sale: 0, rent: 0 },
        { name: 'Q4', sale: 0, rent: 0 },
      ];
      monthlyData.forEach((monthData, index) => {
        const quarterIndex = Math.floor(index / 3);
        if (quarterlyData[quarterIndex]) {
            quarterlyData[quarterIndex].sale += monthData.sale;
            quarterlyData[quarterIndex].rent += monthData.rent;
        }
      });
      return quarterlyData;
    }
    // Yearly view (all months)
    return monthlyData.map(d => ({ name: d.month, sale: d.sale, rent: d.rent }));
  }, [monthlyData, timeRange]);
  
  return (
    <Card className="shadow-lg bg-card h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="grid gap-0.5">
            <CardTitle className="text-xl font-semibold font-headline text-foreground">Growth Statistics</CardTitle>
            <CardDescription>Total Revenue</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs shrink-0 capitalize">
                {timeRange} <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => setTimeRange("quarterly")}>Quarterly</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setTimeRange("yearly")}>Yearly</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-baseline gap-2 pt-2">
            <p className="text-3xl font-bold text-foreground">{totalRevenue}</p>
            <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                <ArrowUpRight className="h-4 w-4" />
                <span>12%</span>
            </div>
        </div>
      </CardHeader>
      <CardContent className="h-[250px] w-full pt-4">
        <ChartContainer config={chartConfig} className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} barCategoryGap="20%">
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `₹${value / 1000}k`} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                    <Tooltip
                        cursor={{ fill: 'hsl(var(--accent))', radius: 4 }}
                        content={<ChartTooltipContent />}
                    />
                    <Legend content={({ payload }) => (
                      <div className="flex justify-center items-center gap-4 mt-4 text-xs">
                        {payload?.map((entry, index) => (
                          <div key={`item-${index}`} className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }}></div>
                            <span>{entry.value}</span>
                          </div>
                        ))}
                      </div>
                    )} />
                    <Bar dataKey="sale" fill="var(--color-sale)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="rent" fill="var(--color-rent)" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
