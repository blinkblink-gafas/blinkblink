import type { GetStaticProps, NextPage } from "next";
import Seo from "@/components/layout/Seo";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import NewsletterSignup from "@/components/sections/NewsletterSignup";
import ProductCarousel from "@/components/sections/ProductCarousel";
import PromoBanner from "@/components/sections/PromoBanner";
import ShopByCategory from "@/components/sections/ShopByCategory";
import { getFeaturedProducts, getNewProducts } from "@/lib/catalog";
import { useTranslation } from "@/lib/i18n";
import type { Product } from "@/types/product";

interface HomeProps {
  bestSellers: Product[];
  newIn: Product[];
}

const Home: NextPage<HomeProps> = ({ bestSellers, newIn }) => {
  const t = useTranslation();

  return (
    <>
      <Seo title={t.pages.home.title} description={t.pages.home.description} />

      <Hero />
      <Marquee />
      <ProductCarousel
        id="best-sellers-heading"
        products={bestSellers}
        heading={t.bestSellers.heading}
        viewAllHref="/category/all"
        viewAllLabel={t.common.viewAll}
      />
      <ShopByCategory />
      <ProductCarousel id="new-in-heading" products={newIn} heading={t.newIn.heading} />
      <PromoBanner />
      <NewsletterSignup />
    </>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => ({
  props: { bestSellers: getFeaturedProducts(8), newIn: getNewProducts(8) },
  revalidate: 60,
});

export default Home;
