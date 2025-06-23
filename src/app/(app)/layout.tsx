// src/app/(app)/layout.tsx
"use client";
import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { Loader2 } from 'lucide-react';
// Import your actual Sidebar and Header components here later
// import AppSidebar from '@/components/layout/AppSidebar';
// import AppHeader from '@/components/layout/AppHeader';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen">
      {/* Placeholder for AppSidebar component */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-slate-900">
        <p>Sidebar Area</p>
      </aside>
      <main className="flex-1 flex flex-col">
        {/* Placeholder for AppHeader component */}
        <header className="h-16 flex items-center justify-end p-4 border-b">
          <p>Header Area</p>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
