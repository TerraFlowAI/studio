
"use client";

import { AuthVisual } from "@/components/auth/AuthVisual";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="grid md:grid-cols-2 min-h-screen">
      <div className="flex flex-col items-center justify-center p-8 bg-background">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
      <div className="hidden md:block">
        <AuthVisual />
      </div>
    </div>
  );
}
