
"use client";
import * as React from "react";
import { GameCard } from "@/components/games/GameCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dices, Search, ListFilter } from "lucide-react";

const allGames = [
  { id: "roulette", name: "Roulette Royale", description: "Spin the iconic wheel and win big with European rules.", imgSrc: "https://placehold.co/600x400.png", href: "/games/roulette", category: "Table Games", dataAiHint: "roulette casino" },
  { id: "blackjack", name: "Classic Blackjack", description: "Challenge the dealer in this timeless card game. Aim for 21!", imgSrc: "https://placehold.co/600x400.png", href: "/games/blackjack", category: "Table Games", dataAiHint: "blackjack cards" },
  { id: "cryptomines", name: "CryptoMines", description: "Navigate the minefield to uncover hidden crypto treasures.", imgSrc: "https://placehold.co/600x400.png", href: "/games/cryptomines", category: "Arcade", dataAiHint: "gold mine" },
  { id: "aviator", name: "Aviator Ascent", description: "Cash out before the multiplier crashes! How high can you fly?", imgSrc: "https://placehold.co/600x400.png", href: "/games/aviator", category: "Crash Games", dataAiHint: "airplane flight" },
  { id: "cryptotowers", name: "Crypto Towers", description: "Climb the tower of fortune by making the right choices.", imgSrc: "https://placehold.co/600x400.png", href: "/games/cryptotowers", category: "Arcade", dataAiHint: "fantasy tower" },
  { id: "slots_treasure", name: "Pharaoh's Slots", description: "Spin the reels and uncover ancient Egyptian riches.", imgSrc: "https://placehold.co/600x400.png", href: "/games/slots/pharaohs", category: "Slots", dataAiHint: "egyptian slot machine" },
  { id: "poker_arena", name: "Crypto Hold'em", description: "Test your poker face in high-stakes Texas Hold'em.", imgSrc: "https://placehold.co/600x400.png", href: "/games/poker/holdem", category: "Table Games", dataAiHint: "poker table" },
  { id: "dice_duel", name: "Satoshi Dice", description: "Simple, provably fair dice game. Roll high to win.", imgSrc: "https://placehold.co/600x400.png", href: "/games/dice/satoshi", category: "Dice Games", dataAiHint: "dice game" },
];

const categories = ["All", "Table Games", "Slots", "Crash Games", "Arcade", "Dice Games"];

export default function GamesPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredGames = React.useMemo(() => {
    return allGames.filter(game => 
      (selectedCategory === "All" || game.category === selectedCategory) &&
      (game.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       game.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, selectedCategory]);

  return (
    <div className="space-y-8">
      <header className="text-center">
        <Dices className="w-16 h-16 mx-auto mb-4 text-primary neon-glow-primary" />
        <h1 className="text-4xl font-bold text-primary text-glow-primary">Our Game Collection</h1>
        <p className="text-lg text-muted-foreground">Explore a universe of exciting crypto casino games.</p>
      </header>

      <div className="sticky top-16 z-30 bg-background/80 backdrop-blur-md py-4 -mx-4 px-4 md:-mx-6 md:px-6 lg:-mx-8 lg:px-8 border-b">
        <div className="container mx-auto flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative w-full sm:flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search games by name or description..." 
              className="pl-10 w-full" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-auto">
            <Select 
              value={selectedCategory}
              onValueChange={setSelectedCategory} 
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <ListFilter className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game) => (
            <GameCard 
              key={game.id} 
              name={game.name}
              description={game.description}
              imgSrc={game.imgSrc}
              href={game.href}
              dataAiHint={game.dataAiHint}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-2xl font-semibold text-muted-foreground">No games found.</p>
          <p className="text-muted-foreground">Try adjusting your search or filter.</p>
        </div>
      )}
    </div>
  );
}
