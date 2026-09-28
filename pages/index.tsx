import type { GetStaticProps, NextPage } from "next";
import Seo from "@/components/layout/Seo";
import Hero from "@/components/sections/Hero";
import ShopByCategory from "@/components/sections/ShopByCategory";
import ProductGrid from "@/components/sections/ProductGrid";
import { getFeaturedProducts } from "@/lib/catalog";
import { useTranslation } from "@/lib/i18n";
import type { Product } from "@/types/product";

interface HomeProps {
  featuredProducts: Product[];
}

const Home: NextPage<HomeProps> = ({ featuredProducts }) => {
  const t = useTranslation();

  return (
    <>
      <Seo title={t.pages.home.title} description={t.pages.home.description} />

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

export const getStaticProps: GetStaticProps<HomeProps> = async () => ({
  props: { featuredProducts: getFeaturedProducts(4) },
  revalidate: 60,
});

export default Home;
