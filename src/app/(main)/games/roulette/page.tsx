// src/app/(main)/games/roulette/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RotateCcw, Target } from "lucide-react";
import { motion, useAnimation } from "framer-motion";

const SYMBOLS = [
  { type: "red", icon: "♦", multiplier: 2 },
  { type: "green", icon: "🟢", multiplier: 14 },
  { type: "purple", icon: "♠", multiplier: 2 },
  { type: "star", icon: "★", multiplier: 7 },
];

type SymbolType = (typeof SYMBOLS)[number]["type"];

type SymbolInstance = {
  type: SymbolType;
  icon: string;
  multiplier: number;
};

export default function RoulettePage() {
  const [balance, setBalance] = useState<number>(100);
  const [betAmount, setBetAmount] = useState<number>(10);
  const [selectedSymbol, setSelectedSymbol] = useState<SymbolType | null>(null);
  const [history, setHistory] = useState<SymbolInstance[]>([]);
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState<SymbolInstance | null>(null);
  const [message, setMessage] = useState<string>("");

  const controls = useAnimation();
  const [sequence, setSequence] = useState<SymbolInstance[]>([]);

  function rollRandomSymbol(): SymbolInstance {
    const weights: Record<SymbolType, number> = {
      red: 45,
      green: 5,
      purple: 45,
      star: 5,
    };

    const weightedList: SymbolInstance[] = SYMBOLS.flatMap((s) =>
      Array(weights[s.type]).fill(s)
    );

    return weightedList[Math.floor(Math.random() * weightedList.length)];
  }

  async function spin() {
    if (!selectedSymbol || betAmount <= 0 || betAmount > balance || rolling) return;

    setRolling(true);
    setMessage("");
    setBalance((b) => b - betAmount);

    const result = rollRandomSymbol();
    const resultIndex = 40;
    const filler = Array.from({ length: resultIndex }, () =>
      SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
    );
    const spinSeq = [...filler, result, ...filler.slice(-30)];

    setSequence(spinSeq);

    await controls.start({
      x: `-${resultIndex * 64}px`,
      transition: { duration: 2.5, ease: "easeInOut" },
    });

    setRolling(false);
    setResult(result);
    setHistory((prev) => [result, ...prev.slice(0, 49)]);

    if (result.type === selectedSymbol) {
      const winnings = betAmount * result.multiplier;
      setBalance((b) => b + winnings);
      setMessage(`You won ${winnings.toFixed(2)}!`);
    } else {
      setMessage("You lost.");
    }

    controls.set({ x: 0 });
    setSequence([]);
  }

  function clear() {
    setSelectedSymbol(null);
    setBetAmount(10);
    setMessage("");
    setResult(null);
    setSequence([]);
  }

  return (
    <div className="space-y-8 py-8 px-4 md:px-8 lg:px-16">
      <header className="text-center">
        <Target className="w-16 h-16 mx-auto mb-4 text-primary neon-glow-primary" />
        <h1 className="text-4xl font-bold text-primary text-glow-primary">Roulette</h1>
        <p className="text-lg text-muted-foreground">
          Place your bets and spin the wheel!
        </p>
      </header>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Crypto Roulette</CardTitle>
          <CardDescription>Choose a symbol. Match it to win big!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap justify-center gap-4">
            {SYMBOLS.map((symbol) => (
              <Button
                key={symbol.type}
                variant={selectedSymbol === symbol.type ? "default" : "outline"}
                className={`text-xl px-6 py-4`}
                onClick={() => setSelectedSymbol(symbol.type)}
              >
                {symbol.icon} x{symbol.multiplier}
              </Button>
            ))}
          </div>

          <div className="relative overflow-hidden border rounded-lg h-16 bg-muted">
            <div className="absolute inset-y-0 left-1/2 w-1 border-l-2 border-yellow-400 z-10" />
            <motion.div
              className="flex items-center h-16 gap-4 px-2 min-w-[200%]"
              animate={controls}
              initial={{ x: 0 }}
            >
              {sequence.map((s, i) => (
                <span key={i} className="text-3xl min-w-[64px] text-center">
                  {s.icon}
                </span>
              ))}
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <Card className="bg-card/50 p-4">
              <p className="text-sm text-muted-foreground">Balance</p>
              <p className="text-2xl font-bold text-primary">{balance.toFixed(2)} USDT</p>
            </Card>
            <Card className="bg-card/50 p-4">
              <p className="text-sm text-muted-foreground">Bet</p>
              <Input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(parseFloat(e.target.value) || 0)}
              />
            </Card>
            <Card className="bg-card/50 p-4">
              <p className="text-sm text-muted-foreground">Result</p>
              <p className="text-2xl font-bold">
                {rolling ? "Spinning..." : result ? `${result.icon}` : "-"}
              </p>
            </Card>
          </div>

          <div className="flex justify-center space-x-4">
            <Button size="lg" onClick={spin} disabled={rolling || !selectedSymbol}>
              <RotateCcw className="mr-2 h-5 w-5" /> Spin
            </Button>
            <Button size="lg" variant="outline" onClick={clear}>
              Clear
            </Button>
          </div>

          {message && <p className="text-center mt-4 text-lg">{message}</p>}

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">History</h3>
            <div className="flex gap-1 overflow-x-auto">
              {history.map((s, i) => (
                <span key={i} className="text-2xl">
                  {s.icon}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
