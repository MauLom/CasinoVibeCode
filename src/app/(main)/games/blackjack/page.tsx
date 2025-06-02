// src/app/(main)/games/blackjack/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Hand, PlusCircle, Shuffle } from "lucide-react";

type Suit = "♠" | "♥" | "♦" | "♣";
type Rank = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K";

interface PlayingCard {
  rank: Rank;
  suit: Suit;
  value: number; // Valor base (As = 11 aquí; ajustaremos en calculateHandValue)
}

// 1) Crea un mazo de 52 cartas
function createDeck(): PlayingCard[] {
  const suits: Suit[] = ["♠", "♥", "♦", "♣"];
  const ranks: Rank[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  const deck: PlayingCard[] = [];

  suits.forEach((suit) => {
    ranks.forEach((rank) => {
      let value: number;
      if (rank === "A") {
        value = 11; // Ajustaremos en calculateHandValue
      } else if (["J", "Q", "K"].includes(rank)) {
        value = 10;
      } else {
        value = parseInt(rank);
      }
      deck.push({ rank, suit, value });
    });
  });

  return deck;
}

// 2) Fisher-Yates shuffle
function shuffleDeck(deck: PlayingCard[]): PlayingCard[] {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
}

// 3) Calcula el valor óptimo de la mano, tratando Ases como 11 o 1
function calculateHandValue(hand: (PlayingCard | undefined)[]): number {
  // Filtramos cartas undefined
  const validCards = hand.filter((c): c is PlayingCard => c !== undefined);

  // Suma inicial (todos los Ases contados como 11)
  let total = validCards.reduce((sum, c) => sum + c.value, 0);

  // Contamos cuántos Ases hay
  let aceCount = validCards.filter((c) => c.rank === "A").length;

  // Si total > 21 y hay Ases que aún valen 11, vamos bajando algunos a 1
  while (total > 21 && aceCount > 0) {
    total -= 10; // convierte un As de 11 a 1
    aceCount--;
  }

  return total;
}

// 4) Componente para “dar vuelta” la carta (face-down)
function CardBack() {
  return (
    <div className="w-20 h-28 border rounded-lg shadow-md bg-gray-300 flex items-center justify-center text-xl animate-pulse">
      🂠
    </div>
  );
}

// 5) Componente para mostrar la cara de la carta
function CardFace({ card }: { card: PlayingCard }) {
  const isRed = card.suit === "♥" || card.suit === "♦";
  return (
    <div
      className={`w-20 h-28 border rounded-lg shadow-md bg-white text-${
        isRed ? "red-600" : "black"
      } flex flex-col justify-between p-1 transition-transform duration-300 ease-in-out transform hover:scale-105`}
    >
      <div className="text-sm">
        {card.rank}
        {card.suit}
      </div>
      <div className="self-end text-sm rotate-180">
        {card.rank}
        {card.suit}
      </div>
    </div>
  );
}

export default function BlackjackPage() {
  // Estados principales
  const [deck, setDeck] = useState<PlayingCard[]>([]);
  const [playerHand, setPlayerHand] = useState<PlayingCard[]>([]);
  const [dealerHand, setDealerHand] = useState<PlayingCard[]>([]);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState<string>("");

  // Controla cuándo iniciar la secuencia de revelar cartas
  const [revealDealer, setRevealDealer] = useState(false);
  // Cuántas cartas del dealer ya están “reveladas” para mostrar
  const [dealerRevealCount, setDealerRevealCount] = useState(1);

  // Al montar (o cuando se presiona “New Game”), inicializamos todo
  useEffect(() => {
    startNewGame();
  }, []);

  // 6) Reinicia la partida: barajamos, repartimos dos cartas a cada uno
  function startNewGame() {
    const newDeck = shuffleDeck(createDeck());
    const playerStart = [newDeck[0], newDeck[1]];
    const dealerStart = [newDeck[2], newDeck[3]];
    const remaining = newDeck.slice(4);

    setDeck(remaining);
    setPlayerHand(playerStart);
    setDealerHand(dealerStart);
    setIsPlayerTurn(true);
    setGameOver(false);
    setRevealDealer(false);
    setDealerRevealCount(1); // solo la primera carta está “revelada” al iniciar
    setMessage("");
  }

  // 7) Toma la carta superior del mazo
  function drawCard(): PlayingCard | null {
    if (deck.length === 0) return null;
    const [top, ...rest] = deck;
    setDeck(rest);
    return top;
  }

  // 8) Acción “Hit” del jugador
  function handleHit() {
    if (!isPlayerTurn || gameOver) return;
    const card = drawCard();
    if (!card) return;

    const updatedHand = [...playerHand, card];
    setPlayerHand(updatedHand);

    const total = calculateHandValue(updatedHand);
    if (total > 21) {
      // Jugador se pasa (bust)
      setIsPlayerTurn(false);
      setRevealDealer(true);
      setGameOver(true);
      setMessage("¡Bust! El crupier gana.");
    }
  }

  // 9) Acción “Stand” del jugador → turno del dealer
  function handleStand() {
    if (!isPlayerTurn || gameOver) return;
    setIsPlayerTurn(false);
    setRevealDealer(true);

    // Copiamos mano y mazo para que el dealer robe
    let tempDealerHand = [...dealerHand];
    let tempDeck = [...deck];

    const drawFromTemp = () => {
      if (tempDeck.length === 0) return null;
      const [c, ...rest] = tempDeck;
      tempDeck = rest;
      tempDealerHand.push(c);
      return c;
    };

    // El dealer roba hasta llegar a 17 o más
    let dealerTotal = calculateHandValue(tempDealerHand);
    while (dealerTotal < 17) {
      const card = drawFromTemp();
      if (!card) break;
      dealerTotal = calculateHandValue(tempDealerHand);
    }

    // Actualizamos el estado con la mano final del dealer y el mazo restante
    setDealerHand(tempDealerHand);
    setDeck(tempDeck);
    // En este punto, revealDealer ya está en true, así que los useEffect cuidarán de la animación

    // Comparamos resultados (pero primero esperamos a que terminen de revelarse todas las cartas)
    setTimeout(() => {
      const playerTotal = calculateHandValue(playerHand);
      dealerTotal = calculateHandValue(tempDealerHand);

      if (dealerTotal > 21) {
        setMessage("¡El crupier se pasa! Tú ganas.");
      } else if (dealerTotal === playerTotal) {
        setMessage("Empate (Push).");
      } else if (dealerTotal > playerTotal) {
        setMessage("El crupier gana.");
      } else {
        setMessage("¡Tú ganas!");
      }
      setGameOver(true);
    }, dealerHand.length * 500 + 300); // espera a que termine de revelarse cada carta (500ms c/u) + un «bump» de 300ms
  }

  // 10) Acción “Double Down”: una carta más y luego “Stand” automático
  function handleDoubleDown() {
    // Solo se permite al principio (2 cartas) y si sigue siendo turno del jugador
    if (!isPlayerTurn || gameOver || playerHand.length !== 2) return;
    const card = drawCard();
    if (!card) return;
    const updatedPlayer = [...playerHand, card];
    setPlayerHand(updatedPlayer);

    const total = calculateHandValue(updatedPlayer);
    if (total > 21) {
      // bust inmediato
      setRevealDealer(true);
      setIsPlayerTurn(false);
      setGameOver(true);
      setMessage("¡Bust! El crupier gana.");
    } else {
      // Si no bust, procedemos a stand de inmediato (igual que handleStand)
      setIsPlayerTurn(false);
      setRevealDealer(true);

      let tempDealerHand = [...dealerHand];
      let tempDeck = [...deck];

      const drawFromTemp = () => {
        if (tempDeck.length === 0) return null;
        const [c, ...rest] = tempDeck;
        tempDeck = rest;
        tempDealerHand.push(c);
        return c;
      };

      let dealerTotal = calculateHandValue(tempDealerHand);
      while (dealerTotal < 17) {
        const c = drawFromTemp();
        if (!c) break;
        dealerTotal = calculateHandValue(tempDealerHand);
      }

      setDealerHand(tempDealerHand);
      setDeck(tempDeck);

      // Comparamos resultados tras que todas las cartas se hayan revelado
      setTimeout(() => {
        const playerFinal = calculateHandValue(updatedPlayer);
        dealerTotal = calculateHandValue(tempDealerHand);

        if (dealerTotal > 21) {
          setMessage("¡El crupier se pasa! Tú ganas.");
        } else if (dealerTotal === playerFinal) {
          setMessage("Empate (Push).");
        } else if (dealerTotal > playerFinal) {
          setMessage("El crupier gana.");
        } else {
          setMessage("¡Tú ganas!");
        }
        setGameOver(true);
      }, tempDealerHand.length * 500 + 300);
    }
  }

  // 11) Efecto: cuando revealDealer pase a true, comenzamos a “incrementar” dealerRevealCount
  useEffect(() => {
    if (!revealDealer) return;

    // Siempre partimos con revelar la primer carta (`dealerRevealCount = 1`)
    setDealerRevealCount(1);

    // Programamos un timeout por cada carta extra del crupier
    const timeouts: NodeJS.Timeout[] = [];
    for (let i = 1; i < dealerHand.length; i++) {
      // i=1 = segunda carta, i=2 = tercera, ...
      const t = setTimeout(() => {
        setDealerRevealCount((prev) => prev + 1);
      }, i * 500); // 500ms de diferencia entre cada carta
      timeouts.push(t);
    }

    return () => {
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, [revealDealer, dealerHand]);

  // Totales en pantalla
  const playerTotal = calculateHandValue(playerHand);
  const dealerVisibleTotal = revealDealer
    ? calculateHandValue(dealerHand)
    : calculateHandValue([dealerHand[0]]);

  return (
    <div className="space-y-8 py-8 px-4 md:px-8 lg:px-16">
      <header className="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-layers-3 mx-auto mb-4 text-primary neon-glow-primary"
        >
          <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a2 2 0 0 0-1.1 1.69v6.46a2 2 0 0 0 1.1 1.69l8.59 3.9a2 2 0 0 0 1.66 0l8.59-3.9a2 2 0 0 0 1.1-1.69v-6.46a2 2 0 0 0-1.1-1.69L12.83 2.18Z" />
          <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
          <path d="m22 12.73-9.17 4.16a2 2 0 0 1-1.66 0L2 12.73" />
        </svg>
        <h1 className="text-4xl font-bold text-primary text-glow-primary">Blackjack</h1>
        <p className="text-lg text-muted-foreground">
          Beat the dealer without going over 21!
        </p>
      </header>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Classic Blackjack</CardTitle>
          <CardDescription>
            Aim for 21 and test your luck against the house.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Dealer's Hand */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Dealer's Hand</h3>
              <div className="flex space-x-2 mb-2">
                {/* Primera carta siempre visible */}
                {dealerHand[0] && <CardFace card={dealerHand[0]} />}

                {/* Segunda carta: si revealDealer=false, muestro reverso */}
                {dealerHand[1] && (
                  revealDealer && dealerRevealCount > 1 ? (
                    <CardFace card={dealerHand[1]} />
                  ) : (
                    <CardBack />
                  )
                )}

                {/* Si el dealer robó más cartas (tras stand), las revelamos gradualmente */}
                {revealDealer &&
                  dealerHand.slice(2).map((c, idx) => {
                    // idx=0 => tercera carta, idx=1 => cuarta, etc. Entonces la comparamos con "dealerRevealCount - 2"
                    return idx + 2 < dealerRevealCount ? (
                      <CardFace key={idx} card={c} />
                    ) : (
                      // Mientras no toque revelarse, reservamos un espacio en blanco (mismo tamaño) para no “saltar” cajas
                      <div key={idx} className="w-20 h-28" />
                    );
                  })}
              </div>
              <p className="text-sm text-muted-foreground">
                Dealer total: {revealDealer ? dealerVisibleTotal : "?"}
              </p>
            </div>

            {/* Player's Hand */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Your Hand</h3>
              <div className="flex space-x-2 mb-2">
                {playerHand.map((c, idx) => (
                  <CardFace key={idx} card={c} />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Your total: {playerTotal}
              </p>
            </div>
          </div>

          {/* Mensaje de resultado y botones de acción */}
          <div className="pt-4 border-t space-y-2">
            {message && (
              <p className="text-center font-medium text-lg">{message}</p>
            )}

            <div className="flex justify-center space-x-2 sm:space-x-4">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={handleHit}
                disabled={!isPlayerTurn || gameOver}
              >
                <PlusCircle className="mr-2 h-5 w-5" /> Hit
              </Button>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleStand}
                disabled={!isPlayerTurn || gameOver}
              >
                <Hand className="mr-2 h-5 w-5" /> Stand
              </Button>
              <Button
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
                onClick={handleDoubleDown}
                disabled={
                  !isPlayerTurn ||
                  gameOver ||
                  playerHand.length !== 2 // Solo si el jugador tiene exactamente 2 cartas
                }
              >
                Double Down
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={startNewGame}
              >
                <Shuffle className="mr-2 h-5 w-5" /> New Game
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Blackjack Rules</h2>
        <Card className="bg-card/50">
          <CardContent className="pt-6 space-y-2 text-sm text-muted-foreground">
            <p>
              - The goal is to get a hand total closer to 21 than the dealer,
              without exceeding 21.
            </p>
            <p>
              - Face cards (King, Queen, Jack) are worth 10. Aces are worth 1
              or 11.
            </p>
            <p>- “Hit” to take another card. “Stand” to keep your current hand.</p>
            <p>
              - “Double Down” doubles your bet (conceptually) and gives you
              exactly one more card, then you must stand.
            </p>
            <p>- Dealer must hit until their hand total is 17 or more.</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
