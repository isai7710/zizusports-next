import { createContext, useContext } from "react";
import { WooCommerceProduct } from "@/lib/types/woocommerce";

export interface ProductCartItem {
  id: number; // Unique identifier for product in cart, depending on attributes selected for product
  product: WooCommerceProduct;
  quantity: number;
  selectedAttributes: {
    color?: string;
    size?: string;
    [key: string]: string | undefined;
  };
}

export interface KitCartItem {
  id: number; // Unique identifier for the kit in the cart, similar to ProductCartItem's id
  name: string;
  img: string;
  jersey: {
    product: WooCommerceProduct;
    size: string;
  };
  shorts: {
    product: WooCommerceProduct;
    size: string;
  };
  socks: {
    product: WooCommerceProduct;
    size: string;
  };
  globalColor: string; // Color that applies to all items in the kit
  price: number;
  player: string; // Name of the player associated with this kit
  team: string; // Team associated with the kit
  quantity: number; // Quantity of the kit
}

interface CartContextType {
  items: (ProductCartItem | KitCartItem)[];
  addProductItem: (
    product: WooCommerceProduct,
    quantity: number,
    selectedAttributes: ProductCartItem["selectedAttributes"],
  ) => void;
  addKitItem: (kit: Omit<KitCartItem, "id">) => void;
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
