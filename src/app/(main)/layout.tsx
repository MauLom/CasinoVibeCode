import type { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';
import { SidebarNav } from '@/components/layout/SidebarNav';
// import { mainNavItems } from '@/config/nav'; // No longer needed here
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen flex-col">
        <SidebarNav /> {/* Remove items prop */}
        <SidebarInset>
          <Header />
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            {children}
          </main>
          <footer className="py-6 px-4 md:px-6 text-center text-sm text-muted-foreground border-t">
            © {new Date().getFullYear()} Crypto Casino Royale. All rights reserved.
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
