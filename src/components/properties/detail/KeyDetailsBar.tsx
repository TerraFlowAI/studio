
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BedDouble, Bath, Ruler, DollarSign } from "lucide-react"; 

interface KeyDetailItemProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
}

const DetailItem: React.FC<KeyDetailItemProps> = ({ icon: Icon, label, value }) => (
  <div className="flex flex-col items-center sm:items-start sm:flex-row sm:gap-2 text-center sm:text-left">
    <Icon className="h-5 w-5 text-primary mb-1 sm:mb-0" />
    <div>
      <p className="text-sm font-semibold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  </div>
);

interface KeyDetailsBarProps {
  price: string;
  beds: number;
  baths: number;
  sqft: number;
}

export function KeyDetailsBar({ price, beds, baths, sqft }: KeyDetailsBarProps) {
  return (
    <Card className="shadow-md bg-card">
      <CardContent className="p-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-center justify-around">
          <DetailItem icon={DollarSign} label="Price" value={price} />
          <DetailItem icon={BedDouble} label="Beds" value={beds} />
          <DetailItem icon={Bath} label="Baths" value={baths} />
          <DetailItem icon={Ruler} label="Area" value={`${sqft.toLocaleString()} sqft`} />
        </div>
      </CardContent>
    </Card>
  );
}
