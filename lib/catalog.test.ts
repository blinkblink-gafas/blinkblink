import { describe, expect, it } from "vitest";
import { getFeaturedProducts, getNewProducts, getProduct, listProducts, listProductSlugs } from "@/lib/catalog";
import { mockProducts } from "@/lib/mockData";

describe("catalog", () => {
  it("lists everything for 'all' or no category", () => {
    expect(listProducts()).toHaveLength(mockProducts.length);
    expect(listProducts({ category: "all" })).toHaveLength(mockProducts.length);
  });

  it("filters by category", () => {
    for (const category of ["men", "women", "classic"]) {
      const products = listProducts({ category });
      expect(products.length).toBeGreaterThan(0);
      expect(products.every((p) => p.category === category)).toBe(true);
    }
    expect(listProducts({ category: "sunglasses" })).toEqual([]);
    expect(listProducts({ category: "nope" })).toEqual([]);
  });

  it("searches name, category, shape, description and colors, case-insensitively, all terms required", () => {
    expect(listProducts({ q: "MIDNIGHT" }).map((p) => p.slug)).toEqual(["midnight"]);
    expect(listProducts({ q: "cat-eye" }).every((p) => p.shape === "cat-eye")).toBe(true);
    expect(listProducts({ q: "aviator pink" }).map((p) => p.slug)).toEqual(["flamingo"]);
    expect(listProducts({ q: "aviator zzzz" })).toEqual([]);
    expect(listProducts({ q: "   " })).toHaveLength(mockProducts.length);
  });

  it("looks products up by slug", () => {
    expect(getProduct("midnight")?.id).toBe("p1");
    expect(getProduct("missing")).toBeUndefined();
    expect(listProductSlugs()).toHaveLength(mockProducts.length);
  });

  it("puts bestsellers first in featured products", () => {
    const featured = getFeaturedProducts(4);
    expect(featured).toHaveLength(4);
    expect(featured[0]?.badges).toContain("Bestseller");
  });

  it("puts New-badged products first in new products", () => {
    const fresh = getNewProducts(4);
    expect(fresh).toHaveLength(4);
    expect(fresh.every((p) => p.badges?.includes("New"))).toBe(true);
  });

  it("only uses the three collections", () => {
    const categories = new Set(mockProducts.map((p) => p.category));
    expect([...categories].sort()).toEqual(["classic", "men", "women"]);
  });
});
