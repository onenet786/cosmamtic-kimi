import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { CheckCircle2, XCircle, Clock, ArrowRight } from "lucide-react";

export default function ApprovalsPage() {
  const approvals = [
    { id: 1, type: "Return", source: "POS - Main Shop", detail: "Invoice #1001 - L'Oreal Shampoo", amount: 2450, requestedBy: "Ali (Cashier)", time: "2 min ago" },
    { id: 2, type: "Discount", source: "POS - Main Shop", detail: "20% discount on Invoice #1004", amount: 1200, requestedBy: "Sara (Cashier)", time: "15 min ago" },
    { id: 3, type: "Transfer", source: "Warehouse", detail: "Stock transfer WH → Main Shop", amount: 0, requestedBy: "Imran (Warehouse)", time: "1 hour ago" },
    { id: 4, type: "Expense", source: "Main Shop", detail: "Shop maintenance expense", amount: 15000, requestedBy: "Manager", time: "3 hours ago" },
  ];

  return (
    <div>
      <Header title="Approval Center" subtitle="Review and approve requests from all branches" />
      <div className="p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard title="Pending" value="4" alert />
          <StatCard title="Approved Today" value="12" />
          <StatCard title="Rejected Today" value="2" />
          <StatCard title="Avg Response Time" value="4 min" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Pending Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {approvals.map((approval) => (
              <div
                key={approval.id}
                className="flex flex-col md:flex-row md:items-center justify-between rounded-lg border p-4 gap-4"
              >
                <div className="flex gap-4">
                  <div className="mt-1">
                    <Clock className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold">{approval.type}</span>
                      <Badge variant="warning">Pending</Badge>
                      <span className="text-xs text-muted-foreground">{approval.source}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{approval.detail}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Requested by {approval.requestedBy} • {approval.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 md:justify-end">
                  {approval.amount > 0 && (
                    <div className="text-lg font-bold">{formatCurrency(approval.amount)}</div>
                  )}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <XCircle className="mr-1 h-4 w-4" />
                      Reject
                    </Button>
                    <Button size="sm">
                      <CheckCircle2 className="mr-1 h-4 w-4" />
                      Approve
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <HistoryRow type="Return" detail="Invoice #998" decision="Approved" by="Owner" time="Today, 10:30 AM" />
              <HistoryRow type="Discount" detail="Invoice #995 - 15%" decision="Rejected" by="Owner" time="Today, 09:15 AM" />
              <HistoryRow type="Transfer" detail="Main Shop → Branch 2" decision="Approved" by="Owner" time="Yesterday, 05:45 PM" />
            </div>
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

function HistoryRow({ type, detail, decision, by, time }: { type: string; detail: string; decision: string; by: string; time: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-3">
      <div className="flex items-center gap-3">
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">
            {type}: {detail}
          </p>
          <p className="text-xs text-muted-foreground">
            {decision} by {by} • {time}
          </p>
        </div>
      </div>
      <Badge variant={decision === "Approved" ? "success" : "destructive"}>{decision}</Badge>
    </div>
  );
}
