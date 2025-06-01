import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ArrowRightCircle, Award, Dice5 } from "lucide-react";
import Link from "next/link";

interface ActivityItem {
  id: string;
  type: 'bet' | 'win' | 'reward' | 'deposit' | 'withdrawal';
  description: string;
  amount?: string; // e.g., "+0.5 ETH" or "-10 USDT"
  timestamp: string; // e.g., "2 hours ago"
  game?: string; // e.g., "Roulette"
  status?: 'completed' | 'pending' | 'failed';
}

// Mock data
const mockActivities: ActivityItem[] = [
  { id: '1', type: 'win', description: 'Won on Blackjack', amount: '+0.05 ETH', timestamp: '30m ago', game: 'Blackjack', status: 'completed' },
  { id: '2', type: 'bet', description: 'Placed bet on Roulette', amount: '-10 USDT', timestamp: '1h ago', game: 'Roulette', status: 'completed' },
  { id: '3', type: 'reward', description: 'Daily login bonus claimed', amount: '+5 CCR', timestamp: '3h ago', status: 'completed' },
  { id: '4', type: 'deposit', description: 'Deposited BTC', amount: '+0.001 BTC', timestamp: '1d ago', status: 'completed' },
  { id: '5', type: 'bet', description: 'Played CryptoMines', amount: '-20 USDT', timestamp: '2d ago', game: 'CryptoMines', status: 'completed' },
  { id: '6', type: 'withdrawal', description: 'Withdrew ETH', amount: '-0.1 ETH', timestamp: '3d ago', status: 'pending' },
];

const typeIcons = {
  bet: <Dice5 className="h-4 w-4 text-red-400" />,
  win: <Award className="h-4 w-4 text-green-400" />,
  reward: <Award className="h-4 w-4 text-yellow-400" />,
  deposit: <ArrowDownToLine className="h-4 w-4 text-blue-400" />,
  withdrawal: <ArrowUpFromLine className="h-4 w-4 text-orange-400" />,
};

import { ArrowDownToLine, ArrowUpFromLine } from 'lucide-react'; // Add these if not globally available

export function RecentActivity() {
  const activities = mockActivities; // Replace with actual data fetching

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Recent Activity</CardTitle>
        <CardDescription>Your latest transactions and game plays.</CardDescription>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No recent activity.</p>
        ) : (
          <ScrollArea className="h-[300px] pr-4">
            <ul className="space-y-4">
              {activities.map((activity) => (
                <li key={activity.id} className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span className="p-2 bg-muted rounded-full">
                      {typeIcons[activity.type] || <ArrowRightCircle className="h-4 w-4 text-muted-foreground" />}
                    </span>
                    <div>
                      <p className="font-medium text-sm">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.timestamp}
                        {activity.game && ` • ${activity.game}`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {activity.amount && (
                      <Badge 
                        variant={activity.amount.startsWith('+') ? 'default' : 'destructive'}
                        className={activity.amount.startsWith('+') ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}
                      >
                        {activity.amount}
                      </Badge>
                    )}
                    {activity.status && (
                       <p className={`text-xs mt-1 ${
                        activity.status === 'completed' ? 'text-green-400' :
                        activity.status === 'pending' ? 'text-yellow-400' :
                        'text-red-400'
                       }`}>
                         {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                       </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </ScrollArea>
        )}
        {activities.length > 0 && (
          <div className="mt-4 text-center">
            <Link href="/history" className="text-sm text-accent hover:underline">
              View all activity
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
