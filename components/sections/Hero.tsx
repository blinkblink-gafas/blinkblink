import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Crown, Sparkles, Star, Sun, Truck } from "lucide-react";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import { useTranslation } from "@/lib/i18n";
import type { LocaleStrings } from "@/types/locales";

export interface HeroProps {
  heading?: LocaleStrings["hero"]["heading"];
}

const trustBadges: Array<{ key: keyof LocaleStrings["trustBadges"]; icon: typeof Sparkles }> = [
  { key: "trendyDesigns", icon: Sparkles },
  { key: "uvProtection", icon: Sun },
  { key: "premiumQuality", icon: Star },
  { key: "fastDelivery", icon: Truck },
];

interface SunglassesArtProps {
  alt: string;
}

function SunglassesArt({ alt }: SunglassesArtProps) {
  return (
    <svg viewBox="0 0 640 430" role="img" aria-label={alt} className="h-auto w-full drop-shadow-[10px_12px_0_rgba(21,19,17,0.2)]">
      <path d="M84 198c-30-26-53-38-75-43l13-30c44 6 86 28 121 59" fill="#151311" />
      <path d="M496 184c42-44 83-64 125-64l-1 34c-34 3-65 19-98 54" fill="#151311" />
      <path d="M133 151c65-34 151-39 208 7l-30 125c-60 32-139 26-182-14z" fill="#151311" stroke="#151311" strokeWidth="12" />
      <path d="M172 177c41-19 89-20 123 6l-20 77c-42 18-91 13-120-12z" fill="#06abe9" />
      <path d="M309 174c68-53 164-43 213-7l-8 115c-52 44-149 49-202 7z" fill="#151311" stroke="#151311" strokeWidth="12" />
      <path d="M349 190c47-32 105-27 131-6l-4 77c-41 25-97 28-132 4z" fill="#f7e420" />
      <path d="M298 195c17-15 38-17 54-5l-8 28c-14-8-28-8-43 2z" fill="#151311" />
      <path d="M193 186l70 73" stroke="white" strokeLinecap="round" strokeOpacity=".65" strokeWidth="14" />
      <path d="M375 197l74 62" stroke="white" strokeLinecap="round" strokeOpacity=".65" strokeWidth="14" />
    </svg>
  );
}

export default function Hero({ heading: headingOverride }: HeroProps) {
  const reduceMotion = useReducedMotion();
  const t = useTranslation();
  const heading = headingOverride ?? t.hero.heading;
  const enter = (delay: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduceMotion ? 0 : 0.55, delay },
  });

  return (
    <Section contained={false} className="overflow-hidden bg-primary py-0">
      <div className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="absolute inset-y-0 right-0 w-[53%] bg-secondary [clip-path:polygon(28%_0,100%_0,100%_100%,0_100%)]" />
        <Star aria-hidden="true" className="absolute right-[11%] top-14 h-5 w-5 fill-black text-black opacity-35" />
        <Sparkles aria-hidden="true" className="absolute bottom-28 right-[33%] h-7 w-7 text-black opacity-30" />
        <span aria-hidden="true" className="absolute right-[7%] top-[42%] rotate-12 text-4xl font-bold text-black opacity-25">ϟ</span>

        <div className="relative mx-auto grid min-h-[590px] max-w-section grid-cols-1 items-center gap-3 px-4 pb-12 pt-16 md:min-h-[620px] md:grid-cols-[1.05fr_.95fr] md:px-8 md:py-16 lg:min-h-[670px] lg:px-12">
          <motion.div {...enter(0)} className="relative z-10 max-w-xl">
            <motion.div {...enter(0.08)} className="mb-5 inline-flex items-center gap-2 rounded-pill border-2 border-black bg-black px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-primary">
              <Crown size={15} fill="currentColor" /> {t.hero.eyebrow}
            </motion.div>
            <motion.h1 {...enter(0.16)} className="max-w-[620px] text-[32px] font-bold leading-10 tracking-[-0.055em] text-black sm:text-[44px] sm:leading-[1.08] lg:text-h1">
              {heading.before} <span className="relative whitespace-nowrap text-secondary">{heading.emphasis}<span aria-hidden="true" className="absolute -bottom-2 left-0 h-1.5 w-full -rotate-2 rounded-full bg-black" /></span>{heading.after}
            </motion.h1>
            <motion.p {...enter(0.24)} className="mt-6 max-w-sm text-body text-text-secondary">{t.hero.subtext}</motion.p>
            <motion.div {...enter(0.32)} className="mt-8">
              <Button asChild size="md" icon={<ArrowRight size={18} />} iconPosition="right">
                <Link href="/category/sunglasses">{t.hero.cta}</Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div {...enter(0.18)} className="relative z-10 mx-auto w-full max-w-[570px] self-end md:self-center">
            <SunglassesArt alt={t.hero.imageAlt} />
            <div className="absolute bottom-2 left-4 -rotate-6 border-2 border-black bg-white px-4 py-2 text-sm font-bold leading-tight shadow-comic-sm sm:text-base">{t.hero.sticker.lineOne}<br />{t.hero.sticker.lineTwo}</div>
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduceMotion ? 0 : 0.45, delay: 0.42 }} className="border-t-2 border-black bg-white">
        <div className="mx-auto grid max-w-section grid-cols-2 divide-x-0 divide-black sm:grid-cols-4 sm:divide-x">
          {trustBadges.map(({ key, icon: Icon }, index) => (
            <motion.div key={key} initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.35, delay: 0.48 + index * 0.08 }} className="flex items-center justify-center gap-2 border-b border-black px-3 py-4 text-center text-xs font-semibold sm:border-b-0 sm:py-5 sm:text-sm">
              <Icon size={18} className="shrink-0 text-secondary" strokeWidth={2.5} /> {t.trustBadges[key]}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
