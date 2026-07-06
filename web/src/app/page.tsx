import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, ShoppingCart, BarChart3, Wallet } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">
              Cosmamtic ERP & POS
            </h1>
            <p className="text-lg text-slate-600">
              Multi-branch cosmetics trading platform with inventory,
              accounting, POS, and owner approvals.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FeatureCard
              icon={<Package className="h-6 w-6 text-blue-600" />}
              title="Inventory"
              description="Multi-UOM, batch/expiry, multi-warehouse"
            />
            <FeatureCard
              icon={<ShoppingCart className="h-6 w-6 text-emerald-600" />}
              title="POS"
              description="Offline-first sales, shifts, returns"
            />
            <FeatureCard
              icon={<Wallet className="h-6 w-6 text-violet-600" />}
              title="Accounting"
              description="GL, vouchers, AR/AP, PDC"
            />
            <FeatureCard
              icon={<BarChart3 className="h-6 w-6 text-amber-600" />}
              title="Reports"
              description="Real-time dashboards and exports"
            />
          </div>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Sign in</CardTitle>
            <CardDescription>
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="owner@cosmamtic.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            <Button className="w-full" size="lg" asChild>
              <a href="/dashboard">Sign in</a>
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Default: owner@cosmamtic.com / password (see seed file)
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-lg bg-white shadow-sm border">
      <div className="mt-0.5">{icon}</div>
      <div>
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
    </div>
  );
}
