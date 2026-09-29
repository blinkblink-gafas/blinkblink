import type { GetStaticProps, NextPage } from "next";
import Seo from "@/components/layout/Seo";
import Hero from "@/components/sections/Hero";
import NewsletterSignup from "@/components/sections/NewsletterSignup";
import ProductGrid from "@/components/sections/ProductGrid";
import PromoBanner from "@/components/sections/PromoBanner";
import ShopByCategory from "@/components/sections/ShopByCategory";
import { getFeaturedProducts } from "@/lib/catalog";
import { useTranslation } from "@/lib/i18n";
import type { Product } from "@/types/product";

interface HomeProps {
  bestSellers: Product[];
}

const Home: NextPage<HomeProps> = ({ bestSellers }) => {
  const t = useTranslation();

  return (
    <>
      <Seo title={t.pages.home.title} description={t.pages.home.description} />

      <Hero />
      <ShopByCategory />
      <PromoBanner />
      <ProductGrid
        products={bestSellers}
        heading={t.bestSellers.heading}
        viewAllHref="/category/all"
        viewAllLabel={t.shopByCategory.viewAll}
        className="py-6 md:py-8 lg:py-8"
      />
      <NewsletterSignup />
    </>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => ({
  props: { bestSellers: getFeaturedProducts(4) },
  revalidate: 60,
});

export default Home;
