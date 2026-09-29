import type { FrameShape, ProductGender } from "@/types/product";

export interface PriceRange {
  min: number;
  max: number;
}

export type SortOption = "featured" | "price-asc" | "price-desc" | "newest" | "rating";

export interface FilterState {
  shapes: FrameShape[];
  frameColors: string[];
  lensColors: string[];
  genders: ProductGender[];
  /** Inclusive price bounds; null means "any price". */
  priceRange: PriceRange | null;
  inStockOnly: boolean;
  sortBy: SortOption;
  searchQuery: string;
  /** 1-based results page. */
  page: number;
}
