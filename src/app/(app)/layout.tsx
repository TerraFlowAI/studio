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
    loading: () => <div className="hidden md:block w-64 h-screen bg-sidebar" />
  }
);


export default function AppLayout({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const mounted = useMounted();

  // --- Route Protection Logic ---
  useEffect(() => {
    // If auth state is done loading and there is no user, redirect to login
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // While checking auth state or before the component has mounted, show a full-screen loader
  if (isLoading || !mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  // If there's a user, render the main app layout
  if (user) {
    return (
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <main className="relative flex flex-1 flex-col overflow-hidden bg-background">
          <AppHeader />
          <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </SidebarProvider>
    );
  }

  // If no user and not loading, render nothing (the useEffect will redirect)
  return null;
}
