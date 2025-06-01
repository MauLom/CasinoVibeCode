import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, ArrowUpFromLine, ListOrdered } from "lucide-react"; // Using ListOrdered for History
import Image from 'next/image';

interface BalanceCardProps {
  currencyName: string;
  currencySymbol: string;
  balance: string | number;
  usdValue: string | number;
  iconSrc?: string; // URL for crypto icon
  onDeposit?: () => void;
  onWithdraw?: () => void;
  onHistory?: () => void;
}

export function BalanceCard({
  currencyName,
  currencySymbol,
  balance,
  usdValue,
  iconSrc,
  onDeposit,
  onWithdraw,
  onHistory,
}: BalanceCardProps) {
  return (
    <Card className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-3">
          {iconSrc && <Image src={iconSrc} alt={`${currencyName} icon`} width={32} height={32} className="rounded-full" data-ai-hint={`${currencySymbol} crypto`} />}
          <CardTitle className="text-xl font-medium text-primary">{currencyName}</CardTitle>
        </div>
        <span className="text-sm text-muted-foreground">{currencySymbol}</span>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground">
          {typeof balance === 'number' ? balance.toFixed(6) : balance} <span className="text-lg font-normal">{currencySymbol}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          ≈ ${typeof usdValue === 'number' ? usdValue.toFixed(2) : usdValue} USD
        </p>
        <div className="mt-4 flex space-x-2">
          {onDeposit && (
            <Button variant="outline" size="sm" onClick={onDeposit} className="flex-1 border-green-500 text-green-500 hover:bg-green-500 hover:text-white">
              <ArrowDownToLine className="mr-2 h-4 w-4" /> Deposit
            </Button>
          )}
          {onWithdraw && (
            <Button variant="outline" size="sm" onClick={onWithdraw} className="flex-1 border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
              <ArrowUpFromLine className="mr-2 h-4 w-4" /> Withdraw
            </Button>
          )}
           {onHistory && (
            <Button variant="ghost" size="sm" onClick={onHistory} className="flex-1 text-muted-foreground hover:text-accent">
              <ListOrdered className="mr-2 h-4 w-4" /> History
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
