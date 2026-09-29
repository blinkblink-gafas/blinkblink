# blink blink — storefront

Next.js storefront for blink blink eyewear. Live so far: a homepage (hero,
category cards, promo banner, best sellers, newsletter signup), category
listings with shape tabs, a filter sidebar (price slider, frame/lens color,
shape, gender, stock) and pagination, product pages, search, a slide-in cart
drawer plus `/cart`, a demo checkout (no payment taken), a wishlist, and
About/Account/404 pages. Prices are in euro. Cart and wishlist are saved in
`localStorage`. No real backend yet: the catalog is `lib/mockData.ts`,
served through `lib/catalog.ts` and the `/api/*` routes (see Data below).

## Getting started

```bash
yarn install
yarn dev
```

Then open http://localhost:3000.

```bash
yarn test       # unit tests (Vitest)
yarn typecheck  # tsc --noEmit
yarn build      # production build
```

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://blinkblink.com`) in production so
canonical and Open Graph URLs are absolute.

## Stack

- Next.js 14 (Pages Router) + TypeScript (strict)
- Tailwind CSS, theme tokens wired to CSS variables
- Redux Toolkit + RTK Query
- Framer Motion, lucide-react
- Vitest for unit tests

## Brand tokens

Colors live in `styles/globals.css` (`:root`) as space-separated RGB
channels (`--primary-rgb: 247 228 32;`), and are exposed to Tailwind as
`bg-primary`, `text-ink`, `bg-accent-pink`, etc. via `tailwind.config.ts`.
Storing channels (rather than hex) is what makes opacity modifiers like
`bg-ink/50` and `text-ink/40` work. Current values are **placeholders** —
update the `*-rgb` variables once exact brand colors are confirmed; no
component code needs to change.

| Token | Variable | Placeholder | Role |
|---|---|---|---|
| `primary` | `--primary-rgb` | `#F7E420` | yellow |
| `secondary` / `accent-pink` | `--secondary-rgb` | `#F82B9A` | pink |
| `accent-blue` | `--accent-blue-rgb` | `#06ABE9` | blue |
| `accent-orange` | `--accent-orange-rgb` | `#FF7A1A` | orange |
| `ink` / `black` | `--black-rgb` | `#151311` | near-black text/outlines/bg |
| `surface` / `background` | `--background-rgb` | `#F5F3F1` | light gray background |
| `white` | `--white-rgb` | `#FFFFFF` | white |

The Poppins font (400/600/700/900 — headlines use `font-black`) is loaded in
`pages/_app.tsx`.

**Look and feel:** black navbar and footer, white page, bold yellow / pink /
blue / orange color blocks for heroes and banners, white product cards with a
hairline ring (`ring-1 ring-ink/10`), and pill buttons (`Button`: black
primary, yellow secondary).

**Cut-out product photos:** add the `photo-cutout` class (in
`styles/globals.css`) to a photo with a white or light-gray background that
sits on a color block — it brightens then multiplies the photo so the
background disappears and only the frames show.

## Structure

```
pages/                index, about, account (placeholder), cart, wishlist,
                       search, 404, category/[slug] (listing + filters),
                       product/[slug] (PDP + related), checkout/ (form +
                       success), api/ (products, products/[slug], categories)
components/layout/     Navbar (search, wishlist, cart), Footer, CartDrawer,
                       Seo (meta/OG/JSON-LD), Layout (wraps every page)
components/sections/   Hero, ShopByCategory, PromoBanner, ProductGrid,
                       NewsletterSignup, ProductListing (+ FilterSidebar),
                       ProductTabs, BrighterSideBanner
components/ui/         Button, Badge, Rating, Section, SectionHeading,
                       BrandLogo, Breadcrumbs, Pagination, PriceRangeSlider,
                       ProductCard, CategoryCard, WishlistButton,
                       CartLineItem, FreeShippingProgress, EmptyState
store/                 Redux store, apiSlice + productsApi (RTK Query),
                       cartSlice, wishlistSlice, persistence (localStorage)
types/                 Product, CartItem, FilterState, LocaleStrings, etc.
styles/                globals.css (Tailwind + CSS variable tokens)
locales/               en.json — every user-facing string
lib/                   catalog.ts (server data access), mockData.ts,
                       images.ts (site photos), storeConfig.ts,
                       filters.ts + useUrlFilters.ts, checkout.ts,
                       colors.ts, i18n.ts, utils.ts
public/images/         Your own photos go here (see Images below)
```

## Data

- **`lib/catalog.ts`** is the only thing that reads `mockData.ts`. Pages
  (`getStaticProps`) and API routes both go through it, so swapping in a
  real backend only touches this file.
- **Pages are statically generated** with `revalidate: 60` (ISR). Unknown
  category slugs 404 (`fallback: false`); products added later render on
  first request (`fallback: "blocking"`) and unknown products 404.
- **`/api/products?category=&q=`**, **`/api/products/[slug]`** and
  **`/api/categories`** serve the same data to the client through
  `store/api/productsApi.ts` (used by search and the wishlist).
- **Filters live in the URL**
  (`?shape=round&color=Gold&lens=Green&gender=women&price=30-45&stock=1&sort=price-asc&page=2`),
  so filtered views are shareable. See `lib/filters.ts`.

## Images — replacing the placeholders

All photos are currently free placeholders from Unsplash
([license](https://unsplash.com/license): free for commercial use, no
attribution required). They live in exactly two places:

| What | Where |
|---|---|
| Product photos | each product's `images` in `lib/mockData.ts` |
| Hero, promo banner, newsletter, "Brighter Side" banner, category cards | `siteImages` in `lib/images.ts` |

To use your own photo:

1. Put the file in `public/images/` (e.g. `public/images/hero.jpg`, or
   `public/images/products/classic-black-1.jpg`).
2. Replace the matching `url` with its path — `url: "/images/hero.jpg"` —
   and update the `alt` text to describe the photo.

That's it; no component code changes. Photos placed on color blocks (hero,
category cards, banners) look best on a plain white background, since
`photo-cutout` removes it. Once no `unsplash(...)` URLs remain, you can drop
the `images.unsplash.com` entry from `next.config.js`.

## Store settings

`lib/storeConfig.ts` holds the currency, free-delivery threshold (€50),
return window (30 days) and products per page (9). The delivery and returns
figures are **placeholders** shown to customers on the homepage, product
page and cart — confirm them before launch.

## Redux / RTK Query

- `store/api/apiSlice.ts` — base `createApi` slice. Endpoints are added with
  `apiSlice.injectEndpoints(...)` (see `productsApi.ts`) rather than a new
  `createApi` instance.
- `store/slices/cartSlice.ts` — `addToCart` (also opens the drawer),
  `removeFromCart`, `updateQuantity`, `clearCart`, `openCart`, `closeCart`,
  `toggleCart`, `hydrateCart`, plus selectors.
- `store/slices/wishlistSlice.ts` — `toggleWishlist`, `clearWishlist`,
  `hydrateWishlist`, plus selectors.
- `store/persistence.ts` — restores cart + wishlist from `localStorage`
  after mount (so server and client markup match) and saves on change.
  Pages that depend on saved state wait for the `hydrated` flag before
  showing an empty state.
- Wired into `pages/_app.tsx` via `<Provider store={store}>`.

## Component primitives

- **Button** — `variant`: `primary` (black/white) · `secondary`
  (yellow/black) · `accent` (pink/white) · `ghost` (white, hairline ring).
  Pill-shaped.
- **Badge** — `label`: `New` · `Bestseller` · `Sale` · `Limited`, each with
  its own token color, or `discountPercent` for a pink "-20%" chip.
- **Section** — consistent max-width (`max-w-section`, 1280px), responsive
  padding, and vertical rhythm wrapper for every section. To override its
  default `py-*`, pass side-specific classes (`pt-*`/`pb-*`) — a plain
  `py-0` can lose to `py-12` depending on CSS order.
- **ProductCard** — typed to `Product`: photo, discount (or first) badge,
  wishlist toggle (`WishlistButton`), name, price (pink when discounted) +
  strikethrough MRP, rating, and an "Add to Cart" button wired to
  `cartSlice`. The whole card links to
  `/product/[slug]`; the wishlist and Add to Cart buttons sit above that
  link so they stay independently clickable.
- **ProductGrid** (`components/sections/`) — takes a `Product[]` and an
  optional heading/"View All" link, and renders a responsive `ProductCard`
  grid. Used by the homepage, category, search, wishlist and
  related-products sections.
- **ProductListing** (`components/sections/`) — give it a `Product[]` and
  it renders shape tabs, sort, the `FilterSidebar` (a slide-in panel on
  mobile), the grid and `Pagination`, all synced to the URL. Used by the
  category and search pages.
- **EmptyState** — heading, message and optional call-to-action button,
  shared by every "nothing here" view.
- **CartLineItem** — one cart row with quantity stepper and remove; used by
  the drawer (`compact`) and `/cart`.

Import the `ui/` primitives from `@/components/ui`.

All copy lives in `locales/en.json` (typed by `types/locales.ts`) and is
read with `useTranslation()` — or `getTranslation()` on the server.
