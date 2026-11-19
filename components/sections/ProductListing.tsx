import { Fragment, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import FilterSidebar, { type FilterOptions } from "@/components/sections/FilterSidebar";
import EditorialTile from "@/components/ui/EditorialTile";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Pagination from "@/components/ui/Pagination";
import ProductCard from "@/components/ui/ProductCard";
import { FRAME_SHAPES, SORT_OPTIONS, applyFilters, collectValues, countActiveFilters, paginate, priceBounds } from "@/lib/filters";
import { formatTranslation, useTranslation } from "@/lib/i18n";
import { storeConfig } from "@/lib/storeConfig";
import { useUrlFilters } from "@/lib/useUrlFilters";
import { cn } from "@/lib/utils";
import type { SortOption } from "@/types/filters";
import type { Product } from "@/types/product";

export interface ProductListingProps {
  products: Product[];
  /** Show the editorial color tile inside the grid on page 1. */
  showEditorialTile?: boolean;
}

/** The editorial tile takes the place of this many cards' worth of grid cells, after this many cards. */
const EDITORIAL_AFTER = 4;

/**
 * Filterable, sortable, paginated product listing: underlined shape tabs,
 * "Filter and sort" (opens a slide-in panel) and the result count on top,
 * then a 4-column grid. All state lives in the URL via `useUrlFilters`.
 */
export default function ProductListing({ products, showEditorialTile = false }: ProductListingProps) {
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
  const withTile = showEditorialTile && pageOfProducts.page === 1 && pageOfProducts.items.length > EDITORIAL_AFTER + 2;

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

  const resultsLabel =
    filtered.length === 1 ? t.categoryPage.resultsLabelOne : formatTranslation(t.categoryPage.resultsLabel, { count: filtered.length });

  return (
    <div>
      {/* Shape tabs */}
      {tabShapes.length > 1 && (
        <div
          role="group"
          aria-label={t.filters.shapeTabs}
          className="-mx-4 flex gap-6 overflow-x-auto border-b border-ink/15 px-4 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {[null, ...tabShapes].map((shape) => {
            const isActive = shape === null ? filters.shapes.length === 0 : filters.shapes.length === 1 && filters.shapes[0] === shape;
            return (
              <button
                key={shape ?? "all"}
                type="button"
                aria-pressed={isActive}
                onClick={() => setFilters({ ...filters, shapes: shape ? [shape] : [], page: 1 })}
                className={cn(
                  "-mb-px shrink-0 border-b-2 py-3 text-xs uppercase tracking-[0.08em] transition-colors",
                  isActive ? "border-ink font-semibold text-ink" : "border-transparent text-text-secondary hover:text-ink"
                )}
              >
                {t.shapes[shape ?? "all"]}
              </button>
            );
          })}
        </div>
      )}

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 py-4">
        <p className="text-xs uppercase tracking-[0.06em] text-text-secondary" aria-live="polite">
          {resultsLabel}
        </p>
        <button
          type="button"
          onClick={() => setIsFilterPanelOpen(true)}
          className="inline-flex h-10 items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-ink hover:opacity-70"
        >
          <SlidersHorizontal size={16} aria-hidden="true" />
          {activeCount > 0 ? formatTranslation(t.filters.openWithCount, { count: activeCount }) : t.filters.filterAndSort}
        </button>
      </div>

      {pageOfProducts.items.length > 0 ? (
        <>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {pageOfProducts.items.map((product, index) => (
              <Fragment key={product.id}>
                {withTile && index === EDITORIAL_AFTER && <EditorialTile className="col-span-2 row-span-2" />}
                <ProductCard product={product} priority={index < 4} />
              </Fragment>
            ))}
          </div>
          <Pagination page={pageOfProducts.page} totalPages={pageOfProducts.totalPages} onChange={goToPage} />
        </>
      ) : (
        <EmptyState heading={t.filters.noResultsHeading} message={t.filters.noResultsMessage} />
      )}

      {/* Filter and sort panel */}
      <AnimatePresence>
        {isFilterPanelOpen && (
          <div className="fixed inset-0 z-[60]">
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
              aria-label={t.filters.filterAndSort}
              className="absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-white"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
            >
              <div className="flex items-center justify-between border-b border-ink/10 px-5 py-3">
                <h2 className="font-display text-2xl font-bold uppercase">{t.filters.filterAndSort}</h2>
                <button
                  type="button"
                  aria-label={t.filters.close}
                  onClick={() => setIsFilterPanelOpen(false)}
                  className="-mr-2 grid h-10 w-10 place-items-center hover:opacity-70"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5">
                <fieldset className="border-b border-ink/10 py-4">
                  <legend className="float-left mb-3 w-full text-xs font-semibold uppercase tracking-[0.08em]">{t.filters.sortLabel}</legend>
                  <div className="clear-both flex flex-col gap-1">
                    {SORT_OPTIONS.map((option) => (
                      <label key={option} className="flex cursor-pointer items-center gap-2.5 py-1 text-small text-text-primary">
                        <input
                          type="radio"
                          name="sort"
                          value={option}
                          checked={filters.sortBy === option}
                          onChange={() => setFilters({ ...filters, sortBy: option as SortOption, page: 1 })}
                          className="h-4 w-4 accent-ink"
                        />
                        {t.filters.sort[option]}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <FilterSidebar filters={filters} options={options} onChange={setFilters} />
              </div>

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
