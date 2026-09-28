import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { filtersToQuery, parseFilters } from "@/lib/filters";
import type { FilterState } from "@/types/filters";

/**
 * Filter state that lives in the URL query string, so a filtered listing
 * can be shared and survives back/forward. Updates use a shallow
 * `router.replace` — no data refetch, no new history entry per click.
 */
export function useUrlFilters(): [FilterState, (next: FilterState) => void] {
  const router = useRouter();
  const filters = useMemo(() => parseFilters(router.query), [router.query]);

  const setFilters = useCallback(
    (next: FilterState) => {
      // Keep the page's own route params (e.g. [slug]) alongside the filter params.
      const routeParams: Record<string, string | string[]> = {};
      for (const [, name] of router.pathname.matchAll(/\[(\w+)\]/g)) {
        const value = name ? router.query[name] : undefined;
        if (name && value !== undefined) routeParams[name] = value;
      }

      void router.replace(
        { pathname: router.pathname, query: { ...routeParams, ...filtersToQuery(next) } },
        undefined,
        { shallow: true, scroll: false }
      );
    },
    [router]
  );

  return [filters, setFilters];
}
