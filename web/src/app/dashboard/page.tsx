import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatNumber } from "@/lib/utils";
import {
  ArrowDownRight,
  ArrowUpRight,
  Package,
  ShoppingCart,
  Users,
  Wallet,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div>
      <Header
        title="Dashboard"
        subtitle="Real-time overview of sales, inventory, and cash flow"
      />

      <div className="p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Today's Sales"
            value={formatCurrency(124750)}
            change="+12.5%"
            trend="up"
            icon={<ShoppingCart className="h-5 w-5 text-emerald-600" />}
          />
          <KPICard
            title="Cash Position"
            value={formatCurrency(45600)}
            change="-3.2%"
            trend="down"
            icon={<Wallet className="h-5 w-5 text-blue-600" />}
          />
          <KPICard
            title="Stock Value"
            value={formatCurrency(2845000)}
            change="+1.8%"
            trend="up"
            icon={<Package className="h-5 w-5 text-violet-600" />}
          />
          <KPICard
            title="Active Customers"
            value={formatNumber(128)}
            change="+5"
            trend="up"
            icon={<Users className="h-5 w-5 text-amber-600" />}
          />
        </div>

        {/* Alerts & Approvals */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ApprovalRow
                type="Return"
                detail="Cashier Ali requested return for Invoice #1001"
                amount={2450}
                status="pending"
                time="2 min ago"
              />
              <ApprovalRow
                type="Discount"
                detail="20% discount on Invoice #1004 exceeds threshold"
                amount={1200}
                status="pending"
                time="15 min ago"
              />
              <ApprovalRow
                type="Transfer"
                detail="Stock transfer WH → Main Shop awaiting approval"
                amount={0}
                status="pending"
                time="1 hour ago"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stock Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <AlertRow
                type="reorder"
                item="L'Oreal Shampoo 200ml"
                value="12 pcs left"
              />
              <AlertRow
                type="expiry"
                item="Maybelline Lipstick #205"
                value="Expires in 15 days"
              />
              <AlertRow
                type="expiry"
                item="Garnier Face Wash"
                value="Expires in 28 days"
              />
              <AlertRow
                type="reorder"
                item="Dove Body Lotion"
                value="8 pcs left"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function KPICard({
  title,
  value,
  change,
  trend,
  icon,
}: {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          {trend === "up" ? (
            <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-600" />
          ) : (
            <ArrowDownRight className="mr-1 h-3 w-3 text-red-600" />
          )}
          <span className={trend === "up" ? "text-emerald-600" : "text-red-600"}>
            {change}
          </span>
          <span className="ml-1">from yesterday</span>
        </div>
      </CardContent>
    </Card>
  );
}

function ApprovalRow({
  type,
  detail,
  amount,
  status,
  time,
}: {
  type: string;
  detail: string;
  amount: number;
  status: string;
  time: string;
}) {
  return (
    <div className="flex items-start justify-between rounded-lg border p-3">
      <div className="flex gap-3">
        <div className="mt-0.5">
          <Clock className="h-4 w-4 text-amber-600" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">{type}</span>
            <Badge variant="warning">{status}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{detail}</p>
          <p className="text-xs text-muted-foreground mt-1">{time}</p>
        </div>
      </div>
      {amount > 0 && (
        <div className="text-sm font-semibold">{formatCurrency(amount)}</div>
      )}
    </div>
  );
}

function AlertRow({
  type,
  item,
  value,
}: {
  type: "reorder" | "expiry";
  item: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      {type === "reorder" ? (
        <AlertTriangle className="h-4 w-4 text-red-600" />
      ) : (
        <CheckCircle2 className="h-4 w-4 text-amber-600" />
      )}
      <div className="flex-1">
        <p className="text-sm font-medium">{item}</p>
        <p className="text-xs text-muted-foreground">{value}</p>
      </div>
      <Badge variant={type === "reorder" ? "destructive" : "warning"}>
        {type === "reorder" ? "Low" : "Expiry"}
      </Badge>
    </div>
  );
}
