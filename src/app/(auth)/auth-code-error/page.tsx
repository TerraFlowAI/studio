// src/app/(auth)/auth-code-error/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function AuthErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
      <Card className="w-full max-w-md mx-4 shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto bg-destructive/10 p-3 rounded-full w-fit">
             <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="mt-4 text-2xl font-bold">Authentication Error</CardTitle>
          <CardDescription>There was a problem signing you in.</CardDescription>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground text-sm space-y-4">
            <p>
                We couldn't sign you in with your chosen provider. This can happen for a number of reasons. Please try again.
            </p>
            <p>
                If the problem persists, please contact support.
            </p>
            <Button asChild className="w-full">
                <Link href="/login">
                    Return to Login
                </Link>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
