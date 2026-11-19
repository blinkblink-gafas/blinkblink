import Image from "next/image";
import { siteImages } from "@/lib/images";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export interface EditorialTileProps {
  className?: string;
}

/**
 * Decorative lifestyle block placed inside the product grid on listing pages
 * — breaks up the rows of cards. Not a link: it only sets the mood.
 */
export default function EditorialTile({ className }: EditorialTileProps) {
  const t = useTranslation();

  return (
    <div className={cn("relative isolate flex min-h-[320px] items-end overflow-hidden bg-primary p-5 md:p-6", className)}>
      <Image
        src={siteImages.editorial.url}
        alt={siteImages.editorial.alt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="-z-10 object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/60 to-transparent" />
      <p className="font-display text-[44px] font-extrabold uppercase leading-[0.88] text-white md:text-[56px]">
        {t.editorial.lineOne}
        <br />
        <em className="italic text-primary">{t.editorial.lineTwo}</em>
      </p>
    </div>
  );
}
