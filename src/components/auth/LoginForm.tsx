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
import { Eye, EyeOff } from "lucide-react";
import Image from 'next/image';

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, "Password is required."),
});

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Login values:", values);
    toast({
      title: "Login Successful",
      description: "Welcome back!",
    });
    router.push("/dashboard");
  }

  return (
    <div className="w-full">
        <div className="text-left mb-8">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">WELCOME BACK</p>
            <h1 className="text-4xl font-bold font-headline text-foreground">Log in to your account.</h1>
            <p className="mt-2 text-muted-foreground">
                Need an account?{" "}
                <Link href="/register" className="font-semibold text-primary hover:underline">
                    Sign Up
                </Link>
            </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <div className="text-right">
                <Link href="#" className="text-sm font-medium text-primary hover:underline">
                    Forgot Password?
                </Link>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button type="button" variant="outline" className="w-full h-12 bg-muted hover:bg-muted/80 border-none">
                    <Image src="https://www.google.com/favicon.ico" alt="Google" width={20} height={20} className="mr-2"/>
                    Log in with Google
                </Button>
                <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-base" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Logging In..." : "Log In"}
                </Button>
            </div>
          </form>
        </Form>
    </div>
  );
}
