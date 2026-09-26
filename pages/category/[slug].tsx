import Link from "next/link";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import ProductGrid from "@/components/sections/ProductGrid";
import Section from "@/components/ui/Section";
import { getProductsByCategory } from "@/lib/mockData";
import { prettifyLabel } from "@/lib/utils";
import { formatTranslation, useTranslation } from "@/lib/i18n";
import type { Product } from "@/types/product";

interface CategoryPageProps {
  slug: string;
  products: Product[];
}

const CategoryPage: NextPage<CategoryPageProps> = ({ slug, products }) => {
  const t = useTranslation();
  const categoryLabel = slug === "all" ? "All Styles" : prettifyLabel(slug);
  const values = { category: categoryLabel };

  return (
    <>
      <Head>
        <title>{formatTranslation(t.pages.category.title, values)}</title>
      </Head>

      <Section className="pb-0 pt-10 md:pt-12">
        <h1 className="text-h2 font-bold text-text-primary">{categoryLabel}</h1>
        {products.length > 0 && (
          <p className="mt-2 text-body text-text-secondary">
            {formatTranslation(t.categoryPage.resultsLabel, { count: products.length })}
          </p>
        )}
      </Section>

      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <Section>
          <h2 className="text-h3 font-bold text-text-primary">{t.categoryPage.emptyHeading}</h2>
          <p className="mt-2 max-w-md text-body text-text-secondary">{t.categoryPage.emptyMessage}</p>
          <Link
            href="/"
            className="mt-6 inline-block text-small font-semibold text-secondary hover:underline hover:underline-offset-4"
          >
            {t.categoryPage.backToHome}
          </Link>
        </Section>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<CategoryPageProps> = async ({
  params,
}) => {
  const slug = typeof params?.slug === "string" ? params.slug : "";

  return {
    props: { slug, products: getProductsByCategory(slug) },
  };
};

export default CategoryPage;
