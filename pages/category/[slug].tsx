import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Seo from "@/components/layout/Seo";
import ProductListing from "@/components/sections/ProductListing";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import EmptyState from "@/components/ui/EmptyState";
import Section from "@/components/ui/Section";
import { CATEGORY_SLUGS, listProducts } from "@/lib/catalog";
import { formatTranslation, useTranslation } from "@/lib/i18n";
import type { LocaleStrings } from "@/types/locales";
import type { Product } from "@/types/product";

type CategorySlug = keyof LocaleStrings["categories"];

interface CategoryPageProps {
  slug: CategorySlug;
  products: Product[];
}

const CategoryPage: NextPage<CategoryPageProps> = ({ slug, products }) => {
  const t = useTranslation();
  const categoryLabel = t.categories[slug];

  return (
    <>
      <Seo
        title={formatTranslation(t.pages.category.title, { category: categoryLabel })}
        description={t.categoryPage.subtitles[slug]}
      />

      <Section className="pt-6 md:pt-8 lg:pt-8">
        <Breadcrumbs
          label={t.categoryPage.breadcrumb}
          items={[{ label: t.common.home, href: "/" }, { label: categoryLabel }]}
        />
        <h1 className="mt-4 text-[32px] font-black tracking-[-0.03em] text-text-primary sm:text-[40px]">{categoryLabel}</h1>
        <p className="mt-1 text-body text-text-secondary">{t.categoryPage.subtitles[slug]}</p>

        <div className="mt-6">
          {products.length > 0 ? (
            <ProductListing products={products} />
          ) : (
            <EmptyState
              heading={t.categoryPage.emptyHeading}
              message={t.categoryPage.emptyMessage}
              actionLabel={t.categoryPage.browseAll}
              actionHref="/category/all"
            />
          )}
        </div>
      </Section>
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
