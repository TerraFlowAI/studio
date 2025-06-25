
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
        <div className="flex min-h-screen bg-muted/40 dark:bg-slate-950">
            <AppSidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
                <AppHeader />
                <main className={cn(
                  "flex-1 overflow-y-auto pb-20 md:pb-0", // Padding bottom for mobile bottom nav
                  !isBuilderPage && "p-4 md:p-6 lg:p-8"
                )}>
                    {children}
                </main>
                <BottomNavBar />
            </div>
        </div>
    </SidebarProvider>
  );
}
