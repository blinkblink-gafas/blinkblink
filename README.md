# blink blink — storefront

Next.js storefront for blink blink eyewear. Live so far: a homepage
(Navbar, Hero, Shop by Category, a Trending product grid), category
listing pages, and a full product detail page — all wired to a mock
product catalog and a working Redux cart. No real backend yet: everything
reads from `lib/mockData.ts` until a `productsApi` (see RTK Query below)
replaces it.

## Getting started

```bash
yarn install
yarn dev
```

Then open http://localhost:3000.

## Stack

- Next.js 14 (Pages Router) + TypeScript (strict)
- Tailwind CSS, theme tokens wired to CSS variables
- Redux Toolkit + RTK Query
- Framer Motion, lucide-react

## Brand tokens

Colors live as CSS variables in `styles/globals.css` (`:root`), and are
exposed to Tailwind as `bg-primary`, `text-ink`, `bg-accent-pink`, etc. via
`tailwind.config.ts`. Current hex values are **placeholders** — update the
variables in `globals.css` once exact brand hex codes are confirmed; no
component code needs to change.

| Token | Variable | Placeholder | Role |
|---|---|---|---|
| `primary` | `--color-primary` | `#FFD400` | yellow |
| `accent-pink` | `--color-accent-pink` | `#FF2E93` | pink |
| `accent-blue` | `--color-accent-blue` | `#3357FF` | blue |
| `accent-orange` | `--color-accent-orange` | `#FF6A1A` | orange |
| `ink` | `--color-ink` | `#111111` | near-black text/outlines/bg |
| `surface` | `--color-surface` | `#F3F2EE` | light gray background |
| `white` | `--color-white` | `#FFFFFF` | white |

Type scale (`text-h1`, `text-h2`, `text-h3`, `text-body`, `text-small`) and
the Poppins font are also wired in `tailwind.config.ts` / `pages/_app.tsx`.

"Comic panel" hard shadows (`shadow-comic`, `shadow-comic-sm`,
`shadow-comic-lg`) and thick borders (`border-3`, `border-5`) are available
for the comic-book/streetwear outline look.

## Structure

```
pages/                index (Hero + ShopByCategory + Trending), about (stub),
                       category/[slug] (product grid, filtered by category),
                       product/[slug] (full PDP)
components/layout/     Navbar, Layout (wraps every page via _app.tsx)
components/sections/   Hero, ShopByCategory, ProductGrid
components/ui/         Button, Badge, Section, ProductCard, CategoryCard
store/                 Redux store, apiSlice (RTK Query base), cartSlice
types/                 Product, CartItem, FilterState, etc.
styles/                globals.css (Tailwind + CSS variable tokens)
lib/                   mockData.ts, colors.ts (color-name → swatch hex),
                       i18n.ts, utils.ts (formatPrice, cn, prettifyLabel)
public/products/       Local placeholder product imagery (see below)
```

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

- `store/api/apiSlice.ts` — empty base `createApi` slice. Future endpoints
  (e.g. a `productsApi`) should call `apiSlice.injectEndpoints(...)` rather
  than creating a new `createApi` instance.
- `store/slices/cartSlice.ts` — plain Redux slice: `addToCart`,
  `removeFromCart`, `updateQuantity`, `clearCart`, `openCart`, `closeCart`,
  `toggleCart`, plus selectors.
- Wired into `pages/_app.tsx` via `<Provider store={store}>`.

## Component primitives

- **Button** — `variant`: `primary` (black/yellow) · `secondary`
  (yellow/black) · `accent` (pink/white) · `ghost` (white/black outline).
  Pill-shaped, bold ink border, hard comic shadow on hover.
- **Badge** — `label`: `New` · `Bestseller` · `Sale` · `Limited`, each with
  its own token color.
- **Section** — consistent max-width (`max-w-section`, 1280px), responsive
  padding, and vertical rhythm wrapper for every homepage/category section.
- **ProductCard** — typed to `Product`, image area, badges, wishlist
  toggle, title, star rating, price + strikethrough MRP, and an
  "Add to Cart" button wired to `cartSlice`. The whole card links to
  `/product/[slug]`; the wishlist and Add to Cart buttons sit above that
  link so they stay independently clickable.
- **ProductGrid** (`components/sections/`) — takes a `Product[]` and an
  optional heading/"View All" link, and renders a responsive `ProductCard`
  grid (an optional `emptyMessage` prop covers an empty list inline; the
  category page instead renders its own empty state so it can offer a link
  back home). Used by the homepage's Trending section and every category
  page with results.

Import the `ui/` primitives from `@/components/ui`.
