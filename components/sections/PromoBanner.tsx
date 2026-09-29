import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Crown, Smile } from "lucide-react";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import { siteImages } from "@/lib/images";
import { useTranslation } from "@/lib/i18n";

/** "Wear Your Personality" — orange banner with a model photo, between the homepage sections. */
export default function PromoBanner() {
  const t = useTranslation();

  return (
    <Section className="py-6 md:py-8 lg:py-8">
      <div className="relative isolate grid overflow-hidden rounded-2xl bg-accent-orange md:grid-cols-2">
        <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[300px]">
          <Image
            src={siteImages.promo.url}
            alt={siteImages.promo.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover md:[clip-path:polygon(0_0,100%_0,82%_100%,0_100%)]"
          />
        </div>

        <div className="relative flex flex-col items-start justify-center gap-5 px-6 py-8 md:px-10">
          <Crown aria-hidden="true" className="absolute right-6 top-5 h-9 w-9 rotate-12 text-primary" strokeWidth={2.5} />
          <h2 className="text-[34px] font-black leading-[1.02] tracking-[-0.03em] text-white sm:text-5xl">
            {t.promo.heading.lineOne}
            <br />
            {t.promo.heading.lineTwo}
          </h2>
          <Button asChild variant="secondary" icon={<ArrowRight size={18} />} iconPosition="right">
            <Link href="/category/all">{t.promo.cta}</Link>
          </Button>
          <span aria-hidden="true" className="absolute bottom-5 right-6 grid h-14 w-14 place-items-center rounded-full bg-primary text-ink">
            <Smile size={36} strokeWidth={2.25} />
          </span>
        </div>
      </div>
    </Section>
  );
}
