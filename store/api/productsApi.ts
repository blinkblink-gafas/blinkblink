import { apiSlice } from "@/store/api/apiSlice";
import type { ProductQuery } from "@/lib/catalog";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";

/**
 * Client-side product endpoints, served by `pages/api/*`. Injected into the
 * shared `apiSlice` so every endpoint shares one cache and tag system.
 */
export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], ProductQuery | void>({
      query: (params) => ({ url: "products", params: params ?? undefined }),
      providesTags: (result) => [
        { type: "Product", id: "LIST" },
        ...(result ?? []).map((product) => ({ type: "Product" as const, id: product.id })),
      ],
    }),
    getProductBySlug: builder.query<Product, string>({
      query: (slug) => `products/${encodeURIComponent(slug)}`,
      providesTags: (result) => (result ? [{ type: "Product", id: result.id }] : []),
    }),
    getCategories: builder.query<Category[], void>({
      query: () => "categories",
      providesTags: [{ type: "Category", id: "LIST" }],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductBySlugQuery, useGetCategoriesQuery } = productsApi;
