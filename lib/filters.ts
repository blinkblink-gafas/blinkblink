import type { ParsedUrlQuery } from "querystring";
import type { FilterState, PriceRange, SortOption } from "@/types/filters";
import type { FrameShape, Product, ProductGender } from "@/types/product";

export const SORT_OPTIONS: SortOption[] = ["featured", "price-asc", "price-desc", "newest", "rating"];
export const FRAME_SHAPES: FrameShape[] = ["aviator", "wayfarer", "round", "square", "rectangle", "cat-eye", "sport"];
export const GENDERS: ProductGender[] = ["men", "women", "unisex"];

export const DEFAULT_FILTERS: FilterState = {
  shapes: [],
  frameColors: [],
  lensColors: [],
  genders: [],
  priceRange: null,
  inStockOnly: false,
  sortBy: "featured",
  searchQuery: "",
  page: 1,
};

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function list(value: string | string[] | undefined): string[] {
  return (firstValue(value) ?? "").split(",").filter(Boolean);
}

function listOf<T extends string>(value: string | string[] | undefined, allowed: readonly T[]): T[] {
  return list(value).filter((item): item is T => (allowed as readonly string[]).includes(item));
}

function parsePrice(value: string | undefined): PriceRange | null {
  const match = value?.match(/^(\d+)-(\d+)$/);
  if (!match) return null;
  const min = Number(match[1]);
  const max = Number(match[2]);
  return min <= max ? { min, max } : null;
}

/**
 * Reads filters from the URL query, e.g.
 * `?shape=round,square&color=Gold&lens=Green&gender=women&price=30-45&stock=1&sort=price-asc&page=2`,
 * so filtered views are shareable and survive back/forward navigation.
 */
export function parseFilters(query: ParsedUrlQuery): FilterState {
  const sort = firstValue(query.sort);
  const page = Number(firstValue(query.page));

  return {
    shapes: listOf(query.shape, FRAME_SHAPES),
    frameColors: list(query.color),
    lensColors: list(query.lens),
    genders: listOf(query.gender, GENDERS),
    priceRange: parsePrice(firstValue(query.price)),
    inStockOnly: firstValue(query.stock) === "1",
    sortBy: SORT_OPTIONS.includes(sort as SortOption) ? (sort as SortOption) : "featured",
    searchQuery: firstValue(query.q) ?? "",
    page: Number.isInteger(page) && page > 1 ? page : 1,
  };
}

/** Inverse of `parseFilters`; default values are left out to keep URLs short. */
export function filtersToQuery(filters: FilterState): Record<string, string> {
  const query: Record<string, string> = {};
  if (filters.searchQuery) query.q = filters.searchQuery;
  if (filters.shapes.length > 0) query.shape = filters.shapes.join(",");
  if (filters.frameColors.length > 0) query.color = filters.frameColors.join(",");
  if (filters.lensColors.length > 0) query.lens = filters.lensColors.join(",");
  if (filters.genders.length > 0) query.gender = filters.genders.join(",");
  if (filters.priceRange) query.price = `${filters.priceRange.min}-${filters.priceRange.max}`;
  if (filters.inStockOnly) query.stock = "1";
  if (filters.sortBy !== "featured") query.sort = filters.sortBy;
  if (filters.page > 1) query.page = String(filters.page);
  return query;
}

/** Number of active filters (excluding sort, search and page) — for the mobile "Filters (3)" button. */
export function countActiveFilters(filters: FilterState): number {
  return (
    filters.shapes.length +
    filters.frameColors.length +
    filters.lensColors.length +
    filters.genders.length +
    (filters.priceRange ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0)
  );
}

/** Newest-first has no release date to go on yet, so "New"-badged items lead. */
function newnessScore(product: Product): number {
  return product.badges?.includes("New") ? 1 : 0;
}

const matchesAny = <T>(selected: T[], values: T[]) =>
  selected.length === 0 || values.some((value) => selected.includes(value));

export function applyFilters(products: Product[], filters: FilterState): Product[] {
  const { shapes, frameColors, lensColors, genders, priceRange, inStockOnly, sortBy } = filters;

  const filtered = products.filter(
    (product) =>
      matchesAny(shapes, [product.shape]) &&
      matchesAny(frameColors, product.colors) &&
      matchesAny(lensColors, product.lensColors) &&
      matchesAny(genders, [product.gender]) &&
      (!priceRange || (product.price >= priceRange.min && product.price <= priceRange.max)) &&
      (!inStockOnly || product.inStock)
  );

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

export interface Page<T> {
  items: T[];
  page: number;
  totalPages: number;
}

/** Slices one page out of `items`, clamping out-of-range pages to the last page. */
export function paginate<T>(items: T[], page: number, perPage: number): Page<T> {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const current = Math.min(Math.max(1, page), totalPages);
  return {
    items: items.slice((current - 1) * perPage, current * perPage),
    page: current,
    totalPages,
  };
}

/** Whole-euro bounds covering every product's price — the price slider's range. */
export function priceBounds(products: Product[]): PriceRange {
  if (products.length === 0) return { min: 0, max: 0 };
  const prices = products.map((product) => product.price);
  return { min: Math.floor(Math.min(...prices)), max: Math.ceil(Math.max(...prices)) };
}

/** Every value `pick` returns across `products`, once each, in first-seen order. */
export function collectValues<T>(products: Product[], pick: (product: Product) => T[]): T[] {
  return Array.from(new Set(products.flatMap(pick)));
}
