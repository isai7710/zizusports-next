// types/woocommerce.d.ts

export interface ProductImage {
  id: number;
  src: string;
  name: string;
  alt: string;
}

export interface WooCommerceProduct {
  id: number;
  name: string;
  price: string;
  currency: string;
  description: string;
  images: ProductImage[];
  stock_status: string;
  key: string; // Allow additional properties for flexibility
}
