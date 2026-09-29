import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RatingProps {
  rating: number;
  reviewCount?: number;
  /** Replaces the default "(120)" count text, e.g. "(120 reviews)". */
  countLabel?: string;
  className?: string;
}

/** Yellow star, one-decimal rating and an optional review count. */
export default function Rating({ rating, reviewCount, countLabel, className }: RatingProps) {
  return (
    <span className={cn("inline-flex items-center gap-1 text-small text-text-secondary", className)}>
      <Star size={14} aria-hidden="true" className="fill-primary text-primary" />
      <span className="font-semibold text-text-primary">{rating.toFixed(1)}</span>
      {reviewCount !== undefined && <span>({countLabel ?? reviewCount})</span>}
    </span>
  );
}
