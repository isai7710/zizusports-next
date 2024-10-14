// types/woocommerce.d.ts

export interface ProductImage {
  id: number;
  src: string;
  name: string;
  alt: string;
}

export interface ProductAttribute {
  id: number;
  name: string;
  options: string[];
}

export interface ProductCategory {
  id: number;
  name: string;
  options: string[];
}

export interface WooCommerceProduct {
  id: number;
  name: string;
  price: string;
  short_description: string;
  images: ProductImage[];
  stock_status: string;
  attributes: ProductAttribute[];
  categories: ProductCategory[];
}
