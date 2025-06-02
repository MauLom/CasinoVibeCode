// src/app/(main)/games/cryptomines/page.tsx
"use client";

import React, { useEffect, useState } from "react";
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
import { Bomb, Diamond, Play, RefreshCw } from "lucide-react";

export default function CryptoMinesPage() {
  const gridSize = 5; // 5×5 grid
  const totalCells = gridSize * gridSize;

  // Form inputs
  const [betAmount, setBetAmount] = useState<number>(0.01);
  const [numMines, setNumMines] = useState<number>(5);

  // Game state
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [cells, setCells] = useState<
    { hasMine: boolean; isRevealed: boolean }[]
  >([]);
  const [safeCount, setSafeCount] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hitMineIndex, setHitMineIndex] = useState<number | null>(null);
  const [hasCashedOut, setHasCashedOut] = useState(false);

  // Derived values
  const multiplier = 1 + safeCount * 0.1; // e.g. +0.1 per safe reveal
  const potentialWin = parseFloat((betAmount * multiplier).toFixed(4));
  const minesRemaining = numMines; // stays constant

  // Initialize a fresh grid when the user clicks "Start Game"
  function startGame() {
    // Create an array with numMines random unique positions
    const positions = new Set<number>();
    while (positions.size < numMines) {
      const idx = Math.floor(Math.random() * totalCells);
      positions.add(idx);
    }

    // Build cells array
    const newCells = Array.from({ length: totalCells }, (_, i) => ({
      hasMine: positions.has(i),
      isRevealed: false,
    }));

    setCells(newCells);
    setSafeCount(0);
    setIsGameOver(false);
    setHitMineIndex(null);
    setHasCashedOut(false);
    setIsGameStarted(true);
  }

  // Handle clicking a cell
  function handleCellClick(index: number) {
    if (
      !isGameStarted ||
      isGameOver ||
      hasCashedOut ||
      cells[index].isRevealed
    ) {
      return;
    }

    const clickedCell = cells[index];
    const updatedCells = [...cells];

    if (clickedCell.hasMine) {
      // Player hit a mine
      updatedCells[index].isRevealed = true;
      setCells(updatedCells);
      setHitMineIndex(index);
      setIsGameOver(true);
    } else {
      // Reveal safe cell
      updatedCells[index].isRevealed = true;
      setCells(updatedCells);
      setSafeCount((prev) => prev + 1);
    }
  }

  // Handle "Cash Out"
  function handleCashOut() {
    if (!isGameStarted || isGameOver || hasCashedOut) return;
    setHasCashedOut(true);
    setIsGameOver(true);
  }

  // Handle "Reset Game"
  function handleReset() {
    setIsGameStarted(false);
    setCells([]);
    setSafeCount(0);
    setIsGameOver(false);
    setHitMineIndex(null);
    setHasCashedOut(false);
  }

  return (
    <div className="space-y-8 py-8 px-4 md:px-8 lg:px-16">
      <header className="text-center">
        <Bomb className="w-16 h-16 mx-auto mb-4 text-primary neon-glow-primary" />
        <h1 className="text-4xl font-bold text-primary text-glow-primary">
          CryptoMines
        </h1>
        <p className="text-lg text-muted-foreground">
          Uncover crypto treasures, but beware of the mines!
        </p>
      </header>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Minefield Adventure</CardTitle>
          <CardDescription>
            Set your bet, choose the number of mines, and start digging.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
                disabled={isGameStarted && !isGameOver}
              />
            </div>
            <div>
              <Label htmlFor="numMines" className="text-sm font-medium">
                Number of Mines (3-24)
              </Label>
              <Input
                type="number"
                id="numMines"
                value={numMines}
                min={3}
                max={24}
                onChange={(e) =>
                  setNumMines(Math.min(24, Math.max(3, parseInt(e.currentTarget.value) || 3)))
                }
                className="mt-1"
                disabled={isGameStarted && !isGameOver}
              />
            </div>
            <Button
              size="lg"
              className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={startGame}
              disabled={isGameStarted && !isGameOver}
            >
              <Play className="mr-2 h-5 w-5" /> Start Game
            </Button>
          </div>

          {/* Game Grid */}
          <div className="p-4 bg-muted rounded-lg">
            <div
              className="grid gap-1 mx-auto"
              style={{
                gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                maxWidth: "400px",
              }}
            >
              {cells.map((cell, index) => {
                const revealMine = cell.isRevealed && cell.hasMine;
                const revealSafe = cell.isRevealed && !cell.hasMine;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="aspect-square w-full h-full text-2xl p-0 border-border hover:bg-accent/20 relative"
                    onClick={() => handleCellClick(index)}
                    disabled={cell.isRevealed || isGameOver}
                    aria-label={`Cell ${index + 1}`}
                  >
                    {revealMine && (
                      <Bomb className="w-6 h-6 text-red-500 absolute inset-0 m-auto" />
                    )}
                    {revealSafe && (
                      <Diamond className="w-6 h-6 text-green-400 absolute inset-0 m-auto" />
                    )}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <Card className="bg-card/50 p-4">
              <p className="text-sm text-muted-foreground">Current Multiplier</p>
              <p className="text-2xl font-bold text-primary">
                x{multiplier.toFixed(2)}
              </p>
            </Card>
            <Card className="bg-card/50 p-4">
              <p className="text-sm text-muted-foreground">Potential Win</p>
              <p className="text-2xl font-bold text-green-400">
                {potentialWin.toFixed(4)} ETH
              </p>
            </Card>
            <Card className="bg-card/50 p-4">
              <p className="text-sm text-muted-foreground">Mines Remaining</p>
              <p className="text-2xl font-bold">{minesRemaining}</p>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <Button
              size="lg"
              variant="destructive"
              onClick={handleCashOut}
              disabled={!isGameStarted || isGameOver}
            >
              Cash Out
            </Button>
            <Button size="lg" variant="outline" onClick={handleReset}>
              <RefreshCw className="mr-2 h-5 w-5" /> Reset Game
            </Button>
          </div>

          {/* Message Display */}
          {isGameOver && (
            <p className="text-center mt-4 text-lg font-medium">
              {hitMineIndex !== null
                ? "¡Boom! You hit a mine and lost."
                : hasCashedOut
                ? `You cashed out and won ${potentialWin.toFixed(4)} ETH!`
                : safeCount === totalCells - numMines
                ? `Congratulations! You cleared all safe cells and earned ${potentialWin.toFixed(4)} ETH!`
                : ""}
            </p>
          )}
        </CardContent>
      </Card>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Gameplay</h2>
        <Card className="bg-card/50">
          <CardContent className="pt-6 space-y-2 text-sm text-muted-foreground">
            <p>
              1. Enter your bet amount and choose the number of mines on the
              field.
            </p>
            <p>
              2. Click on cells to reveal them. Finding a crypto symbol ({" "}
              <Diamond className="inline h-4 w-4 text-green-400" />) increases
              your multiplier.
            </p>
            <p>
              3. If you hit a mine ({" "}
              <Bomb className="inline h-4 w-4 text-red-500" />), you lose your
              bet for the current round.
            </p>
            <p>
              4. You can “Cash Out” at any time to collect your current
              winnings based on the multiplier.
            </p>
            <p>
              5. The more mines you set, the higher the potential multipliers,
              but also higher risk!
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
