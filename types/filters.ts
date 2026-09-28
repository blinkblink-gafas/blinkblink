import type { ProductCategory } from "@/types/product";

export interface PriceRange {
  min: number;
  max: number;
}

export type SortOption = "featured" | "price-asc" | "price-desc" | "newest" | "rating";

export interface FilterState {
  categories: ProductCategory[];
  colors: string[];
  priceRange: PriceRange | null;
  sortBy: SortOption;
  searchQuery: string;
}
