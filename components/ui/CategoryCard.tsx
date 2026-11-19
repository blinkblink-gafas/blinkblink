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
  primary: "bg-primary text-ink",
  secondary: "bg-accent-pink text-white",
  accentBlue: "bg-accent-blue text-white",
} as const;

/** Tall color block with a cut-out frame photo and the collection name in the bottom-left corner. */
export default function CategoryCard({ category, className }: CategoryCardProps) {
  const image = siteImages.categories[category.image];

  return (
    <Link
      href={`/category/${category.slug}`}
      className={cn(
        "group relative flex aspect-[4/5] w-[78vw] shrink-0 snap-start flex-col justify-end overflow-hidden p-5 sm:w-auto md:p-6",
        backgroundClasses[category.bgColor],
        className
      )}
    >
      <div className="absolute inset-x-0 top-[12%] h-[52%]">
        <Image
          src={image.url}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 80vw"
          className="object-contain px-6 photo-cutout transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="relative flex items-end justify-between gap-3">
        <div>
          <h3 className="font-display text-[44px] font-extrabold uppercase leading-[0.9] md:text-[52px]">{category.name}</h3>
          <p className="mt-1 text-small font-semibold">{category.description}</p>
        </div>
        <ArrowRight aria-hidden="true" size={26} strokeWidth={2} className="mb-1 shrink-0 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
