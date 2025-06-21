import { AuthVisual } from "@/components/auth/AuthVisual";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid md:grid-cols-2 min-h-screen">
      <div className="flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-sm">
          {children}
        </div>
      </div>
      <div className="hidden md:block">
        <AuthVisual />
      </div>
    </div>
  );
}
