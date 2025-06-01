import Link from 'next/link';
import { Gem, PanelLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserNav } from './UserNav';
import { SidebarTrigger } from '@/components/ui/sidebar'; // Import from ShadCN UI

interface HeaderProps {
  showSidebarTrigger?: boolean;
}

export function Header({ showSidebarTrigger = true }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between space-x-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          {showSidebarTrigger && (
             <SidebarTrigger className="md:hidden" />
          )}
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Gem className="h-8 w-8 text-primary neon-glow-primary" />
            <span className="font-bold text-xl hidden sm:inline-block text-glow-primary">
              CryptoCasino
            </span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Placeholder for Theme Toggle or other actions */}
          <UserNav />
        </div>
      </div>
    </header>
  );
}
