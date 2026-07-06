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
import { Search, Plus, AlertTriangle } from "lucide-react";

export default function InventoryPage() {
  const items = [
    { sku: "LOREAL-SH-200", name: "L'Oreal Shampoo 200ml", category: "Hair Care", brand: "L'Oreal", stock: 45, baseUnit: "Pcs", reorder: 50, expiry: "2027-05-15" },
    { sku: "MAYB-LIP-205", name: "Maybelline Lipstick #205", category: "Makeup", brand: "Maybelline", stock: 12, baseUnit: "Pcs", reorder: 20, expiry: "2026-08-20" },
    { sku: "GARN-FW-100", name: "Garnier Face Wash 100ml", category: "Skin Care", brand: "Garnier", stock: 8, baseUnit: "Pcs", reorder: 30, expiry: "2026-09-10" },
    { sku: "DOVE-LOT-250", name: "Dove Body Lotion 250ml", category: "Skin Care", brand: "Dove", stock: 120, baseUnit: "Pcs", reorder: 60, expiry: "2027-03-01" },
  ];

  return (
    <div>
      <Header title="Inventory" subtitle="Multi-UOM, batch, and stock valuation" />
      <div className="p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard title="Total SKUs" value="1,245" />
          <StatCard title="Stock Value" value="PKR 2,845,000" />
          <StatCard title="Low Stock Items" value="18" alert />
          <StatCard title="Near Expiry" value="7" alert />
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Stock Items</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search items..." className="pl-8 w-64" />
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SKU</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.sku}>
                    <TableCell className="font-medium">{item.sku}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.brand}</TableCell>
                    <TableCell className="text-right">
                      {item.stock} {item.baseUnit}
                    </TableCell>
                    <TableCell>{item.expiry}</TableCell>
                    <TableCell>
                      {item.stock < item.reorder ? (
                        <Badge variant="destructive">
                          <AlertTriangle className="mr-1 h-3 w-3" />
                          Low
                        </Badge>
                      ) : (
                        <Badge variant="success">OK</Badge>
                      )}
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

function StatCard({ title, value, alert }: { title: string; value: string; alert?: boolean }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`text-2xl font-bold ${alert ? "text-red-600" : ""}`}>{value}</p>
      </CardContent>
    </Card>
  );
}
