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

export default function SalesPage() {
  const orders = [
    { number: "SO-001", customer: "ABC Salon", date: "2026-07-05", amount: 45000, status: "Confirmed" },
    { number: "SO-002", customer: "Glow Beauty Store", date: "2026-07-05", amount: 12000, status: "Draft" },
    { number: "SO-003", customer: "Retail Customer", date: "2026-07-04", amount: 8500, status: "Delivered" },
  ];

  return (
    <div>
      <Header title="Sales" subtitle="Quotations, orders, invoices, and deliveries" />
      <div className="p-6 space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Sales Orders</CardTitle>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Sales Order
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SO Number</TableHead>
                  <TableHead>Customer</TableHead>
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
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell className="text-right">PKR {order.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={order.status === "Delivered" ? "success" : order.status === "Draft" ? "outline" : "warning"}>
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
