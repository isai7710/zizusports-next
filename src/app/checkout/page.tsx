"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/cart-context";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ProductModalCard from "@/components/cart/product-modal-card";
import KitModalCard from "@/components/cart/kit-modal-card";
import { cn } from "@/lib/utils";

export default function CheckoutPage() {
  const { items, getTotalPrice } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);
    // Stripe payment processing logic will go here
    setIsProcessing(false);
  };

  return (
    <div className="container min-h-screen mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-2xl">
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className={cn(index === items.length - 1) ? "" : "mb-4"}
                >
                  {"product" in item ? (
                    <ProductModalCard item={item} />
                  ) : (
                    <KitModalCard item={item} />
                  )}
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex flex-col">
              <Separator />
              <div className="w-full flex justify-between items-center font-bold mt-1">
                <p>Total</p>
                <p>${getTotalPrice().toFixed(2)}</p>
              </div>
            </CardFooter>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-2xl">Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-md">
                {/* Stripe Elements will be inserted here */}
                <p className="text-center text-muted-foreground">
                  Stripe payment form will be integrated here...
                </p>
              </div>
              <Button
                className="w-full mt-4 text-white"
                type="submit"
                disabled={isProcessing}
                onClick={handleSubmit}
              >
                {isProcessing ? "Processing..." : "Pay Now"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
