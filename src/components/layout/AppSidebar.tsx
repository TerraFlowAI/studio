
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Removed useRouter as it's not used
import {
  LayoutDashboard,
  Users,
  Briefcase,
  BarChart3,
  PenSquare,
  Zap,
  FileSignature,
  Settings, // Added Settings icon
  LogOut,   // Added LogOut icon
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
import { Button } from '@/components/ui/button'; // Added for logout button
import { Logo } from '@/components/shared/Logo'; // Using the Logo component

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  group?: string; // Optional group for separators or sections
}

export const mainNavItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/leads', label: 'Leads', icon: Users }, // Represents TerraLead™ Suite.
  { href: '/clients', label: 'Clients', icon: Users }, // Added as per dashboard image
  { href: '/project-management', label: 'Project Management', icon: Briefcase }, // For Project Management Automation
  { href: '/market-analytics', label: 'Market Analytics', icon: BarChart3 }, // For MarketIntel™ & Predictive Analytics
  { href: '/terrascribe', label: 'TerraScribe', icon: PenSquare }, // Hub for AI Content & Contract generation.
  { href: '/terravaluate', label: 'TerraValuate', icon: BarChart3 }, // For AI-Powered Property Valuation (using BarChart3 as an alternative)
  { href: '/smartflow', label: 'SmartFlow', icon: Zap }, // Hub for Project & Workflow Automation.
  { href: '/recommendations', label: 'Recommendations', icon: Users }, // For Personalized Property Recommendations (using Users as placeholder)
  { href: '/virtual-tours', label: 'Virtual Tours', icon: Briefcase }, // For TerraVision™ (using Briefcase as placeholder)
  { href: '/fraud-detection', label: 'Fraud Detection', icon: FileSignature }, // For TerraSecure™ & Fraud Detection
  { href: '/compliance', label: 'Compliance', icon: FileSignature }, // For Compliance Monitoring
];

export const utilityNavItems: NavItem[] = [
   { href: '/settings', label: 'Settings', icon: Settings },
];


export function AppSidebar() {
  const pathname = usePathname();
  const { setOpenMobile, isMobile, state } = useSidebar();

  return (
    <Sidebar
        collapsible={isMobile ? "offcanvas" : "icon"}
        variant="sidebar"
        side="left"
        className="border-r-0 shadow-md bg-sidebar text-sidebar-foreground fixed md:sticky top-0 h-screen md:h-auto z-40" // Ensure it's fixed on mobile
        style={ isMobile ? {} : {width: state === 'expanded' ? '250px' : 'var(--sidebar-width-icon, 3rem)'}}
    >
      <SidebarHeader className="p-4 h-20 flex items-center justify-between border-b border-sidebar-border">
        <Link href="/dashboard" className="flex items-center gap-2" onClick={() => setOpenMobile(false)}>
           {/* Using the Logo component */}
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-lg font-bold text-primary-foreground">T</span>
          </div>
          { (state === 'expanded' || isMobile) && <span className="text-xl font-bold text-foreground">TerraFlow</span> }
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1 p-3 mt-2 overflow-y-auto">
        <SidebarMenu>
          {mainNavItems.map((item) => (
            <SidebarMenuItem key={item.href} className="mb-1">
              <Link href={item.href} passHref asChild>
                <SidebarMenuButton
                  isActive={pathname.startsWith(item.href)}
                  tooltip={item.label}
                  onClick={() => setOpenMobile(false)}
                  className={cn(
                    "justify-start w-full h-11 px-3 rounded-lg text-sm",
                    pathname.startsWith(item.href)
                      ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className={cn("h-5 w-5 mr-3 shrink-0",
                    pathname.startsWith(item.href)
                       ? "text-sidebar-primary-foreground"
                       : "text-sidebar-foreground group-hover:text-sidebar-accent-foreground"
                  )} />
                  {(state === 'expanded' || isMobile) && <span>{item.label}</span>}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-sidebar-border space-y-2">
         {utilityNavItems.map((item) => (
            <SidebarMenuItem key={item.href} className="mb-1">
              <Link href={item.href} passHref asChild>
                <SidebarMenuButton
                  isActive={pathname.startsWith(item.href)}
                  tooltip={item.label}
                  onClick={() => setOpenMobile(false)}
                  className={cn(
                    "justify-start w-full h-11 px-3 rounded-lg text-sm",
                    pathname.startsWith(item.href)
                      ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className={cn("h-5 w-5 mr-3 shrink-0",
                    pathname.startsWith(item.href)
                       ? "text-sidebar-primary-foreground"
                       : "text-sidebar-foreground group-hover:text-sidebar-accent-foreground"
                  )} />
                   {(state === 'expanded' || isMobile) && <span>{item.label}</span>}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        <div className="flex items-center gap-3">
            <Image
                src="https://placehold.co/40x40.png"
                alt="User Avatar"
                width={36}
                height={36}
                className="rounded-full"
                data-ai-hint="person avatar"
            />
            {(state === 'expanded' || isMobile) && (
              <div>
                <p className="text-sm font-semibold text-foreground">Aman</p>
                <p className="text-xs text-muted-foreground">aman@terraflow.ai</p>
              </div>
            )}
        </div>
         <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-11 px-3" onClick={() => alert('Logout clicked')}>
            <LogOut className="h-5 w-5 mr-3 shrink-0" />
             {(state === 'expanded' || isMobile) && <span>Logout</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
