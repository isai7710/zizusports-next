"use client";

import Image from "next/image";
import { X, Minus, Plus } from "lucide-react";
import { KitCartItem, useCart } from "./cart-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface KitModalCardProps {
  item: KitCartItem;
}

export default function KitModalCard({ item }: KitModalCardProps) {
  const { removeItem, updateQuantity } = useCart();

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold">{item.name}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
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
      </CardHeader>
      <CardContent className="pt-2">
        <div className="flex items-start space-x-4">
          <div className="relative w-24 h-24 flex-shrink-0">
            <Image
              src={`https://res.cloudinary.com/de463zyga/image/upload/uniform${item.globalColor}.png`}
              alt={item.name}
              fill
              className="object-contain shadow-md rounded-md"
            />
          </div>
          <div className="flex-grow space-y-3">
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="flex justify-start gap-2">
                <span className="font-medium">Jersey:</span>
                <Badge variant="outline">{item.jersey.size}</Badge>
              </div>
              <div className="flex justify-start gap-2 ml-1">
                <span className="font-medium">Short:</span>
                <Badge variant="outline">{item.shorts.size}</Badge>
              </div>
              <div className="flex justify-start gap-2 ml-1">
                <span className="font-medium">Sock:</span>
                <Badge variant="outline">{item.socks.size}</Badge>
              </div>
            </div>
            {item.player && (
              <div className="text-sm">
                <span className="font-medium">Player</span>
                <Badge variant="secondary" className="ml-2 text-sm">
                  {item.player}
                </Badge>
              </div>
            )}
            <Separator />
            <div className="flex items-center justify-between pt-2">
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
                ${item.price.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
