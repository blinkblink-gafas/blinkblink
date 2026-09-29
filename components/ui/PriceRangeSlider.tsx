import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/utils";
import type { PriceRange } from "@/types/filters";

export interface PriceRangeSliderProps {
  /** The slider's full extent (cheapest to priciest product). */
  bounds: PriceRange;
  /** The selected range, or null for the full extent. */
  value: PriceRange | null;
  onChange: (next: PriceRange | null) => void;
  minLabel: string;
  maxLabel: string;
}

/**
 * Two-thumb price slider. Dragging updates the labels immediately but only
 * reports the range once the thumb is released (or after a short pause while
 * using the keyboard), so the URL isn't rewritten on every pixel.
 */
export default function PriceRangeSlider({ bounds, value, onChange, minLabel, maxLabel }: PriceRangeSliderProps) {
  const [draft, setDraft] = useState<PriceRange>(value ?? bounds);

  useEffect(() => {
    setDraft(value ?? bounds);
  }, [value, bounds]);

  const commit = (next: PriceRange) => {
    const isFullRange = next.min <= bounds.min && next.max >= bounds.max;
    onChange(isFullRange ? null : next);
  };

  useEffect(() => {
    const current = value ?? bounds;
    if (draft.min === current.min && draft.max === current.max) return;
    const timer = window.setTimeout(() => commit(draft), 400);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only re-run when the draft moves
  }, [draft]);

  const span = Math.max(1, bounds.max - bounds.min);
  const left = ((draft.min - bounds.min) / span) * 100;
  const right = ((draft.max - bounds.min) / span) * 100;

  return (
    <div>
      <div className="range-dual relative h-5">
        <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-ink/10" />
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-ink"
          style={{ left: `${left}%`, right: `${100 - right}%` }}
        />
        <input
          type="range"
          aria-label={minLabel}
          min={bounds.min}
          max={bounds.max}
          step={1}
          value={draft.min}
          onChange={(event) => setDraft((d) => ({ ...d, min: Math.min(Number(event.target.value), d.max) }))}
        />
        <input
          type="range"
          aria-label={maxLabel}
          min={bounds.min}
          max={bounds.max}
          step={1}
          value={draft.max}
          onChange={(event) => setDraft((d) => ({ ...d, max: Math.max(Number(event.target.value), d.min) }))}
        />
      </div>
      <div className="mt-2 flex justify-between text-small font-semibold text-text-primary">
        <span>{formatPrice(draft.min)}</span>
        <span>{formatPrice(draft.max)}</span>
      </div>
    </div>
  );
}
