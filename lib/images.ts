/**
 * Every photo on the site that isn't a product photo lives here, so swapping
 * in real brand photography is a one-file change. Product photos live on each
 * product in `lib/mockData.ts`.
 *
 * To use your own image: put the file in `public/images/` and replace the
 * `url` with its path, e.g. `url: "/images/hero.jpg"`. Nothing else changes.
 *
 * Lifestyle photos are free Unsplash placeholders (unsplash.com/license —
 * free for commercial use, no attribution required). Collection tiles reuse
 * local-only placeholder product photos (see `lib/mockData.ts`).
 */

export interface SiteImage {
  url: string;
  alt: string;
}

/** Builds a sized Unsplash CDN URL from a photo id ("1584036553516-bf83210aa16c"). */
export function unsplash(photoId: string, width = 1200): string {
  return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=${width}&q=80`;
}

export const siteImages = {
  /** Full-width homepage hero — a person wearing sunglasses, subject on the right. */
  hero: {
    url: unsplash("1564086334005-5c65e4f9f242", 2000),
    alt: "Woman in black cat-eye sunglasses among palm leaves",
  },
  /** "Wear your personality" banner. */
  promo: {
    url: unsplash("1619785690726-89c6b3bd3849", 1400),
    alt: "Woman in a purple coat adjusting slim black sunglasses",
  },
  /** Editorial tile inside the category grid. */
  editorial: {
    url: unsplash("1778844699006-cded6a38d898", 1000),
    alt: "Man wearing white sunglasses with orange mirrored lenses",
  },
  /** Collection tiles — product shots on a white background, shown on a color block. */
  categories: {
    men: {
      url: "/images/placeholder-products/captain.jpg",
      alt: "Black double-bridge aviator sunglasses",
    },
    women: {
      url: "/images/placeholder-products/kitty.jpg",
      alt: "Tortoiseshell cat-eye sunglasses",
    },
    classic: {
      url: "/images/placeholder-products/havana.jpg",
      alt: "Tortoiseshell round sunglasses",
    },
  },
} satisfies Record<string, SiteImage | Record<string, SiteImage>>;
