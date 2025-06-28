
"use client";

import * as React from "react";
import { Search, PanelLeft, Bell, LogOut, Settings, User as UserIcon, Upload, FileText, Share2, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSidebar } from '../ui/sidebar';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { useMounted } from '@/hooks/useMounted';
import { Logo } from "../ui/Logo";
import { useAuth } from "@/app/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DateRangePicker, type DateRange } from "@/components/shared/DateRangePicker";


export function AppHeader() {
  const { toggleSidebar, isMobile } = useSidebar();
  const mounted = useMounted();
  const { user } = useAuth();
  const router = useRouter();

  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
      from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      to: new Date(),
  });

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };


  return (
    <header className="flex h-16 md:h-20 items-center gap-4 border-b bg-card px-4 md:px-8 sticky top-0 z-30 shadow-sm">
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
      
      <div className="flex-1 flex justify-center md:justify-start">
        <div className="md:hidden">
          <Logo href="/dashboard" />
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4 ml-auto">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 pr-3 py-2 h-10 w-full sm:w-64 md:w-72 rounded-lg bg-background border-border focus:border-primary"
          />
        </div>

        <div className="hidden md:flex items-center gap-2">
            <DateRangePicker
                initialDateFrom={dateRange?.from}
                initialDateTo={dateRange?.to}
                onUpdate={(values) => setDateRange(values.range)}
                triggerClassName="h-10"
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="h-10">
                        <Upload className="mr-2 h-4 w-4" /> Export
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => alert('Exporting as PDF...')}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Export as PDF</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => alert('Exporting as CSV...')}>
                        <FileSpreadsheet className="mr-2 h-4 w-4" />
                        <span>Export as CSV</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => alert('Sharing report...')}>
                        <Share2 className="mr-2 h-4 w-4" />
                        <span>Share Report</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

        {mounted && <ThemeToggle />}
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>

        {user && (
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User Avatar'} />
                  <AvatarFallback>
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : <UserIcon className="h-5 w-5"/>}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.displayName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
