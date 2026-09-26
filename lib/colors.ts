/**
 * Maps a `Product.colors` name to a swatch hex for the color picker on the
 * product detail page. Extend this alongside any new color name used in
 * `lib/mockData.ts` — a name with no entry here falls back to a neutral gray
 * swatch rather than breaking the page.
 */
const COLOR_SWATCHES: Record<string, string> = {
  "Jet Black": "#151311",
  Tortoise: "#6b4a2b",
  Amber: "#c8860a",
  "Electric Blue": "#06abe9",
  "Sunset Pink": "#f82b9a",
  Rose: "#f2a6c4",
  Clear: "#ffffff",
  Gold: "#c9a04a",
  "Neon Yellow": "#f7e420",
};

const FALLBACK_SWATCH = "#a3a3a3";

export function getColorSwatch(colorName: string): string {
  return COLOR_SWATCHES[colorName] ?? FALLBACK_SWATCH;
}
