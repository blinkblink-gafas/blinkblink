import Image from "next/image";
import Link from "next/link";
import Section from "@/components/ui/Section";
import { siteImages } from "@/lib/images";
import { useTranslation } from "@/lib/i18n";

/** "Wear your personality" — photo beside an orange block with a big headline and one link. */
export default function PromoBanner() {
  const t = useTranslation();

  return (
    <Section>
      <div className="grid md:grid-cols-2">
        <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[440px]">
          <Image
            src={siteImages.promo.url}
            alt={siteImages.promo.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col items-start justify-end gap-6 bg-accent-orange px-6 py-10 text-white md:px-10 md:py-12">
          <h2 className="font-display text-[56px] font-extrabold uppercase leading-[0.86] sm:text-[80px]">
            {t.promo.heading.lineOne}
            <br />
            <em className="italic text-ink">{t.promo.heading.lineTwo}</em>
          </h2>
          <Link
            href="/category/all"
            className="border-b-2 border-white pb-0.5 text-small font-semibold uppercase tracking-[0.08em] transition-colors hover:border-ink hover:text-ink"
          >
            {t.promo.cta}
          </Link>
        </div>
      </div>
    </Section>
  );
}
