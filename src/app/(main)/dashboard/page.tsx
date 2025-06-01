"use client"; // Add this directive

import Link from "next/link";
import { Dices, Gift, ShieldCheck } from "lucide-react";
import { BalanceCard } from "../../../components/dashboard/BalanceCard";
import { RecentActivity } from "../../../components/dashboard/RecentActivity";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { GameCard } from "../../../components/games/GameCard";
import { Button } from "../../../components/ui/button";

// Mock data - in a real app, this would come from user data/API
const userBalances = [
  { currencyName: "Ethereum", currencySymbol: "ETH", balance: 1.234567, usdValue: 4500.89, iconSrc: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png" },
  { currencyName: "Bitcoin", currencySymbol: "BTC", balance: 0.056789, usdValue: 3200.45, iconSrc: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png" },
  { currencyName: "Tether", currencySymbol: "USDT", balance: 1500.00, usdValue: 1500.00, iconSrc: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png" },
];

// Mock featured games
const featuredGames = [
  { id: "roulette", name: "Roulette", description: "Classic European Roulette", imgSrc: "https://placehold.co/600x400.png", href: "/games/roulette", dataAiHint: "casino roulette" },
  { id: "blackjack", name: "Blackjack", description: "Beat the dealer to 21", imgSrc: "https://placehold.co/600x400.png", href: "/games/blackjack", dataAiHint: "playing cards" },
  { id: "aviator", name: "Aviator", description: "Cash out before the crash!", imgSrc: "https://placehold.co/600x400.png", href: "/games/aviator", dataAiHint: "airplane sky" },
];


export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-2 text-primary text-glow-primary">Welcome, Player!</h1>
        <p className="text-muted-foreground mb-6">Here's an overview of your casino account.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {userBalances.map((bal) => (
            <BalanceCard 
              key={bal.currencySymbol}
              currencyName={bal.currencyName}
              currencySymbol={bal.currencySymbol}
              balance={bal.balance}
              usdValue={bal.usdValue}
              iconSrc={bal.iconSrc}
              onDeposit={() => console.log(`Deposit ${bal.currencySymbol}`)}
              onWithdraw={() => console.log(`Withdraw ${bal.currencySymbol}`)}
              onHistory={() => console.log(`History for ${bal.currencySymbol}`)}
            />
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div className="space-y-6">
            <Card className="bg-accent/10 border-accent shadow-lg">
              <CardHeader>
                <CardTitle className="text-accent flex items-center"><Gift className="mr-2 h-6 w-6" /> Daily Bonus</CardTitle>
                <CardDescription className="text-accent-foreground/80">Claim your daily reward!</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-accent-foreground/90 mb-3">You have a daily spin available. Good luck!</p>
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Claim Bonus</Button>
              </CardContent>
            </Card>
             <Card className="bg-primary/10 border-primary shadow-lg">
              <CardHeader>
                <CardTitle className="text-primary flex items-center"><ShieldCheck className="mr-2 h-6 w-6" /> Security Center</CardTitle>
                <CardDescription className="text-primary-foreground/80">Manage your account security.</CardDescription>
              </CardHeader>
              <CardContent>
                 <p className="text-sm text-primary-foreground/90 mb-3">Enable 2FA for enhanced protection.</p>
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Setup 2FA
                </Button>
              </CardContent>
            </Card>
        </div>
      </section>
      
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Featured Games</h2>
          <Button variant="link" asChild className="text-accent">
            <Link href="/games">View All Games <Dices className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredGames.map((game) => (
             <GameCard key={game.id} {...game} />
          ))}
        </div>
      </section>

    </div>
  );
}
