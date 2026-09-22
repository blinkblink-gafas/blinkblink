import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import type { Product } from "@/types/product";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { formatPrice, cn } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

export interface ProductCardProps {
  product: Product;
  className?: string;
}

/**
 * Layout shell for a product tile: image, badges, title, rating,
 * price (+ strikethrough MRP when discounted), and an Add to Cart
 * button that dispatches into the cart slice. No real product data
 * wired in yet — this is the reusable shape future sections render.
 */
export default function ProductCard({ product, className }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const primaryImage = product.images[0];

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: primaryImage?.url ?? "",
        quantity: 1,
      })
    );
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border-3 border-ink bg-white shadow-comic-sm",
        className
      )}
    >
      {/* Image area */}
      <div className="relative aspect-square w-full bg-surface">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-small text-ink/40">
            No image
          </div>
        )}

        {/* Badges */}
        {product.badges && product.badges.length > 0 && (
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {product.badges.map((badge) => (
              <Badge key={badge} label={badge} />
            ))}
          </div>
        )}

        {/* Wishlist toggle */}
        <button
          type="button"
          aria-label="Add to wishlist"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-white"
        >
          <Heart size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-h3 line-clamp-1">{product.name}</h3>

        <div className="flex items-center gap-1 text-small text-ink/70">
          <Star size={14} className="fill-primary text-ink" />
          <span>{product.rating.toFixed(1)}</span>
          <span>({product.reviewCount})</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-h3">{formatPrice(product.price, product.currency)}</span>
          {product.mrp && product.mrp > product.price && (
            <span className="text-small text-ink/40 line-through">
              {formatPrice(product.mrp, product.currency)}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={cn(
            "mt-2 inline-flex items-center justify-center gap-2 rounded-pill border-3 border-ink bg-ink px-4 py-2.5 text-body font-semibold text-primary transition-all",
            "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-comic-sm",
            "active:translate-x-0 active:translate-y-0",
            "disabled:opacity-50 disabled:pointer-events-none"
          )}
        >
          <ShoppingCart size={16} />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </motion.div>
  );
}
