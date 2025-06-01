import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, Dice5, ShieldQuestion, UserCircle, Home, Briefcase, Cable, Bot, Users, Settings2 } from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  disabled?: boolean;
  external?: boolean;
  label?: string;
  description?: string;
  items?: NavItem[]; // For sub-menus
}

export const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'Your personal casino hub.',
  },
  {
    title: 'Games',
    href: '/games',
    icon: Dice5,
    description: 'Explore our exciting games.',
    items: [
      { title: 'Roulette', href: '/games/roulette', icon: Cable /* Placeholder, find better */, description: 'Spin the wheel of fortune.' },
      { title: 'Blackjack', href: '/games/blackjack', icon: Briefcase /* Placeholder */, description: 'Beat the dealer.' },
      { title: 'CryptoMines', href: '/games/cryptomines', icon: Home /* Placeholder, Bomb icon would be better */, description: 'Uncover hidden treasures.' },
      { title: 'Aviator', href: '/games/aviator', icon: Cable /* Placeholder, Plane icon */, description: 'Fly high, cash out.' },
      { title: 'Crypto Towers', href: '/games/cryptotowers', icon: Home /* Placeholder, Tower icon */, description: 'Climb for big wins.' },
    ],
  },
  {
    title: 'Wallet',
    href: '/wallet',
    icon: ShieldQuestion, // Using ShieldQuestion as general Wallet/Web3 icon
    description: 'Manage your crypto funds.',
  },
  {
    title: 'Profile',
    href: '/profile', // Assuming a profile page
    icon: UserCircle,
    description: 'View and edit your profile.',
  },
];

export const adminNavItems: NavItem[] = [
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
    icon: Bot, // Bot or BrainCircuit
    description: 'AI-powered game parameter adjustments.',
  },
];
