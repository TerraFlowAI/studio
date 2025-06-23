
"use client";

import * as React from "react";
import { Search, PanelLeft, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSidebar } from '../ui/sidebar';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { useMounted } from '@/hooks/useMounted';

export function AppHeader() {
  const { toggleSidebar, isMobile } = useSidebar();
  const mounted = useMounted();

  return (
    <header className="flex h-20 items-center gap-4 border-b bg-card px-6 md:px-8 sticky top-0 z-30 shadow-sm">
      {mounted && isMobile && (
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
        {/* Page title can be managed here via context or state in a future step */}
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 pr-3 py-2 h-10 w-full sm:w-64 md:w-72 rounded-lg bg-background border-border focus:border-primary"
          />
        </div>
        {mounted && <ThemeToggle />}
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
      </div>
    </header>
  );
}
