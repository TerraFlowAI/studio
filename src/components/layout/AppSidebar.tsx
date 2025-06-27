
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
  Settings,
  LogOut,
  HelpCircle,
  Shield, // New Icon for Admin
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
  SidebarSeparator,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/Logo';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/app/context/AuthContext';
import { signOut } from 'firebase/auth';

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  subItems?: NavItem[]; 
}

export const mainNavItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/leads', label: 'Leads', icon: Users },
  { href: '/properties', label: 'Properties', icon: Briefcase },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/scribe', label: 'TerraScribe', icon: PenSquare },
  { href: '/smartflow', label: 'SmartFlow', icon: Zap }, 
  { href: '/documents', label: 'Documents', icon: FileSignature },
];

export const utilityNavItems: NavItem[] = [
   { href: '/settings', label: 'Settings', icon: Settings },
   { href: '/help-support', label: 'Help & Support', icon: HelpCircle },
];

export const adminNavItems: NavItem[] = [
  { href: '/admin', label: 'User Management', icon: Shield },
];


export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter(); 
  const { user, isAdmin } = useAuth(); // Get isAdmin state
  const { setOpenMobile, isMobile, state } = useSidebar();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <Sidebar
        collapsible={isMobile ? "offcanvas" : "icon"}
        variant="sidebar"
        side="left"
        className="border-r-0 shadow-md bg-sidebar text-sidebar-foreground z-40"
        style={ isMobile ? {} : {width: state === 'expanded' ? '250px' : 'var(--sidebar-width-icon, 3rem)'}}
    >
      <SidebarHeader className="p-4 h-20 flex items-center justify-center group-data-[collapsible=icon]:justify-center group-data-[state=expanded]:justify-start border-b border-sidebar-border">
        <Logo 
            href="/dashboard" 
            size={40}
            hideText={state !== 'expanded' && !isMobile}
            onClick={() => { if (isMobile) setOpenMobile(false); }} 
        />
      </SidebarHeader>
      <SidebarContent className="flex-1 p-3 mt-2 overflow-y-auto">
        <SidebarMenu>
          {mainNavItems.map((item) => (
            <SidebarMenuItem key={item.href} className="mb-1">
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                  onClick={() => {
                    if (isMobile) setOpenMobile(false);
                  }}
                  className={cn(
                    "justify-start w-full h-11 px-3 rounded-lg text-sm",
                    (pathname === item.href)
                      ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className={cn("h-5 w-5 mr-3 shrink-0",
                    (pathname === item.href)
                       ? "text-sidebar-primary-foreground"
                       : "text-sidebar-foreground group-hover:text-sidebar-accent-foreground"
                  )} />
                  {(state === 'expanded' || isMobile) && <span>{item.label}</span>}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        {/* Admin Section */}
        {isAdmin && (
          <>
            <SidebarSeparator className="my-2" />
            <SidebarMenu>
              <SidebarGroupLabel className="group-data-[collapsible=icon]:-mt-2">Admin</SidebarGroupLabel>
              {adminNavItems.map((item) => (
                <SidebarMenuItem key={item.href} className="mb-1">
                  <Link href={item.href}>
                    <SidebarMenuButton
                      isActive={pathname.startsWith(item.href)}
                      tooltip={item.label}
                       onClick={() => {
                        if (isMobile) setOpenMobile(false);
                      }}
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
          </>
        )}
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-sidebar-border space-y-2">
         {utilityNavItems.map((item) => (
            <SidebarMenuItem key={item.href} className="mb-1">
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname.startsWith(item.href)}
                  tooltip={item.label}
                  onClick={() => {
                     if (isMobile) setOpenMobile(false);
                  }}
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
        <div className="flex items-center gap-3 pt-2">
            <Image
                src={user?.photoURL || "https://placehold.co/40x40.png"}
                alt="User Avatar"
                width={36}
                height={36}
                className="rounded-full"
                data-ai-hint="person avatar"
            />
            {(state === 'expanded' || isMobile) && (
              <div>
                <p className="text-sm font-semibold text-foreground">{user?.displayName || 'User'}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            )}
        </div>
         <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-11 px-3" onClick={handleLogout}>
            <LogOut className="h-5 w-5 mr-3 shrink-0" />
             {(state === 'expanded' || isMobile) && <span>Logout</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
