
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/ui/Logo";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export default function RegisterForm() {
  const router = useRouter();
  const { supabase } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { firstName: "", lastName: "", email: "", password: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            display_name: `${values.firstName} ${values.lastName}`.trim(),
          }
        }
      });
      if (error) throw error;

      if (data.user) {
        // Best practice is to create the user profile via a Supabase DB trigger.
        // This client-side insert is a fallback to fulfill the user story.
        const { error: profileError } = await supabase
          .from('users')
          .insert({ 
              id: data.user.id, 
              display_name: `${values.firstName} ${values.lastName}`.trim(),
              email: values.email,
              role: 'customer',
              has_completed_onboarding: false 
          });

        if (profileError) throw profileError;
        
        // Refresh the page to update the auth state via the layout
        router.push("/dashboard");
        router.refresh();
      }

    } catch (error: any) {
      let description = "An unexpected error occurred. Please try again.";
      if (error.message.includes('User already registered')) {
        description = "This email address is already in use.";
      }
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="mb-8 text-center">
        <Logo href="/" className="justify-center mb-4" size={100} layout="vertical" />
        <h1 className="text-2xl font-bold">Create Your Account</h1>
        <p className="text-muted-foreground">Start your journey with TerraFlow.</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name="firstName" render={({ field }) => (
              <FormItem><FormLabel>First Name</FormLabel><FormControl><Input placeholder="John" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="lastName" render={({ field }) => (
              <FormItem><FormLabel>Last Name</FormLabel><FormControl><Input placeholder="Doe" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="name@example.com" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="password" render={({ field }) => (
            <FormItem><FormLabel>Password</FormLabel><FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : 'Create Account'}
          </Button>
        </form>
      </Form>
      <p className="text-sm text-center text-muted-foreground mt-6">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Sign In
        </Link>
      </p>
    </>
  );
}
