import type { ReactNode } from "react";
import { Plus } from "lucide-react";
import { formatTranslation, useTranslation } from "@/lib/i18n";
import { storeConfig } from "@/lib/storeConfig";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/product";

/**
 * Description / Details / Shipping / Returns as expandable rows. Built on
 * native <details>, so it works with the keyboard and screen readers without
 * extra code. Description starts open.
 */
export default function ProductAccordion({ product }: { product: Product }) {
  const t = useTranslation();

  return (
    <div className="border-t border-ink/15">
      {product.description && (
        <Row title={t.productPage.sections.description} defaultOpen>
          <p>{product.description}</p>
        </Row>
      )}
      <Row title={t.productPage.sections.details}>
        <ul className="list-disc space-y-1 pl-5">
          {product.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </Row>
      <Row title={t.productPage.sections.shipping}>
        <p>{formatTranslation(t.productPage.shippingText, { amount: formatPrice(storeConfig.freeShippingThreshold) })}</p>
      </Row>
      <Row title={t.productPage.sections.returns}>
        <p>{formatTranslation(t.productPage.returnsText, { days: storeConfig.returnDays })}</p>
      </Row>
    </div>
  );
}

function Row({ title, defaultOpen = false, children }: { title: string; defaultOpen?: boolean; children: ReactNode }) {
  return (
    <details open={defaultOpen} className="group border-b border-ink/15">
      <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-xs font-semibold uppercase tracking-[0.08em] text-ink [&::-webkit-details-marker]:hidden">
        {title}
        <Plus size={18} strokeWidth={1.75} aria-hidden="true" className="transition-transform group-open:rotate-45" />
      </summary>
      <div className="pb-5 text-small text-text-secondary">{children}</div>
    </details>
  );
}
