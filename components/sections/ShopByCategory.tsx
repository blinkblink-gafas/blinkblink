import CategoryCard from "@/components/ui/CategoryCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Section from "@/components/ui/Section";
import { getMockCategories } from "@/lib/mockData";
import { useTranslation } from "@/lib/i18n";

export default function ShopByCategory() {
  const t = useTranslation();
  const categories = getMockCategories(t);

  return (
    <Section aria-labelledby="shop-by-category-heading" className="pb-6 md:pb-8 lg:pb-8">
      <SectionHeading
        id="shop-by-category-heading"
        heading={t.shopByCategory.heading}
        viewAllHref="/category/all"
        viewAllLabel={t.shopByCategory.viewAll}
      />

      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </Section>
  );
}
