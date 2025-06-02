// src/app/(main)/games/roulette/page.tsx
"use client";

import React, { useState } from "react";
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

const RED_NUMBERS = new Set([
  1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
]);
const BLACK_NUMBERS = new Set(
  Array.from({ length: 37 }, (_, i) => i).filter((n) => n !== 0 && !RED_NUMBERS.has(n))
);

type BetType = "number" | "color";
type ColorBet = "red" | "black";

export default function RoulettePage() {
  // Player balance (in ETH)
  const [balance, setBalance] = useState<number>(1.23);
  // Current bet amount
  const [betAmount, setBetAmount] = useState<number>(0.05);
  // Bet type & value
  const [betType, setBetType] = useState<BetType>("number");
  const [betNumber, setBetNumber] = useState<number>(1);
  const [betColor, setBetColor] = useState<ColorBet>("red");
  // Last spin result
  const [spinResult, setSpinResult] = useState<number | null>(null);
  const [spinColor, setSpinColor] = useState<"red" | "black" | "green" | null>(null);
  // Last win amount
  const [lastWin, setLastWin] = useState<number>(0);
  // Message to user
  const [message, setMessage] = useState<string>("");

  // Spin logic
  function spinWheel() {
    if (betAmount <= 0 || betAmount > balance) {
      setMessage("Invalid bet amount.");
      return;
    }

    // Deduct bet from balance immediately
    setBalance((prev) => parseFloat((prev - betAmount).toFixed(4)));

    // Random number 0–36
    const result = Math.floor(Math.random() * 37);
    setSpinResult(result);

    // Determine color
    let color: "red" | "black" | "green";
    if (result === 0) {
      color = "green";
    } else if (RED_NUMBERS.has(result)) {
      color = "red";
    } else {
      color = "black";
    }
    setSpinColor(color);

    // Calculate winnings
    let win = 0;
    if (betType === "number") {
      if (result === betNumber) {
        // Payout 35:1 plus return bet
        win = betAmount * 36;
      }
    } else {
      // color bet
      if (
        (betColor === "red" && color === "red") ||
        (betColor === "black" && color === "black")
      ) {
        // Payout 1:1 plus return bet
        win = betAmount * 2;
      }
    }

    if (win > 0) {
      setBalance((prev) => parseFloat((prev + win).toFixed(4)));
      setLastWin(win - betAmount);
      setMessage(`You won ${ (win - betAmount).toFixed(4) } ETH!`);
    } else {
      setLastWin(0);
      setMessage("You lost this round.");
    }
  }

  // Clear bet selections
  function clearBets() {
    setBetAmount(0);
    setBetNumber(1);
    setBetColor("red");
    setMessage("");
    setSpinResult(null);
    setSpinColor(null);
    setLastWin(0);
  }

  return (
    <div className="space-y-8 py-8 px-4 md:px-8 lg:px-16">
      <header className="text-center">
        <Target className="w-16 h-16 mx-auto mb-4 text-primary neon-glow-primary" />
        <h1 className="text-4xl font-bold text-primary text-glow-primary">Roulette</h1>
        <p className="text-lg text-muted-foreground">
          Place your bets and spin the wheel of fortune!
        </p>
      </header>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">European Roulette</CardTitle>
          <CardDescription>
            Classic single-zero roulette for the best odds.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Wheel Result Display */}
          <div className="aspect-video bg-muted rounded-lg flex flex-col items-center justify-center overflow-hidden">
            {spinResult === null ? (
              <p className="text-foreground">Spin the wheel to see the result!</p>
            ) : (
              <>
                <p className="text-4xl font-bold">
                  {spinResult === 0 ? "0" : spinResult}
                </p>
                <p className={`text-2xl ${spinColor === "red" ? "text-red-500" : spinColor === "black" ? "text-black" : "text-green-600"}`}>
                  {spinColor?.toUpperCase()}
                </p>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-card/50">
              <CardHeader>
                <CardTitle className="text-lg">Your Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary">
                  {balance.toFixed(4)} ETH
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/50">
              <CardHeader>
                <CardTitle className="text-lg">Current Bet</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{betAmount.toFixed(4)} ETH</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50">
              <CardHeader>
                <CardTitle className="text-lg">Last Win</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-400">
                  {lastWin.toFixed(4)} ETH
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Betting Controls */}
          <div className="space-y-4">
            <p className="text-center text-muted-foreground">
              Place your bets on the table below.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="betAmount" className="text-sm font-medium">
                  Bet Amount (ETH)
                </Label>
                <Input
                  type="number"
                  id="betAmount"
                  value={betAmount}
                  step="0.001"
                  min="0"
                  onChange={(e) =>
                    setBetAmount(parseFloat(e.currentTarget.value) || 0)
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Bet Type</Label>
                <div className="mt-1 flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="betType"
                      checked={betType === "number"}
                      onChange={() => setBetType("number")}
                      className="cursor-pointer"
                    />
                    <span>Number</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="betType"
                      checked={betType === "color"}
                      onChange={() => setBetType("color")}
                      className="cursor-pointer"
                    />
                    <span>Color</span>
                  </label>
                </div>
              </div>
              {betType === "number" && (
                <div>
                  <Label htmlFor="betNumber" className="text-sm font-medium">
                    Choose Number (0–36)
                  </Label>
                  <Input
                    type="number"
                    id="betNumber"
                    value={betNumber}
                    min={0}
                    max={36}
                    onChange={(e) =>
                      setBetNumber(Math.min(36, Math.max(0, parseInt(e.currentTarget.value) || 0)))
                    }
                    className="mt-1"
                  />
                </div>
              )}
              {betType === "color" && (
                <div>
                  <Label className="text-sm font-medium">Choose Color</Label>
                  <div className="mt-1 flex space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="betColor"
                        checked={betColor === "red"}
                        onChange={() => setBetColor("red")}
                        className="cursor-pointer"
                      />
                      <span className="text-red-500">Red</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="betColor"
                        checked={betColor === "black"}
                        onChange={() => setBetColor("black")}
                        className="cursor-pointer"
                      />
                      <span className="text-black">Black</span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-center space-x-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={spinWheel}
                disabled={betAmount <= 0 || betAmount > balance}
              >
                <RotateCcw className="mr-2 h-5 w-5" /> Spin Wheel
              </Button>
              <Button size="lg" variant="outline" onClick={clearBets}>
                Clear Bets
              </Button>
            </div>

            {message && (
              <p className="text-center mt-4 text-lg font-medium">{message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <section>
        <h2 className="text-2xl font-semibold mb-4">How to Play</h2>
        <Card className="bg-card/50">
          <CardContent className="pt-6 space-y-2 text-sm text-muted-foreground">
            <p>1. Select your chip value (bet amount).</p>
            <p>2. Choose to bet on a specific number (0–36) or on a color (Red/Black).</p>
            <p>3. Click "Spin Wheel" to spin. A random number 0–36 is chosen.</p>
            <p>
              4. If you bet on a number and it matches, you win 35× your bet. If you
              bet on a color and it matches (excluding 0 which is green), you win 1×
              your bet.
            </p>
            <p>5. Winnings are credited to your balance automatically.</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

// Helper functions outside component
function getColorOfNumber(n: number): "red" | "black" | "green" {
  if (n === 0) return "green";
  if (RED_NUMBERS.has(n)) return "red";
  return "black";
}

// Implementation of spinWheel and related state moved inside component
function spinWheel() {
  // Implementation is inside the main component above
}
