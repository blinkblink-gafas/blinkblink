import Link from "next/link";
import type { ReactNode } from "react";
import BrandLogo from "@/components/ui/BrandLogo";
import { formatTranslation, useTranslation } from "@/lib/i18n";
import type { LocaleStrings } from "@/types/locales";

type FooterLinkKey = keyof LocaleStrings["footer"]["links"];

const shopLinks: Array<{ key: keyof LocaleStrings["categories"]; href: string }> = [
  { key: "sunglasses", href: "/category/sunglasses" },
  { key: "eyeglasses", href: "/category/eyeglasses" },
  { key: "sports", href: "/category/sports" },
  { key: "all", href: "/category/all" },
];

// Only pages that exist are linked. Add FAQ, shipping, contact, legal pages
// etc. here once they're written.
const helpLinks: Array<{ key: FooterLinkKey; href: string }> = [
  { key: "account", href: "/account" },
  { key: "wishlist", href: "/wishlist" },
  { key: "cart", href: "/cart" },
];

const companyLinks: Array<{ key: FooterLinkKey; href: string }> = [{ key: "about", href: "/about" }];

export default function Footer() {
  const t = useTranslation();

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-section gap-10 px-4 py-12 sm:grid-cols-2 md:px-8 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:px-12">
        <div>
          <Link href="/" aria-label={t.navbar.aria.home} className="inline-block">
            <BrandLogo size="lg" />
          </Link>
          <p className="mt-4 max-w-xs text-small text-white/70">{t.footer.tagline}</p>
        </div>

        <FooterColumn heading={t.footer.shopHeading}>
          {shopLinks.map(({ key, href }) => (
            <FooterLink key={key} href={href}>
              {t.categories[key]}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn heading={t.footer.helpHeading}>
          {helpLinks.map(({ key, href }) => (
            <FooterLink key={key} href={href}>
              {t.footer.links[key]}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn heading={t.footer.companyHeading}>
          {companyLinks.map(({ key, href }) => (
            <FooterLink key={key} href={href}>
              {t.footer.links[key]}
            </FooterLink>
          ))}
        </FooterColumn>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-section px-4 py-5 text-small text-white/60 md:px-8 lg:px-12">
          {formatTranslation(t.footer.copyright, { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <nav aria-label={heading}>
      <h2 className="text-small font-bold text-primary">{heading}</h2>
      <ul className="mt-4 flex flex-col gap-2.5">{children}</ul>
    </nav>
  );
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-small text-white/80 transition-colors hover:text-primary">
        {children}
      </Link>
    </li>
  );
}
