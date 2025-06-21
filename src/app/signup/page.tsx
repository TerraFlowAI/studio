// src/app/signup/page.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/firebase'; // We are importing from the file we created
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Button } from '@/components/ui/button'; // Assuming you use shadcn/ui
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { AuthVisual } from '@/components/auth/AuthVisual';
import { Logo } from '@/components/shared/Logo';
import { useToast } from '@/hooks/use-toast';

export default function SignUpPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      // Use Firebase to create a new user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update the new user's profile with their full name
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`.trim()
      });

      console.log("Successfully created user:", user.uid);
      // Redirect the user to the dashboard after successful sign-up
      router.push('/dashboard');

    } catch (error: any) {
      let friendlyError = "An unexpected error occurred. Please try again.";
      if (error.code === 'auth/email-already-in-use') {
        friendlyError = "This email address is already in use.";
      }
      setError(friendlyError);
      toast({
          variant: "destructive",
          title: "Sign-up Failed",
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
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-muted-foreground">Start your journey with TerraFlowAI.</p>
            </div>
            
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <Input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
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
                  placeholder="Password (min. 6 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && <p className="text-destructive text-sm">{error}</p>}

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : 'Create account'}
              </Button>
            </form>

            <p className="text-sm text-center text-muted-foreground mt-6">
              Already a Member? <Link href="/login" className="font-semibold text-primary hover:underline">Log In</Link>
            </p>
        </div>
      </div>
      <div className="hidden md:block">
        <AuthVisual />
      </div>
    </div>
  );
}
