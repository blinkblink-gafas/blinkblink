import { Truck } from "lucide-react";
import { formatTranslation, useTranslation } from "@/lib/i18n";
import { storeConfig } from "@/lib/storeConfig";
import { formatPrice } from "@/lib/utils";

/** "You're €8 away from free delivery" with a progress bar, at the top of the cart drawer. */
export default function FreeShippingProgress({ subtotal }: { subtotal: number }) {
  const t = useTranslation();
  const threshold = storeConfig.freeShippingThreshold;
  const remaining = Math.max(0, threshold - subtotal);
  const progress = Math.min(100, (subtotal / threshold) * 100);

  return (
    <div className="mx-5 mt-4 rounded-xl bg-surface p-3">
      <p className="flex items-center gap-2 text-small font-semibold text-text-primary">
        <Truck size={16} aria-hidden="true" className="shrink-0" />
        {remaining > 0
          ? formatTranslation(t.cart.freeShippingProgress, { amount: formatPrice(remaining) })
          : t.cart.freeShippingUnlocked}
      </p>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        aria-label={t.cart.freeShippingUnlocked}
        className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/10"
      >
        <div className="h-full rounded-full bg-accent-pink transition-[width] duration-300" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
