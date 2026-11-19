import Link from "next/link";
import { useRouter } from "next/router";
import { Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openCart, selectCartTotalItems } from "@/store/slices/cartSlice";
import { selectWishlistCount } from "@/store/slices/wishlistSlice";
import BrandLogo from "@/components/ui/BrandLogo";
import { formatTranslation, useTranslation } from "@/lib/i18n";
import { storeConfig } from "@/lib/storeConfig";
import { cn, formatPrice } from "@/lib/utils";
import type { LocaleStrings } from "@/types/locales";

export interface NavbarProps {
  cartCount?: number;
}

const navigation: Array<{ key: keyof LocaleStrings["navbar"]["links"]; href: string }> = [
  { key: "men", href: "/category/men" },
  { key: "women", href: "/category/women" },
  { key: "classic", href: "/category/classic" },
  { key: "shopAll", href: "/category/all" },
  { key: "about", href: "/about" },
];

/**
 * Site header: yellow announcement bar, then logo + icon buttons, then the
 * collection links on their own row (desktop) or behind a menu button (phone).
 */
export default function Navbar({ cartCount }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const storeCartCount = useAppSelector(selectCartTotalItems);
  const wishlistCount = useAppSelector(selectWishlistCount);
  const itemCount = cartCount ?? storeCartCount;
  const t = useTranslation();

  useEffect(() => {
    if (isSearchOpen) searchInputRef.current?.focus();
  }, [isSearchOpen]);

  // Close menus after navigating (e.g. following a mobile link or submitting search).
  useEffect(() => {
    const close = () => {
      setIsOpen(false);
      setIsSearchOpen(false);
    };
    router.events.on("routeChangeComplete", close);
    return () => router.events.off("routeChangeComplete", close);
  }, [router.events]);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    void router.push({ pathname: "/search", query: { q } });
  };

  const isActive = (href: string) => router.asPath.split("?")[0] === href;
  const iconButton = "relative inline-flex h-10 w-10 items-center justify-center text-ink transition-opacity hover:opacity-60";

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-surface">
      <p className="bg-primary px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.08em] text-ink">
        {formatTranslation(t.announcement, {
          amount: formatPrice(storeConfig.freeShippingThreshold),
          days: storeConfig.returnDays,
        })}
      </p>

      <nav aria-label={t.navbar.aria.mainNavigation} className="mx-auto max-w-section px-4 md:px-8 lg:px-12">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="-ml-2 inline-flex h-10 w-10 items-center justify-center md:hidden"
              aria-label={isOpen ? t.navbar.aria.closeMenu : t.navbar.aria.openMenu}
              aria-expanded={isOpen}
              onClick={() => setIsOpen((open) => !open)}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <Link href="/" aria-label={t.navbar.aria.home}>
              <BrandLogo />
            </Link>
          </div>

          <div className="-mr-2 flex items-center">
            <button
              type="button"
              aria-label={t.navbar.aria.search}
              aria-expanded={isSearchOpen}
              aria-controls="navbar-search"
              onClick={() => setIsSearchOpen((open) => !open)}
              className={iconButton}
            >
              <Search size={20} strokeWidth={1.75} />
            </button>
            <Link href="/account" aria-label={t.navbar.aria.account} className={cn(iconButton, "hidden sm:inline-flex")}>
              <UserRound size={20} strokeWidth={1.75} />
            </Link>
            <Link
              href="/wishlist"
              aria-label={formatTranslation(t.navbar.aria.wishlistWithCount, { count: wishlistCount })}
              className={cn(iconButton, "hidden sm:inline-flex")}
            >
              <Heart size={20} strokeWidth={1.75} />
              {wishlistCount > 0 && <CountBadge count={wishlistCount} />}
            </Link>
            <button
              type="button"
              onClick={() => dispatch(openCart())}
              aria-label={formatTranslation(t.navbar.aria.cartWithCount, { count: itemCount })}
              className={iconButton}
            >
              <ShoppingBag size={20} strokeWidth={1.75} />
              {itemCount > 0 && <CountBadge count={itemCount} />}
            </button>
          </div>
        </div>

        <div className="hidden h-11 items-center gap-7 md:flex">
          {navigation.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
              className={cn(
                "border-b-2 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-ink transition-colors",
                isActive(href) ? "border-ink" : "border-transparent hover:border-ink/40"
              )}
            >
              {t.navbar.links[key]}
            </Link>
          ))}
        </div>
      </nav>

      {isSearchOpen && (
        <div id="navbar-search" className="border-t border-ink/10 bg-white px-4 py-4 md:px-8 lg:px-12">
          <form role="search" onSubmit={handleSearchSubmit} className="mx-auto flex max-w-section items-center gap-3">
            <label htmlFor="navbar-search-input" className="sr-only">
              {t.navbar.search.submit}
            </label>
            <Search size={20} strokeWidth={1.75} aria-hidden="true" className="shrink-0 text-ink" />
            <input
              ref={searchInputRef}
              id="navbar-search-input"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              onKeyDown={(event) => event.key === "Escape" && setIsSearchOpen(false)}
              placeholder={t.navbar.search.placeholder}
              className="min-w-0 flex-1 border-b border-ink/20 bg-transparent py-2 text-body text-ink outline-none placeholder:text-text-secondary focus-visible:border-ink"
            />
            <button type="submit" className="bg-ink px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.06em] text-white hover:bg-ink/85">
              {t.navbar.search.submit}
            </button>
            <button
              type="button"
              aria-label={t.navbar.search.close}
              onClick={() => setIsSearchOpen(false)}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center"
            >
              <X size={20} />
            </button>
          </form>
        </div>
      )}

      {isOpen && (
        <div className="border-t border-ink/10 bg-surface px-4 pb-6 pt-2 md:hidden">
          <ul className="flex flex-col divide-y divide-ink/10">
            {navigation.map(({ key, href }) => (
              <li key={key}>
                <Link href={href} className="block py-3.5 font-display text-2xl font-bold uppercase text-ink">
                  {t.navbar.links[key]}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/wishlist" className="block py-3.5 text-small font-semibold uppercase tracking-[0.06em] text-ink">
                {t.footer.links.wishlist}
              </Link>
            </li>
            <li>
              <Link href="/account" className="block py-3.5 text-small font-semibold uppercase tracking-[0.06em] text-ink">
                {t.footer.links.account}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

function CountBadge({ count }: { count: number }) {
  return (
    <span className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-accent-pink px-1 text-[10px] font-bold leading-none text-white">
      {count > 99 ? "99+" : count}
    </span>
  );
}
