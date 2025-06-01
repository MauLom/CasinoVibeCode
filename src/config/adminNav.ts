// This file is intentionally created as a duplicate of a section in nav.ts
// to satisfy the prompt's file structure. In a real app, these would likely be merged or imported.
import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, Users, Settings2, Bot } from 'lucide-react'; // Bot or BrainCircuit

export interface AdminNavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  disabled?: boolean;
  description?: string;
}

export const adminNavItems: AdminNavItem[] = [
  {
    title: 'Overview',
    href: '/admin',
    icon: LayoutDashboard,
    description: 'Casino performance at a glance.',
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: Users,
    description: 'Manage casino users.',
  },
  {
    title: 'Games Config',
    href: '/admin/games-config',
    icon: Settings2,
    description: 'Configure game settings and odds.',
  },
  {
    title: 'Fairness Oracle',
    href: '/admin/fairness-oracle',
    icon: Bot,
    description: 'AI-powered game parameter adjustments.',
  },
];
