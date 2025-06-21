
// src/app/login/page.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { AuthVisual } from '@/components/auth/AuthVisual';
import { Logo } from '@/components/shared/Logo';
import { useToast } from '@/hooks/use-toast';

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Google</title>
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.854 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l-2.347 2.347c-.96-.96-2.267-1.653-3.56-1.653-2.84 0-5.187 2.347-5.187 5.2 0 2.84 2.347 5.2 5.187 5.2 3.2 0 4.533-2.04 4.827-3.28H12.48z" />
    </svg>
);


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: "Login Successful", description: "Welcome back!" });
      router.push('/dashboard');
    } catch (error: any) {
      const friendlyError = "Invalid email or password. Please try again.";
      setError(friendlyError);
      toast({
          variant: "destructive",
          title: "Login Failed",
          description: friendlyError,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
        toast({ title: "Login Successful", description: "Welcome!" });
        router.push('/dashboard');
    } catch (error: any) {
        console.error("Error with Google Sign-In:", error);
        toast({
            variant: "destructive",
            title: "Google Sign-In Failed",
            description: "Could not sign in with Google. Please try again.",
        });
    } finally {
        setIsGoogleLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 min-h-screen">
       <div className="flex flex-col items-center justify-center p-8 bg-background">
        <div className="w-full max-w-sm">
           <div className="mb-8 text-center">
                <Logo size="lg" className="justify-center mb-2" />
                <h1 className="text-2xl font-bold">Welcome Back</h1>
                <p className="text-muted-foreground">Enter your credentials to access your account.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && <p className="text-destructive text-sm">{error}</p>}

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                 {isLoading ? <Loader2 className="animate-spin" /> : 'Log In'}
              </Button>
            </form>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>

            <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isGoogleLoading}>
                {isGoogleLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon className="mr-2 h-4 w-4" />}
                Google
            </Button>


             <p className="text-sm text-center text-muted-foreground mt-6">
              Need an account? <Link href="/signup" className="font-semibold text-primary hover:underline">Sign Up</Link>
            </p>
        </div>
      </div>
       <div className="hidden md:block">
        <AuthVisual />
      </div>
    </div>
  );
}
