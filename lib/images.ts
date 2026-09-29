/**
 * Every photo on the site that isn't a product photo lives here, so swapping
 * in real brand photography is a one-file change. Product photos live on each
 * product in `lib/mockData.ts`.
 *
 * To use your own image: put the file in `public/images/` and replace the
 * `url` with its path, e.g. `url: "/images/hero.jpg"`. Nothing else changes.
 *
 * The current URLs are free Unsplash placeholders (unsplash.com/license —
 * free for commercial use, no attribution required).
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
  hero: {
    url: unsplash("1584036553516-bf83210aa16c", 1400),
    alt: "Black browline sunglasses with gradient lenses",
  },
  promo: {
    url: unsplash("1778844699006-cded6a38d898", 1200),
    alt: "Man wearing white sport sunglasses with orange mirrored lenses",
  },
  newsletter: {
    url: unsplash("1653038282189-803202722a05", 800),
    alt: "Dark green square sunglasses",
  },
  brighterSide: {
    url: unsplash("1631161475251-9c1b87c34c1a", 1000),
    alt: "Black sunglasses with brown gradient lenses",
  },
  categories: {
    sunglasses: {
      url: unsplash("1631161475251-9c1b87c34c1a", 800),
      alt: "Black sunglasses with brown gradient lenses",
    },
    eyeglasses: {
      url: unsplash("1646084081219-1090f72a531c", 800),
      alt: "Thin black and gold round eyeglasses",
    },
    sports: {
      url: unsplash("1708799366365-a24608103bed", 800),
      alt: "Black wraparound sports sunglasses",
    },
  },
} satisfies Record<string, SiteImage | Record<string, SiteImage>>;
