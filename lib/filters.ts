import type { ParsedUrlQuery } from "querystring";
import type { FilterState, PriceRange, SortOption } from "@/types/filters";
import type { Product } from "@/types/product";

export const SORT_OPTIONS: SortOption[] = ["featured", "price-asc", "price-desc", "newest", "rating"];

/** Preset price buckets offered in the filter bar, keyed by their URL value. */
export const PRICE_BUCKETS: Record<string, PriceRange> = {
  "0-35": { min: 0, max: 35 },
  "35-45": { min: 35, max: 45 },
  "45-up": { min: 45, max: Infinity },
};

export const DEFAULT_FILTERS: FilterState = {
  categories: [],
  colors: [],
  priceRange: null,
  sortBy: "featured",
  searchQuery: "",
};

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function priceKey(range: PriceRange | null): string | undefined {
  if (!range) return undefined;
  return Object.keys(PRICE_BUCKETS).find((key) => {
    const bucket = PRICE_BUCKETS[key];
    return bucket?.min === range.min && bucket.max === range.max;
  });
}

/**
 * Reads filters from the URL query (`?sort=price-asc&color=Jet+Black,Rose&price=0-35&q=aviator`)
 * so filtered views are shareable and survive back/forward navigation.
 */
export function parseFilters(query: ParsedUrlQuery): FilterState {
  const sort = firstValue(query.sort);
  const color = firstValue(query.color);
  const price = firstValue(query.price);

  return {
    ...DEFAULT_FILTERS,
    sortBy: SORT_OPTIONS.includes(sort as SortOption) ? (sort as SortOption) : "featured",
    colors: color ? color.split(",").filter(Boolean) : [],
    priceRange: (price && PRICE_BUCKETS[price]) || null,
    searchQuery: firstValue(query.q) ?? "",
  };
}

/** Inverse of `parseFilters`; default values are left out to keep URLs short. */
export function filtersToQuery(filters: FilterState): Record<string, string> {
  const query: Record<string, string> = {};
  if (filters.sortBy !== "featured") query.sort = filters.sortBy;
  if (filters.colors.length > 0) query.color = filters.colors.join(",");
  const price = priceKey(filters.priceRange);
  if (price) query.price = price;
  if (filters.searchQuery) query.q = filters.searchQuery;
  return query;
}

/** Newest-first has no release date to go on yet, so "New"-badged items lead. */
function newnessScore(product: Product): number {
  return product.badges?.includes("New") ? 1 : 0;
}

export function applyFilters(products: Product[], filters: FilterState): Product[] {
  const { colors, priceRange, categories, sortBy } = filters;

  const filtered = products.filter((product) => {
    if (categories.length > 0 && !categories.includes(product.category)) return false;
    if (colors.length > 0 && !product.colors.some((c) => colors.includes(c))) return false;
    if (priceRange && (product.price < priceRange.min || product.price >= priceRange.max)) return false;
    return true;
  });

  // Array.prototype.sort is stable, so "featured" keeps catalog order and ties keep it too.
  switch (sortBy) {
    case "price-asc":
      return [...filtered].sort((a, b) => a.price - b.price);
    case "price-desc":
      return [...filtered].sort((a, b) => b.price - a.price);
    case "rating":
      return [...filtered].sort((a, b) => b.rating - a.rating);
    case "newest":
      return [...filtered].sort((a, b) => newnessScore(b) - newnessScore(a));
    default:
      return filtered;
  }
}

/** Every frame color that appears in `products`, in first-seen order. */
export function collectColors(products: Product[]): string[] {
  return Array.from(new Set(products.flatMap((product) => product.colors)));
}
