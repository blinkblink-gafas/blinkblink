import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatTranslation, useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

/** Page numbers with previous/next arrows; long ranges collapse to "1 … 4 5 6 … 12". */
export default function Pagination({ page, totalPages, onChange }: PaginationProps) {
  const t = useTranslation();
  if (totalPages <= 1) return null;

  const pages = visiblePages(page, totalPages);
  const arrow =
    "grid h-9 w-9 place-items-center rounded-full text-ink transition-colors hover:bg-surface disabled:pointer-events-none disabled:opacity-30";

  return (
    <nav aria-label={t.pagination.label} className="mt-10 flex items-center justify-center gap-1.5">
      <button type="button" aria-label={t.pagination.previous} disabled={page <= 1} onClick={() => onChange(page - 1)} className={arrow}>
        <ChevronLeft size={18} />
      </button>

      {pages.map((item, index) =>
        item === "gap" ? (
          <span key={`gap-${index}`} aria-hidden="true" className="w-6 text-center text-text-secondary">
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            aria-label={formatTranslation(t.pagination.page, { page: item })}
            aria-current={item === page ? "page" : undefined}
            onClick={() => onChange(item)}
            className={cn(
              "h-9 min-w-9 rounded-full px-2 text-small font-semibold transition-colors",
              item === page ? "bg-ink text-white" : "text-ink hover:bg-surface"
            )}
          >
            {item}
          </button>
        )
      )}

      <button type="button" aria-label={t.pagination.next} disabled={page >= totalPages} onClick={() => onChange(page + 1)} className={arrow}>
        <ChevronRight size={18} />
      </button>
    </nav>
  );
}

function visiblePages(page: number, totalPages: number): Array<number | "gap"> {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
  const around = [page - 1, page, page + 1].filter((p) => p > 1 && p < totalPages);
  return [
    1,
    ...(around[0] !== undefined && around[0] > 2 ? (["gap"] as const) : []),
    ...around,
    ...(around[around.length - 1] !== undefined && around[around.length - 1]! < totalPages - 1 ? (["gap"] as const) : []),
    totalPages,
  ];
}
