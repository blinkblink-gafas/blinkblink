export type ProductBadgeLabel = "New" | "Bestseller" | "Sale" | "Limited";

export type ProductCategory = "sunglasses" | "eyeglasses" | "blue-light" | "accessories";

export interface ProductImage {
  url: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  mrp?: number; // present when the item is discounted; used for the strikethrough price
  currency: string; // e.g. "USD", "INR"
  rating: number; // 0–5
  reviewCount: number;
  images: ProductImage[];
  colors: string[]; // hex values or color names for available frame colors
  badges?: ProductBadgeLabel[];
  inStock: boolean;
  description?: string;
}
