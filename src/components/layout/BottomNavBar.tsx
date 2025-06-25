
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Briefcase, PlusCircle, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/properties", label: "Properties", icon: Briefcase },
  { href: "/smartflow", label: "SmartFlow", icon: Zap },
  { href: "/properties/new", label: "Add New", icon: PlusCircle },
];

export function BottomNavBar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-t-lg z-40 md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = (item.href === '/dashboard' && pathname === item.href) || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link href={item.href} key={item.href} className="flex flex-col items-center justify-center text-center w-full h-full">
              <Icon className={cn("h-6 w-6 mb-1 transition-colors", isActive ? "text-primary" : "text-muted-foreground")} />
              <span className={cn("text-xs transition-colors", isActive ? "text-primary font-semibold" : "text-muted-foreground")}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
