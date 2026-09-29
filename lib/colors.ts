/**
 * Maps a product's frame or lens color name (`Product.colors` /
 * `Product.lensColors`) to a swatch hex for color pickers and filters. Extend
 * this alongside any new color name used in `lib/mockData.ts` — a name with
 * no entry here falls back to a neutral gray swatch rather than breaking the
 * page.
 */
const COLOR_SWATCHES: Record<string, string> = {
  // Frame colors
  "Jet Black": "#151311",
  Tortoise: "#6b4a2b",
  Gold: "#c9a04a",
  Silver: "#b9bcc2",
  Cream: "#efe3cf",
  Clear: "#ffffff",
  "Matte Green": "#3f5a47",
  // Lens colors
  Black: "#1f1f1f",
  Brown: "#7a4a24",
  Green: "#3c5e3a",
  Purple: "#6b4d7a",
  "Grey Gradient": "#5c5c5c",
  "Brown Gradient": "#8a5a36",
  "Mirror Red": "#e2452f",
};

const FALLBACK_SWATCH = "#a3a3a3";

export function getColorSwatch(colorName: string): string {
  return COLOR_SWATCHES[colorName] ?? FALLBACK_SWATCH;
}
