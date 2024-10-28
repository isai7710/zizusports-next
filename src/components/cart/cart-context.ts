import { createContext, useContext } from "react";
import { WooCommerceProduct } from "@/lib/types/woocommerce";

export interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  selectedAttributes: {
    color?: string;
    size?: string;
    [key: string]: string | undefined;
  };
}

interface CartContextType {
  items: CartItem[];
  addItem: (
    product: WooCommerceProduct,
    quantity: number,
    selectedAttributes: CartItem["selectedAttributes"],
  ) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
