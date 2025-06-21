
"use client";

import { AuthVisual } from "@/components/auth/AuthVisual";
import RegisterForm from "@/components/auth/RegisterForm";

export default function SignupPage() {
  return (
    <div className="grid md:grid-cols-2 min-h-screen">
      <div className="flex flex-col items-center justify-center p-8 bg-background">
        <div className="w-full max-w-sm">
          <RegisterForm />
        </div>
      </div>
      <div className="hidden md:block">
        <AuthVisual />
      </div>
    </div>
  );
}
