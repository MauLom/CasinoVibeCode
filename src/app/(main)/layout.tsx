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
        {/* SidebarNav siempre a la izquierda */}
        <SidebarNav />

        {/* Este contenedor ocupa el resto del ancho (flex-1 w-full) */}
        <SidebarInset>
          <div className="flex flex-col flex-1 w-full">
            <Header />
            <main className="flex-1 w-full p-4 md:p-6 lg:p-8">
              {children}
            </main>
            <footer className="py-6 px-4 md:px-6 text-center text-sm text-muted-foreground border-t">
              © {new Date().getFullYear()} Crypto Casino Royale. All rights reserved.
            </footer>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
