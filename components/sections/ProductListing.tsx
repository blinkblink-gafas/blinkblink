import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import FilterSidebar, { type FilterOptions } from "@/components/sections/FilterSidebar";
import ProductGrid from "@/components/sections/ProductGrid";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Pagination from "@/components/ui/Pagination";
import { FRAME_SHAPES, SORT_OPTIONS, applyFilters, collectValues, countActiveFilters, paginate, priceBounds } from "@/lib/filters";
import { formatTranslation, useTranslation } from "@/lib/i18n";
import { storeConfig } from "@/lib/storeConfig";
import { useUrlFilters } from "@/lib/useUrlFilters";
import { cn } from "@/lib/utils";
import type { SortOption } from "@/types/filters";
import type { Product } from "@/types/product";

export interface ProductListingProps {
  products: Product[];
}

/**
 * Filterable, sortable, paginated product listing: shape tabs and sort on
 * top, filter sidebar on the left (a slide-in panel on mobile), grid and
 * page numbers on the right. All state lives in the URL via `useUrlFilters`.
 */
export default function ProductListing({ products }: ProductListingProps) {
  const t = useTranslation();
  const [filters, setFilters] = useUrlFilters();
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  const options: FilterOptions = useMemo(
    () => ({
      priceBounds: priceBounds(products),
      frameColors: collectValues(products, (p) => p.colors),
      lensColors: collectValues(products, (p) => p.lensColors),
      shapes: collectValues(products, (p) => [p.shape]),
    }),
    [products]
  );

  const filtered = useMemo(() => applyFilters(products, filters), [products, filters]);
  const pageOfProducts = paginate(filtered, filters.page, storeConfig.productsPerPage);
  const activeCount = countActiveFilters(filters);
  const tabShapes = FRAME_SHAPES.filter((shape) => options.shapes.includes(shape));

  const goToPage = (page: number) => {
    setFilters({ ...filters, page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!isFilterPanelOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setIsFilterPanelOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isFilterPanelOpen]);

  const sidebar = <FilterSidebar filters={filters} options={options} onChange={setFilters} />;

  return (
    <div>
      {/* Shape tabs + sort */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {tabShapes.length > 1 && (
          <div role="group" aria-label={t.filters.shapeTabs} className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[null, ...tabShapes].map((shape) => {
              const isActive = shape === null ? filters.shapes.length === 0 : filters.shapes.length === 1 && filters.shapes[0] === shape;
              return (
                <button
                  key={shape ?? "all"}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setFilters({ ...filters, shapes: shape ? [shape] : [], page: 1 })}
                  className={cn(
                    "shrink-0 rounded-pill px-4 py-2 text-small font-semibold transition-colors",
                    isActive ? "bg-ink text-white" : "bg-white text-ink ring-1 ring-inset ring-ink/15 hover:bg-surface"
                  )}
                >
                  {t.shapes[shape ?? "all"]}
                </button>
              );
            })}
          </div>
        )}

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsFilterPanelOpen(true)}
            className="inline-flex items-center gap-2 rounded-pill px-4 py-2 text-small font-semibold ring-1 ring-inset ring-ink/15 lg:hidden"
          >
            <SlidersHorizontal size={16} aria-hidden="true" />
            {activeCount > 0 ? formatTranslation(t.filters.openWithCount, { count: activeCount }) : t.filters.open}
          </button>
          <label className="flex items-center gap-2 rounded-pill px-4 py-2 text-small ring-1 ring-inset ring-ink/15">
            <span className="text-text-secondary">{t.filters.sortLabel}:</span>
            <select
              value={filters.sortBy}
              onChange={(event) => setFilters({ ...filters, sortBy: event.target.value as SortOption, page: 1 })}
              className="cursor-pointer bg-transparent font-semibold text-ink outline-none"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {t.filters.sort[option]}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">{sidebar}</aside>

        <div>
          {pageOfProducts.items.length > 0 ? (
            <>
              <ProductGrid products={pageOfProducts.items} columns={3} bare />
              <Pagination page={pageOfProducts.page} totalPages={pageOfProducts.totalPages} onChange={goToPage} />
            </>
          ) : (
            <EmptyState heading={t.filters.noResultsHeading} message={t.filters.noResultsMessage} />
          )}
        </div>
      </div>

      {/* Mobile filter panel */}
      <AnimatePresence>
        {isFilterPanelOpen && (
          <div className="fixed inset-0 z-[60] lg:hidden">
            <motion.div
              className="absolute inset-0 bg-ink/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterPanelOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={t.filters.heading}
              className="absolute left-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-white"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
            >
              <div className="flex justify-end px-4 pt-3">
                <button
                  type="button"
                  aria-label={t.filters.close}
                  onClick={() => setIsFilterPanelOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full hover:bg-surface"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-5">{sidebar}</div>
              <div className="border-t border-ink/10 p-4">
                <Button className="w-full" onClick={() => setIsFilterPanelOpen(false)}>
                  {formatTranslation(t.filters.showResults, { count: filtered.length })}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
