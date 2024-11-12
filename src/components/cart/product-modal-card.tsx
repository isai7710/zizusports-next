"use client";

import Image from "next/image";
import { X, Minus, Plus } from "lucide-react";
import { ProductCartItem, useCart } from "./cart-context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ProductModalCardProps {
  item: ProductCartItem;
}

export default function Component({ item }: ProductModalCardProps) {
  const { removeItem, updateQuantity } = useCart();

  return (
    <Card className="overflow-hidden shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          {item.product.images && (
            <div className="relative w-24 h-24 flex-shrink-0">
              <Image
                src={`https://res.cloudinary.com/de463zyga/image/upload/${item.product.images[0].name}.png`}
                alt={item.product.name}
                fill
                className="object-cover rounded-md"
              />
            </div>
          )}
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">{item.product.name}</h3>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                onClick={() => removeItem(item.id)}
                aria-label="Remove item"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 text-sm mb-2">
              {item.selectedAttributes.size && (
                <Badge variant="outline">
                  Size: {item.selectedAttributes.size}
                </Badge>
              )}
              {item.selectedAttributes.color && (
                <Badge variant="outline">
                  Color: {item.selectedAttributes.color}
                </Badge>
              )}
            </div>
            <Separator className="my-3" />
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-8 text-center font-medium">
                  {item.quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <span className="font-semibold text-lg">
                ${(parseFloat(item.product.price) * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
