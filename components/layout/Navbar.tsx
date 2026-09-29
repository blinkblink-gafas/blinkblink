import Link from "next/link";
import { useRouter } from "next/router";
import { Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openCart, selectCartTotalItems } from "@/store/slices/cartSlice";
import { selectWishlistCount } from "@/store/slices/wishlistSlice";
import BrandLogo from "@/components/ui/BrandLogo";
import { formatTranslation, useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { LocaleStrings } from "@/types/locales";

export interface NavbarProps {
  cartCount?: number;
}

const navigation: Array<{ key: keyof LocaleStrings["navbar"]["links"]; href: string }> = [
  { key: "sunglasses", href: "/category/sunglasses" },
  { key: "eyeglasses", href: "/category/eyeglasses" },
  { key: "sports", href: "/category/sports" },
  { key: "shopAll", href: "/category/all" },
  { key: "about", href: "/about" },
];

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

  const iconButton = "relative inline-flex rounded-full p-2 text-white transition-colors hover:bg-white/10";

  return (
    <header className="sticky top-0 z-50 bg-ink text-white">
      <nav aria-label={t.navbar.aria.mainNavigation} className="mx-auto grid h-16 max-w-section grid-cols-[auto_1fr_auto] items-center gap-4 px-4 md:h-[72px] md:px-8 lg:px-12">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center md:hidden"
            aria-label={isOpen ? t.navbar.aria.closeMenu : t.navbar.aria.openMenu}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link href="/" aria-label={t.navbar.aria.home}>
            <BrandLogo />
          </Link>
        </div>

        <div className="hidden items-center justify-center gap-8 md:flex">
          {navigation.map(({ key, href }) => (
            <Link key={key} href={href} className="text-small font-semibold text-white/90 transition-colors hover:text-primary">
              {t.navbar.links[key]}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-0.5 justify-self-end sm:gap-1.5">
          <button type="button" aria-label={t.navbar.aria.search} aria-expanded={isSearchOpen} aria-controls="navbar-search" onClick={() => setIsSearchOpen((open) => !open)} className={iconButton}><Search size={20} /></button>
          <Link href="/account" aria-label={t.navbar.aria.account} className={cn(iconButton, "hidden sm:inline-flex")}><UserRound size={20} /></Link>
          <Link href="/wishlist" aria-label={formatTranslation(t.navbar.aria.wishlistWithCount, { count: wishlistCount })} className={cn(iconButton, "hidden sm:inline-flex")}>
            <Heart size={20} />
            {wishlistCount > 0 && <CountBadge count={wishlistCount} />}
          </Link>
          <button type="button" onClick={() => dispatch(openCart())} aria-label={formatTranslation(t.navbar.aria.cartWithCount, { count: itemCount })} className={cn(iconButton, "text-primary")}>
            <ShoppingBag size={21} />
            {itemCount > 0 && <CountBadge count={itemCount} />}
          </button>
        </div>
      </nav>

      {isSearchOpen && (
        <div id="navbar-search" className="border-t border-white/10 bg-ink px-4 py-4 md:px-8 lg:px-12">
          <form role="search" onSubmit={handleSearchSubmit} className="mx-auto flex max-w-section items-center gap-3">
            <label htmlFor="navbar-search-input" className="sr-only">{t.navbar.search.submit}</label>
            <input
              ref={searchInputRef}
              id="navbar-search-input"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              onKeyDown={(event) => event.key === "Escape" && setIsSearchOpen(false)}
              placeholder={t.navbar.search.placeholder}
              className="min-w-0 flex-1 rounded-pill bg-white px-5 py-2.5 text-body text-ink outline-none placeholder:text-text-secondary focus-visible:ring-2 focus-visible:ring-primary"
            />
            <button type="submit" className="rounded-pill bg-primary px-5 py-2.5 font-semibold text-ink hover:brightness-95">
              {t.navbar.search.submit}
            </button>
            <button type="button" aria-label={t.navbar.search.close} onClick={() => setIsSearchOpen(false)} className="inline-flex h-10 w-10 shrink-0 items-center justify-center">
              <X size={22} />
            </button>
          </form>
        </div>
      )}

      {isOpen && (
        <div className="border-t border-white/10 bg-ink px-4 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {navigation.map(({ key, href }) => (
              <Link key={key} href={href} onClick={() => setIsOpen(false)} className="text-lg font-semibold hover:text-primary">
                {t.navbar.links[key]}
              </Link>
            ))}
            <Link href="/wishlist" className="text-lg font-semibold hover:text-primary">
              {t.footer.links.wishlist}
            </Link>
            <Link href="/account" className="text-lg font-semibold hover:text-primary">
              {t.footer.links.account}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function CountBadge({ count }: { count: number }) {
  return (
    <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-accent-pink px-1 text-[10px] font-bold leading-none text-white">
      {count > 99 ? "99+" : count}
    </span>
  );
}
