export type ProductBadgeLabel = "New" | "Bestseller" | "Sale" | "Limited";

export type ProductCategory =
  | "sunglasses"
  | "eyeglasses"
  | "sports"
  | "blue-light"
  | "accessories";

export type FrameShape = "aviator" | "wayfarer" | "round" | "square" | "rectangle" | "cat-eye" | "sport";

export type ProductGender = "men" | "women" | "unisex";

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
  currency: string; // ISO 4217, e.g. "EUR"
  rating: number; // 0–5
  reviewCount: number;
  images: ProductImage[];
  colors: string[]; // frame color names — each needs a swatch in lib/colors.ts
  lensColors: string[]; // lens color names — each needs a swatch in lib/colors.ts
  shape: FrameShape;
  gender: ProductGender;
  /** Short spec bullets for the product page's "Details" tab. */
  features: string[];
  badges?: ProductBadgeLabel[];
  inStock: boolean;
  description?: string;
}
