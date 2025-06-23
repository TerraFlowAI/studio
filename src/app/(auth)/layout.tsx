// src/app/(auth)/layout.tsx
import React from 'react';
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      {children}
    </main>
  );
}
