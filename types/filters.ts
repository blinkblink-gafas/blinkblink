import type { ProductCategory } from "@/types/product";

export interface PriceRange {
  min: number;
  max: number;
}

export interface FilterState {
  categories: ProductCategory[];
  colors: string[];
  priceRange: PriceRange | null;
  sortBy: "featured" | "price-asc" | "price-desc" | "newest" | "rating";
  searchQuery: string;
}
