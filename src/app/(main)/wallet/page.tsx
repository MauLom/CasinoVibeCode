"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Link as LinkIcon, Unlink, PlusCircle, Send } from "lucide-react";
import Image from "next/image";

// Mock connected wallet state
const connectedWallet = {
  address: "0x1234...AbCd",
  network: "Ethereum Mainnet",
  balance: "2.345 ETH",
  icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png" // Example ETH icon
};
// const connectedWallet = null; // For disconnected state

const availableWallets = [
  { name: "MetaMask", icon: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg", id: "metamask", dataAiHint: "fox logo" },
  { name: "WalletConnect", icon: "https://avatars.githubusercontent.com/u/37784886", id: "walletconnect", dataAiHint: "wallet connect" },
  // Add more wallet options here
];

export default function WalletPage() {
  const handleConnectWallet = (walletId: string) => {
    console.log(`Attempting to connect ${walletId}`);
    // TODO: Implement actual wallet connection logic (e.g., using ethers.js, web3modal, wagmi)
    alert(`Connect to ${walletId} (not implemented)`);
  };

  const handleDisconnectWallet = () => {
    console.log("Disconnecting wallet");
    // TODO: Implement disconnect logic
    alert("Disconnect wallet (not implemented)");
  };

  return (
    <div className="space-y-8">
      <header className="text-center">
        <ShieldCheck className="w-16 h-16 mx-auto mb-4 text-primary neon-glow-primary" />
        <h1 className="text-4xl font-bold text-primary text-glow-primary">My Wallet</h1>
        <p className="text-lg text-muted-foreground">Manage your connected cryptocurrency wallets and balances.</p>
      </header>

      {connectedWallet ? (
        <Card className="shadow-xl bg-card/80">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {connectedWallet.icon && <Image src={connectedWallet.icon} alt="Wallet Icon" width={40} height={40} className="rounded-full" data-ai-hint="crypto logo"/>}
                <CardTitle className="text-2xl">Connected Wallet</CardTitle>
              </div>
              <Badge variant="secondary" className="bg-green-500/20 text-green-400">Connected</Badge>
            </div>
            <CardDescription>Your active Web3 wallet for transactions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="font-mono text-lg text-accent break-all">{connectedWallet.address}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Network</p>
              <p className="text-lg">{connectedWallet.network}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Balance</p>
              <p className="text-lg font-semibold text-primary">{connectedWallet.balance}</p>
            </div>
            <Separator />
            <div className="flex space-x-4">
              <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                <PlusCircle className="mr-2 h-5 w-5" /> Deposit Funds
              </Button>
              <Button variant="outline" className="flex-1 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                <Send className="mr-2 h-5 w-5" /> Withdraw Funds
              </Button>
            </div>
            <Button variant="destructive" onClick={handleDisconnectWallet} className="w-full">
              <Unlink className="mr-2 h-5 w-5" /> Disconnect Wallet
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-xl bg-card/80">
          <CardHeader>
            <CardTitle className="text-2xl">Connect Your Wallet</CardTitle>
            <CardDescription>Connect a Web3 wallet to deposit, withdraw, and play with cryptocurrencies.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">Select your preferred wallet provider:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {availableWallets.map((wallet) => (
                <Button
                  key={wallet.id}
                  variant="outline"
                  className="h-auto p-6 flex flex-col items-center space-y-3 border-border hover:border-primary hover:bg-primary/10 group transition-all"
                  onClick={() => handleConnectWallet(wallet.name)}
                >
                  <Image src={wallet.icon} alt={`${wallet.name} logo`} width={48} height={48} className="group-hover:scale-110 transition-transform" data-ai-hint={wallet.dataAiHint}/>
                  <span className="text-lg font-medium text-foreground group-hover:text-primary">{wallet.name}</span>
                  <LinkIcon className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                </Button>
              ))}
            </div>
            <p className="mt-6 text-xs text-muted-foreground text-center">
              By connecting your wallet, you agree to our Terms of Service and Privacy Policy.
            </p>
          </CardContent>
        </Card>
      )}

      <section>
        <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
        <Card className="bg-card/50">
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-center py-8">Transaction history will appear here.</p>
            {/* Placeholder for transaction list */}
            {/* <ScrollArea className="h-[200px]"> ... list items ... </ScrollArea> */}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
