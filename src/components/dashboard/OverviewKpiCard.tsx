
"use client";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface OverviewKpiCardProps {
  title: string;
  value: string;
  trend: string;
  trendColor: string;
  icon: LucideIcon;
}

export function OverviewKpiCard({ title, value, trend, trendColor, icon: Icon }: OverviewKpiCardProps) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 bg-card h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground mb-1">{value}</div>
        <div className="flex justify-between items-center">
          <p className={cn("text-xs", trendColor)}>
            {trend}
          </p>
          <Link href="#" className="text-xs text-primary hover:underline">View More</Link>
        </div>
      </CardContent>
    </Card>
  );
}
