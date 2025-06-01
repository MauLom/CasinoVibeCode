import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Save, Settings, SlidersHorizontal } from "lucide-react";

// Mock game data
const games = [
  { id: "roulette", name: "Roulette", houseEdge: 2.7, minBet: 0.1, maxBet: 100, isActive: true, variants: ["European", "American", "Crypto Special"] },
  { id: "blackjack", name: "Blackjack", houseEdge: 0.5, minBet: 1, maxBet: 500, isActive: true, variants: ["Classic", "Multi-Hand"] },
  { id: "cryptomines", name: "CryptoMines", houseEdge: 1.0, minBet: 0.05, maxBet: 50, isActive: true, variants: ["Adjustable Mines"] },
  { id: "aviator", name: "Aviator", houseEdge: 3.0, minBet: 0.1, maxBet: 200, isActive: false, variants: ["Standard Crash"] },
  { id: "cryptotowers", name: "Crypto Towers", houseEdge: 1.5, minBet: 0.2, maxBet: 100, isActive: true, variants: ["Easy", "Medium", "Hard"] },
];

export default function AdminGamesConfigPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-accent text-glow-accent">Game Configuration</h1>
        <p className="text-muted-foreground">Adjust game settings, probabilities, and house edges.</p>
      </header>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {games.map((game) => (
          <AccordionItem key={game.id} value={game.id} className="border border-border rounded-lg shadow-md bg-card">
            <AccordionTrigger className="p-6 hover:no-underline">
              <div className="flex items-center space-x-3">
                <Settings className="h-6 w-6 text-primary" />
                <span className="text-xl font-semibold">{game.name}</span>
                <Badge variant={game.isActive ? "default" : "outline"} className={game.isActive ? "bg-green-500/20 text-green-400" : ""}>
                  {game.isActive ? "Active" : "Disabled"}
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-6 border-t border-border">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor={`${game.id}-houseEdge`}>House Edge (%)</Label>
                    <Input id={`${game.id}-houseEdge`} type="number" defaultValue={game.houseEdge} step="0.1" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor={`${game.id}-status`}>Game Status</Label>
                    <div className="flex items-center space-x-2 mt-2">
                       <Switch id={`${game.id}-status`} defaultChecked={game.isActive} />
                       <span>{game.isActive ? "Active" : "Disabled"}</span>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor={`${game.id}-minBet`}>Min Bet (USD equivalent)</Label>
                    <Input id={`${game.id}-minBet`} type="number" defaultValue={game.minBet} step="0.01" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor={`${game.id}-maxBet`}>Max Bet (USD equivalent)</Label>
                    <Input id={`${game.id}-maxBet`} type="number" defaultValue={game.maxBet} step="1" className="mt-1" />
                  </div>
                </div>
                
                <div>
                  <Label>Game Variants</Label>
                  <div className="mt-1 space-y-2">
                    {game.variants.map(variant => (
                      <div key={variant} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                        <span>{variant}</span>
                        <Button variant="ghost" size="sm"><SlidersHorizontal className="h-4 w-4 mr-1"/> Configure</Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Placeholder for game-specific probability settings */}
                <Card className="bg-muted/30">
                  <CardHeader>
                    <CardTitle className="text-base">Probability Settings (Advanced)</CardTitle>
                    <CardDescription className="text-xs">Adjust specific outcomes or RTP mechanisms. Use with caution.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Advanced probability controls for {game.name} will be available here.</p>
                    {/* Example: Sliders for symbol frequency, deck composition, etc. */}
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Save className="mr-2 h-4 w-4" /> Save Changes for {game.name}
                  </Button>
                </div>
              </form>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
