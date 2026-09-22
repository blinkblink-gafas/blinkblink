import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Section from "@/components/ui/Section";

interface CategoryPageProps {
  slug: string;
}

const CategoryPage: NextPage<CategoryPageProps> = ({ slug }) => {
  return (
    <>
      <Head>
        <title>{slug} — blink blink</title>
      </Head>

      <Section>
        <p className="text-body text-ink/60">
          Category scaffold for &ldquo;{slug}&rdquo; — product grid coming soon.
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
