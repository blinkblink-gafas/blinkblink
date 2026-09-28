import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ChevronLeft, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import Seo from "@/components/layout/Seo";
import ProductGrid from "@/components/sections/ProductGrid";
import Badge from "@/components/ui/Badge";
import Section from "@/components/ui/Section";
import WishlistButton from "@/components/ui/WishlistButton";
import { getProduct, listProducts, listProductSlugs } from "@/lib/catalog";
import { getColorSwatch } from "@/lib/colors";
import { cn, formatPrice } from "@/lib/utils";
import { formatTranslation, useTranslation } from "@/lib/i18n";
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
  const t = useTranslation();

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const activeImage = useMemo(
    () => product.images[activeImageIndex] ?? product.images[0],
    [product, activeImageIndex]
  );

  const handleAddToCart = () => {
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

  return (
    <>
      <Seo
        title={formatTranslation(t.pages.product.title, { name: product.name })}
        description={product.description}
        image={product.images[0]?.url}
        type="product"
        jsonLd={productJsonLd(product)}
      />

      <Section>
        <Link
          href={`/category/${product.category}`}
          className="mb-6 inline-flex items-center gap-1 text-small font-semibold text-text-secondary hover:text-secondary hover:underline hover:underline-offset-4"
        >
          <ChevronLeft size={16} />
          {formatTranslation(t.productPage.breadcrumbBack, { category: t.categories[product.category] })}
        </Link>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          {/* Gallery */}
          <div>
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border-3 border-ink bg-surface">
              {activeImage && (
                <Image
                  src={activeImage.url}
                  alt={activeImage.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 45vw, 90vw"
                  priority
                />
              )}
            </div>

            {product.images.length > 1 && (
              <div className="mt-4 flex gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={image.url}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    aria-label={image.alt}
                    aria-pressed={index === activeImageIndex}
                    className={cn(
                      "relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2",
                      index === activeImageIndex ? "border-secondary" : "border-ink/20"
                    )}
                  >
                    <Image src={image.url} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            {product.badges && product.badges.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {product.badges.map((badge) => (
                  <Badge key={badge} label={badge} />
                ))}
              </div>
            )}

            <div className="flex items-start justify-between gap-4">
              <h1 className="text-h2 font-bold text-text-primary">{product.name}</h1>
              <WishlistButton productId={product.id} size={20} className="mt-1 h-11 w-11 shrink-0" />
            </div>

            <div className="mt-2 flex items-center gap-1.5 text-body text-text-secondary">
              <Star size={16} className="fill-primary text-ink" />
              <span className="font-semibold text-text-primary">{product.rating.toFixed(1)}</span>
              <span>({formatTranslation(t.productPage.reviewsLabel, { count: product.reviewCount })})</span>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <span className="text-h1 leading-none">{formatPrice(product.price, product.currency)}</span>
              {product.mrp && product.mrp > product.price && (
                <span className="text-h3 text-ink/40 line-through">
                  {formatPrice(product.mrp, product.currency)}
                </span>
              )}
            </div>

            {product.description && (
              <p className="mt-5 max-w-prose text-body text-text-secondary">{product.description}</p>
            )}

            {/* Color picker */}
            <div className="mt-6">
              <p className="text-small font-semibold text-text-primary">
                {formatTranslation(t.productPage.colorLabel, { color: selectedColor ?? "" })}
              </p>
              <div className="mt-2 flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    aria-label={color}
                    aria-pressed={selectedColor === color}
                    className={cn(
                      "h-9 w-9 rounded-full border-2 transition-transform",
                      selectedColor === color
                        ? "border-ink ring-2 ring-secondary ring-offset-2"
                        : "border-ink/30 hover:scale-105"
                    )}
                    style={{ backgroundColor: getColorSwatch(color) }}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-6">
              <p className="text-small font-semibold text-text-primary">{t.productPage.quantityLabel}</p>
              <div className="mt-2 inline-flex items-center gap-4 rounded-pill border-3 border-ink px-4 py-2">
                <button
                  type="button"
                  aria-label={t.productPage.decreaseQuantity}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="disabled:opacity-40"
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="w-4 text-center font-semibold">{quantity}</span>
                <button
                  type="button"
                  aria-label={t.productPage.increaseQuantity}
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={cn(
                "mt-8 inline-flex w-full items-center justify-center gap-2 rounded-pill border-3 border-ink bg-ink px-6 py-4 text-body font-semibold text-primary transition-all sm:w-auto",
                "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-comic",
                "active:translate-x-0 active:translate-y-0",
                "disabled:opacity-50 disabled:pointer-events-none"
              )}
            >
              <ShoppingCart size={18} />
              {product.inStock ? t.common.addToCart : t.common.outOfStock}
            </button>
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <ProductGrid
          products={related}
          heading={t.productPage.relatedHeading}
          viewAllHref={`/category/${product.category}`}
          viewAllLabel={t.common.viewAll}
          className="bg-white"
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
