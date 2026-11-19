import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/types/product";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { getColorSwatch } from "@/lib/colors";
import { cn, discountPercent, formatPrice } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import WishlistButton from "@/components/ui/WishlistButton";
import { formatTranslation, useTranslation } from "@/lib/i18n";

export interface ProductCardProps {
  product: Product;
  className?: string;
  /** Load the image eagerly — for cards visible on first paint. */
  priority?: boolean;
}

/**
 * Product tile: white card with the frame photo, a status badge, wishlist and
 * quick-add buttons, color dots, then name + color on the left and price on
 * the right. The whole card links to the product page; the two buttons sit
 * above that link (z-20) so they stay independently clickable.
 */
export default function ProductCard({ product, className, priority = false }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const t = useTranslation();
  const primaryImage = product.images[0];
  const discount = discountPercent(product.price, product.mrp);
  const firstBadge = product.badges?.find((badge) => badge !== "Sale");
  const colorName = product.colors[0];

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: primaryImage?.url ?? "",
        color: colorName,
        quantity: 1,
      })
    );
  };

  return (
    <article className={cn("group relative flex flex-col bg-white p-3 sm:p-4", className)}>
      <Link href={`/product/${product.slug}`} aria-label={product.name} className="absolute inset-0 z-10" />

      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt}
            fill
            priority={priority}
            className={cn(
              "object-contain px-1 pb-1 pt-9 transition-transform duration-500 group-hover:scale-105",
              !product.inStock && "opacity-50"
            )}
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-small text-text-secondary">{t.common.noImage}</div>
        )}

        <div className="absolute left-0 top-0">
          {!product.inStock ? (
            <span className="inline-flex bg-ink px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-white">
              {t.common.soldOut}
            </span>
          ) : discount !== null ? (
            <Badge discountPercent={discount} />
          ) : (
            firstBadge && <Badge label={firstBadge} />
          )}
        </div>

        <div className="absolute -right-2 -top-2 z-20 flex">
          <WishlistButton productId={product.id} className="h-10 w-10" />
          {product.inStock && (
            <button
              type="button"
              onClick={handleAddToCart}
              aria-label={formatTranslation(t.common.quickAdd, { name: product.name })}
              className="flex h-10 w-10 items-center justify-center text-ink transition-opacity hover:opacity-60"
            >
              <ShoppingBag size={18} strokeWidth={1.75} />
            </button>
          )}
        </div>
      </div>

      {colorName && (
        <div className="mt-2 flex justify-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full ring-1 ring-ink/15" style={{ backgroundColor: getColorSwatch(colorName) }} />
        </div>
      )}

      <div className="mt-2 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-display text-xl font-bold uppercase leading-none text-text-primary sm:text-[22px]">
            {product.name}
          </h3>
          {colorName && (
            <p className="mt-1 truncate text-[11px] uppercase tracking-[0.04em] text-text-secondary">{colorName}</p>
          )}
        </div>
        <div className="shrink-0 text-right">
          {discount !== null && product.mrp && (
            <p className="text-[11px] text-text-secondary line-through">{formatPrice(product.mrp, product.currency)}</p>
          )}
          <p
            className={cn(
              "font-display text-xl font-bold leading-none sm:text-[22px]",
              discount !== null ? "text-accent-pink" : "text-text-primary"
            )}
          >
            {formatPrice(product.price, product.currency)}
          </p>
        </div>
      </div>
    </article>
  );
}
