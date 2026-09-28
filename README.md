# blink blink — storefront

Next.js storefront for blink blink eyewear. Live so far: a homepage, category
listings with sort/price/color filters, product detail pages, search, a
slide-in cart drawer plus `/cart`, a demo checkout (no payment taken), a
wishlist, and About/Account/404 pages. Cart and wishlist are saved in
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
| `accent-orange` | `--accent-orange-rgb` | `#E89D17` | orange |
| `ink` / `black` | `--black-rgb` | `#151311` | near-black text/outlines/bg |
| `surface` / `background` | `--background-rgb` | `#F5F3F1` | light gray background |
| `white` | `--white-rgb` | `#FFFFFF` | white |

Type scale (`text-h1`, `text-h2`, `text-h3`, `text-body`, `text-small`) and
the Poppins font are also wired in `tailwind.config.ts` / `pages/_app.tsx`.

"Comic panel" hard shadows (`shadow-comic`, `shadow-comic-sm`,
`shadow-comic-lg`) and thick borders (`border-3`, `border-5`) are available
for the comic-book/streetwear outline look.

## Structure

```
pages/                index, about, account (placeholder), cart, wishlist,
                       search, 404, category/[slug] (listing + filters),
                       product/[slug] (PDP + related), checkout/ (form +
                       success), api/ (products, products/[slug], categories)
components/layout/     Navbar (search, wishlist, cart), Footer, CartDrawer,
                       Seo (meta/OG/JSON-LD), Layout (wraps every page)
components/sections/   Hero, ShopByCategory, ProductGrid, FilterBar
components/ui/         Button, Badge, Section, ProductCard, CategoryCard,
                       WishlistButton, CartLineItem, EmptyState
store/                 Redux store, apiSlice + productsApi (RTK Query),
                       cartSlice, wishlistSlice, persistence (localStorage)
types/                 Product, CartItem, FilterState, LocaleStrings, etc.
styles/                globals.css (Tailwind + CSS variable tokens)
locales/               en.json — every user-facing string
lib/                   catalog.ts (server data access), mockData.ts,
                       filters.ts + useUrlFilters.ts, checkout.ts,
                       colors.ts, i18n.ts, utils.ts
public/products/       Local placeholder product imagery (see below)
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
- **Filters live in the URL** (`?sort=price-asc&color=Jet+Black&price=0-35`),
  so filtered views are shareable. See `lib/filters.ts`.

## Product imagery

`lib/mockData.ts`'s 12 mock products all point at local SVGs under
`public/products/` — the same hand-drawn frame illustration used by `Hero`'s
`SunglassesArt` and `CategoryCard`'s `CategoryEyewear`, just recolored per
product, so the catalog looks on-brand with zero external image
dependencies. **These are placeholders, not real product photography** —
swap each product's `images` array for real shots once they're available;
no other code needs to change. `next.config.js` allows local SVGs through
`next/image` for this reason (`dangerouslyAllowSVG`, scoped to our own
static files only, never user-uploaded content).

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

- **Button** — `variant`: `primary` (black/yellow) · `secondary`
  (yellow/black) · `accent` (pink/white) · `ghost` (white/black outline).
  Pill-shaped, bold ink border, hard comic shadow on hover.
- **Badge** — `label`: `New` · `Bestseller` · `Sale` · `Limited`, each with
  its own token color.
- **Section** — consistent max-width (`max-w-section`, 1280px), responsive
  padding, and vertical rhythm wrapper for every section. To override its
  default `py-*`, pass side-specific classes (`pt-*`/`pb-*`) — a plain
  `py-0` can lose to `py-12` depending on CSS order.
- **ProductCard** — typed to `Product`, image area, badges, wishlist
  toggle (`WishlistButton`), title, star rating, price + strikethrough MRP,
  and an "Add to Cart" button wired to `cartSlice`. The whole card links to
  `/product/[slug]`; the wishlist and Add to Cart buttons sit above that
  link so they stay independently clickable.
- **ProductGrid** (`components/sections/`) — takes a `Product[]` and an
  optional heading/"View All" link, and renders a responsive `ProductCard`
  grid. Used by the homepage, category, search, wishlist and
  related-products sections.
- **FilterBar** (`components/sections/`) — sort, price bucket and color
  chips; pair it with `useUrlFilters()` and `applyFilters()`.
- **EmptyState** — heading, message and optional call-to-action button,
  shared by every "nothing here" view.
- **CartLineItem** — one cart row with quantity stepper and remove; used by
  the drawer (`compact`) and `/cart`.

Import the `ui/` primitives from `@/components/ui`.

All copy lives in `locales/en.json` (typed by `types/locales.ts`) and is
read with `useTranslation()` — or `getTranslation()` on the server.
