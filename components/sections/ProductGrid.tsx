import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import Section from "@/components/ui/Section";
import type { Product } from "@/types/product";

export interface ProductGridProps {
  products: Product[];
  heading?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  emptyMessage?: string;
  className?: string;
}

/**
 * Reusable product grid: the homepage's "Trending" strip and every category
 * page render through this, so a `ProductCard` only has one grid layout to
 * live in. Renders an `emptyMessage` instead of a blank section when
 * `products` is empty (e.g. a category with nothing in stock yet).
 */
export default function ProductGrid({
  products,
  heading,
  viewAllHref,
  viewAllLabel,
  emptyMessage,
  className,
}: ProductGridProps) {
  return (
    <Section className={className}>
      {(heading || (viewAllHref && viewAllLabel)) && (
        <div className="mb-8 flex items-end justify-between gap-4 md:mb-10">
          {heading && (
            <h2 className="text-h3 font-bold text-text-primary sm:text-h2">{heading}</h2>
          )}
          {viewAllHref && viewAllLabel && (
            <Link
              href={viewAllHref}
              className="inline-flex shrink-0 items-center gap-1 text-small text-secondary transition-colors hover:underline hover:underline-offset-4 focus-visible:rounded-sm"
            >
              {viewAllLabel} <ArrowRight size={16} strokeWidth={2.25} />
            </Link>
          )}
        </div>
      )}

      {products.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        emptyMessage && (
          <p className="text-body text-text-secondary">{emptyMessage}</p>
        )
      )}
    </Section>
  );
}
