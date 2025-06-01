
"use client";

import * as React from "react"; // Add React import for useState
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ListOrdered, Search, Filter, ArrowRightCircle, Award, Dice5, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range"; 
import type { DateRange } from "react-day-picker";

// Mock history data
const historyItems = [
  { id: "txn_1", type: "Win", game: "Blackjack", amount: "+0.05 ETH", date: "2023-10-26 14:30", status: "Completed" },
  { id: "txn_2", type: "Bet", game: "Roulette", amount: "-10 USDT", date: "2023-10-26 14:00", status: "Completed" },
  { id: "txn_3", type: "Reward", description: "Daily Login Bonus", amount: "+5 CCR", date: "2023-10-26 10:00", status: "Completed" },
  { id: "txn_4", type: "Deposit", currency: "BTC", amount: "+0.001 BTC", date: "2023-10-25 18:00", status: "Completed" },
  { id: "txn_5", type: "Withdrawal", currency: "ETH", amount: "-0.1 ETH", date: "2023-10-24 09:15", status: "Pending" },
  { id: "txn_6", type: "Bet", game: "Aviator", amount: "-25 USDT", date: "2023-10-23 16:45", status: "Lost" },
  { id: "txn_7", type: "Win", game: "CryptoMines", amount: "+50 USDT", date: "2023-10-23 16:40", status: "Completed" },
];

const typeIcons = {
  Bet: <Dice5 className="h-4 w-4 text-red-400" />,
  Win: <Award className="h-4 w-4 text-green-400" />,
  Reward: <Award className="h-4 w-4 text-yellow-400" />,
  Deposit: <ArrowDownToLine className="h-4 w-4 text-blue-400" />,
  Withdrawal: <ArrowUpFromLine className="h-4 w-4 text-orange-400" />,
};

const statusColors = {
  Completed: "text-green-400",
  Pending: "text-yellow-400",
  Failed: "text-red-500",
  Lost: "text-red-400",
};

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedType, setSelectedType] = React.useState("all_types");
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(undefined);

  // Filter logic
  const filteredHistory = historyItems.filter(item => {
    const matchesSearchTerm = 
      item.game?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.currency?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.amount?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType === "all_types" || item.type.toLowerCase() === selectedType;
    
    // Date filtering (basic example, can be more precise)
    const itemDate = new Date(item.date.split(" ")[0]); // Get only date part
    const matchesDateRange = !dateRange || !dateRange.from || (
      itemDate >= dateRange.from && (!dateRange.to || itemDate <= dateRange.to)
    );

    return matchesSearchTerm && matchesType && matchesDateRange;
  });

  return (
    <div className="space-y-8">
      <header className="text-center">
        <ListOrdered className="w-16 h-16 mx-auto mb-4 text-primary neon-glow-primary" />
        <h1 className="text-3xl font-bold text-primary text-glow-primary">Transaction & Bet History</h1>
        <p className="text-lg text-muted-foreground">Review all your past activities on Crypto Casino Royale.</p>
      </header>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>Detailed records of your bets, wins, deposits, and withdrawals.</CardDescription>
          <div className="pt-4 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search by game, currency, or amount..." 
                className="pl-10 w-full" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap md:flex-nowrap">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full md:w-auto min-w-[160px]">
                  <Filter className="mr-2 h-4 w-4 text-muted-foreground"/>
                  <SelectValue placeholder="Filter by Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_types">All Types</SelectItem>
                  <SelectItem value="bet">Bets</SelectItem>
                  <SelectItem value="win">Wins</SelectItem>
                  <SelectItem value="reward">Rewards</SelectItem>
                  <SelectItem value="deposit">Deposits</SelectItem>
                  <SelectItem value="withdrawal">Withdrawals</SelectItem>
                </SelectContent>
              </Select>
              <DatePickerWithRange
                className="w-full md:w-auto"
                date={dateRange}
                onDateChange={setDateRange}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Details</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                       {typeIcons[item.type as keyof typeof typeIcons] || <ArrowRightCircle className="h-4 w-4 text-muted-foreground" />}
                      <span className="font-medium">{item.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.game ? `Game: ${item.game}` : item.description || `Currency: ${item.currency}`}
                  </TableCell>
                  <TableCell className={`text-right font-medium ${item.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                    {item.amount}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{item.date}</TableCell>
                  <TableCell className="text-center">
                    <Badge 
                      variant={item.status === "Completed" || item.status === "Pending" ? "outline" : "destructive"}
                      className={statusColors[item.status as keyof typeof statusColors] || "text-muted-foreground"}
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
               {filteredHistory.length === 0 && (
                <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                        No history records found for the current filters.
                    </TableCell>
                </TableRow>
               )}
            </TableBody>
          </Table>
           {historyItems.length > filteredHistory.length && filteredHistory.length > 0 && ( // Show load more if not all items are shown by filter
             <div className="mt-6 flex justify-center">
                <Button variant="outline">Load More (Not Implemented)</Button>
             </div>
           )}
        </CardContent>
      </Card>
    </div>
  );
}
