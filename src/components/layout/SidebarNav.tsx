
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gem, PanelLeftOpen, PanelRightOpen } from "lucide-react"; // Added PanelLeftOpen, PanelRightOpen
import { mainNavItems, type NavItem } from "@/config/nav";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  // SidebarSeparator, // Removed as it's not used here
  // SidebarTrigger, // Trigger is in Header
  useSidebar,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";


interface SidebarNavProps {
  className?: string;
}

export function SidebarNav({ className }: SidebarNavProps) {
  const pathname = usePathname();
  const { state: sidebarState, toggleSidebar, side } = useSidebar();

  const currentItems = mainNavItems;

  if (!currentItems?.length) {
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
        <Link href="/dashboard" className="flex items-center gap-2">
          <Gem className={cn("h-8 w-8 text-primary neon-glow-primary transition-all", sidebarState === 'collapsed' ? "h-7 w-7" : "")} />
          {sidebarState === 'expanded' && (
            <h1 className="text-xl font-bold text-primary text-glow-primary">
              CryptoCasino
            </h1>
          )}
        </Link>
      </SidebarHeader>
      
      <SidebarContent asChild>
        <ScrollArea className="h-full">
          <SidebarMenu className="p-2">
            {currentItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = item.href === '/' ? pathname === item.href : pathname?.startsWith(item.href);

              if (item.items && item.items.length > 0) {
                // This sub-menu logic might need adjustment based on how SidebarMenuSub handles open state with collapsed sidebar
                return (
                  <SidebarMenuItem key={index} className="relative">
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={{ children: item.title, side: "right", className: "bg-popover text-popover-foreground"}}
                      className={cn(isActive ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90" : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground")}
                    >
                      <Icon className={cn(isActive ? "text-sidebar-primary-foreground" : "text-sidebar-foreground", sidebarState === "expanded" ? "neon-glow-primary" : "")} />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                    {sidebarState === 'expanded' && ( // Only render sub-menu if expanded
                      <SidebarMenuSub>
                        {item.items.map((subItem, subIndex) => {
                          const SubIcon = subItem.icon;
                          const isSubActive = pathname?.startsWith(subItem.href);
                          return (
                            <SidebarMenuSubItem key={subIndex}>
                              <Link href={subItem.href} legacyBehavior passHref>
                                <SidebarMenuSubButton
                                  isActive={isSubActive}
                                  className={cn(isSubActive ? "bg-sidebar-primary/80 text-sidebar-primary-foreground hover:bg-sidebar-primary/70" : "hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground")}
                                >
                                  <SubIcon className={cn("h-4 w-4", isSubActive ? "text-sidebar-primary-foreground" : "text-sidebar-foreground/80")} />
                                  <span>{subItem.title}</span>
                                </SidebarMenuSubButton>
                              </Link>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    )}
                  </SidebarMenuItem>
                );
              }

              return (
                <SidebarMenuItem key={index}>
                  <Link href={item.href} legacyBehavior passHref>
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={{ children: item.title, side: "right", className: "bg-popover text-popover-foreground"}}
                      className={cn(isActive ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90" : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground")}
                    >
                      <Icon className={cn(isActive ? "text-sidebar-primary-foreground" : "text-sidebar-foreground", sidebarState === "expanded" ? "neon-glow-primary" : "")} />
                      <span>{item.title}</span>
                      {item.label && sidebarState === 'expanded' && ( // Only show label if expanded
                        <span className="ml-auto text-xs text-background dark:text-foreground">
                          {item.label}
                        </span>
                      )}
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

    