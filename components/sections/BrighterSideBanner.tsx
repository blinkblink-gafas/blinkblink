import Image from "next/image";
import Link from "next/link";
import { Smile, Sparkle, Sun } from "lucide-react";
import Section from "@/components/ui/Section";
import { siteImages } from "@/lib/images";
import { useTranslation } from "@/lib/i18n";

/** "See the Brighter Side" — yellow / pink / blue diagonal banner on the product page. */
export default function BrighterSideBanner() {
  const t = useTranslation();

  return (
    <Section className="py-6 md:py-8 lg:py-8">
      <Link
        href="/category/sunglasses"
        aria-label={t.brighterSide.cta}
        className="group relative isolate grid min-h-[220px] items-center overflow-hidden rounded-2xl bg-primary md:min-h-[280px] md:grid-cols-2"
      >
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-accent-pink [clip-path:polygon(38%_0,72%_0,52%_100%,18%_100%)]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-accent-blue [clip-path:polygon(72%_0,100%_0,100%_100%,52%_100%)]" />

        <p className="relative px-6 py-8 text-[40px] font-black italic uppercase leading-[0.95] tracking-[-0.03em] text-ink sm:text-6xl md:px-10">
          {t.brighterSide.heading.lineOne}
          <br />
          {t.brighterSide.heading.lineTwo}
          <br />
          {t.brighterSide.heading.lineThree}
        </p>

        <div aria-hidden="true" className="relative hidden h-full min-h-[240px] md:block">
          <span className="absolute left-[8%] top-[10%] grid h-20 w-20 place-items-center text-ink">
            <Sun className="absolute h-20 w-20" strokeWidth={1.75} />
            <Smile className="h-8 w-8" strokeWidth={2.5} />
          </span>
          <Sparkle className="absolute bottom-[14%] left-[14%] h-10 w-10 fill-primary text-ink" strokeWidth={2} />
          <Image
            src={siteImages.brighterSide.url}
            alt=""
            fill
            sizes="50vw"
            className="object-contain p-6 photo-cutout transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
    </Section>
  );
}
