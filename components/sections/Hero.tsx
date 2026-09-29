import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Crown, Gem, ShieldCheck, Sparkles, Sun, Truck, Zap } from "lucide-react";
import Button from "@/components/ui/Button";
import { siteImages } from "@/lib/images";
import { formatTranslation, useTranslation } from "@/lib/i18n";
import { storeConfig } from "@/lib/storeConfig";
import { formatPrice } from "@/lib/utils";
import type { LocaleStrings } from "@/types/locales";

const trustBadges: Array<{ key: keyof LocaleStrings["trustBadges"]; icon: typeof Sparkles }> = [
  { key: "trendyDesigns", icon: Gem },
  { key: "uvProtection", icon: Sun },
  { key: "premiumQuality", icon: ShieldCheck },
  { key: "freeDelivery", icon: Truck },
];

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const t = useTranslation();
  const enter = (delay: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduceMotion ? 0 : 0.5, delay },
  });

  return (
    <section>
      <div className="relative isolate overflow-hidden bg-primary">
        {/* Color blocks */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-accent-pink [clip-path:polygon(58%_100%,100%_22%,100%_100%)]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-accent-blue [clip-path:polygon(84%_0,100%_0,100%_22%)]" />

        <div className="mx-auto grid min-h-[460px] max-w-section items-center gap-6 px-4 pb-10 pt-12 md:min-h-[520px] md:grid-cols-[1fr_1.1fr] md:px-8 md:py-12 lg:px-12">
          <motion.div {...enter(0)} className="relative z-10">
            <h1 className="text-[40px] font-black leading-[1.02] tracking-[-0.04em] text-ink sm:text-[56px] lg:text-[68px]">
              {t.hero.heading.lineOne}
              <br />
              {t.hero.heading.lineTwo}
            </h1>
            <p className="mt-4 text-body font-semibold text-ink sm:text-lg">{t.hero.subtext}</p>
            <Button asChild className="mt-7" icon={<ArrowRight size={18} />} iconPosition="right">
              <Link href="/category/sunglasses">{t.hero.cta}</Link>
            </Button>
          </motion.div>

          <motion.div {...enter(0.15)} className="relative mx-auto aspect-[4/3] w-full max-w-[560px]">
            {/* White-background product shots blend into the color blocks via multiply. */}
            <Image
              src={siteImages.hero.url}
              alt={siteImages.hero.alt}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="scale-125 object-contain photo-cutout"
            />
            <Crown aria-hidden="true" className="absolute right-[18%] top-0 h-10 w-10 -rotate-12 text-ink" strokeWidth={2.5} />
            <Zap aria-hidden="true" className="absolute bottom-[8%] left-[6%] h-12 w-12 rotate-12 text-ink" strokeWidth={2.5} />
            <p
              aria-hidden="true"
              className="absolute bottom-[4%] right-[2%] rotate-[-8deg] text-right text-xl font-black uppercase italic leading-none text-ink sm:text-2xl"
            >
              {t.hero.sticker.lineOne}
              <br />
              {t.hero.sticker.lineTwo}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="border-b border-ink/10 bg-white">
        <ul className="mx-auto grid max-w-section grid-cols-2 gap-y-5 px-4 py-6 md:grid-cols-4 md:px-8 lg:px-12">
          {trustBadges.map(({ key, icon: Icon }) => (
            <li key={key} className="flex items-center gap-3">
              <Icon aria-hidden="true" size={26} strokeWidth={1.75} className="shrink-0 text-ink" />
              <div>
                <p className="text-small font-bold text-text-primary">{t.trustBadges[key].title}</p>
                <p className="text-xs text-text-secondary">
                  {formatTranslation(t.trustBadges[key].subtitle, {
                    amount: formatPrice(storeConfig.freeShippingThreshold),
                  })}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
