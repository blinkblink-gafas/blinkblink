import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { Category } from "@/types/category";
import { cn } from "@/lib/utils";
import { formatTranslation, useTranslation } from "@/lib/i18n";

export interface CategoryCardProps {
  category: Category;
  index?: number;
  className?: string;
  onWishlistChange?: (categoryId: string, isWishlisted: boolean) => void;
}

const backgroundClasses = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accentBlue: "bg-accent-blue",
} as const;

function CategoryEyewear({ image }: Pick<Category, "image">) {
  const frames = {
    sunglasses: {
      frame: "M97 168c58-45 151-47 207 2l-25 126c-56 32-143 27-184-10zm213 5c63-52 157-42 211 4l-8 116c-56 42-148 45-200 5z",
      leftLens: "M142 193c42-21 91-20 124 9l-17 69c-44 19-92 14-120-11z",
      rightLens: "M351 194c44-28 101-23 128 4l-5 73c-42 25-97 27-130 2z",
      lens: "#151311",
    },
    eyeglasses: {
      frame: "M105 166c54-42 142-42 193 3l-17 119c-55 35-145 31-187-9zm218 3c55-47 144-45 197-3l-5 116c-50 42-142 48-190 10z",
      leftLens: "M145 190c35-18 84-18 113 7l-10 65c-40 17-85 14-109-10z",
      rightLens: "M355 191c38-20 86-18 117 5l-3 67c-36 21-83 23-112 2z",
      lens: "#ffffff",
    },
    sports: {
      frame: "M77 172c71-40 151-42 218 6l-20 125c-69 30-155 22-197-19zm245 7c62-50 152-53 222-7l-6 113c-67 45-157 49-211 11z",
      leftLens: "M120 193c51-22 101-17 132 13l-14 68c-46 17-96 13-124-11z",
      rightLens: "M366 199c47-25 104-19 133 10l-3 66c-43 24-98 27-128 4z",
      lens: "#f7e420",
    },
  }[image];

  return (
    <svg aria-hidden="true" viewBox="0 0 620 390" className="h-full w-full drop-shadow-[8px_10px_0_rgba(21,19,17,0.2)]">
      <path d="M4 169c42 4 78 27 111 60M507 227c37-51 72-72 109-74" fill="none" stroke="#151311" strokeWidth="25" strokeLinecap="round" />
      <path d={frames.frame} fill="#151311" fillRule="evenodd" />
      <path d={frames.leftLens} fill={frames.lens} />
      <path d={frames.rightLens} fill={frames.lens} />
      <path d="M281 194c17-13 35-14 51-2l-7 26c-13-7-25-7-39 2z" fill="#151311" />
      <path d="M167 196l63 67M388 200l66 61" fill="none" stroke="white" strokeLinecap="round" strokeOpacity=".55" strokeWidth="13" />
    </svg>
  );
}

export default function CategoryCard({
  category,
  index = 0,
  className,
  onWishlistChange,
}: CategoryCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const reduceMotion = useReducedMotion();
  const t = useTranslation();
  const wishlistLabel = formatTranslation(
    isWishlisted ? t.shopByCategory.wishlist.remove : t.shopByCategory.wishlist.add,
    { category: category.name }
  );

  const toggleWishlist = () => {
    const nextValue = !isWishlisted;
    setIsWishlisted(nextValue);
    onWishlistChange?.(category.id, nextValue);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: reduceMotion ? 0 : 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : index * 0.1 }}
      whileHover={reduceMotion ? undefined : { y: -5 }}
      className={cn(
        "group relative flex aspect-[4/5] w-[82vw] shrink-0 snap-start flex-col overflow-hidden rounded-[28px] border-3 border-black shadow-comic-sm transition-shadow hover:shadow-comic-lg md:w-auto",
        backgroundClasses[category.bgColor],
        className
      )}
    >
      <Link href={`/category/${category.slug}`} aria-label={category.name} className="absolute inset-0 z-10 rounded-[25px]" />

      <motion.button
        type="button"
        aria-label={wishlistLabel}
        aria-pressed={isWishlisted}
        onClick={toggleWishlist}
        animate={{ scale: isWishlisted ? [1, 1.2, 0.96, 1] : 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.28 }}
        className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border-2 border-black bg-white text-black transition-transform hover:scale-105 focus-visible:outline-offset-4"
      >
        <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={2.25} />
      </motion.button>

      <div className="pointer-events-none relative z-0 -mt-9 h-[61%] w-full px-3 transition-transform duration-300 ease-out group-hover:scale-105">
        <CategoryEyewear image={category.image} />
      </div>
      <div className="pointer-events-none relative z-0 mt-auto px-5 pb-6">
        <h3 className="text-h3 text-black">{category.name}</h3>
        <div className="mt-1 flex items-center gap-2 text-small text-text-secondary">
          <span>{category.description}</span>
          <ArrowRight aria-hidden="true" size={17} className="shrink-0 text-black" strokeWidth={2.5} />
        </div>
      </div>
    </motion.article>
  );
}
