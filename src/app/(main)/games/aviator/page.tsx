// src/app/(main)/games/aviator/page.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
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
import { Airplay, Play, RefreshCw } from "lucide-react";

export default function AviatorPage() {
  // Inputs
  const [betAmount, setBetAmount] = useState<number>(0.01);

  // Game states
  type GameState = "idle" | "running" | "cashedOut" | "crashed";
  const [gameState, setGameState] = useState<GameState>("idle");

  // Multiplier state
  const [multiplier, setMultiplier] = useState<number>(1.0);
  const [crashMultiplier, setCrashMultiplier] = useState<number>(0);

  // Outcome
  const [resultMultiplier, setResultMultiplier] = useState<number | null>(null);

  // Ref to interval
  const intervalRef = useRef<number>();

  // Derived values
  const potentialWin =
    resultMultiplier && gameState === "cashedOut"
      ? parseFloat((betAmount * resultMultiplier).toFixed(4))
      : gameState === "running"
      ? parseFloat((betAmount * multiplier).toFixed(4))
      : 0;

  // Start a new round
  function startGame() {
    // Pick a random crash point between 1.00 and 10.00
    const randomCrash = parseFloat((Math.random() * 9 + 1).toFixed(2));
    setCrashMultiplier(randomCrash);
    setMultiplier(1.0);
    setResultMultiplier(null);
    setGameState("running");
  }

  // Effect: drive multiplier when running
  useEffect(() => {
    if (gameState !== "running") {
      return;
    }

    // Every 100ms, increase multiplier by ~1%
    intervalRef.current = window.setInterval(() => {
      setMultiplier((prev) => {
        const next = parseFloat((prev * 1.01).toFixed(2));
        if (next >= crashMultiplier) {
          // Crash happens
          clearInterval(intervalRef.current);
          setMultiplier(crashMultiplier);
          setGameState("crashed");
          return crashMultiplier;
        }
        return next;
      });
    }, 100);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [gameState, crashMultiplier]);

  // Cash out before crash
  function handleCashOut() {
    if (gameState !== "running") return;
    clearInterval(intervalRef.current);
    setResultMultiplier(multiplier);
    setGameState("cashedOut");
  }

  // Reset round
  function handleReset() {
    clearInterval(intervalRef.current);
    setGameState("idle");
    setMultiplier(1.0);
    setCrashMultiplier(0);
    setResultMultiplier(null);
  }

  return (
    <div className="space-y-8 py-8 px-4 md:px-8 lg:px-16">
      <header className="text-center">
        <Airplay className="w-16 h-16 mx-auto mb-4 text-primary neon-glow-primary" />
        <h1 className="text-4xl font-bold text-primary text-glow-primary">Aviator</h1>
        <p className="text-lg text-muted-foreground">
          Watch the multiplier climb—cash out before it crashes!
        </p>
      </header>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Crash Your Bet</CardTitle>
          <CardDescription>
            Place your bet and watch the plane fly higher. Cash out before it crashes!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Betting Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
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
                disabled={gameState === "running"}
              />
            </div>
            <Button
              size="lg"
              className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={startGame}
              disabled={gameState === "running" || betAmount <= 0}
            >
              <Play className="mr-2 h-5 w-5" /> Start Round
            </Button>
          </div>

          {/* Multiplier Display */}
          <div className="flex flex-col items-center py-8 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              {gameState === "idle" && "Press 'Start Round' to begin"}
              {gameState === "running" && "Multiplier"}
              {gameState === "cashedOut" && "Cashed out at"}
              {gameState === "crashed" && "Crashed at"}
            </p>
            <div
              className={`text-6xl font-bold ${
                gameState === "crashed"
                  ? "text-red-500 animate-pulse"
                  : gameState === "cashedOut"
                  ? "text-green-500"
                  : "text-primary"
              }`}
            >
              {gameState === "idle"
                ? "1.00×"
                : `${multiplier.toFixed(2)}×`}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <Button
              size="lg"
              variant="destructive"
              onClick={handleCashOut}
              disabled={gameState !== "running"}
            >
              Cash Out
            </Button>
            <Button size="lg" variant="outline" onClick={handleReset}>
              <RefreshCw className="mr-2 h-5 w-5" /> Reset
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <Card className="bg-card/50 p-4">
              <p className="text-sm text-muted-foreground">Current Bet</p>
              <p className="text-2xl font-bold text-primary">
                {betAmount.toFixed(3)} ETH
              </p>
            </Card>
            <Card className="bg-card/50 p-4">
              <p className="text-sm text-muted-foreground">Potential Win</p>
              <p className="text-2xl font-bold text-green-400">
                {potentialWin.toFixed(4)} ETH
              </p>
            </Card>
            <Card className="bg-card/50 p-4">
              <p className="text-sm text-muted-foreground">Crash Point</p>
              <p className="text-2xl font-bold text-muted-foreground">
                {gameState === "idle" ? "-" : crashMultiplier.toFixed(2)}×
              </p>
            </Card>
          </div>
        </CardContent>
      </Card>

      <section>
        <h2 className="text-2xl font-semibold mb-4">How to Play</h2>
        <Card className="bg-card/50">
          <CardContent className="pt-6 space-y-2 text-sm text-muted-foreground">
            <p>1. Enter your bet amount and click “Start Round”.</p>
            <p>
              2. The multiplier will begin at 1.00× and grow over time.
            </p>
            <p>
              3. Cash out anytime before it crashes to lock in your multiplier.
            </p>
            <p>
              4. If the multiplier reaches the crash point, the round ends and
              you lose your bet.
            </p>
            <p>
              5. Higher crash points yield bigger multipliers, but are riskier.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

