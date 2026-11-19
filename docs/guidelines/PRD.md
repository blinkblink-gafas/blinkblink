# Product Requirements Document — blink blink storefront

> **Status:** living document. Items marked **(assumption — confirm)** were
> inferred from the designs and the code, not stated by the business. Correct
> them here first; the other guideline files follow this one.

## 1. Product overview

blink blink is an eyewear brand selling sunglasses directly to customers
online, in three collections: **Men**, **Women** and **Classic**. This project is
its storefront: a website where a shopper can discover frames, compare them,
and buy them.

The brand voice is bold, playful and confident — "More than eyewear. It's a
vibe." The site should feel like a clean, editorial fashion store in the
blink blink colors: big condensed type, lifestyle photography, product
photos front and center, and a checkout that gets out of the way.

- **Market:** Europe; prices in euro (EUR).
- **Language:** English today. All text lives in one file so more languages
  can be added without touching components.
- **Price range:** roughly €30–€55 per frame **(assumption — confirm; these
  are mock prices)**.

## 2. Problem statement

**For shoppers:** buying eyewear online is hard to do with confidence.
Stores are either premium and expensive, or cheap and untrustworthy, and
most make it slow to narrow hundreds of frames down to "the shape, color and
price I want".

**For the business:** blink blink needs its own sales channel that carries
its brand personality, instead of looking like a generic template store, and
that the team can extend without the design or the code drifting.

## 3. Goals

### Product goals

1. **Find a frame fast.** A shopper picks a collection (Men, Women,
   Classic), then filters by shape, frame color, lens color, price and
   stock, sorts the results, and can share the filtered page as a link.
2. **Decide with confidence.** Every product page shows photos, price and
   saving, rating, colors, key details, and delivery and returns terms.
3. **Buy without friction.** Add to Cart from anywhere, a cart that survives
   a page reload, and a short checkout. "Buy Now" goes straight to checkout.
4. **Feel like blink blink.** Every page follows the editorial design
   system in `design.md`.
5. **Work on a phone.** Every page is usable at 375px wide with no sideways
   scrolling.

### Engineering goals

1. One data-access layer, so the mock catalog can be replaced by a real
   backend without rewriting pages.
2. Fast pages: statically generated and refreshed in the background.
3. Accessible by default: keyboard usable, labelled controls, visible focus.
4. No drift: changes follow `Rule.md` and `design.md`, and are recorded in
   `Task.md` and `Memory.md`.

### Success measures **(assumption — confirm targets)**

| Measure | Why it matters |
|---|---|
| Conversion rate (orders ÷ visitors) | The store's main job |
| Add-to-cart rate from category pages | Whether browsing and filters work |
| Checkout completion rate | Whether checkout is short enough |
| Newsletter signups | Audience for future drops |
| Page load speed on mobile | Most Gen-Z traffic is mobile |

## 4. Target users

**Primary — style-led shoppers aged about 16–30 (assumption — confirm).**
They shop on their phone, discover brands on social media, care about look
and price, and often buy more than one pair. They expect a fast, visual
site and will leave if it feels slow or dull.

**Secondary — practical buyers.** People who want one reliable everyday
pair, often from the Classic collection. They care more about clear specs,
price, and delivery and returns terms than about brand energy.

**Internal — the blink blink team.** They need to change products, photos,
prices, copy and store policies without a developer rewriting components.
Today that means editing a few clearly named files (see `Architecture.md`).

## 5. Scope

### In scope today (built)

- Homepage: photo hero, selling-points strip, best-sellers and new-in
  carousels, Men / Women / Classic tiles, promo banner, newsletter signup.
- Collection listings (Men, Women, Classic, All) with shape tabs, a
  "Filter and sort" panel, sorting and pagination.
- Product pages with gallery, color and lenses, quantity, Add to Cart, Buy
  Now, expandable details, related products.
- Search, wishlist, cart drawer, cart page.
- Checkout form with validation and an order confirmation — **demo only, no
  payment is taken**.
- About, Account (placeholder) and 404 pages.

### Not built yet

- Real product catalog and stock from a backend.
- Real payments, orders, order emails.
- Customer accounts and login.
- A connected email service for the newsletter.
- Legal and help pages (privacy, terms, cookies, FAQ, shipping, returns,
  size guide, contact).
- Higher-resolution product photos, more angles per product, and final
  brand assets (logo file, exact colors).
- More languages and currencies.

## 6. Open decisions for the business

These are shown to customers or shape the build, and are placeholders now:

1. Free-delivery threshold (currently €50) and return window (30 days) —
   `lib/storeConfig.ts`.
2. Which payment provider, and which countries to ship to.
3. Which backend or commerce platform will hold products and orders.
4. Final product range, names, prices and photos.
5. Final logo file and exact brand colors.
6. The About page copy (currently draft text).
