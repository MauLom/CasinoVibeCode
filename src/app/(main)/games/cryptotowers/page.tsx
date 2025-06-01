import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeftRight, Play, TrendingUp, ShieldAlert, TowerControl } from "lucide-react";

// Tower levels data - can be dynamic
const towerLevels = [
  { level: 10, reward: "x100.0" },
  { level: 9, reward: "x50.0" },
  { level: 8, reward: "x25.0" },
  { level: 7, reward: "x10.0" },
  { level: 6, reward: "x5.0" },
  { level: 5, reward: "x3.0" },
  { level: 4, reward: "x2.0" },
  { level: 3, reward: "x1.5" },
  { level: 2, reward: "x1.2" },
  { level: 1, reward: "x1.1" },
];

export default function CryptoTowersPage() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <TowerControl className="w-16 h-16 mx-auto mb-4 text-primary neon-glow-primary" />
        <h1 className="text-4xl font-bold text-primary text-glow-primary">Crypto Towers</h1>
        <p className="text-lg text-muted-foreground">Climb the tower, choose your path, and win big!</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Game Area */}
        <Card className="lg:col-span-2 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">The Ascent</CardTitle>
            <CardDescription>Make the right choices to reach the top.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Tower Visual Placeholder */}
            <div className="flex flex-col-reverse items-center space-y-1 p-4 bg-muted rounded-lg min-h-[400px]">
              {towerLevels.map((item, index) => (
                <div key={item.level} className={`w-full max-w-xs p-3 rounded text-center ${index === 0 ? 'bg-primary/30 border-2 border-primary' : 'bg-card/50'}`}>
                  <span className="font-semibold">Level {item.level}</span> - <span className="text-green-400">{item.reward}</span>
                  {index === 0 && ( /* Current level choices */
                    <div className="mt-2 flex justify-around">
                      <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                        <ArrowLeftRight className="mr-1 h-4 w-4" /> Left
                      </Button>
                      <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                        Right <ArrowLeftRight className="ml-1 h-4 w-4 scale-x-[-1]" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex justify-center space-x-4">
              <Button size="lg" variant="destructive">
                Cash Out (Current: x1.0)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Controls and Info */}
        <div className="space-y-6">
          <Card className="bg-card/80 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">Game Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="towerBetAmount" className="text-sm">Bet Amount (USDT)</Label>
                <Input type="number" id="towerBetAmount" defaultValue="10" step="1" className="mt-1" />
              </div>
               <div>
                <Label htmlFor="riskLevel" className="text-sm">Risk Level</Label>
                 <select id="riskLevel" className="w-full mt-1 block p-2 border border-input rounded-md bg-background focus:ring-accent focus:border-accent">
                    <option>Low (Easy)</option>
                    <option>Medium (Normal)</option>
                    <option>High (Hard)</option>
                 </select>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <Play className="mr-2 h-5 w-5" /> Start Climb
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-card/80 shadow-md">
            <CardHeader>
                <CardTitle className="text-xl flex items-center"><TrendingUp className="mr-2 h-5 w-5 text-primary"/>Payouts</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="text-xs space-y-1 text-muted-foreground">
                    {towerLevels.slice(0,5).reverse().map(l => <li key={l.level}>Level {l.level}: {l.reward}</li>)}
                    <li>... and higher!</li>
                </ul>
            </CardContent>
          </Card>
           <Card className="bg-destructive/10 border-destructive shadow-md">
            <CardHeader>
                <CardTitle className="text-xl text-destructive flex items-center"><ShieldAlert className="mr-2 h-5 w-5"/>Warning</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-xs text-destructive-foreground/80">Choosing incorrectly at any level means you lose your accumulated winnings for that climb!</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Crypto Towers Strategy</h2>
        <Card className="bg-card/50">
          <CardContent className="pt-6 space-y-2 text-sm text-muted-foreground">
            <p>1. Set your bet amount and desired risk level. Higher risk means fewer 'safe' choices but bigger multipliers.</p>
            <p>2. On each level, choose 'Left' or 'Right'. One path advances you, the other ends the climb (lose bet).</p>
            <p>3. Your potential winnings increase with each successful level.</p>
            <p>4. You can 'Cash Out' after any successful level to take your current winnings.</p>
            <p>5. The game might offer different tower heights or number of 'safe' spots based on risk.</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
