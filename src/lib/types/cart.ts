import { WooCommerceProduct } from "./woocommerce";

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

export interface CartContextType {
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
