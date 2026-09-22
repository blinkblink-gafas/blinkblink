import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: ElementType;
  /** Set false to let content bleed full-width (e.g. diagonal color-block backgrounds), while inner content can still opt back into <Section.Inner>. */
  contained?: boolean;
}

/**
 * Consistent max-width, horizontal padding, and vertical rhythm wrapper.
 * Every future homepage/category section should render inside this so
 * spacing stays aligned across the page.
 */
export default function Section({
  children,
  as: Tag = "section",
  contained = true,
  className,
  ...rest
}: SectionProps) {
  return (
    <Tag
      className={cn("w-full py-12 md:py-16 lg:py-24", className)}
      {...rest}
    >
      {contained ? (
        <div className="mx-auto w-full max-w-section px-4 md:px-8 lg:px-12">
          {children}
        </div>
      ) : (
        children
      )}
    </Tag>
  );
}
