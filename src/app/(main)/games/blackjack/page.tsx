import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../../components/ui/card";
import Image from "next/image";
import { Hand, MinusCircle, PlusCircle, Shuffle } from "lucide-react"; // Using Hand for Hit/Stand context
import { Button } from "../../../../components/ui/button";

export default function BlackjackPage() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        {/* Using a generic cards icon, replace with a more specific one if available */}
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layers-3 mx-auto mb-4 text-primary neon-glow-primary"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a2 2 0 0 0-1.1 1.69v6.46a2 2 0 0 0 1.1 1.69l8.59 3.9a2 2 0 0 0 1.66 0l8.59-3.9a2 2 0 0 0 1.1-1.69v-6.46a2 2 0 0 0-1.1-1.69L12.83 2.18Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.73-9.17 4.16a2 2 0 0 1-1.66 0L2 12.73"/></svg>
        <h1 className="text-4xl font-bold text-primary text-glow-primary">Blackjack</h1>
        <p className="text-lg text-muted-foreground">Beat the dealer without going over 21!</p>
      </header>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Classic Blackjack</CardTitle>
          <CardDescription>Aim for 21 and test your luck against the house.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Dealer's Hand */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Dealer's Hand</h3>
              <div className="flex space-x-2 mb-2">
                <Image src="https://placehold.co/100x150.png" alt="Card Back" width={80} height={120} className="rounded shadow" data-ai-hint="playing card" />
                <Image src="https://placehold.co/100x150.png" alt="Dealer Card" width={80} height={120} className="rounded shadow" data-ai-hint="playing card" />
              </div>
              <p className="text-sm text-muted-foreground">Dealer shows: ?</p>
            </div>
            {/* Player's Hand */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Your Hand</h3>
              <div className="flex space-x-2 mb-2">
                <Image src="https://placehold.co/100x150.png" alt="Player Card 1" width={80} height={120} className="rounded shadow" data-ai-hint="playing card" />
                <Image src="https://placehold.co/100x150.png" alt="Player Card 2" width={80} height={120} className="rounded shadow" data-ai-hint="playing card" />
              </div>
              <p className="text-sm text-muted-foreground">Your total: ?</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Card className="bg-card/50">
              <CardHeader><CardTitle className="text-lg">Your Balance</CardTitle></CardHeader>
              <CardContent><p className="text-2xl font-bold text-primary">2.50 ETH</p></CardContent>
            </Card>
            <Card className="bg-card/50">
              <CardHeader><CardTitle className="text-lg">Current Bet</CardTitle></CardHeader>
              <CardContent><p className="text-2xl font-bold">0.10 ETH</p></CardContent>
            </Card>
             <Card className="bg-card/50">
              <CardHeader><CardTitle className="text-lg">Pot</CardTitle></CardHeader>
              <CardContent><p className="text-2xl font-bold">0.20 ETH</p></CardContent>
            </Card>
          </div>

          {/* Action buttons placeholder */}
          <div className="space-y-4 pt-4 border-t">
            <p className="text-center text-muted-foreground">Choose your action.</p>
            <div className="flex justify-center space-x-2 sm:space-x-4">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                <PlusCircle className="mr-2 h-5 w-5" /> Hit
              </Button>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Hand className="mr-2 h-5 w-5" /> Stand
              </Button>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                Double Down
              </Button>
               <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Shuffle className="mr-2 h-5 w-5" /> New Bet
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Blackjack Rules</h2>
        <Card className="bg-card/50">
          <CardContent className="pt-6 space-y-2 text-sm text-muted-foreground">
            <p>- The goal is to get a hand total closer to 21 than the dealer, without exceeding 21.</p>
            <p>- Face cards (King, Queen, Jack) are worth 10. Aces are worth 1 or 11.</p>
            <p>- 'Hit' to take another card. 'Stand' to keep your current hand.</p>
            <p>- 'Double Down' to double your bet and receive one more card.</p>
            <p>- Dealer must hit until their hand total is 17 or more.</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
