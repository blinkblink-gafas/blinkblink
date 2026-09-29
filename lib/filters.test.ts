import { describe, expect, it } from "vitest";
import {
  DEFAULT_FILTERS,
  applyFilters,
  collectValues,
  countActiveFilters,
  filtersToQuery,
  paginate,
  parseFilters,
  priceBounds,
} from "@/lib/filters";
import type { FilterState } from "@/types/filters";
import type { Product } from "@/types/product";

const product = (overrides: Partial<Product>): Product => ({
  id: "x",
  slug: "x",
  name: "X",
  category: "sunglasses",
  price: 40,
  currency: "EUR",
  rating: 4,
  reviewCount: 1,
  images: [],
  colors: ["Jet Black"],
  lensColors: ["Black"],
  shape: "square",
  gender: "unisex",
  features: [],
  inStock: true,
  ...overrides,
});

const products = [
  product({ id: "a", price: 38, rating: 4.6, colors: ["Jet Black", "Tortoise"], shape: "wayfarer", gender: "men" }),
  product({ id: "b", price: 32, rating: 4.4, colors: ["Gold"], lensColors: ["Green"], shape: "round", badges: ["New"], gender: "women" }),
  product({ id: "c", price: 46, rating: 4.8, colors: ["Jet Black"], shape: "sport", inStock: false }),
];

const ids = (list: Product[]) => list.map((p) => p.id);
const withFilters = (patch: Partial<FilterState>) => ids(applyFilters(products, { ...DEFAULT_FILTERS, ...patch }));

describe("parseFilters / filtersToQuery", () => {
  it("round-trips every filter through the URL query", () => {
    const query = {
      q: "gold",
      shape: "round,square",
      color: "Jet Black,Gold",
      lens: "Green",
      gender: "women",
      price: "30-45",
      stock: "1",
      sort: "price-asc",
      page: "2",
    };
    const filters = parseFilters(query);
    expect(filters).toEqual({
      searchQuery: "gold",
      shapes: ["round", "square"],
      frameColors: ["Jet Black", "Gold"],
      lensColors: ["Green"],
      genders: ["women"],
      priceRange: { min: 30, max: 45 },
      inStockOnly: true,
      sortBy: "price-asc",
      page: 2,
    });
    expect(filtersToQuery(filters)).toEqual(query);
  });

  it("drops unknown values and omits defaults", () => {
    const filters = parseFilters({ sort: "bogus", shape: "blob", gender: "robot", price: "50-10", page: "0", stock: "yes" });
    expect(filters).toEqual(DEFAULT_FILTERS);
    expect(filtersToQuery(filters)).toEqual({});
  });

  it("uses the first value when a param repeats", () => {
    expect(parseFilters({ sort: ["rating", "newest"] }).sortBy).toBe("rating");
  });
});

describe("applyFilters", () => {
  it("keeps catalog order for 'featured'", () => {
    expect(withFilters({})).toEqual(["a", "b", "c"]);
  });

  it("sorts by price, rating and newness", () => {
    expect(withFilters({ sortBy: "price-asc" })).toEqual(["b", "a", "c"]);
    expect(withFilters({ sortBy: "price-desc" })).toEqual(["c", "a", "b"]);
    expect(withFilters({ sortBy: "rating" })).toEqual(["c", "a", "b"]);
    expect(withFilters({ sortBy: "newest" })).toEqual(["b", "a", "c"]);
  });

  it("matches any selected value within a filter", () => {
    expect(withFilters({ frameColors: ["Tortoise", "Gold"] })).toEqual(["a", "b"]);
    expect(withFilters({ shapes: ["round", "sport"] })).toEqual(["b", "c"]);
    expect(withFilters({ lensColors: ["Green"] })).toEqual(["b"]);
    expect(withFilters({ genders: ["men"] })).toEqual(["a"]);
  });

  it("combines filters with AND", () => {
    expect(withFilters({ frameColors: ["Jet Black"], shapes: ["sport"] })).toEqual(["c"]);
    expect(withFilters({ frameColors: ["Gold"], genders: ["men"] })).toEqual([]);
  });

  it("filters by an inclusive price range and by stock", () => {
    expect(withFilters({ priceRange: { min: 32, max: 38 } })).toEqual(["a", "b"]);
    expect(withFilters({ inStockOnly: true })).toEqual(["a", "b"]);
  });

  it("does not mutate the input", () => {
    const copy = [...products];
    applyFilters(products, { ...DEFAULT_FILTERS, sortBy: "price-asc" });
    expect(products).toEqual(copy);
  });
});

describe("countActiveFilters", () => {
  it("counts filters but not sort, search or page", () => {
    expect(countActiveFilters({ ...DEFAULT_FILTERS, sortBy: "rating", searchQuery: "x", page: 3 })).toBe(0);
    expect(
      countActiveFilters({ ...DEFAULT_FILTERS, shapes: ["round"], frameColors: ["Gold", "Silver"], inStockOnly: true, priceRange: { min: 1, max: 2 } })
    ).toBe(5);
  });
});

describe("paginate", () => {
  const items = Array.from({ length: 20 }, (_, i) => i + 1);

  it("slices the requested page", () => {
    expect(paginate(items, 2, 9)).toEqual({ items: [10, 11, 12, 13, 14, 15, 16, 17, 18], page: 2, totalPages: 3 });
  });

  it("clamps out-of-range pages", () => {
    expect(paginate(items, 99, 9).page).toBe(3);
    expect(paginate(items, 0, 9).page).toBe(1);
    expect(paginate([], 1, 9)).toEqual({ items: [], page: 1, totalPages: 1 });
  });
});

describe("priceBounds / collectValues", () => {
  it("covers every price in whole euros", () => {
    expect(priceBounds(products)).toEqual({ min: 32, max: 46 });
    expect(priceBounds([product({ price: 19.5 }), product({ price: 20.2 })])).toEqual({ min: 19, max: 21 });
  });

  it("lists each value once in first-seen order", () => {
    expect(collectValues(products, (p) => p.colors)).toEqual(["Jet Black", "Tortoise", "Gold"]);
  });
});
