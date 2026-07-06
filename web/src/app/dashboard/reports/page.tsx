import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, FileText } from "lucide-react";

const reportCategories = [
  {
    title: "Financial Reports",
    reports: [
      { name: "Trial Balance", desc: "Summary of all account balances" },
      { name: "Profit & Loss", desc: "Income and expenses by period" },
      { name: "Balance Sheet", desc: "Assets, liabilities, and equity" },
      { name: "Cash Flow", desc: "Inflows and outflows" },
    ],
  },
  {
    title: "Inventory Reports",
    reports: [
      { name: "Stock Valuation", desc: "Current value by item/warehouse" },
      { name: "Stock Ledger", desc: "All stock movements" },
      { name: "Expiry / Dead Stock", desc: "Near-expiry and slow-moving items" },
      { name: "Reorder Suggestions", desc: "Items below reorder point" },
    ],
  },
  {
    title: "Sales & Purchase Reports",
    reports: [
      { name: "Sales Register", desc: "All sales transactions" },
      { name: "Purchase Register", desc: "All purchase transactions" },
      { name: "Profitability", desc: "Profit by product/brand/shop" },
      { name: "Returns Register", desc: "Sales and purchase returns" },
    ],
  },
  {
    title: "AR/AP Reports",
    reports: [
      { name: "Aging Report", desc: "Overdue receivables/payables" },
      { name: "PDC Register", desc: "Post-dated cheques" },
      { name: "Overdue Party List", desc: "Parties with overdue balances" },
      { name: "Collection Report", desc: "Receipts and collections" },
    ],
  },
];

export default function ReportsPage() {
  return (
    <div>
      <Header title="Reports" subtitle="Generate and export business reports" />
      <div className="p-6 grid gap-6 md:grid-cols-2">
        {reportCategories.map((category) => (
          <Card key={category.title}>
            <CardHeader>
              <CardTitle>{category.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {category.reports.map((report) => (
                <div
                  key={report.name}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="font-medium">{report.name}</p>
                    <p className="text-sm text-muted-foreground">{report.desc}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon">
                      <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <FileText className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
