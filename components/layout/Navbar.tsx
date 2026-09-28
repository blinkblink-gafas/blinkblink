import Link from "next/link";
import { useRouter } from "next/router";
import { Heart, Menu, Search, ShoppingBag, UserRound, X, Crown } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openCart, selectCartTotalItems } from "@/store/slices/cartSlice";
import { selectWishlistCount } from "@/store/slices/wishlistSlice";
import { formatTranslation, useTranslation } from "@/lib/i18n";
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

  return (
    <header className="sticky top-0 z-50 border-b border-black bg-white">
      <nav aria-label={t.navbar.aria.mainNavigation} className="mx-auto grid min-h-[76px] max-w-section grid-cols-[auto_1fr_auto] items-center gap-4 px-4 md:min-h-[88px] md:px-8 lg:px-12">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center md:hidden"
          aria-label={isOpen ? t.navbar.aria.closeMenu : t.navbar.aria.openMenu}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X size={24} /> : <Menu size={26} />}
        </button>

        <Link href="/" aria-label={t.navbar.aria.home} className="relative justify-self-start leading-none md:col-start-1">
          <Crown aria-hidden="true" className="absolute -top-3 left-1/2 h-4 w-4 -translate-x-1/2 fill-primary text-black" strokeWidth={2.5} />
          <span className="block text-xl font-bold tracking-[-0.08em] sm:text-2xl">{t.common.brandName}</span>
          <span className="mt-1 block text-[8px] font-bold uppercase tracking-[0.2em] text-secondary">{t.navbar.tagline}</span>
        </Link>

        <div className="hidden items-center justify-center gap-7 md:flex">
          {navigation.map(({ key, href }) => (
            <Link key={key} href={href} className="text-base font-normal transition-colors hover:text-secondary hover:underline hover:decoration-2 hover:underline-offset-4">
              {t.navbar.links[key]}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1.5 justify-self-end sm:gap-3">
          <button type="button" aria-label={t.navbar.aria.search} aria-expanded={isSearchOpen} aria-controls="navbar-search" onClick={() => setIsSearchOpen((open) => !open)} className="inline-flex rounded-full p-2 transition-colors hover:bg-background"><Search size={21} /></button>
          <Link href="/account" aria-label={t.navbar.aria.account} className="hidden rounded-full p-2 transition-colors hover:bg-background sm:inline-flex"><UserRound size={21} /></Link>
          <Link href="/wishlist" aria-label={formatTranslation(t.navbar.aria.wishlistWithCount, { count: wishlistCount })} className="relative hidden rounded-full p-2 transition-colors hover:bg-background sm:inline-flex">
            <Heart size={21} />
            {wishlistCount > 0 && <CountBadge count={wishlistCount} />}
          </Link>
          <button type="button" onClick={() => dispatch(openCart())} aria-label={formatTranslation(t.navbar.aria.cartWithCount, { count: itemCount })} className="relative inline-flex rounded-full p-2 transition-colors hover:bg-background">
            <ShoppingBag size={22} />
            {itemCount > 0 && <CountBadge count={itemCount} />}
          </button>
        </div>
      </nav>

      {isSearchOpen && (
        <div id="navbar-search" className="border-t border-black bg-white px-4 py-4 md:px-8 lg:px-12">
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
              className="min-w-0 flex-1 rounded-pill border-3 border-ink px-5 py-2.5 text-body outline-none focus-visible:shadow-comic-sm"
            />
            <button type="submit" className="rounded-pill border-3 border-ink bg-ink px-5 py-2.5 font-semibold text-primary">
              {t.navbar.search.submit}
            </button>
            <button type="button" aria-label={t.navbar.search.close} onClick={() => setIsSearchOpen(false)} className="inline-flex h-10 w-10 shrink-0 items-center justify-center">
              <X size={22} />
            </button>
          </form>
        </div>
      )}

      {isOpen && (
        <div className="border-t border-black bg-white px-4 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {navigation.map(({ key, href }) => (
              <Link key={key} href={href} onClick={() => setIsOpen(false)} className="text-lg font-semibold hover:text-secondary">
                {t.navbar.links[key]}
              </Link>
            ))}
            <Link href="/wishlist" className="text-lg font-semibold hover:text-secondary">
              {t.footer.links.wishlist}
            </Link>
            <Link href="/account" className="text-lg font-semibold hover:text-secondary">
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
    <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-secondary px-1 text-[10px] font-bold leading-none text-white">
      {count > 99 ? "99+" : count}
    </span>
  );
}
