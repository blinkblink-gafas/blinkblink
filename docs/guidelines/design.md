# Design

The visual language of the blink blink storefront. The three approved
reference designs — **Home**, **Category** and **Product** (desktop) — are
the source of truth; this file writes down the system behind them so new
screens match.

Pages without a reference (cart, checkout, wishlist, search, about, account,
404) reuse the same pieces described here.

## 1. Design principles

1. **Bold, not busy.** One loud element per section — a color block, a huge
   headline or a banner. Everything around it stays calm and white.
2. **Product first.** Photos are large, on plain backgrounds, never covered
   by decoration.
3. **Color means something.** Yellow = brand and positive actions. Pink =
   sale, savings and counts. Black = primary action and structure. Blue and
   orange = accents for blocks and banners only.
4. **One primary action per view.** Black "Add to Cart" is primary; yellow
   "Buy Now" is secondary; everything else is quiet.
5. **Playful details, sparingly.** Doodles (crown, lightning, smiley, sun)
   and tilted "sticker" text live only in heroes and banners.
6. **Same on every page.** Same navbar, footer, cards, buttons and spacing
   everywhere.

## 2. Colors

Defined once in `styles/globals.css` as RGB channels and used through
Tailwind tokens. **Never write a hex code in a component.**

| Token (Tailwind) | Value | Use |
|---|---|---|
| `primary` | `#F7E420` yellow | Hero background, logo block, secondary button, rating star, "Bestseller" badge, footer headings |
| `accent-pink` (= `secondary`) | `#F82B9A` pink | Sale price, discount badge, "You save", count bubbles, newsletter banner, color blocks |
| `accent-blue` | `#06ABE9` blue | Color blocks, "New" badge |
| `accent-orange` | `#FF7A1A` orange | Promo banner, "Limited" badge |
| `ink` (= `black`) | `#151311` near-black | Navbar, footer, primary button, headings, body text |
| `white` | `#FFFFFF` | Page background, cards |
| `surface` (= `background`) | `#F5F3F1` warm light gray | Photo backgrounds, hover fills, quiet panels |
| `text-primary` | `#151311` | Main text |
| `text-secondary` | `#5E5B5A` | Supporting text, strikethrough prices |

Rules:

- Page background is **white**. Navbar and footer are **ink**.
- Hairlines and borders are ink at low opacity: `ring-1 ring-ink/10` for
  cards, `ring-ink/15` for outlined controls, `border-ink/10` for dividers.
- Text on yellow is ink. Text on pink, blue, orange and ink is white.
- Don't add new colors. Frame and lens swatches (`lib/colors.ts`) are
  product data, not brand colors.
- These values are placeholders until the brand confirms exact colors —
  change them only in `globals.css`.

## 3. Typography

**Font:** Poppins for everything (weights 400, 600, 700, 900).

| Role | Style |
|---|---|
| Hero headline | `font-black`, 40px → 56px → 68px, tight (`leading-[1.02]`, `tracking-[-0.04em]`) |
| Banner headline | `font-black`, 34px → 48px; "Brighter Side" is also italic uppercase |
| Page title (h1) | `font-black`, 28–40px, `tracking-[-0.03em]` |
| Section heading (h2) | `font-black`, 24–28px — use `SectionHeading` |
| Card / block title | `font-bold`, 16–18px |
| Body | 16px regular (`text-body`) |
| Small / supporting | 14px (`text-small`), 12px (`text-xs`) for captions |
| Buttons, links, labels | `font-semibold` |

Rules:

- Headlines are short — two or three lines, a few words each.
- Use sentence case for body and labels; product and section names use
  Title Case as in the references ("Best Sellers", "Add to Cart").
- Supporting text uses `text-text-secondary`, not lower opacity.

## 4. Layout and spacing

- Content width: `max-w-section` (1280px), side padding 16px → 32px → 48px.
  Use the `Section` component; don't hand-roll containers.
- Section vertical padding: 40px → 56px → 64px by default; banners use a
  tighter 24–32px.
- Breakpoints: phone < 640px, tablet 768px, desktop 1024px+.
- Product grid: 2 columns on phones, 3 on tablet, 4 on desktop (3 when
  beside the filter sidebar). Gap 12px → 20px.
- Corners: `rounded-2xl` for cards and banners, `rounded-xl` for photos and
  inputs, `rounded-pill` for buttons, tabs and chips.
- Shadows: none at rest. A soft `shadow-lg shadow-ink/10` on card hover and
  on overlays. **No hard offset "comic" shadows and no thick black
  outlines** — that was the earlier look and is retired.

## 5. Components

| Component | Rules |
|---|---|
| **Navbar** | Ink background, yellow logo block on the left, white links centered, icon buttons right. Cart icon is yellow with a pink count bubble. Sticky. |
| **Footer** | Ink background, large logo and tagline, link columns with yellow headings, copyright row. Only links to pages that exist. |
| **Button** | Pill. `primary` = ink with white text. `secondary` = yellow with ink text. `ghost` = white with a hairline ring. `accent` = pink. Sizes `sm` / `md` / `lg`. |
| **Product card** | White, `rounded-2xl`, hairline ring, 12px padding. Photo on `surface`, 4:3, rounded. Discount badge top-left (or one status badge), heart top-right. Name bold; price bold (pink when discounted) with gray strikethrough; star rating; full-width black Add to Cart. |
| **Category card** | Solid color photo block (yellow / pink / blue) with a cut-out photo, then name, one-line tagline and an arrow. |
| **Badge** | Small rounded chip. Discount = pink "-20%". New = blue, Bestseller = yellow, Limited = orange. One badge per card. |
| **Hero** | Yellow background, pink and blue diagonal blocks on the right, huge ink headline, one black CTA, cut-out product photo, two or three doodles and a tilted sticker line. |
| **Banners** | Full-width rounded block in one or more brand colors, a big headline, at most one button, one photo, one or two doodles. |
| **Trust row** | Outline icon + bold title + small gray subtitle. |
| **Tabs / chips** | Pills. Active = ink with white text; inactive = white with a hairline ring. |
| **Filters** | Left sidebar on desktop; slide-in panel behind a "Filters" button on phones. Groups separated by hairlines. Swatches are circles; selected gets an ink ring. |
| **Form fields** | White, `rounded-xl`, hairline ring; ink ring on focus; pink ring and pink message on error. Label above the field. |
| **Drawers / overlays** | White panel sliding in over a `bg-ink/50` backdrop. |
| **Empty states** | Use `EmptyState`: heading, one line of help, one button forward. |

## 6. Imagery

- **Product photos:** the frame alone on a plain white or light background,
  evenly lit, centered. No other brands' logos.
- **Cut-outs:** photos placed on a color block use the `photo-cutout` class,
  which removes a white background. They need a clean white backdrop to look
  right.
- **Lifestyle photos:** used only in the promo banner — a person wearing
  the frames, cropped close, warm tones.
- **Doodles:** `lucide-react` outline icons in ink (crown, lightning,
  smiley, sun, sparkle), slightly rotated. Decorative only (`aria-hidden`).
- All current photos are stock placeholders — see `Memory.md`.

## 7. Icons

`lucide-react` only, outline style, ink or white. Sizes: 16px inline, 20–22px
in the navbar, 24–26px in trust rows.

## 8. Motion

- Gentle and quick: fade-and-rise on hero content (about 0.5s), spring
  slide for drawers, small scale on hover for photos and swatches, a pop on
  the wishlist heart.
- No motion that blocks reading or delays interaction.
- Respect `prefers-reduced-motion` (handled globally and in `Hero`).

## 9. UX principles

1. **Never lose the shopper's work.** Cart and wishlist persist; filters
   live in the URL; Back works.
2. **Show the result of every action.** Add to Cart opens the drawer;
   filters update the count; forms say what is wrong and where.
3. **Fewer steps to buy.** Add to Cart on every card; Buy Now on the product
   page; checkout is a single page.
4. **Be honest.** Show real stock state, real totals, and no invented
   urgency, offers or policies.
5. **Phone-first checks.** Tap targets at least 40px; no sideways scroll at
   375px; filters behind one button.
6. **Accessible.** Keyboard reachable, visible focus, labelled controls,
   sufficient contrast (ink on yellow / white on ink, pink or blue).
7. **Always a way forward.** Empty cart, empty wishlist, no results and 404
   each offer a next step.

## 10. Don't

- Don't add a new color, font, icon set or shadow style.
- Don't use thick black borders or hard offset shadows.
- Don't put more than one banner-level element in a row of sections.
- Don't cover product photos with text or stickers.
- Don't link to pages that don't exist.
