import ProductCard from "@/components/ui/ProductCard";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

export interface ProductGridProps {
  products: Product[];
  heading?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  /** Column count at the widest breakpoint — 4 on the homepage, 3 beside a filter sidebar. */
  columns?: 3 | 4;
  /** Render without the Section wrapper (e.g. inside the category page's own layout). */
  bare?: boolean;
  className?: string;
}

/**
 * Responsive `ProductCard` grid, optionally with a heading and "View All"
 * link. Used by the homepage, category, search, wishlist and related-products
 * sections.
 */
export default function ProductGrid({
  products,
  heading,
  viewAllHref,
  viewAllLabel,
  columns = 4,
  bare = false,
  className,
}: ProductGridProps) {
  const grid = (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 sm:gap-5",
        columns === 4 ? "md:grid-cols-3 lg:grid-cols-4" : "md:grid-cols-3",
        bare && className
      )}
    >
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index < 4} />
      ))}
    </div>
  );

  if (bare) return grid;

  return (
    <Section className={className}>
      {heading && <SectionHeading heading={heading} viewAllHref={viewAllHref} viewAllLabel={viewAllLabel} />}
      {grid}
    </Section>
  );
}
