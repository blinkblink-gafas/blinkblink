import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/types/category";
import { siteImages } from "@/lib/images";
import { cn } from "@/lib/utils";

export interface CategoryCardProps {
  category: Category;
  className?: string;
}

const backgroundClasses = {
  primary: "bg-primary",
  secondary: "bg-accent-pink",
  accentBlue: "bg-accent-blue",
} as const;

/** Colored image block with the category photo, then name, tagline and an arrow. */
export default function CategoryCard({ category, className }: CategoryCardProps) {
  const image = siteImages.categories[category.image];

  return (
    <article
      className={cn(
        "group relative w-[78vw] shrink-0 snap-start overflow-hidden rounded-2xl bg-white ring-1 ring-ink/10 transition-shadow hover:shadow-lg hover:shadow-ink/10 sm:w-auto",
        className
      )}
    >
      <Link href={`/category/${category.slug}`} className="absolute inset-0 z-10" aria-label={category.name} />

      <div className={cn("relative aspect-[16/10] overflow-hidden", backgroundClasses[category.bgColor])}>
        <Image
          src={image.url}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 80vw"
          className="object-contain p-4 photo-cutout transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex items-center justify-between gap-3 px-4 py-4">
        <div>
          <h3 className="text-body font-bold text-text-primary">{category.name}</h3>
          <p className="text-small text-text-secondary">{category.description}</p>
        </div>
        <ArrowRight aria-hidden="true" size={20} className="shrink-0 text-ink transition-transform group-hover:translate-x-1" />
      </div>
    </article>
  );
}
