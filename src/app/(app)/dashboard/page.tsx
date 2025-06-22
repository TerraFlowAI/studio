// src/app/(app)/dashboard/page.tsx
"use client";

import { useAuth } from "@/app/context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-4">Welcome to TerraFlow, {user?.displayName || 'User'}!</p>
      <p>Your email is: {user?.email}</p>
    </div>
  );
}
