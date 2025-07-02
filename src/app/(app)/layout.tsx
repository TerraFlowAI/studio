
"use client";
import React, { ReactNode, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { Loader2 } from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { SidebarProvider } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { BottomNavBar } from '@/components/layout/BottomNavBar';

const AppSidebar = dynamic(() => 
  import('@/components/layout/AppSidebar').then(mod => mod.AppSidebar), 
  { 
    ssr: false,
    loading: () => <Skeleton className="hidden md:block w-64 h-screen" />
  }
);


export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  
  const isBuilderPage = pathname.startsWith('/smartflow/new');

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <SidebarProvider>
        {/* The h-screen on the grid container is the key fix */}
        <div className="grid grid-cols-[auto_1fr] h-screen w-screen bg-muted/40 dark:bg-slate-950">
            {/* Column 1: Sidebar */}
            <AppSidebar />
            
            {/* Column 2: Main Content Area (This column will scroll) */}
            <div className="flex flex-col overflow-y-auto">
                <AppHeader /> {/* Header is sticky inside this scrolling container */}
                <main className={cn(
                  "flex-grow", // Use flex-grow to ensure it takes up remaining space in the flex column
                  !isBuilderPage && "p-4 md:p-6 lg:p-8",
                  "pb-20 md:pb-8" // Add padding to the bottom to avoid being obscured by the BottomNavBar on mobile
                )}>
                    {children}
                </main>
                <BottomNavBar /> {/* Fixed positioning, will overlay content on mobile */}
            </div>
        </div>
    </SidebarProvider>
  );
}
