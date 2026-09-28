import { useMemo } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import Seo from "@/components/layout/Seo";
import FilterBar from "@/components/sections/FilterBar";
import ProductGrid from "@/components/sections/ProductGrid";
import EmptyState from "@/components/ui/EmptyState";
import Section from "@/components/ui/Section";
import { useGetProductsQuery } from "@/store/api/productsApi";
import { applyFilters, collectColors } from "@/lib/filters";
import { formatCount, formatTranslation, useTranslation } from "@/lib/i18n";
import { useUrlFilters } from "@/lib/useUrlFilters";

/** /search?q=… — results come from `/api/products` via RTK Query, then sort/filter client-side. */
const SearchPage: NextPage = () => {
  const t = useTranslation();
  const router = useRouter();
  const [filters, setFilters] = useUrlFilters();
  const query = filters.searchQuery.trim();

  const { data: products = [], isFetching, isError } = useGetProductsQuery(
    { q: query },
    { skip: !router.isReady || !query }
  );

  const availableColors = useMemo(() => collectColors(products), [products]);
  const visibleProducts = useMemo(() => applyFilters(products, filters), [products, filters]);

  const renderResults = () => {
    // Static page: the ?q= param is only readable once the router is ready.
    if (!router.isReady || isFetching) {
      return (
        <p className="py-8 text-center text-body text-text-secondary" aria-live="polite">
          {t.search.loading}
        </p>
      );
    }
    if (!query) {
      return <EmptyState heading={t.search.heading} message={t.search.prompt} />;
    }
    if (isError) {
      return <EmptyState heading={t.search.noResultsHeading} message={t.search.error} />;
    }
    if (products.length === 0) {
      return (
        <EmptyState
          heading={t.search.noResultsHeading}
          message={formatTranslation(t.search.noResultsMessage, { query })}
          actionLabel={t.categoryPage.browseAll}
          actionHref="/category/all"
        />
      );
    }
    return null;
  };

  const emptyState = renderResults();

  return (
    <>
      <Seo title={t.pages.search.title} noIndex />

      <Section className="pb-0 pt-10 md:pb-0 md:pt-12 lg:pb-0 lg:pt-12">
        <h1 className="text-h2 font-bold text-text-primary">
          {query ? formatTranslation(t.search.resultsHeading, { query }) : t.search.heading}
        </h1>
        {!emptyState && (
          <p className="mt-2 text-body text-text-secondary" aria-live="polite">
            {formatCount(visibleProducts.length, t.categoryPage.resultsLabelOne, t.categoryPage.resultsLabel)}
          </p>
        )}
      </Section>

      {emptyState ? (
        <Section>{emptyState}</Section>
      ) : (
        <>
          <FilterBar filters={filters} onChange={setFilters} availableColors={availableColors} />
          {visibleProducts.length > 0 ? (
            <ProductGrid products={visibleProducts} className="pt-8 md:pt-10 lg:pt-10" />
          ) : (
            <Section>
              <EmptyState heading={t.filters.noResultsHeading} message={t.filters.noResultsMessage} />
            </Section>
          )}
        </>
      )}
    </>
  );
};

export default SearchPage;
