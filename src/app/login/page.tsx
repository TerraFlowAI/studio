// src/app/login/page.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { AuthVisual } from '@/components/auth/AuthVisual';
import { Logo } from '@/components/shared/Logo';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Use Firebase to sign the user in
      await signInWithEmailAndPassword(auth, email, password);
      
      console.log("Successfully logged in");
      // Redirect to the dashboard after successful login
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
