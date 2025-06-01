import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { RotateCcw, Target } from "lucide-react";

export default function RoulettePage() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <Target className="w-16 h-16 mx-auto mb-4 text-primary neon-glow-primary" />
        <h1 className="text-4xl font-bold text-primary text-glow-primary">Roulette</h1>
        <p className="text-lg text-muted-foreground">Place your bets and spin the wheel of fortune!</p>
      </header>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">European Roulette</CardTitle>
          <CardDescription>Classic single-zero roulette for the best odds.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center overflow-hidden">
            {/* Placeholder for game canvas or iframe */}
            <Image src="https://placehold.co/800x450.png" alt="Roulette Game Area" width={800} height={450} className="object-cover" data-ai-hint="roulette wheel" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-card/50">
              <CardHeader><CardTitle className="text-lg">Your Balance</CardTitle></CardHeader>
              <CardContent><p className="text-2xl font-bold text-primary">1.23 ETH</p></CardContent>
            </Card>
            <Card className="bg-card/50">
              <CardHeader><CardTitle className="text-lg">Current Bet</CardTitle></CardHeader>
              <CardContent><p className="text-2xl font-bold">0.05 ETH</p></CardContent>
            </Card>
             <Card className="bg-card/50">
              <CardHeader><CardTitle className="text-lg">Last Win</CardTitle></CardHeader>
              <CardContent><p className="text-2xl font-bold text-green-400">0.1 ETH</p></CardContent>
            </Card>
          </div>

          {/* Betting controls placeholder */}
          <div className="space-y-4">
            <p className="text-center text-muted-foreground">Place your bets on the table below.</p>
            <div className="h-32 bg-muted/50 rounded-lg flex items-center justify-center">
              <p className="text-foreground">Betting Interface Placeholder</p>
            </div>
            <div className="flex justify-center space-x-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <RotateCcw className="mr-2 h-5 w-5" /> Spin Wheel
              </Button>
              <Button variant="outline" size="lg">Clear Bets</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <section>
        <h2 className="text-2xl font-semibold mb-4">How to Play</h2>
        <Card className="bg-card/50">
          <CardContent className="pt-6 space-y-2 text-sm text-muted-foreground">
            <p>1. Select your chip value.</p>
            <p>2. Place chips on desired betting spots (numbers, colors, groups).</p>
            <p>3. Click 'Spin Wheel' to start the game.</p>
            <p>4. Winnings are automatically credited to your balance.</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
