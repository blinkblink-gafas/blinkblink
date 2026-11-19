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
  "Light Tortoise": "#c79a5b",
  Gold: "#c9a04a",
  Gunmetal: "#5d6066",
  Maroon: "#6e1f2a",
  Brown: "#8a5a36",
  Chocolate: "#4a2c22",
  White: "#f4f1ea",
  Sand: "#d9d2b8",
  "Blush Clear": "#efc6cf",
  "Honey Clear": "#efd59a",
  Olive: "#5f6a3a",
  "Forest Green": "#17703f",
  Amber: "#d9a21b",
  // Lens colors
  Grey: "#4a4d52",
  Green: "#3c5e3a",
  Blue: "#4f86c6",
  "Light Blue": "#a9d3ea",
  Orange: "#f39a3b",
  "Pink Gradient": "#e7a3b8",
  "Brown Gradient": "#b07b52",
};

const FALLBACK_SWATCH = "#a3a3a3";

export function getColorSwatch(colorName: string): string {
  return COLOR_SWATCHES[colorName] ?? FALLBACK_SWATCH;
}
