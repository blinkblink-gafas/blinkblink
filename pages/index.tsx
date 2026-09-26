import type { NextPage } from "next";
import Head from "next/head";
import Hero from "@/components/sections/Hero";
import ShopByCategory from "@/components/sections/ShopByCategory";
import ProductGrid from "@/components/sections/ProductGrid";
import { getFeaturedProducts } from "@/lib/mockData";
import { useTranslation } from "@/lib/i18n";

const Home: NextPage = () => {
  const t = useTranslation();
  const featuredProducts = getFeaturedProducts(4);

  return (
    <>
      <Head>
        <title>{t.pages.home.title}</title>
        <meta
          name="description"
          content={t.pages.home.description}
        />
      </Head>

      <Hero />
      <ShopByCategory />
      <ProductGrid
        products={featuredProducts}
        heading={t.trending.heading}
        viewAllHref="/category/all"
        viewAllLabel={t.shopByCategory.viewAll}
        className="bg-white"
      />
    </>
  );
};

export default Home;
