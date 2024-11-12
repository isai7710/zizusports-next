"use client";

import Image from "next/image";
import { X, Minus, Plus } from "lucide-react";
import { KitCartItem, useCart } from "./cart-context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface KitModalCardProps {
  item: KitCartItem;
}

export default function Component({ item }: KitModalCardProps) {
  const { removeItem, updateQuantity } = useCart();

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <div className="relative w-24 h-24 flex-shrink-0">
            <Image
              src={`https://res.cloudinary.com/de463zyga/image/upload/uniform${item.globalColor}.png`}
              alt={item.name}
              fill
              className="object-contain rounded-md"
            />
          </div>
          <div className="flex-grow space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.team} - {item.globalColor}
                </p>
              </div>
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
            <div className="flex flex-wrap gap-2 text-sm">
              <Badge variant="outline">Jersey: {item.jersey.size}</Badge>
              <Badge variant="outline">Short: {item.shorts.size}</Badge>
              <Badge variant="outline">Sock: {item.socks.size}</Badge>
              {item.player && (
                <Badge variant="secondary">Player: {item.player}</Badge>
              )}
            </div>
            <Separator />
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
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
