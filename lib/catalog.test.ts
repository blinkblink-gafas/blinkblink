import { describe, expect, it } from "vitest";
import { getFeaturedProducts, getProduct, listProducts, listProductSlugs } from "@/lib/catalog";
import { mockProducts } from "@/lib/mockData";

describe("catalog", () => {
  it("lists everything for 'all' or no category", () => {
    expect(listProducts()).toHaveLength(mockProducts.length);
    expect(listProducts({ category: "all" })).toHaveLength(mockProducts.length);
  });

  it("filters by category", () => {
    const sunglasses = listProducts({ category: "sunglasses" });
    expect(sunglasses.length).toBeGreaterThan(0);
    expect(sunglasses.every((p) => p.category === "sunglasses")).toBe(true);
    expect(listProducts({ category: "nope" })).toEqual([]);
  });

  it("searches name, category, description and colors, case-insensitively, all terms required", () => {
    expect(listProducts({ q: "WAYFARER" }).map((p) => p.slug)).toContain("weekend-wayfarer");
    expect(listProducts({ q: "tortoise pop" }).map((p) => p.slug)).toEqual(["tortoise-pop"]);
    expect(listProducts({ q: "wayfarer zzzz" })).toEqual([]);
    expect(listProducts({ q: "   " })).toHaveLength(mockProducts.length);
  });

  it("looks products up by slug", () => {
    expect(getProduct("classic-black")?.id).toBe("p1");
    expect(getProduct("missing")).toBeUndefined();
    expect(listProductSlugs()).toHaveLength(mockProducts.length);
  });

  it("puts bestsellers first in featured products", () => {
    const featured = getFeaturedProducts(4);
    expect(featured).toHaveLength(4);
    expect(featured[0]?.badges).toContain("Bestseller");
  });
});
