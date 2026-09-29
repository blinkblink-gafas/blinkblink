import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectIsWishlisted, toggleWishlist } from "@/store/slices/wishlistSlice";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

export interface WishlistButtonProps {
  productId: Product["id"];
  className?: string;
  size?: number;
}

/** Heart toggle wired to `wishlistSlice`; saved across visits by store/persistence.ts. */
export default function WishlistButton({ productId, className, size = 16 }: WishlistButtonProps) {
  const dispatch = useAppDispatch();
  const isWishlisted = useAppSelector(selectIsWishlisted(productId));
  const t = useTranslation();

  return (
    <motion.button
      type="button"
      aria-label={isWishlisted ? t.common.removeFromWishlist : t.common.addToWishlist}
      aria-pressed={isWishlisted}
      onClick={() => dispatch(toggleWishlist(productId))}
      animate={{ scale: isWishlisted ? [1, 1.2, 0.96, 1] : 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-ink/10",
        isWishlisted ? "text-accent-pink" : "text-ink",
        className
      )}
    >
      <Heart size={size} fill={isWishlisted ? "currentColor" : "none"} />
    </motion.button>
  );
}
