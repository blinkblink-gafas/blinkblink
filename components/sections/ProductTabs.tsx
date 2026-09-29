import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Check } from "lucide-react";
import { formatTranslation, useTranslation } from "@/lib/i18n";
import { storeConfig } from "@/lib/storeConfig";
import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "@/types/product";

type TabKey = "details" | "shipping" | "returns";
const TABS: TabKey[] = ["details", "shipping", "returns"];

/** Details / Shipping / Returns tabs under the product gallery (WAI-ARIA tabs pattern). */
export default function ProductTabs({ product }: { product: Product }) {
  const t = useTranslation();
  const baseId = useId();
  const [active, setActive] = useState<TabKey>("details");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const delta = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (index + delta + TABS.length) % TABS.length;
    setActive(TABS[next]!);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="mt-8">
      <div role="tablist" aria-label={product.name} className="flex gap-6 border-b border-ink/10">
        {TABS.map((tab, index) => (
          <button
            key={tab}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            id={`${baseId}-tab-${tab}`}
            role="tab"
            type="button"
            aria-selected={active === tab}
            aria-controls={`${baseId}-panel-${tab}`}
            tabIndex={active === tab ? 0 : -1}
            onClick={() => setActive(tab)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={cn(
              "-mb-px border-b-2 pb-3 text-small font-semibold transition-colors",
              active === tab ? "border-ink text-text-primary" : "border-transparent text-text-secondary hover:text-text-primary"
            )}
          >
            {t.productPage.tabs[tab]}
          </button>
        ))}
      </div>

      <div
        id={`${baseId}-panel-${active}`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        tabIndex={0}
        className="pt-4 text-small text-text-secondary"
      >
        {active === "details" && (
          <ul className="flex flex-col gap-2">
            {product.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-text-primary">
                <Check size={16} aria-hidden="true" className="shrink-0 text-accent-pink" />
                {feature}
              </li>
            ))}
          </ul>
        )}
        {active === "shipping" && (
          <p>{formatTranslation(t.productPage.shippingText, { amount: formatPrice(storeConfig.freeShippingThreshold) })}</p>
        )}
        {active === "returns" && (
          <p>{formatTranslation(t.productPage.returnsText, { days: storeConfig.returnDays })}</p>
        )}
      </div>
    </div>
  );
}
