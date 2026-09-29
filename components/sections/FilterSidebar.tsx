import { Check } from "lucide-react";
import type { ReactNode } from "react";
import PriceRangeSlider from "@/components/ui/PriceRangeSlider";
import { DEFAULT_FILTERS, FRAME_SHAPES, GENDERS, countActiveFilters } from "@/lib/filters";
import { getColorSwatch } from "@/lib/colors";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { FilterState, PriceRange } from "@/types/filters";
import type { FrameShape } from "@/types/product";

export interface FilterOptions {
  priceBounds: PriceRange;
  frameColors: string[];
  lensColors: string[];
  shapes: FrameShape[];
}

export interface FilterSidebarProps {
  filters: FilterState;
  options: FilterOptions;
  onChange: (next: FilterState) => void;
}

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

/**
 * Price, frame color, lens color, frame shape, gender and availability
 * filters. Options come from the products being listed, so a filter never
 * offers a value that would return nothing on its own.
 */
export default function FilterSidebar({ filters, options, onChange }: FilterSidebarProps) {
  const t = useTranslation();
  // Any filter change goes back to page 1 — the current page may no longer exist.
  const update = (patch: Partial<FilterState>) => onChange({ ...filters, ...patch, page: 1 });
  const shapes = FRAME_SHAPES.filter((shape) => options.shapes.includes(shape));

  return (
    <div className="flex flex-col divide-y divide-ink/10">
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-body font-bold">{t.filters.heading}</h2>
        {countActiveFilters(filters) > 0 && (
          <button
            type="button"
            onClick={() => onChange({ ...DEFAULT_FILTERS, searchQuery: filters.searchQuery, sortBy: filters.sortBy })}
            className="text-small font-semibold text-accent-pink hover:underline hover:underline-offset-4"
          >
            {t.filters.clear}
          </button>
        )}
      </div>

      {options.priceBounds.max > options.priceBounds.min && (
        <FilterGroup title={t.filters.price}>
          <PriceRangeSlider
            bounds={options.priceBounds}
            value={filters.priceRange}
            onChange={(priceRange) => update({ priceRange })}
            minLabel={t.filters.minPrice}
            maxLabel={t.filters.maxPrice}
          />
        </FilterGroup>
      )}

      {options.frameColors.length > 0 && (
        <FilterGroup title={t.filters.frameColor}>
          <SwatchList
            colors={options.frameColors}
            selected={filters.frameColors}
            onToggle={(color) => update({ frameColors: toggle(filters.frameColors, color) })}
          />
        </FilterGroup>
      )}

      {options.lensColors.length > 1 && (
        <FilterGroup title={t.filters.lensColor}>
          <SwatchList
            colors={options.lensColors}
            selected={filters.lensColors}
            onToggle={(color) => update({ lensColors: toggle(filters.lensColors, color) })}
          />
        </FilterGroup>
      )}

      {shapes.length > 1 && (
        <FilterGroup title={t.filters.frameShape}>
          {shapes.map((shape) => (
            <CheckboxRow
              key={shape}
              label={t.shapes[shape]}
              checked={filters.shapes.includes(shape)}
              onChange={() => update({ shapes: toggle(filters.shapes, shape) })}
            />
          ))}
        </FilterGroup>
      )}

      <FilterGroup title={t.filters.gender}>
        {GENDERS.map((gender) => (
          <CheckboxRow
            key={gender}
            label={t.filters.genders[gender]}
            checked={filters.genders.includes(gender)}
            onChange={() => update({ genders: toggle(filters.genders, gender) })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title={t.filters.availability}>
        <CheckboxRow
          label={t.filters.inStock}
          checked={filters.inStockOnly}
          onChange={() => update({ inStockOnly: !filters.inStockOnly })}
        />
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="py-4">
      <legend className="float-left mb-3 w-full text-small font-bold">{title}</legend>
      <div className="clear-both flex flex-col gap-2">{children}</div>
    </fieldset>
  );
}

function CheckboxRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-small text-text-primary">
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        aria-hidden="true"
        className={cn(
          "grid h-4 w-4 place-items-center rounded border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-primary",
          checked ? "border-ink bg-ink text-white" : "border-ink/30 bg-white"
        )}
      >
        {checked && <Check size={12} strokeWidth={3} />}
      </span>
      {label}
    </label>
  );
}

function SwatchList({
  colors,
  selected,
  onToggle,
}: {
  colors: string[];
  selected: string[];
  onToggle: (color: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {colors.map((color) => {
        const isActive = selected.includes(color);
        return (
          <button
            key={color}
            type="button"
            title={color}
            aria-label={color}
            aria-pressed={isActive}
            onClick={() => onToggle(color)}
            className={cn(
              "h-7 w-7 rounded-full ring-1 ring-ink/20 transition-transform hover:scale-110",
              isActive && "ring-2 ring-ink ring-offset-2"
            )}
            style={{ backgroundColor: getColorSwatch(color) }}
          />
        );
      })}
    </div>
  );
}
