import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Section from "@/components/ui/Section";
import { formatTranslation, useTranslation } from "@/lib/i18n";

interface CategoryPageProps {
  slug: string;
}

const CategoryPage: NextPage<CategoryPageProps> = ({ slug }) => {
  const t = useTranslation();
  const values = { category: slug };

  return (
    <>
      <Head>
        <title>{formatTranslation(t.pages.category.title, values)}</title>
      </Head>

      <Section>
        <p className="text-body text-ink/60">
          {formatTranslation(t.pages.category.placeholder, values)}
        </p>
      </Section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<CategoryPageProps> = async ({
  params,
}) => {
  const slug = typeof params?.slug === "string" ? params.slug : "";

  return {
    props: { slug },
  };
};

export default CategoryPage;
