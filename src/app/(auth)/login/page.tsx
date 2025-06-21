import { LoginForm } from "@/components/auth/LoginForm";
import { AuthVisual } from "@/components/auth/AuthVisual";
import { Logo } from "@/components/shared/Logo";
import Link from 'next/link';

const AuthHeader = () => (
    <div className="absolute top-8 left-8 sm:left-12 flex items-center justify-between w-[calc(100%-4rem)] sm:w-auto z-20">
        <Link href="/">
            <Logo size="md" />
        </Link>
    </div>
);

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-background font-body">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Form Column */}
        <div className="flex flex-col justify-center items-center p-6 sm:p-12 relative">
           <AuthHeader />
           <div className="w-full max-w-sm">
             <LoginForm />
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
