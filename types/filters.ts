import type { FrameShape } from "@/types/product";

export interface PriceRange {
  min: number;
  max: number;
}

export type SortOption = "featured" | "price-asc" | "price-desc" | "newest" | "rating";

export interface FilterState {
  shapes: FrameShape[];
  frameColors: string[];
  lensColors: string[];
  /** Inclusive price bounds; null means "any price". */
  priceRange: PriceRange | null;
  inStockOnly: boolean;
  sortBy: SortOption;
  searchQuery: string;
  /** 1-based results page. */
  page: number;
}
