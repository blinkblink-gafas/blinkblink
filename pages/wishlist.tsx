import { useMemo } from "react";
import type { NextPage } from "next";
import Seo from "@/components/layout/Seo";
import ProductGrid from "@/components/sections/ProductGrid";
import EmptyState from "@/components/ui/EmptyState";
import Section from "@/components/ui/Section";
import { useGetProductsQuery } from "@/store/api/productsApi";
import { useAppSelector } from "@/store/hooks";
import { selectWishlistHydrated, selectWishlistIds } from "@/store/slices/wishlistSlice";
import { useTranslation } from "@/lib/i18n";

const WishlistPage: NextPage = () => {
  const t = useTranslation();
  const hydrated = useAppSelector(selectWishlistHydrated);
  const wishlistIds = useAppSelector(selectWishlistIds);
  const hasItems = wishlistIds.length > 0;

  const { data: products = [], isLoading } = useGetProductsQuery(undefined, { skip: !hasItems });

  // Keep the order items were saved in; ids for products that no longer exist are skipped.
  const wishlisted = useMemo(
    () =>
      wishlistIds
        .map((id) => products.find((product) => product.id === id))
        .filter((product): product is NonNullable<typeof product> => Boolean(product)),
    [wishlistIds, products]
  );

  const isPending = !hydrated || (hasItems && isLoading);

  return (
    <>
      <Seo title={t.pages.wishlist.title} noIndex />

      {isPending ? (
        <Section>
          <p className="min-h-[40vh] text-body text-text-secondary" aria-busy="true">
            {t.wishlist.loading}
          </p>
        </Section>
      ) : wishlisted.length === 0 ? (
        <Section>
          <EmptyState
            isPageHeading
            heading={t.wishlist.emptyHeading}
            message={t.wishlist.emptyMessage}
            actionLabel={t.wishlist.browse}
            actionHref="/category/all"
          />
        </Section>
      ) : (
        <>
          <Section className="pb-0 pt-10 md:pb-0 md:pt-12 lg:pb-0 lg:pt-12">
            <h1 className="text-h2 font-bold text-text-primary">{t.wishlist.heading}</h1>
          </Section>
          <ProductGrid products={wishlisted} className="pt-8 md:pt-10 lg:pt-10" />
        </>
      )}
    </>
  );
};

export default WishlistPage;
