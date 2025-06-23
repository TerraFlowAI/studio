
// src/app/(auth)/signup/page.tsx
import RegisterForm from "@/components/auth/RegisterForm";
import { AuthVisual } from "@/components/auth/AuthVisual";

export default function SignupPage() {
    return (
        <div className="grid md:grid-cols-2 min-h-screen">
            <div className="flex flex-col items-center justify-center p-8 bg-background">
                <div className="w-full max-w-md">
                   <RegisterForm />
                </div>
            </div>
            <div className="hidden md:block">
                 <AuthVisual />
            </div>
        </div>
    )
}
