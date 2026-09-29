import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { removeFromCart, updateQuantity } from "@/store/slices/cartSlice";
import { formatTranslation, useTranslation } from "@/lib/i18n";
import { cn, formatPrice } from "@/lib/utils";
import type { CartItem } from "@/types/cart";

export interface CartLineItemProps {
  item: CartItem;
  /** Tighter layout for the cart drawer; the full /cart page uses the roomier default. */
  compact?: boolean;
}

/**
 * One cart row: thumbnail, name, color, quantity stepper, line total and a
 * remove button. Shared by the cart drawer and the /cart page so both stay
 * in sync.
 */
export default function CartLineItem({ item, compact = false }: CartLineItemProps) {
  const dispatch = useAppDispatch();
  const t = useTranslation();
  const key = { productId: item.productId, color: item.color };
  const nameValues = { name: item.name };

  return (
    <li className="flex gap-4 py-4">
      <div
        className={cn(
          "relative shrink-0 overflow-hidden rounded-xl bg-surface",
          compact ? "h-20 w-20" : "h-24 w-24 sm:h-28 sm:w-28"
        )}
      >
        {item.image && <Image src={item.image} alt="" fill className="object-cover" sizes="112px" />}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate font-semibold text-text-primary">{item.name}</p>
            {item.color && (
              <p className="text-small text-text-secondary">
                {formatTranslation(t.cart.colorLabel, { color: item.color })}
              </p>
            )}
          </div>
          <p className="shrink-0 font-semibold">{formatPrice(item.price * item.quantity)}</p>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="inline-flex items-center gap-3 rounded-pill px-3 py-1 ring-1 ring-inset ring-ink/15">
            <button
              type="button"
              aria-label={formatTranslation(t.cart.decreaseItem, nameValues)}
              disabled={item.quantity <= 1}
              onClick={() => dispatch(updateQuantity({ ...key, quantity: item.quantity - 1 }))}
              className="disabled:opacity-40"
            >
              <Minus size={14} />
            </button>
            <span className="w-4 text-center text-small font-semibold" aria-live="polite">
              {item.quantity}
            </span>
            <button
              type="button"
              aria-label={formatTranslation(t.cart.increaseItem, nameValues)}
              onClick={() => dispatch(updateQuantity({ ...key, quantity: item.quantity + 1 }))}
            >
              <Plus size={14} />
            </button>
          </div>

          <button
            type="button"
            aria-label={formatTranslation(t.cart.removeItem, nameValues)}
            onClick={() => dispatch(removeFromCart(key))}
            className="inline-flex items-center gap-1 text-small text-text-secondary transition-colors hover:text-accent-pink"
          >
            <Trash2 size={16} />
            {!compact && <span>{t.common.remove}</span>}
          </button>
        </div>
      </div>
    </li>
  );
}
