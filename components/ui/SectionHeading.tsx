import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface SectionHeadingProps {
  heading: string;
  id?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
}

/** Section title with an optional "View All →" link on the right. */
export default function SectionHeading({ heading, id, viewAllHref, viewAllLabel }: SectionHeadingProps) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <h2 id={id} className="text-2xl font-black tracking-[-0.02em] text-text-primary sm:text-[28px]">
        {heading}
      </h2>
      {viewAllHref && viewAllLabel && (
        <Link
          href={viewAllHref}
          className="inline-flex shrink-0 items-center gap-1 text-small font-semibold text-text-primary hover:underline hover:underline-offset-4"
        >
          {viewAllLabel} <ArrowRight size={16} strokeWidth={2.25} />
        </Link>
      )}
    </div>
  );
}
