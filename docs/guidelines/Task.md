# Tasks

The plan, phase by phase. Update this file in the same branch as the work:
tick a task when it is merged, and add new tasks **before** starting them.

Legend: `[x]` done · `[ ]` to do · `[~]` in progress

## Phase 1 — Foundation and core pages ✅ done (26 Sep 2026)

Goal: a browsable store on mock data.

- [x] Project setup: Next.js 14 (Pages Router), TypeScript strict, Tailwind,
      Redux Toolkit, Poppins font
- [x] Brand color tokens as CSS variables
- [x] All text moved to `locales/en.json` with typed access
- [x] Layout with Navbar
- [x] Homepage: hero, trust badges, Shop by Category
- [x] UI primitives: Button, Badge, Section, ProductCard, CategoryCard
- [x] Mock product catalog
- [x] ProductGrid section
- [x] Category listing page
- [x] Product detail page with gallery, colors, quantity, Add to Cart
- [x] Cart state in Redux (`cartSlice`)

## Phase 2 — Shopping flow, browsing and data layer ✅ done (29 Sep 2026)

Goal: a shopper can find, save and "buy" a product end to end.

- [x] Cart drawer, opened from the Navbar and by Add to Cart
- [x] `/cart` page
- [x] Cart and wishlist saved in `localStorage`
- [x] Demo checkout with validation, and an order confirmation page
- [x] Filters and sorting kept in the URL
- [x] Search (`/search`) through the products API
- [x] Wishlist: heart toggle and `/wishlist` page
- [x] `lib/catalog.ts` as the single data-access layer
- [x] API routes: `/api/products`, `/api/products/[slug]`, `/api/categories`
- [x] RTK Query `productsApi`
- [x] Static generation with 60-second refresh for home, category, product
- [x] 404 for unknown categories and products; custom 404 page
- [x] Footer, About page, Account placeholder page
- [x] SEO component: meta, Open Graph, product structured data
- [x] Unit tests with Vitest (cart, wishlist, filters, catalog, checkout)
- [x] Fix: Tailwind opacity modifiers on brand colors

## Phase 3 — Redesign to the approved references ✅ done (29 Sep 2026)

Goal: every page matches the Home, Category and Product reference designs.

- [x] New look: black navbar and footer, color-block heroes and banners,
      white cards, pill buttons; comic outlines and shadows removed
- [x] Homepage: new hero, trust badges with subtitles, photo category
      cards, "Wear Your Personality" banner, Best Sellers, newsletter signup
- [x] Category page: breadcrumbs, shape tabs, sort, filter sidebar (price
      slider, frame color, lens color, shape, gender, in stock), mobile
      filter panel, pagination
- [x] Product page: thumbnail gallery, discount badge, "You save", Buy Now,
      trust list, Details / Shipping / Returns tabs, "See the Brighter Side"
      banner
- [x] Cart drawer free-delivery progress; cart and checkout restyled
- [x] Prices in euro
- [x] 19 mock products with stock photos and shape, gender, lens color and
      feature data
- [x] `lib/images.ts` for site photos, `lib/storeConfig.ts` for policies
- [x] Merged to `main` (pull request #2)

## Phase 4 — Editorial redesign and new collections ✅ merged (photos still to replace)

Goal: an editorial store look (layout inspired by premium fashion eyewear
sites) in the unchanged blink blink colors, with the range reorganised into
Men, Women and Classic.

- [x] Development guidelines (`docs/guidelines/`)
- [x] Collections: Sunglasses / Eyeglasses / Sports replaced by Men, Women,
      Classic (types, catalog, routes, nav, footer, tiles); gender filter
      removed (the collection does that job)
- [x] Catalog: 48 products with new shapes (oval, geometric)
- [x] Look: condensed display font (Barlow Condensed), light-gray page with
      white tiles, square corners, uppercase buttons and labels; unused
      comic shadows, thick borders and old type scale removed
- [x] Header: yellow announcement bar, light header, collection links row
- [x] Homepage: photo hero, marquee strip, best-sellers and new-in carousels,
      collection tiles, promo banner, newsletter
- [x] Listing: collection color banner, underlined shape tabs, "Filter and
      sort" slide-in panel, 4-column grid, editorial tile, 12 per page
- [x] Product page: photo + color tile gallery, sticky buy panel,
      expandable Description / Details / Shipping / Returns, "You may also
      like" carousel
- [x] Product card: quick-add bag icon, 40px icon tap targets
- [x] Search also matches shape and lens color
- [x] Product photos: blink blink's own photos committed to
      `public/images/products/`
- [x] Merged to `main` (pull request #3)

## Backlog (not scheduled)

Roughly in the order they unblock a real launch.

### Needs a business decision first

- [ ] Confirm store policies: free-delivery threshold, return window
- [ ] Choose backend / commerce platform for products, stock and orders
- [ ] Choose payment provider and shipping countries
- [ ] Final brand assets: logo file, exact colors
- [ ] Real product range, prices and photography
- [ ] Final About page copy

### Build

- [ ] Connect `lib/catalog.ts` to the real backend; remove mock data
- [ ] Real checkout: payment, order creation, confirmation email
- [ ] Customer accounts: sign up, log in, order history
- [ ] Newsletter: connect an email provider behind an API route
- [ ] Help and legal pages: FAQ, shipping, returns, size guide, contact,
      privacy, terms, cookies — then add them to the footer
- [ ] Cookie consent banner (needed in the EU once analytics are added)
- [ ] Collections (curated groups of products) and a nav link for them
- [ ] Product reviews shown on the product page
- [ ] More languages and currencies

### Quality

- [ ] ESLint configuration (the project has none; `yarn lint` prompts)
- [ ] End-to-end test of browse → add to cart → checkout
- [ ] Continuous integration: typecheck, test and build on every pull request
- [ ] Singular/plural for the Navbar cart and wishlist screen-reader labels
- [ ] Analytics and performance monitoring
