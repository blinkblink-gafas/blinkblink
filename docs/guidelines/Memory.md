# Memory

The project's running record: where things stand, what has been done, what
is broken or fake, and what was changed and why. **Read this first; update
it last.** Newest entries go at the top of each log.

_Last updated: 3 Oct 2026_

## 1. Current status

- **Phases 1–3 are complete and merged to `main`** (merge commit `4f7c851`,
  pull request #2, 29 Sep 2026).
- The store is a **working front end on mock data**. Nothing is connected
  to a real backend, payment provider or email service.
- Checks on `main`: typecheck clean, 32 unit tests passing, production
  build passing (35 pages).
- **In progress:** development guidelines (`docs/guidelines/`), branch
  `docs/guidelines`.
- **Next:** Phase 4 improvements — list to come from the product owner (see
  `Task.md`).

## 2. What is a placeholder (not real yet)

Anything here must be replaced or confirmed before launch.

| Item | Where | Note |
|---|---|---|
| Product catalog (19 products, names, prices, ratings, review counts) | `lib/mockData.ts` | Invented for the demo |
| All photos | `lib/mockData.ts`, `lib/images.ts` | Free Unsplash stock; replace with brand photography |
| Free delivery over €50, 30-day returns | `lib/storeConfig.ts` | Shown to customers; not confirmed by the business |
| "Secure Checkout" trust line | product page | No payment exists yet |
| Checkout | `pages/checkout/index.tsx` | Demo: validates, clears the cart, shows a made-up order id. No payment, no order saved, no email |
| Newsletter signup | `components/sections/NewsletterSignup.tsx` | Validates and says thanks; the address is not stored or sent anywhere |
| Account page | `pages/account.tsx` | "Coming soon" page |
| Logo | `components/ui/BrandLogo.tsx` | Built from text; no logo file yet |
| Brand colors | `styles/globals.css` | Matched by eye to the reference designs |
| About page copy | `locales/en.json` → `about` | Draft text |
| Target users and success measures | `PRD.md` | Assumptions to confirm |

## 3. Known issues and limitations

| # | Issue | Impact | Status |
|---|---|---|---|
| 1 | No ESLint configuration; `yarn lint` asks to create one | No automatic lint checks | Open — backlog |
| 2 | No end-to-end tests; flows are checked by hand in the browser | Regressions in flows are caught late | Open — backlog |
| 3 | Unused entries left in `tailwind.config.ts` (old `h1`–`h3` type scale, `comic` shadows, `border-3` / `border-5`) | Harmless clutter; could tempt reuse of the retired look | Open — backlog |
| 4 | Navbar cart / wishlist screen-reader labels say "1 items" | Minor wording for screen-reader users | Open — backlog |
| 5 | Product thumbnails are center-cropped; a photo with the frame off-center can look blank at thumbnail size | Cosmetic, stock photos only | Open — goes away with real photos |
| 6 | Footer and nav omit pages from the reference design that don't exist yet (FAQ, shipping, legal, collections, social links) | Differs from the reference on purpose | By design until the pages exist |
| 7 | Category cards have no heart icon (the reference shows one) | Differs from the reference on purpose — saving a category has no meaning | By design |
| 8 | No "Kids" shape tab (the reference shows one) | There are no kids' products; tabs only list shapes that exist | By design |
| 9 | Search only matches exact text in the name, category, description and colors; no typo tolerance or ranking | Basic search | Acceptable for mock data |
| 10 | The wishlist heart on product cards is 32px, below the 40px tap-target guideline in `design.md` | Slightly small on phones | Open — backlog |

## 4. Things to know when working on this project

- **Stop `yarn dev` before `yarn build` or `yarn add`.** They share the
  `.next/` folder, and on Windows the running server locks a file the
  install needs. Restart `yarn dev` afterwards.
- **After restarting the dev server, reload browser tabs** — an old tab can
  get stuck reloading against the previous build.
- **Changes to `tailwind.config.ts` need a dev-server restart** to take
  effect.
- **The first load of each page in dev is slow** (it compiles on demand).
- **Tailwind opacity on brand colors** (`bg-ink/50`) only works because the
  colors are stored as RGB channels in `globals.css`. Keep that format.
- **Overriding `Section` padding:** use `pt-*` / `pb-*` at each breakpoint;
  `py-0` can lose to the default.
- **Photos on color blocks** need a white background for `photo-cutout` to
  hide it; a light-gray backdrop leaves a visible box.
- **The product page keeps its state between products** unless keyed — it
  is keyed by product id; keep that when editing.
- **Git line endings:** the repo stores LF; Git on Windows shows
  "LF will be replaced by CRLF" warnings. They are harmless.

## 5. Completed work

| Date | What | Branch / commit |
|---|---|---|
| 29 Sep 2026 | Phase 3 redesign merged to `main` | PR #2 · `4f7c851` |
| 29 Sep 2026 | Phase 3: redesign to the Home / Category / Product references, euro prices, new catalog fields, filter sidebar, pagination, banners, newsletter | `feat/phase3-redesign` · `d8ec743` |
| 29 Sep 2026 | Phase 2: cart drawer, cart page, demo checkout, URL filters, search, wishlist, catalog layer, API routes, static generation, footer, About, SEO, tests | `feat/phase2-cart-browse-api` · `f35f6f4` |
| 26 Sep 2026 | Phase 1: product grid, category and product pages | `main` · `c502035` |
| 22 Sep 2026 | Initial sections and translation file | `main` · `4620a52`, `fae2dc1` |

## 6. Bug log

| Date | Bug | Cause | Fix |
|---|---|---|---|
| 29 Sep 2026 | Checkout fields squeezed beside the section titles | Floated `<legend>` not cleared | `clear-both` on the field grid |
| 29 Sep 2026 | Gray box visible around hero and banner photos | `mix-blend-multiply` only hides pure white; photos had light-gray backdrops | `photo-cutout` class brightens before blending |
| 29 Sep 2026 | Headlines not as heavy as the reference | Poppins 900 was not loaded | Added weight 900 in `_app.tsx` |
| 29 Sep 2026 | Large gaps around the filter bar; extra space above page titles on wide screens | `Section` default `py-*` overrode the passed `py-0` | Side-specific padding classes |
| 29 Sep 2026 | Faded colors never rendered (`text-ink/40`, `bg-ink/90`, drawer backdrop) | Tailwind can't apply opacity to plain `var()` colors | Colors stored as RGB channels with `<alpha-value>` |
| 29 Sep 2026 | Color, quantity and image carried over when moving between products | Next.js reuses the page component on the same route | Keyed the product detail by product id |
| 29 Sep 2026 | Order confirmation promised an email receipt | Copy did not match the demo behavior | Reworded to say no payment was taken |
| 29 Sep 2026 | Navbar links to `/cart`, `/account` and `/category/collections` were dead | Pages did not exist | Pages added; "Collections" replaced by "Sports" and "Shop All" |

## 7. Decision log

| Date | Decision | Why |
|---|---|---|
| 3 Oct 2026 | Guidelines live in `docs/guidelines/` (PRD, Architecture, Rule, design, Task, Memory) | Keep development from drifting |
| 29 Sep 2026 | Follow the owner's Home / Category / Product reference designs; drop the "Playful sticker" direction explored earlier | Owner's choice |
| 29 Sep 2026 | Prices in euro | Owner's choice |
| 29 Sep 2026 | Use free Unsplash photos until real photography exists; exclude photos showing other brands' logos | Owner asked for internet images; other brands' logos must not appear in the store |
| 29 Sep 2026 | Only link to pages that exist | Owner's choice — no dead links |
| 29 Sep 2026 | Filters, sort, page and search live in the URL, not Redux | Shareable links; Back works |
| 29 Sep 2026 | All product reads go through `lib/catalog.ts` | One place to swap in a real backend |
| 29 Sep 2026 | Static pages refreshed every 60 seconds instead of rendering on each request | Faster pages |

## 8. How to update this file

After each piece of work:

1. Update **Current status** and the "Last updated" date.
2. Add a row to **Completed work**.
3. Add fixed bugs to the **Bug log**; add new unresolved ones to **Known
   issues**.
4. Add or remove **placeholders**.
5. Record any choice that changes direction in the **Decision log**.
