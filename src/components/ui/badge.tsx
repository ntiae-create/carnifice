import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 border border-border px-2.5 py-1",
        "font-display text-xs tracking-widest uppercase text-muted",
        className,
      )}
      {...props}
    />
  );
}
