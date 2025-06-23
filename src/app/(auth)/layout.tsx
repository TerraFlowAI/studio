import React from 'react';

// This layout applies to all auth pages like login and signup
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      {children}
    </main>
  );
}
