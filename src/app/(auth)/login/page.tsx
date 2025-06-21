
"use client";

import { motion } from "framer-motion";
import { LoginForm } from "@/components/auth/LoginForm";
import { AuthVisual } from "@/components/auth/AuthVisual";
import { Logo } from "@/components/shared/Logo";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <motion.div 
      className="min-h-screen w-full bg-background font-body"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      
      <Button asChild variant="ghost" className="absolute top-8 left-4 sm:left-8 z-20 text-muted-foreground hover:text-primary">
          <Link href="/">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Home
          </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Form Column */}
        <div className="flex flex-col justify-center items-center p-6 sm:p-12 relative">
           
           <div className="w-full max-w-sm">
             <div className="flex justify-center mb-8">
                <Link href="/">
                    <Logo size="lg" />
                </Link>
             </div>
             <LoginForm />
           </div>
        </div>
        
        {/* Visual Column */}
        <div className="hidden lg:block relative">
           <AuthVisual />
        </div>
      </div>
    </motion.div>
  );
}
