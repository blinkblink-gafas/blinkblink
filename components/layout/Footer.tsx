import Link from "next/link";
import { formatTranslation, useTranslation } from "@/lib/i18n";
import type { LocaleStrings } from "@/types/locales";

const shopLinks: Array<{ key: keyof LocaleStrings["categories"]; href: string }> = [
  { key: "sunglasses", href: "/category/sunglasses" },
  { key: "eyeglasses", href: "/category/eyeglasses" },
  { key: "sports", href: "/category/sports" },
  { key: "all", href: "/category/all" },
];

const siteLinks: Array<{ key: keyof LocaleStrings["footer"]["links"]; href: string }> = [
  { key: "about", href: "/about" },
  { key: "wishlist", href: "/wishlist" },
  { key: "cart", href: "/cart" },
  { key: "account", href: "/account" },
];

export default function Footer() {
  const t = useTranslation();

  return (
    <footer className="border-t-3 border-ink bg-ink text-white">
      <div className="mx-auto grid max-w-section gap-10 px-4 py-12 md:grid-cols-[2fr_1fr_1fr] md:px-8 lg:px-12">
        <div>
          <p className="text-2xl font-bold tracking-[-0.08em] text-primary">{t.common.brandName}</p>
          <p className="mt-2 max-w-xs text-small text-white/70">{t.footer.tagline}</p>
        </div>

        <FooterColumn heading={t.footer.shopHeading}>
          {shopLinks.map(({ key, href }) => (
            <FooterLink key={key} href={href}>
              {t.categories[key]}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn heading={t.footer.helpHeading}>
          {siteLinks.map(({ key, href }) => (
            <FooterLink key={key} href={href}>
              {t.footer.links[key]}
            </FooterLink>
          ))}
        </FooterColumn>
      </div>

      <div className="border-t border-white/15">
        <p className="mx-auto max-w-section px-4 py-5 text-small text-white/60 md:px-8 lg:px-12">
          {formatTranslation(t.footer.copyright, { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <nav aria-label={heading}>
      <h2 className="text-small font-bold uppercase tracking-[0.2em] text-primary">{heading}</h2>
      <ul className="mt-4 flex flex-col gap-2">{children}</ul>
    </nav>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-body text-white/85 transition-colors hover:text-primary">
        {children}
      </Link>
    </li>
  );
}
