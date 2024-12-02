import { KitCartItem } from "@/components/cart/cart-context";

export function generateKitId(kit: Omit<KitCartItem, "id">) {
  const uniqueString = [
    kit.jersey.product.id,
    kit.jersey.size,
    kit.shorts.product.id,
    kit.shorts.size,
    kit.socks.product.id,
    kit.socks.size,
    kit.globalColor,
    kit.player,
    kit.team,
  ].join("|");

  let hash = 0;
  for (let i = 0; i < uniqueString.length; i++) {
    const char = uniqueString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  return Math.abs(hash);
}
