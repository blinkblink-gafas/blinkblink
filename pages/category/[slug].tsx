import { useMemo } from "react";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Seo from "@/components/layout/Seo";
import FilterBar from "@/components/sections/FilterBar";
import ProductGrid from "@/components/sections/ProductGrid";
import EmptyState from "@/components/ui/EmptyState";
import Section from "@/components/ui/Section";
import { CATEGORY_SLUGS, listProducts } from "@/lib/catalog";
import { applyFilters, collectColors } from "@/lib/filters";
import { formatCount, formatTranslation, useTranslation } from "@/lib/i18n";
import { useUrlFilters } from "@/lib/useUrlFilters";
import type { LocaleStrings } from "@/types/locales";
import type { Product } from "@/types/product";

type CategorySlug = keyof LocaleStrings["categories"];

interface CategoryPageProps {
  slug: CategorySlug;
  products: Product[];
}

const CategoryPage: NextPage<CategoryPageProps> = ({ slug, products }) => {
  const t = useTranslation();
  const [filters, setFilters] = useUrlFilters();
  const categoryLabel = t.categories[slug];
  const availableColors = useMemo(() => collectColors(products), [products]);
  const visibleProducts = useMemo(() => applyFilters(products, filters), [products, filters]);

  return (
    <>
      <Seo title={formatTranslation(t.pages.category.title, { category: categoryLabel })} />

      <Section className="pb-0 pt-10 md:pb-0 md:pt-12 lg:pb-0 lg:pt-12">
        <h1 className="text-h2 font-bold text-text-primary">{categoryLabel}</h1>
        {products.length > 0 && (
          <p className="mt-2 text-body text-text-secondary" aria-live="polite">
            {formatCount(visibleProducts.length, t.categoryPage.resultsLabelOne, t.categoryPage.resultsLabel)}
          </p>
        )}
      </Section>

      {products.length === 0 ? (
        <Section>
          <EmptyState
            heading={t.categoryPage.emptyHeading}
            message={t.categoryPage.emptyMessage}
            actionLabel={t.categoryPage.browseAll}
            actionHref="/category/all"
          />
        </Section>
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

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: CATEGORY_SLUGS.map((slug) => ({ params: { slug } })),
  // Unknown categories 404 instead of rendering an empty listing.
  fallback: false,
});

export const getStaticProps: GetStaticProps<CategoryPageProps> = async ({ params }) => {
  const slug = String(params?.slug) as CategorySlug;

  return {
    props: { slug, products: listProducts({ category: slug }) },
    revalidate: 60,
  };
};

export default CategoryPage;
