import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { AccentHeading } from "@/types/locales";
import type { Product } from "@/types/product";

export interface ProductCarouselProps {
  products: Product[];
  heading: string | AccentHeading;
  id: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  className?: string;
}

/**
 * A horizontal row of product cards with back / forward arrows — the
 * homepage "Best-sellers" and "New in" rows and the product page's "You may
 * also like". Swipes on touch screens; the arrows scroll one view at a time.
 */
export default function ProductCarousel({ products, heading, id, viewAllHref, viewAllLabel, className }: ProductCarouselProps) {
  const t = useTranslation();
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState({ back: false, forward: false });

  const updateArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanScroll({
      back: track.scrollLeft > 4,
      forward: track.scrollLeft + track.clientWidth < track.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [updateArrows, products]);

  const scrollByView = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.9, behavior: "smooth" });
  };

  if (products.length === 0) return null;

  const arrow = "grid h-10 w-10 place-items-center text-ink transition-opacity disabled:opacity-25";

  return (
    <Section aria-labelledby={id} className={className}>
      <SectionHeading
        id={id}
        heading={heading}
        viewAllHref={viewAllHref}
        viewAllLabel={viewAllLabel}
        actions={
          <div className="hidden items-center sm:flex">
            <button type="button" aria-label={t.carousel.previous} onClick={() => scrollByView(-1)} disabled={!canScroll.back} className={arrow}>
              <ChevronLeft size={22} strokeWidth={1.75} />
            </button>
            <button type="button" aria-label={t.carousel.next} onClick={() => scrollByView(1)} disabled={!canScroll.forward} className={arrow}>
              <ChevronRight size={22} strokeWidth={1.75} />
            </button>
          </div>
        }
      />

      <div
        ref={trackRef}
        onScroll={updateArrows}
        className={cn(
          "-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-1 sm:gap-4 md:-mx-8 md:scroll-px-8 md:px-8 lg:mx-0 lg:scroll-px-0 lg:px-0",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        )}
      >
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            priority={index < 4}
            className="w-[70%] shrink-0 snap-start sm:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-3rem)/4)]"
          />
        ))}
      </div>
    </Section>
  );
}
