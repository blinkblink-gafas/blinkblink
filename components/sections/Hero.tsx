import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { siteImages } from "@/lib/images";
import { useTranslation } from "@/lib/i18n";

/**
 * Full-width lifestyle photo with a big condensed headline and a "Shop now"
 * link in the bottom-left corner. The photo keeps its subject on the right so
 * the text never covers the frames.
 */
export default function Hero() {
  const reduceMotion = useReducedMotion();
  const t = useTranslation();

  return (
    <section className="relative isolate h-[72vh] min-h-[440px] max-h-[760px] w-full overflow-hidden bg-ink">
      <Image
        src={siteImages.hero.url}
        alt={siteImages.hero.alt}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-[85%_25%]"
      />
      {/* Darkens the bottom-left corner just enough for white text. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-tr from-ink/70 via-ink/20 to-transparent" />

      <div className="mx-auto flex h-full max-w-section items-end px-4 pb-10 md:px-8 md:pb-14 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.5 }}
          className="text-white"
        >
          <h1 className="font-display text-[56px] font-extrabold uppercase leading-[0.86] tracking-[-0.01em] sm:text-[80px] lg:text-[104px]">
            {t.hero.heading.lineOne}
            <br />
            <em className="italic text-primary">{t.hero.heading.lineTwo}</em>
          </h1>
          <p className="mt-3 text-small font-semibold sm:text-body">{t.hero.subtext}</p>
          <Link
            href="/category/all"
            className="mt-5 inline-block border-b-2 border-white pb-0.5 text-small font-semibold uppercase tracking-[0.08em] transition-colors hover:border-primary hover:text-primary"
          >
            {t.hero.cta}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
