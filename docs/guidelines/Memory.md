# Memory

The project's running record: where things stand, what has been done, what
is broken or fake, and what was changed and why. **Read this first; update
it last.** Newest entries go at the top of each log.

_Last updated: 19 Nov 2026_

## 1. Current status

- **Phases 1–4 are merged to `main`.** Phase 4 (editorial redesign and
  Men / Women / Classic collections, plus the development guidelines) went
  in with merge commit `abf58dd`, pull request #3, 19 Nov 2026.
- The store is a **working front end on mock data**. Nothing is connected
  to a real backend, payment provider or email service.
- Checks on `main`: typecheck clean, 34 unit tests passing, production
  build passing (62 pages).
- No feature branches are open; merged branches have been deleted.
- **Blocking launch:** the product photos are third-party placeholders kept
  on this machine only (see section 2).

## 2. What is a placeholder (not real yet)

Anything here must be replaced or confirmed before launch.

| Item | Where | Note |
|---|---|---|
| Product catalog (48 products: names, prices, ratings, review counts, features) | `lib/mockData.ts` | Invented for the demo |
| **Product photos** | `public/images/placeholder-products/` (paths in `lib/mockData.ts`) | **Third-party photos supplied by the owner from a scraped folder. Local-only: git-ignored, never committed, pushed or deployed. Must be replaced with own photography before any public launch.** `SOURCES.csv` in that folder records where each came from |
| Lifestyle photos (hero, promo, editorial tile) | `lib/images.ts` | Free Unsplash stock |
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
| 5 | A fresh clone has no product photos (the folder is git-ignored), so product tiles show empty | Only affects other machines and deployments | By design until real photos exist |
| 6 | Footer and nav omit pages that don't exist yet (FAQ, shipping, legal, social links) | — | By design until the pages exist |
| 7 | Each product has one photo and one frame color, so the product page gallery shows the photo plus a collection-color tile | Thinner gallery than a real store | Goes away with real photos |
| 8 | Search only matches exact text in the name, collection, shape, description and colors; no typo tolerance or ranking | Basic search | Acceptable for mock data |

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
- **The in-app browser pane must be visible** for screenshots and
  animations (drawers, filter panel) to finish; when hidden, check pages
  with `get_page_text` / JavaScript instead.
- **Only one dev server at a time.** If `yarn dev` starts on port 3001, an
  old server is still holding 3000 — stop it first.
- **Git line endings:** the repo stores LF; Git on Windows shows
  "LF will be replaced by CRLF" warnings. They are harmless.

## 5. Completed work

| Date | What | Branch / commit |
|---|---|---|
| 19 Nov 2026 | Phase 4 merged to `main` (includes the development guidelines) | PR #3 · `abf58dd` |
| 19 Nov 2026 | Phase 4: editorial redesign, Men / Women / Classic collections, 48-product placeholder catalog | `feat/phase4-editorial-redesign` · `2b0fbd1` |
| 3 Oct 2026 | Development guidelines | `docs/guidelines` · `257be3d` |
| 29 Sep 2026 | Phase 3 redesign merged to `main` | PR #2 · `4f7c851` |
| 29 Sep 2026 | Phase 3: redesign to the Home / Category / Product references, euro prices, new catalog fields, filter sidebar, pagination, banners, newsletter | `feat/phase3-redesign` · `d8ec743` |
| 29 Sep 2026 | Phase 2: cart drawer, cart page, demo checkout, URL filters, search, wishlist, catalog layer, API routes, static generation, footer, About, SEO, tests | `feat/phase2-cart-browse-api` · `f35f6f4` |
| 26 Sep 2026 | Phase 1: product grid, category and product pages | `main` · `c502035` |
| 22 Sep 2026 | Initial sections and translation file | `main` · `4620a52`, `fae2dc1` |

## 6. Bug log

| Date | Bug | Cause | Fix |
|---|---|---|---|
| 19 Nov 2026 | Card wishlist heart below the 40px tap target | 32px button | Heart and quick-add icons are 40px |
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
| 19 Nov 2026 | Editorial store layout (inspired by premium fashion eyewear sites) replaces the Phase 3 reference designs; brand colors unchanged | Owner's choice |
| 19 Nov 2026 | Collections are Men, Women and Classic; Sunglasses, Eyeglasses and Sports removed; gender filter removed | Owner's choice; the collection already answers "who is it for" |
| 19 Nov 2026 | Added Barlow Condensed as the display font (Poppins stays for body) | The editorial look depends on a tall, narrow headline face |
| 19 Nov 2026 | Owner-supplied third-party product photos used as local-only placeholders: git-ignored, products renamed with blink blink names | Lets the owner see the look now without publishing or committing another brand's photos |
| 19 Nov 2026 | Filters open in a slide-in "Filter and sort" panel on every screen size | Matches the editorial layout; frees the full width for a 4-column grid |
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
