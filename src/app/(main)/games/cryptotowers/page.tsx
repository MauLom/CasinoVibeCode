// src/app/(main)/games/cryptotowers/page.tsx
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
import {
  ArrowLeftRight,
  Play,
  TrendingUp,
  ShieldAlert,
  TowerControl,
  RefreshCw,
} from "lucide-react";

// Tower levels data (level 1 = bottom, level 10 = top)
const towerLevels = [
  { level: 1, reward: 1.1 },
  { level: 2, reward: 1.2 },
  { level: 3, reward: 1.5 },
  { level: 4, reward: 2.0 },
  { level: 5, reward: 3.0 },
  { level: 6, reward: 5.0 },
  { level: 7, reward: 10.0 },
  { level: 8, reward: 25.0 },
  { level: 9, reward: 50.0 },
  { level: 10, reward: 100.0 },
];

export default function CryptoTowersPage() {
  // Form inputs
  const [betAmount, setBetAmount] = useState<number>(10);
  const [riskLevel, setRiskLevel] = useState<"Low" | "Medium" | "High">(
    "Low"
  );

  // Game state
  type GameState = "idle" | "running" | "won" | "lost" | "cashedOut";
  const [gameState, setGameState] = useState<GameState>("idle");

  // Levels to play (slice of towerLevels based on risk)
  const riskCount = riskLevel === "Low" ? 5 : riskLevel === "Medium" ? 7 : 10;
  const gameLevels = towerLevels.slice(0, riskCount);

  // Reverse for visual display (top first)
  const displayLevels = [...gameLevels].slice().reverse();

  // Random safe choices: for each level, true = left is safe, false = right
  const [safeChoices, setSafeChoices] = useState<boolean[]>([]);

  // Current level index (0 = bottom of gameLevels)
  const [currentIndex, setCurrentIndex] = useState(0);

  // Outcome
  const [cashOutMultiplier, setCashOutMultiplier] = useState<number | null>(
    null
  );

  // Initialize game
  function startGame() {
    // Generate random safe side for each level
    const choices = Array.from({ length: riskCount }, () =>
      Math.random() < 0.5
    );
    setSafeChoices(choices);
    setCurrentIndex(0);
    setCashOutMultiplier(null);
    setGameState("running");
  }

  // Handle a choice at current level
  function handleChoice(chosenLeft: boolean) {
    if (gameState !== "running") return;
    if (safeChoices[currentIndex] === chosenLeft) {
      // Correct choice
      const nextIndex = currentIndex + 1;
      if (nextIndex >= gameLevels.length) {
        // Reached top
        setCurrentIndex(nextIndex);
        setGameState("won");
      } else {
        setCurrentIndex(nextIndex);
      }
    } else {
      // Wrong choice → lose
      setGameState("lost");
    }
  }

  // Cash out at current multiplier
  function handleCashOut() {
    if (gameState !== "running") return;
    const multiplier = gameLevels[currentIndex].reward;
    setCashOutMultiplier(multiplier);
    setGameState("cashedOut");
  }

  // Reset entire game
  function handleReset() {
    setGameState("idle");
    setSafeChoices([]);
    setCurrentIndex(0);
    setCashOutMultiplier(null);
  }

  // Determine current multiplier
  const currentMultiplier =
    gameState === "running"
      ? gameLevels[currentIndex].reward
      : gameState === "won"
      ? gameLevels[gameLevels.length - 1].reward
      : cashOutMultiplier || 1;

  return (
    <div className="space-y-8 py-8 px-4 md:px-8 lg:px-16">
      <header className="text-center">
        <TowerControl className="w-16 h-16 mx-auto mb-4 text-primary neon-glow-primary" />
        <h1 className="text-4xl font-bold text-primary text-glow-primary">
          Crypto Towers
        </h1>
        <p className="text-lg text-muted-foreground">
          Climb the tower, choose your path, and win big!
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Game Area */}
        <Card className="lg:col-span-2 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">The Ascent</CardTitle>
            <CardDescription>
              Make the right choices to reach the top.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Tower Visual */}
            <div className="flex flex-col items-center space-y-1 p-4 bg-muted rounded-lg min-h-[400px]">
              {displayLevels.map((item, reverseIndex) => {
                // Determine the corresponding gameLevels index
                const levelIdx =
                  displayLevels.length - 1 - reverseIndex; // bottom=0, top=end
                const isCurrent = levelIdx === currentIndex;
                const isCleared = levelIdx < currentIndex;
                return (
                  <div
                    key={item.level}
                    className={`w-full max-w-xs p-3 rounded text-center ${
                      isCurrent
                        ? "bg-primary/30 border-2 border-primary"
                        : isCleared
                        ? "bg-green-100"
                        : "bg-card/50"
                    }`}
                  >
                    <span className="font-semibold">Level {item.level}</span>{" "}
                    -{" "}
                    <span className="text-green-400">
                      x{item.reward.toFixed(1)}
                    </span>
                    {isCurrent && gameState === "running" && (
                      <div className="mt-2 flex justify-around">
                        <Button
                          variant="outline"
                          className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                          onClick={() => handleChoice(true)}
                        >
                          <ArrowLeftRight className="mr-1 h-4 w-4" /> Left
                        </Button>
                        <Button
                          variant="outline"
                          className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                          onClick={() => handleChoice(false)}
                        >
                          Right{" "}
                          <ArrowLeftRight className="ml-1 h-4 w-4 scale-x-[-1]" />
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Cash Out / Start / Result */}
            <div className="flex justify-center space-x-4">
              {gameState === "idle" && (
                <Button
                  size="lg"
                  className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={startGame}
                >
                  <Play className="mr-2 h-5 w-5" /> Start Climb
                </Button>
              )}
              {gameState === "running" && (
                <Button
                  size="lg"
                  variant="destructive"
                  onClick={handleCashOut}
                >
                  Cash Out (x{currentMultiplier.toFixed(2)})
                </Button>
              )}
              {(gameState === "won" ||
                gameState === "lost" ||
                gameState === "cashedOut") && (
                <Button size="lg" variant="outline" onClick={handleReset}>
                  <RefreshCw className="mr-2 h-5 w-5" /> Reset Game
                </Button>
              )}
            </div>

            {/* Outcome Message */}
            {(gameState === "won" ||
              gameState === "lost" ||
              gameState === "cashedOut") && (
              <p className="text-center text-lg font-medium">
                {gameState === "won" && (
                  <>🎉 You conquered the tower! Payout: {betAmount} × {currentMultiplier.toFixed(1)} = {(betAmount * currentMultiplier).toFixed(2)} ETH</>
                )}
                {gameState === "lost" && <>💥 Wrong path! You lost your bet.</>}
                {gameState === "cashedOut" && (
                  <>💰 Cashed out at x{currentMultiplier.toFixed(2)}! You win {(betAmount * currentMultiplier).toFixed(2)} ETH</>
                )}
              </p>
            )}
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
                <Label htmlFor="towerBetAmount" className="text-sm">
                  Bet Amount (USDT)
                </Label>
                <Input
                  type="number"
                  id="towerBetAmount"
                  value={betAmount}
                  step="1"
                  min="1"
                  onChange={(e) =>
                    setBetAmount(parseFloat(e.currentTarget.value) || 1)
                  }
                  className="mt-1"
                  disabled={gameState === "running"}
                />
              </div>
              <div>
                <Label htmlFor="riskLevel" className="text-sm">
                  Risk Level
                </Label>
                <select
                  id="riskLevel"
                  className="w-full mt-1 block p-2 border border-input rounded-md bg-background focus:ring-accent focus:border-accent"
                  value={riskLevel}
                  onChange={(e) =>
                    setRiskLevel(e.currentTarget.value as any)
                  }
                  disabled={gameState === "running"}
                >
                  <option>Low (5 levels)</option>
                  <option>Medium (7 levels)</option>
                  <option>High (10 levels)</option>
                </select>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Bet:</p>
                <p className="text-2xl font-bold text-primary">
                  {betAmount.toFixed(2)} USDT
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card/80 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                Payouts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-xs space-y-1 text-muted-foreground">
                {/* Show bottom half of levels as example */}
                {gameLevels
                  .slice(0, Math.min(5, gameLevels.length))
                  .map((l) => (
                    <li key={l.level}>
                      Level {l.level}: x{l.reward.toFixed(1)}
                    </li>
                  ))}
                {gameLevels.length > 5 && <li>...and higher!</li>}
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-destructive/10 border-destructive shadow-md">
            <CardHeader>
              <CardTitle className="text-xl text-destructive flex items-center">
                <ShieldAlert className="mr-2 h-5 w-5" />
                Warning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-destructive-foreground/80">
                Choosing incorrectly at any level means you lose your accumulated
                winnings for that climb!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Crypto Towers Strategy
        </h2>
        <Card className="bg-card/50">
          <CardContent className="pt-6 space-y-2 text-sm text-muted-foreground">
            <p>
              1. Set your bet amount and desired risk level. Risk “Low” means 5
              levels, “Medium” 7, “High” 10.
            </p>
            <p>
              2. On each level, choose Left or Right. One path is safe (you
              advance), the other ends the climb (you lose your bet).
            </p>
            <p>
              3. Your potential multiplier increases as you climb. Cash out
              before you guess wrong.
            </p>
            <p>
              4. If you reach the top level safely, you win the top reward
              automatically.
            </p>
            <p>
              5. After starting, you cannot change bet or risk until you reset.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
