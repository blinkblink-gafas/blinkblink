import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Minus, Plus, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import Seo from "@/components/layout/Seo";
import BrighterSideBanner from "@/components/sections/BrighterSideBanner";
import ProductGrid from "@/components/sections/ProductGrid";
import ProductTabs from "@/components/sections/ProductTabs";
import Badge from "@/components/ui/Badge";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Button from "@/components/ui/Button";
import Rating from "@/components/ui/Rating";
import Section from "@/components/ui/Section";
import WishlistButton from "@/components/ui/WishlistButton";
import { getProduct, listProducts, listProductSlugs } from "@/lib/catalog";
import { getColorSwatch } from "@/lib/colors";
import { formatTranslation, useTranslation } from "@/lib/i18n";
import { storeConfig } from "@/lib/storeConfig";
import { cn, discountPercent, formatPrice } from "@/lib/utils";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import type { Product } from "@/types/product";

interface ProductPageProps {
  product: Product;
  related: Product[];
}

/** schema.org Product markup so search engines can show price, stock and rating. */
function productJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((image) => image.url),
    sku: product.id,
    brand: { "@type": "Brand", name: "blink blink" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency,
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };
}

function ProductDetail({ product, related }: ProductPageProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const t = useTranslation();

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const activeImage = product.images[activeImageIndex] ?? product.images[0];
  const discount = discountPercent(product.price, product.mrp);
  const shippingAmount = formatPrice(storeConfig.freeShippingThreshold);

  const addSelectionToCart = () => {
    dispatch(
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0]?.url ?? "",
        color: selectedColor,
        quantity,
      })
    );
  };

  const handleBuyNow = () => {
    addSelectionToCart();
    void router.push("/checkout");
  };

  const trustItems = [
    { icon: Truck, text: t.productPage.trust.freeDelivery },
    { icon: RotateCcw, text: t.productPage.trust.easyReturns },
    { icon: ShieldCheck, text: t.productPage.trust.secureCheckout },
  ];

  return (
    <>
      <Seo
        title={formatTranslation(t.pages.product.title, { name: product.name })}
        description={product.description}
        image={product.images[0]?.url}
        type="product"
        jsonLd={productJsonLd(product)}
      />

      <Section className="pt-6 md:pt-8 lg:pt-8">
        <Breadcrumbs
          label={t.categoryPage.breadcrumb}
          items={[
            { label: t.common.home, href: "/" },
            { label: t.categories[product.category], href: `/category/${product.category}` },
            { label: product.name },
          ]}
        />

        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-[1.15fr_1fr] md:gap-12">
          {/* Gallery */}
          <div>
            <div className="flex flex-col-reverse gap-3 sm:flex-row">
              {product.images.length > 1 && (
                <div className="flex gap-3 sm:flex-col">
                  {product.images.map((image, index) => (
                    <button
                      key={image.url}
                      type="button"
                      onClick={() => setActiveImageIndex(index)}
                      aria-label={formatTranslation(t.productPage.showImage, { index: index + 1 })}
                      aria-pressed={index === activeImageIndex}
                      className={cn(
                        "relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-surface transition-shadow",
                        index === activeImageIndex ? "ring-2 ring-ink" : "ring-1 ring-ink/10 hover:ring-ink/40"
                      )}
                    >
                      <Image src={image.url} alt="" fill sizes="64px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-surface">
                {activeImage && (
                  <Image
                    src={activeImage.url}
                    alt={activeImage.alt}
                    fill
                    priority
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                )}
                {discount !== null && <Badge discountPercent={discount} className="absolute left-3 top-3 px-2.5 py-1.5 text-small" />}
              </div>
            </div>

            <div className="hidden md:block">
              <ProductTabs product={product} />
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-[28px] font-black leading-tight tracking-[-0.02em] text-text-primary sm:text-[34px]">
                {product.name}
              </h1>
              <WishlistButton productId={product.id} size={20} className="mt-1 h-11 w-11 shrink-0" />
            </div>

            <Rating
              rating={product.rating}
              reviewCount={product.reviewCount}
              countLabel={formatTranslation(t.productPage.reviewsLabel, { count: product.reviewCount })}
              className="mt-2"
            />

            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-[32px] font-black leading-none text-text-primary">{formatPrice(product.price, product.currency)}</span>
              {discount !== null && product.mrp && (
                <span className="text-lg text-text-secondary line-through">{formatPrice(product.mrp, product.currency)}</span>
              )}
            </div>
            {discount !== null && product.mrp && (
              <p className="mt-1 text-small font-semibold text-accent-pink">
                {formatTranslation(t.productPage.youSave, {
                  amount: formatPrice(product.mrp - product.price, product.currency),
                  percent: discount,
                })}
              </p>
            )}

            {product.description && <p className="mt-4 max-w-prose text-body text-text-secondary">{product.description}</p>}

            {/* Frame color */}
            <div className="mt-6">
              <p className="text-small font-bold text-text-primary">
                {t.productPage.frameColor}
                {selectedColor && <span className="font-normal text-text-secondary">: {selectedColor}</span>}
              </p>
              <div className="mt-2 flex gap-2.5">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    aria-label={color}
                    aria-pressed={selectedColor === color}
                    className={cn(
                      "h-8 w-8 rounded-full ring-1 ring-ink/20 transition-transform",
                      selectedColor === color ? "ring-2 ring-ink ring-offset-2" : "hover:scale-110"
                    )}
                    style={{ backgroundColor: getColorSwatch(color) }}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-6">
              <p className="text-small font-bold text-text-primary">{t.productPage.quantityLabel}</p>
              <div className="mt-2 inline-flex items-center gap-4 rounded-pill px-4 py-2 ring-1 ring-inset ring-ink/15">
                <button
                  type="button"
                  aria-label={t.productPage.decreaseQuantity}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="disabled:opacity-30"
                >
                  <Minus size={16} />
                </button>
                <span className="w-5 text-center font-semibold" aria-live="polite">
                  {quantity}
                </span>
                <button type="button" aria-label={t.productPage.increaseQuantity} onClick={() => setQuantity((q) => q + 1)}>
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <Button size="lg" onClick={addSelectionToCart} disabled={!product.inStock} className="w-full">
                {product.inStock ? t.common.addToCart : t.common.outOfStock}
              </Button>
              {product.inStock && (
                <Button size="lg" variant="secondary" onClick={handleBuyNow} className="w-full">
                  {t.common.buyNow}
                </Button>
              )}
            </div>

            <ul className="mt-6 flex flex-col gap-4">
              {trustItems.map(({ icon: Icon, text }) => (
                <li key={text.title} className="flex items-center gap-3">
                  <Icon size={24} strokeWidth={1.75} aria-hidden="true" className="shrink-0 text-ink" />
                  <div>
                    <p className="text-small font-bold text-text-primary">{text.title}</p>
                    <p className="text-xs text-text-secondary">
                      {formatTranslation(text.subtitle, { amount: shippingAmount, days: storeConfig.returnDays })}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="md:hidden">
              <ProductTabs product={product} />
            </div>
          </div>
        </div>
      </Section>

      <BrighterSideBanner />

      {related.length > 0 && (
        <ProductGrid
          products={related}
          heading={t.productPage.relatedHeading}
          viewAllHref={`/category/${product.category}`}
          viewAllLabel={t.common.viewAll}
        />
      )}
    </>
  );
}

/**
 * Keyed by product so color, quantity and gallery state reset when moving
 * between products (e.g. via "You might also like") — Next reuses the page
 * component across same-route navigations.
 */
const ProductPage: NextPage<ProductPageProps> = (props) => (
  <ProductDetail key={props.product.id} {...props} />
);

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: listProductSlugs().map((slug) => ({ params: { slug } })),
  // Products added after the build are rendered on first request, then cached.
  fallback: "blocking",
});

export const getStaticProps: GetStaticProps<ProductPageProps> = async ({ params }) => {
  const product = getProduct(String(params?.slug));

  if (!product) {
    return { notFound: true, revalidate: 60 };
  }

  const related = listProducts({ category: product.category })
    .filter((candidate) => candidate.id !== product.id)
    .slice(0, 4);

  return {
    props: { product, related },
    revalidate: 60,
  };
};

export default ProductPage;
