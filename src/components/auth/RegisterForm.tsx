"use client";
import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Image from 'next/image';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export function RegisterForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { firstName: "", lastName: "", email: "", password: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      await updateProfile(userCredential.user, {
        displayName: `${values.firstName} ${values.lastName}`
      });

      toast({
        title: "Account Created!",
        description: "Welcome to TerraFlowAI! Redirecting you to the dashboard.",
      });
      router.push("/dashboard");

    } catch (error: any) {
      console.error("Sign Up Error:", error);
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "This email is already in use. Please try another or log in.";
      }
      form.setError("root", { type: "manual", message: errorMessage });
    }
  }

  return (
    <div className="w-full max-w-md">
        <div className="text-left mb-8">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">START YOUR 14-DAY FREE TRIAL</p>
            <h1 className="text-4xl font-bold font-headline text-foreground">Create your TerraFlowAI account.</h1>
            <p className="mt-2 text-muted-foreground">
                Already a Member?{" "}
                <Link href="/login" className="font-semibold text-primary hover:underline">
                    Log In
                </Link>
            </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="firstName" render={({ field }) => (
                    <FormItem><FormControl><Input placeholder="First name" {...field} className="bg-muted border-none h-12" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="lastName" render={({ field }) => (
                     <FormItem><FormControl><Input placeholder="Last name" {...field} className="bg-muted border-none h-12" /></FormControl><FormMessage /></FormItem>
                )} />
            </div>

            <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem><FormControl><Input type="email" placeholder="Email" {...field} className="bg-muted border-none h-12" /></FormControl><FormMessage /></FormItem>
            )} />
            
            <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem>
                    <div className="relative">
                        <FormControl>
                            <Input type={showPassword ? "text" : "password"} placeholder="Password" {...field} className="bg-muted border-none h-12 pr-10" />
                        </FormControl>
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-primary">
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                    <FormMessage />
                </FormItem>
            )} />
            
            {form.formState.errors.root && (
              <p className="text-sm font-medium text-destructive text-center">{form.formState.errors.root.message}</p>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button type="button" variant="outline" className="w-full h-12 bg-muted hover:bg-muted/80 border-none">
                    <Image src="https://www.google.com/favicon.ico" alt="Google" width={20} height={20} className="mr-2"/>
                    Sign up with Google
                </Button>
                <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-base" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                    {form.formState.isSubmitting ? "Creating..." : "Create account"}
                </Button>
            </div>
          </form>
        </Form>
    </div>
  );
}
