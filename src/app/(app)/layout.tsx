// src/app/(app)/layout.tsx
"use client";

import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { AppHeader } from "@/components/layout/AppHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Loader2 } from 'lucide-react';
import { useMounted } from '@/hooks/useMounted';
import dynamic from 'next/dynamic';

// Dynamically import AppSidebar with SSR disabled to prevent hydration errors.
const AppSidebar = dynamic(
  () => import('@/components/layout/AppSidebar').then((mod) => mod.AppSidebar),
  { 
    ssr: false,
    // Provide a loading component that matches the default sidebar width to prevent layout shift.
    loading: () => <div className="hidden md:flex flex-col w-64 h-screen bg-white dark:bg-slate-900" />
  }
);

export default function AppLayout({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const isMounted = useMounted();

  useEffect(() => {
    // Wait until the component is mounted and auth state is determined
    if (isMounted && !isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router, isMounted]);

  // While loading or if the user is not authenticated, show a loader.
  // This prevents a flash of the dashboard content before redirection.
  if (!isMounted || isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="h-10 w-10 animate-spin text-teal-500" />
      </div>
    );
  }
  
  // Once authenticated, render the full dashboard layout.
  return (
    <SidebarProvider>
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <AppHeader />
            <main className="flex-1 p-4 sm:p-6 lg:p-8">
              {children}
            </main>
          </div>
        </div>
    </SidebarProvider>
  );
}
