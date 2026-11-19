import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Seo from "@/components/layout/Seo";
import ProductListing from "@/components/sections/ProductListing";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import EmptyState from "@/components/ui/EmptyState";
import Section from "@/components/ui/Section";
import { CATEGORY_SLUGS, listProducts } from "@/lib/catalog";
import { formatTranslation, useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { LocaleStrings } from "@/types/locales";
import type { Product } from "@/types/product";

type CategorySlug = keyof LocaleStrings["categories"];

interface CategoryPageProps {
  slug: CategorySlug;
  products: Product[];
}

/** Each collection's banner color — matches its homepage tile. */
const bannerClasses: Record<CategorySlug, string> = {
  all: "bg-ink text-white",
  men: "bg-accent-blue text-white",
  women: "bg-accent-pink text-white",
  classic: "bg-primary text-ink",
};

const CategoryPage: NextPage<CategoryPageProps> = ({ slug, products }) => {
  const t = useTranslation();
  const categoryLabel = t.categories[slug];

  return (
    <>
      <Seo
        title={formatTranslation(t.pages.category.title, { category: categoryLabel })}
        description={t.categoryPage.subtitles[slug]}
      />

      <header className={cn("w-full", bannerClasses[slug])}>
        <div className="mx-auto flex min-h-[180px] max-w-section flex-col justify-end px-4 pb-6 pt-10 md:min-h-[240px] md:px-8 md:pb-8 lg:px-12">
          <h1 className="font-display text-[64px] font-extrabold uppercase leading-[0.85] sm:text-[88px] lg:text-[112px]">{categoryLabel}</h1>
          <p className="mt-2 text-small font-semibold sm:text-body">{t.categoryPage.subtitles[slug]}</p>
        </div>
      </header>

      <Section className="pt-4 md:pt-5 lg:pt-5">
        <Breadcrumbs
          label={t.categoryPage.breadcrumb}
          items={[{ label: t.common.home, href: "/" }, { label: categoryLabel }]}
        />

        <div className="mt-4">
          {products.length > 0 ? (
            <ProductListing products={products} showEditorialTile />
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
