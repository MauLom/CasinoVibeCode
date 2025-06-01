import { Gem } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter  } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-background to-slate-900">
      <Card className="w-full max-w-md shadow-2xl bg-card/80 backdrop-blur-sm border-primary/30">
        <CardHeader className="text-center">
          <div className="inline-block p-4 mb-4 rounded-full bg-primary/20">
            <Gem className="w-16 h-16 text-primary neon-glow-primary" />
          </div>
          <CardTitle className="text-4xl font-bold text-primary text-glow-primary">
            Crypto Casino Royale
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Your Premier Destination for Crypto Gaming
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-foreground/90">
            Experience the thrill of the casino with your favorite cryptocurrencies. Fair, secure, and exciting games await you.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center pt-6">
          <p className="text-xs text-muted-foreground">
            Play responsibly. Must be of legal age to participate.
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
