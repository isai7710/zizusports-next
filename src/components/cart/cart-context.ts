import { createContext, useContext } from "react";
import { WooCommerceProduct } from "@/lib/types/woocommerce";

export interface ProductCartItem {
  id: number;
  product: WooCommerceProduct;
  quantity: number;
  selectedAttributes: {
    color?: string;
    size?: string;
    [key: string]: string | undefined;
  };
}

interface CartContextType {
  items: ProductCartItem[];
  addItem: (
    product: WooCommerceProduct,
    quantity: number,
    selectedAttributes: ProductCartItem["selectedAttributes"],
  ) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isOpen: boolean;
  toggleModal: () => void;
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
