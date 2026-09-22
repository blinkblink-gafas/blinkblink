import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Section from "@/components/ui/Section";
import { formatTranslation, useTranslation } from "@/lib/i18n";

interface ProductPageProps {
  id: string;
}

const ProductPage: NextPage<ProductPageProps> = ({ id }) => {
  const t = useTranslation();
  const values = { id };

  return (
    <>
      <Head>
        <title>{formatTranslation(t.pages.product.title, values)}</title>
      </Head>

      <Section>
        <p className="text-body text-ink/60">
          {formatTranslation(t.pages.product.placeholder, values)}
        </p>
      </Section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ProductPageProps> = async ({
  params,
}) => {
  const id = typeof params?.id === "string" ? params.id : "";

  return {
    props: { id },
  };
};

export default ProductPage;
