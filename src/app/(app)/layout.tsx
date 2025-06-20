
import { AppHeader } from "@/components/layout/AppHeader";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar"; // Removed SidebarInset import

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}> {/* This renders a div with flex min-h-svh w-full */}
      <AppSidebar /> {/* Sidebar component */}
      {/* Main content area, takes remaining width and handles its own scrolling */}
      <main className="relative flex flex-1 flex-col overflow-hidden bg-background">
        <AppHeader /> {/* Sticky header within this main area */}
        {/* Scrollable content div */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
