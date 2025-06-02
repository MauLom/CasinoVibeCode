
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "../ui/sidebar";
import { adminNavItems } from "../../config/adminNav";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";



interface AdminSidebarNavProps {
  // items: AdminNavItem[]; // Removed items prop
  className?: string;
}

export function AdminSidebarNav({ /* items, */ className }: AdminSidebarNavProps) { // Removed items from props
  const pathname = usePathname();
  const { state: sidebarState } = useSidebar();

  const currentAdminItems = adminNavItems; // Use imported items

  if (!currentAdminItems?.length) {
    return null;
  }

  return (
    <Sidebar
      className={cn("border-r border-sidebar-border", className)}
      collapsible="icon"
      variant="sidebar"
    >
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <Link href="/admin" className="flex items-center gap-2">
          <ShieldCheck className={cn("h-8 w-8 text-accent neon-glow-accent transition-all", sidebarState === 'collapsed' ? "h-7 w-7" : "")} />
          {sidebarState === 'expanded' && (
            <h1 className="text-xl font-bold text-accent text-glow-accent">
              Admin Panel
            </h1>
          )}
        </Link>
      </SidebarHeader>
      
      <SidebarContent asChild>
        <ScrollArea className="h-full">
          <SidebarMenu  className="p-2">
            {currentAdminItems.map((item, index) => { // Use currentAdminItems
              const Icon = item.icon;
              const isActive = item.href === '/admin' && pathname === '/admin' || (item.href !== '/admin' && pathname?.startsWith(item.href));

              return (
                <SidebarMenuItem key={index}>
                  <Link href={item.href} legacyBehavior passHref>
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={{ children: item.title, side: "right", className: "bg-popover text-popover-foreground"}}
                      className={cn(isActive ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90" : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground")}
                    >
                      <Icon className={cn(isActive ? "text-sidebar-primary-foreground neon-glow-primary" : "text-sidebar-foreground neon-glow-accent")} />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
          {sidebarState === 'expanded' ? 'Settings' : ''}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
