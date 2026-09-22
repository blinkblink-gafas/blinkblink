import type { Product } from "@/types/product";
import type { Category } from "@/types/category";
import type { LocaleStrings } from "@/types/locales";

/**
 * Placeholder mock product data. Sections built later (Hero, product grid,
 * etc.) can import from here until the real productsApi endpoint is wired
 * up. Kept intentionally small — extend as needed.
 */
export const mockProducts: Product[] = [];

/**
 * Temporary category source until the categories endpoint is available.
 * Copy is resolved through the active locale; category identity stays data.
 */
export function getMockCategories(strings: LocaleStrings): Category[] {
  return [
    {
      id: "sunglasses",
      name: strings.shopByCategory.categories.sunglasses.name,
      description: strings.shopByCategory.categories.sunglasses.description,
      image: "sunglasses",
      slug: "sunglasses",
      bgColor: "primary",
    },
    {
      id: "eyeglasses",
      name: strings.shopByCategory.categories.eyeglasses.name,
      description: strings.shopByCategory.categories.eyeglasses.description,
      image: "eyeglasses",
      slug: "eyeglasses",
      bgColor: "secondary",
    },
    {
      id: "sports",
      name: strings.shopByCategory.categories.sports.name,
      description: strings.shopByCategory.categories.sports.description,
      image: "sports",
      slug: "sports",
      bgColor: "accentBlue",
    },
  ];
}
