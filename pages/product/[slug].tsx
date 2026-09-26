import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { ChevronLeft, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Section from "@/components/ui/Section";
import { getProductBySlug } from "@/lib/mockData";
import { getColorSwatch } from "@/lib/colors";
import { cn, formatPrice } from "@/lib/utils";
import { formatTranslation, useTranslation } from "@/lib/i18n";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import type { Product } from "@/types/product";

interface ProductPageProps {
  product: Product | null;
}

function ProductNotFound() {
  const t = useTranslation();

  return (
    <>
      <Head>
        <title>{t.pages.product.notFoundTitle}</title>
      </Head>
      <Section className="text-center">
        <h1 className="text-h2 font-bold text-text-primary">{t.productPage.notFoundHeading}</h1>
        <p className="mx-auto mt-2 max-w-md text-body text-text-secondary">
          {t.productPage.notFoundMessage}
        </p>
        <Link
          href="/"
          className="mt-6 inline-block text-small font-semibold text-secondary hover:underline hover:underline-offset-4"
        >
          {t.productPage.backToShop}
        </Link>
      </Section>
    </>
  );
}

const ProductPage: NextPage<ProductPageProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const t = useTranslation();

  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const activeImage = useMemo(
    () => product?.images[activeImageIndex] ?? product?.images[0],
    [product, activeImageIndex]
  );

  if (!product) {
    return <ProductNotFound />;
  }

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
      <Head>
        <title>{formatTranslation(t.pages.product.title, { name: product.name })}</title>
      </Head>

      <Section>
        <Link
          href={`/category/${product.category}`}
          className="mb-6 inline-flex items-center gap-1 text-small font-semibold text-text-secondary hover:text-secondary hover:underline hover:underline-offset-4"
        >
          <ChevronLeft size={16} />
          {formatTranslation(t.productPage.breadcrumbBack, { category: product.category })}
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

            <h1 className="text-h2 font-bold text-text-primary">{product.name}</h1>

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
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="disabled:opacity-40"
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="w-4 text-center font-semibold">{quantity}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
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
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ProductPageProps> = async ({
  params,
}) => {
  const slug = typeof params?.slug === "string" ? params.slug : "";

  return {
    props: { product: getProductBySlug(slug) ?? null },
  };
};

export default ProductPage;
