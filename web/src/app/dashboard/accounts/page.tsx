import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus } from "lucide-react";

export default function AccountsPage() {
  const accounts = [
    { code: "1", name: "Assets", level: "Class", type: "Asset", balance: "2,450,000" },
    { code: "11", name: "Current Assets", level: "Group", type: "Asset", balance: "1,250,000" },
    { code: "1101", name: "Inventory Control", level: "Ledger", type: "Asset", balance: "845,000" },
    { code: "1102", name: "Cash Control", level: "Ledger", type: "Asset", balance: "120,000" },
    { code: "1103", name: "Bank Control", level: "Ledger", type: "Asset", balance: "285,000" },
    { code: "2", name: "Liabilities", level: "Class", type: "Liability", balance: "850,000" },
    { code: "2101", name: "Accounts Payable Control", level: "Ledger", type: "Liability", balance: "450,000" },
  ];

  return (
    <div>
      <Header title="Chart of Accounts" subtitle="Manage your 4-level chart of accounts" />
      <div className="p-6 space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Accounts</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search accounts..." className="pl-8 w-64" />
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Account
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Balance (PKR)</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accounts.map((account) => (
                  <TableRow key={account.code}>
                    <TableCell className="font-medium">{account.code}</TableCell>
                    <TableCell>{account.name}</TableCell>
                    <TableCell>{account.level}</TableCell>
                    <TableCell>{account.type}</TableCell>
                    <TableCell className="text-right">{account.balance}</TableCell>
                    <TableCell>
                      <Badge variant="success">Active</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
