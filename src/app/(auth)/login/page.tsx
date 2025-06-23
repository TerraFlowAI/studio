// src/app/(auth)/login/page.tsx
import LoginForm from "@/components/auth/LoginForm";
import { AuthVisual } from "@/components/auth/AuthVisual";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="grid md:grid-cols-2 min-h-screen">
            <div className="relative flex flex-col items-center justify-center p-8 bg-background">
                <Button asChild variant="ghost" className="absolute top-6 left-6 text-muted-foreground hover:text-primary">
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>
                </Button>
                <div className="w-full max-w-md">
                   <LoginForm />
                </div>
            </div>
            <div className="hidden md:block">
                <AuthVisual />
            </div>
        </div>
    );
}
