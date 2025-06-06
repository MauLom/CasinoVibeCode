// app/layouts/MainLayout.tsx (o donde tengas tu MainLayout)
import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { SidebarNav } from "@/components/layout/SidebarNav";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      {/* Cambiamos flex-col por un simple flex para que SidebarNav quede a la izquierda */}
      <div className="flex min-h-screen">
        {/* SidebarNav always on the left */}
        <SidebarNav />

        {/* Main content container */}
        <SidebarInset>
          <div className="flex flex-col flex-1 w-full">
            <Header />
            <main className="flex-1 w-full px-4 md:px-6 lg:px-8 py-6">
              <div className="max-w-7xl mx-auto w-full">
                {children}
              </div>
            </main>
            <footer className="w-full py-6 px-4 md:px-6 text-center text-sm text-muted-foreground border-t">
              <div className="max-w-7xl mx-auto">
                © {new Date().getFullYear()} Crypto Casino Royale. All rights reserved.
              </div>
            </footer>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
