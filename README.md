# blink blink — project foundation

Scaffold for the blink blink eyewear landing page. No Navbar, Hero, or
content sections yet — this is just the base: config, theme tokens,
folder structure, Redux/RTK Query wiring, and reusable UI primitives.

## Getting started

```bash
npm install
npm run dev
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
pages/            index, about, category/[slug], product/[id] — routed scaffolds only
components/ui/    Button, Badge, Section, ProductCard primitives
store/            Redux store, apiSlice (RTK Query base), cartSlice
types/            Product, CartItem, FilterState, etc.
styles/           globals.css (Tailwind + CSS variable tokens)
lib/              mockData.ts, utils.ts (formatPrice, cn helper)
```

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
  "Add to Cart" button wired to `cartSlice`. Layout shell only — no live
  data yet.

Import all of the above from `@/components/ui`.
