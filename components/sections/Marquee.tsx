import { Sparkle } from "lucide-react";
import { formatTranslation, useTranslation } from "@/lib/i18n";
import { storeConfig } from "@/lib/storeConfig";
import { formatPrice } from "@/lib/utils";

/**
 * Black strip of selling points scrolling sideways under the hero. The list
 * is rendered twice so the loop is seamless; the copy is hidden from screen
 * readers, which read the single list instead. Stops under reduced motion.
 */
export default function Marquee() {
  const t = useTranslation();
  const items = t.marquee.map((item) =>
    formatTranslation(item, { amount: formatPrice(storeConfig.freeShippingThreshold), days: storeConfig.returnDays })
  );
  // Enough copies to fill wide screens before the loop repeats.
  const row = [...items, ...items, ...items];

  return (
    <section className="overflow-hidden bg-ink py-3 text-white">
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div aria-hidden="true" className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {row.map((item, index) => (
              <span key={`${copy}-${index}`} className="flex items-center gap-6 pr-6 font-display text-lg font-bold uppercase tracking-[0.02em]">
                {item}
                <Sparkle size={14} className="fill-primary text-primary" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
