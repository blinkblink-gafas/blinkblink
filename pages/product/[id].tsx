import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Section from "@/components/ui/Section";

interface ProductPageProps {
  id: string;
}

const ProductPage: NextPage<ProductPageProps> = ({ id }) => {
  return (
    <>
      <Head>
        <title>Product {id} — blink blink</title>
      </Head>

      <Section>
        <p className="text-body text-ink/60">
          Product detail scaffold for id &ldquo;{id}&rdquo; — PDP layout coming soon.
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
