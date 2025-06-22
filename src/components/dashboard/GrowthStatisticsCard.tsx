
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReceiptText, Wallet, Coins } from "lucide-react";

interface GrowthStatisticsCardProps {
  totalSales: string;
  totalProfit: string;
  totalCost: string;
}

export function GrowthStatisticsCard({ totalSales, totalProfit, totalCost }: GrowthStatisticsCardProps) {
  return (
    <Card className="shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold font-headline text-foreground">Growth Statistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border">
          <div className="p-2 bg-primary/10 rounded-md">
            <ReceiptText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total Sales</p>
            <p className="text-md font-semibold text-foreground">{totalSales}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border">
          <div className="p-2 bg-green-500/10 rounded-md">
            <Wallet className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total Profit</p>
            <p className="text-md font-semibold text-foreground">{totalProfit}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border">
          <div className="p-2 bg-orange-500/10 rounded-md">
            <Coins className="h-5 w-5 text-orange-500" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total Cost</p>
            <p className="text-md font-semibold text-foreground">{totalCost}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
