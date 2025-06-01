
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, PanelLeftOpen, PanelRightOpen } from "lucide-react"; // Added PanelLeftOpen, PanelRightOpen
import { adminNavItems, type AdminNavItem } from "@/config/adminNav";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";


interface AdminSidebarNavProps {
  className?: string;
}

export function AdminSidebarNav({ className }: AdminSidebarNavProps) {
  const pathname = usePathname();
  const { state: sidebarState, toggleSidebar, side } = useSidebar();

  const currentAdminItems = adminNavItems;

  if (!currentAdminItems?.length) {
    return null;
  }

  return (
    <Sidebar
      className={cn("border-r border-sidebar-border", className)}
      collapsible="icon"
      variant="sidebar"
      side={side} // Pass side from context or default
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
          <SidebarMenu className="p-2">
            {currentAdminItems.map((item, index) => {
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
                      <Icon className={cn(isActive ? "text-sidebar-primary-foreground" : "text-sidebar-foreground", sidebarState === "expanded" ? "neon-glow-accent" : "")} />
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
         <Button 
          variant="ghost" 
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={toggleSidebar}
          aria-label={sidebarState === 'expanded' ? "Collapse sidebar" : "Expand sidebar"}
        >
          {sidebarState === 'expanded' ? 
            (side === 'left' ? <PanelLeftOpen className="mr-2"/> : <PanelRightOpen className="mr-2"/>) : 
            (side === 'left' ? <PanelRightOpen className="mr-2"/> : <PanelLeftOpen className="mr-2"/>)
          }
          {sidebarState === 'expanded' ? 'Collapse' : (sidebarState === "collapsed" ? "" : "Details")}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

    