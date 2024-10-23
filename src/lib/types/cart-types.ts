// types/cart-types.ts

import { WooCommerceProduct, ProductImage } from "./woocommerce"; // Import WooCommerce types

export type Maybe<T> = T | null;

export type Money = {
  amount: string; // Amount as a string for consistency
  currencyCode: string;
};

// CartProduct type: simplified version of a product as it appears in the cart focused on displaying
// product details in the cart context
export type CartProduct = {
  id: number; // Matches WooCommerce product ID
  title: string; // Use WooCommerce product name
  featuredImage: ProductImage; // Use the first image as featured
};

// CartItem type: represents a more detailed instance of a product in the cart with quantiy and pricing
export type CartItem = {
  id: string | undefined; // Tie this to the WooCommerce product ID or generate it
  quantity: number;
  cost: {
    totalAmount: Money; // Total price for this item
  };
  merchandise: {
    id: number; // WooCommerce product ID
    title: string; // WooCommerce product name
    selectedOptions: {
      name: string; // Attribute name (e.g., size, color)
      value: string; // Selected value (e.g., "Large", "Red")
    }[];
    product: CartProduct; // Mapped product
  };
};

export type Cart = {
  id: string | undefined; // Cart identifier
  totalQuantity: number; // Total items in the cart
  lines: CartItem[]; // List of items in the cart
  cost: {
    subtotalAmount: Money; // Total price of all items before tax/shipping
    totalAmount: Money; // Total price after taxes and shipping
    totalTaxAmount: Money; // Total tax amount
  };
};

// ProductVariant type: represents a specific version of a product
// products can differ in attributes (size, material, color) so we define those varints here
export type ProductVariant = {
  id: number; // WooCommerce variant ID
  title: string; // Variant title
  availableForSale: boolean; // Stock status
  selectedOptions: {
    name: string; // Name of the option (e.g., size)
    value: string; // Value of the selected option (e.g., "Large")
  }[];
  price: Money; // Price of the variant
};

// Product type: aggregate representation of...
// 1. a WooCommerce Product along with...
// 2. its associated variants (ProductVariant above) that can be used in the cart
export type Product = WooCommerceProduct & {
  variants: ProductVariant[];
};
