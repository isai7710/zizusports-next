"use client";

import { useCart } from "@/components/cart/cart-context";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ProductModalCard from "@/components/cart/product-modal-card";
import KitModalCard from "@/components/cart/kit-modal-card";
import { cn } from "@/lib/utils";
import CheckoutPage from "@/components/checkout/checkout-page";
import convertToSubcurrency from "@/lib/stripe/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined!");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Page() {
  const { items, getTotalPrice } = useCart();

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
                {getTotalPrice() > 0 ? (
                  <Elements
                    stripe={stripePromise}
                    options={{
                      mode: "payment",
                      amount: convertToSubcurrency(getTotalPrice()),
                      currency: "usd",
                    }}
                  >
                    <CheckoutPage amount={getTotalPrice()} />
                  </Elements>
                ) : (
                  <p className="text-center">No items in cart</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
