import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { cn, discountPercent, formatPrice } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Rating from "@/components/ui/Rating";
import WishlistButton from "@/components/ui/WishlistButton";
import { useTranslation } from "@/lib/i18n";

export interface ProductCardProps {
  product: Product;
  className?: string;
  /** Load the image eagerly — for cards visible on first paint. */
  priority?: boolean;
}

/**
 * Product tile: photo, discount (or first) badge, wishlist toggle, name,
 * price with strikethrough MRP, rating and Add to Cart. The whole card links
 * to the product page; the wishlist and Add to Cart buttons sit above that
 * link (z-20) so they stay independently clickable.
 */
export default function ProductCard({ product, className, priority = false }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const t = useTranslation();
  const primaryImage = product.images[0];
  const discount = discountPercent(product.price, product.mrp);
  const firstBadge = product.badges?.find((badge) => badge !== "Sale");

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: primaryImage?.url ?? "",
        color: product.colors[0],
        quantity: 1,
      })
    );
  };

  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-2xl bg-white p-3 ring-1 ring-ink/10 transition-shadow hover:shadow-lg hover:shadow-ink/10",
        className
      )}
    >
      <Link href={`/product/${product.slug}`} aria-label={product.name} className="absolute inset-0 z-10 rounded-2xl" />

      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-surface">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt}
            fill
            priority={priority}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-small text-text-secondary">{t.common.noImage}</div>
        )}

        <div className="absolute left-2 top-2 flex gap-1">
          {discount !== null ? <Badge discountPercent={discount} /> : firstBadge && <Badge label={firstBadge} />}
        </div>

        <WishlistButton productId={product.id} className="absolute right-2 top-2 z-20 h-8 w-8" />
      </div>

      <div className="flex flex-1 flex-col gap-1 px-1 pt-3">
        <h3 className="line-clamp-1 text-body font-bold text-text-primary">{product.name}</h3>

        <div className="flex items-baseline gap-2">
          <span className={cn("text-body font-bold", discount !== null ? "text-accent-pink" : "text-text-primary")}>
            {formatPrice(product.price, product.currency)}
          </span>
          {discount !== null && product.mrp && (
            <span className="text-small text-text-secondary line-through">{formatPrice(product.mrp, product.currency)}</span>
          )}
        </div>

        <Rating rating={product.rating} reviewCount={product.reviewCount} />

        <Button
          size="sm"
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="relative z-20 mt-2 w-full"
        >
          {product.inStock ? t.common.addToCart : t.common.outOfStock}
        </Button>
      </div>
    </article>
  );
}
