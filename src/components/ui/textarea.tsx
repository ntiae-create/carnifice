import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full min-h-36 resize-y bg-elevated px-4 py-3 text-base text-fg leading-normal",
        "border border-border placeholder:text-faint",
        "transition-[border-color,box-shadow] duration-150 ease-out",
        "focus-visible:outline-none focus-visible:border-border-blood focus-visible:ring-2 focus-visible:ring-blood/40",
        className,
      )}
      {...props}
    />
  );
}
