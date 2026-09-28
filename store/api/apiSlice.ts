import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * Base API slice. Endpoints live in their own files and call
 * `apiSlice.injectEndpoints({ ... })` (see `productsApi.ts`) rather than
 * creating a second `createApi` instance, so everything shares one
 * cache/tag system.
 */
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // Served by this app's own `pages/api/*` routes for now.
    baseUrl: "/api/",
  }),
  tagTypes: ["Product", "Category"],
  endpoints: () => ({}),
});
