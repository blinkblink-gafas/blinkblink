import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CategoryCard from "@/components/ui/CategoryCard";
import Section from "@/components/ui/Section";
import { getMockCategories } from "@/lib/mockData";
import { useTranslation } from "@/lib/i18n";

export default function ShopByCategory() {
  const t = useTranslation();
  const categories = getMockCategories(t);

  return (
    <Section className="bg-background py-14 md:py-16 lg:py-20" aria-labelledby="shop-by-category-heading">
      <div className="mb-8 flex items-end justify-between gap-4 md:mb-10">
        <h2 id="shop-by-category-heading" className="text-h3 font-bold text-text-primary sm:text-h2">
          {t.shopByCategory.heading}
        </h2>
        <Link href="/category/all" className="inline-flex shrink-0 items-center gap-1 text-small text-secondary transition-colors hover:underline hover:underline-offset-4 focus-visible:rounded-sm">
          {t.shopByCategory.viewAll} <ArrowRight size={16} strokeWidth={2.25} />
        </Link>
      </div>

      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
        {categories.map((category, index) => (
          <CategoryCard key={category.id} category={category} index={index} />
        ))}
      </div>
    </Section>
  );
}
