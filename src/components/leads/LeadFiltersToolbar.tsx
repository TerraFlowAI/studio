
"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, CalendarIcon, ListFilter, ChevronDown, Sparkles, Clock, Star } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { LEAD_STATUSES, LEAD_SOURCES, AI_SMART_VIEWS } from "@/lib/constants";
import type { LeadStatusId, LeadSourceId, AiSmartViewId } from "@/lib/constants";

export interface Filters {
  searchTerm: string;
  status: LeadStatusId[];
  source: LeadSourceId[];
  dateRange: DateRange;
  smartView: AiSmartViewId;
}

interface LeadFiltersToolbarProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export function LeadFiltersToolbar({ filters, onFiltersChange }: LeadFiltersToolbarProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(filters.dateRange);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, searchTerm: event.target.value });
  };

  const handleStatusChange = (statusId: LeadStatusId) => {
    const newStatus = filters.status.includes(statusId)
      ? filters.status.filter(s => s !== statusId)
      : [...filters.status, statusId];
    onFiltersChange({ ...filters, status: newStatus as LeadStatusId[], smartView: 'all' }); // Reset smart view if manual filters change
  };

  const handleSourceChange = (sourceId: LeadSourceId) => {
    const newSource = filters.source.includes(sourceId)
      ? filters.source.filter(s => s !== sourceId)
      : [...filters.source, sourceId];
    onFiltersChange({ ...filters, source: newSource as LeadSourceId[], smartView: 'all' }); // Reset smart view
  };

  const handleDateChange = (newDate: DateRange | undefined) => {
    setDate(newDate);
    if (newDate) {
      onFiltersChange({ ...filters, dateRange: newDate, smartView: 'all' }); // Reset smart view
    } else { // Handle clearing the date range
      onFiltersChange({ ...filters, dateRange: { from: undefined, to: undefined }, smartView: 'all' });
    }
  };
  
  const handleSmartViewChange = (smartViewId: AiSmartViewId) => {
     onFiltersChange({ 
       ...filters, 
       smartView: smartViewId, 
       // Reset other filters when a smart view is selected
       status: [], 
       source: [], 
       dateRange: {from: undefined, to: undefined} 
     });
     setDate(undefined); 
  };

  return (
    <div className="py-4 space-y-4 md:space-y-0 md:flex md:flex-wrap md:items-center md:justify-between md:gap-4 bg-card p-4 rounded-lg shadow-sm border">
      <div className="relative flex-grow md:max-w-md lg:max-w-lg">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, email, phone, or property of interest..."
          value={filters.searchTerm}
          onChange={handleSearchChange}
          className="pl-10 pr-3 py-2 h-10 rounded-md border"
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-10 border text-muted-foreground hover:border-primary/50">
              <ListFilter className="mr-2 h-4 w-4" /> Status <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {LEAD_STATUSES.map((status) => (
              <DropdownMenuCheckboxItem
                key={status.id}
                checked={filters.status.includes(status.id)}
                onCheckedChange={() => handleStatusChange(status.id)}
              >
                {status.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-10 border text-muted-foreground hover:border-primary/50">
               <ListFilter className="mr-2 h-4 w-4" /> Source <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Filter by Source</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {LEAD_SOURCES.map((source) => (
              <DropdownMenuCheckboxItem
                key={source.id}
                checked={filters.source.includes(source.id)}
                onCheckedChange={() => handleSourceChange(source.id)}
              >
                {source.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "h-10 w-full md:w-[260px] justify-start text-left font-normal border text-muted-foreground hover:border-primary/50",
                !date?.from && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Date Range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={handleDateChange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="flex flex-wrap items-center gap-2 pt-4 md:pt-0 md:border-l md:pl-4 md:ml-4">
        <span className="text-sm font-medium text-muted-foreground mr-2 whitespace-nowrap">AI Smart Views:</span>
        {AI_SMART_VIEWS.map((view) => (
          <Button
            key={view.id}
            variant={filters.smartView === view.id ? "default" : "outline"}
            size="sm"
            onClick={() => handleSmartViewChange(view.id)}
            className={cn(
              "h-9 text-xs sm:text-sm",
              filters.smartView === view.id 
                ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                : "border text-muted-foreground hover:border-primary/50 hover:bg-accent"
            )}
          >
            {view.id === 'hot' && '🔥 '}
            {view.id === 'new' && '🆕 '}
            {view.id === 'needs_attention' && <Clock className="mr-1.5 h-3.5 w-3.5" />}
            {view.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
