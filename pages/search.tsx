import { useRouter } from "next/router";
import type { NextPage } from "next";
import Seo from "@/components/layout/Seo";
import ProductListing from "@/components/sections/ProductListing";
import EmptyState from "@/components/ui/EmptyState";
import Section from "@/components/ui/Section";
import { useGetProductsQuery } from "@/store/api/productsApi";
import { formatCount, formatTranslation, useTranslation } from "@/lib/i18n";
import { parseFilters } from "@/lib/filters";

/** /search?q=… — results come from `/api/products` via RTK Query, then filter/sort client-side. */
const SearchPage: NextPage = () => {
  const t = useTranslation();
  const router = useRouter();
  const query = parseFilters(router.query).searchQuery.trim();

  const { data: products = [], isFetching, isError } = useGetProductsQuery(
    { q: query },
    { skip: !router.isReady || !query }
  );

  const renderEmptyState = () => {
    // Static page: the ?q= param is only readable once the router is ready.
    if (!router.isReady || isFetching) {
      return (
        <p className="py-8 text-center text-body text-text-secondary" aria-live="polite">
          {t.search.loading}
        </p>
      );
    }
    if (!query) return <EmptyState heading={t.search.heading} message={t.search.prompt} />;
    if (isError) return <EmptyState heading={t.search.noResultsHeading} message={t.search.error} />;
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

  const emptyState = renderEmptyState();

  return (
    <>
      <Seo title={t.pages.search.title} noIndex />

      <Section className="pt-8 md:pt-10 lg:pt-10">
        <h1 className="text-[28px] font-black tracking-[-0.03em] text-text-primary sm:text-[36px]">
          {query ? formatTranslation(t.search.resultsHeading, { query }) : t.search.heading}
        </h1>
        {!emptyState && (
          <p className="mt-1 text-body text-text-secondary">
            {formatCount(products.length, t.categoryPage.resultsLabelOne, t.categoryPage.resultsLabel)}
          </p>
        )}

        <div className="mt-6">{emptyState ?? <ProductListing products={products} />}</div>
      </Section>
    </>
  );
};

export default SearchPage;
