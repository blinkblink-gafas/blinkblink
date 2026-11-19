# Design

The visual language of the blink blink storefront. Since Phase 4 the site
uses a **clean editorial store layout** (inspired by premium fashion
eyewear sites) in the **blink blink colors**. The layout and type come from
that direction; the colors, logo and voice stay blink blink's own. This file
writes down the system so new screens match.

> The earlier Home / Category / Product reference designs (rounded cards,
> pill buttons, doodles) were retired on 19 Nov 2026 — see the decision log
> in `Memory.md`.

## 1. Design principles

1. **Editorial, not busy.** Big condensed headlines, lots of light-gray
   space, white product tiles. One loud element per section — a photo, a
   color block or a headline.
2. **Product first.** Frames are photographed alone on white and shown on
   white tiles, never covered by text.
3. **Color means something.** Yellow = brand (announcement bar, logo,
   Classic). Pink = sale, savings, counts, accent words, Women. Blue = Men.
   Orange = promo banner. Black = primary action, footer, marquee.
4. **One primary action per view.** Black "Add to Cart" is primary; yellow
   "Buy Now" is secondary; everything else is a quiet text link or icon.
5. **Square and sharp.** Square corners on cards, buttons, banners and
   inputs. Only swatches and count bubbles are round.
6. **Same on every page.** Same header, footer, tiles, buttons and spacing
   everywhere.

## 2. Colors

Defined once in `styles/globals.css` as RGB channels and used through
Tailwind tokens. **Never write a hex code in a component.** Unchanged in
Phase 4.

| Token (Tailwind) | Value | Use |
|---|---|---|
| `primary` | `#F7E420` yellow | Announcement bar, logo block, secondary button, Classic tile and banner, hero accent line, footer headings |
| `accent-pink` (= `secondary`) | `#F82B9A` pink | Accent words in headings, sale price, discount badge, "You save", count bubbles, Women tile and banner, newsletter block |
| `accent-blue` | `#06ABE9` blue | Men tile and banner, "New" badge |
| `accent-orange` | `#FF7A1A` orange | Promo banner, "Limited" badge |
| `ink` (= `black`) | `#151311` near-black | Primary button, footer, marquee strip, "All Styles" banner, text |
| `white` | `#FFFFFF` | Product tiles, panels, drawers |
| `surface` (= `background`) | `#F5F3F1` warm light gray | **Page background** and header |
| `text-primary` | `#151311` | Main text |
| `text-secondary` | `#5E5B5A` | Supporting text, color names, strikethrough prices |

Rules:

- Page and header are **surface**; tiles and panels are **white**; footer is
  **ink**.
- Hairlines are ink at low opacity: `border-ink/10` or `border-ink/15` for
  dividers and tab rows, `ring-ink/20` for outlined controls.
- Text on yellow is ink. Text on pink, blue, orange and ink is white.
- Accent words in headings are **pink** only — blue, orange and yellow text
  on the light page fail contrast.
- Don't add new colors. Frame and lens swatches (`lib/colors.ts`) are
  product data, not brand colors.

## 3. Typography

Two fonts, loaded in `pages/_app.tsx`:

- **Barlow Condensed** (`font-display`, 600 / 700 / 800, plus italic) —
  headlines, product names, prices, collection names.
- **Poppins** (`font-sans`, 400 / 600 / 700 / 900) — body text, labels,
  buttons, navigation.

| Role | Style |
|---|---|
| Hero headline | `font-display font-extrabold uppercase`, 56px → 80px → 104px, `leading-[0.86]`; second line italic yellow |
| Collection banner title (h1) | `font-display font-extrabold uppercase`, 64px → 88px → 112px |
| Section heading (h2) | `SectionHeading`: `font-display font-extrabold uppercase`, 34px → 44px; accent words italic pink |
| Product name on page (h1) | `font-display font-extrabold uppercase`, 48–56px |
| Product name on card | `font-display font-bold uppercase`, 20–22px |
| Price | `font-display font-bold`, 20–22px on cards, 36px on the product page |
| Labels, nav links, buttons, tabs | `text-xs` / `text-small`, `font-semibold uppercase tracking-[0.06em–0.08em]` |
| Body | 14–16px Poppins regular |

Rules:

- Headlines are short — two lines at most, a few words each.
- Uppercase is done with the `uppercase` class; the text in
  `locales/en.json` stays in normal case.
- Supporting text uses `text-text-secondary`, not lower opacity.

## 4. Layout and spacing

- Content width: `max-w-section` (1280px), side padding 16px → 32px → 48px.
  Use the `Section` component; don't hand-roll containers.
- Full-width (edge-to-edge) elements: hero, marquee, collection banners,
  footer.
- Section vertical padding: 40px → 56px → 64px by default.
- Breakpoints: phone < 640px, tablet 768px, desktop 1024px+.
- Product grid: 2 columns on phones, 3 on tablet, 4 on desktop. Gap
  12px → 16px. Carousels show 1.4 / 3 / 4 cards.
- Corners: **square** everywhere, except round swatches and count bubbles.
- Shadows: none. Depth comes from white tiles on the gray page.

## 5. Components

| Component | Rules |
|---|---|
| **Header** (`Navbar`) | Yellow announcement bar (store policies from `storeConfig`). Light row: logo left, search / account / wishlist / cart icons right (outline, ink). Second row on desktop: uppercase collection links, active one underlined. Phone: menu button opens a full list. Sticky. |
| **Footer** | Ink background, logo and tagline, link columns with yellow uppercase headings, copyright row. Only links to pages that exist. |
| **Button** | Square, uppercase, semibold. `primary` = ink / white. `secondary` = yellow / ink. `ghost` = white with a hairline ring. `accent` = pink. Sizes `sm` / `md` / `lg`. |
| **Text link CTA** | Uppercase label with a 2px underline ("SHOP NOW"). Used on photos and banners instead of a button. |
| **Product card** | White tile, 12–16px padding, photo `object-contain` on white (4:3). One badge top-left (Sold out / discount / status). Heart and bag icons top-right (40px tap targets). Color dot centered under the photo. Bottom row: name (display, uppercase) + color (small uppercase gray) left; price right, pink when discounted with the old price struck through above it. No rating, no full-width button. |
| **Carousel** | `SectionHeading` with "View all" and back / forward chevrons; cards scroll sideways with snap. |
| **Collection tile** | 4:5 color block (Men blue, Women pink, Classic yellow) with a cut-out frame photo; collection name huge in the bottom-left, one-line tagline, arrow. |
| **Collection banner** | Full-width color block at the top of a listing page with the collection name huge in the bottom-left and a subtitle. |
| **Editorial tile** | Photo with a dark fade and a two-line display headline, 2×2 cells inside the product grid on page 1. Decorative, not a link. |
| **Badge** | Small square chip, uppercase 10px. Discount = pink "-20%". New = blue, Bestseller = yellow, Limited = orange, Sold out = ink. One per card. |
| **Shape tabs** | Uppercase text tabs on a hairline; active = ink with a 2px underline. |
| **Filter and sort** | One button opens a right-hand slide-in panel (all screen sizes): sort options, then price, frame color, lens color, shape, availability; "Show N results" at the bottom. |
| **Product page** | Left: main photo on white, then a collection-color tile (or more photos). Right, sticky on desktop: name + price on one line, savings, rating, color swatches, "Color" and "Lenses", quantity + Add to Cart + heart in one row, Buy Now, three trust icons, then expandable Description / Details / Shipping / Returns. |
| **Marquee** | Ink strip under the hero; selling points in display uppercase separated by yellow sparkles, scrolling slowly. Stops for reduced motion. |
| **Form fields** | Square. Underlined fields on color blocks (newsletter, search); hairline-ring fields elsewhere; ink on focus; pink message on error. |
| **Drawers / overlays** | White panel sliding in over a `bg-ink/50` backdrop. |
| **Empty states** | Use `EmptyState`: heading, one line of help, one button forward. |

## 6. Imagery

- **Product photos:** the frame alone, front view, centered on a **pure
  white** background, evenly lit. No other brands' logos. Square or 2:1.
- **Cut-outs:** photos placed on a color block use `photo-cutout`, which
  removes a white background.
- **Lifestyle photos:** hero, promo banner and editorial tile — a person
  wearing sunglasses, natural light. Subject placed so headline text does
  not cover the frames.
- No doodles or tilted sticker text (retired with the old look). The only
  decoration is the yellow sparkle in the marquee.
- Product photos are the brand's own (`public/images/products/`); the
  lifestyle photos are Unsplash placeholders — see `Memory.md`.

## 7. Icons

`lucide-react` only, outline style, 1.5–1.75 stroke, ink or white. Sizes:
16px inline, 20px in the header and cards, 22px in trust rows.

## 8. Motion

- Gentle and quick: fade-and-rise on the hero headline (about 0.5s), spring
  slide for drawers and the filter panel, slow scale on card photos on
  hover, a pop on the wishlist heart, the slow marquee.
- No motion that blocks reading or delays interaction.
- Respect `prefers-reduced-motion` (handled globally and in `Hero`).

## 9. UX principles

1. **Never lose the shopper's work.** Cart and wishlist persist; filters
   live in the URL; Back works.
2. **Show the result of every action.** Add to Cart opens the drawer;
   filters update the count; forms say what is wrong and where.
3. **Fewer steps to buy.** Quick-add bag on every card; Buy Now on the
   product page; checkout is a single page.
4. **Be honest.** Show real stock state ("Sold out"), real totals, and no
   invented urgency, offers or policies.
5. **Phone-first checks.** Tap targets at least 40px; no sideways scroll at
   375px; filters behind one button.
6. **Accessible.** Keyboard reachable, visible focus, labelled controls,
   sufficient contrast.
7. **Always a way forward.** Empty cart, empty wishlist, no results and 404
   each offer a next step.

## 10. Don't

- Don't add a new color, font, icon set or shadow.
- Don't use rounded cards, pill buttons, thick outlines or offset shadows.
- Don't put blue, orange or yellow text on the light page.
- Don't cover product photos with text or stickers.
- Don't link to pages that don't exist.
