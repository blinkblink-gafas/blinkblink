import { describe, expect, it } from "vitest";
import {
  DEFAULT_FILTERS,
  PRICE_BUCKETS,
  applyFilters,
  collectColors,
  filtersToQuery,
  parseFilters,
} from "@/lib/filters";
import type { Product } from "@/types/product";

const product = (overrides: Partial<Product>): Product => ({
  id: "x",
  slug: "x",
  name: "X",
  category: "sunglasses",
  price: 40,
  currency: "USD",
  rating: 4,
  reviewCount: 1,
  images: [],
  colors: ["Jet Black"],
  inStock: true,
  ...overrides,
});

const products = [
  product({ id: "a", price: 38, rating: 4.6, colors: ["Jet Black", "Tortoise"] }),
  product({ id: "b", price: 32, rating: 4.4, colors: ["Rose"], badges: ["New"] }),
  product({ id: "c", price: 46, rating: 4.8, colors: ["Electric Blue", "Jet Black"], category: "sports" }),
];

const ids = (list: Product[]) => list.map((p) => p.id);

describe("parseFilters / filtersToQuery", () => {
  it("round-trips through the URL query", () => {
    const query = { sort: "price-asc", color: "Jet Black,Rose", price: "35-45", q: "aviator" };
    const filters = parseFilters(query);
    expect(filters).toMatchObject({
      sortBy: "price-asc",
      colors: ["Jet Black", "Rose"],
      priceRange: PRICE_BUCKETS["35-45"],
      searchQuery: "aviator",
    });
    expect(filtersToQuery(filters)).toEqual(query);
  });

  it("ignores unknown values and omits defaults", () => {
    const filters = parseFilters({ sort: "bogus", price: "1-2", color: "" });
    expect(filters).toEqual(DEFAULT_FILTERS);
    expect(filtersToQuery(filters)).toEqual({});
  });

  it("uses the first value when a param repeats", () => {
    expect(parseFilters({ sort: ["rating", "newest"] }).sortBy).toBe("rating");
  });
});

describe("applyFilters", () => {
  it("keeps catalog order for 'featured'", () => {
    expect(ids(applyFilters(products, DEFAULT_FILTERS))).toEqual(["a", "b", "c"]);
  });

  it("sorts by price, rating and newness", () => {
    const sort = (sortBy: typeof DEFAULT_FILTERS.sortBy) => ids(applyFilters(products, { ...DEFAULT_FILTERS, sortBy }));
    expect(sort("price-asc")).toEqual(["b", "a", "c"]);
    expect(sort("price-desc")).toEqual(["c", "a", "b"]);
    expect(sort("rating")).toEqual(["c", "a", "b"]);
    expect(sort("newest")).toEqual(["b", "a", "c"]);
  });

  it("filters by any selected color", () => {
    expect(ids(applyFilters(products, { ...DEFAULT_FILTERS, colors: ["Tortoise", "Rose"] }))).toEqual(["a", "b"]);
  });

  it("filters by price bucket, lower bound inclusive", () => {
    const within = (key: string) =>
      ids(applyFilters(products, { ...DEFAULT_FILTERS, priceRange: PRICE_BUCKETS[key] ?? null }));
    expect(within("0-35")).toEqual(["b"]);
    expect(within("35-45")).toEqual(["a"]);
    expect(within("45-up")).toEqual(["c"]);
  });

  it("filters by category", () => {
    expect(ids(applyFilters(products, { ...DEFAULT_FILTERS, categories: ["sports"] }))).toEqual(["c"]);
  });

  it("does not mutate the input", () => {
    const copy = [...products];
    applyFilters(products, { ...DEFAULT_FILTERS, sortBy: "price-asc" });
    expect(products).toEqual(copy);
  });
});

describe("collectColors", () => {
  it("lists each color once in first-seen order", () => {
    expect(collectColors(products)).toEqual(["Jet Black", "Tortoise", "Rose", "Electric Blue"]);
  });
});
