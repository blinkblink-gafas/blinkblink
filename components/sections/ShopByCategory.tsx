import CategoryCard from "@/components/ui/CategoryCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Section from "@/components/ui/Section";
import { getMockCategories } from "@/lib/mockData";
import { useTranslation } from "@/lib/i18n";

/** "Shop by collection" — Men, Women and Classic color tiles. Swipeable on phones. */
export default function ShopByCategory() {
  const t = useTranslation();
  const categories = getMockCategories(t);

  return (
    <Section aria-labelledby="shop-by-category-heading">
      <SectionHeading
        id="shop-by-category-heading"
        heading={t.shopByCategory.heading}
        viewAllHref="/category/all"
        viewAllLabel={t.shopByCategory.viewAll}
      />

      <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </Section>
  );
}
