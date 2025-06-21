import { AuthVisual } from "@/components/auth/AuthVisual";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <div className="hidden lg:block">
        <AuthVisual />
      </div>
      <main className="flex items-center justify-center p-6 sm:p-8 bg-background">
        {children}
      </main>
    </div>
  );
}
