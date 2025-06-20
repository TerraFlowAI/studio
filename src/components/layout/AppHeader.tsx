
"use client";

import { CalendarDays, Upload, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSidebar } from '../ui/sidebar'; // Keep if sidebar toggle is needed on mobile
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'; // Keep for mobile nav
import { PanelLeft } from 'lucide-react'; // For mobile sidebar toggle

export function AppHeader() {
  const { toggleSidebar, isMobile } = useSidebar();

  return (
    <header className="flex h-20 items-center gap-4 border-b bg-card px-6 md:px-8 sticky top-0 z-30 shadow-sm">
      {isMobile && (
        <Button
            variant="ghost"
            size="icon"
            className="shrink-0 md:hidden -ml-2 mr-2 text-muted-foreground"
            onClick={toggleSidebar}
          >
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
        </Button>
      )}
      
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-foreground">Overview</h1>
      </div>
      
      <div className="flex items-center gap-3 md:gap-4">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search property, lead, or document..."
            className="pl-10 pr-3 py-2 h-10 w-full sm:w-64 md:w-72 rounded-lg bg-background border-border focus:border-primary"
          />
        </div>
        <Button variant="outline" className="h-10 hidden md:flex items-center gap-2 text-muted-foreground hover:text-foreground hover:border-primary/50">
          <CalendarDays className="h-4 w-4" />
          <span>May 5 - June 5, 24</span>
        </Button>
        <Button className="h-10 flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
          <Upload className="h-4 w-4" />
          <span className="hidden sm:inline">Export Report</span>
        </Button>
      </div>
    </header>
  );
}
