
"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface SalesStatisticsCardProps {
  chartData: {
    labels: string[];
    datasets: Array<{ data: number[]; color: string; name?: string }>;
  };
}

export function SalesStatisticsCard({ chartData }: SalesStatisticsCardProps) {
  const dataForChart = chartData.labels.map((label, index) => {
    const entry: { name: string; [key: string]: any } = { name: label };
    chartData.datasets.forEach((dataset, i) => {
      entry[`line${i + 1}`] = dataset.data[index];
    });
    return entry;
  });
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/80 backdrop-blur-sm p-3 rounded-md shadow-lg border border-border">
          <p className="label text-sm font-medium text-foreground">{`${label}`}</p>
          {payload.map((pld: any, index: number) => (
            <div key={index} style={{ color: pld.stroke }} className="text-xs">
              {`${chartData.datasets[index]?.name || `Series ${index + 1}`}: ₹${pld.value.toLocaleString()}`}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };


  return (
    <Card className="shadow-lg bg-card h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle className="text-xl font-semibold font-headline text-foreground">Sales Statistics</CardTitle>
        </div>
        <Button variant="outline" size="sm" className="text-muted-foreground hover:text-foreground hover:border-primary/50">
          Last 6 months <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full mb-6 -ml-4">
           <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dataForChart} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(value) => `₹${value/1000}k`} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{stroke: 'hsl(var(--primary))', strokeWidth:1, strokeDasharray: "3 3"}}/>
              {chartData.datasets.map((dataset, index) => (
                <Line 
                  key={index} 
                  type="monotone" 
                  dataKey={`line${index + 1}`} 
                  stroke={dataset.color} 
                  strokeWidth={2.5} 
                  dot={{ r: 4, fill: dataset.color, strokeWidth:0 }}
                  activeDot={{ r: 6, fill: dataset.color, stroke: 'hsl(var(--background))', strokeWidth: 2 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
