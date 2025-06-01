import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Search, UserPlus, FileDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Mock user data
const users = [
  { id: "usr_1", name: "Alice Wonderland", email: "alice@example.com", wallet: "0x123...abc", joinDate: "2023-01-15", totalBets: 1250.75, status: "Active", avatar: "https://placehold.co/40x40.png?text=AW" },
  { id: "usr_2", name: "Bob The Gambler", email: "bob@example.com", wallet: "0x456...def", joinDate: "2023-02-20", totalBets: 5780.50, status: "Active", avatar: "https://placehold.co/40x40.png?text=BG" },
  { id: "usr_3", name: "Charlie Crypto", email: "charlie@example.com", wallet: "N/A", joinDate: "2023-03-10", totalBets: 0, status: "Pending", avatar: "https://placehold.co/40x40.png?text=CC" },
  { id: "usr_4", name: "Diana Whale", email: "diana@example.com", wallet: "0x789...ghi", joinDate: "2022-11-05", totalBets: 150200.00, status: "VIP", avatar: "https://placehold.co/40x40.png?text=DW" },
  { id: "usr_5", name: "Eve Suspicious", email: "eve@example.com", wallet: "0xabc...123", joinDate: "2023-05-01", totalBets: 50.00, status: "Suspended", avatar: "https://placehold.co/40x40.png?text=ES" },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-accent text-glow-accent">User Management</h1>
          <p className="text-muted-foreground">View, search, and manage casino users.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline"><FileDown className="mr-2 h-4 w-4" /> Export CSV</Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground"><UserPlus className="mr-2 h-4 w-4" /> Add User</Button>
        </div>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>A list of all users in the casino platform.</CardDescription>
          <div className="pt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search users by name, email, or wallet..." className="pl-10 w-full md:w-1/2 lg:w-1/3" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Wallet Address</TableHead>
                <TableHead className="hidden md:table-cell">Joined</TableHead>
                <TableHead className="text-right">Total Bets</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="avatar person" />
                        <AvatarFallback>{user.name.split(" ").map(n=>n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{user.wallet}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{user.joinDate}</TableCell>
                  <TableCell className="text-right font-medium">${user.totalBets.toFixed(2)}</TableCell>
                  <TableCell className="text-center">
                    <Badge 
                      variant={
                        user.status === "Active" ? "default" :
                        user.status === "VIP" ? "default" : // Could be custom 'vip' variant
                        user.status === "Pending" ? "secondary" : 
                        "destructive"
                      }
                      className={
                        user.status === "Active" ? "bg-green-500/20 text-green-400 border-green-500/30" :
                        user.status === "VIP" ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" : "" // Shadcn default for secondary/destructive fine
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit User</DropdownMenuItem>
                        <DropdownMenuItem>View Bet History</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {user.status !== "Suspended" && <DropdownMenuItem className="text-yellow-600 hover:!text-yellow-600 focus:!text-yellow-600">Suspend User</DropdownMenuItem>}
                        {user.status === "Suspended" && <DropdownMenuItem className="text-green-600 hover:!text-green-600 focus:!text-green-600">Unsuspend User</DropdownMenuItem>}
                        <DropdownMenuItem className="text-red-600 hover:!text-red-600 focus:!text-red-600">Delete User</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {/* TODO: Add pagination controls */}
    </div>
  );
}
