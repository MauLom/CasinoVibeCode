import type { ReactNode } from 'react';
import Link from 'next/link';
import { Gem } from 'lucide-react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-slate-900 p-4">
      <div className="mb-8 text-center">
        <Link href="/" className="inline-block">
          <Gem className="w-16 h-16 text-primary neon-glow-primary" />
          <span className="sr-only">Crypto Casino Royale Home</span>
        </Link>
      </div>
      {children}
    </div>
  );
}
