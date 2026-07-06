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

export default function PartiesPage() {
  const parties = [
    { code: "C001", name: "ABC Salon", type: "Customer", class: "Salon", balance: 45000, creditLimit: 100000, status: "Active" },
    { code: "C002", name: "Glow Beauty Store", type: "Customer", class: "Retailer", balance: -12000, creditLimit: 50000, status: "Active" },
    { code: "S001", name: "L'Oreal Distributor", type: "Supplier", class: "Distributor", balance: -285000, creditLimit: 0, status: "Active" },
    { code: "S002", name: "Maybelline Wholesale", type: "Supplier", class: "Wholesaler", balance: -45000, creditLimit: 0, status: "Active" },
  ];

  return (
    <div>
      <Header title="Parties" subtitle="Customers, suppliers, and both" />
      <div className="p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard title="Total Customers" value="128" />
          <StatCard title="Total Suppliers" value="42" />
          <StatCard title="Overdue Receivables" value="PKR 245,000" />
          <StatCard title="Overdue Payables" value="PKR 89,000" />
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Party List</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search parties..." className="pl-8 w-64" />
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Party
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                  <TableHead className="text-right">Credit Limit</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parties.map((party) => (
                  <TableRow key={party.code}>
                    <TableCell className="font-medium">{party.code}</TableCell>
                    <TableCell>{party.name}</TableCell>
                    <TableCell>{party.type}</TableCell>
                    <TableCell>{party.class}</TableCell>
                    <TableCell className="text-right">
                      {party.balance > 0 ? `PKR ${party.balance.toLocaleString()}` : `(PKR ${Math.abs(party.balance).toLocaleString()})`}
                    </TableCell>
                    <TableCell className="text-right">
                      {party.creditLimit > 0 ? `PKR ${party.creditLimit.toLocaleString()}` : "—"}
                    </TableCell>
                    <TableCell>
                      <Badge variant="success">{party.status}</Badge>
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

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
