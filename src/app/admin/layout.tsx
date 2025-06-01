import type { ReactNode } from 'react';
import { Header } from '@/components/layout/Header'; // Re-using main header, could be specific AdminHeader
import { AdminSidebarNav } from '@/components/admin/AdminSidebarNav';
// import { adminNavItems } from '@/config/adminNav'; // No longer needed here
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen flex-col">
        <AdminSidebarNav /> {/* Remove items prop */}
        <SidebarInset>
          <Header /> {/* Or a dedicated AdminHeader component */}
          <main className="flex-1 p-4 md:p-6 lg:p-8 bg-background">
            {children}
          </main>
           <footer className="py-6 px-4 md:px-6 text-center text-sm text-muted-foreground border-t">
            Crypto Casino Royale - Admin Panel
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
