"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Zap,
  FileSignature,
  Calculator,
  Sparkles,
  BarChart3,
  Camera,
  Briefcase,
  ShieldCheck,
  Settings,
  LogOut,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '../shared/Logo';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { useRouter } from 'next/navigation'; // Correct import path

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  group?: string;
}

export const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, group: 'Overview' },
  { href: '/clients', label: 'Clients', icon: Users, group: 'Management' },
  { href: '/smartflow', label: 'SmartFlow Automation', icon: Zap, group: 'Management' },
  { href: '/project-management', label: 'Project Management', icon: Briefcase, group: 'Management' },
  { href: '/terrascribe', label: 'TerraScribe AI', icon: FileSignature, group: 'AI Tools' },
  { href: '/terravaluate', label: 'TerraValuate Pro', icon: Calculator, group: 'AI Tools' },
  { href: '/recommendations', label: 'Recommendations', icon: Sparkles, group: 'AI Tools' },
  { href: '/market-analytics', label: 'Market Analytics', icon: BarChart3, group: 'Insights' },
  { href: '/virtual-tours', label: 'Virtual Tours', icon: Camera, group: 'Insights' },
  { href: '/fraud-detection', label: 'Fraud &amp; Compliance', icon: ShieldCheck, group: 'Insights' },
];

const groupedNavItems = navItems.reduce((acc, item) => {
  const group = item.group || 'Other';
  if (!acc[group]) {
    acc[group] = [];
  }
  acc[group].push(item);
  return acc;
}, {} as Record<string, NavItem[]>);


export function AppSidebar() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar(); // For closing mobile sidebar on nav
  const router = useRouter();

  const handleLogout = () => {
    // Simulate logout
    setOpenMobile(false);
    router.push('/login');
  };

  return (
    <Sidebar collapsible="icon" variant="sidebar" side="left" className="border-r">
      <SidebarHeader className="p-4 border-b">
        <Logo size="md" />
      </SidebarHeader>
      <SidebarContent className="flex-1 p-2">
        <ScrollArea className="h-full">
          <SidebarMenu>
            {Object.entries(groupedNavItems).map(([groupName, items]) => (
              <SidebarGroup key={groupName}>
                <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {groupName}
                </SidebarGroupLabel>
                {items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <Link href={item.href} passHref legacyBehavior>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/dashboard')}
                        tooltip={item.label}
                        onClick={() => setOpenMobile(false)}
                        className="justify-start"
                      >
                        <a>
                          <item.icon className="h-5 w-5" />
                          <span>{item.label}</span>
                        </a>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarGroup>
            ))}
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>
      <Separator className="my-2"/>
      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/settings" passHref legacyBehavior>
              <SidebarMenuButton asChild isActive={pathname === '/settings'} tooltip="Settings" onClick={() => setOpenMobile(false)} className="justify-start">
                <a>
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </a>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} tooltip="Logout" className="justify-start text-destructive hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive">
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
