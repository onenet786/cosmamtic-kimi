import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, ArrowDownLeft, ArrowUpRight } from "lucide-react";

export default function PaymentsPage() {
  const transactions = [
    { number: "RCP-001", party: "ABC Salon", date: "2026-07-05", amount: 25000, type: "Receipt", mode: "Cash" },
    { number: "PMT-001", party: "L'Oreal Distributor", date: "2026-07-04", amount: 150000, type: "Payment", mode: "Bank Transfer" },
    { number: "RCP-002", party: "Glow Beauty Store", date: "2026-07-03", amount: 8000, type: "Receipt", mode: "Cheque" },
  ];

  return (
    <div>
      <Header title="Payments" subtitle="Receipts, payments, PDC, and allocations" />
      <div className="p-6 space-y-6">
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Receipt
          </Button>
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            New Payment
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Number</TableHead>
                  <TableHead>Party</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx.number}>
                    <TableCell className="font-medium">{tx.number}</TableCell>
                    <TableCell>{tx.party}</TableCell>
                    <TableCell>{tx.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {tx.type === "Receipt" ? (
                          <ArrowDownLeft className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4 text-red-600" />
                        )}
                        {tx.type}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{tx.mode}</Badge>
                    </TableCell>
                    <TableCell className="text-right">PKR {tx.amount.toLocaleString()}</TableCell>
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
