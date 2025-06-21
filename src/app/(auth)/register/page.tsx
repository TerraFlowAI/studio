import { RegisterForm } from "@/components/auth/RegisterForm";
import { AuthVisual } from "@/components/auth/AuthVisual";
import { Logo } from "@/components/shared/Logo";
import Link from 'next/link';

const AuthHeader = () => (
    <div className="absolute top-8 left-8 sm:left-12 flex items-center justify-between w-[calc(100%-4rem)] sm:w-auto z-20">
        <Link href="/">
            <Logo size="md" />
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
             <Link href="/login" className="text-muted-foreground hover:text-primary transition-colors">Log In</Link>
        </nav>
    </div>
);

export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full bg-background font-body">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Form Column */}
        <div className="flex flex-col justify-center items-center p-6 sm:p-12 relative">
           <AuthHeader />
           <div className="w-full max-w-sm">
             <RegisterForm />
           </div>
        </div>
        
        {/* Visual Column */}
        <div className="hidden lg:block relative">
           <AuthVisual />
        </div>
      </div>
    </div>
  );
}
