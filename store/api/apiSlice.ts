import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * Base API slice. Left empty on purpose — future slices (e.g. productsApi)
 * should call `apiSlice.injectEndpoints({ ... })` rather than creating a
 * second `createApi` instance, so everything shares one cache/tag system.
 *
 * Example (added later):
 *
 * export const productsApi = apiSlice.injectEndpoints({
 *   endpoints: (builder) => ({
 *     getProducts: builder.query<Product[], void>({
 *       query: () => "products",
 *       providesTags: ["Product"],
 *     }),
 *   }),
 * });
 */
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // Placeholder base URL — swap for the real product API once available.
    baseUrl: "/api/",
  }),
  tagTypes: ["Product", "Category"],
  endpoints: () => ({}),
});
