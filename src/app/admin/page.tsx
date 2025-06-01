import { StatsCard } from "@/components/admin/StatsCard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, LineChart } from "@/components/ui/chart"; // Assuming these are available or to be created
import { DollarSign, Users, Percent, Activity, AlertTriangle, Gem } from "lucide-react";
import { ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, ComposedChart } from 'recharts';


const totalBetsData = [
  { date: "Jan", total: 120000 }, { date: "Feb", total: 150000 }, { date: "Mar", total: 130000 },
  { date: "Apr", total: 170000 }, { date: "May", total: 210000 }, { date: "Jun", total: 190000 },
];

const profitData = [
  { date: "Jan", profit: 24000, payout: 96000 }, { date: "Feb", profit: 30000, payout: 120000 },
  { date: "Mar", profit: 26000, payout: 104000 }, { date: "Apr", profit: 34000, payout: 136000 },
  { date: "May", profit: 42000, payout: 168000 }, { date: "Jun", profit: 38000, payout: 152000 },
];


export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-accent text-glow-accent">Admin Overview</h1>
        <p className="text-muted-foreground">Key metrics and performance indicators for Crypto Casino Royale.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Bets (This Month)" 
          value="$210,345" 
          Icon={DollarSign} 
          description="Total value of all bets placed."
          trend="+15.2% from last month"
          trendColorClass="text-green-500"
        />
        <StatsCard 
          title="Active Users (Today)" 
          value="1,287" 
          Icon={Users}
          description="Users who placed at least one bet."
          trend="-2.1% from yesterday"
          trendColorClass="text-red-500"
        />
        <StatsCard 
          title="Casino Profit (This Month)" 
          value="$42,069" 
          Icon={Gem} 
          iconColorClass="text-green-500"
          description="Net profit after payouts."
          trend="+18.5% from last month"
          trendColorClass="text-green-500"
        />
        <StatsCard 
          title="Average Payout Rate" 
          value="80.5%" 
          Icon={Percent} 
          iconColorClass="text-yellow-500"
          description="Target: 80%. Current overall payout."
        />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Monthly Bets Overview</CardTitle>
            <CardDescription>Total bets placed each month.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={totalBetsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)/0.5)" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
                  labelStyle={{ color: 'hsl(var(--popover-foreground))' }}
                  itemStyle={{ color: 'hsl(var(--popover-foreground))' }}
                />
                <Legend />
                <Bar dataKey="total" fill="hsl(var(--primary))" name="Total Bets" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Profit vs Payouts</CardTitle>
            <CardDescription>Monthly casino profit against total payouts.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={profitData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)/0.5)" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
                  labelStyle={{ color: 'hsl(var(--popover-foreground))' }}
                  itemStyle={{ color: 'hsl(var(--popover-foreground))' }}
                />
                <Legend />
                <Bar dataKey="payout" fill="hsl(var(--accent))" name="Total Payouts" radius={[4, 4, 0, 0]} />
                <Line type="monotone" dataKey="profit" stroke="hsl(var(--primary))" name="Net Profit" strokeWidth={2} dot={{ r: 4, fill: 'hsl(var(--primary))' }} activeDot={{ r: 6 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      <section>
         <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center"><Activity className="mr-2 text-primary"/> System Health & Alerts</CardTitle>
            <CardDescription>Overview of system status and any critical alerts.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for alerts */}
            <div className="p-4 bg-green-500/10 text-green-400 rounded-md flex items-center">
              <Activity className="h-5 w-5 mr-3"/> All systems operational. No critical alerts.
            </div>
            <div className="mt-4 p-4 bg-yellow-500/10 text-yellow-400 rounded-md flex items-center">
              <AlertTriangle className="h-5 w-5 mr-3"/> Wallet API response times slightly elevated. Monitoring.
            </div>
             {/* Add more alerts or logs here */}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
