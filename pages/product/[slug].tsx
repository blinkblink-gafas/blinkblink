import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Minus, Plus, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import Seo from "@/components/layout/Seo";
import ProductAccordion from "@/components/sections/ProductAccordion";
import ProductCarousel from "@/components/sections/ProductCarousel";
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
import type { Product, ProductCategory } from "@/types/product";

interface ProductPageProps {
  product: Product;
  related: Product[];
}

/** The color block behind the second gallery tile — matches the collection's color. */
const collectionBlock: Record<ProductCategory, string> = {
  men: "bg-accent-blue",
  women: "bg-accent-pink",
  classic: "bg-primary",
};

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
  const [quantity, setQuantity] = useState(1);

  const [mainImage, ...moreImages] = product.images;
  const discount = discountPercent(product.price, product.mrp);
  const shippingAmount = formatPrice(storeConfig.freeShippingThreshold);

  const addSelectionToCart = () => {
    dispatch(
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: mainImage?.url ?? "",
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
        image={mainImage?.url}
        type="product"
        jsonLd={productJsonLd(product)}
      />

      <Section className="pt-4 md:pt-5 lg:pt-5">
        <Breadcrumbs
          label={t.categoryPage.breadcrumb}
          items={[
            { label: t.common.home, href: "/" },
            { label: t.categories[product.category], href: `/category/${product.category}` },
            { label: product.name },
          ]}
        />

        <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-12">
          {/* Gallery: main photo, then a color-block tile (or the other photos once real ones exist). */}
          <div className="grid grid-cols-2 gap-2 self-start">
            {mainImage && (
              <div className="relative col-span-2 aspect-[4/3] bg-white">
                <Image src={mainImage.url} alt={mainImage.alt} fill priority sizes="(min-width: 1024px) 58vw, 100vw" className="object-contain p-6 md:p-10" />
                {discount !== null && <Badge discountPercent={discount} className="absolute left-0 top-0 px-2.5 py-1.5 text-xs" />}
              </div>
            )}
            {moreImages.length > 0
              ? moreImages.map((image) => (
                  <div key={image.url} className="relative aspect-square bg-white">
                    <Image src={image.url} alt={image.alt} fill sizes="(min-width: 1024px) 29vw, 50vw" className="object-contain p-4" />
                  </div>
                ))
              : mainImage && (
                  <div aria-hidden="true" className={cn("relative col-span-2 aspect-[2/1]", collectionBlock[product.category])}>
                    <Image src={mainImage.url} alt="" fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-contain p-8 photo-cutout md:p-12" />
                  </div>
                )}
          </div>

          {/* Buy panel */}
          <div className="lg:sticky lg:top-40 lg:self-start">
            <div className="flex items-start justify-between gap-4">
              <h1 className="font-display text-[48px] font-extrabold uppercase leading-[0.88] text-text-primary sm:text-[56px]">{product.name}</h1>
              <div className="text-right">
                {discount !== null && product.mrp && (
                  <p className="text-small text-text-secondary line-through">{formatPrice(product.mrp, product.currency)}</p>
                )}
                <p className={cn("font-display text-[36px] font-bold leading-none", discount !== null ? "text-accent-pink" : "text-text-primary")}>
                  {formatPrice(product.price, product.currency)}
                </p>
              </div>
            </div>

            {discount !== null && product.mrp && (
              <p className="mt-2 text-right text-xs font-semibold text-accent-pink">
                {formatTranslation(t.productPage.youSave, {
                  amount: formatPrice(product.mrp - product.price, product.currency),
                  percent: discount,
                })}
              </p>
            )}

            <Rating
              rating={product.rating}
              reviewCount={product.reviewCount}
              countLabel={formatTranslation(t.productPage.reviewsLabel, { count: product.reviewCount })}
              className="mt-3"
            />

            {/* Color and lenses */}
            <div className="mt-6 flex gap-2.5">
              {product.colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  aria-label={color}
                  aria-pressed={selectedColor === color}
                  className={cn(
                    "h-7 w-7 rounded-full ring-1 ring-ink/20 transition-transform",
                    selectedColor === color ? "ring-2 ring-ink ring-offset-2 ring-offset-surface" : "hover:scale-110"
                  )}
                  style={{ backgroundColor: getColorSwatch(color) }}
                />
              ))}
            </div>
            <dl className="mt-3 space-y-1 text-small text-text-secondary">
              <div className="flex gap-1">
                <dt>{t.productPage.colorLabel}:</dt>
                <dd className="font-semibold text-text-primary">{selectedColor}</dd>
              </div>
              <div className="flex gap-1">
                <dt>{t.productPage.lensLabel}:</dt>
                <dd className="font-semibold text-text-primary">{product.lensColors.join(", ")}</dd>
              </div>
            </dl>

            {/* Quantity + actions */}
            <div className="mt-6 flex gap-2">
              <div className="flex items-center ring-1 ring-inset ring-ink/20" role="group" aria-label={t.productPage.quantityLabel}>
                <button
                  type="button"
                  aria-label={t.productPage.decreaseQuantity}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="grid h-12 w-10 place-items-center disabled:opacity-30"
                >
                  <Minus size={16} />
                </button>
                <span className="w-6 text-center font-semibold" aria-live="polite">
                  {quantity}
                </span>
                <button type="button" aria-label={t.productPage.increaseQuantity} onClick={() => setQuantity((q) => q + 1)} className="grid h-12 w-10 place-items-center">
                  <Plus size={16} />
                </button>
              </div>
              <Button size="lg" onClick={addSelectionToCart} disabled={!product.inStock} className="flex-1">
                {product.inStock ? t.common.addToCart : t.common.outOfStock}
              </Button>
              <WishlistButton productId={product.id} size={20} className="h-12 w-12 shrink-0 ring-1 ring-inset ring-ink/20" />
            </div>
            {product.inStock && (
              <Button size="lg" variant="secondary" onClick={handleBuyNow} className="mt-2 w-full">
                {t.common.buyNow}
              </Button>
            )}

            <ul className="mt-6 grid grid-cols-3 gap-3 border-y border-ink/15 py-4">
              {trustItems.map(({ icon: Icon, text }) => (
                <li key={text.title} className="flex flex-col items-center gap-1.5 text-center">
                  <Icon size={22} strokeWidth={1.5} aria-hidden="true" className="text-ink" />
                  <p className="text-[11px] font-semibold uppercase leading-tight tracking-[0.04em] text-text-primary">{text.title}</p>
                  <p className="text-[11px] leading-tight text-text-secondary">
                    {formatTranslation(text.subtitle, { amount: shippingAmount, days: storeConfig.returnDays })}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <ProductAccordion product={product} />
            </div>
          </div>
        </div>
      </Section>

      <ProductCarousel id="related-heading" products={related} heading={t.productPage.relatedHeading} />
    </>
  );
}

/**
 * Keyed by product so color, quantity and gallery state reset when moving
 * between products (e.g. via "You may also like") — Next reuses the page
 * component across same-route navigations.
 */
const ProductPage: NextPage<ProductPageProps> = (props) => <ProductDetail key={props.product.id} {...props} />;

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
    .slice(0, 8);

  return {
    props: { product, related },
    revalidate: 60,
  };
};

export default ProductPage;
