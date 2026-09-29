import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BrandLogoProps {
  /** "sm" for the navbar, "lg" for the footer. */
  size?: "sm" | "lg";
  className?: string;
}

/**
 * Text logo: "blink / blink" stacked in a yellow block with a crown. A
 * stand-in until an SVG logo file exists — swap this component's body for an
 * <Image> of it and every usage updates.
 */
export default function BrandLogo({ size = "sm", className }: BrandLogoProps) {
  return (
    <span
      className={cn(
        "relative inline-flex flex-col items-start rounded-md bg-primary font-black leading-[0.85] tracking-[-0.06em] text-ink",
        size === "sm" ? "px-2 pb-1 pt-1.5 text-[17px]" : "px-4 pb-3 pt-4 text-[34px]",
        className
      )}
    >
      <Crown
        aria-hidden="true"
        className={cn("absolute fill-ink text-ink", size === "sm" ? "-top-1.5 right-1 h-3 w-3" : "-top-3 right-2 h-6 w-6")}
        strokeWidth={2}
      />
      <span>blink</span>
      <span>blink</span>
    </span>
  );
}
