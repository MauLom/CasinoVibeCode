import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bomb, Diamond, Play, RefreshCw } from "lucide-react"; // Diamond for crypto reward

export default function CryptoMinesPage() {
  // Example grid size, can be dynamic
  const gridSize = 5;
  const cells = Array(gridSize * gridSize).fill(null);

  return (
    <div className="space-y-8">
      <header className="text-center">
        <Bomb className="w-16 h-16 mx-auto mb-4 text-primary neon-glow-primary" />
        <h1 className="text-4xl font-bold text-primary text-glow-primary">CryptoMines</h1>
        <p className="text-lg text-muted-foreground">Uncover crypto treasures, but beware of the mines!</p>
      </header>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Minefield Adventure</CardTitle>
          <CardDescription>Set your bet, choose the number of mines, and start digging.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div>
              <Label htmlFor="betAmount" className="text-sm font-medium">Bet Amount (ETH)</Label>
              <Input type="number" id="betAmount" defaultValue="0.01" step="0.001" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="numMines" className="text-sm font-medium">Number of Mines (3-24)</Label>
              <Input type="number" id="numMines" defaultValue="5" min="3" max="24" className="mt-1" />
            </div>
            <Button size="lg" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
              <Play className="mr-2 h-5 w-5" /> Start Game
            </Button>
          </div>

          {/* Game Grid Placeholder */}
          <div className="p-4 bg-muted rounded-lg">
            <div 
              className="grid gap-1 mx-auto aspect-square"
              style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`, maxWidth: '400px' }}
            >
              {cells.map((_, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  className="aspect-square w-full h-full text-2xl p-0 border-border hover:bg-accent/20"
                  aria-label={`Cell ${index + 1}`}
                >
                  {/* Placeholder, reveal Diamond or Bomb on click */}
                  {/* <Diamond className="w-6 h-6 text-green-400" /> */}
                  {/* <Bomb className="w-6 h-6 text-red-500" /> */}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <Card className="bg-card/50 p-4">
              <p className="text-sm text-muted-foreground">Current Multiplier</p>
              <p className="text-2xl font-bold text-primary">x1.00</p>
            </Card>
            <Card className="bg-card/50 p-4">
              <p className="text-sm text-muted-foreground">Potential Win</p>
              <p className="text-2xl font-bold text-green-400">0.00 ETH</p>
            </Card>
             <Card className="bg-card/50 p-4">
              <p className="text-sm text-muted-foreground">Mines Remaining</p>
              <p className="text-2xl font-bold">5</p>
            </Card>
          </div>

          <div className="flex justify-center space-x-4">
            <Button size="lg" variant="destructive">
              Cash Out
            </Button>
             <Button size="lg" variant="outline">
              <RefreshCw className="mr-2 h-5 w-5" /> Reset Game
            </Button>
          </div>
        </CardContent>
      </Card>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Gameplay</h2>
        <Card className="bg-card/50">
          <CardContent className="pt-6 space-y-2 text-sm text-muted-foreground">
            <p>1. Enter your bet amount and choose the number of mines on the field.</p>
            <p>2. Click on cells to reveal them. Finding a crypto symbol (e.g., <Diamond className="inline h-4 w-4 text-green-400"/>) increases your multiplier.</p>
            <p>3. If you hit a mine (<Bomb className="inline h-4 w-4 text-red-500"/>), you lose your bet for the current round.</p>
            <p>4. You can 'Cash Out' at any time to collect your current winnings based on the multiplier.</p>
            <p>5. The more mines you set, the higher the potential multipliers, but also higher risk!</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
