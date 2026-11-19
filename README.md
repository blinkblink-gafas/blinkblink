# blink blink — storefront

Next.js storefront for blink blink eyewear, styled as a clean editorial
store (condensed uppercase headlines, white product tiles on a light-gray
page, square buttons) in the blink blink colors. Live so far: a homepage
(full-width photo hero, scrolling selling-points strip, best-sellers and
new-in carousels, Men / Women / Classic collection tiles, promo banner,
newsletter signup), collection listings with shape tabs, a "Filter and sort"
panel (sort, price slider, frame/lens color, shape, stock) and pagination,
product pages, search, a slide-in cart
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

Two fonts are loaded in `pages/_app.tsx`: **Poppins** (400/600/700/900)
for body text, labels and buttons, and **Barlow Condensed** (600/700/800,
plus italic) for headlines, product names and prices (`font-display`).

**Look and feel:** yellow announcement bar, light header with the collection
links on their own row, light warm-gray page (`bg-surface`) with white
product tiles, square corners, uppercase buttons and labels, full-width
photo hero, color blocks (yellow / pink / blue / orange) for collection tiles
and banners, black footer. Headlines are condensed uppercase with one accent
word in pink italics ("OUR *BEST-SELLERS*").

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
components/sections/   Hero, Marquee, ProductCarousel, ShopByCategory,
                       PromoBanner, NewsletterSignup, ProductGrid,
                       ProductListing (+ FilterSidebar), ProductAccordion
components/ui/         Button, Badge, Rating, Section, SectionHeading,
                       BrandLogo, Breadcrumbs, Pagination, PriceRangeSlider,
                       ProductCard, CategoryCard, EditorialTile,
                       WishlistButton, CartLineItem, FreeShippingProgress,
                       EmptyState
store/                 Redux store, apiSlice + productsApi (RTK Query),
                       cartSlice, wishlistSlice, persistence (localStorage)
types/                 Product, CartItem, FilterState, LocaleStrings, etc.
styles/                globals.css (Tailwind + CSS variable tokens)
locales/               en.json — every user-facing string
lib/                   catalog.ts (server data access), mockData.ts,
                       images.ts (site photos), storeConfig.ts,
                       filters.ts + useUrlFilters.ts, checkout.ts,
                       colors.ts, i18n.ts, utils.ts
public/images/         Your own photos go here (see Images below);
                       products/ holds the product photos
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
  (`?shape=round&color=Gold&lens=Green&price=30-45&stock=1&sort=price-asc&page=2`),
  so filtered views are shareable. See `lib/filters.ts`.

## Images

Photos are set in exactly two places:

| What | Where | Current source |
|---|---|---|
| Product photos (48 products) | each product's `images` in `lib/mockData.ts` | blink blink's own photos in `public/images/products/` |
| Hero, promo banner, editorial tile | `siteImages` in `lib/images.ts` | Free Unsplash placeholders ([license](https://unsplash.com/license)) |
| Men / Women / Classic tiles | `siteImages.categories` in `lib/images.ts` | Reuse product photos |

To add or change a product photo:

1. Put the file in `public/images/products/`, named after the product slug,
   e.g. `public/images/products/midnight-1.jpg`. Square or 2:1, at least
   1200px wide, frame centered on a **pure white** background, front view
   first.
2. In `lib/mockData.ts`, replace that product's `images` entry:
   `images: [{ url: "/images/products/midnight-1.jpg", alt: "…" }, …]`.
   The first image shows on cards; extra images appear in the product
   page gallery.

For other photos, put the file in `public/images/` and change the `url` in
`lib/images.ts` (e.g. `url: "/images/hero.jpg"`). No component code
changes. Photos placed on color blocks (collection tiles, the product
page's second gallery tile) need a plain white background, since
`photo-cutout` removes it. Once no `unsplash(...)` URLs remain, you can drop
the `images.unsplash.com` entry from `next.config.js`.

## Store settings

`lib/storeConfig.ts` holds the currency, free-delivery threshold (€50),
return window (30 days) and products per page (12). The delivery and returns
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
  Square corners, uppercase label.
- **Badge** — `label`: `New` · `Bestseller` · `Sale` · `Limited`, each with
  its own token color, or `discountPercent` for a pink "-20%" chip.
- **Section** — consistent max-width (`max-w-section`, 1280px), responsive
  padding, and vertical rhythm wrapper for every section. To override its
  default `py-*`, pass side-specific classes (`pt-*`/`pb-*`) — a plain
  `py-0` can lose to `py-12` depending on CSS order.
- **ProductCard** — typed to `Product`: white tile with the photo, one
  status badge, wishlist heart and quick-add bag icon, color dot, then
  condensed uppercase name + color on the left and price (pink when
  discounted, MRP struck through above) on the right. The whole card links
  to `/product/[slug]`; the two icon buttons sit above that link so they
  stay independently clickable.
- **ProductCarousel** (`components/sections/`) — a heading plus a sideways
  row of `ProductCard`s with back / forward arrows. Used for the homepage
  best-sellers and new-in rows and "You may also like".
- **ProductGrid** (`components/sections/`) — a plain responsive
  `ProductCard` grid with an optional heading (used by the wishlist).
- **ProductListing** (`components/sections/`) — give it a `Product[]` and
  it renders underlined shape tabs, a result count, the "Filter and sort"
  slide-in panel (sort + `FilterSidebar`), a 4-column grid with an optional
  `EditorialTile`, and `Pagination`, all synced to the URL. Used by the
  category and search pages.
- **SectionHeading** — condensed uppercase title; pass `{ lead, accent }`
  to set the accent words in pink italics.
- **EmptyState** — heading, message and optional call-to-action button,
  shared by every "nothing here" view.
- **CartLineItem** — one cart row with quantity stepper and remove; used by
  the drawer (`compact`) and `/cart`.

Import the `ui/` primitives from `@/components/ui`.

All copy lives in `locales/en.json` (typed by `types/locales.ts`) and is
read with `useTranslation()` — or `getTranslation()` on the server.
