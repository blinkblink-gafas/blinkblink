import Link from "next/link";
import type { ReactNode } from "react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  heading: string;
  message?: ReactNode;
  actionLabel?: string;
  actionHref?: string;
  /** Renders the heading as the page's <h1> (e.g. an empty cart page) instead of an <h2>. */
  isPageHeading?: boolean;
  className?: string;
}

/**
 * Shared "nothing here" block — empty cart, empty wishlist, no search
 * results, empty category, 404 — so every empty view has the same shape
 * and always offers a way forward.
 */
export default function EmptyState({
  heading,
  message,
  actionLabel,
  actionHref,
  isPageHeading = false,
  className,
}: EmptyStateProps) {
  const Heading = isPageHeading ? "h1" : "h2";

  return (
    <div className={cn("flex flex-col items-center py-8 text-center", className)}>
      <Heading className={cn("font-bold text-text-primary", isPageHeading ? "text-h2" : "text-h3")}>
        {heading}
      </Heading>
      {message && <p className="mt-2 max-w-md text-body text-text-secondary">{message}</p>}
      {actionLabel && actionHref && (
        <Button asChild variant="secondary" className="mt-6">
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      )}
    </div>
  );
}
