// src/components/shared/DateRangePicker.tsx
"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  initialDateFrom?: Date;
  initialDateTo?: Date;
  onUpdate?: (values: { range: DateRange; rangeCompare?: DateRange }) => void;
  align?: "start" | "center" | "end";
  locale?: string;
  showCompare?: boolean;
  triggerClassName?: string;
}

export function DateRangePicker({
  initialDateFrom,
  initialDateTo,
  onUpdate,
  align = "end",
  locale = "en-US", // Default locale
  showCompare = false, // Simplified: compare functionality not fully implemented here
  className,
  triggerClassName,
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: initialDateFrom,
    to: initialDateTo,
  });
  const [compareDate, setCompareDate] = React.useState<DateRange | undefined>(undefined); // Placeholder for compare

  // Call onUpdate when date changes
  React.useEffect(() => {
    if (date && onUpdate) {
      onUpdate({ range: date, rangeCompare: compareDate });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, compareDate]); // Consider if onUpdate should be a dependency

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-full sm:w-[260px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
              triggerClassName
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y", { locale: require(`date-fns/locale/${locale}`) })} -{" "}
                  {format(date.to, "LLL dd, y", { locale: require(`date-fns/locale/${locale}`) })}
                </>
              ) : (
                format(date.from, "LLL dd, y", { locale: require(`date-fns/locale/${locale}`) })
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align={align}>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
          {/* Placeholder for compare functionality if showCompare is true */}
          {/* {showCompare && ( ... UI for selecting compare date range ... )} */}
        </PopoverContent>
      </Popover>
    </div>
  );
}

// This type might be useful in other parts of the app.
export type { DateRange };
