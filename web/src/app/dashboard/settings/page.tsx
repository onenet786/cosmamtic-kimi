import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <div>
      <Header title="Settings" subtitle="Configure tenant, branches, users, and preferences" />
      <div className="p-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tenant Profile</CardTitle>
            <CardDescription>Company information and fiscal settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input defaultValue="Cosmamtic Trading" />
            </div>
            <div className="space-y-2">
              <Label>Business Address</Label>
              <Input defaultValue="Main Market, Karachi" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input defaultValue="+92-300-0000000" />
              </div>
              <div className="space-y-2">
                <Label>Tax Number</Label>
                <Input defaultValue="1234567-8" />
              </div>
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>POS & Branch Settings</CardTitle>
            <CardDescription>Configure POS behavior and branch defaults</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Offline POS Mode</Label>
                <p className="text-sm text-muted-foreground">Allow sales when internet is unavailable</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Discount Approval</Label>
                <p className="text-sm text-muted-foreground">Require approval for discounts above 10%</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Return Approval</Label>
                <p className="text-sm text-muted-foreground">Require owner approval for all returns</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="space-y-2">
              <Label>Default Currency</Label>
              <Input defaultValue="PKR" disabled />
            </div>
            <Button>Save Settings</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
