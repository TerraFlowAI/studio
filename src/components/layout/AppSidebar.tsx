
"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  BarChart3,
  PenSquare,
  Zap,
  FileSignature,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import Image from 'next/image';

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard }, 
  { href: '/leads', label: 'Leads', icon: Users }, 
  { href: '/properties', label: 'Properties', icon: Briefcase }, 
  { href: '/analytics', label: 'Analytics', icon: BarChart3 }, 
  { href: '/terrascribe', label: 'TerraScribe', icon: PenSquare },
  { href: '/smartflow', label: 'SmartFlow', icon: Zap },
  { href: '/documents', label: 'Documents', icon: FileSignature }, 
];

export function AppSidebar() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar(); 
  const router = useRouter(); 

  return (
    <Sidebar 
        collapsible="icon" 
        variant="sidebar" 
        side="left" 
        className="border-r-0 shadow-md bg-sidebar text-sidebar-foreground"
        style={{width: '250px'}}
    >
      <SidebarHeader className="p-4 h-20 flex items-center border-b border-sidebar-border">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-lg font-bold text-primary-foreground">T</span>
          </div>
          <span className="text-xl font-bold text-foreground">TerraFlow</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1 p-3 mt-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href} className="mb-1">
              <Link href={item.href} asChild>
                <SidebarMenuButton
                  isActive={pathname === item.href || (item.href === '/dashboard' && pathname.startsWith('/overview'))}
                  tooltip={item.label}
                  onClick={() => setOpenMobile(false)}
                  className={cn(
                    "justify-start w-full h-11 px-3 rounded-lg text-sm",
                    (pathname === item.href || (item.href === '/dashboard' && pathname.startsWith('/overview')))
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className={cn("h-5 w-5 mr-3 shrink-0", 
                    (pathname === item.href || (item.href === '/dashboard' && pathname.startsWith('/overview')))
                       ? "text-primary-foreground"
                       : "text-sidebar-foreground group-hover:text-sidebar-accent-foreground"
                  )} />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
            <Image 
                src="https://placehold.co/40x40.png" 
                alt="User Avatar" 
                width={36} 
                height={36} 
                className="rounded-full"
                data-ai-hint="person avatar"
            />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
