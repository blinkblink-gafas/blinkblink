import { Check, X } from "lucide-react";
import Section from "@/components/ui/Section";
import { DEFAULT_FILTERS, PRICE_BUCKETS, SORT_OPTIONS } from "@/lib/filters";
import { getColorSwatch } from "@/lib/colors";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { FilterState, SortOption } from "@/types/filters";

export interface FilterBarProps {
  filters: FilterState;
  onChange: (next: FilterState) => void;
  /** Colors offered as chips — usually every color present in the unfiltered list. */
  availableColors: string[];
}

const selectClassName =
  "rounded-pill border-3 border-ink bg-white px-4 py-2 text-small font-semibold text-ink outline-none focus-visible:shadow-comic-sm";

/** Sort, price and color controls for product listings (category and search pages). */
export default function FilterBar({ filters, onChange, availableColors }: FilterBarProps) {
  const t = useTranslation();
  const activePriceKey = Object.keys(PRICE_BUCKETS).find(
    (key) => PRICE_BUCKETS[key] === filters.priceRange
  );
  const hasActiveFilters =
    filters.colors.length > 0 || filters.priceRange !== null || filters.sortBy !== "featured";

  const toggleColor = (color: string) => {
    const colors = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color];
    onChange({ ...filters, colors });
  };

  return (
    // Side-specific padding (pt/pb) so it overrides Section's default py-* regardless of CSS order.
    <Section className="pb-0 pt-0 md:pb-0 md:pt-0 lg:pb-0 lg:pt-0">
      <div
        role="group"
        aria-label={t.filters.heading}
        className="mt-6 flex flex-wrap items-end gap-x-6 gap-y-4 rounded-2xl border-3 border-ink bg-white p-4 shadow-comic-sm"
      >
        <label className="flex flex-col gap-1 text-small font-semibold">
          {t.filters.sortLabel}
          <select
            value={filters.sortBy}
            onChange={(event) => onChange({ ...filters, sortBy: event.target.value as SortOption })}
            className={selectClassName}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {t.filters.sort[option]}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-small font-semibold">
          {t.filters.priceLabel}
          <select
            value={activePriceKey ?? ""}
            onChange={(event) =>
              onChange({ ...filters, priceRange: PRICE_BUCKETS[event.target.value] ?? null })
            }
            className={selectClassName}
          >
            <option value="">{t.filters.anyPrice}</option>
            {Object.keys(PRICE_BUCKETS).map((key) => (
              <option key={key} value={key}>
                {t.filters.price[key] ?? key}
              </option>
            ))}
          </select>
        </label>

        {availableColors.length > 0 && (
          <fieldset className="flex flex-col gap-1">
            <legend className="mb-1 text-small font-semibold">{t.filters.colorLabel}</legend>
            <div className="flex flex-wrap gap-2">
              {availableColors.map((color) => {
                const isActive = filters.colors.includes(color);
                return (
                  <button
                    key={color}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => toggleColor(color)}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-pill border-2 px-3 py-1.5 text-small transition-colors",
                      isActive ? "border-ink bg-primary font-semibold" : "border-ink/30 hover:border-ink"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="h-4 w-4 rounded-full border border-ink/40"
                      style={{ backgroundColor: getColorSwatch(color) }}
                    />
                    {color}
                    {isActive && <Check size={14} aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => onChange({ ...DEFAULT_FILTERS, searchQuery: filters.searchQuery })}
            className="ml-auto inline-flex items-center gap-1 py-2 text-small font-semibold text-secondary hover:underline hover:underline-offset-4"
          >
            <X size={14} />
            {t.filters.clear}
          </button>
        )}
      </div>
    </Section>
  );
}
