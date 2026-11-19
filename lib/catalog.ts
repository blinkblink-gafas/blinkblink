import { mockProducts } from "@/lib/mockData";
import type { Product, ProductCategory } from "@/types/product";

/**
 * Server-side catalog access. Pages (getStaticProps/getStaticPaths) and the
 * `/api/*` routes both read through here, so swapping the mock catalog for a
 * real backend only touches this file.
 */

export const PRODUCT_CATEGORIES: ProductCategory[] = ["men", "women", "classic"];

/** Category slugs that have a listing page: every real category plus "all". */
export const CATEGORY_SLUGS: string[] = ["all", ...PRODUCT_CATEGORIES];

export function isProductCategory(value: string): value is ProductCategory {
  return (PRODUCT_CATEGORIES as string[]).includes(value);
}

export interface ProductQuery {
  category?: string;
  q?: string;
}

export function listProducts({ category, q }: ProductQuery = {}): Product[] {
  let products = mockProducts;

  if (category && category !== "all") {
    products = products.filter((product) => product.category === category);
  }

  const query = q?.trim().toLowerCase();
  if (query) {
    const terms = query.split(/\s+/);
    products = products.filter((product) => {
      const haystack = [product.name, product.category, product.shape, product.description ?? "", ...product.colors, ...product.lensColors]
        .join(" ")
        .toLowerCase();
      return terms.every((term) => haystack.includes(term));
    });
  }

  return products;
}

export function getProduct(slug: string): Product | undefined {
  return mockProducts.find((product) => product.slug === slug);
}

export function listProductSlugs(): string[] {
  return mockProducts.map((product) => product.slug);
}

export function getFeaturedProducts(limit = 4): Product[] {
  const featured = mockProducts.filter((product) => product.badges?.includes("Bestseller"));
  const rest = mockProducts.filter((product) => !featured.includes(product));
  return [...featured, ...rest].slice(0, limit);
}

/** "New"-badged products first, then the rest of the catalog from newest-added (end of the list). */
export function getNewProducts(limit = 4): Product[] {
  const fresh = mockProducts.filter((product) => product.badges?.includes("New"));
  const rest = [...mockProducts].reverse().filter((product) => !fresh.includes(product));
  return [...fresh, ...rest].slice(0, limit);
}
