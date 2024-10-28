"use client";

import { useCart } from "@/components/cart/cart-context";
import { WooCommerceProduct } from "@/lib/types/woocommerce";

interface AddToCartButtonProps {
  product: WooCommerceProduct;
  selectedColor?: string;
  selectedSize?: string;
}

export function AddToCartButton({
  product,
  selectedColor,
  selectedSize,
}: AddToCartButtonProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product, 1, {
      color: selectedColor,
      size: selectedSize,
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
    >
      Add to cart
    </button>
  );
}
