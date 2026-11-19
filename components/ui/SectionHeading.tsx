import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AccentHeading } from "@/types/locales";

export interface SectionHeadingProps {
  /** Plain text, or `{ lead, accent }` to set the accent words in pink italics. */
  heading: string | AccentHeading;
  id?: string;
  as?: "h1" | "h2";
  viewAllHref?: string;
  viewAllLabel?: string;
  /** Extra controls on the right, e.g. carousel arrows. */
  actions?: ReactNode;
  className?: string;
}

/** Big condensed uppercase title — "OUR *BEST-SELLERS*" — with optional link or controls on the right. */
export default function SectionHeading({ heading, id, as: Tag = "h2", viewAllHref, viewAllLabel, actions, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-5 flex items-end justify-between gap-4 md:mb-6", className)}>
      <Tag id={id} className="font-display text-[34px] font-extrabold uppercase leading-[0.9] tracking-[-0.01em] text-text-primary sm:text-[44px]">
        <DisplayText heading={heading} />
      </Tag>
      {(actions || (viewAllHref && viewAllLabel)) && (
        <div className="flex shrink-0 items-center gap-4">
          {viewAllHref && viewAllLabel && (
            <Link
              href={viewAllHref}
              className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.06em] text-text-primary underline-offset-4 hover:underline"
            >
              {viewAllLabel} <ArrowRight size={14} strokeWidth={2.25} aria-hidden="true" />
            </Link>
          )}
          {actions}
        </div>
      )}
    </div>
  );
}

/** Renders a heading with its accent part in pink italics. Reused by banners. */
export function DisplayText({ heading }: { heading: string | AccentHeading }) {
  if (typeof heading === "string") return <>{heading}</>;
  return (
    <>
      {heading.lead} <em className="pr-1 italic text-accent-pink">{heading.accent}</em>
    </>
  );
}
