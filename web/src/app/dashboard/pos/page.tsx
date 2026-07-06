"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  CreditCard,
  Banknote,
  Printer,
} from "lucide-react";

const sampleItems = [
  { id: 1, name: "L'Oreal Shampoo 200ml", price: 850, barcode: "123456" },
  { id: 2, name: "Maybelline Lipstick #205", price: 1200, barcode: "234567" },
  { id: 3, name: "Garnier Face Wash 100ml", price: 450, barcode: "345678" },
  { id: 4, name: "Dove Body Lotion 250ml", price: 650, barcode: "456789" },
];

export default function POSPage() {
  const [cart, setCart] = useState<{ item: typeof sampleItems[0]; qty: number }[]>([]);
  const [barcode, setBarcode] = useState("");

  const addToCart = (item: typeof sampleItems[0]) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.item.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.item.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { item, qty: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.item.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i
        )
        .filter((i) => i.qty > 0)
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((i) => i.item.id !== id));
  };

  const handleBarcode = () => {
    const item = sampleItems.find((i) => i.barcode === barcode);
    if (item) addToCart(item);
    setBarcode("");
  };

  const total = cart.reduce((sum, i) => sum + i.item.price * i.qty, 0);

  return (
    <div className="h-screen flex flex-col">
      <Header title="Point of Sale" subtitle="Main Shop - Cashier: Ali" />

      <div className="flex-1 grid lg:grid-cols-2 gap-4 p-4 overflow-hidden">
        {/* Product Grid */}
        <div className="flex flex-col gap-4 overflow-hidden">
          <Card className="p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Scan barcode or type product name..."
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleBarcode()}
                className="text-lg"
              />
              <Button size="lg" onClick={handleBarcode}>
                Add
              </Button>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-3 overflow-y-auto p-1">
            {sampleItems.map((item) => (
              <Card
                key={item.id}
                className="cursor-pointer hover:border-primary transition-colors"
                onClick={() => addToCart(item)}
              >
                <CardContent className="p-4">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-lg font-bold text-primary">
                    {formatCurrency(item.price)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Cart */}
        <Card className="flex flex-col h-full">
          <CardContent className="flex-1 flex flex-col p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Current Sale
              </h2>
              <Badge variant="outline">{cart.length} items</Badge>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2">
              {cart.length === 0 && (
                <p className="text-center text-muted-foreground py-12">
                  Scan or tap items to add to cart
                </p>
              )}
              {cart.map(({ item, qty }) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(item.price)} × {qty}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQty(item.id, -1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-semibold">{qty}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQty(item.id, 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mt-4 space-y-4">
              <div className="flex items-center justify-between text-2xl font-bold">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button size="lg" variant="outline" className="h-16">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Card
                </Button>
                <Button size="lg" className="h-16">
                  <Banknote className="mr-2 h-5 w-5" />
                  Cash
                </Button>
              </div>
              <Button variant="outline" className="w-full">
                <Printer className="mr-2 h-4 w-4" />
                Print Receipt
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
