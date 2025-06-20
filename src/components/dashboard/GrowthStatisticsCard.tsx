
"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, TrendingUp } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

interface GrowthStatisticsCardProps {
  totalRevenue: string;
  chartData: {
    labels: string[];
    residential: number[];
    commercial: number[];
  };
}

export function GrowthStatisticsCard({ totalRevenue, chartData }: GrowthStatisticsCardProps) {
  const dataForChart = chartData.labels.map((label, index) => ({
    name: label,
    residential: chartData.residential[index],
    commercial: chartData.commercial[index],
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/80 backdrop-blur-sm p-3 rounded-md shadow-lg border border-border">
          <p className="label text-sm font-medium text-foreground">{`${label}`}</p>
          <p className="text-xs" style={{ color: 'hsl(var(--chart-1))' }}>{`Residential: ₹${payload[0].value}k`}</p>
          <p className="text-xs" style={{ color: 'hsl(var(--chart-2))' }}>{`Commercial: ₹${payload[1].value}k`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-md bg-card h-full">
      <CardHeader className="flex flex-row items-start justify-between pb-4">
        <div>
          <CardTitle className="text-xl font-semibold text-foreground">Growth Statistics</CardTitle>
          <p className="text-3xl font-bold text-foreground mt-1">{totalRevenue}</p>
        </div>
        <Button variant="outline" size="sm" className="text-muted-foreground hover:text-foreground hover:border-primary/50">
          Yearly <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] w-full -ml-4"> {/* Added -ml-4 to offset default recharts padding */}
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataForChart} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={{ stroke: 'hsl(var(--border))' }} tickLine={{ stroke: 'hsl(var(--border))' }} />
              <YAxis tickFormatter={(value) => `₹${value}k`} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={{ stroke: 'hsl(var(--border))' }} tickLine={{ stroke: 'hsl(var(--border))' }} />
              <Tooltip content={<CustomTooltip />} cursor={{fill: 'hsl(var(--accent)/0.1)'}}/>
              <Legend 
                verticalAlign="top" 
                align="right" 
                height={36} 
                iconSize={10}
                wrapperStyle={{ fontSize: '12px', color: 'hsl(var(--muted-foreground))' }}
                formatter={(value, entry) => <span style={{ color: 'hsl(var(--muted-foreground))' }}>{value === 'residential' ? 'Residential Projects' : 'Commercial Projects'}</span>}
              />
              <Bar dataKey="residential" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} barSize={12} />
              <Bar dataKey="commercial" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} barSize={12} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
