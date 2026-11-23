import type { ReactNode } from "react";

export function initials(name: string) {
  return name
    .replace(/[’'‘`]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export function SectionLabel({
  children,
  count,
}: {
  children: ReactNode;
  count?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span
          className="h-px w-8"
          style={{ backgroundColor: "var(--v-accent)", opacity: 0.7 }}
        />
        <span
          className="text-[9px] uppercase tracking-[0.32em]"
          style={{ color: "var(--v-muted)" }}
        >
          {children}
        </span>
      </div>
      {count && (
        <span
          className="text-[9px] uppercase tracking-[0.24em]"
          style={{ color: "var(--v-muted)", opacity: 0.55 }}
        >
          {count}
        </span>
      )}
    </div>
  );
}
