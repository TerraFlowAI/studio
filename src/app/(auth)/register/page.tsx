import { RegisterForm } from "@/components/auth/RegisterForm";
import { Logo } from "@/components/shared/Logo";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-background to-background p-4">
      <div className="absolute top-6 left-6">
        <Link href="/">
         <Logo size="md" />
        </Link>
      </div>
      <RegisterForm />
      <p className="mt-8 text-center text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">
          &larr; Back to Home
        </Link>
      </p>
    </div>
  );
}
