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
import { Plus, FileText } from "lucide-react";

export default function PurchasesPage() {
  const orders = [
    { number: "PO-001", supplier: "L'Oreal Distributor", date: "2026-07-01", amount: 450000, status: "Confirmed" },
    { number: "PO-002", supplier: "Maybelline Wholesale", date: "2026-07-03", amount: 120000, status: "Partially Received" },
    { number: "PO-003", supplier: "Garnier Supplier", date: "2026-07-04", amount: 85000, status: "Draft" },
  ];

  return (
    <div>
      <Header title="Purchases" subtitle="Purchase orders, GRN, and invoices" />
      <div className="p-6 space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Purchase Orders</CardTitle>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Purchase Order
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>PO Number</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.number}>
                    <TableCell className="font-medium">{order.number}</TableCell>
                    <TableCell>{order.supplier}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell className="text-right">PKR {order.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={order.status === "Confirmed" ? "success" : order.status === "Draft" ? "outline" : "warning"}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <FileText className="mr-1 h-4 w-4" />
                        View
                      </Button>
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
